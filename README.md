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
