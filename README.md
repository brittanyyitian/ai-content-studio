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

自动采集会聚合 Hacker News、GitHub、OpenAI News、TechCrunch AI 和
arXiv。配置 `YOUTUBE_API_KEY` 后会加入 YouTube 视频的播放、点赞和评论；
配置 `X_BEARER_TOKEN` 后会通过 X 官方按量接口读取高互动帖子。

Instagram、LinkedIn、TikTok、Dribbble、Reddit 和 Product Hunt 不提供人工
粘贴入口。后续由登录态浏览器采集任务核对公开内容，并把合格结果直接写入候选池。

可选的 `BRAVE_SEARCH_API_KEY` 用于国内公开网页覆盖检查。没有配置时，系统会把国内稀缺分封顶为 55，并要求人工进行目标平台站内核对。

这些都是数据来源配置，不是大模型 API Key。网站不会自动发布任何内容。
