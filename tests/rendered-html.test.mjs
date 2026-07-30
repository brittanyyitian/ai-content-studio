import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("build contains the AI content workbench and no starter preview", async () => {
  const [page, layout, workbench, css, discoveryRoute, engine, schema] =
    await Promise.all([
      readFile(new URL("app/page.tsx", root), "utf8"),
      readFile(new URL("app/layout.tsx", root), "utf8"),
      readFile(new URL("app/workbench.tsx", root), "utf8"),
      readFile(new URL("app/globals.css", root), "utf8"),
      readFile(new URL("app/api/discover/route.ts", root), "utf8"),
      readFile(new URL("lib/content-engine.ts", root), "utf8"),
      readFile(new URL("db/schema.ts", root), "utf8"),
    ]);

  assert.match(page, /<Workbench/);
  assert.match(layout, /潮汐内容台/);
  assert.match(workbench, /今日任务/);
  assert.match(workbench, /审核通过/);
  assert.match(workbench, /提交给 AI 运营任务的修改意见/);
  assert.match(workbench, /短视频脚本/);
  assert.match(workbench, /status: "待发布"/);
  assert.match(workbench, /api\/discover/);
  assert.match(workbench, /海外社媒观察箱/);
  assert.match(workbench, /保存到观察箱/);
  assert.match(workbench, /manualSignals/);
  assert.match(css, /\.review-panel/);
  assert.match(css, /\.source-console/);
  assert.match(discoveryRoute, /discoverDaily/);
  assert.match(engine, /Hacker News/);
  assert.match(engine, /OpenAI News/);
  assert.match(engine, /YouTube/);
  assert.match(engine, /X_BEARER_TOKEN|xBearerToken/);
  assert.match(engine, /大社媒由人工观察箱补充/);
  assert.match(engine, /domestic_scarcity|国内语义查重/);
  assert.match(schema, /discovery_runs/);
  assert.match(schema, /evidence_items/);
  assert.match(schema, /coverage_gaps/);
  assert.doesNotMatch(workbench, /Your site is taking shape|react-loading-skeleton/);
  await access(new URL("dist/server/index.js", root));
  await assert.rejects(access(new URL("app/_sites-preview", root)));
});
