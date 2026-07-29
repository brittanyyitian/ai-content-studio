import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";

const [mode, filePath] = process.argv.slice(2);
const baseUrl =
  process.env.CONTENT_WORKBENCH_URL ||
  "https://tide-ai-content-studio.brittanyyitian.chatgpt.site";

function readOperatorToken() {
  if (process.env.OPERATOR_IMPORT_TOKEN) {
    return process.env.OPERATOR_IMPORT_TOKEN.trim();
  }
  if (process.platform === "darwin") {
    try {
      return execFileSync(
        "security",
        [
          "find-generic-password",
          "-a",
          process.env.USER || "edy",
          "-s",
          "tide-ai-content-operator",
          "-w",
        ],
        { encoding: "utf8" },
      ).trim();
    } catch {
      // Fall through to the actionable error below.
    }
  }
  throw new Error(
    "Missing operator credential. Configure OPERATOR_IMPORT_TOKEN or the macOS Keychain item tide-ai-content-operator.",
  );
}

if (!["pull", "push"].includes(mode) || !filePath) {
  throw new Error(
    "Usage: node scripts/operator-workbench.mjs <pull|push> <json-path>",
  );
}

const token = readOperatorToken();
const endpoint = `${baseUrl.replace(/\/$/, "")}/api/operator`;

if (mode === "pull") {
  const response = await fetch(endpoint, {
    headers: { authorization: `Bearer ${token}` },
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "Operator pull failed");
  await writeFile(filePath, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(
    `Pulled ${payload.state?.hotspots?.length || 0} hotspots to ${filePath}`,
  );
} else {
  const payload = JSON.parse(await readFile(filePath, "utf8"));
  const state = payload.state || payload;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      state,
      detail:
        payload.detail ||
        `Codex 生成 ${state.hotspots?.length || 0} 条热点与 ${state.drafts?.length || 0} 条草稿`,
    }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Operator push failed");
  console.log(
    `Published ${result.hotspotCount} hotspots and ${result.draftCount} drafts`,
  );
}
