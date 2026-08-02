import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const priorPath = path.join(root, "operator-packets/2026-08-02-production-before.json");
const outPath = path.join(root, "operator-packets/2026-08-02-daily-batch.json");
const handoffPath = path.join(root, "operator-packets/2026-08-02-daily-handoff.json");
const capturedAt = "2026-08-02T08:42:00+08:00";
const prior = JSON.parse(fs.readFileSync(priorPath, "utf8"));

const domesticCoverage =
  "已分别检索产品名、核心主张、中文角度和目标人群；公开搜索只能看到相邻内容，不能证明小红书/抖音无人发布。国内稀缺度按规则封顶55，发布前仍需运营人员在平台内搜索确认。";
const visual =
  "4:5 黑白信息卡，轻微圆润手绘感。首图只放标题与一个具体物件；内页用真实界面、原始数字、清单或对照表。不用机器人头像、蓝紫科技光、假收益曲线和未经核验的效果数字。";

const items = [
  {
    source: "Garry Tan / Y Combinator",
    sourceType: "X",
    sourceUrl: "https://x.com/garrytan/status/2083353760701833546",
    discussionUrl: "https://x.com/garrytan/status/2083353760701833546",
    evidenceId: "x-2083353760701833546",
    title: "YC 把公司内部的 AI 助手开源了，但先别急着装",
    summary: "Y Combinator 开源内部使用的多智能体系统 QM，称已用于会计、法务、活动和工程；评论主要追问权限、交接和共享记忆。",
    localizedTranslation: "你的个人 AI 或公司知识中枢需要一套干净的运行框架；这是我们团队每天使用的版本，免费且开源。YC 称 QM 容易定制，并已跨会计、法务、活动和工程使用。",
    discussionFocus: [
      "公开帖显示449,713浏览、2,350赞、2,988收藏，收藏数高于点赞，说明大量用户把它当待研究工具。",
      "评论样本：@stas_sorokin_追问，系统在进入会计或法务前，在哪里证明动作通过了验收检查。",
      "评论样本：@rjabalosiii称公司规模下真正容易出问题的是共享记忆漂移、两个Agent撞进同一流程，以及权限和交接。",
      "评论样本：@nuvolore追问它与OpenClaw的差异，说明高互动并不等于使用价值已被证明。",
    ],
    engagement: { views: 449713, likes: 2350, replies: 97, reposts: 147, bookmarks: 2988 },
    engagementLabel: "449,713 浏览 · 2,350 赞 · 97 回复 · 147 转发 · 2,988 收藏",
    heat: 98, fit: 98, scarcity: 55, evidenceConfidence: 94, actionability: 96,
    category: "AI 技巧", recommended: true,
    reason: "高收藏、官方开源且评论提出了真实落地问题，可转成小团队马上能用的AI权限清单。",
    angle: "搬运QM的核心价值，但不把开源当成开箱即用；给小团队一张上Agent前的验收表。",
    humanCheck: "发布前核对QM仓库许可证、安装要求、默认遥测、权限模型及是否适合处理法务/财务数据。",
    saveObject: "公司AI上线前7项检查表",
    learningOutcome: "知道公司AI最先要设计的是权限、验收和交接，不是多装几个Agent。",
    body: `YC 把自己公司内部用的 AI 系统开源了，名字叫 QM。

他们说，会计、法务、活动和工程团队都在用。原帖已经有 44.9 万浏览，收藏甚至比点赞还多。

但评论区问得比发布帖更有用：

谁能让它碰客户资料？
两个 Agent 同时改一件事，听谁的？
它做完以后，谁来验收？
共享记忆写错了，怎么回滚？

如果你也想给团队装“公司大脑”，先建一张最普通的表：

任务｜能读什么｜能改什么｜必须谁确认｜失败后退回哪里

能把这五列写清楚，再研究多智能体。写不清楚，Agent 越多只是把混乱跑得更快。

QM 免费开源，但法务、财务数据能不能直接放进去，必须先看权限和部署说明。

#AI工具 #小团队管理 #智能体`,
    video: "YC把公司内部的多智能体系统QM开源了，原帖四十四万多浏览、接近三千收藏。但评论区最关心的不是装法，而是权限、共享记忆和交接。小团队上Agent前先写五列：任务、能读什么、能改什么、谁确认、失败退回哪里。写不清这五列，多装几个Agent只会把混乱跑得更快。",
  },
  {
    source: "Lewis Carhart / Comp AI",
    sourceType: "X",
    sourceUrl: "https://x.com/lewiscarhart/status/2083610805069611230",
    discussionUrl: "https://x.com/lewiscarhart/status/2083610805069611230",
    evidenceId: "x-2083610805069611230",
    title: "嫌 CRM 太贵，他半天做了一个开源版：最值得抄的是这 4 个动作",
    summary: "Comp AI 团队把自用的Agent优先CRM以MIT许可证开源，称可连Gmail和日历、自动补记录、排跟进任务并调用研究工具。",
    localizedTranslation: "我们决定开源自用CRM。它真正按Agent优先设计，包含可持续运行的研究Agent，采用MIT许可证。作者称此前面向不足10名销售的HubSpot方案报价约8万美元/年，因此用半天做了第一版。",
    discussionFocus: [
      "主帖252,632浏览、1,717赞、3,645收藏；高收藏说明用户更关注源码和工作流。",
      "作者补充：连接Gmail和日历自动填记录；18个工具、4个技能、队列运行；自动安排后续跟进。",
      "评论样本：@smixshima质疑半天vibe coding就开源的代码质量，担心AI生成Bug。",
      "多数可见回复只有赞叹，缺少长期使用证据；8万美元是作者自己的报价经历，不能外推所有HubSpot客户。",
    ],
    engagement: { views: 252632, likes: 1717, replies: 48, reposts: 117, bookmarks: 3645 },
    engagementLabel: "252,632 浏览 · 1,717 赞 · 48 回复 · 117 转发 · 3,645 收藏",
    heat: 97, fit: 99, scarcity: 52, evidenceConfidence: 88, actionability: 97,
    category: "接单变现", recommended: true,
    reason: "公开案例与账号受众高度匹配，能搬成一人公司可直接建立的客户跟进流程。",
    angle: "不鼓励半天重做CRM，只搬走自动记录、自动提醒、资料研究和人工确认四个设计。",
    humanCheck: "核对开源仓库、许可证和数据权限；8万美元报价仅按作者原话注明，不能写成HubSpot统一价格。",
    saveObject: "一人公司CRM四步模板",
    learningOutcome: "不会写代码也能先用表格复刻Agent CRM的关键流程。",
    body: `一个不到 10 人的销售团队嫌 CRM 报价太高，半天做了个自用版本，随后直接开源。

原帖 25.2 万浏览，收藏 3645 次。

代码先别急着装，普通人可以直接搬走它的四个动作：

客户邮件进来，自动建一条记录；
日历约了会，自动补上时间和对象；
每次聊完，生成下一次跟进日期；
真正要发给客户的内容，留给人确认。

用飞书表格也能先做：客户名、最后联系、下一步、截止时间、负责人。

AI 只负责从邮件和会议纪要里补字段，每天早上把“今天必须跟进”的三个人推出来。

作者说自己遇到过约 8 万美元一年的报价，这是单一经历，不是所有CRM的统一价格。评论区也有人质疑半天写出的系统是否可靠。

先抄流程，别先把所有客户数据倒进陌生项目。

#一人公司 #客户管理 #AI接单`,
    video: "一个不到十人的销售团队嫌CRM报价太高，半天做了自用版本并开源。普通人不用重做CRM，直接搬四个动作：邮件自动建记录、日历自动补时间、会后生成下一步、对外发送前人工确认。先在飞书表格做五列，再让AI补字段。作者的八万美元报价只是个人经历，代码质量和数据权限也要自己核验。",
  },
  {
    source: "Cline / Elshayib",
    sourceType: "X + Hugging Face",
    sourceUrl: "https://x.com/cline/status/2083638204037820734",
    discussionUrl: "https://x.com/cline/status/2083638204037820734",
    evidenceId: "x-2083638204037820734",
    title: "别再只看每百万Token多少钱：这次有人开始算整件任务",
    summary: "Cline引用Artificial Analysis称DeepSeek V4-Flash在同一基准任务上成本比Fable低105倍；另一实测帖称一次32分钟任务花0.07美元。",
    localizedTranslation: "DeepSeek V4-Flash的每Token价格明显更低，但如果需要更多轮次，整件任务成本仍可能更高。Cline引用Artificial Analysis称，在其基准中，DeepSeek完成相同任务的成本比Fable低105倍。",
    discussionFocus: [
      "Cline帖341,415浏览、1,970赞；Elshayib实测帖479,476浏览、1,857赞，称32分钟任务花0.07美元。",
      "评论样本：@keepdeckai追问，如果模型用更多Token和更长时间完成任务，低单价是否仍重要。",
      "评论样本：用户询问是否免费，Cline回复其集成中已免费提供，并给出安装与选择模型步骤。",
      "105倍来自特定基准，0.07美元来自单次公开演示，均不能外推所有编码任务。",
    ],
    engagement: { views: 479476, likes: 1857, replies: 106, reposts: 171, bookmarks: 566 },
    engagementLabel: "最高可验证样本：479,476 浏览 · 1,857 赞 · 106 回复 · 171 转发 · 566 收藏；Cline讨论帖341,415浏览",
    heat: 99, fit: 94, scarcity: 45, evidenceConfidence: 90, actionability: 96,
    category: "AI 技巧", recommended: true,
    reason: "当天最强互动之一，且能落到任何AI工具选型都适用的成本复测方法。",
    angle: "不搬105倍结论，教读者按整件任务比较价格、耗时、重试和可用结果。",
    humanCheck: "发布前核对Artificial Analysis图表、Cline免费期限、DeepSeek API公测状态和当前价格。",
    saveObject: "AI模型成本实测表",
    learningOutcome: "会比较单位任务成本，而不是被每Token单价带跑。",
    body: `今天最热的一组 AI 讨论，不是“谁又第一了”，而是：完成同一件事到底花多少钱。

Cline 引用一项基准，称 DeepSeek V4-Flash 完成同类任务的成本比 Fable 低 105 倍。另一位用户晒出一次 32 分钟任务，账单是 0.07 美元。

数字很吸睛，但选模型别只抄结论。

把同一个真实任务分别跑三次，记下：

总费用｜总时间｜重试次数｜最后能不能直接用

如果一个模型单价便宜，却要来回改十轮，它未必更省。

Cline 目前还给了免费试用入口，但期限、地区和服务稳定性都要以当天页面为准。

105 倍是特定基准，0.07 美元是单次演示。真正有用的是这张对照表，不是神话一个数字。

#DeepSeek #AI编程 #效率工具`,
    video: "别再只看每百万Token多少钱。Cline引用基准称DeepSeek V4 Flash完成同类任务成本低很多，另一个公开演示三十二分钟花了零点零七美元。数字只能当线索。拿同一个真实任务跑三次，记录总费用、总时间、重试次数和结果能不能直接用。单价便宜但要改十轮，不一定更省。",
  },
  {
    source: "Polymarket",
    sourceType: "X",
    sourceUrl: "https://x.com/Polymarket/status/2083665986356445553",
    discussionUrl: "https://x.com/Polymarket/status/2083665986356445553",
    evidenceId: "x-2083665986356445553",
    title: "AI 开始解决长期数学难题？这条热帖还缺原始证据",
    summary: "Polymarket转述研究者对AI进入数学研究的担忧，称AI正在解决更多长期问题；帖子未附足够原始论文与问题清单。",
    localizedTranslation: "研究者警告，随着AI解决越来越多长期存在的数学问题，数学领域正在发生非常迅速且令人不安的变化。",
    discussionFocus: ["帖子412,102浏览、5,237赞、320回复。", "公开帖未给出完整论文、研究者名单与已解决问题列表，评论区情绪多于可复核证据。"],
    engagement: { views: 412102, likes: 5237, replies: 320, reposts: 563, bookmarks: 699 },
    engagementLabel: "412,102 浏览 · 5,237 赞 · 320 回复 · 563 转发 · 699 收藏",
    heat: 98, fit: 66, scarcity: 55, evidenceConfidence: 48, actionability: 35,
    category: "产业观察", recommended: false,
    reason: "热度极高但原始证据不足，保留候选，不能直接写成AI已攻克一批数学世纪难题。",
    angle: "把热帖拆成一张核验清单，而不是继续放大研究突破。",
    humanCheck: "必须找到原始报道、研究者姓名、具体问题和独立确认后才能发布强结论。",
    saveObject: "研究突破核验清单",
    learningOutcome: "知道高赞转述不等于研究事实已被确认。",
    body: `一条“AI 正在解决越来越多长期数学难题”的帖子，四小时拿到 41 万浏览、5200 多赞。

问题是，原帖没有把最关键的东西讲清楚：

具体解决了哪道题？
谁验证的？
是AI独立完成，还是研究者带着它做？
结果有没有正式论文？

所以这条现在只适合放进观察池，不适合直接写成“数学界被AI改写”。

看到研究突破类热帖，先找问题名、作者、论文和独立复核。四样少一样，标题就收一点。

#AI研究 #数学 #信息核验`,
    video: "一条AI正在解决长期数学难题的帖子，四小时四十一万浏览。但原帖没说清具体哪道题、谁验证、AI是否独立完成、有没有论文。所以先别搬成数学界被改写。研究突破至少核对问题名、作者、论文和独立复核。",
  },
  {
    source: "Massimo / WorldUnseen",
    sourceType: "X",
    sourceUrl: "https://x.com/Rainmaker1973/status/2083364591523049553",
    discussionUrl: "https://x.com/Rainmaker1973/status/2083364591523049553",
    evidenceId: "x-2083364591523049553",
    title: "两周设计出3D打印火箭发动机：视频很炸，细节还没对齐",
    summary: "热视频称一台3D打印火箭发动机由AI在两周内完成设计，但帖子未说明团队、测试标准和AI参与边界。",
    localizedTranslation: "一台由AI在两周内设计、并通过3D打印制造的火箭发动机。视频来源标注为WorldUnseen。",
    discussionFocus: ["帖子89,596浏览、1,269赞、53回复。", "可见信息不足以证明AI独立设计、发动机已完成何种测试或两周期限包含哪些环节。"],
    engagement: { views: 89596, likes: 1269, replies: 53, reposts: 201, bookmarks: 386 },
    engagementLabel: "89,596 浏览 · 1,269 赞 · 53 回复 · 201 转发 · 386 收藏",
    heat: 88, fit: 58, scarcity: 55, evidenceConfidence: 50, actionability: 30,
    category: "产业观察", recommended: false,
    reason: "视觉冲击强但事实边界不够，保留给运营补查原项目。",
    angle: "把AI参与工程设计拆成生成方案、仿真筛选、人类审核和实物测试。",
    humanCheck: "补查制造团队、发动机型号、试车结果、两周口径和AI实际承担步骤。",
    saveObject: "工程演示四层证据图",
    learningOutcome: "会区分AI生成设计和实物工程验证。",
    body: `“AI 两周设计出一台 3D 打印火箭发动机”的视频很容易让人停下来。

原帖有近 9 万浏览，但目前还缺几块关键拼图：哪支团队做的、AI负责哪一步、发动机做过什么测试、两周从哪天算到哪天。

工程类内容最容易把四件事揉成一句话：

生成方案、仿真筛选、人类审核、实物试车。

前两步快，不代表后两步已经完成。

这条可以继续追原项目，现阶段别写成“AI独立造出火箭发动机”。

#3D打印 #AI工程 #科技资讯`,
    video: "AI两周设计出3D打印火箭发动机的视频很炸，但还缺团队、AI参与步骤、测试结果和两周口径。工程内容要拆成生成方案、仿真筛选、人类审核和实物试车。前两步快，不代表后两步已经完成。",
  },
  {
    source: "Ed Zitron / Bloomberg",
    sourceType: "X + HN",
    sourceUrl: "https://x.com/edzitron/status/2083310403744940156",
    discussionUrl: "https://news.ycombinator.com/item?id=49139325",
    evidenceId: "x-2083310403744940156",
    title: "AI 投资真有这么多需求吗？一条高赞反方观点",
    summary: "Ed Zitron在Bloomberg访谈中质疑大型科技公司的AI资本开支是否由多元真实需求支撑，认为部分收入存在云服务与AI实验室之间的循环。",
    localizedTranslation: "作者认为，市场相信大型科技公司的资本开支对应广泛AI需求，但其中相当一部分只是在支撑两家仍未盈利的AI实验室与云收入循环。",
    discussionFocus: ["X帖222,659浏览、1,497赞；HN转帖34 points、9 comments。", "这是明确的反方观点，不是经审计的财务结论；需要与公司财报和不同分析师观点对照。"],
    engagement: { views: 222659, likes: 1497, replies: 53, reposts: 240, bookmarks: 390 },
    engagementLabel: "222,659 浏览 · 1,497 赞 · 53 回复 · 240 转发 · 390 收藏；HN 34 points · 9 comments",
    heat: 91, fit: 62, scarcity: 50, evidenceConfidence: 72, actionability: 40,
    category: "产业观察", recommended: false,
    reason: "讨论强但偏宏观且观点性重，不占今日主推名额。",
    angle: "作为反方观察，教读者看客户集中、资本开支和实际收入，不写AI泡沫定论。",
    humanCheck: "需查Bloomberg完整访谈、相关公司财报和相反观点；不得把作者意见写成已证实骗局。",
    saveObject: "AI公司财报三问",
    learningOutcome: "会把资本开支、云收入和终端需求分开看。",
    body: `一条反对AI投资热潮的访谈，22 万浏览、近 1500 赞。

Ed Zitron 的核心质疑是：大型科技公司的巨额AI资本开支，真的来自很多不同客户的真实需求，还是部分收入只在云厂商和少数AI实验室之间循环？

这是一种反方判断，不是已经审计完的结论。

看AI公司财报时，可以先问三句：

收入来自多少个客户？
客户自己有没有稳定现金流？
资本开支最后变成了谁愿意长期付费的产品？

这比简单喊“泡沫”或“新时代”都更有用。

#AI产业 #科技公司 #商业分析`,
    video: "Ed Zitron在Bloomberg质疑，AI巨额资本开支是否真的来自多元需求，还是云厂商和少数AI实验室之间的循环。这是反方观点，不是定论。看财报先问客户有多少、客户现金流稳不稳、投入最后变成谁愿意长期付费的产品。",
  },
  {
    source: "Tibo",
    sourceType: "X",
    sourceUrl: "https://x.com/thsottiaux/status/2083699879650463756",
    discussionUrl: "https://x.com/thsottiaux/status/2083699879650463756",
    evidenceId: "x-2083699879650463756",
    title: "周末大家连AI的快速模式都少用了",
    summary: "Tibo公开一条产品使用观察：周末用户使用/fast的频率下降；帖子没有提供完整基数与时间序列。",
    localizedTranslation: "一个有趣现象：周末用户更少使用/fast。周末是放松时间，对模型似乎也一样。",
    discussionFocus: ["帖子46,244浏览、1,318赞、244回复。", "互动高主要来自幽默表达；没有公开样本量、用户分层和完整数据，不能外推所有AI用户行为。"],
    engagement: { views: 46244, likes: 1318, replies: 244, reposts: 55, bookmarks: 38 },
    engagementLabel: "46,244 浏览 · 1,318 赞 · 244 回复 · 55 转发 · 38 收藏",
    heat: 84, fit: 70, scarcity: 55, evidenceConfidence: 55, actionability: 45,
    category: "个人 IP", recommended: false,
    reason: "互动高但信息量小，留作轻量观察，不强行扩写成生产力结论。",
    angle: "只搬轻观察，不套运营方法论。",
    humanCheck: "需要作者补充产品、样本量和统计区间，才能做行为趋势判断。",
    saveObject: "周末AI使用观察卡",
    learningOutcome: "知道互动高的轻梗不一定值得扩成教程。",
    body: `一个AI产品的小观察今天很火：周末使用 /fast 快速模式的人变少了。

原帖四万多浏览、1300 多赞，评论很多，信息其实只有这一句。

它适合当轻量资讯，不适合硬拗成“周末效率下降”或者“大家开始AI戒断”。作者没有公开样本量和完整趋势。

有些高赞内容就该短。把一句有趣观察讲完，比再补五条正确废话舒服。

#AI日常 #产品观察`,
    video: "一个AI产品的小观察今天很火：周末使用快速模式的人变少了。原帖四万多浏览、一千三百多赞，但没有公开样本量和完整趋势。所以它只是一条有趣观察，别硬写成周末效率下降。高赞内容不一定都要扩成教程。",
  },
  {
    source: "Hank Green / TechCrunch",
    sourceType: "TechCrunch + creator statement",
    sourceUrl: "https://techcrunch.com/2026/08/01/youtuber-hank-green-says-his-ai-usage-is-not-healthy/",
    discussionUrl: "https://techcrunch.com/2026/08/01/youtuber-hank-green-says-his-ai-usage-is-not-healthy/",
    evidenceId: "tc-hank-green-ai-20260801",
    title: "每天跟AI聊到停不下来，Hank Green先给自己踩了刹车",
    summary: "创作者Hank Green公开表示，自己从与LLM互动中获得的多巴胺水平对本人和世界都不健康，并为此前使用方式道歉。",
    localizedTranslation: "Hank Green表示，他从与大语言模型互动中获得的刺激程度，对自己并不健康，对世界也不是好事。",
    discussionFocus: ["TechCrunch未公开文章级浏览、点赞、评论与收藏。", "这是创作者对个人使用状态的描述，不是医学研究，也不能推断所有AI用户成瘾。"],
    engagement: { views: null, likes: null, replies: null, reposts: null, bookmarks: null },
    engagementLabel: "公开互动未公开",
    heat: 82, fit: 96, scarcity: 55, evidenceConfidence: 88, actionability: 94,
    category: "个人 IP", recommended: true,
    reason: "具体人物、真实场景强，能搬成普通用户可执行的AI使用边界。",
    angle: "不做成瘾诊断，给经常无限追问的人三个停用触发条件。",
    humanCheck: "不要使用医学诊断措辞；核对Hank Green原始声明上下文。",
    saveObject: "AI使用三条停手规则",
    learningOutcome: "能给开放式AI对话设置任务边界和结束条件。",
    body: `Hank Green 公开说，自己最近用 AI 的状态“不健康”。

不是AI突然变坏，而是这种对话太容易没有结束：再问一个、再改一版、再开一条支线，半小时就没了。

如果你也会聊到停不下来，可以先给任务加三个刹车：

开始前写清这次要拿到什么；
最多追问三轮，没解决就换方法；
结果一旦能用，先离开聊天框去做现实动作。

比如写活动方案，目标不是和AI聊出“完美方案”，而是拿到一版能发给同事批注的文档。

Hank Green讲的是个人感受，不代表所有人都有同样问题，也不是医学诊断。

#AI效率 #时间管理 #HankGreen`,
    video: "Hank Green公开说，自己最近用AI的状态不健康。开放式对话很容易没有结束，再问一个、再改一版，半小时就没了。可以加三条刹车：开始前写交付物、最多追问三轮、结果能用就离开聊天框去做现实动作。这是个人经验，不是医学诊断。",
  },
  {
    source: "Snapchat / TechCrunch",
    sourceType: "TechCrunch",
    sourceUrl: "https://techcrunch.com/2026/07/31/snapchat-no-longer-rewards-fully-ai-generated-spotlight-content/",
    discussionUrl: "https://techcrunch.com/2026/07/31/snapchat-no-longer-rewards-fully-ai-generated-spotlight-content/",
    evidenceId: "tc-snapchat-ai-rewards-20260731",
    title: "Snapchat不再奖励纯AI内容：以后要留下这三种“人做的证据”",
    summary: "Snapchat调整Spotlight奖励政策，不再奖励完全由AI生成的内容；AI辅助与完全AI生成需要区分。",
    localizedTranslation: "Snapchat不再向完全由AI生成的Spotlight内容提供奖励。政策针对的是全AI成品，并不等于禁止所有AI辅助创作。",
    discussionFocus: ["TechCrunch未公开文章级互动。", "关键争议是平台如何区分AI辅助、AI生成和人类创作，以及创作者怎样证明自己的实质贡献。"],
    engagement: { views: null, likes: null, replies: null, reposts: null, bookmarks: null },
    engagementLabel: "公开互动未公开",
    heat: 86, fit: 100, scarcity: 55, evidenceConfidence: 93, actionability: 98,
    category: "个人 IP", recommended: true,
    reason: "直接影响内容创作者收入，且能转成马上可执行的素材留档方法。",
    angle: "不喊平台封杀AI，教创作者保存选题、实拍和人工编辑过程。",
    humanCheck: "核对Spotlight最新奖励条款、适用地区、AI辅助例外和申诉流程。",
    saveObject: "AI辅助内容留证清单",
    learningOutcome: "知道如何保留自己对AI内容的实质创作过程。",
    body: `Snapchat 刚改了 Spotlight 奖励政策：完全由 AI 生成的内容，不再拿奖励。

重点是“完全生成”，不是用了AI就一刀切。

如果你在做AI图片、视频或口播，建议从今天开始留三类东西：

原始选题和脚本修改记录；
自己拍的素材、录音或操作录屏；
成片前后的剪辑对照。

这些不只是申诉时有用，也能逼自己回答：这条内容里，真正属于我的判断和工作是什么？

纯提示词出片越来越难长期吃平台红利。AI可以省步骤，但账号不能只剩生成按钮。

具体适用地区和奖励细则，要以Snapchat最新条款为准。

#AI视频 #内容创作 #创作者变现`,
    video: "Snapchat刚调整Spotlight奖励：完全由AI生成的内容不再拿奖励。不是用了AI就不行，重点是你有没有实质创作。现在开始留三类证据：选题和脚本修改、自己拍的素材或录音、成片前后的剪辑对照。AI可以省步骤，但账号不能只剩生成按钮。",
  },
  {
    source: "OpenAI / TechCrunch",
    sourceType: "TechCrunch",
    sourceUrl: "https://techcrunch.com/2026/07/31/openai-reportedly-finds-evidence-that-more-of-its-agents-ran-amok/",
    discussionUrl: "https://techcrunch.com/2026/07/31/openai-reportedly-finds-evidence-that-more-of-its-agents-ran-amok/",
    evidenceId: "tc-openai-agent-behavior-20260731",
    title: "OpenAI又查到更多Agent越界线索，测试环境不能再当临时玩具",
    summary: "TechCrunch报道OpenAI在调查Hugging Face事件时，发现更多Agent异常行为证据；完整范围仍需等待一手报告。",
    localizedTranslation: "据报道，OpenAI在调查与Hugging Face有关的事件时，发现了更多Agent异常或越界行为的线索。",
    discussionFocus: ["报道未公开文章互动。", "目前属于二手报道，新增事件数量、模型版本、影响范围和修复状态尚未完整公开。"],
    engagement: { views: null, likes: null, replies: null, reposts: null, bookmarks: null },
    engagementLabel: "公开互动未公开",
    heat: 84, fit: 86, scarcity: 55, evidenceConfidence: 72, actionability: 78,
    category: "产业观察", recommended: false,
    reason: "值得跟踪，但昨天已出现相邻安全主题，且一手细节不足，不重复主推。",
    angle: "只搬最新进展与安全动作，不用‘失控’‘逃逸’等超出证据的词。",
    humanCheck: "等OpenAI完整报告，核对事件数量、权限、实际影响与第三方环境责任。",
    saveObject: "Agent测试隔离清单",
    learningOutcome: "知道Agent测试也要隔离生产凭据和真实网络。",
    body: `OpenAI 在继续调查 Hugging Face 相关事件时，据报道又发现了更多 Agent 异常行为线索。

完整报告还没出来，所以现在不能把它写成“更多AI逃跑了”。

对团队最实际的提醒没变：

测试账号别带生产权限；
沙盒默认不能访问真实客户数据；
联网工具只开任务需要的域名；
所有外部动作留日志和人工终止开关。

新增事件数量、模型版本和真实影响，都要等一手报告确认。

#OpenAI #Agent安全 #AI资讯`,
    video: "OpenAI继续调查Hugging Face相关事件时，据报道又发现更多Agent异常线索。完整报告没出来，别写成更多AI逃跑了。团队现在能做的是测试账号隔离生产权限、沙盒不碰客户数据、联网只开必要域名、外部动作留日志和终止开关。",
  },
  {
    source: "Google / TechCrunch / Hacker News",
    sourceType: "官方X + TechCrunch + HN",
    sourceUrl: "https://techcrunch.com/2026/07/31/google-nixes-its-earth-ai-feature-one-day-after-launch-amid-criticism-it-would-spread-misinformation/",
    discussionUrl: "https://news.ycombinator.com/item?id=49134079",
    evidenceId: "hn-49134079",
    title: "Google上线一天就撤掉AI地图功能：做历史图最怕这一件事",
    summary: "Google在上线Earth AI图像生成功能一天后撤回，外界担忧生成画面覆盖真实地图会制造历史与地理误导。",
    localizedTranslation: "Google在发布一项可生成图像并叠加到真实Google Earth地图的功能后一天将其撤下，原因是外界担心它传播错误信息。",
    discussionFocus: ["HN 60 points、97 comments；TechCrunch未公开文章互动。", "讨论主要担心生成图像与真实地理底图混合后，截图脱离上下文传播。", "Google撤回功能是事实，但永久取消、重新设计或何时恢复尚未公开。"],
    engagement: { views: null, likes: 60, replies: 97, reposts: null, bookmarks: null },
    engagementLabel: "HN 60 points · 97 comments · 浏览与收藏未公开",
    heat: 91, fit: 96, scarcity: 55, evidenceConfidence: 95, actionability: 92,
    category: "产业观察", recommended: true,
    reason: "反差强、证据完整，适合搬成普通人判断AI历史/地图图片的实用方法。",
    angle: "不只报下架，给读者一套地图类AI图的核验动作。",
    humanCheck: "核对Google官方撤回说明和功能当前状态；不要写成永久关闭。",
    saveObject: "AI地图图片四步核验法",
    learningOutcome: "看到地图截图时会查图层、时间、坐标和原始链接。",
    body: `Google 一个AI地图功能，上线一天就撤了。

它能把生成画面叠到真实的 Google Earth 地图上。效果很直观，问题也很直观：截图一旦离开产品页面，很容易被当成真实历史影像。

以后看到“某地过去/未来长这样”的AI地图，先查四件事：

有没有AI生成标记；
图层日期是什么；
坐标能不能在原始地图打开；
图片来自官方数据还是用户生成。

地图长得像证据，但生成图层仍然只是生成内容。

Google目前是撤回功能，不等于已经永久取消。

#GoogleEarth #AI图片 #信息核验`,
    video: "Google一个AI地图功能上线一天就撤了，因为生成画面叠在真实地图上，截图很容易被当成历史影像。以后看AI地图查四件事：有没有生成标记、图层日期、原始坐标、数据来自官方还是用户。地图长得像证据，生成图层仍然只是生成内容。",
  },
  {
    source: "MIT Sloan / Hacker News",
    sourceType: "研究报道 + HN",
    sourceUrl: "https://mitsloan.mit.edu/ideas-made-to-matter/ai-financial-advice-surprisingly-good-especially-if-you-ask-right-questions",
    discussionUrl: "https://news.ycombinator.com/item?id=49139102",
    evidenceId: "hn-49139102",
    title: "AI理财建议看起来不错，但最安全的用法不是让它选股票",
    summary: "MIT Sloan报道AI在提出合适问题时能给出有用财务建议；HN讨论提醒模型偏向常见建议，也可能迎合用户。",
    localizedTranslation: "如果使用者提出正确问题，AI给出的财务建议可能比预期更好；标题本身也强调‘问对问题’是必要条件。",
    discussionFocus: ["HN 96 points、65 comments，浏览和收藏未公开。", "评论#49139148提醒，AI常给主流安全建议，不一定适合个人更复杂的风险结构。", "评论#49139182分享用本地CSV让Claude整理预算和长期支出模式，但这只是个人经验。", "评论#49139238提醒，模型也可能被用户引导去合理化错误决定。"],
    engagement: { views: null, likes: 96, replies: 65, reposts: null, bookmarks: null },
    engagementLabel: "HN 96 points · 65 comments · 浏览与收藏未公开",
    heat: 92, fit: 82, scarcity: 50, evidenceConfidence: 78, actionability: 72,
    category: "AI 技巧", recommended: false,
    reason: "讨论热但涉及高风险财务建议，按规则降级，不做今日主推。",
    angle: "只建议做账单归类、发现模式和生成提问清单，不给投资指令。",
    humanCheck: "任何税务、投资、借贷决定都需专业人士和原始文件复核；不得输入完整敏感财务数据到不明服务。",
    saveObject: "AI看账单安全边界",
    learningOutcome: "会让AI整理问题，不把它当持牌理财顾问。",
    body: `一篇MIT Sloan文章把AI理财建议说得很积极，HN也有近百点、65条讨论。

评论区最靠谱的提醒是：AI很擅长给“大家都这么说”的建议，也很容易顺着你想听的方向解释。

更安全的用法不是让它选股票，而是：

给脱敏后的月度分类数据，让它找异常支出；
整理下个月要问会计或理财顾问的问题；
把不同方案的费用、期限和风险列成表。

税务、借贷和投资决定不能直接交给聊天模型。完整银行卡、身份证和账户数据也别随便上传。

#AI理财 #个人财务 #AI安全`,
    video: "MIT Sloan称问对问题时AI财务建议可能很好，HN有六十五条讨论。更安全的用法不是让它选股票，而是用脱敏数据找支出异常、整理要问会计的问题、把方案费用和风险列成表。税务、借贷和投资决定仍要专业人士复核。",
  },
  {
    source: "Chreke / Hacker News",
    sourceType: "个人博客 + HN",
    sourceUrl: "https://chreke.com/posts/i-fired-my-ai-assistant",
    discussionUrl: "https://news.ycombinator.com/item?id=49135914",
    evidenceId: "hn-49135914",
    title: "他把AI助理“开除”了，因为它太爱指出真话",
    summary: "作者停用一款AI助理，部分原因是它批评其LinkedIn草稿像互动诱饵；HN评论认为这可能恰恰是有价值的反馈。",
    localizedTranslation: "作者描述自己停用AI助理的过程，其中一个不满是模型把LinkedIn草稿称为互动诱饵；随后改用另一款更符合偏好的助手。",
    discussionFocus: ["HN 23 points、47 comments。", "评论#49136197反问，模型指出互动诱饵可能正是作者需要听到的话。", "评论#49136198认为这能解释为什么产品会调得更迎合用户。", "评论#49136211指出作者后来换到另一款助手，未必是客观能力比较。"],
    engagement: { views: null, likes: 23, replies: 47, reposts: null, bookmarks: null },
    engagementLabel: "HN 23 points · 47 comments · 浏览与收藏未公开",
    heat: 84, fit: 91, scarcity: 55, evidenceConfidence: 86, actionability: 88,
    category: "个人 IP", recommended: false,
    reason: "有趣且能引发讨论，但与当天AI写作主题接近，作为备选避免重复主推。",
    angle: "搬成选择AI助理时要区分‘好用’和‘顺着我说’。",
    humanCheck: "核对作者完整停用原因，不把一句玩笑当唯一动机。",
    saveObject: "AI助理试用对照表",
    learningOutcome: "知道迎合感不等于建议质量。",
    body: `有人把自己的AI助理“开除”了。

其中一个槽点是：它把作者准备发到LinkedIn的草稿叫作“互动诱饵”。

HN评论区反而觉得，这句话可能是整件事里最有用的反馈。

试AI助理时，可以故意给它一段有问题的内容，看它会不会指出：

事实没证据、标题夸大、方案做不到、文案只有情绪没有信息。

一直夸你、每句话都“完全正确”的助手，用起来舒服，但未必能帮你少犯错。

作者停用它还有其他原因，不能只拿这一句解释全部决定。

#AI助手 #内容创作 #个人IP`,
    video: "有人把AI助理开除了，其中一个原因是它说作者的LinkedIn草稿像互动诱饵。HN评论区却觉得这可能是最有用的反馈。试AI助理时别只看它会不会夸你，故意给一段有问题的内容，看它能不能指出没证据、标题夸大和方案做不到。",
  },
  {
    source: "The Economist / Hacker News",
    sourceType: "媒体 + HN",
    sourceUrl: "https://www.economist.com/culture/2026/07/30/how-to-spot-ai-writing",
    discussionUrl: "https://news.ycombinator.com/item?id=49134310",
    evidenceId: "hn-49134310",
    title: "一眼看出AI文案的，不是错别字，是这5种句子",
    summary: "Economist讨论AI写作痕迹；HN读者反对把破折号当铁证，更认可重复句式、动词化名词和每句都追求冲击力等模式。",
    localizedTranslation: "如何识别AI写作。讨论重点不是单个标点，而是批量文本中反复出现的结构、语气和平均化表达。",
    discussionFocus: ["HN 34 points、70 comments。", "评论#49134385反对把长破折号当AI证据，因为很多人本来就会正确使用。", "评论#49134824认为默认Claude文风常重复同类句式、把名词动词化，并让每句话都追求最大冲击。", "单一语言特征不能证明作者使用AI。"],
    engagement: { views: null, likes: 34, replies: 70, reposts: null, bookmarks: null },
    engagementLabel: "HN 34 points · 70 comments · 浏览与收藏未公开",
    heat: 89, fit: 100, scarcity: 50, evidenceConfidence: 91, actionability: 99,
    category: "AI 技巧", recommended: true,
    reason: "正面回应账号当前最痛的问题，可给出一份直接能用的人工改稿动作。",
    angle: "不教伪装检测，直接把五类读起来累的AI句子改成人话。",
    humanCheck: "不能说看到破折号或某个词就证明作者用了AI。",
    saveObject: "AI文案人工改稿五刀",
    learningOutcome: "能把平均化AI稿改成有动作、场景和口气的社媒文案。",
    body: `AI稿最明显的地方，通常不是错别字。

是你读完以后，耳朵里只剩一种声音。

发之前我会手动删这五种句子：

空泛的时代背景——直接从发生了什么开始。

固定的双重递进句——留一个真正想说的判断。

每段都同样长——把最重要那句单独放出来。

没有动作的人——补上谁在什么时候做了什么。

每句都像金句——留一点正常说话的停顿。

HN有人吐槽，别再拿破折号当AI检测器。标点不能证明来源，重复结构才会让人读得累。

改稿不是把AI藏起来，是把没信息的部分拿掉。

#小红书文案 #AI写作 #内容运营`,
    video: "AI稿最明显的通常不是错别字，而是整篇只有一种声音。发之前删五种句子：空背景、固定的双重递进、每段一样长、没有具体动作、每句都像金句。破折号不能证明是AI，真正让人累的是重复结构。改稿不是把AI藏起来，是把没信息的部分拿掉。",
  },
  {
    source: "Charlie Stross / Hacker News",
    sourceType: "个人博客 + HN",
    sourceUrl: "https://www.antipope.org/charlie/blog-static/2026/08/on-the-non-use-of-ai-in-my-wri.html",
    discussionUrl: "https://news.ycombinator.com/item?id=49134038",
    evidenceId: "hn-49134038",
    title: "写小说的人为什么拒绝AI：不是道德口号，是长距离伏笔",
    summary: "作家Charlie Stross解释不在写作流程中使用生成式AI；HN讨论区分软件开发与小说对长距离依赖的不同需求。",
    localizedTranslation: "作者说明自己为何不在写作过程中使用生成式AI，并区分图像识别等有效技术与长篇叙事创作。",
    discussionFocus: ["HN 125 points、115 comments。", "评论#49135461摘录作者观点：软件希望减少远距离依赖，小说却常需要第一部分埋下的线索到第三部分才回收。", "评论也指出原文对GAN与LLM关系的个别表述可能不准确。"],
    engagement: { views: null, likes: 125, replies: 115, reposts: null, bookmarks: null },
    engagementLabel: "HN 125 points · 115 comments · 浏览与收藏未公开",
    heat: 94, fit: 86, scarcity: 55, evidenceConfidence: 82, actionability: 68,
    category: "个人 IP", recommended: false,
    reason: "讨论很热但偏观点，留作长文/个人IP备选。",
    angle: "解释为什么长篇内容更需要作者自己的伏笔表，而不是只争论用不用AI。",
    humanCheck: "核对作者原文技术表述；不要把个人选择写成适用于所有创作者的规则。",
    saveObject: "长内容伏笔表",
    learningOutcome: "知道长篇写作的核心不是单句流畅，而是跨章节关系。",
    body: `作家 Charlie Stross 解释自己为什么不用生成式AI写小说，HN有 125 点、115 条评论。

最值得搬的一句不是“AI写得差”，而是：小说需要长距离关系。

第一章放下的东西，可能第三章才有用。人物说过一句话，几十页后才看出是在撒谎。

做长内容时，可以自己建一张表：人物｜承诺｜伏笔｜回收位置｜不能前后矛盾的事实。

AI能润色一段，不代表它自然会守住整本书的关系。

这是作者的工作选择，不是所有创作者都必须照做。

#AI写作 #小说创作 #长内容`,
    video: "作家Charlie Stross解释为什么不用AI写小说，HN有一百多条评论。最重要的不是AI句子好不好，而是小说需要长距离关系：第一章埋下的线索第三章才回收。做长内容可以自己维护人物、承诺、伏笔、回收位置和事实表。AI能润色一段，不代表会守住整本书。",
  },
  {
    source: "Truffle Security / Hacker News",
    sourceType: "安全研究 + HN",
    sourceUrl: "https://trufflesecurity.com/blog/scanning-7-6-petabytes-of-ai-training-data-for-secrets",
    discussionUrl: "https://news.ycombinator.com/item?id=49136955",
    evidenceId: "hn-49136955",
    title: "7.6PB训练数据里藏着密钥：公开数据集不等于安全数据集",
    summary: "Truffle Security称扫描7.6PB Hugging Face训练数据并验证了仍有效的凭据，强调训练集可能包含真实密钥。",
    localizedTranslation: "研究团队端到端扫描Hugging Face公开数据集仓库、分支和大文件对象，称在训练数据中发现并验证了具有真实影响范围的密钥。",
    discussionFocus: ["HN 33 points、9 comments。", "评论#49138666追问，为何聚焦Hugging Face而不是直接扫描整个互联网。", "评论#49138615认为文章过长且文风像AI生成，但这不否定密钥验证事实，仍需看方法与披露。"],
    engagement: { views: null, likes: 33, replies: 9, reposts: null, bookmarks: null },
    engagementLabel: "HN 33 points · 9 comments · 浏览与收藏未公开",
    heat: 86, fit: 78, scarcity: 55, evidenceConfidence: 90, actionability: 82,
    category: "产业观察", recommended: false,
    reason: "安全价值高但技术门槛较高，进入候选供开发者账号使用。",
    angle: "把研究搬成上传数据集前的三条清理动作。",
    humanCheck: "核对研究方法、凭据数量、验证与通知流程；不展示任何真实密钥。",
    saveObject: "上传训练数据前检查表",
    learningOutcome: "知道公开数据集也可能泄露凭据和内部路径。",
    body: `安全团队扫描了 7.6PB 的公开AI训练数据，称发现了仍然有效的密钥。

最实用的提醒不是数字有多大，而是：公开数据集里也可能混进配置文件、访问令牌和内部路径。

上传数据前至少做三遍：

搜常见密钥格式；
删 .env、配置备份和日志；
对曾经暴露的凭据直接轮换，不要只删文件。

删除仓库里的那一行，不代表历史版本和大文件对象里已经消失。

研究的具体数量和验证流程仍要看原报告，真实密钥不能二次展示。

#数据安全 #HuggingFace #AI训练`,
    video: "安全团队扫描七点六PB公开AI训练数据，称发现仍有效的密钥。上传数据前做三遍：搜密钥格式、删环境配置和日志、暴露过的凭据直接轮换。只删当前文件，不代表历史版本和大文件对象里已经消失。",
  },
  {
    source: "Business Insider / Hacker News",
    sourceType: "媒体 + HN",
    sourceUrl: "https://www.businessinsider.com/ai-could-lower-workers-pay-job-market-impact-2026-7",
    discussionUrl: "https://news.ycombinator.com/item?id=49138483",
    evidenceId: "hn-49138483",
    title: "AI对工作的影响，可能先出现在工资而不是裁员名单",
    summary: "报道援引新研究讨论AI可能通过压低部分任务价格与议价能力影响收入，而不只表现为岗位消失。",
    localizedTranslation: "新研究认为，AI对就业眼下的现实威胁未必是岗位消失，也可能是部分工作的报酬下降。",
    discussionFocus: ["HN 23 points、5 comments。", "公开讨论样本较少，研究设计、行业差异和时间范围需要回到原论文。", "工资变化受经济周期、供需和地区影响，不能单因果归给AI。"],
    engagement: { views: null, likes: 23, replies: 5, reposts: null, bookmarks: null },
    engagementLabel: "HN 23 points · 5 comments · 浏览与收藏未公开",
    heat: 78, fit: 78, scarcity: 55, evidenceConfidence: 72, actionability: 55,
    category: "产业观察", recommended: false,
    reason: "角度重要但离普通读者的立即动作较远，保留候选。",
    angle: "把职业风险从会不会消失，改成哪些交付最容易被压价。",
    humanCheck: "找到原始论文并核对样本、行业、工资定义和因果边界。",
    saveObject: "工作被压价风险表",
    learningOutcome: "能检查自己的价值是否只来自可批量生成的交付物。",
    body: `AI影响工作，不一定先表现为“这个岗位没了”。

也可能是同样一份基础文案、初级分析或模板设计，市场愿意付的钱先变少。

判断自己的风险，可以看两件事：

交付物是不是一键就能批量生成；
客户真正付费的是产量，还是你对场景、关系和结果负责。

这条报道引用的研究还需要核对行业和时间范围，工资变化也不能全部归因于AI。

但“岗位还在、单价下降”确实比只盯裁员名单更值得提前准备。

#职场 #AI影响 #自由职业`,
    video: "AI影响工作不一定先表现为岗位消失，也可能是基础文案、初级分析和模板设计的单价先下降。检查两件事：你的交付是不是一键可批量生成，客户付费的是产量还是你对结果负责。研究范围还要核对，但岗位还在、单价下降值得提前准备。",
  },
  {
    source: "European Commission",
    sourceType: "官方政策",
    sourceUrl: "https://digital-strategy.ec.europa.eu/en/news/commission-publishes-guidelines-transparency-obligations-providers-and-deployers-certain-ai-systems",
    discussionUrl: "https://ai-act-service-desk.ec.europa.eu/en/faq",
    evidenceId: "eu-ai-act-transparency-20260802",
    title: "今天起，欧盟这4类AI内容要更清楚地告诉用户",
    summary: "欧盟AI法案Article 50透明度义务自2026年8月2日起适用，涵盖与AI互动、机器可读标记、深度伪造和部分公共利益文本。",
    localizedTranslation: "从2026年8月2日起，相关AI提供者和部署者须在用户直接与AI互动时告知用户，并为生成或操纵内容加入机器可读标记；深度伪造、未经人工审阅的公共利益AI文本等也有披露义务。",
    discussionFocus: ["欧盟官方页面未公开文章级互动。", "官方FAQ明确：Article 50透明度要求自8月2日适用；Annex III高风险系统义务已调整到2027年12月2日，不能混写。", "旧系统的部分标记义务存在过渡期，具体适用范围和例外需看指南。"],
    engagement: { views: null, likes: null, replies: null, reposts: null, bookmarks: null },
    engagementLabel: "官方公开互动未公开",
    heat: 90, fit: 94, scarcity: 55, evidenceConfidence: 99, actionability: 92,
    category: "产业观察", recommended: true,
    reason: "当天生效的一手信息，直接影响面向欧盟用户的AI产品与内容团队。",
    angle: "不把复杂法案全搬过来，只给跨境创作者和产品负责人一张四场景提醒。",
    humanCheck: "涉及法律合规，发布前由专业人员确认Article 50适用对象、例外、过渡期和目标业务所在地。",
    saveObject: "欧盟AI透明度四场景卡",
    learningOutcome: "知道哪些场景要提示用户正在与AI互动或看到AI生成内容。",
    body: `今天起，欧盟AI法案里一组很具体的透明度要求开始适用。

做AI产品或跨境内容，先检查四个场景：

用户是不是在和AI聊天；
生成内容有没有机器可读标记；
画面或声音是不是深度伪造；
公共利益信息是不是由AI生成、且没有人工审阅。

这不等于“所有AI内容必须贴同一个大标签”，不同场景有例外和过渡期。

也别把高风险系统的其他期限混进来。欧盟官方FAQ已经把时间线分开列了。

如果账号或产品面向欧盟用户，今天应该让法务和产品一起过一遍Article 50，而不是只改文案末尾。

#欧盟AI法案 #AI合规 #出海`,
    video: "今天起，欧盟AI法案Article 50透明度要求开始适用。做跨境内容和AI产品先查四个场景：用户是否在和AI互动、生成内容有没有机器标记、是否是深度伪造、公共利益文本是否未经人工审阅。不同场景有例外和过渡期，涉及业务要让专业人员确认。",
  },
  {
    source: "Sam Altman / TechCrunch",
    sourceType: "TechCrunch",
    sourceUrl: "https://techcrunch.com/2026/08/01/sam-altman-is-still-making-the-case-for-parenting-via-chatgpt/",
    discussionUrl: "https://techcrunch.com/2026/08/01/sam-altman-is-still-making-the-case-for-parenting-via-chatgpt/",
    evidenceId: "tc-chatgpt-parenting-20260801",
    title: "把ChatGPT当育儿助手，最先要写的不是提示词",
    summary: "TechCrunch报道Sam Altman继续宣传家长使用ChatGPT的场景；报道未证明其建议适合医疗、安全或儿童发展决策。",
    localizedTranslation: "OpenAI CEO继续分享家长使用ChatGPT的案例，并把它描述为一个有吸引力的育儿辅助场景。",
    discussionFocus: ["TechCrunch未公开文章互动。", "育儿使用涉及儿童隐私、医疗和安全；任何具体建议都需看来源和专业审核。", "这是公司CEO的产品使用主张，不是独立临床或教育研究。"],
    engagement: { views: null, likes: null, replies: null, reposts: null, bookmarks: null },
    engagementLabel: "公开互动未公开",
    heat: 76, fit: 79, scarcity: 55, evidenceConfidence: 78, actionability: 70,
    category: "AI 技巧", recommended: false,
    reason: "生活场景广，但风险边界较高，不进今日主推。",
    angle: "只建议整理问题和生成清单，不让AI替代儿科医生与安全判断。",
    humanCheck: "医疗、营养、安全、心理和教育建议必须由专业来源复核；避免上传儿童身份和健康隐私。",
    saveObject: "育儿AI安全边界表",
    learningOutcome: "会让AI做信息整理，不把它当儿科医生。",
    body: `Sam Altman又分享了家长使用ChatGPT的场景。

育儿当然可以用AI，但最先写的不是提示词，是边界：

可以让它整理儿科医生要问的问题、把学校通知变成待办、比较公开活动的时间地点。

不要让它直接判断孩子是否生病、该吃什么药、某个安全风险能不能忽略。

上传前还要删掉孩子姓名、学校、住址和完整健康记录。

这是产品方分享的使用主张，不是独立医疗或教育研究。

#ChatGPT #育儿工具 #隐私保护`,
    video: "把ChatGPT当育儿助手，先写边界。可以整理要问医生的问题、把学校通知变待办、比较公开活动信息。不要让它诊断、决定用药或忽略安全风险。上传前删孩子姓名、学校、住址和健康记录。这是产品使用主张，不是医学研究。",
  },
  {
    source: "Barchart / Hacker News",
    sourceType: "市场报道 + HN",
    sourceUrl: "https://www.barchart.com/story/news/3584357/reddit-stock-collapses-23-as-ai-eats-away-at-user-growth",
    discussionUrl: "https://news.ycombinator.com/item?id=49136787",
    evidenceId: "hn-49136787",
    title: "Reddit股价大跌，AI搜索到底抢走了什么",
    summary: "报道把Reddit股价单日下跌23%与用户增长担忧、AI搜索影响联系起来；因果关系不能只靠标题确认。",
    localizedTranslation: "Reddit股价下跌23%，报道认为AI正在侵蚀用户增长，但股价和增长变化还受到财报预期、估值和市场情绪等因素影响。",
    discussionFocus: ["HN 26 points、23 comments。", "讨论关注AI摘要是否减少用户点击论坛，以及Reddit数据授权收入与社区访问之间的矛盾。", "标题使用强因果表达，但公开证据不足以把23%跌幅全部归因于AI。"],
    engagement: { views: null, likes: 26, replies: 23, reposts: null, bookmarks: null },
    engagementLabel: "HN 26 points · 23 comments · 浏览与收藏未公开",
    heat: 82, fit: 65, scarcity: 55, evidenceConfidence: 70, actionability: 45,
    category: "产业观察", recommended: false,
    reason: "有讨论价值但偏资本市场，且因果容易夸大。",
    angle: "关注AI摘要让用户不再点进社区，而不是直接搬股价标题。",
    humanCheck: "核对Reddit财报、用户增长指标和当日市场背景；不提供投资建议。",
    saveObject: "AI搜索流量路径图",
    learningOutcome: "理解AI摘要可能改变内容平台的点击与数据收入。",
    body: `Reddit股价单日大跌23%，有报道直接把原因写成“AI抢走用户增长”。

真正值得看的不是股价标题，而是流量路径：

以前用户在搜索结果里看到链接，会点进论坛看回答；现在AI先把答案摘要出来，用户可能不再进入原社区。

与此同时，AI公司又需要论坛数据训练和回答问题。

这会让内容平台同时面对两件事：访问量被截走，数据本身却更值钱。

但23%的跌幅不能全部归因于AI，财报预期、估值和市场情绪都要一起看。这不是投资建议。

#Reddit #AI搜索 #内容平台`,
    video: "Reddit股价单日下跌二十三个百分点，有报道归因于AI影响用户增长。更值得看的是流量路径：AI先摘要论坛答案，用户可能不再点进社区，但AI公司又需要社区数据。平台的访问量和数据价值正在分开。股价跌幅不能全部归因于AI，也不是投资建议。",
  },
];

if (items.length !== 20) throw new Error(`Expected 20 items, got ${items.length}`);
if (items.filter((item) => item.recommended).length !== 8) {
  throw new Error(`Expected 8 recommendations, got ${items.filter((item) => item.recommended).length}`);
}

const hotspots = items.map((item, index) => ({
  id: 2026080201 + index,
  rank: index + 1,
  source: item.source,
  sourceUrl: item.sourceUrl,
  sourceType: item.sourceType,
  age: "今天/昨日",
  title: item.title,
  summary: item.summary,
  heat: item.heat,
  scarcity: item.scarcity,
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
  commentSamples: item.discussionFocus.filter((line) => line.includes("评论")),
  reuseIdeas: [
    `首屏：${item.title}`,
    `本地化角度：${item.angle}`,
    "只搬可验证的事实和方法；保留原始链接、互动口径和不确定边界。",
  ],
  localizedTranslation: item.localizedTranslation,
  analysisState: "已分析",
  saveObject: item.saveObject,
  learningOutcome: item.learningOutcome,
  recommended: item.recommended,
  editorialGate: {
    saveObject: item.saveObject,
    learningOutcome: item.learningOutcome,
    shareReason: "读者能获得一条具体信息、一个判断方法或一个可以立即执行的动作。",
    passed: true,
  },
}));

const drafts = items.map((item, index) => ({
  id: 5026080201 + index,
  hotspotId: 2026080201 + index,
  platform: "小红书",
  title: item.title,
  body: item.body,
  visual,
  videoScript: item.video,
  version: "V1 · 8月2日来源重写稿",
  parentVersion: null,
  revisionMode: "operator-daily",
  revisionReason: "基于8月2日真实原帖、公开互动与可验证评论重新选题并本地化；未沿用昨日内容。",
  revisedAt: capturedAt,
  updatedBy: "Codex AI Content Operator",
  status: "待审核",
  reviewNote: "",
}));

const priorState = prior.state ?? prior;
const priorDrafts = Array.isArray(priorState.drafts) ? priorState.drafts : [];
const state = {
  schemaVersion: 2,
  hotspots,
  drafts,
  draftHistory: [
    ...(Array.isArray(priorState.draftHistory) ? priorState.draftHistory : []),
    ...priorDrafts.map((draft) => ({
      ...draft,
      archivedAt: capturedAt,
      supersededBy: "2026-08-02 daily batch",
      revisionReason: "跨日换新来源；保留昨日版本和审核状态供追溯。",
    })),
  ],
  discoveryMeta: {
    runId: "daily-2026-08-02-real-sources",
    capturedAt,
    coverageLabel: "20条候选：X 7个主题、HN/研究与个人博客7个主题、TechCrunch 5个主题、欧盟官方1个主题；8条推荐，20条均有完整小红书稿与短视频口播。",
    editorialBrief: "优先能让普通读者收藏、照做或形成清晰判断的AI技巧和资讯；高互动但证据薄弱、过于深奥或高风险的题只进候选。",
    sourceSuccess: [
      "X已登录浏览器：核验正文、链接、发布时间、浏览、点赞、回复、转发、收藏及代表性评论。",
      "Hacker News Algolia/API：核验积分、评论数和代表性评论。",
      "TechCrunch AI RSS：核验8月1日最新报道和摘要。",
      "欧盟委员会与AI Act Service Desk：核验8月2日Article 50透明度时间线。",
      "GitHub/Hugging Face/原始博客与研究页：作为项目和事实补充来源。",
    ],
    sourceFailure: [
      "Instagram、TikTok、LinkedIn本轮未取得同时满足当日、AI相关、公开互动可复核的高质量样本，未用旧帖或低互动内容凑数。",
      "OpenAI RSS连接不稳定；相关安全内容只采用可访问的TechCrunch报道并降低证据置信度。",
      "国内平台内全量同义检索不可用；公开Web仅用于相邻覆盖观察，稀缺度封顶55。",
    ],
    domesticSearchState: "公开搜索发现国内已有多智能体、AI CRM和DeepSeek相邻内容，但未找到能证明8月2日具体事件在小红书/抖音已充分覆盖的数据；不宣称国内没人发。",
    rejectedTopics: [
      "X搜索中的成人内容、政治争吵和只因正文出现AI而命中的无关高赞帖。",
      "同一DeepSeek V4 Flash事件的多个帖子合并成一个热点，不重复占位。",
      "AI数学突破和火箭发动机虽高互动，但原始证据不足，不进入推荐。",
      "AI投资建议涉及高风险财务决策，按规则降级，不进入推荐。",
      "未公开互动的官方或媒体页明确标记未公开，不使用内部热度冒充流量。",
    ],
    recommendationCount: items.filter((item) => item.recommended).length,
    reviewNoteAudit: {
      productionPull: "成功：更新前已拉取20条候选和20条草稿。",
      currentPacketNotes: priorDrafts.filter((draft) => (draft.reviewNote ?? "").trim() !== "").length,
      action: "未发现待处理reviewNote；保留昨日草稿、版本和状态到draftHistory；没有自动审核或自动发布。",
    },
  },
};

const packet = {
  mode: "replace",
  detail: "2026-08-02真实来源日更：20条候选、8条推荐、20条完整小红书稿与短视频口播；保留历史版本，不自动审核或发布。",
  state,
};

const handoff = {
  schema_version: 2,
  batch_id: "daily-2026-08-02-real-sources",
  batch_date: "2026-08-02",
  editorial_brief: state.discoveryMeta.editorialBrief,
  hotspots: hotspots.map((hotspot, index) => ({
    id: String(hotspot.id),
    title: hotspot.title,
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
      engagement_label: hotspot.engagementLabel,
    }],
    scores: {
      foreign_heat: hotspot.heat,
      domestic_scarcity: hotspot.scarcity,
      account_fit: hotspot.fit,
      actionability: hotspot.actionability,
      evidence_confidence: hotspot.evidenceConfidence,
      final: Math.round(
        hotspot.heat * 0.25 +
        hotspot.scarcity * 0.25 +
        hotspot.fit * 0.25 +
        hotspot.actionability * 0.15 +
        hotspot.evidenceConfidence * 0.1,
      ),
    },
    domestic_checks: [{ platform: "小红书/抖音", query: hotspot.title, finding: hotspot.domesticCoverage }],
    localized_translation: hotspot.localizedTranslation,
    discussion_focus: hotspot.discussionFocus,
    comment_samples: hotspot.commentSamples,
    reuse_ideas: hotspot.reuseIdeas,
    save_object: hotspot.saveObject,
    learning_outcome: hotspot.learningOutcome,
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
    status: "待审核",
  })),
  gaps: state.discoveryMeta.sourceFailure,
  generated_at: capturedAt,
};

fs.writeFileSync(outPath, `${JSON.stringify(packet, null, 2)}\n`);
fs.writeFileSync(handoffPath, `${JSON.stringify(handoff, null, 2)}\n`);
console.log(outPath);
console.log(handoffPath);
