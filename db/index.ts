import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export function getDb() {
  if (!env.DB) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. Set the `d1` field in .openai/hosting.json to `DB` or let your control plane inject the real binding values before using the database."
    );
  }

  return drizzle(env.DB, { schema });
}

let initialization: Promise<void> | null = null;

export function ensureDb() {
  if (initialization) return initialization;
  if (!env.DB) {
    return Promise.reject(new Error("Cloudflare D1 binding `DB` is unavailable."));
  }

  const d1 = env.DB;
  initialization = d1
    .batch([
      d1.prepare(`
        CREATE TABLE IF NOT EXISTS workspace_states (
          id TEXT PRIMARY KEY NOT NULL,
          payload TEXT NOT NULL,
          updated_by TEXT DEFAULT '' NOT NULL,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL
        )
      `),
      d1.prepare(`
        CREATE TABLE IF NOT EXISTS audit_events (
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          workspace_id TEXT NOT NULL,
          actor TEXT DEFAULT '' NOT NULL,
          event_type TEXT NOT NULL,
          detail TEXT DEFAULT '' NOT NULL,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL
        )
      `),
      d1.prepare(`
        CREATE TABLE IF NOT EXISTS discovery_runs (
          id TEXT PRIMARY KEY NOT NULL,
          actor TEXT DEFAULT '' NOT NULL,
          editorial_brief TEXT DEFAULT '' NOT NULL,
          status TEXT NOT NULL,
          candidate_count INTEGER DEFAULT 0 NOT NULL,
          recommended_count INTEGER DEFAULT 0 NOT NULL,
          started_at TEXT NOT NULL,
          completed_at TEXT
        )
      `),
      d1.prepare(`
        CREATE TABLE IF NOT EXISTS evidence_items (
          id TEXT PRIMARY KEY NOT NULL,
          run_id TEXT NOT NULL,
          provider TEXT NOT NULL,
          dataset TEXT NOT NULL,
          source_type TEXT NOT NULL,
          author TEXT DEFAULT '' NOT NULL,
          url TEXT NOT NULL,
          title TEXT NOT NULL,
          excerpt TEXT DEFAULT '' NOT NULL,
          published_at TEXT NOT NULL,
          captured_at TEXT NOT NULL,
          engagement_json TEXT DEFAULT '{}' NOT NULL,
          content_hash TEXT NOT NULL
        )
      `),
      d1.prepare(`
        CREATE TABLE IF NOT EXISTS provider_attempts (
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          run_id TEXT NOT NULL,
          provider TEXT NOT NULL,
          outcome TEXT NOT NULL,
          item_count INTEGER DEFAULT 0 NOT NULL,
          reason TEXT DEFAULT '' NOT NULL,
          started_at TEXT NOT NULL,
          ended_at TEXT NOT NULL
        )
      `),
      d1.prepare(`
        CREATE TABLE IF NOT EXISTS coverage_gaps (
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          run_id TEXT NOT NULL,
          dimension TEXT NOT NULL,
          scope TEXT NOT NULL,
          reason TEXT NOT NULL,
          impact TEXT NOT NULL,
          manual_task TEXT NOT NULL,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL
        )
      `),
      d1.prepare(
        "CREATE INDEX IF NOT EXISTS evidence_items_run_id_idx ON evidence_items (run_id)",
      ),
      d1.prepare(
        "CREATE INDEX IF NOT EXISTS provider_attempts_run_id_idx ON provider_attempts (run_id)",
      ),
    ])
    .then(() => undefined)
    .catch((error) => {
      initialization = null;
      throw error;
    });

  return initialization;
}
