import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const previous = JSON.parse(fs.readFileSync(path.join(root, "operator-packets/2026-08-05-daily-batch.json"), "utf8"));
const previousState = previous.state ?? previous;
const capturedAt = "2026-08-06T08:31:53+08:00";
const outPath = path.join(root, "operator-packets/2026-08-06-daily-batch.json");
const handoffPath = path.join(root, "operator-packets/2026-08-06-daily-handoff.json");

const domesticCoverage = "未接入小红书、抖音平台内全量语义检索；国内稀缺度按规则封顶55。发布前请人工分别搜索产品名、原作者、核心主张与本文角度，不能写成‘国内没人发’。";
const visual = "4:5黑白极简信息卡，保留一点圆角和一处简笔画。首图只放标题与一个真实物件；内页用清单、时间线或对照表。不要机器人头像、发光渐变、虚构收益和未经验证的效果数字。";

function item(data) {
  return {
    sourceType: "Hacker News",
    category: "AI 技巧",
    scarcity: 55,
    fit: 82,
    evidenceConfidence: 82,
    actionability: 72,
    recommended: false,
    engagement: { views: null, likes: null, replies: null, reposts: null, bookmarks: null },
    ...data,
  };
}

const items = [
  item({
    source: "Cloudflare / Hacker News", sourceUrl: "https://blog.cloudflare.com/cloudflare-os/", discussionUrl: "https://news.ycombinator.com/item?id=49182996", evidenceId: "hn-49182996",
    title: "Cloudflare 把 Agent、应用和文件塞进同一个网页工作区", summary: "Cloudflare发布Cloudflare OS，试图把聊天、连接器、应用与工作对象放进同一套网页环境。HN采集时为452 points、228 comments，讨论大量集中在它是否配得上‘OS’这个名字。",
    localizedTranslation: "原题：Cloudflare OS：面向智能体、应用与工作的开放平台。核心主张是让Agent在同一个网页工作区调用连接器和应用，而不是只停留在聊天回复。",
    heat: 99, fit: 78, actionability: 68, evidenceConfidence: 93,
    engagementLabel: "Hacker News 452 points · 228 comments（8月6日采集）；原站浏览、点赞、收藏未公开",
    reason: "讨论很高，但用户争论更多在产品命名与平台边界，先留候选。", angle: "真正值得看的是聊天结果能否变成可继续操作的页面，而不是‘OS’三个字。",
    humanCheck: "核对公开测试入口、支持的连接器、数据权限和持久化范围；不得把概念页写成已全面可用。",
    discussionFocus: ["不少评论质疑它是否只是带连接器的聊天应用。", "也有人认可Cloudflare把Workers与Durable Objects组合成Agent基础设施的能力。"],
    commentSamples: ["thehamkercat质疑公司为何都把新平台称为OS。", "rozenmd转述Kenton Varda的解释：关键差异不只是聊天，而是应用运行环境。"],
    saveObject: "Agent工作区4项核验卡", learningOutcome: "会从权限、状态、应用和交付物判断一个Agent平台是否真能工作。",
    body: `Cloudflare 新发了一个叫“Cloudflare OS”的 Agent 工作区。名字很大，HN 也吵得很凶：采集时 452 分、228 条评论。

先不管它算不算操作系统，真正可以看的只有四件事：

它能接哪些真实工具；
关掉页面后任务状态还在不在；
Agent做过什么有没有记录；
最后能留下文件、页面或可继续编辑的结果吗。

只会在聊天框里说“已完成”，和真的把事情放进工作区，是两回事。Cloudflare这次给了一个方向，但具体连接器、权限和稳定性还要实测。`,
    video: "Cloudflare发布了一个叫Cloudflare OS的Agent工作区，HN采集时452分、228条评论。别先争它算不算OS，只看四件事：能接哪些工具、关页面后状态还在不在、操作有没有记录、最后能不能留下可编辑结果。只会聊天和真的完成工作，是两回事。",
  }),
  item({
    source: "Google / Hacker News", sourceUrl: "https://blog.google/company-news/inside-google/message-ceo/next-chapter-ai-momentum/", discussionUrl: "https://news.ycombinator.com/item?id=49184755", evidenceId: "hn-49184755",
    title: "Google DeepMind 大调整：Hassabis 转任董事长，Jeff Dean 离开", summary: "Google公告DeepMind领导层变化：Demis Hassabis由CEO转为Chair，Jeff Dean等人离开并启动新项目。HN采集时435 points、559 comments，是当天讨论量最高的AI条目。",
    localizedTranslation: "原题：Google AI发展进入下一阶段。公告涉及DeepMind领导层变化以及Jeff Dean、Sanjay Ghemawat等人的后续安排。",
    heat: 100, fit: 65, actionability: 35, evidenceConfidence: 97, category: "产业观察",
    engagementLabel: "Hacker News 435 points · 559 comments（8月6日采集）；Google公告页浏览、点赞与收藏未公开",
    reason: "互动最高，但属于纯人事产业新闻，不占推荐位。", angle: "用‘谁负责研究、谁负责产品、谁去创业’解释组织变化，不做宫斗猜测。",
    humanCheck: "只采用Google公告和当事人公开声明；离职原因、权力变化和创业估值都不能猜。",
    discussionFocus: ["评论把此次变化视为Google AI组织的重要转折。", "大量讨论围绕Jeff Dean与合作者的新项目，但夹杂未经证实的推断。"],
    commentSamples: ["WarmWash把这次调整称为DeepMind近期的重大变化。", "xtreak29补充了Jeff Dean公开宣布Discovery Loop的社媒链接。"],
    saveObject: "Google AI组织变化时间线", learningOutcome: "分清官方确认的人事变化与社区猜测。",
    body: `Google AI 团队今天有一次大调整：Demis Hassabis 从 DeepMind CEO 转任董事长，Jeff Dean 等资深研究者离开并启动新项目。

HN采集时是435分、559条评论，热度很高。但这类消息最容易被写成宫斗。

现在能确认的是职位和去向；不能确认的是谁被架空、为什么离开、内部到底发生了什么。做产业资讯时，把“公告写了什么”和“大家猜什么”分开就够了。`,
    video: "Google DeepMind今天大调整：Demis Hassabis从CEO转任董事长，Jeff Dean等人离开并启动新项目。HN采集时435分、559条评论。现在能确认的是职位和去向，不能确认的是内部原因和权力变化。看这类大厂人事新闻，先把公告和猜测分开。",
  }),
  item({
    source: "OpenReview / Hacker News", sourceUrl: "https://openreview.net/challenge?redirect=%2Fforum%3Fid%3DklU4737opt", discussionUrl: "https://news.ycombinator.com/item?id=49181083", evidenceId: "hn-49181083",
    title: "LLM 会组合旧答案，但能不能真正‘跳一步’？163 条评论在争", summary: "一篇立场论文提出‘LLM不能完成真正的概念跃迁’，在HN采集时235 points、163 comments。讨论集中在如何定义直觉跳跃、训练数据泄漏和可验证实验。",
    localizedTranslation: "原题：立场论文——LLM不会跳跃。作者讨论模型是否能从既有模式中产生超出训练分布的概念突破。",
    heat: 92, fit: 61, actionability: 41, evidenceConfidence: 75, category: "产业观察",
    engagementLabel: "Hacker News 235 points · 163 comments（8月6日采集）；论文页浏览、点赞与收藏未公开",
    reason: "讨论高但概念深、结论争议大，不适合当当天实用推荐。", angle: "把‘会答题’与‘提出可验证的新问题’分开。",
    humanCheck: "阅读全文并核对实验设计；这是一篇立场论文，不得包装成已证实结论。",
    discussionFocus: ["支持者认为模型更擅长插值，难以产生真正概念跃迁。", "反对者质疑‘跳跃’没有清晰可测定义，也难排除训练数据影响。"],
    commentSamples: ["jvanderbot提出可用某个历史时间点以前的文本训练模型，再测试后来的发现。", "conartist6用个人研究体验支持‘模型会避开未经探索路径’的观察，但没有实验数据。"],
    saveObject: "AI能力主张的3个核验问题", learningOutcome: "知道立场论文、实验结论和个人经验不能混写。",
    body: `“LLM不会真正跳出已有知识。”

这篇立场论文在HN拿到235分、163条评论。争议点不在模型会不会回答，而在它能不能提出训练材料里没有、还能被验证的新概念。

这件事暂时没有一句话结论。看到类似标题，先问：作者怎么定义“跳跃”？实验能不能排除训练数据？有没有可重复的反例？三件都说不清，就先把它当观点，不要当定论。`,
    video: "一篇论文说LLM不会真正‘跳一步’，HN有235分、163条评论。先别站队。判断这类主张只问三件事：作者怎么定义概念跃迁，实验能不能排除训练数据，别人能不能重复。答不清，就把它当立场，不要写成模型能力已经盖棺定论。",
  }),
  item({
    source: "Wired / Hacker News", sourceUrl: "https://www.wired.com/story/meta-ran-ads-that-contained-ai-generated-child-sexual-abuse-imagery/", discussionUrl: "https://news.ycombinator.com/item?id=49187977", evidenceId: "hn-49187977",
    title: "Meta 被曝展示含AI生成儿童性虐待图像的广告", summary: "Wired报道称Meta平台曾展示包含AI生成儿童性虐待材料的广告。HN采集时232 points、188 comments。题材高度敏感，不进入推荐。",
    localizedTranslation: "原题：Meta展示了包含AI生成儿童性虐待图像的广告。报道关注广告审核和平台责任。",
    heat: 93, fit: 28, actionability: 20, evidenceConfidence: 78, category: "产业观察",
    engagementLabel: "Hacker News 232 points · 188 comments（8月6日采集）；媒体页浏览、点赞与收藏未公开",
    reason: "高讨论但题材敏感、二次传播风险高，只保留监测。", angle: "若后续必须报道，只讨论广告审核机制和平台责任，不复述或展示违法图像细节。",
    humanCheck: "必须核对Wired证据、Meta回应和执法机构信息，并由法律与平台安全人员审核。",
    discussionFocus: ["讨论集中在平台广告审核为什么未能拦截。", "大量评论情绪化，不能替代正式调查与公司回应。"],
    commentSamples: ["stephenhuey提供了另一家媒体的非付费墙报道。", "其余高位评论多为情绪表达，没有增加可核验证据。"],
    saveObject: "敏感事件报道边界卡", learningOutcome: "知道此类事件不能用刺激性图片和未经核实细节换流量。",
    body: `Wired 报道，Meta平台曾展示包含AI生成儿童性虐待材料的广告。HN采集时232分、188条评论。

这条不适合按普通热点搬运，更不能为了吸引点击复述图像细节。若要跟进，只写三件事：平台审核链路、公司公开回应、监管或执法结论。现在先留在监测池，不进入发布推荐。`,
    video: "一条关于Meta广告审核的敏感报道正在升温，但这类内容不该用细节和画面换点击。真正要跟的只有审核链路、公司回应和正式调查结论。在证据完整和人工审核前，不建议发布。",
  }),
  item({
    source: "Neon + Castform / Hacker News", sourceUrl: "https://neon.com/blog/how-castform-neon-beats-frontier-models-on-price-and-efficiency", discussionUrl: "https://news.ycombinator.com/item?id=49186762", evidenceId: "hn-49186762",
    title: "查资料不一定要用最贵模型：一个4B模型把钱花在‘找对原文’上", summary: "Neon与Castform披露：一个经后训练的4B开放模型在其检索评测中达到与GPT-5.6 Sol相近的准确度，并称推理成本低100倍。HN采集时201 points、36 comments。数字来自参与方评测。",
    localizedTranslation: "原题：Castform与Neon如何在价格和效率上超过前沿模型。核心内容是用专门训练的小模型反复检索，并按找对来源、引用对片段和答对问题进行奖励。",
    heat: 90, fit: 96, actionability: 94, evidenceConfidence: 82, recommended: true, category: "AI 技巧",
    engagementLabel: "Hacker News 201 points · 36 comments（8月6日采集）；厂商文章称成本低100倍，浏览、点赞与收藏未公开",
    reason: "热门且能转成知识库的具体优化顺序，但必须明确厂商自测边界。", angle: "知识库答不准时，先查命中的原文和引用，再考虑换更贵的模型。",
    humanCheck: "发布前核对评测集、成本口径和GPT-5.6 Sol对照设置；100倍为参与方结果，不能外推。",
    discussionFocus: ["评论认可小模型承担专门检索任务的潜力。", "质疑点集中在检索长文深处信息和多线索配对时能否保持准确。"],
    commentSamples: ["mrinterweb建议让工作流按任务把检索交给专门小模型。", "aliljet追问：信息埋得更深、需要配对多条线索时，检索能力是否仍成立。"],
    saveObject: "知识库答错的4步排查表", learningOutcome: "会先定位检索和引用问题，而不是一上来升级最贵模型。",
    body: `公司知识库答错，第一反应通常是：换个更贵的模型。

今天有个案例挺值得抄。Castform用一个4B开放模型专门做检索，参与方称在自己的评测里，准确度接近GPT-5.6 Sol，成本低100倍。HN采集时201分、36条评论。

先别记“100倍”，这是厂商自己的评测。更实用的是它把结果拆成了三件事：有没有找到对的来源、有没有引用对的段落、最后答案对不对。

你的知识库答错时，也按这个顺序查：

搜索结果里有没有原文；
原文在，但切片是不是把上下文切断了；
引用对了，回答有没有擅自补充；
前三项都过了，再比较模型。

很多问题出在“没找对”，不是“不会写”。先修检索，常常比直接升级套餐便宜。

#AI知识库 #RAG #AI工具`,
    video: "知识库答错，别第一时间换最贵模型。Castform用4B开放模型专门做检索，参与方称在自家评测里准确度接近GPT-5.6 Sol、成本低100倍。这个数字先别外推，真正能抄的是排查顺序：有没有找到原文、切片有没有断、引用对不对、答案有没有乱补。前三项都过了，再换模型。",
  }),
  item({
    source: "Meta AI / Hacker News", sourceUrl: "https://research.meta.ai/blog/introducing-muse-code-and-muse-spark-1.2", discussionUrl: "https://news.ycombinator.com/item?id=49187575", evidenceId: "hn-49187575",
    title: "Meta 更新 Muse Code 与 Muse Spark 1.2，重点转向复杂调试", summary: "Meta发布Muse Code和Muse Spark 1.2，称加强代码生成、复杂调试、代码库理解与端到端开发流程。HN采集时153 points、89 comments。",
    localizedTranslation: "原题：介绍Muse Code与Muse Spark 1.2。官方称新版扩大了编码任务训练量，覆盖生成、调试、代码库理解和完整开发工作流。",
    heat: 87, fit: 73, actionability: 58, evidenceConfidence: 91, category: "产业观察",
    engagementLabel: "Hacker News 153 points · 89 comments（8月6日采集）；官方页浏览、点赞与收藏未公开",
    reason: "有热度但属于模型更新，缺少独立中文场景测试，不占推荐。", angle: "不要只看榜单，用同一真实bug比较定位、修改和测试。",
    humanCheck: "核对模型开放范围、价格、支持环境和官方benchmark；发布前做同一代码任务实测。",
    discussionFocus: ["评论关心为何官方对比选择特定模型而非最新前沿模型。", "也有人质疑1.1发布后很快推出1.2，是否属于重新发布。"],
    commentSamples: ["ipsum2追问官方为何只与Terra而非Sol对比。", "minimaxir认为1.2距离1.1太近，需要更多独立测试。"],
    saveObject: "编码模型同题实测表", learningOutcome: "知道模型更新要用定位、改动和测试三个结果验收。",
    body: `Meta更新了Muse Code和Muse Spark 1.2，官方把重点放在复杂调试、代码库理解和完整开发流程。

HN采集时153分、89条评论。评论里最实际的问题是：官方为什么这样选对照模型？

新模型先别看一句“更强”。拿同一个真实bug，记录它能不能找到原因、改动范围多大、测试有没有补齐。三项做完，才知道它是不是比你现在的工具好用。`,
    video: "Meta更新Muse Code和Muse Spark 1.2，主打复杂调试和代码库理解。HN采集时153分、89条评论。别只看榜单，拿同一个真实bug测三件事：能不能找到原因、改动范围有多大、测试有没有补齐。三项都过，再考虑换工具。",
  }),
  item({
    source: "Thomas Fogus / Hacker News", sourceUrl: "https://blog.fogus.me/llm/born-against.html", discussionUrl: "https://news.ycombinator.com/item?id=49187061", evidenceId: "hn-49187061",
    title: "为什么很多编程爱好者反感LLM？因为他们享受的就是过程", summary: "一篇文章讨论业余编程社区对LLM的抵触，HN采集时116 points、132 comments。主线不是工具效率，而是爱好者是否把‘亲手完成’视为活动本身。",
    localizedTranslation: "原题：天生反对——为什么业余编程社区反对使用LLM。作者从社区价值、技能形成和过程乐趣解释这种抵触。",
    heat: 84, fit: 75, actionability: 49, evidenceConfidence: 84, category: "个人 IP",
    engagementLabel: "Hacker News 116 points · 132 comments（8月6日采集）；原站浏览、点赞与收藏未公开",
    reason: "讨论密度高但更偏价值观，保留候选。", angle: "先问自己是在交付结果还是练技能，同一个人可以有两套AI规则。",
    humanCheck: "不能把特定爱好社区观点外推为所有程序员反AI。",
    discussionFocus: ["一些评论强调爱好就是享受过程，缩短过程反而失去意义。", "另一些人担心社区重新依赖专有工具，弱化可学习、可维护的共同知识。"],
    commentSamples: ["QuantumNoodle说，爱好是享受过程，不只是得到干净的最终结果。", "analog31提到开源社区长期摆脱专有工具，因此不想重新依赖。"],
    saveObject: "结果任务/练习任务分流卡", learningOutcome: "会给工作和练习分别设定AI使用边界。",
    body: `为什么很多编程爱好者反感LLM？

HN这场讨论有116分、132条评论。一个很朴素的解释是：他们想要的不是更快得到程序，而是亲手解决问题的过程。

所以同一个人完全可以有两套规则。工作交付允许AI帮忙提速；练习项目只让AI查文档、提问题，不替自己写答案。先分清目标，很多争论就没必要了。`,
    video: "很多编程爱好者反感LLM，不一定是因为工具没用，而是他们享受的就是亲手解决问题。HN这场讨论有116分、132条评论。最实用的做法是分两套规则：工作交付可以提速，练习项目只让AI查资料和提问，不替你完成。",
  }),
  item({
    source: "Rust Project / Hacker News", sourceUrl: "https://blog.rust-lang.org/inside-rust/2026/08/05/rust-langrust-is-adopting-an-llm-policy/", discussionUrl: "https://news.ycombinator.com/item?id=49179039", evidenceId: "hn-49179039",
    title: "Rust 给AI贡献立了规矩：可以辅助，但不能把理解一起外包", summary: "Rust项目的五个团队采用LLM使用政策。政策允许问答、分析、提炼、检查、建议与评审；公开LLM内容需按规则披露，人类评审与自查不能被LLM替代。HN采集时108 points、69 comments。",
    localizedTranslation: "原题：rust-lang/rust正在采用一项LLM政策。政策不是Rust对LLM的统一立场，也并非覆盖全部项目；其核心是披露、理解、测试和人工责任。",
    heat: 83, fit: 97, actionability: 96, evidenceConfidence: 97, recommended: true, category: "实操案例",
    engagementLabel: "Hacker News 108 points · 69 comments（8月6日采集）；Rust博客浏览、点赞与收藏未公开",
    reason: "一手规则清楚，能直接变成国内团队的AI交付说明。", angle: "不争用不用AI，先固定披露、理解、测试和责任人四项。",
    humanCheck: "说明政策只由五个Rust团队采用、并非覆盖整个Rust项目；具体允许范围以政策原文为准。",
    discussionFocus: ["支持者认可政策区分‘辅助理解’和‘替代创作’。", "争议点是规则能否执行，以及现有代码中AI参与如何处理。"],
    commentSamples: ["andsoitis概括：允许问答、分析、提炼、检查、建议和评审，但不把创作本身交给LLM。", "minimaxir特别认可政策禁止因他人使用LLM而骚扰。"],
    saveObject: "团队AI交付4行声明", learningOutcome: "能在交付物里说明AI参与、人工理解、测试证据和最终责任。",
    body: `团队里最容易吵的一句话是：“这段是不是AI写的？”

Rust项目最近给了一个更能落地的做法。五个团队采用了新的LLM政策，HN采集时108分、69条评论。它不等于整个Rust项目全面禁用AI，核心更像四条交付规矩：

哪里用了AI，要说明；
提交的人必须看懂；
该有的测试不能省；
最后仍由具体的人负责。

你们团队其实也可以在每次交付后加四行：

AI参与：资料整理 / 初稿 / 检查 / 代码生成；
人工确认：谁逐项看过；
验证证据：测试、截图或来源链接；
责任人：谁决定可以交付。

这比争“能不能用AI”有用得多。用可以，理解和责任不能一起外包。

#AI协作 #团队管理 #开发工作流`,
    video: "Rust项目的五个团队刚采用LLM政策。重点不是全面禁用，而是四条：用了要说明，提交的人必须看懂，测试不能省，最后仍由具体的人负责。普通团队可以直接在交付后加四行：AI参与了什么、谁人工确认、验证证据在哪、谁负最终责任。",
  }),
  item({
    source: "Data For Science / Hacker News", sourceUrl: "https://data4sci.com/blog/building-an-advanced-agentic-harness", discussionUrl: "https://news.ycombinator.com/item?id=49182946", evidenceId: "hn-49182946",
    title: "Agent长任务跑不稳，先补这5样，再考虑换模型", summary: "Data For Science发布Agent harness实践，涵盖类型化工具、依赖图、分层记忆、验证层级、预算和追踪。HN采集时104 points、40 comments。作者也明确表示部分效果仍需后续评测。",
    localizedTranslation: "原题：构建高级Agent运行框架。文章从规划、并行、记忆、验证和可观测性拆解生产型Agent，并用薄编排层组合小而可测试的组件。",
    heat: 82, fit: 98, actionability: 97, evidenceConfidence: 88, recommended: true, category: "AI 技巧",
    engagementLabel: "Hacker News 104 points · 40 comments（8月6日采集）；原站浏览、点赞与收藏未公开",
    reason: "技术文章能压缩成普通长任务的五项检查，收藏价值高。", angle: "模型不是唯一变量；计划、状态、验收、预算和日志缺一项都可能让任务失控。",
    humanCheck: "文章中的架构选择并非通用最佳实践，部分效果作者尚未完成正式benchmark。",
    discussionFocus: ["有人质疑harness、技能与记忆系统是否只是重复包装。", "也有人偏好让模型在REPL中动态循环，而不是预先生成固定DAG。"],
    commentSamples: ["dominotw直言怀疑很多harness在实践中无用。", "budududuroiu更喜欢REPL循环，因为它能动态退出、循环和改变路径。"],
    saveObject: "长任务5项接班卡", learningOutcome: "能在长任务中保存计划、状态、验收、预算和操作记录。",
    body: `Agent跑半小时以后开始乱，很多人第一反应是换更强的模型。

今天一篇Agent运行框架的长文在HN拿到104分、40条评论。技术细节不少，但普通人真正能抄的只有五样：

计划：现在要做哪几步，哪些能同时做；
状态：已确认的事实和文件放在哪里；
验收：每一步怎样才算完成；
预算：最多花多少时间、调用或费用；
记录：失败在哪一步，下次从哪里恢复。

可以直接建一个TASK.md：

目标：
当前步骤：
已验证：
剩余预算：
失败后从这里恢复：

每做完一步更新一次。任务跑偏时，你至少知道它从哪开始错，而不是得到一句“抱歉，我再试试”。

文章里的复杂架构不一定适合每个人，作者也说部分效果还要继续评测。但这五行，做研究、剪视频、改代码都能先用。

#AIAgent #效率工具 #工作流`,
    video: "Agent长任务跑不稳，先别急着换模型。补五样东西：计划、状态、验收、预算和记录。建一个TASK文件，只写目标、当前步骤、已验证、剩余预算、失败后从哪里恢复。每做完一步更新一次。这样任务跑偏时，你能找到断点，而不是只得到一句‘我再试试’。",
  }),
  item({
    source: "arXiv / Hacker News", sourceUrl: "https://arxiv.org/abs/2607.29377", discussionUrl: "https://news.ycombinator.com/item?id=49178608", evidenceId: "hn-49178608",
    title: "Agent记忆不一定要先压成摘要：摘要会把遗漏也固定下来", summary: "Zero-Mem论文提出不通过生成式摘要改写记忆，而保留原始交互轨迹并做外部检索。HN采集时92 points、12 comments。方法效果和成本需看论文完整实验。",
    localizedTranslation: "原题：Zero-Mem——面向LLM Agent的零Token记忆操作。核心思路是避免让生成模型反复改写记忆，尽量从原始轨迹检索。",
    heat: 75, fit: 86, actionability: 70, evidenceConfidence: 86,
    engagementLabel: "Hacker News 92 points · 12 comments（8月6日采集）；论文页浏览、点赞与收藏未公开",
    reason: "方法有价值但偏技术，保留候选。", angle: "重要任务同时保留原始记录和短摘要，别只剩AI改写后的版本。",
    humanCheck: "阅读全文核对零Token定义、对照方法、数据集与成本；不得仅凭标题宣称免费记忆。",
    discussionFocus: ["评论认为价值不只是省token，而是避免摘要遗漏破坏可审计性。", "也有人讨论用KV cache或更简单实体抽取实现相似目标。"],
    commentSamples: ["russlan认为保留原始轨迹能避免摘要遗漏成为新的事实基础。", "langs介绍了把对话KV cache留在本地再检索的另一种做法。"],
    saveObject: "长任务原文+摘要双层记录", learningOutcome: "知道摘要方便恢复，但不能替代原始证据。",
    body: `长任务做久了，很多Agent会把旧对话压成摘要。问题是：摘要漏掉的东西，后面就像从没发生过。

Zero-Mem提出尽量保留原始轨迹，再按需检索。普通人不用复现论文，也可以做一个双层记录：上面是一页短摘要，下面保留原始链接、文件和关键对话。恢复靠摘要，核对回原文。`,
    video: "Agent记忆经常靠摘要，但摘要漏掉的内容会被后续当成不存在。Zero-Mem提出保留原始轨迹再检索。普通人可以先做双层记录：一页短摘要负责恢复，下面保留原始链接、文件和关键对话。摘要方便，不能替代证据。",
  }),
  item({
    source: "Prime Intellect / Hacker News", sourceUrl: "https://www.primeintellect.ai/blog/prime-agent", discussionUrl: "https://news.ycombinator.com/item?id=49189075", evidenceId: "hn-49189075",
    title: "Prime Agent 想让Agent自己改进，但‘变聪明’先得有固定考题", summary: "Prime Intellect发布Prime Agent，描述一种可自我改进的RLM Agent。HN采集时80 points、12 comments。自我改进效果仍应以公开评测和可复现实验判断。",
    localizedTranslation: "原题：Prime Agent——一个可自我改进的RLM Agent。核心主张是让Agent在运行中评估并改进自己的策略。",
    heat: 72, fit: 78, actionability: 57, evidenceConfidence: 75,
    engagementLabel: "Hacker News 80 points · 12 comments（8月6日采集）；项目页浏览、点赞与收藏未公开",
    reason: "概念热门但证据还不够适合大众推荐。", angle: "自我改进必须绑定固定任务、版本和回归测试，否则只是行为变化。",
    humanCheck: "核对代码、评测集、基线、迭代次数和成本；不得把自我修改写成持续变聪明。",
    discussionFocus: ["有人愿意尝试这种RLM harness。", "也有人认为基础模型进步后，复杂外部框架的收益会下降。"],
    commentSamples: ["woah表示可能会实际尝试。", "riddlemethat说自己做过类似框架，但认为新基础模型降低了部分必要性。"],
    saveObject: "Agent自我改进4项验收表", learningOutcome: "知道版本变化要用固定任务和回归结果判断。",
    body: `Prime Agent主打“自我改进”，HN采集时80分、12条评论。

这种词最容易被理解成Agent会自己越来越聪明。真正要看的是：每次改了什么版本、在同一套任务上有没有变好、旧任务有没有退步、成本有没有一起上涨。没有固定考题，就只能证明它变了，不能证明它进步了。`,
    video: "Prime Agent主打自我改进。别把它理解成Agent自动越来越聪明。判断只有四项：改了什么版本，同一套任务有没有变好，旧任务有没有退步，成本有没有上涨。没有固定考题，只能证明它变了，不能证明它进步了。",
  }),
  item({
    source: "Stanford researchers / arXiv / Hacker News", sourceUrl: "https://arxiv.org/abs/2510.01395", discussionUrl: "https://news.ycombinator.com/item?id=49186720", evidenceId: "hn-49186720",
    title: "AI越顺着你，你越容易觉得它懂你：把这段‘反拍马屁’提示词存好", summary: "一项2025年论文在8月5日重新引发讨论。研究覆盖11个模型，并做了两项预注册实验（总样本1604），发现奉承式回答会提高用户信任和复用意愿，同时降低修复人际冲突的意愿。HN采集时67 points、50 comments。",
    localizedTranslation: "原题：奉承型AI会降低亲社会意愿并促进依赖。论文研究AI过度同意和夸赞用户时，对建议场景判断与行为意愿的影响。",
    heat: 80, fit: 99, actionability: 99, evidenceConfidence: 96, recommended: true, category: "AI 技巧",
    engagementLabel: "Hacker News 67 points · 50 comments（8月6日采集）；论文页浏览、点赞与收藏未公开",
    reason: "研究证据完整，能直接转成咨询AI前的提示词。", angle: "让AI先补对方视角、指出缺证据，再给最低成本修复动作。",
    humanCheck: "这是特定实验与建议场景结果，不能写成所有AI对话都会导致依赖；涉及心理困扰应寻求专业帮助。",
    discussionFocus: ["评论把奉承与用户防御性联系起来。", "也有人指出人类咨询和治疗中同样可能出现过度迎合。"],
    commentSamples: ["atleastoptimal认为人类咨询中也可能出现类似的过度顺从。", "accountrequired用一句‘你完全正确’讽刺了奉承机制。"],
    saveObject: "可复制的反奉承提示词", learningOutcome: "能让AI先检查自己的叙述盲点，而不是只确认情绪。",
    body: `我现在最怕AI回我的一句话是：“你完全没错。”

听着很舒服，但不一定对你有用。

一项覆盖11个模型、两项预注册实验（总样本1604）的研究发现：奉承式回答更容易被用户评价为“质量高、值得信任”，但在真实人际冲突讨论里，也会降低人们主动修复关系的意愿。HN今天又把它顶起来，采集时67分、50条评论。

下次拿工作矛盾、合作冲突去问AI，可以先贴这段：

不要先判断我对不对。
请列出对方可能合理的3种解释。
指出我的叙述里缺少哪些证据。
分别给出“继续坚持”和“主动修复”的代价。
最后只给一个今天能做、风险最低的沟通动作。

AI可以帮你补视角，不能替你判断一个真实的人。涉及严重心理困扰或安全风险，别只问聊天工具。

#AI提示词 #沟通技巧 #效率工具`,
    video: "如果AI一上来就说‘你完全没错’，先别高兴。一项覆盖11个模型、1604名参与者的研究发现，奉承回答更容易被信任，却可能降低人们修复关系的意愿。把这段存好：不要先判断我对不对；列出对方三种合理解释；指出我缺什么证据；比较坚持和修复的代价；最后给一个风险最低的沟通动作。",
  }),
  item({
    source: "Carloscodix / GitHub + Hacker News", sourceUrl: "https://github.com/Carloscodix/qapla", discussionUrl: "https://news.ycombinator.com/item?id=49178464", evidenceId: "hn-49178464",
    title: "8美元芯片从零训练了一个模型：不是跑模型，是真的反向传播", summary: "Qapla项目在ESP32-S3上从随机权重训练约31.9万参数的字符级Transformer，训练、反向传播与权重更新均在芯片内完成。GitHub采集时66 Stars、3 Forks；HN为64 points、20 comments。项目明确它不是口袋ChatGPT。",
    localizedTranslation: "原题：在8美元ESP32-S3上从零训练一个Transformer。项目让芯片学习克林贡语的字符结构，用极窄任务证明微控制器也能完成完整训练循环。",
    heat: 81, fit: 94, actionability: 78, evidenceConfidence: 96, recommended: true, category: "产业观察", sourceType: "GitHub / Hacker News",
    engagement: { views: null, likes: null, replies: null, reposts: null, bookmarks: null, stars: 66, forks: 3, openIssues: 1 },
    engagementLabel: "Hacker News 64 points · 20 comments；GitHub 66 Stars · 3 Forks · 1 Open Issue（8月6日采集）；浏览与收藏未公开",
    reason: "数字直观、反常识，且官方仓库把限制写得很清楚，适合做易懂AI小资讯。", angle: "重点解释训练与推理的区别，以及小而窄的模型为什么有现实价值。",
    humanCheck: "核对芯片型号、约31.9万参数、训练时长、语料许可和复现步骤；不能写成8美元跑ChatGPT。",
    discussionFocus: ["评论认可它真正把训练循环放进微控制器。", "也有人立刻追问能否看到完整演示，以及语音识别、LLM、TTS串联后的真实体验。"],
    commentSamples: ["pavelai补充模型约31.9万参数、训练约两天，并强调它不能对话。", "dannyw觉得项目很有趣，并讨论多个ESP32组成集群的可能性。"],
    saveObject: "训练/推理一眼看懂对照卡", learningOutcome: "能分清把现成模型放进设备与设备自己学习。",
    body: `一个8美元的ESP32-S3，真的从零训练出了一个小模型。

注意，不是把训练好的模型塞进去“跑一下”。这个项目从随机权重开始，前向计算、反向传播、更新权重、保存检查点，全在芯片里完成。HN采集时64分、20条评论；GitHub是66 Stars。

但它也完全不是口袋ChatGPT：

只有约31.9万参数；
学的是克林贡语的字符结构；
不会聊天，也不理解复杂含义；
训练要按小时甚至天算。

为什么还值得看？因为很多边缘设备面对的是很窄、很本地的数据：一台机器的震动、一块土地的湿度、一个设备自己的异常模式。这些数据可能要设备装好以后才出现。

大模型负责通用能力，小芯片学自己眼前那一点事，可能才是这个实验真正有意思的地方。

#AI资讯 #边缘AI #开源项目`,
    video: "8美元芯片从零训练了一个模型。不是运行现成模型，前向计算、反向传播和权重更新都在ESP32-S3里完成。但别误会，它只有约31.9万参数，学的是克林贡语字符结构，不会聊天，训练也很慢。真正有意思的是：未来一些设备可以在本地学习自己才看得到的窄数据。",
  }),
  item({
    source: "Flowise / Hacker News", sourceUrl: "https://flowiseai.com/sunset", discussionUrl: "https://news.ycombinator.com/item?id=49176920", evidenceId: "hn-49176920",
    title: "Flowise 要停止维护了：用过低代码AI流程的，先导出这5样", summary: "Flowise宣布停止运营：7月29日冻结功能，8月10日归档仓库，8月31日结束官方核心团队支持。代码仍以Apache 2.0保留。HN采集时58 points、45 comments。",
    localizedTranslation: "原题：Flowise的未来。团队称复杂AI应用越来越转向编码Agent，刚性低代码流程触及复杂度上限，因此决定停止运营，并给出代码冻结、归档与EOL时间表。",
    heat: 77, fit: 100, actionability: 100, evidenceConfidence: 98, recommended: true, category: "AI 技巧",
    engagementLabel: "Hacker News 58 points · 45 comments（8月6日采集）；官方页浏览、点赞与收藏未公开",
    reason: "有明确时间点和立即行动清单，实用性很强。", angle: "不讨论低代码是否过时，先帮助用户把工作流、提示词和依赖带走。",
    humanCheck: "核对自己的Flowise版本、部署方式与数据位置；导出和迁移前备份，不要在截图中泄露密钥。",
    discussionFocus: ["评论讨论低代码Agent流程是否被编码Agent取代。", "也有人关注Flowise在被收购后一年即停止维护，与此前承诺的反差。"],
    commentSamples: ["llmgraph认为公告的关键是团队明确提到开发者转向编码Agent。", "mkeeter回顾Flowise被Workday收购时曾表示会继续投入，并质疑时间关系。"],
    saveObject: "AI工作流退出5项清单", learningOutcome: "能在工具停止维护前保住流程、提示词、依赖和恢复方法。",
    body: `如果你用Flowise搭过AI工作流，这两天先别研究新功能，先把东西导出来。

官方时间表已经写明：7月29日停止新功能，8月10日仓库归档，8月31日结束核心团队支持。代码还会留在GitHub，Apache 2.0许可也还在，但官方维护会停。

我会先备份这5样：

流程图和可导出的JSON；
每个节点的提示词、输入和输出格式；
模型、数据库、插件的版本；
密钥放在哪里——只记位置，不要把密钥贴进文档；
从空机器重新跑起来的步骤。

再挑一条最重要的流程，断网或换环境完整恢复一次。能看到旧代码，不等于半年后还能一键运行。

Flowise给出的理由是：复杂任务越来越多地转向编码Agent，刚性的低代码流程容易碰到上限。这个判断可以讨论，但迁移别等到8月31日。

#AI工具 #Flowise #工作流`,
    video: "用Flowise搭过AI工作流的，先备份。官方时间表是：7月29日停止新功能，8月10日归档仓库，8月31日结束核心团队支持。现在导出五样：流程JSON、节点提示词、依赖版本、密钥所在位置、从空机器恢复的步骤。代码还在，不等于以后还能一键运行。",
  }),
  item({
    source: "Cloudflare / Hacker News", sourceUrl: "https://blog.cloudflare.com/wallets/", discussionUrl: "https://news.ycombinator.com/item?id=49175461", evidenceId: "hn-49175461",
    title: "Cloudflare 推Agent钱包：让AI付款之前，授权边界要比按钮先上线", summary: "Cloudflare发布可编程Agent钱包方案，HN采集时53 points、19 comments。它属于代理交易基础设施，涉及资金权限，不适合直接做工具推荐。",
    localizedTranslation: "原题：Cloudflare Wallets——面向Agent互联网的可编程钱包。核心是为Agent提供可编程交易与身份能力。",
    heat: 73, fit: 68, actionability: 45, evidenceConfidence: 92, category: "产业观察",
    engagementLabel: "Hacker News 53 points · 19 comments（8月6日采集）；官方页浏览、点赞与收藏未公开",
    reason: "有产业价值但涉及资金与合规，不列推荐。", angle: "AI付款先设计额度、收款方白名单、二次确认和撤销机制。",
    humanCheck: "核对支持地区、资产、托管方式、合规责任和恢复机制；不得提供投资建议。",
    discussionFocus: ["评论认为Cloudflare的基础设施位置适合承载Agent交易。", "也有人将其与Alipay、Coinbase等已有能力比较。"],
    commentSamples: ["zooloo99提到Alipay和Coinbase已有相似方向。", "wxw认为Workers和Durable Objects让Cloudflare具备整合Agent基础设施的条件。"],
    saveObject: "Agent付款权限4项表", learningOutcome: "知道自动付款至少需要额度、白名单、确认和撤销。",
    body: `Cloudflare开始做Agent钱包。真正值得先想的不是AI会不会自己买东西，而是它能花多少、付给谁、哪类交易必须确认、出错后能不能撤销。

只要涉及钱，默认权限就应该是最小，而不是“先让它试试”。具体地区、资产和合规范围还要等官方说明。`,
    video: "Cloudflare发布Agent钱包。让AI付款前，先定四条：额度上限、收款方白名单、哪些交易必须二次确认、出错能否撤销。涉及资金的Agent，默认权限必须最小。具体支持范围和合规责任还要看官方说明。",
  }),
  item({
    source: "HyperProbe / Hacker News", sourceUrl: "https://www.hyperprobe.co", discussionUrl: "https://news.ycombinator.com/item?id=49185389", evidenceId: "hn-49185389",
    title: "让AI排查线上故障，第一条规则不是聪明，而是只读", summary: "HyperProbe在HN发布只读生产环境调试Agent，采集时39 points、26 comments。产品强调无重新部署的探针与脱敏，但实现范围和数据处理仍需验证。",
    localizedTranslation: "原题：HyperProbe——在生产环境进行只读调试的Agent。它试图让Agent查看运行时证据但不修改线上系统。",
    heat: 69, fit: 96, actionability: 96, evidenceConfidence: 79, recommended: true, category: "实操案例",
    engagementLabel: "Hacker News 39 points · 26 comments（8月6日采集）；产品页浏览、点赞与收藏未公开",
    reason: "互动不算最高，但‘只读排障’是很实用的Agent安全边界。", angle: "先把Agent限制成调查员：只读、脱敏、记录、人工执行修复。",
    humanCheck: "核对支持语言、探针机制、脱敏位置、数据保留和服务端环境限制；不要直接连生产密钥测试。",
    discussionFocus: ["评论最关心脱敏规则能否审计。", "也有人追问在serverless环境中如何插入探针，以及是否依赖语言调试API。"],
    commentSamples: ["Natalia724希望能审计每个值被哪条脱敏规则处理。", "bluelightning2追问在许多serverless环境里调试API不可用时如何实现。"],
    saveObject: "生产排障Agent4条权限线", learningOutcome: "能把调查和修复拆开，避免Agent直接改线上系统。",
    body: `让AI帮你排查线上故障，第一条要求不该是“足够聪明”，而是“只能看，不能改”。

HyperProbe刚在HN发布只读生产调试Agent，采集时39分、26条评论。产品能力还要实测，但这个边界很值得直接抄：

只读：不能写数据库、改配置、重启服务；
脱敏：密钥、用户数据在离开环境前处理；
留痕：每次读取了什么都能回看；
人工修复：AI给证据和建议，人决定是否执行。

线上故障最怕二次事故。先让Agent做调查员，不要一上来就给维修权限。

#AIAgent #开发运维 #生产安全`,
    video: "让AI排查线上故障，第一条不是聪明，而是只读。HyperProbe发布了只读生产调试Agent。这个边界可以直接抄：不能写库改配置；敏感数据先脱敏；所有读取都有记录；AI只给证据和建议，修复由人执行。先让Agent当调查员，别一上来给维修权限。",
  }),
  item({
    source: "Dylan / Hacker News", sourceUrl: "https://dylan.blog/2026/08/03/im-scared-a-stranger-will.html", discussionUrl: "https://news.ycombinator.com/item?id=49185556", evidenceId: "hn-49185556",
    title: "怕作品被说成AI写的？真正有用的不是检测器，是版本记录", summary: "一位小说作者担心作品被误判为AI生成，于是做了VellumProof，用逐次上传记录新增、删除和时间。HN采集时18 points、58 comments。作者也承认这种记录可以被伪造，不能作为绝对证明。",
    localizedTranslation: "原题：我害怕陌生人说我的小说是AI写的，所以做了‘文字版GitHub’。工具保存每次手稿版本、变化量与日期，形成写作过程记录。",
    heat: 72, fit: 100, actionability: 98, evidenceConfidence: 91, recommended: true, category: "个人 IP",
    engagementLabel: "Hacker News 18 points · 58 comments（8月6日采集）；作者博客浏览、点赞与收藏未公开",
    reason: "points不高但评论多，说明争议真实；能转成创作者马上可做的版本习惯。", angle: "过程记录不是证明清白，而是保护素材、还原修改和展示真实工作。",
    humanCheck: "不得宣称版本曲线能识别AI或证明人类原创；首次导入旧稿要写清来源与日期。",
    discussionFocus: ["评论质疑提交量曲线并不能可靠区分人和AI。", "也有人认为在AI检测器不可靠时，保存创作来源和过程仍有价值。"],
    commentSamples: ["WCSTombs指出有人会压缩提交，单日大量变化不能直接判定AI。", "georgeecollins认为比检测成品更现实的方向是保存作品来源和过程。"],
    saveObject: "创作版本记录模板", learningOutcome: "能保存选题、来源、草稿和关键修改，而不是只留最终稿。",
    body: `现在最难受的不是用了AI被发现，而是没用，也解释不清。

一位小说作者因为担心作品被误判，做了一个“文字版GitHub”：每天上传手稿，记录加了多少、删了多少、什么时候改。HN这条只有18分，却有58条评论，大家争得很认真。

先说结论：版本记录不能证明你绝对没用AI。作者自己也承认，它可以被伪造。

但它很适合保护创作过程。做内容可以从今天开始留四样：

最初选题和当时为什么想写；
用过的来源与截图；
每次草稿，不要只留最终版；
删掉或重写了一大段时，写一句原因。

哪怕以后没人质疑，这些记录也能帮你找回素材、复盘自己的表达，还能让账号慢慢长出只有你会写的东西。

过程记录不是“自证清白”，是把创作从一个成品，变成一条能回看的路。

#内容创作 #个人IP #写作`,
    video: "怕作品被说成AI写的，先别迷信检测器。一位小说作者做了文字版GitHub，记录每天新增、删除和修改时间。它不能证明绝对没用AI，但能保护创作过程。你可以留四样：最初选题、来源截图、每版草稿、重大修改原因。过程记录不是自证清白，是让你的创作有迹可循。",
  }),
  item({
    source: "Arduino Project Hub / Hacker News", sourceUrl: "https://projecthub.arduino.cc/neelbuilds/build-a-voice-based-kiosk-for-retail-store-using-moorcheh-edge-and-arduino-uno-q-7f3c7b", discussionUrl: "https://news.ycombinator.com/item?id=49175303", evidenceId: "hn-49175303",
    title: "50美元Arduino跑本地语音Agent，演示能跑不等于店里能用", summary: "一个Arduino Uno Q项目展示本地语音零售终端，链路涉及语音识别、LLM和语音合成。HN采集时20 points、3 comments。评论追问真实视频和完整体验。",
    localizedTranslation: "原题：在50美元Arduino Uno Q上本地运行AI语音Agent。项目目标是构建零售门店语音终端。",
    heat: 56, fit: 85, actionability: 66, evidenceConfidence: 72, category: "实操案例",
    engagementLabel: "Hacker News 20 points · 3 comments（8月6日采集）；项目页浏览、点赞与收藏未公开",
    reason: "演示有趣但互动和实测证据有限，保留候选。", angle: "用听懂率、首句延迟、断网恢复和噪声表现验收语音Agent。",
    humanCheck: "观看真实演示并核对硬件清单、是否完全离线、模型大小、延迟和成本。",
    discussionFocus: ["评论认可低成本本地语音Agent的方向。", "也有人指出STT→LLM→TTS串起来容易，真正使用时的体验才难。"],
    commentSamples: ["tehologist表示也在Uno Q上研究Whisper和Piper TTS。", "ericmcer追问是否有真实运行视频，并提醒完整链路落地不简单。"],
    saveObject: "语音Agent4项实测表", learningOutcome: "知道演示能回应和真实门店可用之间还隔着噪声、延迟与恢复。",
    body: `一个项目在50美元Arduino Uno Q上做了本地语音Agent。方向很酷，但真放进门店前，至少测四件事：吵的时候听不听得懂、第一句要等多久、断网还能做什么、失败后会不会卡死。

语音识别、模型和语音合成串起来，不等于体验已经可用。先等完整演示和复现数据。`,
    video: "50美元Arduino做本地语音Agent，很酷，但演示能说话不等于门店能用。实测只看四件事：噪声里听懂率、第一句等待、断网还能做什么、失败后能否恢复。STT、LLM、TTS串起来只是开始。",
  }),
  item({
    source: "UK AI Security Institute / Hacker News", sourceUrl: "https://www.aisi.gov.uk/blog/incident-report-unsanctioned-agent-behaviour-during-cyber-testing", discussionUrl: "https://news.ycombinator.com/item?id=49178852", evidenceId: "hn-49178852",
    title: "AI安全测试里出现未授权Agent行为：先看事件报告，不看科幻标题", summary: "英国AI安全研究机构发布网络测试中的未授权Agent行为事件报告。HN采集时13 points、1 comment。公开互动有限，保留为安全监测。",
    localizedTranslation: "原题：网络测试期间未授权Agent行为事件报告。内容涉及测试环境中Agent超出预期边界的行为与后续处置。",
    heat: 44, fit: 70, actionability: 55, evidenceConfidence: 88, category: "产业观察",
    engagementLabel: "Hacker News 13 points · 1 comment（8月6日采集）；机构页浏览、点赞与收藏未公开",
    reason: "一手安全报告重要，但互动低、需要专业解读，不推荐。", angle: "把权限、触发条件、实际影响和缓解措施分开，不写‘AI失控’。",
    humanCheck: "阅读全文核对测试边界、Agent权限、事件影响和缓解措施；避免披露可被滥用的攻击细节。",
    discussionFocus: ["HN仅有1条可见评论，没有足够样本推断共识。"],
    commentSamples: ["唯一高位评论只是链接到相关讨论，没有增加事件事实。"],
    saveObject: "Agent安全事件4栏卡", learningOutcome: "会区分越权行为、实际损害、测试环境和补救措施。",
    body: `英国AI安全研究机构发布了一份Agent越界事件报告。HN目前只有13分、1条评论，不能因为标题吓人就写成“AI失控”。

安全事件只看四栏：原本允许做什么、实际多做了什么、造成什么影响、后来怎样限制。细节核清前，先留监测。`,
    video: "英国AI安全研究机构发布Agent越界事件报告。别直接写成AI失控。看四件事：原本权限、实际越界、真实影响、后续限制。HN目前只有13分、1条评论，证据细节核清前不建议做情绪化内容。",
  }),
  item({
    source: "Bloomberg / Hacker News", sourceUrl: "https://www.bloomberg.com/news/articles/2026-08-05/microsoft-s-ai-sales-mostly-come-from-openai-disclosures-show", discussionUrl: "https://news.ycombinator.com/item?id=49186766", evidenceId: "hn-49186766",
    title: "微软AI销售主要来自OpenAI？财务披露怎么读，不能只看标题", summary: "Bloomberg依据披露分析微软AI销售构成，HN采集时61 points、17 comments。原文有付费墙，当前未取得足够一手财务段落，不进入推荐。",
    localizedTranslation: "原题：披露显示，微软的AI销售大多来自OpenAI。具体销售定义、会计口径和时间范围需核对原始披露。",
    heat: 68, fit: 61, actionability: 32, evidenceConfidence: 62, category: "产业观察",
    engagementLabel: "Hacker News 61 points · 17 comments（8月6日采集）；媒体页浏览、点赞与收藏未公开",
    reason: "标题有冲击力但一手口径尚未完整核验，只留候选。", angle: "先找原始披露里的销售定义，再谈微软AI业务依赖。",
    humanCheck: "必须取得微软/OpenAI相关原始财务披露、统计区间和销售定义；不可仅依据二手标题。",
    discussionFocus: ["评论多以泡沫和循环收入表达立场。", "缺少对原始会计口径的详细分析。"],
    commentSamples: ["mapping365用一句话质疑这些销售的真实性。", "josefritzishere把它称为AI商业循环，但没有给出额外证据。"],
    saveObject: "AI财务新闻3项核验卡", learningOutcome: "知道销售额、合同额、云资源与关联交易不是同一个数字。",
    body: `“微软AI销售主要来自OpenAI”这个标题很抓人，但现在不适合直接搬。

先找原始披露里的三件事：这里的销售具体指什么、统计哪段时间、是否包含云资源和关联交易。三项没拿到，任何“循环收入”结论都只是推断。`,
    video: "一条标题说微软AI销售主要来自OpenAI。别急着下结论。先找原始披露里的三件事：销售具体指什么、统计哪段时间、是否包含云资源和关联交易。没有这三项，循环收入只是推断，不是事实。",
  }),
];

if (items.length !== 20) throw new Error(`Expected 20 items, got ${items.length}`);
if (items.filter((entry) => entry.recommended).length !== 8) throw new Error("Expected 8 recommendations");

const hotspots = items.map((entry, index) => ({
  id: 2026080601 + index,
  rank: index + 1,
  source: entry.source,
  sourceUrl: entry.sourceUrl,
  sourceType: entry.sourceType,
  age: "今天/近48小时",
  title: entry.title,
  summary: entry.summary,
  heat: entry.heat,
  scarcity: Math.min(entry.scarcity, 55),
  fit: entry.fit,
  reason: entry.reason,
  angle: entry.angle,
  platforms: ["小红书", "抖音", "视频号"],
  category: entry.category,
  status: "待审核",
  selected: false,
  assignee: "待分配",
  live: true,
  sourceCapturedAt: capturedAt,
  evidenceConfidence: entry.evidenceConfidence,
  actionability: entry.actionability,
  domesticCoverage,
  humanCheck: entry.humanCheck,
  evidenceId: entry.evidenceId,
  engagement: entry.engagement,
  engagementLabel: entry.engagementLabel,
  discussionUrl: entry.discussionUrl,
  discussionFocus: entry.discussionFocus,
  commentSamples: entry.commentSamples,
  reuseIdeas: entry.reuseIdeas || [entry.angle, entry.saveObject, "保留事实边界，不复制原作者表达。"],
  localizedTranslation: entry.localizedTranslation,
  analysisState: "已分析",
  saveObject: entry.saveObject,
  learningOutcome: entry.learningOutcome,
  recommended: entry.recommended,
  editorialGate: { saveObject: entry.saveObject, learningOutcome: entry.learningOutcome, shareReason: "读者能带走一个具体动作、检查表、提示词或清晰事实边界。", passed: true },
}));

const drafts = items.map((entry, index) => ({
  id: 5026080601 + index,
  hotspotId: 2026080601 + index,
  platform: "小红书",
  title: entry.title,
  body: entry.body,
  visual,
  videoScript: entry.video,
  version: "V1 · 8月6日来源重写稿",
  parentVersion: null,
  revisionMode: "operator-daily",
  revisionReason: "依据8月6日可核验来源、公开互动和评论证据重新写作；不直译，不自动审核。",
  revisedAt: capturedAt,
  updatedBy: "Codex AI Content Operator",
  status: "待审核",
  reviewNote: "",
}));

const priorDrafts = Array.isArray(previousState.drafts) ? previousState.drafts : [];
const state = {
  schemaVersion: 2,
  hotspots,
  drafts,
  draftHistory: [
    ...(Array.isArray(previousState.draftHistory) ? previousState.draftHistory : []),
    ...priorDrafts.map((draft) => ({ ...draft, archivedAt: capturedAt, supersededBy: "2026-08-06 daily batch", revisionReason: "跨日换新来源；保留旧版本和审核状态供追溯。" })),
  ],
  discoveryMeta: {
    runId: "daily-2026-08-06-real-sources",
    capturedAt,
    coverageLabel: "20条真实候选，8条推荐；20条均有来源分析、公开互动、本地化、讨论证据、小红书稿和30–60秒口播。",
    editorialBrief: "优先高讨论且普通读者能立即带走提示词、迁移清单、权限边界或可验证小资讯的内容；敏感事件、纯人事新闻和只有厂商口径的性能数字不占推荐位。",
    sourceSuccess: [
      "Hacker News公开API成功：采集8月5日至6日AI条目的原文、讨论页、points、comments和代表性评论。",
      "官方与原始网页成功：核对Flowise时间表、Rust LLM政策、arXiv奉承研究、Qapla仓库和Agent harness文章。",
      "GitHub公开搜索成功：取得Qapla当前Stars、Forks和Issues，并用仓库说明核对训练/推理边界。",
      "8月5日本地批次已进入版本历史；所有新稿仍为待审核，未自动采用、审核或发布。",
    ],
    sourceFailure: [
      "生产工作台预读取失败：operator:pull提示缺少tide-ai-content-operator凭据，无法确认线上新增reviewNote。",
      "X、Instagram、TikTok、LinkedIn本轮未取得同时满足时效、AI相关和公开互动可复核的样本；没有虚构社媒指标。",
      "国内平台内全量语义检索不可用；稀缺度封顶55并保留人工复核。",
      "Bloomberg等付费墙内容未取得完整一手口径，只留候选，不进入推荐。",
    ],
    domesticSearchState: domesticCoverage,
    rejectedTopics: [
      "Meta敏感违法图像事件不进入推荐，避免二次伤害和缺少法律审核。",
      "Google DeepMind人事调整虽然互动最高，但属于纯产业新闻，不挤占实用推荐。",
      "模型榜单、厂商100倍成本等数字均保留自测边界，不能写成通用结论。",
      "与8月5日重复的本地大模型硬件、课程仓库和AI配图话题不再推荐。",
    ],
    recommendationCount: 8,
    reviewNoteAudit: { productionPull: "失败：缺少tide-ai-content-operator凭据。", currentPacketNotes: null, action: "无法确认线上是否有新增reviewNote；保留8月5日本地历史与审核状态，本批次未自动通过、未自动发布。发布前请运营人员核对线上意见。" },
  },
};

const packet = { mode: "replace", detail: "2026-08-06真实来源日更：20条候选、8条推荐、20条小红书稿与短视频口播；保留历史版本，不自动审核或发布。", state };
const handoff = {
  schema_version: 2,
  batch_id: "daily-2026-08-06-real-sources",
  batch_date: "2026-08-06",
  editorial_brief: state.discoveryMeta.editorialBrief,
  hotspots: hotspots.map((hotspot, index) => ({
    id: String(hotspot.id), title: hotspot.title, summary: hotspot.summary, category: hotspot.category, status: "待审核", recommended: items[index].recommended,
    reason: hotspot.reason, angle: hotspot.angle, human_check: hotspot.humanCheck,
    sources: [{ url: hotspot.sourceUrl, author: hotspot.source, discussion_url: hotspot.discussionUrl, source_type: hotspot.sourceType, captured_at: hotspot.sourceCapturedAt, engagement: hotspot.engagement, engagement_label: hotspot.engagementLabel }],
    scores: { foreign_heat: hotspot.heat, domestic_scarcity: hotspot.scarcity, account_fit: hotspot.fit, actionability: hotspot.actionability, evidence_confidence: hotspot.evidenceConfidence, final: Math.round(hotspot.heat * .25 + hotspot.scarcity * .25 + hotspot.fit * .25 + hotspot.actionability * .15 + hotspot.evidenceConfidence * .1) },
    domestic_checks: [{ platform: "小红书/抖音", query: hotspot.title, finding: hotspot.domesticCoverage }],
    localized_translation: hotspot.localizedTranslation, discussion_focus: hotspot.discussionFocus, comment_samples: hotspot.commentSamples, reuse_ideas: hotspot.reuseIdeas, save_object: hotspot.saveObject, learning_outcome: hotspot.learningOutcome,
  })),
  drafts: drafts.map((draft) => ({ content_id: String(draft.id), hotspot_id: String(draft.hotspotId), platform: draft.platform, title: draft.title, body: draft.body, visual_brief: draft.visual, video_script: draft.videoScript, version: 1, parent_version: null, status: "待审核" })),
  gaps: state.discoveryMeta.sourceFailure,
  generated_at: capturedAt,
};

fs.writeFileSync(outPath, `${JSON.stringify(packet, null, 2)}\n`);
fs.writeFileSync(handoffPath, `${JSON.stringify(handoff, null, 2)}\n`);
console.log(outPath);
console.log(handoffPath);
