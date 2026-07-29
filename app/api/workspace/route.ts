import { desc, eq } from "drizzle-orm";
import { ensureDb, getDb } from "../../../db";
import { auditEvents, workspaceStates } from "../../../db/schema";
import {
  isCurrentWorkspaceState,
  WORKSPACE_SCHEMA_VERSION,
} from "../../../lib/workspace-contract";

const WORKSPACE_ID = "default";

function errorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "Unexpected error";
  if (message.includes("no such table")) {
    return "工作台数据库尚未初始化，请先应用 D1 migration。";
  }
  return message;
}

export async function GET() {
  try {
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
  } catch (error) {
    return Response.json({ error: errorMessage(error) }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await ensureDb();
    const payload = (await request.json()) as {
      state?: unknown;
      actor?: string;
      eventType?: string;
      detail?: string;
    };
    if (!payload.state) {
      return Response.json({ error: "state is required" }, { status: 400 });
    }
    if (!isCurrentWorkspaceState(payload.state)) {
      return Response.json(
        {
          error: "工作台页面版本过旧，请刷新页面后再保存。",
          expectedSchemaVersion: WORKSPACE_SCHEMA_VERSION,
        },
        { status: 409 },
      );
    }

    const actor =
      request.headers.get("oai-authenticated-user-email") ||
      payload.actor?.trim() ||
      "内容运营";
    const db = getDb();
    const encoded = JSON.stringify(payload.state);

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
      eventType: payload.eventType?.trim() || "保存工作台",
      detail: payload.detail?.trim() || "内容状态或草稿已更新",
    });

    return Response.json({ ok: true, updatedAt: new Date().toISOString() });
  } catch (error) {
    return Response.json({ error: errorMessage(error) }, { status: 500 });
  }
}
