"use client";

import { useState } from "react";
import Link from "next/link";

export default function OperatorImporter() {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    setSubmitting(true);
    setMessage("");
    try {
      const parsed = JSON.parse(value) as {
        state?: unknown;
        detail?: string;
      };
      const response = await fetch("/api/operator", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          state: parsed.state ?? parsed,
          detail: parsed.detail ?? "已通过私有运营导入页回写每日内容",
        }),
      });
      const result = (await response.json()) as {
        error?: string;
        hotspotCount?: number;
        draftCount?: number;
      };
      if (!response.ok) throw new Error(result.error || "导入失败");
      setMessage(
        `已写入 ${result.hotspotCount ?? 0} 条候选、${result.draftCount ?? 0} 条初稿。`,
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "导入失败");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="operator-import">
      <div className="operator-import-card">
        <span className="section-kicker">仅限私有运营任务</span>
        <h1>导入今日内容</h1>
        <p>粘贴 AI 运营任务生成的完整工作台 JSON。提交后仍需人工审核，不会自动发布。</p>
        <label htmlFor="operator-payload">工作台 JSON</label>
        <textarea
          id="operator-payload"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="粘贴包含 state、hotspots 和 drafts 的 JSON"
        />
        <div>
          <Link href="/">返回工作台</Link>
          <button disabled={!value.trim() || submitting} onClick={submit}>
            {submitting ? "正在写入…" : "写入工作台"}
          </button>
        </div>
        {message && <output>{message}</output>}
      </div>
    </main>
  );
}
