import { readFile, writeFile } from "node:fs/promises";

const ready = JSON.parse(
  await readFile("operator-packets/2026-07-30-social-ready.json", "utf8"),
).state;
const expanded = JSON.parse(
  await readFile("operator-packets/2026-07-30-social-expanded.json", "utf8"),
).state;
const oldById = new Map(
  [...ready.hotspots, ...expanded.hotspots].map((item) => [item.id, item]),
);

const capturedAt = "2026-07-30T17:20:00+08:00";
const currentStatePath = process.argv[2];
let currentState = null;
if (currentStatePath) {
  const pulled = JSON.parse(await readFile(currentStatePath, "utf8"));
  currentState = pulled.state ?? pulled;
}
const domesticCoverage =
  "尚未完成小红书、抖音同角度语义检索，国内稀缺度按规则封顶55；发布前需人工搜索标题关键词与核心方法，确认没有高度同质内容。";

const sourceItems = [
  {
    id: 2026073001,
    title: "让 AI 先问你 5 个问题，再开始干活",
    summary: "一个可以直接复制的“先提问、再交付”提示词，适合方案、脚本、报价和内容选题。",
    reason: "不是讲模型，而是给读者一段今天就能复制的提示词；原帖公开20,936浏览、255赞。",
    angle: "先别写，先问清楚",
    category: "AI 技巧",
    saveObject: "可复制提示词",
    learningOutcome: "学会让AI先补齐需求，减少一本正经地瞎猜。",
    humanCheck: "原帖讨论的是模型外层运行机制；发布稿中的提示词是本地化方法，不宣称适用于所有任务。",
  },
  {
    id: 2026073002,
    title: "3 分钟查完你公开过的 AI 分享链接",
    summary: "一张AI对话、云盘和历史公开页的隐私自查清单，照着勾即可。",
    reason: "795赞、134评论，且每个使用AI分享链接的人都能立刻执行。",
    angle: "把忘记关闭的公开权限找出来",
    category: "AI 技巧",
    saveObject: "3项隐私自查清单",
    learningOutcome: "知道哪些分享入口最容易被自己遗忘。",
    humanCheck: "不同产品权限机制不同；不得声称所有分享链接都会被搜索引擎收录。",
  },
  {
    id: 2026073004,
    title: "别囤课了：按岗位看完这 3 小时 AI 课程",
    summary: "把约3小时课程拆成运营、产品、开发三条观看路线，并给每类人一个看完就做的小作业。",
    reason: "原帖195,813浏览、5,709收藏，收藏量超过点赞，明确是资料型需求。",
    angle: "不是从头看到尾，而是只学自己马上能用的部分",
    category: "AI 技巧",
    saveObject: "三类岗位学习路线",
    learningOutcome: "知道先学哪一段、学完做什么，不再只收藏不行动。",
    humanCheck: "发布前补齐原始课程链接与章节时间；不得暗示3小时即可成为AI工程师。",
  },
  {
    id: 2026073005,
    title: "AI 做长任务总断片？给它留一张交接单",
    summary: "把技术帖转成普通人可用的TASK_STATE交接模板：目标、进度、决定、卡点和下一步。",
    reason: "原帖489,560浏览、3,307收藏；真正可迁移的不是底层架构，而是“中断后能续上”。",
    angle: "每做完一段就更新交接单",
    category: "AI 技巧",
    saveObject: "长任务交接模板",
    learningOutcome: "让跨天任务换聊天后也能接着做。",
    humanCheck: "原帖技术实现是Cloudflare Durable Object；发布稿只提炼任务交接方法，不冒充原作者方案。",
  },
  {
    id: 2026073006,
    title: "想装本地 AI，先看电脑过不过这 4 关",
    summary: "用模型大小、内存、速度、隐私四项判断本地模型是否真的适合自己。",
    reason: "原帖1,454,133浏览、8,599赞、4,335收藏；数字热门，但稿件给出普通人的选择清单。",
    angle: "别被“本地运行”四个字骗去买错电脑",
    category: "AI 技巧",
    saveObject: "本地AI选择清单",
    learningOutcome: "分清能下载、能加载、能流畅用和适合日常用。",
    humanCheck: "复核594GB、量化精度与演示硬件；不得写成普通笔记本可运行Kimi K3。",
  },
  {
    id: 2026073007,
    title: "看到“AI 降本 20%”，先问这 4 个问题",
    summary: "用范围、基准、转嫁和复现四问读懂AI公司公布的降本数字。",
    reason: "官方帖120,707浏览、1,761赞；从新闻搬运升级为一张能反复用的判断卡。",
    angle: "公司成本下降，不等于你的价格马上下降",
    category: "产业观察",
    saveObject: "AI降本新闻四问卡",
    learningOutcome: "不再把单项优化误读成全业务普遍降价。",
    humanCheck: "20%和15%只限定于OpenAI帖中描述的两个基础设施案例。",
  },
  {
    id: 2026073008,
    title: "用 AI 找本地商家客户，先免费做这张诊断单",
    summary: "从地图找到商家后，只检查官网、社媒、评价、预约路径，先给一页具体改进建议。",
    reason: "原帖76,898浏览、632回复、1,321收藏，接单意图很强；本地化后可直接练习。",
    angle: "不群发，先证明你真的看过这家店",
    category: "接单变现",
    saveObject: "本地商家一页诊断模板",
    learningOutcome: "学会用公开信息做低风险获客前置工作。",
    humanCheck: "不宣传确定收益；不得自动群发、抓取私人数据或伪造商家问题。",
  },
  {
    id: 2026073009,
    title: "我用 World Monitor 找 AI 选题，只看这 3 层",
    summary: "先看区域异常，再看同一事件多来源，最后只保存可验证的一手链接。",
    reason: "原帖130,356浏览、1,240收藏；收藏高于点赞，读者明显把它当工具入口。",
    angle: "地图负责发现，原始来源负责判断",
    category: "实操案例",
    saveObject: "15分钟趋势研究流程",
    learningOutcome: "把可视化新闻工具变成选题雷达，而不是信息壁纸。",
    humanCheck: "发布前亲测项目可访问性、数据源和更新时间；不照搬“价值数百万美元”的宣传。",
  },
  {
    id: 2026073010,
    title: "970 万浏览的 AI 热帖，我只用这 5 步判断真假",
    summary: "拿“买书拆书训练AI”争议做例子，给出原始来源、主语、规模、时间和反证五步核验法。",
    reason: "原帖9,718,636浏览、47,439赞、11,012收藏，是当天最大热点；输出的是可复用核验方法。",
    angle: "越让人生气的AI新闻，越要先把主语找清楚",
    category: "产业观察",
    saveObject: "热点事实核验五步卡",
    learningOutcome: "学会区分已证实做法、未证实身份和传播中的规模夸大。",
    humanCheck: "必须把已证实的破坏性扫描做法与未完整证实的买家身份、规模分开写。",
  },
  {
    id: 2026073012,
    title: "别再问哪个 AI 最强：用同一道题做这张对比表",
    summary: "把模型横评落到准确、可改、速度、价格、稳定五项，同一任务连续测三次。",
    reason: "原帖69,610浏览、1,028赞、358收藏；争议高，但比结论更值得保存的是测试方法。",
    angle: "模型没有总冠军，只有你的任务适不适合",
    category: "AI 技巧",
    saveObject: "五维模型对比表",
    learningOutcome: "用自己的真实任务选模型，不被排行榜牵着走。",
    humanCheck: "原帖完整线程与测试条件未采齐；不得转述作者对Grok 4.5的个人结论为普遍排名。",
  },
  {
    id: 2026073015,
    title: "机器人每小时 1 美元？先把漏掉的成本补回去",
    summary: "给出购买、折旧、能耗、维护、停机和人工监督的真实小时成本公式。",
    reason: "原帖270,107浏览、809收藏；热门数字适合做一张普通人看得懂的成本计算卡。",
    angle: "报价只有1美元，账单不一定只有1美元",
    category: "产业观察",
    saveObject: "机器人小时成本公式",
    learningOutcome: "知道怎样识别“只报运行费、不报全成本”的标题。",
    humanCheck: "节目中的1美元/小时是讨论设想，不是已普遍实现的市场价格。",
  },
  {
    id: 2026073017,
    title: "Claude 总忘记项目？把这份背景文件放进去",
    summary: "提供一份PROJECT_CONTEXT模板：目标、受众、边界、素材、语气、决定和不要做。",
    reason: "原帖140,171浏览、1,454收藏，收藏远高于点赞，说明模板需求强。",
    angle: "不要每次重新讲背景，把稳定信息写成一页文件",
    category: "AI 技巧",
    saveObject: "项目背景文件模板",
    learningOutcome: "减少重复解释和不同聊天之间的口径漂移。",
    humanCheck: "不得复述未核验的开发者人数或借Karpathy背书；模板为本地化整理。",
  },
  {
    id: 2026073019,
    title: "发 AI 内容前，我会删掉这 6 种“机器味”",
    summary: "给运营一张发布前检查表：空洞开头、假装亲测、固定编号、过度总结、无来源数字、无个人细节。",
    reason: "TikTok相关报道没有公开互动量，但与账号内容质量直接相关，且清单可马上使用。",
    angle: "平台不是讨厌AI，用户是讨厌没信息量的批量稿",
    category: "个人 IP",
    saveObject: "AI文案发布前六项检查",
    learningOutcome: "把“像AI”拆成可具体修改的六个问题。",
    humanCheck: "需追到TikTok官方说明；不能把媒体评论写成平台算法规则。",
  },
  {
    id: 2026073021,
    source: "OpenAI Economic Research",
    sourceUrl: "https://openai.com/index/how-ai-is-expanding-what-people-do-at-work/",
    discussionUrl: "https://openai.com/index/how-ai-is-expanding-what-people-do-at-work/",
    sourceType: "官方研究",
    engagement: {},
    engagementLabel: "官方页面未公开浏览、点赞、评论",
    localizedTranslation: "OpenAI分析了80多万条美国ChatGPT用户消息。排除通用任务后，43.5%的职业相关消息涉及用户本职工作之外的任务；小型组织中的跨岗位任务更明显。",
    discussionFocus: [
      "研究讨论的是任务跨界，不等于一个人能完全替代另一个职业。",
      "数据来自美国ChatGPT用户消息，不能直接外推到所有地区和公司。",
      "官方页面没有公开评论样本。",
    ],
    title: "别只让 AI 帮你提速：列出这张“跨岗位任务表”",
    summary: "从本职工作旁边借三个任务试做：营销、数据、基础技术或合同初审，并标明必须找专业人员复核的边界。",
    reason: "最新官方研究给出真实使用数据，稿件转成普通人能填写的一页任务扩展表。",
    angle: "AI最先改变的可能不是职位，而是谁来做旁边那件事",
    category: "实操案例",
    saveObject: "跨岗位任务盘点表",
    learningOutcome: "找到3件过去要等别人、现在可以先做初版的工作。",
    humanCheck: "明确43.5%口径为排除通用消息后的职业相关消息；不写成43.5%的工作岗位被替代。",
  },
  {
    id: 2026073022,
    source: "Jeff Su",
    sourceUrl: "https://www.youtube.com/watch?v=sfwax2dVPvI",
    discussionUrl: "https://www.youtube.com/watch?v=sfwax2dVPvI",
    sourceType: "YouTube",
    engagement: { views: 117764, likes: 3100 },
    engagementLabel: "117,764 浏览 · 3,100 赞 · 评论数未公开",
    localizedTranslation: "Jeff Su表示三款工具并不等价：他用ChatGPT和Gemini做构思与研究，用Claude完成最后的文字润色；同时强调各模型在复杂指令、多模态和写作上的不同长处。",
    discussionFocus: [
      "视频公开117,764次观看和3,100赞。",
      "这是创作者个人工作流，不是独立实验室排名。",
      "评论数和可验证评论样本未公开。",
    ],
    title: "ChatGPT、Gemini、Claude，我现在按任务分工",
    summary: "给出一张不用纠结模型排名的分工表：构思、资料、多模态、长文润色分别怎么选。",
    reason: "有11.7万浏览和3,100赞，且能整理成一张人人看得懂的模型分工卡。",
    angle: "不要三个都问一遍，先按任务类型分工",
    category: "AI 技巧",
    saveObject: "三模型任务分工卡",
    learningOutcome: "用任务选工具，而不是每天追着新模型换。",
    humanCheck: "这是Jeff Su的个人用法；发布前核对各产品当前功能和地区可用性。",
  },
  {
    id: 2026073023,
    source: "Google Workspace Updates",
    sourceUrl: "https://workspaceupdates.googleblog.com/2026/04/effortlessly-automate-data-entry-in-Google-Sheets-using-Fill-with-Gemini.html",
    discussionUrl: "https://workspaceupdates.googleblog.com/2026/04/effortlessly-automate-data-entry-in-Google-Sheets-using-Fill-with-Gemini.html",
    sourceType: "官方产品更新",
    engagement: {},
    engagementLabel: "官方页面未公开浏览、点赞、评论",
    localizedTranslation: "Google在Sheets中推出Fill with Gemini，可根据已有单元格或自定义提示词批量生成、提取和分类内容；官方称在100个单元格任务的95人研究中，比手工录入快9倍。",
    discussionFocus: [
      "官方给出100单元格、95名参与者的特定测试结果。",
      "功能需要符合条件的Google Workspace或Google AI方案，并开启智能功能。",
      "官方页面没有公开评论样本。",
    ],
    title: "表格里 100 条评论，不用公式也能批量分类",
    summary: "用Fill with Gemini把反馈分成问题、表扬、需求、无效四类，再人工抽查10条。",
    reason: "功能具体、场景广，读者能直接照着处理评论、商品信息和客户反馈。",
    angle: "让AI填表可以，最后一定抽查",
    category: "实操案例",
    saveObject: "评论分类提示词+抽查流程",
    learningOutcome: "不写公式也能批量做文本分类，同时保留人工校验。",
    humanCheck: "核对账号是否有功能入口和当前用量限制；9倍只按官方特定测试口径表述。",
  },
  {
    id: 2026073024,
    source: "Google NotebookLM",
    sourceUrl: "https://blog.google/innovation-and-ai/products/notebooklm/better-research-notebooklm/",
    discussionUrl: "https://www.youtube.com/watch?v=Sx230itCjE4",
    sourceType: "官方更新 + YouTube实操",
    engagement: { views: 30188, likes: 899 },
    engagementLabel: "实操视频30,188浏览 · 899赞；官方页面未公开互动",
    localizedTranslation: "Google升级NotebookLM的研究能力，可做网页研究、代码分析、图表和PDF报告。Universe of AI的实操视频还演示了研究、幻灯片修改和PPTX导出的完整流程。",
    discussionFocus: [
      "官方说明产品具备研究、代码分析、图表和报告能力。",
      "实操视频公开30,188次观看和899赞。",
      "功能可能分批上线，结果仍需回到引用来源核验。",
    ],
    title: "别把 20 个链接直接丢给 AI：先做一张研究说明书",
    summary: "先写问题、范围、时间、要排除的内容和输出格式，再让NotebookLM研究并逐条检查引用。",
    reason: "官方新能力叠加3万浏览实操视频，适合做可复制的研究说明书。",
    angle: "研究质量先由问题边界决定，不是链接越多越好",
    category: "AI 技巧",
    saveObject: "NotebookLM研究说明书模板",
    learningOutcome: "把零散链接变成有边界、有引用、能复查的资料包。",
    humanCheck: "发布前确认当前账号功能；不得把AI生成的图表和结论当成无需核验的事实。",
  },
  {
    id: 2026073025,
    source: "Google Chrome",
    sourceUrl: "https://help.youtube.com/chrome/ai-innovations/",
    discussionUrl: "https://help.youtube.com/chrome/ai-innovations/",
    sourceType: "官方帮助",
    engagement: {},
    engagementLabel: "官方页面未公开浏览、点赞、评论",
    localizedTranslation: "Gemini in Chrome支持把常用提示保存为Skills，选择页面上下文，总结标签页和视频；部分自动浏览能力仅在美国的Pro/Ultra方案开放。",
    discussionFocus: [
      "Skills的价值是保存并重复使用提示词，而不是每次从零输入。",
      "功能和地区、方案有关，自动浏览并非所有用户可用。",
      "官方页面没有公开评论样本。",
    ],
    title: "Chrome 里这 3 个 AI 指令，建议存成固定按钮",
    summary: "把“总结当前页”“对比两个标签页”“提取行动项”存成可重复用的浏览器Skills。",
    reason: "不是介绍功能列表，而是给三条可直接保存的浏览器指令。",
    angle: "真正省时间的是不再重复写同一句提示词",
    category: "AI 技巧",
    saveObject: "3条浏览器固定指令",
    learningOutcome: "把网页阅读中最重复的动作变成一键复用。",
    humanCheck: "核对用户地区与套餐；明确自动浏览能力的可用范围。",
  },
  {
    id: 2026073026,
    source: "Anthropic",
    sourceUrl: "https://www.anthropic.com/news/reflect-with-claude",
    discussionUrl: "https://www.anthropic.com/news/reflect-with-claude",
    sourceType: "官方产品更新",
    engagement: {},
    engagementLabel: "官方页面未公开浏览、点赞、评论",
    localizedTranslation: "Claude推出使用反思功能，可回看1、3、6或12个月的使用主题，并用Delegation、Description、Discernment、Diligence四个维度给出建议；目前面向开启Memory的Free、Pro和Max用户测试。",
    discussionFocus: [
      "功能强调复盘如何使用AI，而不是单纯统计聊天次数。",
      "需要开启Memory，部分对话类型不会纳入。",
      "官方页面没有公开评论样本。",
    ],
    title: "用了半年 AI，到底省没省事？用这 4 个问题复盘",
    summary: "用委派、描述、判断、负责四问，找出哪些任务值得继续交给AI，哪些必须自己做。",
    reason: "新功能背后的4D框架能脱离Claude独立使用，适合做月度复盘卡。",
    angle: "别统计问了多少次，统计哪些事情真的变好了",
    category: "AI 技巧",
    saveObject: "AI使用4D复盘卡",
    learningOutcome: "判断自己是在有效协作，还是只是把时间花在反复改AI稿。",
    humanCheck: "注明功能仍在测试且需开启Memory；涉及隐私时先检查数据设置。",
  },
  {
    id: 2026073027,
    source: "OpenAI Help Center",
    sourceUrl: "https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex",
    discussionUrl: "https://help.openai.com/en/articles/6825453-chatgpt-release-notes",
    sourceType: "官方帮助",
    engagement: {},
    engagementLabel: "官方页面未公开浏览、点赞、评论",
    localizedTranslation: "ChatGPT Work可处理较长任务，使用项目中的文件和上下文，并通过Scheduled Tasks一次、定时、重复或按触发条件运行；用户可以查看进度、改方向并批准重要动作。",
    discussionFocus: [
      "适合稳定、重复、有明确交付物的任务，不适合把所有决策都交给自动化。",
      "功能按方案和地区逐步开放。",
      "官方页面没有公开评论样本。",
    ],
    title: "这 5 类事适合让 AI 每周自动跑，别再靠想起来",
    summary: "把竞品更新、客户反馈、内容数据、行业新闻和项目风险做成固定输入、固定输出、人工确认的周期任务。",
    reason: "最新官方功能可以落到一张自动化任务设计表，不是抽象介绍AI Agent。",
    angle: "自动化的不是判断，是重复收集和整理",
    category: "实操案例",
    saveObject: "周期AI任务设计表",
    learningOutcome: "知道怎样写清频率、来源、输出和人工确认点。",
    humanCheck: "核对用户套餐和地区；不得让自动任务未经批准发布、付款或改权限。",
  },
];

const drafts = [
  {
    hotspotId: 2026073001,
    title: "让 AI 先别写，方案反而更容易一次过",
    body: `做方案时最浪费时间的，不是AI写得慢，是它把你没说的背景全猜错了。

我现在会先发这段：

“先不要输出方案。先问我最多5个问题，只问会明显影响结果的问题。优先确认目标人群、预算、渠道、时间和交付形式。等我回答完，再开始写。”

等它问完，再补一句：

“把你准备自行假设的内容单独列出来，不要把猜测写成事实。”

活动方案、拍摄脚本、报价单、内容选题都能这么用。

它不会让一个烂需求瞬间变好，但至少不会拿一堆漂亮废话逼你从头返工。`,
  },
  {
    hotspotId: 2026073002,
    title: "现在查一下，你以前发过的 AI 分享链接",
    body: `很多AI隐私问题，不是“黑客偷走了”，是我们自己开过分享，后来忘了关。

花3分钟查这三处：

① AI产品里的历史分享链接  
② 网盘里“知道链接即可查看”的文件  
③ 曾经发给客户或同事的公开页面

合同、身份证明、客户名单、排班、财务内容，只要已经不用分享，就把权限收回来。

这不代表你的链接一定被搜索到了，不同产品设置也不一样。真正该警惕的是：权限一直开着，而你已经忘了它存在。

我建议把这条存一下，每个月顺手清一次。`,
  },
  {
    hotspotId: 2026073004,
    title: "别再囤 AI 课了，这 3 小时按岗位看就够",
    body: `一门3小时的AI工程课，没必要所有人从头硬啃到尾。

如果你做运营：先看提示方法和应用搭建，目标是做出一个“选题→初稿→核对”的小流程。

如果你做产品：先看Agent怎么拆任务，再把自己手上的一个需求拆成输入、步骤、验收。

如果你做开发：从系统设计和应用搭建开始，最后做一个能真实调用数据的小工具。

看完别继续找下一门课。给自己留30分钟，把刚学的东西做成一个能跑的小项目。

能留下来的从来不是“看完了”，而是你多了一个以后还能反复用的东西。`,
  },
  {
    hotspotId: 2026073005,
    title: "AI 做长任务总断片？给它留这张交接单",
    body: `跨天做方案、研究或代码时，别指望AI自动记住所有细节。

建一个 TASK_STATE.md，每做完一段就让它更新：

目标：最后要交什么  
已完成：已经确认了什么  
关键决定：为什么这样选  
当前卡点：还缺什么  
下一步：接下来只做哪件事  
禁止改动：哪些内容已经定了

第二天换聊天，把原始资料和这张交接单一起给它。

这不是什么神奇记忆术，本质上就是给AI写工作交接。好处是你不用再凭记忆复述一遍，它也不容易把已经否掉的方案重新捡回来。`,
  },
  {
    hotspotId: 2026073006,
    title: "想装本地 AI，先看电脑过不过这 4 关",
    body: `“可以本地运行”不等于“你的电脑能舒服地用”。

看到本地模型，先查四件事：

模型文件多大：硬盘能不能放下。  
运行需要多少内存：不是只看显存名字。  
实际速度多少：能打开不等于能干活。  
你为什么要本地：隐私、离线，还是只是不想付订阅费。

这次很火的Kimi K3量化演示，文件仍有594GB，跑在高配Mac Studio上。它证明的是超大模型可以被压缩，不是普通笔记本突然都能跑。

大多数人先用云端模型，本地只放隐私任务或小模型，反而更省钱。`,
  },
  {
    hotspotId: 2026073007,
    title: "看到“AI 降本 20%”，先别急着理解成降价",
    body: `AI公司公布“成本下降20%”，我会先问四句：

降的是哪一段成本？  
跟什么基准比？  
是一次优化，还是所有请求都有效？  
省下的钱会降价，还是继续买更多算力？

OpenAI这次说的20%，对应一项GPU内核优化；另一个15%以上，对应推测解码效率。都是具体基础设施案例。

它很有价值，但不等于所有AI服务成本都降20%，更不等于用户明天就能少付20%。

以后看AI降本新闻，把“范围”和“基准”找出来，标题里的大数字就没那么容易带跑你。`,
  },
  {
    hotspotId: 2026073008,
    title: "想用 AI 接单，先给一家店免费做这张诊断单",
    body: `别让AI先写100封开发信。先选一家你真的了解的店，做一页诊断。

只看公开信息：

官网：手机打开后，3秒内知道卖什么吗？  
社媒：最近30天在发什么，评论有人回吗？  
评价：差评集中在哪个问题？  
预约：从看到内容到下单，要点几次？

然后让AI把证据整理成“发现的问题—可能影响—一个可执行建议”。你自己逐条核对，再发给店主。

这不能保证成交，但比“老板你好，我能帮你增长”可信得多。真正值钱的不是六个Agent，是你指出了一个对方今天就能修的问题。`,
  },
  {
    hotspotId: 2026073009,
    title: "我用 World Monitor 找选题，只看这 3 层",
    body: `World Monitor把很多新闻源放到3D地球上，第一眼很酷，但别一直转地球。

我会这样用：

先看哪里突然集中出现事件；  
再点开同一件事的不同来源，看说法有没有冲突；  
最后只保存能追到原始发布、官方文件或当事人原话的链接。

15分钟到点就停，留下“发生了什么、证据在哪、国内读者为什么要知道”三句话。

地图只负责帮你发现异常，不负责替你判断真假。拿它找AI产业选题、出海市场变化和地区政策，比把它当新闻屏保有用得多。`,
  },
  {
    hotspotId: 2026073010,
    title: "970 万浏览的 AI 热帖，我只用这 5 步判断真假",
    body: `越让人生气的AI新闻，越别急着转。

我会按这5步查：

1. 原始来源是谁，不看截图号。  
2. 主语是谁，别把“一些买家”写成“所有AI公司”。  
3. 哪部分已证实，哪部分还是转述。  
4. 数量和时间有没有出处。  
5. 主动找一个反证或不同解释。

“买书拆书训练AI”这条有970多万浏览。破坏性扫描这种做法有报道支撑，但具体买家身份和规模，并没有被同等程度证实。

这5步不只查AI新闻。以后看到“某公司都在用”“成本暴降”“马上替代”，先把主语和范围圈出来。`,
  },
  {
    hotspotId: 2026073012,
    title: "别再问哪个 AI 最强，用同一道题做这张表",
    body: `模型横评最容易看的很热闹，最后还是不知道自己该用哪个。

拿你每周真的会做的一件事，比如写一份客户复盘。把同一份材料、同一句要求，分别跑三次，然后只记5项：

准确：事实有没有错  
可改：指出问题后能不能改对  
速度：从输入到可用花多久  
价格：完成一次大概多少钱  
稳定：三次结果差得大不大

不要问“谁是总冠军”，问“谁最适合这类任务”。

排行榜会天天变，你自己的任务不会。把表存下来，下次新模型出来，补一列就行。`,
  },
  {
    hotspotId: 2026073015,
    title: "机器人每小时 1 美元？真正的账要这样算",
    body: `看到“机器人每小时只要1美元”，别只看电费或租金。

真实小时成本至少要算：

（购买价－残值）÷ 可用小时  
＋ 能耗  
＋ 维护耗材  
＋ 停机损失  
＋ 场地改造  
＋ 人工监督

还要问一句：它能独立完成整件事，还是只完成其中20%，剩下仍要人接手？

节目里讨论的1美元/小时是设想，不是市场上已经普遍实现的报价。

以后看到低价机器人、无人店、AI员工，都可以拿这张公式过一遍。技术演示很便宜，不代表稳定交付也一样便宜。`,
  },
  {
    hotspotId: 2026073017,
    title: "Claude 总忘记项目？把这份背景文件放进去",
    body: `同一个项目聊久了，AI口径越来越飘，通常不是“记忆差”，是稳定背景从来没写下来。

建一个 PROJECT_CONTEXT.md：

项目目标：最后要得到什么  
目标用户：给谁用  
已有素材：哪些是确定事实  
表达语气：像谁，不像谁  
关键决定：已经选了什么  
边界：不能承诺什么  
不要做：最常出现的错误

每次开新聊天先附上这份文件。项目方向真的改变时，再更新它。

它不会让AI永远不出错，但能少掉大量“我不是早就说过了吗”。尤其适合长期内容账号、客户项目和反复迭代的产品。`,
  },
  {
    hotspotId: 2026073019,
    title: "发 AI 文案前，我会手动删掉这 6 种机器味",
    body: `AI稿最明显的问题，不是有错别字，是读完不知道作者到底经历了什么。

发布前我会查6项：

删掉没有信息量的背景寒暄  
删掉没有证据的“亲测有效”  
打散每篇都一样的1、2、3结构  
删掉空洞的万能总结  
每个数字补来源和范围  
至少补一个真实场景、限制或失败

最后再问一句：这篇里有没有一句话，只有这个账号的人才会这么说？

如果没有，就先别发。用户不反感你用AI，用户反感的是花30秒读完，却什么也没得到。`,
  },
  {
    hotspotId: 2026073021,
    title: "别只让 AI 帮你提速，试试这张“跨岗位任务表”",
    body: `AI最有用的地方，有时不是把本职工作做快，而是让你先做出隔壁岗位的第一版。

拿张纸写三列：

我经常等谁：设计、数据、法务、开发？  
我能先做什么：草图、数据初查、合同风险点、网页问题定位？  
什么时候必须交回专业人员：涉及签字、上线、财务和安全时。

OpenAI最新研究分析了80多万条美国用户消息。排除通用任务后，43.5%的职业相关消息在做本职之外的任务。

这不等于一个人能替代所有岗位。更实用的理解是：以前排队等两天的事，你可以先把问题整理到对方接手就能判断。`,
  },
  {
    hotspotId: 2026073022,
    title: "ChatGPT、Gemini、Claude，我按任务这样分工",
    body: `三个AI都订了，最浪费时间的用法是：同一道题三个都问一遍。

我更建议按任务分：

需要严格跟复杂要求走：先试ChatGPT。  
资料里有视频、音频、图片：先试Gemini。  
已经有事实和结构，要把长文写顺：先试Claude。

做一篇内容时，可以让ChatGPT或Gemini先整理材料和角度，再把确定的事实交给Claude润色。最后的人话和判断，还是自己补。

这是Jeff Su视频里的个人工作流，不是绝对排名。真正好用的标准很简单：同一类任务，哪个让你改得最少，就留下哪个。`,
  },
  {
    hotspotId: 2026073023,
    title: "表格里 100 条评论，不用公式也能批量分类",
    body: `有一列客户评论，别再一条条复制给AI。

在Google Sheets里选中空白分类列，用Fill with Gemini输入：

“根据左侧评论，只填以下一种：问题、表扬、功能需求、无效。无法判断时填‘需人工确认’，不要补充原文没有的信息。”

填完别直接交。随机抽10条，再专门检查带金额、否定词和反讽的评论。错得多，就把分类标准写得更具体后重跑。

Google官方说，在100个单元格的特定测试里，这个功能比手工录入快9倍。你的账号是否有入口和用量，要看套餐。

真正省下来的不是公式，是重复判断。`,
  },
  {
    hotspotId: 2026073024,
    title: "别把 20 个链接直接丢给 AI，先写这张研究说明书",
    body: `用NotebookLM做研究前，先别急着塞链接。

把这段填好：

研究问题：我最后要回答什么  
范围：只看哪些地区、产品和时间  
排除：广告稿、未注明来源的数据  
输出：结论、证据、反例、仍未知  
引用：每个关键判断必须能点回原文

再把资料放进去，让它先列证据缺口，不要马上写漂亮报告。

Google最近给NotebookLM加了更深的研究、代码分析、图表和PDF报告能力。功能越强，越容易让结果看起来像真的。研究说明书的作用，就是先把边界钉住。`,
  },
  {
    hotspotId: 2026073025,
    title: "Chrome 里这 3 个 AI 指令，我建议存成固定按钮",
    body: `如果你每天都在网页里重复说同一句话，可以直接存成浏览器Skill。

我最常用这三条：

“总结当前页，只保留结论、数字、限制和原始出处。”  
“对比这两个标签页，列出相同点、冲突点和各自没回答的问题。”  
“从当前页提取我能执行的行动项，标明负责人和截止条件。”

Gemini in Chrome已经支持保存和复用提示词、选择页面上下文、总结标签页和视频。不同地区和套餐开放程度不一样。

先存真正每周会用三次以上的指令，别一口气建二十个，最后自己也找不到。`,
  },
  {
    hotspotId: 2026073026,
    title: "用了半年 AI，到底省没省事？用这 4 个问题复盘",
    body: `月底别只看自己问了AI多少次，问这四件事：

委派：我交给AI的是重复劳动，还是把该自己决定的也扔了？  
描述：我有没有给清目标、材料和边界？  
判断：我能不能识别它写得很顺但事实不对？  
负责：最后出问题，谁核对、谁签字？

Anthropic把它叫4D：Delegation、Description、Discernment、Diligence。Claude的新反思功能也会按这些维度回看使用情况。

不用Claude也能做。挑过去一个月最常用的三类任务，留下真省时间的，停掉那些“生成5分钟、修改半小时”的。`,
  },
  {
    hotspotId: 2026073027,
    title: "这 5 类事适合让 AI 每周自动跑，别再靠想起来",
    body: `适合自动跑的，不是重要决定，是重复收集和整理。

这5类可以先试：

竞品本周更新了什么  
客户反馈新增了哪些问题  
内容数据里收藏和完播哪里变了  
行业出现了哪些一手公告  
项目有哪些逾期和风险

每个任务写清四件事：多久跑一次、只看哪些来源、按什么格式输出、哪一步必须等人确认。

ChatGPT Work现在支持定时、重复或按触发条件运行任务。千万别把“自动发布、自动付款、自动改权限”混进第一版。

先让它每周一交一张简报，你看两周，稳定以后再加动作。`,
  },
];

function enrich(item, index) {
  const previous = oldById.get(item.id) ?? {};
  return {
    ...previous,
    ...item,
    rank: index + 1,
    source: item.source ?? previous.source,
    sourceUrl: item.sourceUrl ?? previous.sourceUrl,
    sourceType: item.sourceType ?? previous.sourceType,
    age: item.age ?? (item.id >= 2026073021 ? "近30天" : previous.age),
    heat: item.heat ?? previous.heat ?? 76,
    scarcity: 55,
    fit: item.fit ?? 96,
    platforms: ["小红书", "抖音", "视频号"],
    status: "待审核",
    selected: true,
    assignee: "待分配",
    live: true,
    sourceCapturedAt: item.sourceCapturedAt ?? capturedAt,
    evidenceConfidence: item.evidenceConfidence ?? (item.id >= 2026073021 ? 88 : 82),
    domesticCoverage,
    discussionUrl: item.discussionUrl ?? previous.discussionUrl ?? item.sourceUrl,
    engagement: item.engagement ?? previous.engagement ?? {},
    engagementLabel:
      item.engagementLabel ??
      previous.engagementLabel ??
      "公开浏览、点赞、评论未提供",
    discussionFocus:
      item.discussionFocus ??
      previous.discussionFocus ?? [
        "已核验原始内容，未取得足够可验证评论样本。",
      ],
    reuseIdeas: [
      `读者可保存：${item.saveObject}`,
      `读完能做到：${item.learningOutcome}`,
      "发布稿必须保留来源边界，不把推断写成事实。",
    ],
    localizedTranslation:
      item.localizedTranslation ?? previous.localizedTranslation ?? "",
    analysisState: "已分析",
    editorialGate: {
      saveObject: item.saveObject,
      learningOutcome: item.learningOutcome,
      shareReason: "内容能直接发给同事或朋友照着做，而不是只表达态度。",
      passed: true,
    },
  };
}

const hotspots = sourceItems.map(enrich);
const draftObjects = drafts.map((draft, index) => ({
  id: 4026073001 + index,
  hotspotId: draft.hotspotId,
  platform: "小红书",
  title: draft.title,
  body: draft.body,
  visual:
    "4:5黑白极简信息卡，少量圆角简笔画。首图只放标题和一个核心物件；内页完整呈现本文的可复制模板、清单或公式。字号要大，禁止模型头像、机器人素材、发光渐变和夸张收益数字。",
  videoScript: draft.body
    .replaceAll("\n\n", " ")
    .replaceAll("  \n", "，")
    .replaceAll("\n", " ")
    .slice(0, 420),
  version: "V5 · 收藏型重选稿",
  parentVersion: "",
  revisionMode: "operator-revision",
  revisionReason:
    "人工反馈：旧选题缺少分享、收藏和学习价值；本轮废除旧推荐并按可复制提示词、清单、模板、工具或关键资讯重新筛选。",
  revisedAt: capturedAt,
  updatedBy: "Codex AI Content Operator",
  status: "待审核",
  reviewNote: "",
}));

if (hotspots.length !== 20 || draftObjects.length !== 20) {
  throw new Error(
    `Expected 20 hotspots and drafts, got ${hotspots.length}/${draftObjects.length}`,
  );
}

const archivedCurrentDrafts = Array.isArray(currentState?.drafts)
  ? currentState.drafts.map((draft) => ({
      ...draft,
      archivedAt: capturedAt,
      supersededBy: "V5 · 收藏型重选稿",
      revisionReason: "旧推荐池整体作废，按收藏价值门槛重新筛选",
    }))
  : [];
const existingHistory = Array.isArray(currentState?.draftHistory)
  ? currentState.draftHistory
  : [];

const packet = {
  mode: "replace",
  detail:
    "废除旧推荐池，替换为20条通过收藏价值门槛的热点；全部补齐可直接人工修改的小红书稿、配图和口播，不自动审核或发布。",
  state: {
    schemaVersion: 2,
    hotspots,
    drafts: draftObjects,
    draftHistory: [...existingHistory, ...archivedCurrentDrafts],
    discoveryMeta: {
      runId: "saveable-batch-2026-07-30-v5",
      capturedAt,
      coverageLabel:
        "20条全部通过收藏价值门槛；14条带公开社媒/视频互动，6条官方来源明确标注互动未公开。",
      editorialBrief:
        "每条必须给读者一个可复制提示词、清单、模板、工具步骤、公式或关键资讯；纯观点、人事和模糊预告不进入当天内容池。",
      domesticSearchState:
        "国内语义搜索适配器不可用，稀缺度统一封顶55并保留人工核验。",
      rejectedTopics: [
        "人事回流",
        "没有产品细节的发布预告",
        "只表态看多或看空AI",
        "二手资本开支转述",
        "无法给读者明确带走物的行业观点",
      ],
    },
  },
};

await writeFile(
  "operator-packets/2026-07-30-v5-saveable-batch.json",
  `${JSON.stringify(packet, null, 2)}\n`,
);

const handoff = {
  schema_version: 2,
  batch_id: "saveable-batch-2026-07-30-v5",
  hotspots: hotspots.map((item, index) => ({
    id: String(item.id),
    title: item.title,
    category: item.category,
    status: "待审核",
    recommended: index < 8,
    reason: item.reason,
    angle: item.angle,
    human_check: item.humanCheck,
    sources: [
      {
        url: item.sourceUrl,
        discussion_url: item.discussionUrl,
        source_type: item.sourceType,
        captured_at: item.sourceCapturedAt,
        engagement: item.engagement,
      },
    ],
    scores: {
      foreign_heat: item.heat,
      domestic_scarcity: item.scarcity,
      account_fit: item.fit,
      evidence_confidence: item.evidenceConfidence,
      final: Math.round(
        item.heat * 0.3 +
          item.scarcity * 0.15 +
          item.fit * 0.35 +
          item.evidenceConfidence * 0.2,
      ),
    },
    domestic_checks: [
      {
        platform: "小红书/抖音",
        state: "待人工核验",
        note: domesticCoverage,
      },
    ],
    localized_translation: item.localizedTranslation,
    discussion_focus: item.discussionFocus,
    save_object: item.editorialGate.saveObject,
    learning_outcome: item.editorialGate.learningOutcome,
  })),
  drafts: draftObjects.map((draft) => ({
    content_id: String(draft.id),
    hotspot_id: String(draft.hotspotId),
    platform: draft.platform,
    title: draft.title,
    body: draft.body,
    visual_brief: draft.visual,
    video_script: draft.videoScript,
    status: "待审核",
  })),
};

await writeFile(
  "operator-packets/2026-07-30-v5-saveable-handoff.json",
  `${JSON.stringify(handoff, null, 2)}\n`,
);

const sqlString = (value) => JSON.stringify(value).replaceAll("'", "''");
const hotspotsSql = sqlString(hotspots);
const draftsSql = sqlString(draftObjects);
const timestamp = capturedAt;

const migration = `WITH current_state AS (
  SELECT payload FROM workspace_states WHERE id = 'default'
),
archived_drafts AS (
  SELECT json_group_array(
    json_patch(
      value,
      json_object(
        'archivedAt', '${timestamp}',
        'supersededBy', 'V5 · 收藏型重选稿',
        'revisionReason', '旧推荐池整体作废，按收藏价值门槛重新筛选'
      )
    )
  ) AS items
  FROM json_each((SELECT payload FROM current_state), '$.drafts')
),
combined_history AS (
  SELECT json_group_array(json(value)) AS items
  FROM (
    SELECT value
    FROM json_each(
      COALESCE(
        json_extract((SELECT payload FROM current_state), '$.draftHistory'),
        '[]'
      )
    )
    UNION ALL
    SELECT value
    FROM json_each(COALESCE((SELECT items FROM archived_drafts), '[]'))
  )
)
UPDATE workspace_states
SET
  payload = json_set(
    payload,
    '$.hotspots', json('${hotspotsSql}'),
    '$.drafts', json('${draftsSql}'),
    '$.draftHistory', json((SELECT items FROM combined_history)),
    '$.discoveryMeta', json('${sqlString(packet.state.discoveryMeta)}')
  ),
  updated_by = 'Codex AI Content Operator',
  updated_at = '${timestamp}'
WHERE id = 'default';
--> statement-breakpoint
INSERT INTO audit_events (
  workspace_id,
  actor,
  event_type,
  detail
)
VALUES (
  'default',
  'Codex AI Content Operator',
  '收藏型内容池整体重选',
  '旧推荐池整体归档；替换为20条全部带可保存对象的内容，其中14条有公开社媒/视频互动，6条官方来源明确标注互动未公开；不自动审核或发布'
);
`;

await writeFile("drizzle/0006_saveable_batch.sql", migration);
console.log("Generated V5 packet and migration with 20 saveable topics.");
