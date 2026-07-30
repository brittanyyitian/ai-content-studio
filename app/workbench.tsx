"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  isCurrentWorkspaceState,
  WORKSPACE_SCHEMA_VERSION,
} from "../lib/workspace-contract";

type View =
  | "today"
  | "inbox"
  | "library"
  | "calendar"
  | "analytics"
  | "accounts";
type HumanStatus = "待选题" | "待审核" | "待发布" | "已发布" | "已结束";

type Hotspot = {
  id: number;
  rank: number;
  source: string;
  sourceUrl: string;
  sourceType: string;
  age: string;
  title: string;
  summary: string;
  heat: number;
  scarcity: number;
  fit: number;
  reason: string;
  angle: string;
  platforms: string[];
  category: string;
  status: HumanStatus;
  selected: boolean;
  assignee: string;
  live?: boolean;
  sourceCapturedAt?: string;
  evidenceConfidence?: number;
  domesticCoverage?: string;
  humanCheck?: string;
  evidenceId?: string;
  engagement?: Record<string, number>;
  engagementLabel?: string;
  discussionUrl?: string;
  discussionFocus?: string[];
  reuseIdeas?: string[];
  localizedTranslation?: string;
  analysisState?: "待模型分析" | "规则初判" | "已分析";
};

type Draft = {
  id: number;
  hotspotId: number;
  platform: string;
  title: string;
  body: string;
  visual: string;
  version: string;
  updatedBy: string;
  status: HumanStatus;
  reviewNote?: string;
  videoScript?: string;
};

type DiscoveryMeta = {
  runId: string;
  capturedAt: string;
  coverageLabel: string;
  gapCount: number;
  editorialBrief: string;
};

type ManualSignal = {
  id: string;
  platform: string;
  url: string;
  author: string;
  originalText: string;
  engagement: string;
  note: string;
  capturedAt: string;
  capturedBy: string;
  status: "待选题" | "已结束";
};

type WorkspaceState = {
  schemaVersion: number;
  hotspots: Hotspot[];
  drafts: Draft[];
  discoveryMeta: DiscoveryMeta | null;
  manualSignals?: ManualSignal[];
};

const LOCAL_CACHE_KEY = `tide-content-workbench-v${WORKSPACE_SCHEMA_VERSION}`;

const nav: { id: View; label: string }[] = [
  { id: "today", label: "今日任务" },
  { id: "inbox", label: "观察箱" },
  { id: "library", label: "内容库" },
  { id: "calendar", label: "发布日历" },
  { id: "analytics", label: "数据表现" },
  { id: "accounts", label: "账号设置" },
];

const sourceChannels = [
  {
    name: "Hacker News",
    mode: "免费自动",
    coverage: "帖子、积分、评论",
    state: "运行中",
  },
  {
    name: "GitHub",
    mode: "免费自动",
    coverage: "项目、Stars、Forks",
    state: "运行中",
  },
  {
    name: "官网 / RSS",
    mode: "免费自动",
    coverage: "官方更新与媒体报道",
    state: "运行中",
  },
  {
    name: "YouTube",
    mode: "免费额度",
    coverage: "播放、点赞、评论",
    state: "待配置",
  },
  {
    name: "X",
    mode: "按量付费",
    coverage: "帖子、浏览、点赞、回复",
    state: "可选接入",
  },
  {
    name: "Instagram / LinkedIn",
    mode: "人工观察",
    coverage: "重点账号与公开互动",
    state: "可使用",
  },
  {
    name: "TikTok / Dribbble",
    mode: "人工观察",
    coverage: "热门视频、作品与评论",
    state: "可使用",
  },
  {
    name: "Reddit / Product Hunt",
    mode: "人工观察",
    coverage: "社区讨论与产品反馈",
    state: "可使用",
  },
];

const DEFAULT_EDITORIAL_BRIEF =
  "今天少选产业快讯，多选可以实际操作的 AI 技巧。";

const seedHotspots: Hotspot[] = [
  {
    id: 1,
    rank: 1,
    source: "Andrej Karpathy",
    sourceUrl: "https://x.com/karpathy",
    sourceType: "X",
    age: "2 小时前",
    title: "“Vibe coding”之后，新的稀缺能力是判断力",
    summary: "海外开发者正在讨论：当 AI 可以快速写出代码，人的价值开始从执行转向拆解、验收和取舍。",
    heat: 94,
    scarcity: 91,
    fit: 96,
    reason: "海外讨论增长快，国内多在解释概念，还很少有人给非技术创业者一套可执行的验收方法。",
    angle: "不是教你写代码，而是教你如何验收 AI 员工",
    platforms: ["小红书", "公众号", "视频号"],
    category: "AI 技巧",
    status: "待审核",
    selected: true,
    assignee: "小周",
  },
  {
    id: 2,
    rank: 2,
    source: "OpenAI Developers",
    sourceUrl: "https://developers.openai.com/",
    sourceType: "Blog",
    age: "4 小时前",
    title: "Agent 工作流开始从单步提示走向长任务协作",
    summary: "新一轮讨论不再围绕“哪个模型最强”，而是如何让多个工具、记忆和人工确认共同完成长任务。",
    heat: 91,
    scarcity: 88,
    fit: 93,
    reason: "国内已有资讯转述，但缺少面向小团队的工作流拆解，可以用真实业务场景解释。",
    angle: "3 人团队如何把 AI 从聊天框变成可交付的同事",
    platforms: ["公众号", "知乎", "即刻"],
    category: "产业观察",
    status: "待审核",
    selected: true,
    assignee: "小林",
  },
  {
    id: 3,
    rank: 3,
    source: "Ben's Bites",
    sourceUrl: "https://www.bensbites.com/",
    sourceType: "Newsletter",
    age: "6 小时前",
    title: "一人公司正在用 AI 把客户访谈变成产品素材",
    summary: "从会议录音提炼痛点，再生成 FAQ、销售页和短视频脚本，成为海外独立开发者的高频实践。",
    heat: 87,
    scarcity: 95,
    fit: 92,
    reason: "案例操作性强，国内尚未形成同角度的系统内容，适合女性创业者和知识服务人群。",
    angle: "一次客户访谈，拆成一周能发的内容",
    platforms: ["小红书", "抖音", "视频号"],
    category: "实操案例",
    status: "待审核",
    selected: true,
    assignee: "待分配",
  },
  {
    id: 4,
    rank: 4,
    source: "Hugging Face",
    sourceUrl: "https://huggingface.co/blog",
    sourceType: "Blog",
    age: "8 小时前",
    title: "小模型在本地设备上的体验正在快速追平",
    summary: "更轻量的推理与隐私方案，让本地 AI 在客服、知识库和个人数据处理上出现新机会。",
    heat: 83,
    scarcity: 82,
    fit: 76,
    reason: "有产业价值，但当前账号受众偏业务实践，需要避免过度技术化。",
    angle: "为什么下一批 AI 工具可能不需要上传你的数据",
    platforms: ["公众号", "知乎"],
    category: "产业观察",
    status: "待选题",
    selected: false,
    assignee: "待分配",
  },
  {
    id: 5,
    rank: 5,
    source: "Reddit · r/SideProject",
    sourceUrl: "https://www.reddit.com/r/SideProject/",
    sourceType: "Reddit",
    age: "10 小时前",
    title: "独立开发者公开了第一次用 AI 接单的完整报价单",
    summary: "讨论焦点不是工具，而是如何定义交付边界、控制修改次数和证明商业价值。",
    heat: 85,
    scarcity: 90,
    fit: 89,
    reason: "国内接单内容多讲渠道，很少讲报价结构和交付风险，信息差清晰。",
    angle: "AI 接单别按工时报价：这份报价结构更赚钱",
    platforms: ["小红书", "抖音", "公众号"],
    category: "接单变现",
    status: "待审核",
    selected: true,
    assignee: "小周",
  },
  {
    id: 6,
    rank: 6,
    source: "Product Hunt",
    sourceUrl: "https://www.producthunt.com/",
    sourceType: "Product Hunt",
    age: "12 小时前",
    title: "AI 视频工具开始主打镜头一致性而非单次惊艳",
    summary: "热门新品把卖点放在角色、商品和视觉风格跨镜头保持一致，更贴近商业视频交付。",
    heat: 80,
    scarcity: 86,
    fit: 91,
    reason: "适合用对比视频说明“能玩”和“能接单”的区别，视觉传播潜力高。",
    angle: "AI 视频接单真正的门槛，不是生成一条漂亮片段",
    platforms: ["抖音", "小红书", "视频号"],
    category: "AI 视频",
    status: "待审核",
    selected: true,
    assignee: "小林",
  },
  {
    id: 7,
    rank: 7,
    source: "MIT Technology Review",
    sourceUrl: "https://www.technologyreview.com/",
    sourceType: "Media",
    age: "14 小时前",
    title: "企业开始把 AI 评估从准确率改成任务完成率",
    summary: "团队更关心 AI 是否完成真实业务任务，而非单一基准测试中的分数。",
    heat: 79,
    scarcity: 74,
    fit: 82,
    reason: "适合管理者，但国内已有相似观点，需要加入自有项目数据才能形成差异。",
    angle: "别再问模型准不准，先问它替你完成了什么",
    platforms: ["公众号", "知乎"],
    category: "管理方法",
    status: "待选题",
    selected: false,
    assignee: "待分配",
  },
  {
    id: 8,
    rank: 8,
    source: "Every",
    sourceUrl: "https://every.to/",
    sourceType: "Newsletter",
    age: "昨天",
    title: "创作者用 AI 建立“观点库存”而不是批量洗稿",
    summary: "高质量创作者把阅读笔记、反对意见与案例沉淀为可检索素材，再由 AI 协助组织表达。",
    heat: 77,
    scarcity: 89,
    fit: 94,
    reason: "与个人 IP 强相关，国内同类内容普遍停留在提示词，可以形成方法论。",
    angle: "你缺的不是 AI 写作工具，而是自己的观点库存",
    platforms: ["小红书", "公众号", "即刻"],
    category: "个人 IP",
    status: "待审核",
    selected: true,
    assignee: "待分配",
  },
];

const seedDrafts: Draft[] = [
  {
    id: 1,
    hotspotId: 1,
    platform: "小红书",
    title: "AI 会写代码以后，最值钱的反而不是“会写”",
    body:
      "这两天海外开发者圈有一个很有意思的变化：大家不再只晒 AI 写得有多快，而是在讨论一件更难的事——你怎么知道它写得对不对？\n\n对普通创业者来说，这其实不是技术问题，而是“管理 AI 员工”的问题。\n\n我现在会先做 3 件事：\n1. 先写清楚结果长什么样\n2. 把不能出错的边界列出来\n3. 用真实用户路径验收，而不是只看演示\n\nAI 降低了执行门槛，但把判断力变得更贵了。",
    visual: "首图：大字标题「AI 越会干活，判断力越值钱」；内页 3 张验收清单卡片。",
    version: "V2 · 根据小周意见强化开头",
    updatedBy: "AI 助手",
    status: "待审核",
  },
  {
    id: 2,
    hotspotId: 3,
    platform: "小红书",
    title: "我把一次客户访谈，拆成了 7 条能发的内容",
    body:
      "很多人做个人 IP 最痛苦的是：每天都要想今天发什么。\n\n海外一人公司最近在用一个更省力的方法：别从空白页开始，直接从客户说过的话里找内容。\n\n一次 40 分钟访谈，我会拆出：3 个真实痛点、2 个反常识观点、1 个案例故事、1 份可领取清单。AI 负责整理，我只负责判断哪些值得说。",
    visual: "流程图：访谈录音 → 痛点 → 观点 → 7 条内容；暖色真人工作场景。",
    version: "V1 · AI 初稿",
    updatedBy: "AI 助手",
    status: "待审核",
  },
  {
    id: 3,
    hotspotId: 5,
    platform: "公众号",
    title: "AI 接单别按工时报价：海外独立开发者公开了他的报价结构",
    body:
      "如果 AI 让你把原本三天的工作压缩到三小时，继续按工时报价只会让自己越来越便宜。更合理的方式是把报价拆成业务结果、交付边界和风险缓冲。",
    visual: "报价单结构信息图；不出现具体收入承诺。",
    version: "V1 · AI 初稿",
    updatedBy: "AI 助手",
    status: "待审核",
  },
  {
    id: 4,
    hotspotId: 2,
    platform: "公众号",
    title: "3 人团队，如何把 AI 从聊天框变成可交付的同事",
    body: "过去我们用 AI，是问一句、答一句。现在真正有价值的变化，是让它接住一个更长的任务：读资料、做判断、调用工具，再在关键节点让人确认。",
    visual: "一张人机协作流程图：任务 → AI 执行 → 人工确认 → 交付。",
    version: "V1 · AI 初稿",
    updatedBy: "AI 助手",
    status: "待审核",
  },
  {
    id: 5,
    hotspotId: 4,
    platform: "知乎",
    title: "为什么下一批 AI 工具可能不需要上传你的数据",
    body: "本地小模型的意义，不只是离线可用。对客服记录、内部知识库和个人资料来说，数据不离开设备本身就是一种产品能力。",
    visual: "设备端与云端的数据路径对照图。",
    version: "V1 · AI 初稿",
    updatedBy: "AI 助手",
    status: "待选题",
  },
  {
    id: 6,
    hotspotId: 6,
    platform: "视频号",
    title: "AI 视频接单真正的门槛，不是生成一条漂亮片段",
    body: "客户不会只买一条惊艳的片段。他真正需要的是：同一个人、同一个产品、同一种风格，在十几个镜头里都不跑偏。",
    visual: "30 秒口播；插入三组角色一致性前后对比镜头。",
    version: "V1 · AI 初稿",
    updatedBy: "AI 助手",
    status: "待审核",
  },
  {
    id: 7,
    hotspotId: 7,
    platform: "公众号",
    title: "别再问模型准不准，先问它替你完成了什么",
    body: "当 AI 进入真实业务，单一准确率已经不够用了。更值得追踪的是：它是否完成整项任务、需要人接管几次、最后有没有产生业务价值。",
    visual: "从模型分数到任务完成率的指标迁移图。",
    version: "V1 · AI 初稿",
    updatedBy: "AI 助手",
    status: "待选题",
  },
  {
    id: 8,
    hotspotId: 8,
    platform: "小红书",
    title: "你缺的不是 AI 写作工具，而是自己的观点库存",
    body: "如果每次写内容都从空白页开始，再强的 AI 也只能给你一篇平均水平的文章。真正能积累个人 IP 的，是你长期记录的问题、反对意见和亲历案例。",
    visual: "观点库存四格卡：问题、反例、案例、结论。",
    version: "V1 · AI 初稿",
    updatedBy: "AI 助手",
    status: "待审核",
  },
];

const contentHistory = [
  {
    title: "AI 接单别按工时报价",
    status: "已发布" as HumanStatus,
    platform: "小红书",
    owner: "小周",
    source: "Reddit 讨论 → 海外案例拆解",
    edits: "标题改得更克制；删除收入承诺；加入自己的报价表",
    metric: "收藏率 8.7% · 高于账号均值 2.1 倍",
  },
  {
    title: "别再囤 AI 工具了，先做这张任务地图",
    status: "已发布" as HumanStatus,
    platform: "公众号",
    owner: "小林",
    source: "Every 专栏 → 方法论重构",
    edits: "从工具清单改成任务场景；增加团队真实案例",
    metric: "读完率 46% · 新增关注 128",
  },
  {
    title: "用 AI 做客户访谈复盘",
    status: "待发布" as HumanStatus,
    platform: "视频号",
    owner: "小林",
    source: "Indie Hackers 访谈 → 中文口播",
    edits: "口播缩短 22 秒；开头先给结果",
    metric: "明天 11:30 发布",
  },
];

const calendarItems = [
  { day: "周一", date: "27", time: "10:30", platform: "小红书", title: "AI 接单别按工时报价", color: "orange" },
  { day: "周二", date: "28", time: "20:00", platform: "公众号", title: "Agent 不是聊天机器人", color: "green" },
  { day: "周三", date: "29", time: "12:15", platform: "即刻", title: "判断力正在变贵", color: "blue" },
  { day: "周四", date: "30", time: "11:30", platform: "视频号", title: "访谈拆成一周内容", color: "yellow" },
  { day: "周五", date: "31", time: "18:00", platform: "小红书", title: "AI 视频接单新门槛", color: "orange" },
];

const accounts = [
  { platform: "小红书", name: "AI 实战手记", owner: "小周", rhythm: "每周 5 篇", focus: "女性创业者 · AI 实操", state: "正常" },
  { platform: "公众号", name: "新生产力观察", owner: "小林", rhythm: "每周 3 篇", focus: "AI 产业 · 小团队实践", state: "正常" },
  { platform: "视频号", name: "一人公司实验室", owner: "小林", rhythm: "每周 3 条", focus: "案例口播 · 接单复盘", state: "待补资料" },
  { platform: "X", name: "@buildwithai", owner: "Edy", rhythm: "每天 1 条", focus: "个人项目 · Build in public", state: "正常" },
];

function StatusPill({ status }: { status: HumanStatus }) {
  return <span className={`status status-${status}`}>{status}</span>;
}

function makeDraft(item: Hotspot): Draft {
  return {
    id: item.id + 1_000_000,
    hotspotId: item.id,
    platform: item.platforms[0] || "小红书",
    title: item.angle,
    body:
      `【待整理，不能发布】\n\n` +
      `已采集原帖：${item.title}\n` +
      `公开互动：${item.engagementLabel || "未取得公开互动指标"}\n` +
      `本地化状态：${item.localizedTranslation || "完整中文翻译待补充"}\n\n` +
      "需要先完成讨论归纳、事实核验和中文本地化，再进入人工审核。",
    visual: "完成内容整理后再确定配图，不用未经核验的数据做图。",
    version: "V1 · 原始证据待整理",
    updatedBy: "内容运营",
    status: "待选题",
  };
}

function formatCapturedAt(value?: string) {
  if (!value) return "未知";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "未知";
  return new Intl.DateTimeFormat("zh-CN", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export default function Workbench({
  userName,
  userEmail,
}: {
  userName: string;
  userEmail: string;
}) {
  const [view, setView] = useState<View>("today");
  const [hotspots, setHotspots] = useState(seedHotspots);
  const [selectedId, setSelectedId] = useState(1);
  const [drafts, setDrafts] = useState(seedDrafts);
  const [notice, setNotice] = useState("");
  const [topicFilter, setTopicFilter] = useState("推荐");
  const [brief, setBrief] = useState("");
  const [showSources, setShowSources] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [editorialBrief, setEditorialBrief] = useState(DEFAULT_EDITORIAL_BRIEF);
  const [discoveryMeta, setDiscoveryMeta] = useState<DiscoveryMeta | null>(null);
  const [manualSignals, setManualSignals] = useState<ManualSignal[]>([]);
  const [signalForm, setSignalForm] = useState({
    platform: "Instagram",
    url: "",
    author: "",
    originalText: "",
    engagement: "",
    note: "",
  });
  const loadedSnapshot = useRef("");

  useEffect(() => {
    async function loadWorkspace() {
      function applyState(state: WorkspaceState) {
        setHotspots(state.hotspots);
        setDrafts(state.drafts);
        setDiscoveryMeta(state.discoveryMeta);
        setManualSignals(state.manualSignals ?? []);
        setEditorialBrief(
          state.discoveryMeta?.editorialBrief || DEFAULT_EDITORIAL_BRIEF,
        );
        loadedSnapshot.current = JSON.stringify(state);
        window.localStorage.setItem(LOCAL_CACHE_KEY, loadedSnapshot.current);
      }

      async function refreshLegacySnapshot() {
        const response = await fetch("/api/discover", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ editorialBrief: DEFAULT_EDITORIAL_BRIEF }),
        });
        const payload = (await response.json()) as {
          hotspots?: Hotspot[];
          drafts?: Draft[];
          meta?: DiscoveryMeta;
          error?: string;
        };
        if (!response.ok || !payload.hotspots?.length || !payload.drafts) {
          throw new Error(payload.error || "旧数据升级失败");
        }
        applyState({
          schemaVersion: WORKSPACE_SCHEMA_VERSION,
          hotspots: payload.hotspots,
          drafts: payload.drafts,
          discoveryMeta: payload.meta ?? null,
          manualSignals: [],
        });
      }

      const cached = window.localStorage.getItem(LOCAL_CACHE_KEY);
      try {
        const response = await fetch("/api/workspace", { cache: "no-store" });
        if (response.ok) {
          const payload = (await response.json()) as {
            state?: unknown;
          };
          if (isCurrentWorkspaceState(payload.state)) {
            applyState(payload.state as WorkspaceState);
          } else {
            await refreshLegacySnapshot();
          }
          setHydrated(true);
          return;
        }
      } catch {
        // The local preview may not have D1 initialized yet.
      }
      if (cached) {
        try {
          const parsed = JSON.parse(cached) as unknown;
          if (isCurrentWorkspaceState(parsed)) {
            applyState(parsed as WorkspaceState);
          } else {
            throw new Error("本地缓存版本过旧");
          }
        } catch {
          setLoadError("工作台数据版本过旧，请刷新页面重新采集。");
        }
      } else {
        setLoadError("暂时无法读取工作台数据，请稍后刷新。");
      }
      setHydrated(true);
    }
    void loadWorkspace();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const state: WorkspaceState = {
      schemaVersion: WORKSPACE_SCHEMA_VERSION,
      hotspots,
      drafts,
      discoveryMeta,
      manualSignals,
    };
    const encoded = JSON.stringify(state);
    if (encoded === loadedSnapshot.current) return;
    window.localStorage.setItem(LOCAL_CACHE_KEY, encoded);
    const timer = window.setTimeout(() => {
      void fetch("/api/workspace", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          state,
          actor: userEmail || userName,
          eventType: "保存内容版本",
          detail: "选题、审核状态或平台文案发生变化",
        }),
      })
        .then((response) => {
          if (response.ok) loadedSnapshot.current = encoded;
        })
        .catch(() => undefined);
    }, 800);
    return () => window.clearTimeout(timer);
  }, [
    hotspots,
    drafts,
    discoveryMeta,
    manualSignals,
    hydrated,
    userEmail,
    userName,
  ]);

  const recommended = useMemo(
    () => hotspots.filter((item) => item.selected),
    [hotspots],
  );
  const visibleHotspots = useMemo(
    () =>
      topicFilter === "推荐"
        ? hotspots.filter((item) => item.selected)
        : topicFilter === "全部"
        ? hotspots
        : hotspots.filter((item) => item.category === topicFilter),
    [hotspots, topicFilter],
  );
  const pendingReviewCount = useMemo(() => {
    const currentIds = new Set(recommended.map((item) => item.id));
    return drafts.filter(
      (draft) =>
        currentIds.has(draft.hotspotId) && draft.status === "待审核",
    ).length;
  }, [drafts, recommended]);

  if (!hydrated) {
    return (
      <main className="loading-screen">
        <span className="pulse" />
        <h1>正在读取今天的工作台</h1>
        <p>会先校验数据版本，再显示可审核内容。</p>
      </main>
    );
  }

  if (loadError || !hotspots.length) {
    return (
      <main className="loading-screen error">
        <h1>工作台暂时没有加载完成</h1>
        <p>{loadError || "当前没有有效热点。"}</p>
        <button className="primary-btn" onClick={() => window.location.reload()}>
          重新加载
        </button>
      </main>
    );
  }

  const selected = hotspots.find((item) => item.id === selectedId) ?? hotspots[0];
  const activeDraft =
    drafts.find((item) => item.hotspotId === selected.id) ?? makeDraft(selected);

  function flash(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  }

  function toggleAdopt(item: Hotspot) {
    if (!item.selected && !drafts.some((draft) => draft.hotspotId === item.id)) {
      setDrafts((items) => [...items, makeDraft(item)]);
    }
    setHotspots((items) =>
      items.map((current) =>
        current.id === item.id
          ? {
              ...current,
              selected: !current.selected,
              status: !current.selected ? "待审核" : "待选题",
            }
          : current,
      ),
    );
    flash(item.selected ? "已移回候选池，记录仍然保留" : "已采用，并进入审核队列");
  }

  function selectHotspot(item: Hotspot) {
    if (!drafts.some((draft) => draft.hotspotId === item.id)) {
      setDrafts((items) => [...items, makeDraft(item)]);
    }
    setSelectedId(item.id);
    setShowSources(false);
  }

  function saveDraft(nextBody: string) {
    setDrafts((items) =>
      items.map((draft) =>
        draft.id === activeDraft.id
          ? {
              ...draft,
              body: nextBody,
              version: "V3 · 人工修改",
              updatedBy: userName,
            }
          : draft,
      ),
    );
  }

  function approveDraft() {
    setDrafts((items) =>
      items.map((draft) =>
        draft.id === activeDraft.id ? { ...draft, status: "待发布" } : draft,
      ),
    );
    setHotspots((items) =>
      items.map((item) =>
        item.id === selected.id ? { ...item, status: "待发布" } : item,
      ),
    );
    flash("审核通过，已进入待发布");
  }

  function applyBrief() {
    if (!brief.trim()) {
      flash("先写一句修改要求");
      return;
    }
    setDrafts((items) =>
      items.map((draft) =>
        draft.id === activeDraft.id
          ? {
              ...draft,
              reviewNote: brief.trim(),
              version: "待 AI 处理 · 已记录审核意见",
              updatedBy: userName,
            }
          : draft,
      ),
    );
    setBrief("");
    flash("修改意见已进入 AI 处理队列，旧版本保持不变");
  }

  function addManualSignal() {
    const url = signalForm.url.trim();
    if (!/^https?:\/\//i.test(url)) {
      flash("请粘贴完整的原帖链接");
      return;
    }
    if (!signalForm.originalText.trim()) {
      flash("请粘贴原帖正文或写清楚视频内容");
      return;
    }
    const signal: ManualSignal = {
      id: `manual-${Date.now()}`,
      platform: signalForm.platform,
      url,
      author: signalForm.author.trim() || "未填写",
      originalText: signalForm.originalText.trim(),
      engagement: signalForm.engagement.trim() || "未公开 / 待人工核验",
      note: signalForm.note.trim(),
      capturedAt: new Date().toISOString(),
      capturedBy: userName || userEmail || "内容运营",
      status: "待选题",
    };
    setManualSignals((items) => [signal, ...items]);
    setSignalForm({
      platform: signalForm.platform,
      url: "",
      author: "",
      originalText: "",
      engagement: "",
      note: "",
    });
    flash("已保存到观察箱，等待内容运营整理");
  }

  function closeManualSignal(id: string) {
    setManualSignals((items) =>
      items.map((item) =>
        item.id === id ? { ...item, status: "已结束" } : item,
      ),
    );
    flash("这条线索已结束，记录仍然保留");
  }

  const dateLabel = new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(new Date());
  const updatedLabel = discoveryMeta
    ? new Intl.DateTimeFormat("zh-CN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date(discoveryMeta.capturedAt))
    : "演示数据";

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <button className="brand" onClick={() => setView("today")} aria-label="返回今日任务">
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
          </span>
          <strong>潮汐</strong>
        </button>
        <nav aria-label="主导航">
          {nav.map((item) => (
            <button
              key={item.id}
              className={view === item.id ? "nav-item active" : "nav-item"}
              onClick={() => setView(item.id)}
            >
              {item.label}
              {item.id === "today" && <em>{recommended.length}</em>}
              {item.id === "inbox" &&
                manualSignals.filter((signal) => signal.status === "待选题")
                  .length > 0 && (
                  <em>
                    {
                      manualSignals.filter(
                        (signal) => signal.status === "待选题",
                      ).length
                    }
                  </em>
                )}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <span className="eyebrow">{dateLabel}</span>
            <h1>{nav.find((item) => item.id === view)?.label}</h1>
          </div>
          <div className="top-actions">
            {view === "today" && (
              <button
                className="ghost-btn"
                onClick={() => setView("inbox")}
              >
                补充高赞原帖
              </button>
            )}
          </div>
        </header>

        {notice && <div className="toast">{notice}</div>}

        {view === "today" && (
          <section className="today-view">
            <div className="daily-brief">
              <div>
                <h2>今日内容池</h2>
                <label className="editorial-brief">
                  <span>选题偏好</span>
                  <input
                    value={editorialBrief}
                    onChange={(event) => setEditorialBrief(event.target.value)}
                    placeholder="例如：今天不要产业新闻，多选几个实际操作的 AI 技巧"
                  />
                </label>
              </div>
              <div className="daily-numbers">
                <div><strong>{hotspots.length}</strong><span>候选</span></div>
                <div><strong>{recommended.length}</strong><span>推荐</span></div>
                <div><strong>{pendingReviewCount}</strong><span>待审核</span></div>
              </div>
            </div>

            <div className="toolbar">
              <div className="filter-group">
                {["推荐", "全部", "AI 技巧", "实操案例", "接单变现", "个人 IP", "产业观察"].map((filter) => (
                  <button
                    key={filter}
                    className={topicFilter === filter ? "filter active" : "filter"}
                    onClick={() => setTopicFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <span className="quiet">
                更新于 {updatedLabel}
              </span>
            </div>

            <div className="split-layout">
              <div className="hotspot-list">
                {visibleHotspots.map((item) => (
                  <article
                    key={item.id}
                    className={selected.id === item.id ? "hotspot-card selected" : "hotspot-card"}
                    onClick={() => selectHotspot(item)}
                  >
                    <div className="rank">{String(item.rank).padStart(2, "0")}</div>
                    <div className="hotspot-content">
                      <div className="source-row">
                        <span className="source-badge">{item.sourceType}</span>
                        <span>{item.source}</span>
                        <i>·</i>
                        <span>{item.age}</span>
                        <StatusPill status={item.status} />
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.summary}</p>
                      {item.engagementLabel && (
                        <div className="engagement-line">
                          <b>原帖互动</b>
                          <span>{item.engagementLabel}</span>
                        </div>
                      )}
                      <div className="angle">
                        <span>角度</span>
                        {item.angle}
                      </div>
                      <div className="card-foot">
                        <button
                          className={item.selected ? "adopt-btn adopted" : "adopt-btn"}
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleAdopt(item);
                          }}
                        >
                          {item.selected ? "已采用" : "采用选题"}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="review-panel">
                <div className="panel-top">
                  <span className="section-kicker">审核</span>
                  <StatusPill status={activeDraft.status} />
                </div>
                <h2>{activeDraft.title}</h2>
                <div className="meta-line">
                  <span>{activeDraft.platform}</span>
                  <span>负责人：{selected.assignee}</span>
                  <span>{activeDraft.version}</span>
                </div>

                <div className="evidence-box">
                  <button onClick={() => setShowSources((value) => !value)}>
                    <span>{selected.reason}</span>
                    <strong>{showSources ? "收起" : "来源与分析"}</strong>
                  </button>
                  {showSources && (
                    <div className="source-detail">
                      <div className="source-links">
                        <a href={selected.sourceUrl} target="_blank" rel="noreferrer">
                          原始内容：{selected.source} ↗
                        </a>
                        {selected.discussionUrl &&
                          selected.discussionUrl !== selected.sourceUrl && (
                            <a href={selected.discussionUrl} target="_blank" rel="noreferrer">
                              原帖讨论页 ↗
                            </a>
                          )}
                      </div>
                      <div className="evidence-section">
                        <b>原帖流量</b>
                        <p>{selected.engagementLabel || "该来源没有公开可验证的点赞、评论或浏览量。"}</p>
                        <small>只显示来源公开指标；没有浏览量时不会用热度分冒充浏览量。</small>
                      </div>
                      <div className="evidence-section">
                        <b>评论主要围绕什么</b>
                        {selected.discussionFocus?.length ? (
                          <ul>
                            {selected.discussionFocus.map((focus, index) => (
                              <li key={`${selected.id}-focus-${index}`}>{focus}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>尚未取得可验证的评论样本。</p>
                        )}
                        {selected.analysisState === "待模型分析" && (
                          <small>当前评论仍待内容运营归纳。</small>
                        )}
                      </div>
                      <div className="evidence-section">
                        <b>本地化翻译</b>
                        <p>{selected.localizedTranslation || "完整中文翻译待补充。"}</p>
                      </div>
                      <div className="evidence-section">
                        <b>怎么复用到国内社媒</b>
                        {selected.reuseIdeas?.length ? (
                          <ol>
                            {selected.reuseIdeas.map((idea, index) => (
                              <li key={`${selected.id}-reuse-${index}`}>{idea}</li>
                            ))}
                          </ol>
                        ) : (
                          <p>待完成受众和平台角度分析。</p>
                        )}
                      </div>
                      <p>
                        {selected.domesticCoverage ||
                          "演示条目：上线真实采集后会显示国内覆盖与证据置信度。"}
                      </p>
                      {selected.evidenceConfidence != null && (
                        <p>证据置信度：{selected.evidenceConfidence}/100 · 采集时间：{formatCapturedAt(selected.sourceCapturedAt)}</p>
                      )}
                      <p>{selected.humanCheck || "发布前仍需人工核对事实、上下文与引用。"}</p>
                    </div>
                  )}
                </div>

                <label className="field-label" htmlFor="draft-body">平台文案</label>
                <textarea
                  id="draft-body"
                  className="draft-editor"
                  value={activeDraft.body}
                  onChange={(event) => saveDraft(event.target.value)}
                />

                <div className="visual-brief">
                  <div>
                    <b>配图建议</b>
                    <p>{activeDraft.visual}</p>
                  </div>
                  <button onClick={() => flash("已标记配图修改，等待设计处理")}>标记修改</button>
                </div>
                {activeDraft.videoScript && (
                  <div className="video-brief">
                    <b>短视频脚本</b>
                    <p>{activeDraft.videoScript}</p>
                  </div>
                )}

                <label className="field-label" htmlFor="ai-brief">提交给 AI 运营任务的修改意见</label>
                <div className="ai-revise">
                  <textarea
                    id="ai-brief"
                    value={brief}
                    onChange={(event) => setBrief(event.target.value)}
                    placeholder="例如：改成更适合小红书女性创业者的角度，少一点技术词。"
                  />
                  <button onClick={applyBrief}>加入修改队列</button>
                </div>
                {activeDraft.reviewNote && (
                  <p className="queued-note">待处理意见：{activeDraft.reviewNote}</p>
                )}
                <div className="review-actions">
                  <button className="secondary-btn" onClick={() => flash("已保存为待修改，负责人会看到意见")}>
                    退回修改
                  </button>
                  <button className="primary-btn" onClick={approveDraft}>
                    审核通过
                  </button>
                </div>
              </aside>
            </div>
          </section>
        )}

        {view === "inbox" && (
          <section className="page-section">
            <div className="section-heading">
              <div>
                <span className="section-kicker">SOURCE INBOX</span>
                <h2>海外社媒观察箱</h2>
              </div>
              <span className="quiet">
                只保存公开内容，不读取账号 Cookie
              </span>
            </div>

            <div className="source-console">
              <div className="source-registry">
                <div className="console-title">
                  <h3>来源状态</h3>
                  <p>自动源每天采集；受限社媒由运营粘贴高赞原帖。</p>
                </div>
                <div className="source-table">
                  {sourceChannels.map((source) => (
                    <article key={source.name}>
                      <strong>{source.name}</strong>
                      <span>{source.mode}</span>
                      <span>{source.coverage}</span>
                      <b>{source.state}</b>
                    </article>
                  ))}
                </div>
              </div>

              <div className="signal-form">
                <div className="console-title">
                  <h3>添加一条高赞原帖</h3>
                  <p>把页面上能看到的原文和互动数字一起保存。</p>
                </div>
                <div className="signal-fields">
                  <label>
                    <span>平台</span>
                    <select
                      value={signalForm.platform}
                      onChange={(event) =>
                        setSignalForm((value) => ({
                          ...value,
                          platform: event.target.value,
                        }))
                      }
                    >
                      {[
                        "Instagram",
                        "LinkedIn",
                        "TikTok",
                        "Dribbble",
                        "X",
                        "Reddit",
                        "Product Hunt",
                        "YouTube",
                        "其他",
                      ].map((platform) => (
                        <option key={platform}>{platform}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>作者</span>
                    <input
                      value={signalForm.author}
                      onChange={(event) =>
                        setSignalForm((value) => ({
                          ...value,
                          author: event.target.value,
                        }))
                      }
                      placeholder="@作者或账号名"
                    />
                  </label>
                  <label className="wide">
                    <span>原帖链接</span>
                    <input
                      value={signalForm.url}
                      onChange={(event) =>
                        setSignalForm((value) => ({
                          ...value,
                          url: event.target.value,
                        }))
                      }
                      placeholder="https://"
                    />
                  </label>
                  <label className="wide">
                    <span>原帖正文 / 视频内容</span>
                    <textarea
                      value={signalForm.originalText}
                      onChange={(event) =>
                        setSignalForm((value) => ({
                          ...value,
                          originalText: event.target.value,
                        }))
                      }
                      placeholder="粘贴原文；视频可写标题、字幕或主要内容"
                    />
                  </label>
                  <label className="wide">
                    <span>公开互动</span>
                    <input
                      value={signalForm.engagement}
                      onChange={(event) =>
                        setSignalForm((value) => ({
                          ...value,
                          engagement: event.target.value,
                        }))
                      }
                      placeholder="例如：120万播放 · 8.6万赞 · 2400评论"
                    />
                  </label>
                  <label className="wide">
                    <span>为什么值得看</span>
                    <textarea
                      value={signalForm.note}
                      onChange={(event) =>
                        setSignalForm((value) => ({
                          ...value,
                          note: event.target.value,
                        }))
                      }
                      placeholder="可选：评论区争议、适合哪个账号、想改成什么角度"
                    />
                  </label>
                </div>
                <button className="primary-btn" onClick={addManualSignal}>
                  保存到观察箱
                </button>
              </div>
            </div>

            <div className="signal-list">
              <div className="console-title">
                <h3>待整理线索</h3>
                <p>{manualSignals.length} 条记录，原帖与互动数字都会保留。</p>
              </div>
              {manualSignals.length ? (
                manualSignals.map((signal) => (
                  <article className="signal-item" key={signal.id}>
                    <div className="signal-meta">
                      <span>{signal.platform}</span>
                      <span>{signal.author}</span>
                      <span>{formatCapturedAt(signal.capturedAt)}</span>
                      <StatusPill status={signal.status} />
                    </div>
                    <p>{signal.originalText}</p>
                    <div className="signal-engagement">
                      <b>公开互动</b>
                      <span>{signal.engagement}</span>
                    </div>
                    {signal.note && <small>{signal.note}</small>}
                    <div className="signal-actions">
                      <a href={signal.url} target="_blank" rel="noreferrer">
                        打开原帖 ↗
                      </a>
                      {signal.status === "待选题" && (
                        <button onClick={() => closeManualSignal(signal.id)}>
                          结束这条
                        </button>
                      )}
                    </div>
                  </article>
                ))
              ) : (
                <div className="empty-signals">
                  暂无人工线索。看到高赞帖子时，粘贴链接和原文即可。
                </div>
              )}
            </div>
          </section>
        )}

        {view === "library" && (
          <section className="page-section">
            <div className="section-heading">
              <div><span className="section-kicker">CONTENT LINEAGE</span><h2>每一条内容，都能回到它的起点</h2></div>
              <button className="ghost-btn">导出内容记录</button>
            </div>
            <div className="library-grid">
              {contentHistory.map((item, index) => (
                <article className="library-card" key={item.title}>
                  <div className="library-index">0{index + 1}</div>
                  <div className="library-main">
                    <div className="source-row"><span className="source-badge">{item.platform}</span><StatusPill status={item.status} /></div>
                    <h3>{item.title}</h3>
                    <p className="lineage"><b>来源链路</b>{item.source}</p>
                    <p className="lineage"><b>人工修改</b>{item.edits}</p>
                    <div className="result-strip">{item.metric}</div>
                  </div>
                  <div className="library-owner"><span>{item.owner.slice(0, 1)}</span><small>{item.owner}</small></div>
                </article>
              ))}
            </div>
            <div className="history-panel">
              <div>
                <span className="section-kicker">VERSION HISTORY</span>
                <h3>“AI 接单别按工时报价”的内容链路</h3>
              </div>
              <ol className="timeline">
                <li><span>1</span><div><b>发现热点</b><p>Reddit 高互动讨论，原帖与截图已存档</p></div><time>7/27 08:12</time></li>
                <li><span>2</span><div><b>确定角度</b><p>从“收入炫耀”改为“报价结构与交付边界”</p></div><time>7/27 09:05</time></li>
                <li><span>3</span><div><b>AI 初稿 → 人工修改</b><p>小周删除收益承诺，补入自己的报价表示例</p></div><time>7/27 10:40</time></li>
                <li><span>4</span><div><b>发布并回收数据</b><p>24h 收藏率 8.7%，评论集中询问报价模板</p></div><time>7/28 10:30</time></li>
              </ol>
            </div>
          </section>
        )}

        {view === "calendar" && (
          <section className="page-section">
            <div className="section-heading">
              <div><span className="section-kicker">THIS WEEK</span><h2>发布节奏一眼看清</h2></div>
              <button className="primary-btn" onClick={() => flash("已创建一个待排期内容")}>新增排期</button>
            </div>
            <div className="calendar-grid">
              {calendarItems.map((item) => (
                <article className="calendar-day" key={item.day}>
                  <header><span>{item.day}</span><strong>{item.date}</strong></header>
                  <div className={`calendar-entry ${item.color}`}>
                    <time>{item.time}</time>
                    <span>{item.platform}</span>
                    <h3>{item.title}</h3>
                    <small>负责人 · {item.day === "周一" ? "小周" : "小林"}</small>
                  </div>
                </article>
              ))}
              <article className="calendar-day weekend">
                <header><span>周末</span><strong>01—02</strong></header>
                <div><p>留给热点补位与复盘</p><button>＋ 添加</button></div>
              </article>
            </div>
            <div className="calendar-note">
              <span>节奏提醒</span>
              <p>本周“小红书”已安排 2 篇，还可增加 1 篇实操型内容；公众号产业观察比例已达上限。</p>
            </div>
          </section>
        )}

        {view === "analytics" && (
          <section className="page-section">
            <div className="section-heading">
              <div><span className="section-kicker">LEARNING LOOP</span><h2>数据不是报表，是下周的选题依据</h2></div>
              <select aria-label="数据周期"><option>最近 7 天</option><option>最近 30 天</option></select>
            </div>
            <div className="metric-grid">
              <article><span>发布内容</span><strong>18</strong><small>较上周 +3</small></article>
              <article><span>平均收藏率</span><strong>6.4%</strong><small className="up">↑ 1.8%</small></article>
              <article><span>平均完读率</span><strong>43%</strong><small className="up">↑ 6%</small></article>
              <article><span>有效线索</span><strong>27</strong><small>来自私信与表单</small></article>
            </div>
            <div className="analytics-layout">
              <article className="insight-card">
                <span className="section-kicker">本周有效结论</span>
                <h3>用户更愿意收藏“可直接拿走”的内容</h3>
                <ul>
                  <li><b>继续做</b>带模板、清单和真实工作流的 AI 技巧，收藏率是纯资讯的 2.3 倍。</li>
                  <li><b>减少做</b>只介绍新模型能力的快讯，除非能加入自己的测试结论。</li>
                  <li><b>标题规律</b>“先指出错误做法，再给替代方案”的开头，平均点击更高。</li>
                  <li><b>人工价值</b>加入亲历案例后，评论深度明显提升；AI 初稿中的泛泛总结应继续删减。</li>
                </ul>
                <button className="ghost-btn" onClick={() => flash("建议已记录，等待负责人确认后用于下周选题")}>
                  采纳为下周建议
                </button>
              </article>
              <article className="bar-card">
                <div><span>内容类型</span><span>相对账号均值</span></div>
                {[
                  ["实操清单", 92, "+84%"],
                  ["接单复盘", 78, "+56%"],
                  ["个人观点", 61, "+22%"],
                  ["产业快讯", 35, "-18%"],
                ].map(([name, width, value]) => (
                  <div className="bar-row" key={name}>
                    <span>{name}</span>
                    <div><i style={{ width: `${width}%` }} /></div>
                    <b>{value}</b>
                  </div>
                ))}
              </article>
            </div>
            <p className="method-note">所有结论均按平台、账号体量和发布时间归一化；系统只提出建议，不会自行改变账号策略。</p>
          </section>
        )}

        {view === "accounts" && (
          <section className="page-section">
            <div className="section-heading">
              <div><span className="section-kicker">CHANNELS & PEOPLE</span><h2>账号方向与负责人</h2></div>
              <button className="primary-btn" onClick={() => flash("账号接入流程已创建")}>添加账号</button>
            </div>
            <div className="account-list">
              {accounts.map((account) => (
                <article key={account.name}>
                  <div className="platform-logo">{account.platform.slice(0, 1)}</div>
                  <div className="account-name"><span>{account.platform}</span><h3>{account.name}</h3></div>
                  <div><span>内容方向</span><b>{account.focus}</b></div>
                  <div><span>发布节奏</span><b>{account.rhythm}</b></div>
                  <div><span>负责人</span><b>{account.owner}</b></div>
                  <div className="account-state"><i className={account.state === "正常" ? "ok" : ""} />{account.state}</div>
                  <button aria-label={`设置 ${account.name}`}>•••</button>
                </article>
              ))}
            </div>
            <div className="strategy-card">
              <div>
                <span className="section-kicker">账号策略</span>
                <h3>这些内容不会被 AI 擅自改变</h3>
                <p>目标受众、账号定位、禁用表达、商业边界和审核负责人都需要管理员确认。Skill 只能在这些边界内推荐和改稿。</p>
              </div>
              <button className="ghost-btn">编辑策略边界</button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
