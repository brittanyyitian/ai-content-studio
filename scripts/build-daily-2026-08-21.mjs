import fs from "node:fs";
import path from "node:path";
import { items20260821 as items } from "./daily-items-2026-08-21.mjs";

const root = process.cwd();
const previous = JSON.parse(fs.readFileSync(path.join(root, "operator-packets/2026-08-20-daily-batch.json"), "utf8"));
const previousState = previous.state ?? previous;
const capturedAt = "2026-08-21T08:30:00+08:00";
const domesticCoverage = "未接入小红书、抖音平台内全量语义检索；国内稀缺度封顶55。发布前人工搜索产品名、核心主张、本文角度和目标人群，不得声称‘国内没人发’。";
const visual = "4:5黑白极简信息卡，轻微手绘圆点或弧线；首图只放自然口语标题和一个核心物件，内页优先真实页面、设置或终端截图。不要机器人头像、蓝紫渐变、虚构收益、无来源数字和装饰性大段文字。";
const sourceFailures = [
  "生产工作台预读取失败：本机缺少tide-ai-content-operator凭据，无法确认8月20日之后新增的reviewNote。",
  "X、Instagram、TikTok、LinkedIn未取得可同时复核原文、发布时间和公开互动的完整新增样本；本批不伪造社媒数据。",
  "Reddit与国内平台未取得稳定合规搜索链；国内稀缺度统一封顶55并创建人工搜索任务。",
  "部分独立产品只有极少公开讨论；已降低热度和证据置信度，没有拿内部评分冒充流量。"
];

if (items.length !== 20) throw new Error(`Expected 20 items, got ${items.length}`);
if (items.filter((item) => item.recommended).length !== 8) throw new Error("Expected 8 recommendations");

const hotspots = items.map((item, index) => ({
  id: 2026082101 + index,
  rank: index + 1,
  source: item.source,
  sourceUrl: item.sourceUrl,
  sourceType: item.sourceType,
  age: "今天/近24小时",
  originalTitle: item.originalTitle,
  title: item.title,
  summary: item.summary,
  heat: item.heat,
  scarcity: Math.min(item.scarcity, 55),
  fit: item.fit,
  reason: item.reason,
  angle: item.angle,
  platforms: ["小红书", "抖音", "视频号"],
  category: item.category,
  status: "待审核",
  selected: false,
  assignee: "待分配",
  live: true,
  sourceCapturedAt: capturedAt,
  evidenceConfidence: item.evidenceConfidence,
  actionability: item.actionability,
  domesticCoverage,
  humanCheck: item.humanCheck,
  evidenceId: item.evidenceId,
  engagement: item.engagement,
  engagementLabel: item.engagementLabel,
  discussionUrl: item.discussionUrl,
  discussionFocus: item.discussionFocus,
  commentSamples: item.commentSamples,
  reuseIdeas: [item.angle, item.saveObject, "只复用事实、检查方法和验证路径，不复制原作者句子与叙事结构。"],
  localizedTranslation: item.localizedTranslation,
  analysisState: "已分析",
  saveObject: item.saveObject,
  learningOutcome: item.learningOutcome,
  recommended: item.recommended,
  editorialGate: {
    saveObject: item.saveObject,
    learningOutcome: item.learningOutcome,
    shareReason: "读者可以保存一份具体清单、判断方法或操作步骤。",
    passed: true
  }
}));

const drafts = items.map((item, index) => ({
  id: 5026081701 + index,
  hotspotId: 2026082101 + index,
  platform: "小红书",
  title: item.title,
  body: item.body,
  visual,
  videoScript: item.video,
  version: "V1 · 8月21日来源重写稿",
  parentVersion: null,
  revisionMode: "operator-daily",
  revisionReason: "依据8月21日原始页面、公开互动和可验证讨论重新写作；未自动审核。",
  revisedAt: capturedAt,
  updatedBy: "Codex AI Content Operator",
  status: "待审核",
  reviewNote: ""
}));

const priorDrafts = Array.isArray(previousState.drafts) ? previousState.drafts : [];
const priorReviewNotes = priorDrafts.filter((draft) => String(draft.reviewNote ?? "").trim());
const auditEvents = [
  ...(previousState.auditEvents ?? []),
  {
    content_id: "daily-2026-08-21",
    actor: "Codex AI Content Operator",
    action: "revise",
    from_version: 0,
    to_version: 1,
    comment: "生成8月21日真实来源批次；保留8月20日版本与审计，未审核、未排期、未发布。生产reviewNote因凭据缺失无法读取。",
    created_at: capturedAt
  }
];

const state = {
  schemaVersion: 2,
  hotspots,
  drafts,
  draftHistory: [
    ...(previousState.draftHistory ?? []),
    ...priorDrafts.map((draft) => ({
      ...draft,
      archivedAt: capturedAt,
      supersededBy: "2026-08-21 daily batch",
      revisionReason: "跨日换新来源；保留旧文案、人工修改、reviewNote与审核记录供追溯。"
    }))
  ],
  auditEvents,
  discoveryMeta: {
    runId: "daily-2026-08-21-real-sources",
    capturedAt,
    coverageLabel: "20条真实候选，7条推荐；20条均完成中文标题、事实摘要、公开互动、本地化、讨论、复用角度、人工核验、小红书稿和短视频口播。",
    editorialBrief: "优先结构化AI编码、多GPU稳定性、最小评测集、Agent框架选型、商品目录问答、独立代码验收、工作日志和笔记迁移；弱互动行业新闻只留候选。",
    sourceSuccess: [
      "Hacker News Algolia成功：聚合AI、LLM、Agent检索，核对20个来源簇的points、comments、原文与代表性评论。",
      "一手项目与实践页成功：Huzzah、多GPU实测、TrueForge、Kandelo、Meridian、GoodNotes解析器与Namo Complete等可访问。",
      "研究与权威来源成功：OpenAI AI Futures、Nature科研报道、BC Tribunal法律案例及SSRN线索进入候选，并明确法律或研究边界。",
      "GitHub Search成功；早期项目仅在提供真实迁移、验收、日志或沙箱方法时进入候选，没有用Stars替代采用效果。",
      "OpenAI News、TechCrunch AI、arXiv feed成功用于交叉浏览与去重；无强互动的一手条目未被包装成热门。"
    ],
    sourceFailure: sourceFailures,
    domesticSearchState: domesticCoverage,
    rejectedTopics: [
      "OpenRouter并购、Unsloth量化、AGENTS.md与OneCLI等8月20日推荐主题不重复进入今日候选。",
      "政治人物、情感陪伴、攻击复现、医疗建议、监控规避和缺少来源的收益数字已排除。",
      "AI音乐40%与生物医学论文90%等数字仅留候选，均要求补原研究和误差口径。",
      "欧盟AI版权社媒帖证据不足，已降置信度并标记必须法律核验。"
    ],
    recommendationCount: 8,
    reviewNoteAudit: {
      productionPull: "失败：缺少tide-ai-content-operator凭据",
      localBaselineNotes: priorReviewNotes.length,
      handled: priorReviewNotes.length,
      action: "8月20日本地基线中无未处理reviewNote；生产站后续意见无法读取。历史版本全部保留，写回前需运营人员确认线上意见。"
    }
  }
};

const packet = {
  mode: "replace",
  detail: "2026-08-21真实来源日更：20条候选、8条推荐、20条本地化小红书稿和短视频口播；保留历史和审计，不自动审核或发布。",
  state
};

const handoff = {
  schema_version: 2,
  batch_id: "daily-2026-08-21-real-sources",
  batch_date: "2026-08-21",
  editorial_brief: state.discoveryMeta.editorialBrief,
  hotspots: hotspots.map((hotspot, index) => ({
    id: String(hotspot.id),
    title: hotspot.title,
    original_title: hotspot.originalTitle,
    summary: hotspot.summary,
    category: hotspot.category,
    status: "待审核",
    recommended: items[index].recommended,
    reason: hotspot.reason,
    angle: hotspot.angle,
    human_check: hotspot.humanCheck,
    sources: [{
      url: hotspot.sourceUrl,
      author: hotspot.source,
      discussion_url: hotspot.discussionUrl,
      source_type: hotspot.sourceType,
      captured_at: hotspot.sourceCapturedAt,
      engagement: hotspot.engagement,
      engagement_label: hotspot.engagementLabel
    }],
    scores: {
      foreign_heat: hotspot.heat,
      domestic_scarcity: hotspot.scarcity,
      account_fit: hotspot.fit,
      actionability: hotspot.actionability,
      evidence_confidence: hotspot.evidenceConfidence,
      final: Math.max(0, Math.min(100, Math.round(hotspot.heat * .25 + hotspot.scarcity * .25 + hotspot.fit * .25 + hotspot.actionability * .15 + hotspot.evidenceConfidence * .1)))
    },
    domestic_checks: [{ platform: "小红书/抖音", query: hotspot.title, finding: hotspot.domesticCoverage }],
    localized_translation: hotspot.localizedTranslation,
    discussion_focus: hotspot.discussionFocus,
    comment_samples: hotspot.commentSamples,
    reuse_ideas: hotspot.reuseIdeas,
    save_object: hotspot.saveObject,
    learning_outcome: hotspot.learningOutcome
  })),
  drafts: drafts.map((draft) => ({
    content_id: String(draft.id),
    hotspot_id: String(draft.hotspotId),
    platform: draft.platform,
    title: draft.title,
    body: draft.body,
    visual_brief: draft.visual,
    video_script: draft.videoScript,
    version: 1,
    parent_version: null,
    status: "待审核"
  })),
  gaps: sourceFailures,
  generated_at: capturedAt
};

fs.writeFileSync(path.join(root, "operator-packets/2026-08-21-daily-batch.json"), JSON.stringify(packet, null, 2) + "\n");
fs.writeFileSync(path.join(root, "operator-packets/2026-08-21-daily-handoff.json"), JSON.stringify(handoff, null, 2) + "\n");
console.log("built 20 hotspots / 8 recommendations");
