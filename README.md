# 潮汐内容台

团队内部使用的 AI 内容运营工作台。第一版覆盖今日热点、人工审核、内容版本、发布日历、账号管理和数据复盘。

## 本地运行

```bash
pnpm install
pnpm run dev
```

## 验证

```bash
pnpm run lint
pnpm test
```

结构化工作台状态存入 Cloudflare D1；`.openai/hosting.json` 使用 `DB` binding。所有内容必须经过人工审核，网站不会自动发布。

## 真实热点采集

右上角“采集今日真实热点”会聚合 Hacker News、GitHub、OpenAI News、
TechCrunch AI 和 arXiv，完成去重、来源平衡和推荐组合，再把证据、采集尝试与覆盖缺口写入 D1。

可选的 `BRAVE_SEARCH_API_KEY` 用于国内公开网页覆盖检查。没有配置时，系统会把国内稀缺分封顶为 55，并要求人工进行目标平台站内核对。
