import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";

const [mode, filePath] = process.argv.slice(2);
const baseUrl =
  process.env.CONTENT_WORKBENCH_URL ||
  "https://tide-ai-content-studio.brittanyyitian.chatgpt.site";

function readCredential(envKey, keychainService) {
  if (process.env[envKey]) {
    return process.env[envKey].trim();
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
          keychainService,
          "-w",
        ],
        { encoding: "utf8" },
      ).trim();
    } catch {
      // Fall through to the actionable error below.
    }
  }
  throw new Error(
    `Missing credential. Configure ${envKey} or the macOS Keychain item ${keychainService}.`,
  );
}

if (
  !["refresh", "pull", "push"].includes(mode) ||
  (mode !== "refresh" && !filePath)
) {
  throw new Error(
    "Usage: node scripts/operator-workbench.mjs <refresh> | <pull|push> <json-path>",
  );
}

const token = readCredential(
  "OPERATOR_IMPORT_TOKEN",
  "tide-ai-content-operator",
);
const siwcToken = readCredential(
  "OAI_SITES_BYPASS_TOKEN",
  "tide-ai-content-siwc-bypass",
);
const requestHeaders = {
  authorization: `Bearer ${token}`,
  "OAI-Sites-Authorization": `Bearer ${siwcToken}`,
};
const endpoint = `${baseUrl.replace(/\/$/, "")}/api/operator`;

if (mode === "refresh") {
  const response = await fetch(
    `${baseUrl.replace(/\/$/, "")}/api/discover`,
    {
      method: "POST",
      headers: {
        ...requestHeaders,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        editorialBrief:
          process.env.EDITORIAL_BRIEF ||
          "优先可复用的 AI 技巧和真实案例，减少纯产业快讯。",
      }),
    },
  );
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "Operator refresh failed");
  console.log(
    `Refreshed ${payload.hotspots?.length || 0} hotspots and ${payload.drafts?.length || 0} recommendations`,
  );
} else if (mode === "pull") {
  const response = await fetch(endpoint, {
    headers: requestHeaders,
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
      ...requestHeaders,
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
