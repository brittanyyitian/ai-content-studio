import { env } from "cloudflare:workers";
import { eq } from "drizzle-orm";
import {
  auditEvents,
  coverageGaps,
  discoveryRuns,
  evidenceItems,
  providerAttempts,
  workspaceStates,
} from "../../../db/schema";
import { ensureDb, getDb } from "../../../db";
import { discoverDaily } from "../../../lib/content-engine";
import { WORKSPACE_SCHEMA_VERSION } from "../../../lib/workspace-contract";

const WORKSPACE_ID = "default";

export async function POST(request: Request) {
  const actor = request.headers.get("oai-authenticated-user-email");
  const hostname = new URL(request.url).hostname;
  const runtime = env as unknown as {
    BRAVE_SEARCH_API_KEY?: string;
    YOUTUBE_API_KEY?: string;
    X_BEARER_TOKEN?: string;
    OPERATOR_IMPORT_TOKEN?: string;
  };
  const expectedOperatorToken = runtime.OPERATOR_IMPORT_TOKEN?.trim();
  const isOperator =
    Boolean(expectedOperatorToken) &&
    request.headers.get("authorization") ===
      `Bearer ${expectedOperatorToken}`;
  const isLocal =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname === "[::1]";
  if (!actor && !isLocal && !isOperator) {
    return Response.json({ error: "需要登录后才能刷新热点。" }, { status: 401 });
  }
  const resolvedActor =
    actor || (isOperator ? "Codex AI Content Operator" : "local-preview");

  await ensureDb();
  const payload = (await request.json().catch(() => ({}))) as {
    editorialBrief?: string;
  };
  const editorialBrief = payload.editorialBrief?.trim().slice(0, 500) || "";
  const runId = `run-${new Date().toISOString().replace(/\D/g, "").slice(0, 14)}-${crypto.randomUUID().slice(0, 8)}`;
  const startedAt = new Date().toISOString();
  const db = getDb();

  await db.insert(discoveryRuns).values({
    id: runId,
    actor: resolvedActor,
    editorialBrief,
    status: "running",
    startedAt,
  });

  try {
    const result = await discoverDaily({
      editorialBrief,
      braveSearchKey: runtime.BRAVE_SEARCH_API_KEY,
      youtubeApiKey: runtime.YOUTUBE_API_KEY,
      xBearerToken: runtime.X_BEARER_TOKEN,
    });

    for (let index = 0; index < result.evidence.length; index += 5) {
      const chunk = result.evidence.slice(index, index + 5);
      await db
        .insert(evidenceItems)
        .values(
          chunk.map((item) => ({
            id: `${runId}-${item.id}`,
            runId,
            provider: item.provider,
            dataset: item.dataset,
            sourceType: item.sourceType,
            author: item.author,
            url: item.url,
            title: item.title,
            excerpt: item.excerpt,
            publishedAt: item.publishedAt,
            capturedAt: item.capturedAt,
            engagementJson: JSON.stringify(item.engagement),
            contentHash: item.contentHash,
          })),
        )
        .onConflictDoNothing();
    }

    if (result.attempts.length) {
      await db.insert(providerAttempts).values(
        result.attempts.map((attempt) => ({
          runId,
          provider: attempt.provider,
          outcome: attempt.outcome,
          itemCount: attempt.itemCount,
          reason: attempt.reason,
          startedAt: attempt.startedAt,
          endedAt: attempt.endedAt,
        })),
      );
    }

    if (result.gaps.length) {
      await db.insert(coverageGaps).values(
        result.gaps.map((gap) => ({
          runId,
          dimension: gap.dimension,
          scope: gap.scope,
          reason: gap.reason,
          impact: gap.impact,
          manualTask: gap.manualTask,
        })),
      );
    }

    const [previous] = await db
      .select()
      .from(workspaceStates)
      .where(eq(workspaceStates.id, WORKSPACE_ID))
      .limit(1);
    const previousState = previous
      ? (JSON.parse(previous.payload) as Record<string, unknown>)
      : {};
    const state = {
      ...previousState,
      schemaVersion: WORKSPACE_SCHEMA_VERSION,
      hotspots: result.hotspots,
      drafts: result.drafts,
      discoveryMeta: {
        runId,
        capturedAt: result.capturedAt,
        coverageLabel: result.coverageLabel,
        gapCount: result.gaps.length,
        editorialBrief,
      },
    };

    await db
      .insert(workspaceStates)
      .values({
        id: WORKSPACE_ID,
        payload: JSON.stringify(state),
        updatedBy: resolvedActor,
      })
      .onConflictDoUpdate({
        target: workspaceStates.id,
        set: {
          payload: JSON.stringify(state),
          updatedBy: resolvedActor,
          updatedAt: new Date().toISOString(),
        },
      });

    await db.insert(auditEvents).values({
      workspaceId: WORKSPACE_ID,
      actor: resolvedActor,
      eventType: "完成今日真实热点采集",
      detail: `${result.hotspots.length} 条候选，${result.drafts.length} 条推荐，${result.gaps.length} 个覆盖缺口`,
    });

    await db
      .update(discoveryRuns)
      .set({
        status: "completed",
        candidateCount: result.hotspots.length,
        recommendedCount: result.drafts.length,
        completedAt: new Date().toISOString(),
      })
      .where(eq(discoveryRuns.id, runId));

    return Response.json({
      hotspots: result.hotspots,
      drafts: result.drafts,
      meta: state.discoveryMeta,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "热点采集失败";
    await db
      .update(discoveryRuns)
      .set({ status: "failed", completedAt: new Date().toISOString() })
      .where(eq(discoveryRuns.id, runId));
    return Response.json(
      { error: "本轮热点整理没有完成，请稍后重试。", detail: message.slice(0, 180) },
      { status: 502 },
    );
  }
}
