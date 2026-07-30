export const WORKSPACE_SCHEMA_VERSION = 2;

export type WorkspaceEnvelope = {
  schemaVersion: number;
  hotspots: unknown[];
  drafts: unknown[];
  discoveryMeta?: unknown;
};

type WorkspaceRecord = Record<string, unknown>;

function asRecord(value: unknown): WorkspaceRecord | null {
  return value && typeof value === "object"
    ? (value as WorkspaceRecord)
    : null;
}

function hotspotKey(value: unknown) {
  const record = asRecord(value);
  if (!record) return "";
  const sourceUrl =
    typeof record.sourceUrl === "string" ? record.sourceUrl.trim() : "";
  return sourceUrl || `id:${String(record.id ?? "")}`;
}

function draftKey(value: unknown) {
  const record = asRecord(value);
  if (!record) return "";
  return `${String(record.hotspotId ?? "")}:${String(record.platform ?? "")}`;
}

const PRESERVED_HOTSPOT_FIELDS = [
  "status",
  "selected",
  "assignee",
] as const;

const PRESERVED_DRAFT_FIELDS = [
  "status",
  "reviewNote",
  "body",
  "title",
  "visual",
  "videoScript",
] as const;

function mergeRecord(
  current: unknown,
  incoming: unknown,
  preservedFields: readonly string[],
) {
  const currentRecord = asRecord(current);
  const incomingRecord = asRecord(incoming);
  if (!incomingRecord) return incoming;
  if (!currentRecord) return incomingRecord;

  const merged: WorkspaceRecord = { ...currentRecord, ...incomingRecord };
  for (const field of preservedFields) {
    const value = currentRecord[field];
    if (
      value !== undefined &&
      value !== null &&
      !(typeof value === "string" && value.trim() === "")
    ) {
      merged[field] = value;
    }
  }
  return merged;
}

function mergeCollection(
  current: unknown[],
  incoming: unknown[],
  keyFor: (value: unknown) => string,
  preservedFields: readonly string[],
) {
  const merged = [...current];
  const indexByKey = new Map<string, number>();
  merged.forEach((item, index) => {
    const key = keyFor(item);
    if (key) indexByKey.set(key, index);
  });

  for (const item of incoming) {
    const key = keyFor(item);
    const existingIndex = key ? indexByKey.get(key) : undefined;
    if (existingIndex === undefined) {
      merged.push(item);
      if (key) indexByKey.set(key, merged.length - 1);
      continue;
    }
    merged[existingIndex] = mergeRecord(
      merged[existingIndex],
      item,
      preservedFields,
    );
  }
  return merged;
}

export function mergeWorkspaceStates(
  current: WorkspaceEnvelope | null,
  incoming: WorkspaceEnvelope,
): WorkspaceEnvelope {
  if (!current) return incoming;
  return {
    ...current,
    ...incoming,
    schemaVersion: WORKSPACE_SCHEMA_VERSION,
    hotspots: mergeCollection(
      current.hotspots,
      incoming.hotspots,
      hotspotKey,
      PRESERVED_HOTSPOT_FIELDS,
    ),
    drafts: mergeCollection(
      current.drafts,
      incoming.drafts,
      draftKey,
      PRESERVED_DRAFT_FIELDS,
    ),
  };
}

export function isCurrentWorkspaceState(
  value: unknown,
): value is WorkspaceEnvelope {
  if (!value || typeof value !== "object") return false;
  const state = value as Record<string, unknown>;
  return (
    state.schemaVersion === WORKSPACE_SCHEMA_VERSION &&
    Array.isArray(state.hotspots) &&
    Array.isArray(state.drafts)
  );
}
