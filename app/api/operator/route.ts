import { env } from "cloudflare:workers";
import { desc, eq } from "drizzle-orm";
import { ensureDb, getDb } from "../../../db";
import { auditEvents, workspaceStates } from "../../../db/schema";
import {
  isCurrentWorkspaceState,
  mergeWorkspaceStates,
} from "../../../lib/workspace-contract";

const WORKSPACE_ID = "default";

function resolveActor(request: Request) {
  const signedInUser = request.headers.get("oai-authenticated-user-email");
  if (signedInUser) return signedInUser;

  const hostname = new URL(request.url).hostname;
  if (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "::1" ||
    hostname === "[::1]"
  ) {
    return "local-operator";
  }

  const runtime = env as unknown as { OPERATOR_IMPORT_TOKEN?: string };
  const expected = runtime.OPERATOR_IMPORT_TOKEN?.trim();
  const authorization = request.headers.get("authorization");
  if (expected && authorization === `Bearer ${expected}`) {
    return "Codex AI Content Operator";
  }
  return "";
}

export async function GET(request: Request) {
  const actor = resolveActor(request);
  if (!actor) {
    return Response.json({ error: "未授权的运营任务。" }, { status: 401 });
  }

  await ensureDb();
  const db = getDb();
  const [state] = await db
    .select()
    .from(workspaceStates)
    .where(eq(workspaceStates.id, WORKSPACE_ID))
    .limit(1);
  const events = await db
    .select()
    .from(auditEvents)
    .where(eq(auditEvents.workspaceId, WORKSPACE_ID))
    .orderBy(desc(auditEvents.id))
    .limit(30);

  return Response.json({
    state: state ? JSON.parse(state.payload) : null,
    updatedAt: state?.updatedAt ?? null,
    events,
  });
}

export async function POST(request: Request) {
  const actor = resolveActor(request);
  if (!actor) {
    return Response.json({ error: "未授权的运营任务。" }, { status: 401 });
  }

  const payload = (await request.json().catch(() => ({}))) as {
    state?: unknown;
    detail?: string;
    mode?: "merge" | "replace";
  };
  if (!isCurrentWorkspaceState(payload.state)) {
    return Response.json(
      { error: "运营包结构无效或版本过旧。" },
      { status: 400 },
    );
  }

  await ensureDb();
  const db = getDb();
  const [stored] = await db
    .select()
    .from(workspaceStates)
    .where(eq(workspaceStates.id, WORKSPACE_ID))
    .limit(1);
  const currentState = stored
    ? (JSON.parse(stored.payload) as unknown)
    : null;
  const nextState =
    payload.mode === "replace" || !isCurrentWorkspaceState(currentState)
      ? payload.state
      : mergeWorkspaceStates(currentState, payload.state);
  const encoded = JSON.stringify(nextState);
  await db
    .insert(workspaceStates)
    .values({
      id: WORKSPACE_ID,
      payload: encoded,
      updatedBy: actor,
    })
    .onConflictDoUpdate({
      target: workspaceStates.id,
      set: {
        payload: encoded,
        updatedBy: actor,
        updatedAt: new Date().toISOString(),
      },
    });
  await db.insert(auditEvents).values({
    workspaceId: WORKSPACE_ID,
    actor,
    eventType:
      payload.mode === "replace" ? "AI 运营任务替换" : "AI 运营任务增量回写",
    detail:
      payload.detail?.trim() ||
      (payload.mode === "replace"
        ? "已替换热点分析与平台初稿"
        : "已增量合并热点分析与平台初稿"),
  });

  return Response.json({
    ok: true,
    mode: payload.mode === "replace" ? "replace" : "merge",
    hotspotCount: nextState.hotspots.length,
    draftCount: nextState.drafts.length,
  });
}
