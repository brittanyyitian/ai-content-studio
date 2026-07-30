import { readFile, writeFile } from "node:fs/promises";

const packetPath =
  process.argv[2] ||
  "operator-packets/2026-07-30-v4-complete-drafts.json";
const migrationPath =
  process.argv[3] ||
  "drizzle/0005_complete_localized_drafts.sql";
const packet = JSON.parse(await readFile(packetPath, "utf8"));
const drafts = packet.state?.drafts;

if (!Array.isArray(drafts) || drafts.length !== 20) {
  throw new Error("Complete draft migration requires exactly 20 drafts.");
}

function sqlString(value) {
  return JSON.stringify(value).replaceAll("'", "''");
}

const replacements = sqlString(drafts);
const timestamp = "2026-07-30T14:42:00+08:00";

const sql = `WITH draft_replacements AS (
  SELECT value FROM json_each('${replacements}')
),
current_state AS (
  SELECT payload FROM workspace_states WHERE id = 'default'
),
updated_drafts AS (
  SELECT json_group_array(json(value)) AS items
  FROM (
    SELECT
      COALESCE(
        (
          SELECT json_patch(existing.value, replacement.value)
          FROM draft_replacements AS replacement
          WHERE json_extract(replacement.value, '$.hotspotId') =
            json_extract(existing.value, '$.hotspotId')
            AND json_extract(replacement.value, '$.platform') =
              json_extract(existing.value, '$.platform')
        ),
        existing.value
      ) AS value
    FROM json_each((SELECT payload FROM current_state), '$.drafts') AS existing
    UNION ALL
    SELECT replacement.value
    FROM draft_replacements AS replacement
    WHERE NOT EXISTS (
      SELECT 1
      FROM json_each((SELECT payload FROM current_state), '$.drafts') AS existing
      WHERE json_extract(existing.value, '$.hotspotId') =
        json_extract(replacement.value, '$.hotspotId')
        AND json_extract(existing.value, '$.platform') =
          json_extract(replacement.value, '$.platform')
    )
  )
),
updated_history AS (
  SELECT json_group_array(json(value)) AS items
  FROM (
    SELECT value
    FROM json_each(
      COALESCE(
        json_extract((SELECT payload FROM current_state), '$.draftHistory'),
        '[]'
      )
    )
    UNION ALL
    SELECT json_patch(
      existing.value,
      json_object(
        'archivedAt', '${timestamp}',
        'supersededBy', json_extract(replacement.value, '$.version'),
        'revisionReason', json_extract(replacement.value, '$.revisionReason')
      )
    )
    FROM json_each(
      (SELECT payload FROM current_state),
      '$.drafts'
    ) AS existing
    JOIN draft_replacements AS replacement
      ON json_extract(replacement.value, '$.hotspotId') =
        json_extract(existing.value, '$.hotspotId')
      AND json_extract(replacement.value, '$.platform') =
        json_extract(existing.value, '$.platform')
    WHERE json_extract(replacement.value, '$.revisionMode') =
      'operator-revision'
      AND json_extract(replacement.value, '$.parentVersion') =
        json_extract(existing.value, '$.version')
  )
)
UPDATE workspace_states
SET
  payload = json_set(
    payload,
    '$.drafts', json((SELECT items FROM updated_drafts)),
    '$.draftHistory', json((SELECT items FROM updated_history))
  ),
  updated_by = 'Codex AI Content Operator',
  updated_at = '${timestamp}'
WHERE id = 'default';
--> statement-breakpoint
INSERT INTO audit_events (
  workspace_id,
  actor,
  event_type,
  detail
)
VALUES (
  'default',
  'Codex AI Content Operator',
  '20条本地化正文补齐',
  '20条热点全部补齐小红书正文、配图建议和30–60秒口播；修订9条并新增11条，不自动采用、审核或发布'
);
`;

await writeFile(migrationPath, sql);
console.log(`Generated ${migrationPath} with ${drafts.length} drafts.`);
