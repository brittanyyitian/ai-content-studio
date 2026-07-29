import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("build contains the AI content workbench and no starter preview", async () => {
  const [page, layout, workbench, css] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("app/workbench.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
  ]);

  assert.match(page, /<Workbench/);
  assert.match(layout, /潮汐内容台/);
  assert.match(workbench, /今日任务/);
  assert.match(workbench, /审核通过/);
  assert.match(workbench, /所有修改会记录操作者、时间和版本/);
  assert.match(workbench, /不会自动发布/);
  assert.match(css, /\.review-panel/);
  assert.doesNotMatch(workbench, /Your site is taking shape|react-loading-skeleton/);
  await access(new URL("dist/server/index.js", root));
  await assert.rejects(access(new URL("app/_sites-preview", root)));
});
