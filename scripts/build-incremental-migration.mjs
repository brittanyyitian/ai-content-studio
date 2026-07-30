import { readFile } from "node:fs/promises";

const packetPath =
  process.argv[2] || "operator-packets/2026-07-30-social-expanded.json";
const migrationPath =
  process.argv[3] || "drizzle/0003_incremental_social_batch.sql";
const packet = JSON.parse(await readFile(packetPath, "utf8"));

function sqlString(value) {
  return JSON.stringify(value).replaceAll("'", "''");
}

const hotspots = sqlString(packet.state.hotspots);
const drafts = sqlString(packet.state.drafts);
const discoveryMeta = sqlString(packet.state.discoveryMeta);
const timestamp = packet.state.discoveryMeta.capturedAt;

const sql = `WITH incoming_hotspots AS (
  SELECT value FROM json_each('${hotspots}')
),
incoming_drafts AS (
  SELECT value FROM json_each('${drafts}')
),
current_state AS (
  SELECT payload FROM workspace_states WHERE id = 'default'
),
merged_hotspots AS (
  SELECT json_group_array(json(value)) AS items
  FROM (
    SELECT value
    FROM json_each((SELECT payload FROM current_state), '$.hotspots')
    UNION ALL
    SELECT incoming.value
    FROM incoming_hotspots AS incoming
    WHERE NOT EXISTS (
      SELECT 1
      FROM json_each((SELECT payload FROM current_state), '$.hotspots') AS existing
      WHERE json_extract(existing.value, '$.sourceUrl') =
        json_extract(incoming.value, '$.sourceUrl')
    )
  )
),
merged_drafts AS (
  SELECT json_group_array(json(value)) AS items
  FROM (
    SELECT value
    FROM json_each((SELECT payload FROM current_state), '$.drafts')
    UNION ALL
    SELECT incoming.value
    FROM incoming_drafts AS incoming
    WHERE NOT EXISTS (
      SELECT 1
      FROM json_each((SELECT payload FROM current_state), '$.drafts') AS existing
      WHERE json_extract(existing.value, '$.hotspotId') =
        json_extract(incoming.value, '$.hotspotId')
        AND json_extract(existing.value, '$.platform') =
          json_extract(incoming.value, '$.platform')
    )
  )
)
UPDATE workspace_states
SET
  payload = json_set(
    payload,
    '$.hotspots', json((SELECT items FROM merged_hotspots)),
    '$.drafts', json((SELECT items FROM merged_drafts)),
    '$.discoveryMeta', json('${discoveryMeta}')
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
  'AI 运营任务增量回写',
  '保留原3条，增量加入17条真实AI趋势候选和5条平台初稿；最终20条候选、8条推荐，不自动审核或发布'
);
`;

const patch = [
  "*** Begin Patch",
  `*** Add File: /Users/edy/ai-content-studio/${migrationPath}`,
  ...sql.trimEnd().split("\n").map((line) => `+${line}`),
  "*** End Patch",
  "",
].join("\n");

process.stdout.write(patch);
