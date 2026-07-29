import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const workspaceStates = sqliteTable("workspace_states", {
  id: text("id").primaryKey(),
  payload: text("payload").notNull(),
  updatedBy: text("updated_by").notNull().default(""),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const auditEvents = sqliteTable("audit_events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  workspaceId: text("workspace_id").notNull(),
  actor: text("actor").notNull().default(""),
  eventType: text("event_type").notNull(),
  detail: text("detail").notNull().default(""),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const discoveryRuns = sqliteTable("discovery_runs", {
  id: text("id").primaryKey(),
  actor: text("actor").notNull().default(""),
  editorialBrief: text("editorial_brief").notNull().default(""),
  status: text("status").notNull(),
  candidateCount: integer("candidate_count").notNull().default(0),
  recommendedCount: integer("recommended_count").notNull().default(0),
  startedAt: text("started_at").notNull(),
  completedAt: text("completed_at"),
});

export const evidenceItems = sqliteTable("evidence_items", {
  id: text("id").primaryKey(),
  runId: text("run_id").notNull(),
  provider: text("provider").notNull(),
  dataset: text("dataset").notNull(),
  sourceType: text("source_type").notNull(),
  author: text("author").notNull().default(""),
  url: text("url").notNull(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull().default(""),
  publishedAt: text("published_at").notNull(),
  capturedAt: text("captured_at").notNull(),
  engagementJson: text("engagement_json").notNull().default("{}"),
  contentHash: text("content_hash").notNull(),
});

export const providerAttempts = sqliteTable("provider_attempts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  runId: text("run_id").notNull(),
  provider: text("provider").notNull(),
  outcome: text("outcome").notNull(),
  itemCount: integer("item_count").notNull().default(0),
  reason: text("reason").notNull().default(""),
  startedAt: text("started_at").notNull(),
  endedAt: text("ended_at").notNull(),
});

export const coverageGaps = sqliteTable("coverage_gaps", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  runId: text("run_id").notNull(),
  dimension: text("dimension").notNull(),
  scope: text("scope").notNull(),
  reason: text("reason").notNull(),
  impact: text("impact").notNull(),
  manualTask: text("manual_task").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
