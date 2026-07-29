export const WORKSPACE_SCHEMA_VERSION = 2;

export type WorkspaceEnvelope = {
  schemaVersion: number;
  hotspots: unknown[];
  drafts: unknown[];
  discoveryMeta?: unknown;
};

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
