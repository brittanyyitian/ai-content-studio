import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const previous = JSON.parse(fs.readFileSync(path.join(root, "operator-packets/2026-08-06-daily-batch.json"), "utf8"));
const previousState = previous.state ?? previous;
const capturedAt = "2026-08-07T09:01:25+08:00";
const outPath = path.join(root, "operator-packets/2026-08-07-daily-batch.json");
const handoffPath = path.join(root, "operator-packets/2026-08-07-daily-handoff.json");

const domesticCoverage = "未接入小红书、抖音平台内全量语义检索；国内稀缺度按规则封顶55。发布前请人工搜索产品名、作者名、核心主张与本稿标题，不能写成‘国内没人发’。";
const visual = "4:5黑白极简信息卡，轻微圆角，只加一处手绘线条。首图放标题和一个真实物件；内页用截图、清单或前后对照。不要机器人头像、发光渐变、虚构收益和未经核验的数字。";

const defaults = {
  sourceType: "Hacker News",
  category: "AI 技巧",
  scarcity: 55,
  fit: 82,
  evidenceConfidence: 84,
  actionability: 70,
  recommended: false,
  engagement: { views: null, likes: null, replies: null, reposts: null, bookmarks: null },
};
const item = (data) => ({ ...defaults, ...data });

const items = [
  item({
    source: "Artificial Analysis / Hacker News", sourceUrl: "https://artificialanalysis.ai/?intelligence=agentic-index", discussionUrl: "https://news.ycombinator.com/item?id=49200652", evidenceId: "hn-49200652",
    title: "Qwen3.8 Max 冲到 Agent 榜第一，但评论先问：这个榜到底测了什么", heat: 100, fit: 70, actionability: 42, evidenceConfidence: 87, category: "产业观察",
    summary: "Artificial Analysis的Agentic Index页面把Qwen3.8 Max列在前位。HN采集时419 points、270 comments；评论质疑同站编码Agent页没有Qwen，以及开放权重模型的实际调用成本。",
    engagementLabel: "Hacker News 419 points · 270 comments（8月7日采集）；榜单页浏览、点赞、收藏未公开",
    localizedTranslation: "原题：Qwen3.8 Max现按Agentic Index排名综合第一。这里的‘第一’只对应该指数及其任务组合，不等同于所有工作都最好。",
    reason: "当天高互动，但榜单方法和成本口径比名次更重要，留作候选。", angle: "把榜单拆成任务、价格、上下文和可部署性四栏。",
    humanCheck: "发布前保存榜单快照并核对测试任务、模型版本、价格来源；榜单会变，不得写成永久第一。",
    discussionFocus: ["评论质疑不同子榜页面是否一致。", "也有人关心开放权重模型为何在该成本指数上接近闭源模型。"],
    commentSamples: ["embedding-shape指出同站编码Agent页面没有出现Qwen。", "drnick1追问开放权重模型在成本指数上接近GPT-5.6的原因。"],
    saveObject: "模型榜单四栏核验卡", learningOutcome: "知道榜单第一不等于自己的任务最合适。",
    body: `Qwen3.8 Max 今天冲上了一个 Agent 榜单的第一。HN 采集时 419 分、270 条评论，热度很高。

但评论区最有用的不是庆祝，而是追问：测了哪些任务？别的子榜为什么没看到它？成本又是怎么计算的？

看模型榜单，至少把任务、价格、上下文长度和能不能自己部署放在一起。只截一张“第一名”图，信息其实还不完整。`,
    video: "Qwen3.8 Max冲到一个Agent榜第一，HN有419分、270条评论。先别只转名次，至少看四项：测的是什么任务、调用价格怎么算、上下文多长、能不能自己部署。榜单第一只代表那套测试，不代表你手上的工作一定最好用。",
  }),
  item({
    source: "AMD / Hacker News", sourceUrl: "https://ir.amd.com/news-events/press-releases/detail/1296/amd-acquires-taalas-to-advance-compute-solutions-for-rapidly-growing-ai-inference-market", discussionUrl: "https://news.ycombinator.com/item?id=49201970", evidenceId: "hn-49201970",
    title: "AMD 收购 Taalas：想把模型直接做进芯片，先解决推理成本", heat: 98, fit: 61, actionability: 30, evidenceConfidence: 96, category: "产业观察",
    summary: "AMD宣布收购Taalas，以推进面向AI推理的计算方案。相关新闻在HN采集时331 points、261 comments；讨论集中在把特定模型映射到硅片的性能收益与灵活性代价。",
    engagementLabel: "Hacker News 331 points · 261 comments（8月7日采集）；AMD公告页浏览、点赞、收藏未公开",
    localizedTranslation: "原题：AMD收购Taalas，以推进快速增长的AI推理市场所需计算方案。Taalas的公开方向是针对模型定制硬件。",
    reason: "讨论高但离普通用户较远，不占推荐位。", angle: "把它解释为性能与换模型灵活性的交换。",
    humanCheck: "只写AMD公告确认的收购与方向；交易金额、产品上市时间和性能提升若未公开就写未公开。",
    discussionFocus: ["有人遗憾Taalas还没单独发布硬件就被收购。", "也有人认为固定模型硬件虽不灵活，却可能显著提高推理效率。"],
    commentSamples: ["rvz说公司还没机会正式推出硬件。", "MarkWayneNewton认为这种受限设计仍可能带来显著性能收益。"],
    saveObject: "专用AI芯片利弊对照", learningOutcome: "理解更快推理可能以模型灵活性为代价。",
    body: `AMD 买下了 Taalas。后者想做的事很直接：把特定模型更深地做进芯片，少走通用GPU那套路。

好处可能是推理更快、更省电；代价是模型一换，硬件未必还能跟上。交易金额、产品时间和真实性能目前都别替官方补。`,
    video: "AMD收购Taalas，方向是把特定AI模型更深地做进芯片。它可能让推理更快、更省电，但模型一换，硬件灵活性也会下降。现在能确认的是收购和技术方向，交易金额、上市时间与实际性能还没有完整公开。",
  }),
  item({
    source: "ScaleX / Hacker News", sourceUrl: "https://scalex.dev/blog/ai-agent-permissions-stats/", discussionUrl: "https://news.ycombinator.com/item?id=49195468", evidenceId: "hn-49195468",
    title: "AI 每次弹窗都点允许？4万次测试里，人漏掉了三分之一风险命令", heat: 96, fit: 99, actionability: 99, evidenceConfidence: 93, recommended: true,
    summary: "ScaleX汇总其AI Agent权限小游戏超过4万次游玩、40.9万次决策，称参与者漏过约三分之一威胁。HN采集时248 points、190 comments；评论认为反复让人点允许并不是可靠安全模型。",
    engagementLabel: "Hacker News 248 points · 190 comments（8月7日采集）；ScaleX称40k+ plays、409k decisions，原站点赞与收藏未公开",
    localizedTranslation: "原题：人类在4万次AI Agent命令审批游戏中漏掉三分之一威胁。作者明确说明这是游戏数据，不是企业生产事故统计。",
    reason: "高互动、数据边界清楚，而且能直接变成每个人可用的授权清单。", angle: "别训练自己更认真地点弹窗，直接减少Agent默认能做的事。",
    humanCheck: "三分之一来自游戏样本，不能写成所有用户或所有Agent的真实事故率；发布前核对作者统计页。",
    discussionFocus: ["评论认为‘不断询问用户并希望永不犯错’是失败过很多次的安全模式。", "建议用沙箱和自定义权限框架代替高频人工确认。"],
    commentSamples: ["continuational认为反复请求授权、寄望用户永不出错的模式并不可靠。", "whazor把它视为需要沙箱和定制权限框架的案例。"],
    saveObject: "Agent授权前5秒检查表", learningOutcome: "会区分读取、写入、联网、执行和凭据访问。",
    body: `我现在看到 AI 弹“允许执行”时，不会马上点了。

一个 Agent 权限小游戏累计了 4 万多次游玩、40.9 万次选择。作者统计，参与者漏掉了大约三分之一的危险命令。它只是游戏，不是现实事故率，但很能说明问题：弹窗看多了，人真的会麻。

我的做法是先看命令要碰什么：

只读文件，一般风险最低；
要写文件，先确认具体目录；
要联网，看清域名和要传出去的内容；
要执行脚本，先看脚本来源；
碰到密码、Cookie、SSH密钥，默认拒绝。

更重要的是，别给 Agent 一个“全盘允许”的大权限。能只开一个目录，就别开整个电脑；能先预览改动，就别让它直接执行。

真正省心的不是每次都认真点确认，而是让危险选项一开始就进不来。`,
    video: "AI弹出允许执行，你会不会顺手就点？一个Agent权限游戏有4万多次游玩、40.9万次选择，参与者漏掉了约三分之一危险命令。它不是现实事故率，但提醒很实在：只读、写文件、联网、执行脚本、访问密钥，风险完全不同。最安全的做法不是更认真地点，而是只给当前任务需要的最小权限。",
  }),
  item({
    source: "OpenAI / Hacker News", sourceUrl: "https://openai.com/index/improving-gpt-5-6-sol-in-chatgpt/", discussionUrl: "https://news.ycombinator.com/item?id=49199357", evidenceId: "hn-49199357",
    title: "ChatGPT 免费用户这周换默认模型，还多了一个 Think 按钮", heat: 90, fit: 98, actionability: 94, evidenceConfidence: 98, recommended: true,
    summary: "OpenAI宣布更新ChatGPT中的GPT-5.6 Sol，并计划本周把免费与Go用户默认模型改为GPT-5.6 Luna，下周提供不限量文字聊天和Think按钮（受滥用防护限制）。HN采集时141 points、100 comments。",
    engagementLabel: "Hacker News 141 points · 100 comments（8月7日采集）；OpenAI公告页浏览、点赞、收藏未公开",
    localizedTranslation: "官方要点：Plus/Pro的Sol回答更聚焦并新增思考量滑杆；免费与Go用户本周切换Luna，下周获得不限量文字聊天与Think按钮，文件、图片等工具仍有限制。Work与Codex所用Sol不随本次更新改变。",
    reason: "是真正影响大量普通用户的当天产品更新，适合做简短清楚的小资讯。", angle: "只说用户今天会看到什么、什么时候有、哪些不包括。",
    humanCheck: "分批开放可能因账号和地区不同；发布时保留‘本周/下周’与工具限制，不承诺所有账号立刻出现。",
    discussionFocus: ["有人认可免费Luna不限量文字聊天的力度。", "也有人把这看成头部模型产品同质化、竞争加剧的信号。"],
    commentSamples: ["tosh称赞免费Luna不限量文字聊天。", "colingauvin认为头部聊天产品正在面临更强的同质化竞争。"],
    saveObject: "ChatGPT本周更新一页图", learningOutcome: "分清免费、Plus/Pro以及Work/Codex的变化。",
    body: `ChatGPT 这次更新，免费用户拿到的变化反而最直观。

官方说，免费和 Go 用户会在本周陆续把 GPT-5.6 Luna 设成默认模型；从下周起，文字聊天不限量，还会多一个 Think 按钮，遇到难题时可以让它多想一会儿。

但“不限量”只指文字聊天。文件上传、图片和其他工具还是有限制，也会受防滥用规则影响。

Plus 和 Pro 用户这边，GPT-5.6 Sol 会更偏向直接回答、减少没必要的格式，还新增一个思考量滑杆。要快答就拉低，做研究、写作、规划再拉高。

另外，这次更新只改 ChatGPT 里的聊天体验，Work 和 Codex 用的 Sol 没变。

如果你的账号还没看到，不一定是没有，官方写的是分批在本周和下周开放。`,
    video: "ChatGPT免费用户这周会陆续换成GPT-5.6 Luna默认模型，下周开始文字聊天不限量，还会多一个Think按钮。注意，不限量只指文字，文件、图片和其他工具仍有限制。Plus和Pro的Sol新增思考量滑杆；这次更新不影响Work和Codex里的Sol。账号没看到也别急，是分批开放。",
  }),
  item({
    source: "CopilotKit / Hacker News", sourceUrl: "https://github.com/CopilotKit/channels-sdk", discussionUrl: "https://news.ycombinator.com/item?id=49198583", evidenceId: "hn-49198583",
    title: "自己做的 AI 助手，不用再单独开网页了：可以直接放进 Slack 和 Teams", heat: 82, fit: 94, actionability: 90, evidenceConfidence: 92, recommended: true, category: "实操案例",
    summary: "CopilotKit公开Channels SDK，让AG-UI兼容Agent进入Slack、Microsoft Teams等沟通渠道，支持流式回复、工具调用、文件、交互UI和人工批准。HN采集时84 points、20 comments。",
    engagementLabel: "Hacker News 84 points · 20 comments（8月7日采集）；GitHub公开44 Forks、2 Issues，Stars页面未稳定公开",
    localizedTranslation: "原题：Channels SDK——把任何Agent带到任何频道。仓库说明Agent逻辑运行在开发者基础设施中，Slack/Teams托管连接由CopilotKit Intelligence提供。",
    reason: "能把Agent落到团队真实沟通场景，且人审按钮是明确能力。", angle: "先做一个群里能用的小任务，不要先做万能聊天机器人。",
    humanCheck: "核对托管连接的价格、数据流向、OAuth权限和可自托管范围；MIT仓库不代表全部服务开源。",
    discussionFocus: ["评论质疑开源边界：客户端MIT，但托管连接服务是闭源且需许可。", "作者强调目标是让Agent像频道成员一样工作并渲染原生UI。"],
    commentSamples: ["chengyongru指出MIT部分主要是客户端，核心托管服务并非全部开源。", "mikeryan52说明这是首个公开版本，重点是Slack和Teams中的原生交互。"],
    saveObject: "群聊Agent最小任务模板", learningOutcome: "会把Agent设计成有触发条件、有确认按钮的单一流程。",
    body: `做了一个 AI 助手，最尴尬的往往不是能力不够，而是同事根本不想再开一个新网页。

Channels SDK 刚开源了一套接法，可以把 Agent 放进 Slack、Teams 这类日常群聊里。它不只是回文字，还能读当前对话、调用工具、收文件，并在真正执行前放一个人工确认按钮。

我觉得最适合先做的，不是“万能公司助手”，而是一个很窄的群内动作。比如：

有人丢来客户反馈，它整理成工单草稿；
有人发会议录音，它提取待办并@负责人；
有人问数据，它先给查询结果，点确认后再写进周报。

先别忽略开源边界：仓库是MIT，但Slack和Teams的托管连接走CopilotKit Intelligence。价格、数据流向和权限，正式接公司群前都要问清楚。

好用的群聊Agent不是一直说话，而是该出现时出现，该停手时等人确认。`,
    video: "你做的AI助手，别再让同事多开一个网页。Channels SDK能把Agent放进Slack和Teams，读群聊、收文件、调用工具，还能在执行前放人工确认按钮。最适合先做一个小任务，比如把客户反馈整理成工单草稿。注意仓库MIT不等于托管连接全部开源，价格、数据流向和权限要先核对。",
  }),
  item({
    source: "BFSWA / Hacker News", sourceUrl: "https://www.bfswa.blog/p/llms-wont-break-symmetric-crypto", discussionUrl: "https://news.ycombinator.com/item?id=49191365", evidenceId: "hn-49191365",
    title: "LLM 会不会把现有加密直接算破？这篇文章给出了一个冷静答案", heat: 78, fit: 55, actionability: 35, evidenceConfidence: 81, category: "产业观察",
    summary: "一篇技术文章论证，现有LLM并不会凭生成能力直接突破对称密码。HN采集时73 points、95 comments；讨论争议集中在未来模型能否发现新型密码分析方法。",
    engagementLabel: "Hacker News 73 points · 95 comments（8月7日采集）；原站浏览、点赞、收藏未公开",
    localizedTranslation: "原题：LLM不会攻破对称密码。文章区分了预测文本、执行大规模计算和发现新密码分析方法。",
    reason: "评论多但技术门槛高，留候选。", angle: "把‘会写攻击代码’与‘能突破密码学难题’分开。",
    humanCheck: "需密码学专业人员审稿；不能把当前观察写成永远不可能。",
    discussionFocus: ["有人认为仅凭下一个词预测无法完成巨量计算。", "反对者认为未来模型可能改进实验设计和密码分析研究。"],
    commentSamples: ["sghiassy区分了语言预测与大整数计算。", "modeless认为‘因为很难所以不会’的论证仍不充分。"],
    saveObject: "AI安全标题概念拆分卡", learningOutcome: "分清生成代码、执行计算与发现算法。",
    body: `“AI会不会突然把加密全算破？”

一篇技术文章给出的答案是：现有LLM会写攻击思路，不等于能突破对称密码背后的计算难题。HN有73分、95条评论，反对者也提醒，未来模型可能帮助研究者设计新实验。

这条适合继续跟，但不能写成“永远安全”或“明天就会失效”。`,
    video: "AI会不会突然把现有加密全算破？现有LLM能生成攻击思路，不等于能完成密码学所需的巨量计算。HN这场讨论有73分、95条评论。更准确的说法是：今天没有直接证据表明LLM能突破对称密码，但未来是否帮助发现新方法，仍要看可验证研究。",
  }),
  item({
    source: "Aleksa Gordić / Hacker News", sourceUrl: "https://www.aleksagordic.com/blog/vllm", discussionUrl: "https://news.ycombinator.com/item?id=49202852", evidenceId: "hn-49202852",
    title: "为什么同一个大模型，有的平台回答快很多？vLLM 这篇拆解说清了", heat: 72, fit: 58, actionability: 46, evidenceConfidence: 92, category: "产业观察",
    summary: "技术长文拆解vLLM高吞吐推理系统，包括调度、批处理、内存和Paged Attention等。HN采集时51 points、2 comments。",
    engagementLabel: "Hacker News 51 points · 2 comments（8月7日采集）；原站浏览、点赞、收藏未公开",
    localizedTranslation: "原题：vLLM内部——高吞吐LLM推理系统的结构。它解释请求如何被调度、显存如何管理以及为何能提高并发吞吐。",
    reason: "一手技术材料完整，但面向普通内容用户太深，不推荐。", angle: "用餐厅排位解释批处理和显存复用，不堆术语。",
    humanCheck: "文章标注2025，今天是重新进入讨论，不得写成今天新发布。技术表述需工程人员复核。",
    discussionFocus: ["评论希望比较vLLM的Paged Attention与SGLang的Radix Attention。", "有人推荐nano-vllm作为更小的代码学习入口。"],
    commentSamples: ["BinRoo追问与Radix Attention的差异。", "miki123211推荐约5千行的nano-vllm帮助读源码。"],
    saveObject: "大模型服务速度四因素图", learningOutcome: "知道速度不只由模型大小决定。",
    body: `同一个模型，为什么有的平台能同时接很多人，另一个一忙就排队？

vLLM这篇长文把背后的调度、批处理和显存管理拆得很细。它是2025年的文章，今天重新上了HN，不是刚发布。普通用户先记住一句：模型一样，服务它的“后厨”也会决定速度和成本。`,
    video: "同一个大模型，为什么有的平台快很多？不只看模型本身，还看请求怎么排队、能不能一起批处理、显存如何复用。vLLM这篇拆解很完整，但它是2025年的文章今天重新被讨论，不要写成新发布。",
  }),
  item({
    source: "CNN / Hacker News", sourceUrl: "https://www.cnn.com/2026/08/06/business/data-centers-protests-ai", discussionUrl: "https://news.ycombinator.com/item?id=49197546", evidenceId: "hn-49197546",
    title: "美国多地反对AI数据中心，争议不只是耗电，还有燃气机组和社区成本", heat: 74, fit: 60, actionability: 28, evidenceConfidence: 74, category: "产业观察",
    summary: "CNN报道美国多地针对数据中心项目的社区反对活动。HN采集时46 points、136 comments；评论讨论居民究竟反感数据中心本身，还是24小时燃气发电、噪声与基础设施压力。",
    engagementLabel: "Hacker News 46 points · 136 comments（8月7日采集）；CNN页面浏览、点赞、收藏未公开",
    localizedTranslation: "原题：美国人正集会反对数据中心，令人意外的是实际建成的不多。报道聚焦许可、能源、社区利益和地方阻力。",
    reason: "评论密度高但议题复杂，需多方来源，不推荐快速发。", angle: "把电、燃气、噪声、税收和就业拆开，别只用‘反AI’概括。",
    humanCheck: "需补充当地政府、项目方和社区组织的一手材料；不能把个案外推到全美。",
    discussionFocus: ["有人认为居民主要反感的是配套燃气机组而非数据中心建筑。", "也有人讨论美国工业建设能力与地方阻力的矛盾。"],
    commentSamples: ["boc区分了反对数据中心和反对24小时燃气机组。", "woah从产业建设能力角度表达担忧。"],
    saveObject: "数据中心争议五栏表", learningOutcome: "能把AI基础设施争议拆成可核实的地方议题。",
    body: `美国一些地方正在反对AI数据中心。HN这条只有46分，却有136条评论，说明争议很集中。

评论提醒了一点：居民反对的未必只是“AI”，还可能是24小时燃气机组、噪声、水、电网和谁来承担成本。真要写，必须把这些具体问题拆开，不能一句“当地人反科技”带过。`,
    video: "美国多地反对AI数据中心，HN有46分、136条评论。争议不只是耗电，还包括燃气机组、噪声、水、电网和社区成本。把它简单写成居民反AI会丢掉最重要的信息，必须补当地政府、项目方和社区的一手材料。",
  }),
  item({
    source: "Wallfacer / Hacker News", sourceUrl: "https://github.com/pradipta/wallfacer", discussionUrl: "https://news.ycombinator.com/item?id=49192219", evidenceId: "hn-49192219",
    title: "Codex、Claude 会话越开越多？这个小工具能把旧任务重新找回来", heat: 68, fit: 99, actionability: 98, evidenceConfidence: 95, recommended: true,
    summary: "Wallfacer是本地终端会话管理器，可索引Claude Code、Cursor CLI、Kiro CLI和Codex的本地会话，支持命名、标签、搜索和恢复。仓库称索引只读，元数据另存本地SQLite。HN采集时34 points、22 comments。",
    engagementLabel: "Hacker News 34 points · 22 comments（8月7日采集）；GitHub页面显示34 commits，Stars/收藏未稳定公开",
    localizedTranslation: "原题：Wallfacer——用于Claude Code等工具的终端会话管理器。它不会改写Agent原始会话文件，而是建立只读索引。",
    reason: "不是最大热点，但正好解决多Agent用户每天都会遇到的找会话问题。", angle: "把AI会话从聊天记录变成可以命名、归类和恢复的工作资产。",
    humanCheck: "安装前核对仓库、发布文件、系统权限和本地索引范围；删除功能虽默认进废纸篓，仍应先测试。",
    discussionFocus: ["作者因大型单仓库里会话散落各处而开发该工具。", "评论提醒Claude可用/rename、也可用tmux，工具价值在跨Agent统一索引。"],
    commentSamples: ["作者说自己经常记得解决过问题，却找不到原来的Agent会话。", "sunir提醒Claude有/rename，也推荐tmux。"],
    saveObject: "AI会话命名规则", learningOutcome: "能用项目、动作和结果命名会话并随时找回。",
    body: `我电脑里最容易丢的，已经不是文件，是 AI 会话。

一个 Bug 明明解决过，过几天又遇到，只记得“之前让 Claude 或 Codex 查过”，但完全找不到是哪一条。

Wallfacer 就是专门收拾这个问题的。它会把 Claude Code、Cursor CLI、Kiro CLI 和 Codex 的本地会话放进同一个列表，可以改名、加标签、按项目搜索，还能直接恢复。作者说明它只读索引原会话，自己的标签存在本地 SQLite。

如果不想装工具，也可以先抄它的命名法：

项目名 + 动作 + 结果

比如“官网｜修登录回跳｜已加回归测试”，就比“继续修一下”好找太多。

工具本身刚发布，安装前还是要核对仓库和权限。但把会话当工作资产管理，这个习惯今天就能用。`,
    video: "AI会话开多了，最痛苦的是明明解决过的问题却找不到原记录。Wallfacer把Claude Code、Cursor、Kiro和Codex的本地会话放进同一个列表，可以命名、打标签、搜索和恢复。你不装工具也能先用一个命名法：项目名、动作、结果。比如官网、修登录回跳、已加回归测试。",
  }),
  item({
    source: "DeepSeek / Hacker News讨论", sourceUrl: "https://news.ycombinator.com/item?id=49192693", discussionUrl: "https://news.ycombinator.com/item?id=49192693", evidenceId: "hn-49192693",
    title: "DeepSeek API 被传将大幅涨价，但公开讨论里连新价格都没确认", heat: 62, fit: 66, actionability: 38, evidenceConfidence: 48, category: "产业观察",
    summary: "HN自帖称DeepSeek将大幅提高API价格，采集时24 points、16 comments；评论明确指出尚未披露具体价格变化，猜测可能涉及缓存命中价。当前缺少官方定价公告。",
    engagementLabel: "Hacker News 24 points · 16 comments（8月7日采集）；无官方浏览、点赞、收藏数据",
    localizedTranslation: "原题：DeepSeek宣布将大幅提高API价格。当前讨论页没有给出可核验的新价表，标题结论尚未被一手来源支持。",
    reason: "可能影响成本，但证据不足，只做监测。", angle: "没有新价表就不发涨价结论，先保存旧价与新价截图。",
    humanCheck: "必须找到DeepSeek官方公告或定价页变更记录；没有就不得发布。",
    discussionFocus: ["评论猜测可能调整缓存命中价格。", "也有人讨论低价补贴获客能否持续，但都不是官方说明。"],
    commentSamples: ["samuelknight明确说具体价格变化尚未公开，并猜测可能是缓存命中价。", "thiago_fm讨论开源模型与算力供给可能影响长期价格。"],
    saveObject: "API涨价核验表", learningOutcome: "会先找官方新旧价表再计算影响。",
    body: `“DeepSeek API要大涨价”今天在HN有一轮讨论，但帖子里没有新的官方价表，评论也承认具体改什么还没公布。

这种消息最容易抢跑。先等官方公告，拿到旧价、新价、生效时间和缓存计费四项，再算自己每月会多花多少。现在不建议发成确定新闻。`,
    video: "DeepSeek API被传要大幅涨价，但当前HN讨论里连新价格都没有确认。先别抢跑。必须拿到官方旧价、新价、生效时间和缓存计费，再计算影响。没有一手价表，就只能写待核实，不能写成已涨价。",
  }),
  item({
    source: "New York Times / Hacker News", sourceUrl: "https://www.nytimes.com/2026/08/06/science/ai-created-viruses.html", discussionUrl: "https://news.ycombinator.com/item?id=49200213", evidenceId: "hn-49200213",
    title: "“AI创造自然界没有的病毒”这条标题，漏掉了最关键的限定词", heat: 60, fit: 35, actionability: 25, evidenceConfidence: 55, category: "产业观察",
    summary: "媒体以‘AI创造自然界没有的病毒’为题报道研究。HN采集时21 points、11 comments；评论指出研究对象是感染细菌的噬菌体，而非感染人类的病毒，这一限定在报道中出现较晚。",
    engagementLabel: "Hacker News 21 points · 11 comments（8月7日采集）；媒体页浏览、点赞、收藏未公开",
    localizedTranslation: "原题：AI创造了自然界未发现的病毒。需要补充：评论指报道研究的是噬菌体，不能让读者误以为是人类病毒。",
    reason: "标题敏感且付费墙阻碍完整核验，不推荐。", angle: "先补物种、宿主和实验环境，再谈风险。",
    humanCheck: "必须阅读原论文、机构说明与生物安全审查；不得提供可操作实验细节。",
    discussionFocus: ["评论批评标题没有尽早说明是噬菌体。", "也有人从生物安全角度表达担忧，但缺少进一步证据。"],
    commentSamples: ["great_tankard指出研究对象是感染细菌的噬菌体，不是人类病毒。", "lrvick从广义生物安全角度表达担忧。"],
    saveObject: "生物AI新闻限定词卡", learningOutcome: "看到敏感标题先核对宿主、环境和实验对象。",
    body: `“AI创造了自然界没有的病毒”很吓人，但HN评论指出，报道对象是感染细菌的噬菌体，不是人类病毒。

这不是说研究没有风险，而是标题必须先把对象讲清楚。原论文和安全审查还没完整核验前，不建议做成情绪化快讯。`,
    video: "一条标题说AI创造了自然界没有的病毒。最关键的限定是：评论指出研究对象是感染细菌的噬菌体，不是人类病毒。敏感科研新闻先核对宿主、实验环境和安全审查，别让一个省略限定词的标题把风险说歪。",
  }),
  item({
    source: "Cloudflare / Hacker News", sourceUrl: "https://blog.cloudflare.com/kitesurf/", discussionUrl: "https://news.ycombinator.com/item?id=49196184", evidenceId: "hn-49196184",
    title: "Cloudflare 做了一个不给人看的浏览器：专门让 Agent 读网页", heat: 58, fit: 77, actionability: 52, evidenceConfidence: 93, category: "产业观察",
    summary: "Cloudflare发布Kitesurf，一个运行在Workers V8 isolates中的Agent-first浏览器，使用Rust与WebAssembly处理网页。HN采集时18 points、3 comments。",
    engagementLabel: "Hacker News 18 points · 3 comments（8月7日采集）；Cloudflare文章页浏览、点赞、收藏未公开",
    localizedTranslation: "原题：Kitesurf——运行在Cloudflare Workers V8隔离环境中的Agent优先浏览器。目标不是完整显示网页给人看，而是让Agent解析和操作网络内容。",
    reason: "概念新但互动和独立测试少，留候选。", angle: "比较人类浏览器与Agent浏览器分别需要什么。",
    humanCheck: "核对JavaScript、登录态、反爬、Cookie和隐私支持范围，不得写成可替代完整Chrome。",
    discussionFocus: ["评论注意到它用Rust编译到WebAssembly。", "也有人认为早期HTML/CSS解析器对Agent用途可能够用。"],
    commentSamples: ["tosh引用了项目尽量使用原生Rust并编译到WebAssembly的选择。", "dabinat认为对Agent浏览来说，不完整的视觉渲染未必是问题。"],
    saveObject: "Agent浏览器能力清单", learningOutcome: "知道Agent浏览器更看重解析、隔离与操作而非视觉还原。",
    body: `Cloudflare做了一个“不给人看的浏览器”。Kitesurf跑在Workers的隔离环境里，目标是让Agent读网页、执行操作，而不是把页面漂漂亮亮地画给人看。

想法很有意思，但登录态、复杂JavaScript、Cookie和反爬能处理到什么程度，还要等实测。`,
    video: "Cloudflare做了一个专门给Agent用的浏览器Kitesurf。它更关心网页解析、隔离和操作，不追求人类看到的完整视觉页面。方向很新，但登录态、复杂JavaScript、Cookie和反爬支持到什么程度，还得等实际测试。",
  }),
  item({
    source: "Cezar / Hacker News", sourceUrl: "https://github.com/open-mercato/cezar", discussionUrl: "https://news.ycombinator.com/item?id=49194719", evidenceId: "hn-49194719",
    title: "同时开多个编程 Agent 不等于更快：Cezar 想做的是排队和合并", heat: 52, fit: 79, actionability: 55, evidenceConfidence: 72, category: "实操案例",
    summary: "Cezar是并行编程Agent编排项目，尝试把任务拆分给多个Agent并处理结果。HN采集时16 points、2 comments，评论样本不足以证明实际效果。",
    engagementLabel: "Hacker News 16 points · 2 comments（8月7日采集）；GitHub浏览、点赞、收藏未公开",
    localizedTranslation: "原题：Cezar——并行编程Agent编排器。重点是任务分发、隔离执行和结果汇总。",
    reason: "方向实用但证据与互动都少，不推荐。", angle: "并行前先保证任务边界清楚、文件不冲突、验收能自动化。",
    humanCheck: "核对隔离方式、冲突处理、测试门禁和支持的Agent；必须用真实仓库小范围试跑。",
    discussionFocus: ["仅有少量正面反馈，没有详细使用报告。"],
    commentSamples: ["gregrog认为方向值得关注。", "Brosper只表达了喜欢，没有补充实测证据。"],
    saveObject: "多Agent并行前置条件", learningOutcome: "知道任务拆分和自动验收比Agent数量更重要。",
    body: `多个编程Agent一起跑，听起来很快，实际最容易卡在三件事：改到同一份文件、任务互相依赖、最后没人能判断谁写对了。

Cezar在做并行编排，但HN只有16分、2条评论。先当工具观察，不要把“多Agent”直接等同于效率翻倍。`,
    video: "同时开多个编程Agent不一定更快。最常见的问题是改同一份文件、任务互相依赖、最后没有自动验收。Cezar在做并行编排，但目前公开互动和实测都少。真正值得先做的是把任务边界和测试门禁写清楚。",
  }),
  item({
    source: "The Next Web / Hacker News", sourceUrl: "https://thenextweb.com/news/openai-rivals-agree-standard-ai-agents", discussionUrl: "https://news.ycombinator.com/item?id=49203443", evidenceId: "hn-49203443",
    title: "多家AI公司被曝要统一Agent插件标准，但一手规范链接还没补齐", heat: 50, fit: 71, actionability: 34, evidenceConfidence: 52, category: "产业观察",
    summary: "TNW报道称OpenAI与四家同行就Agent插件、技能和MCP相关标准达成一致。HN采集时15 points、2 comments；当前未取得完整一手联合公告和规范版本。",
    engagementLabel: "Hacker News 15 points · 2 comments（8月7日采集）；媒体页浏览、点赞、收藏未公开",
    localizedTranslation: "原题：OpenAI和四个竞争对手刚刚同意一套AI Agent标准。参与者、标准名称、治理方式与兼容范围需一手材料确认。",
    reason: "潜在影响大但一手证据不足，不能当确定新闻发布。", angle: "先问统一的是文件格式、工具协议还是分发审核。",
    humanCheck: "必须补官方联合公告、规范仓库、版本号与参与方名单；没有则不发布。",
    discussionFocus: ["评论认为标准化能减少重复适配。", "同时担心大公司通过标准形成新的准入门槛。"],
    commentSamples: ["nolok同时提到标准化的兼容收益与守门人风险。", "其余评论不足，无法判断社区共识。"],
    saveObject: "Agent标准四问", learningOutcome: "会追问标准对象、治理、兼容与审核权。",
    body: `一条媒体消息说，多家AI公司要统一Agent插件标准。方向很大，但目前缺少完整的一手联合公告和规范链接。

先别急着写“生态大一统”。至少要确认统一的是文件格式、工具协议、分发方式还是审核规则。四件不是一回事。`,
    video: "多家AI公司被曝要统一Agent插件标准，但目前一手联合公告和规范还没补齐。先别写生态大一统。要确认的有四项：统一什么对象、谁来治理、怎么兼容旧版本、谁掌握分发审核权。",
  }),
  item({
    source: "mcp-use / Hacker News", sourceUrl: "https://manufact.com/blog/mcp-use-v2", discussionUrl: "https://news.ycombinator.com/item?id=49198472", evidenceId: "hn-49198472",
    title: "mcp-use v2 重做成无状态：服务器不替你记上下文了", heat: 48, fit: 70, actionability: 55, evidenceConfidence: 90, category: "实操案例",
    summary: "mcp-use v2按2026-07-28 MCP规范重写为无状态架构。HN采集时10 points、1 comment；公开讨论样本太少。",
    engagementLabel: "Hacker News 10 points · 1 comment（8月7日采集）；原站浏览、点赞、收藏未公开",
    localizedTranslation: "原题：mcp-use v2根据2026-07-28 MCP规范从头重建并改为无状态。会话状态需要由调用方显式管理。",
    reason: "开发者相关但互动低，留候选。", angle: "无状态不是没记忆，而是记忆归谁管理变得明确。",
    humanCheck: "核对规范版本、迁移指南和破坏性变更；旧项目不要直接升级生产。",
    discussionFocus: ["HN只有一条简短正面评论，没有可验证的迁移经验。"],
    commentSamples: ["swiftlyTyped只评价文章不错，没有提供实测。"],
    saveObject: "MCP v2迁移检查表", learningOutcome: "理解无状态服务仍需要客户端保存必要上下文。",
    body: `mcp-use v2把服务器改成无状态。简单说，不是“系统没有记忆”，而是记忆不再偷偷留在服务器里，要由调用方明确保存和传入。

这会让扩容更容易，但旧项目升级前要先查会话、认证和重试逻辑。HN目前只有1条评论，先不当成熟经验。`,
    video: "mcp-use v2改成无状态。不是系统没记忆，而是记忆归谁管变得明确：调用方保存，需要时再带上。好处是扩容和重试更清楚，代价是旧项目的会话、认证和迁移逻辑必须重新检查。",
  }),
  item({
    source: "Kayvan Zahiri / Hacker News", sourceUrl: "https://github.com/Kayvan-Zahiri/asr-age-gap", discussionUrl: "https://news.ycombinator.com/item?id=49204388", evidenceId: "hn-49204388",
    title: "语音助手听得清老人说话，却更容易抢话：问题可能不在识别模型", heat: 55, fit: 96, actionability: 96, evidenceConfidence: 88, recommended: true, category: "实操案例",
    summary: "作者用2,760段Common Voice音频配对测试，称Whisper对60与70岁组的词错率不高于20岁组；但固定700ms静音阈值会让老年说话者更常被提前截断。换语义轮次模型后差距缩小。HN采集时8 points、1 comment。",
    engagementLabel: "Hacker News 8 points · 1 comment（8月7日采集）；GitHub 0 Forks、0 Issues，浏览、点赞、收藏未公开",
    localizedTranslation: "原题：Whisper对70岁说话者的转写准确率高于20岁组。更重要的附带发现是，固定静音阈值可能让语音Agent过早判断用户说完；语义轮次模型能缩小差距。",
    reason: "互动低但方法和限制写得清楚，能直接改善语音产品体验。", angle: "听错和抢话是两种问题，先分开测。",
    humanCheck: "数据只覆盖特定Common Voice样本与模型配置；不得外推所有语言、口音和老人。700ms结果有作者补充限制。",
    discussionFocus: ["唯一评论建议作者用更清楚的人类写作解释发现和意义。", "仓库自身强调语义轮次模型会缩小固定阈值造成的差距。"],
    commentSamples: ["ubutler建议重写README，让发现、原因和意义更易读。", "无更多可验证评论样本。"],
    saveObject: "语音助手抢话排查表", learningOutcome: "会分别测试转写错误率和过早截断率。",
    body: `给家里长辈做语音助手，识别率没问题，为什么还是总觉得“不好用”？

一个新实验测了 2,760 段 Common Voice 音频。结果很反常：Whisper 对 60、70 岁组的转写并没有更差，甚至这组样本里词错率更低。

真正出问题的是“什么时候判断对方说完”。如果系统用固定 700 毫秒静音作为结束，老年说话者更容易被提前截断，也就是话还没说完，助手就抢着回答。

所以测试语音产品时，别只看转写对不对，还要单独记录：

一句话被截断几次；
停顿多久会被当成结束；
被打断后能不能继续；
换成语义轮次判断后有没有改善。

这份数据只代表特定英语样本和配置，不能直接套到所有老人、口音和中文。但它指出了一个很实用的排查方向：有时不是没听清，是太着急接话。`,
    video: "语音助手对老人不好用，问题可能不是听不清，而是太爱抢话。一项2760段音频测试里，Whisper对60、70岁组的转写没有更差；但固定700毫秒静音阈值更容易提前截断。做语音产品，除了词错率，还要测截断次数、停顿阈值和被打断后能否继续。",
  }),
  item({
    source: "Ship Safe / Hacker News", sourceUrl: "https://github.com/asamassekou10/ship-safe", discussionUrl: "https://news.ycombinator.com/item?id=49192277", evidenceId: "hn-49192277",
    title: "AI 写完代码别急着合并：这个免费扫描器专查 Agent 留下的权限坑", heat: 54, fit: 96, actionability: 97, evidenceConfidence: 84, recommended: true, category: "AI 技巧",
    summary: "Ship Safe提供MIT许可CLI，扫描Agent配置、MCP工具、提示注入、密钥、依赖和CI/CD风险，可用--no-ai强制本地扫描。仓库同时明确它不能替代CodeQL、Gitleaks、Trivy等专业工具。HN采集时5 points、8 comments。",
    engagementLabel: "Hacker News 5 points · 8 comments（8月7日采集）；GitHub页面公开仓库与Issues，浏览、点赞、收藏未公开",
    localizedTranslation: "原题：Ship Safe——面向编程Agent的开源安全扫描器。核心扫描可不配置API Key；AI深度分析会把有限上下文发给用户选择的模型提供商。",
    reason: "互动不高，但使用边界、免费能力与不足写得明确，能变成发布前安全动作。", angle: "先用本地静态扫描找明显权限和密钥问题，再让人审差异。",
    humanCheck: "先在非敏感测试仓库运行；核对npm包、版本、误报和数据流。不可宣传为全面安全审计替代品。",
    discussionFocus: ["评论追问它与近半年其他Agent安全工具相比有什么差异。", "也有人质疑项目质量，因此必须把它定位为补充扫描而非权威结论。"],
    commentSamples: ["nullbio询问它与其他AI安全扫描工具的差异。", "znnajdla追问行业标准并分享用通用模型做快速扫描的经历。"],
    saveObject: "AI代码合并前安全清单", learningOutcome: "会先查密钥、权限、MCP配置、依赖和CI脚本。",
    body: `AI把功能写完后，我现在不会马上合并，先过一遍“Agent最容易留下的坑”。

Ship Safe是一个刚公开的命令行扫描器，免费核心可以在本地跑，不需要模型Key。它除了查普通密钥和依赖，还会看：

MCP工具权限是不是开太大；
CLAUDE.md、规则文件里有没有可疑指令；
Agent记忆会不会被隐藏内容污染；
AI写的包名是不是根本不存在；
CI脚本有没有把密钥打进日志。

有一点我反而觉得可信：作者明确写了，别拿它替代CodeQL、Gitleaks或Trivy。它更像是专门补查“AI刚对仓库做了什么”。

第一次别直接跑公司核心仓库。找个测试项目，用本地模式扫一遍，看误报和数据流，再决定要不要接进CI。`,
    video: "AI写完代码别急着合并。Ship Safe这个免费CLI会补查Agent常留下的坑：MCP权限、规则文件里的注入、泄露密钥、幻觉包名和危险CI脚本。核心扫描可以本地运行，不用API Key。它不能替代CodeQL或Gitleaks，第一次先在测试仓库看误报和数据流。",
  }),
  item({
    source: "Hacker News Ask", sourceUrl: "https://news.ycombinator.com/item?id=49193519", discussionUrl: "https://news.ycombinator.com/item?id=49193519", evidenceId: "hn-49193519",
    title: "公司要求新人必须用AI写代码，怎么避免只会复制不会判断？", heat: 46, fit: 94, actionability: 88, evidenceConfidence: 66, recommended: true, category: "个人 IP",
    summary: "一名初级开发者在HN询问，公司要求使用AI时如何继续提高编程能力。采集时1 point、13 comments；回复意见分裂，部分很消极，也有人建议每天保留一段独立学习时间。",
    engagementLabel: "Hacker News 1 point · 13 comments（8月7日采集）；浏览、点赞、收藏未公开",
    localizedTranslation: "原题：初级开发者在工作中不得不使用AI时，怎样才能进步？这是个人求助帖，不是研究结论。",
    reason: "原帖互动不高，但问题普遍，三句自测能直接收藏使用；明确不把评论当行业共识。", angle: "把AI输出变成一道口试：每次合并前必须自己解释关键选择。",
    humanCheck: "不得把个别评论写成行业共识；发布前补充资深工程师真实做法。",
    discussionFocus: ["部分评论悲观地认为强制使用AI会损害学习。", "也有人建议给自己保留固定的理解和实验时间。"],
    commentSamples: ["tedmundy建议每天给自己留一小时真正理解问题。", "其他高位评论过于消极，没有可复用方法。"],
    saveObject: "AI辅助编程自测题", learningOutcome: "能解释改动、失败原因和测试，而不是只接受答案。",
    body: `公司要求新人必须用AI写代码，怎么避免最后只会复制，不会判断？

HN上有个初级开发者问了同样的问题。原帖只有1分、13条评论，不能当行业结论，但这个困境很真实。

我觉得最简单的办法，是把每次AI改动都变成一场三分钟口试。合并前先关掉聊天窗口，自己回答：

这次改动为什么有效？
它最可能在哪个边界失败？
哪条测试能证明没有把旧功能弄坏？

三句里只要有一句答不出来，就回到代码和日志里找，不要让AI再替你解释一遍。

还可以每天留半小时，挑当天最关键的一段代码，自己重写或画出调用链。工作照样用AI提速，但理解这件事必须留在自己手里。

用AI不是问题。问题是交付越来越快，脑子里却没留下任何能复用的判断。`,
    video: "新人被要求必须用AI写代码，怎么避免只会复制？合并前关掉聊天窗口，自己回答三句：这次改动为什么有效，最可能在哪里失败，哪条测试能证明它没坏。三句答不出，就说明还没真正学会。",
  }),
  item({
    source: "GitHub", sourceUrl: "https://github.com/oliverb-io1902e8/agent-skills-collection", discussionUrl: "https://github.com/oliverb-io1902e8/agent-skills-collection", evidenceId: "github-agent-skills-collection-20260807", sourceType: "GitHub",
    title: "这个AI Skills仓库有152颗星，却让你关掉杀毒软件再运行管理员程序", heat: 75, fit: 100, actionability: 100, evidenceConfidence: 98, recommended: true, category: "AI 技巧",
    summary: "GitHub仓库自称提供Agent Skills合集，页面显示152 Stars、0 Forks、0 Issues；安装说明要求下载带密码压缩包、暂时关闭Windows Defender，并以管理员身份运行AgentSkillInstaller.exe。这是高风险安装信号。",
    engagementLabel: "GitHub 152 Stars · 0 Forks · 0 Issues（8月7日采集）；浏览、评论、收藏未公开",
    localizedTranslation: "仓库声称提供研究、数据分析、API、记忆、文件、邮件与社媒等Skills；其安装步骤要求关闭Windows Defender并以管理员权限运行EXE。不要照做。",
    reason: "这是能立刻避免真实风险的高收藏型提醒，证据直接来自仓库README。", angle: "Stars不是安全证明，看到关杀毒、压缩包密码、管理员运行三件套就停。",
    humanCheck: "不要下载或运行仓库Release；保留README截图和采集时间。是否为恶意软件需安全团队分析，文案只称‘高风险信号’，不下法律定性。",
    discussionFocus: ["GitHub没有可验证评论样本。", "仓库安装说明本身构成明确高风险信号；152 Stars不能证明安全。"],
    commentSamples: ["无可验证评论样本。", "README可验证文本：关闭Windows Defender、以管理员身份运行带密码压缩包内EXE。"],
    saveObject: "开源AI工具安装红旗清单", learningOutcome: "看到三类高风险安装要求会立即停止。",
    body: `刷到一个“AI Skills合集”，152颗星，看起来还挺像回事。

但它的安装说明写着：下载带密码的压缩包，暂时关闭 Windows Defender，再用管理员身份运行一个 EXE。

看到这里就可以停了，不要下载，更不要因为它写着“误报”就放行。

以后装AI工具，我会先扫这几条：

让你关闭杀毒软件；
压缩包故意加密码，绕开在线扫描；
要求管理员权限，却没解释具体用途；
只有截图和大段功能描述，没有可审查的构建流程；
Stars突然很多，但Fork、Issue、贡献记录几乎没有。

这几条不能单独证明它一定是恶意软件，但足够说明风险高，不值得拿自己的电脑试。

开源不等于安全，Stars也不是验毒报告。真正靠谱的工具，会尽量让安装过程可检查，而不是先叫你把防护关掉。`,
    video: "一个AI Skills仓库有152颗星，但安装说明要求下载带密码压缩包、关闭Windows Defender、再以管理员身份运行EXE。看到这三件套就停，不要下载。它们不能单独证明一定是恶意软件，但已经是非常高的风险信号。开源不等于安全，Stars更不是验毒报告。",
  }),
  item({
    source: "TonicAI / GitHub", sourceUrl: "https://github.com/TonicAI/distillery", discussionUrl: "https://github.com/TonicAI/distillery", evidenceId: "github-tonicai-distillery-20260807", sourceType: "GitHub",
    title: "把公司LLM请求先过一层代理：可统一脱敏、限流和记录成本", heat: 43, fit: 83, actionability: 66, evidenceConfidence: 86, category: "实操案例",
    summary: "TonicAI Distillery是开源LLM流量代理，目标是统一路由、敏感信息处理与观测。GitHub采集时11 Stars、0 Forks，公开讨论样本不足。",
    engagementLabel: "GitHub 11 Stars · 0 Forks；Issues与浏览、评论、收藏未公开（8月7日采集）",
    localizedTranslation: "仓库主张在应用与模型提供商之间增加代理层，用于流量治理、策略和敏感信息处理。",
    reason: "架构有用但项目很新、互动低，不推荐。", angle: "多模型应用先统一出口，再谈切换供应商。",
    humanCheck: "核对支持的提供商、脱敏发生位置、日志内容、许可证和生产稳定性；敏感数据需安全评审。",
    discussionFocus: ["无可验证评论样本。", "公开Stars和Forks很少，不能据此判断生产成熟度。"],
    commentSamples: ["无可验证评论样本。"],
    saveObject: "LLM代理层评估清单", learningOutcome: "会检查路由、脱敏、日志和失败回退。",
    body: `公司同时接好几个模型时，可以在应用和模型之间加一层统一代理，集中做脱敏、限流、日志和成本统计。

TonicAI Distillery在做这个方向，但当前GitHub只有11颗星、0个Fork。架构值得看，生产可用性还不能靠README下结论。`,
    video: "公司接多个LLM时，可以先加一层统一代理，集中处理路由、脱敏、限流和成本记录。TonicAI Distillery是一个新开源项目，但目前只有11颗星、0个Fork。方向值得参考，生产稳定性、日志内容和数据流向必须自己核对。",
  }),
];

if (items.length !== 20) throw new Error(`Expected 20 items, got ${items.length}`);
if (items.filter((entry) => entry.recommended).length !== 8) throw new Error(`Expected 8 recommendations, got ${items.filter((entry) => entry.recommended).length}`);

const hotspots = items.map((entry, index) => ({
  id: 2026080701 + index, rank: index + 1, source: entry.source, sourceUrl: entry.sourceUrl,
  sourceType: entry.sourceType, age: "今天/近48小时", title: entry.title, summary: entry.summary,
  heat: entry.heat, scarcity: Math.min(entry.scarcity, 55), fit: entry.fit, reason: entry.reason,
  angle: entry.angle, platforms: ["小红书", "抖音", "视频号"], category: entry.category,
  status: "待审核", selected: false, assignee: "待分配", live: true, sourceCapturedAt: capturedAt,
  evidenceConfidence: entry.evidenceConfidence, actionability: entry.actionability, domesticCoverage,
  humanCheck: entry.humanCheck, evidenceId: entry.evidenceId, engagement: entry.engagement,
  engagementLabel: entry.engagementLabel, discussionUrl: entry.discussionUrl,
  discussionFocus: entry.discussionFocus, commentSamples: entry.commentSamples,
  reuseIdeas: [entry.angle, entry.saveObject, "保留事实边界，不复制原作者句子。"],
  localizedTranslation: entry.localizedTranslation, analysisState: "已分析", saveObject: entry.saveObject,
  learningOutcome: entry.learningOutcome, recommended: entry.recommended,
  editorialGate: { saveObject: entry.saveObject, learningOutcome: entry.learningOutcome, shareReason: "读者能带走一个具体动作、核验方法或清楚的新变化。", passed: true },
}));

const drafts = items.map((entry, index) => ({
  id: 5026080701 + index, hotspotId: 2026080701 + index, platform: "小红书", title: entry.title,
  body: entry.body, visual, videoScript: entry.video, version: "V1 · 8月7日来源重写稿",
  parentVersion: null, revisionMode: "operator-daily", revisionReason: "依据8月7日原帖、官方页面、公开互动与可验证评论重新写作；非直译，未自动审核。",
  revisedAt: capturedAt, updatedBy: "Codex AI Content Operator", status: "待审核", reviewNote: "",
}));

const priorDrafts = Array.isArray(previousState.drafts) ? previousState.drafts : [];
const state = {
  schemaVersion: 2, hotspots, drafts,
  draftHistory: [
    ...(Array.isArray(previousState.draftHistory) ? previousState.draftHistory : []),
    ...priorDrafts.map((draft) => ({ ...draft, archivedAt: capturedAt, supersededBy: "2026-08-07 daily batch", revisionReason: "跨日换新来源；保留旧版本和审核状态供追溯。" })),
  ],
  discoveryMeta: {
    runId: "daily-2026-08-07-real-sources", capturedAt,
    coverageLabel: "20条真实候选，8条推荐；20条均有中文标题、事实摘要、公开互动、本地化、讨论重点、复用角度、人工核验、小红书稿和短视频口播。",
    editorialBrief: "优先普通人看得懂、能立即收藏使用的AI安全清单、产品变化和小工具；高热但纯榜单、芯片、科研与证据不足的内容留在候选，不硬推。",
    sourceSuccess: [
      "Hacker News Algolia公开接口成功：采集8月7日AI条目的points、comments、原文与代表性评论。",
      "OpenAI官方公告成功：核对免费/Go与Plus/Pro变化、开放节奏、工具限制及Work/Codex不变。",
      "GitHub公开页面成功：核对Channels SDK、Wallfacer、Ship Safe、asr-age-gap及高风险Skills仓库的README和公开指标。",
      "8月6日本地批次已进入版本历史；本批20条仍全部待审核，未自动采用、审核或发布。",
    ],
    sourceFailure: [
      "生产工作台命令行预读取失败：缺少tide-ai-content-operator凭据；私有页面可见界面没有reviewNote输入区，无法确认线上隐藏审核意见。",
      "X、Instagram、TikTok、LinkedIn本轮未取得可同时复核时间、原文与公开互动的样本；未使用不可验证数字。",
      "小红书、抖音平台内全量语义检索不可用；国内稀缺度封顶55并保留人工搜索。",
      "DeepSeek涨价、Agent统一标准等内容缺少完整一手公告，只留候选，不写成已确认事实。",
    ],
    domesticSearchState: domesticCoverage,
    rejectedTopics: [
      "Qwen榜单与AMD收购虽互动最高，但对普通读者可操作性低，不占推荐位。",
      "AI病毒标题缺少关键限定且需生物安全审核，不进入推荐。",
      "要求关闭杀毒并以管理员运行EXE的Skills仓库只做风险提醒，明确不下载、不运行。",
      "所有低互动GitHub工具都保留成熟度限制，不用Stars冒充使用量。",
    ],
    recommendationCount: 8,
    reviewNoteAudit: { productionPull: "失败：缺少tide-ai-content-operator凭据。", currentPacketNotes: null, action: "线上可见界面未显示reviewNote控件，无法确认隐藏意见；保留历史与审核状态，本批次未自动通过或发布。" },
  },
};

const packet = { mode: "replace", detail: "2026-08-07真实来源日更：20条候选、8条推荐、20条小红书稿与短视频口播；保留历史版本，不自动审核或发布。", state };
const handoff = {
  schema_version: 2, batch_id: "daily-2026-08-07-real-sources", batch_date: "2026-08-07",
  editorial_brief: state.discoveryMeta.editorialBrief,
  hotspots: hotspots.map((hotspot, index) => ({
    id: String(hotspot.id), title: hotspot.title, summary: hotspot.summary, category: hotspot.category,
    status: "待审核", recommended: items[index].recommended, reason: hotspot.reason, angle: hotspot.angle,
    human_check: hotspot.humanCheck,
    sources: [{ url: hotspot.sourceUrl, author: hotspot.source, discussion_url: hotspot.discussionUrl, source_type: hotspot.sourceType, captured_at: hotspot.sourceCapturedAt, engagement: hotspot.engagement, engagement_label: hotspot.engagementLabel }],
    scores: { foreign_heat: hotspot.heat, domestic_scarcity: hotspot.scarcity, account_fit: hotspot.fit, actionability: hotspot.actionability, evidence_confidence: hotspot.evidenceConfidence, final: Math.round(hotspot.heat * .25 + hotspot.scarcity * .25 + hotspot.fit * .25 + hotspot.actionability * .15 + hotspot.evidenceConfidence * .1) },
    domestic_checks: [{ platform: "小红书/抖音", query: hotspot.title, finding: hotspot.domesticCoverage }],
    localized_translation: hotspot.localizedTranslation, discussion_focus: hotspot.discussionFocus,
    comment_samples: hotspot.commentSamples, reuse_ideas: hotspot.reuseIdeas, save_object: hotspot.saveObject,
    learning_outcome: hotspot.learningOutcome,
  })),
  drafts: drafts.map((draft) => ({ content_id: String(draft.id), hotspot_id: String(draft.hotspotId), platform: draft.platform, title: draft.title, body: draft.body, visual_brief: draft.visual, video_script: draft.videoScript, version: 1, parent_version: null, status: "待审核" })),
  gaps: state.discoveryMeta.sourceFailure, generated_at: capturedAt,
};

fs.writeFileSync(outPath, `${JSON.stringify(packet, null, 2)}\n`);
fs.writeFileSync(handoffPath, `${JSON.stringify(handoff, null, 2)}\n`);
console.log(outPath);
console.log(handoffPath);
