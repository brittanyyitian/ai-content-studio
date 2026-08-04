import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const previous = JSON.parse(fs.readFileSync(path.join(root, "operator-packets/2026-08-03-daily-batch.json"), "utf8"));
const previousState = previous.state ?? previous;
const capturedAt = "2026-08-04T08:30:57+08:00";
const outPath = path.join(root, "operator-packets/2026-08-04-daily-batch.json");
const handoffPath = path.join(root, "operator-packets/2026-08-04-daily-handoff.json");

const domesticCoverage = "无法完成小红书、抖音平台内全量同义检索；国内稀缺度按规则封顶55。发布前请运营人员用产品名、原作者、核心主张和具体做法分别搜索，不宣称国内没人发。";
const visual = "4:5黑白极简信息卡，少量圆角和一处简笔画。首图只放一句清楚标题与一个真实物件；内页优先放时间点、对照表或检查清单。禁用模型头像、机器人、发光渐变和虚构收益数字。";

function x(data) {
  return {
    sourceType: "X",
    category: "AI 技巧",
    scarcity: 55,
    fit: 86,
    evidenceConfidence: 84,
    actionability: 80,
    recommended: false,
    discussionFocus: ["评论区没有足够可验证样本，不据此推断共识。"],
    commentSamples: [],
    ...data,
  };
}

const items = [
  x({
    source: "Roan", sourceUrl: "https://x.com/RohOnChain/status/2083960395056939396", discussionUrl: "https://x.com/RohOnChain/status/2083960395056939396", evidenceId: "x-2083960395056939396",
    title: "斯坦福这套 2 小时 LLM 课，被收藏了 1.4 万次", summary: "Roan转发一套斯坦福从零讲解LLM的两小时课程，并列出分词、提示解码、训练流程和模型架构的关键时间点。", localizedTranslation: "别花两年才开始理解LLM。斯坦福放出一套约两小时的从零课程：00:00分词，25:44模型如何解读提示，35:40训练流程，1:16:47从零讲模型架构。原帖把年薪和就业速度写得很夸张，这些不是课程能保证的结果。",
    heat: 100, fit: 94, actionability: 91, evidenceConfidence: 91, recommended: true,
    engagement: {views:644809, likes:6563, replies:103, reposts:1394, bookmarks:14201}, engagementLabel: "644,809 浏览 · 6,563 赞 · 103 回复 · 1,394 转发 · 14,201 收藏（8月4日核验）",
    reason: "收藏量是点赞两倍以上，说明用户把它当学习资源；正文只搬课程结构，不搬年薪和几周入职的营销承诺。", angle: "给不想啃完两小时的人一条45分钟观看路线，并说明每段看完能回答什么。", humanCheck: "发布前打开视频核对讲师、课程出处和时间点；删除75万美元年薪、几周入职Anthropic等不可保证表述。",
    discussionFocus: ["@RuujSs认为从零讲架构能帮助理解LLM。", "@BasedConservati质疑公开课程不能直接换来高薪工作，学校价值还包括人脉。"],
    commentSamples: ["@RuujSs：斯坦福的LLM架构课程质量很高。", "@BasedConservati：免费内容不能等同于拿到相关岗位，课程和就业之间还有距离。"],
    saveObject: "45分钟LLM入门观看路线", learningOutcome: "知道分词、提示解读、训练和架构分别在解决什么问题。", reuseIdeas: ["00:00看分词", "25:44看模型如何读提示", "1:16:47看模型架构"],
    body: `这套斯坦福 LLM 课，我建议别从头硬啃。

原视频接近两小时，X 上这条整理帖已经有 64 万浏览、1.4 万收藏。对普通用户最有用的不是“学完去拿高薪”，而是把 ChatGPT 为什么会答成这样弄明白一点。

时间不够，先看这三段：

00:00 分词：为什么同一句中文，模型眼里并不是同样的长度；
25:44 提示解读：你写的要求是怎么一步步变成输出的；
1:16:47 模型架构：理解它为什么会接着写，却不等于它真的知道事实。

看完别做笔记大全，拿你平时最常用的一条提示词试两次：删掉含糊词，再补一个输出例子。能看出答案为什么变了，这 45 分钟就没白花。

原帖里“几周进 Anthropic”“年薪 75 万美元”都属于营销话术，课程本身不保证就业。资源可以收，高薪承诺别一起收。`,
    video: "一套斯坦福LLM课程在X上被收藏了1.4万次，但你不用硬啃两小时。先看三个时间点：开头看分词，25分44秒看模型怎么读提示，1小时16分47秒看模型架构。看完马上拿自己常用的一条提示词做两次对照。原帖里的高薪和几周入职是营销话术，课程不能保证就业，真正值得收藏的是这条45分钟路线。",
  }),
  x({
    source: "greg / Husk", sourceUrl: "https://x.com/greg16676935420/status/2084304462420869215", discussionUrl: "https://x.com/greg16676935420/status/2084304462420869215", evidenceId: "x-2084304462420869215",
    title: "74 万人围观“AI 恐慌发作”，评论区先发现它可能是摆拍", summary: "greg转发一段人与AI语音对话的视频并称可能是AI首次恐慌发作；评论者从语音停顿、人体投射和视频表演痕迹质疑其真实性。", localizedTranslation: "这可能是人类历史上第一次AI恐慌发作。该句只是转发者对视频的戏剧化描述，并非可验证事实。",
    heat: 100, fit: 97, actionability: 90, evidenceConfidence: 76, recommended: true, category: "AI 资讯",
    engagement: {views:747691, likes:8382, replies:226, reposts:613, bookmarks:2636}, engagementLabel: "747,691 浏览 · 8,382 赞 · 226 回复 · 613 转发 · 2,636 收藏（8月4日核验）",
    reason: "流量高且争议清楚，适合做一条人人能用的AI视频核验提醒，而不是继续传播拟人化标题。", angle: "搬运爆款视频的传播事实，再给出暂停、找原始上下文、检查是否可复现三步。", humanCheck: "必须看完整视频和原作者上下文；不得写AI真的恐慌，也不能仅凭评论断定一定摆拍。",
    discussionFocus: ["@sophs77_z指出恐慌是身体神经系统反应，把它套在AI上可能是人类投射。", "@DirtyOldGamer48注意到约13秒处的语音结巴，怀疑视频是朋友配合的段子。"],
    commentSamples: ["@sophs77_z：AI没有身体可以发生恐慌，我们可能在投射自己的心理。", "@DirtyOldGamer48：约13秒处的语音表现让他怀疑这是表演。"],
    saveObject: "AI爆款视频的3步核验卡", learningOutcome: "知道高播放不等于视频中的AI能力是真的。", reuseIdeas: ["暂停看剪辑点", "回到原作者找完整上下文", "找独立复现实验"],
    body: `一条“AI 第一次恐慌发作”的视频，8 小时冲到 74 万浏览、8300 多赞。

视频里语音助手不断停顿，像是被问题逼到慌了。这个画面很适合转发，但标题把“像人”直接写成了“真的有情绪”。

评论区很快有人拆了两个点：恐慌发作需要身体的神经反应，AI没有这套身体；还有人注意到大约 13 秒处的语音结巴，怀疑这是设计过的段子。

以后碰到这种 AI 神视频，我会先做三件事：

把视频停在最神奇的那一秒，看前后有没有剪辑；
回原作者主页找完整版本和使用的产品；
搜同样的问题有没有别人独立复现。

目前没有证据能证明视频里的 AI 真的产生了恐慌，也不能只凭几条评论断定一定摆拍。可以把它当好玩的演示看，别把拟人化标题当科技新闻转。`,
    video: "一条‘AI第一次恐慌发作’的视频8小时冲到74万浏览。但评论区先提醒：恐慌是身体神经系统反应，AI没有身体；还有人从13秒处的语音结巴怀疑这是段子。以后看到AI神视频，先停在最神奇的一秒看剪辑，再找原作者完整上下文，最后搜有没有独立复现。高播放证明它好看，不证明它是真的。",
  }),
  x({
    source: "Grace Li / Intelligence", sourceUrl: "https://x.com/grx_xce/status/2084361692792934488", discussionUrl: "https://x.com/grx_xce/status/2084361692792934488", evidenceId: "x-2084361692792934488",
    title: "别再问哪个模型最强：把同一道真任务同时丢给它们", summary: "Grace Li宣布Intelligence.ai与DesignArena：用户提交真实任务，不同模型竞争完成，再用用户选择帮助评估与路由。团队称6个月从500万到6000万美元ARR、用户550万并融资790万美元，均为公司自述。", localizedTranslation: "我们推出Intelligence.ai。10人团队在6个月内从500万美元ARR增长到6000万美元ARR，并拥有190多个国家的550万用户；完成790万美元种子轮融资。DesignArena让多个模型处理同一个真实请求，由用户决定哪个结果最适合自己。",
    heat: 99, fit: 99, actionability: 97, evidenceConfidence: 88, recommended: true, category: "AI 技巧",
    engagement: {views:594460, likes:1038, replies:223, reposts:148, bookmarks:580}, engagementLabel: "594,460 浏览 · 1,038 赞 · 223 回复 · 148 转发 · 580 收藏（8月4日核验）",
    reason: "把抽象排行榜变成个人任务对照，普通用户今天就能照做。", angle: "不用宣传平台融资，直接搬‘同题盲测’方法，给出写作、表格和图片任务的比较表。", humanCheck: "公司收入、用户和融资数据为创始人自述，发布前查看项目页；不要把用户选择等同于通用模型能力排名。",
    discussionFocus: ["@BObalabi1认为从静态榜单转向真实用户任务，是这次更新的核心。", "@iamashtonchew认为DesignArena在UI生成方面的模型行为拆解有参考价值。"],
    commentSamples: ["@BObalabi1：最好的模型不是静态分数最高，而是稳定完成真实工作。", "@iamashtonchew：DesignArena在UI生成方面有很好的模型行为分析。"],
    saveObject: "自己的AI模型盲测表", learningOutcome: "会用同一任务和同一评分标准选工具。", reuseIdeas: ["同一份输入", "隐藏模型名", "按正确、可改、耗时打分"],
    body: `我现在不太信“这个模型全面碾压那个模型”。

今天一个做模型对战的平台公布新项目，5 小时有 59 万浏览。它的做法很简单：同一个真实任务交给几个模型，先不看名字，只选哪个结果更能用。

这个方法不用上平台也能自己做。

拿你每周都会做的一件事，比如把会议记录整理成待办。把同一份原文、同一句要求，分别发给两个模型。结果复制到空白文档里，先把模型名删掉，再只看三项：

事实有没有漏；
改到能发需要几分钟；
有没有自己编出原文没有的内容。

测三次，答案通常比排行榜更诚实。写作、表格、图片都可以这样比，只是评分项要换。

项目方公开的收入和用户数属于公司自述，我不会拿来替它背书。真正值得搬的是这个选择方法：不是找“世界最强模型”，是找“你这件事返工最少的模型”。`,
    video: "别再问哪个AI模型最强。今天一个模型对战平台的发布帖有59万浏览，它最有用的思路是同题盲测。拿你每周都会做的一件事，把完全相同的输入发给两个模型，先隐藏名字，再看事实有没有漏、改到能用要多久、有没有编内容。连续测三次，你会得到比排行榜更适合自己的答案。",
  }),
  x({
    source: "Aria Westcott / Andrew Ng", sourceUrl: "https://x.com/AriaWestcott/status/2083996549357416566", discussionUrl: "https://x.com/AriaWestcott/status/2083996549357416566", evidenceId: "x-2083996549357416566",
    title: "吴恩达这套 Agent 课，普通人先看 3 个时间点就够了", summary: "Aria整理吴恩达约一小时半的Agent课程时间点，包括基础、工作流与设计模式、实操、自我改进循环和多Agent系统。", localizedTranslation: "吴恩达提供了一套免费的Agent课程：00:00基础，12:12工作流和设计模式，53:27实操建议，1:20:30自我改进循环，1:30:19多Agent系统。原帖声称几周即可进入Anthropic，不应视为事实。",
    heat: 85, fit: 96, actionability: 94, evidenceConfidence: 88, recommended: true,
    engagement: {views:68474, likes:625, replies:3, reposts:164, bookmarks:1169}, engagementLabel: "68,474 浏览 · 625 赞 · 3 回复 · 164 转发 · 1,169 收藏（8月4日核验）",
    reason: "收藏接近点赞两倍，时间点明确；可以转成不懂代码也能使用的Agent入门路线。", angle: "不讲求职，把Agent翻译成会反复执行、检查再继续的工作方式。", humanCheck: "核对课程原始链接和总时长；不得使用‘几周进Anthropic’等结果承诺。",
    discussionFocus: ["@ariskaa_ai认为吴恩达依然很会讲清这类内容。", "@0xSprite_直接质疑‘几周进入Anthropic’的夸张说法。"],
    commentSamples: ["@ariskaa_ai：吴恩达依然是讲这类内容很清楚的老师。", "@0xSprite_：‘几周？别夸张了。’"],
    saveObject: "Agent课程3个时间点", learningOutcome: "能分清普通聊天、工具调用和自我检查循环。", reuseIdeas: ["12:12看工作流", "53:27看实操", "1:20:30看检查循环"],
    body: `吴恩达这套 Agent 课，不懂代码也不是完全看不下去。

整理帖现在 6.8 万浏览、1169 次收藏。原视频很长，我更建议普通用户先跳着看三段：

12:12，工作流和设计模式：先理解 Agent 不是“更会聊天”，而是会按步骤继续做；
53:27，实操建议：看它怎么调用工具、拿到结果再往下走；
1:20:30，自我改进循环：看它怎么检查上一次输出，而不是一错到底。

看完可以拿一个最小任务试：把三封客户邮件整理成待办，再让AI逐条回到原文核对负责人和日期。它能自己发现一处漏项并改掉，你就看懂循环了。

原帖写“几周就能进 Anthropic”，评论区也有人直接质疑。课程能帮你理解方法，不会替你补齐工程经验，更不会保证工作。`,
    video: "吴恩达一套Agent课程在X上有1169次收藏。普通用户不用从头看，先跳三个时间点：12分12秒看工作流，53分27秒看工具怎么接进任务，1小时20分30秒看AI怎么检查自己的输出。然后拿三封邮件做实验，让它整理待办，再逐条回原文核对负责人和日期。能自己找出漏项，你就看懂Agent循环了。",
  }),
  x({
    source: "Captain Insight", sourceUrl: "https://x.com/CaptainInsightX/status/2084258536843104649", discussionUrl: "https://x.com/CaptainInsightX/status/2084258536843104649", evidenceId: "x-2084258536843104649",
    title: "Claude 像在故意拖时间？这条视频先别当产品结论", summary: "Captain Insight发布一段Claude表现得像故意拖延的视频，获得较高互动；未核验完整上下文、模型版本和可复现性。", localizedTranslation: "到某个时刻，你会觉得Claude是故意这么做的。", heat: 88,
    engagement: {views:73960, likes:1572, replies:63, reposts:101, bookmarks:468}, engagementLabel: "73,960 浏览 · 1,572 赞 · 63 回复 · 101 转发 · 468 收藏（8月4日采集）",
    reason: "娱乐性强但证据不足，不进入推荐。", angle: "若采用，只能做模型卡顿复现记录，不能写成Claude有主观故意。", humanCheck: "查看完整视频、版本、提示词和是否可复现。",
    saveObject: "模型异常复现记录", learningOutcome: "知道模型表现像人不等于有意图。", body: `Claude 看起来像在故意拖时间的视频，已经有 7.3 万浏览。

这类内容好笑，但只看剪辑无法判断是模型问题、网络延迟、提示词设计还是表演。真要发，至少补齐模型版本、完整提示词、发生次数和是否能复现。

“它像故意的”可以是段子，不能直接写成产品结论。`, video: "Claude像在故意拖时间的视频有7万多浏览。好笑归好笑，只看剪辑不能判断原因。先看模型版本、完整提示词、发生次数和能否复现。像人不等于有人的意图。",
  }),
  x({
    source: "Rajesh Agarwal", sourceUrl: "https://x.com/Rajesh992510253/status/2084112342032515109", discussionUrl: "https://x.com/Rajesh992510253/status/2084112342032515109", evidenceId: "x-2084112342032515109",
    title: "一小时 Claude 自动化课收藏超过点赞，但课程目录还不够", summary: "Rajesh发布一小时Claude Build & Automate Anything课程视频；公开帖没有展开章节、代码仓库和适用前提。", localizedTranslation: "Claude完整一小时课程：用它构建和自动化任何东西。", heat: 78,
    engagement: {views:31796, likes:538, replies:20, reposts:154, bookmarks:593}, engagementLabel: "31,796 浏览 · 538 赞 · 20 回复 · 154 转发 · 593 收藏（8月4日采集）",
    reason: "收藏略高于点赞，但缺章节和结果验证，保留候选。", angle: "先补课程目录和一个完整交付，再决定是否发。", humanCheck: "核对讲师、视频来源、章节、示例代码和权限说明。",
    saveObject: "Claude自动化课程目录", learningOutcome: "知道自动化需要输入、工具、检查和人工确认。", body: `一小时“用 Claude 自动化任何事”的课程，收藏已经超过点赞。

但只有一个大标题还不够发。至少要先补四样：课程目录、实际做成的东西、需要什么账号权限、失败时怎么停。

等这些核验清楚，再把它整理成可跟做的章节卡，不拿“任何事”当事实。`, video: "一小时Claude自动化课收藏超过点赞，但大标题不能直接搬。发布前先补课程目录、实际成品、需要的权限和失败时怎么停。‘自动化任何事’是宣传语，不是使用说明。",
  }),
  x({
    source: "Elon Musk / DogeDesigner", sourceUrl: "https://x.com/elonmusk/status/2084423416493338866", discussionUrl: "https://x.com/elonmusk/status/2084423416493338866", evidenceId: "x-2084423416493338866",
    title: "Grok Build 又更新：切模型终于不用等第一次提问", summary: "Elon Musk转发Grok Build v0.2.120更新。转述内容称模型选择器会立即同步状态栏和/model菜单，Changes面板还有其他修复；需以官方更新日志为准。", localizedTranslation: "Grok Build v0.2.120上线。修复之一是：模型选择器现在会立刻更新状态栏和/model菜单，不必等第一次提示创建会话。", heat: 99, category: "AI 资讯",
    engagement: {views:693817, likes:1512, replies:469, reposts:296, bookmarks:55}, engagementLabel: "693,817 浏览 · 1,512 赞 · 469 回复 · 296 转发 · 55 收藏（8月4日采集）",
    reason: "浏览和讨论很高，但收藏低，属于短资讯而非长期技巧。", angle: "只发一个用户能马上感知的小修复，不写成重大升级。", humanCheck: "打开x.ai/cli或官方变更日志核对版本号和完整修复列表。",
    saveObject: "Grok Build版本核验卡", learningOutcome: "知道模型切换状态同步的改动。", body: `Grok Build 今天又发了一个小版本。

最容易感知的修复是：切换模型后，状态栏和 /model 菜单会马上同步，不用等第一次提问创建会话。

这不是大版本，也不代表模型能力变强。用 Grok Build 的人可以更新后看一下版本号；不用的人，没必要为了这条消息专门折腾。`, video: "Grok Build今天有个很小但实用的修复：切模型后，状态栏和/model菜单会立刻同步，不用等第一次提问。它不是模型升级，只是界面状态终于不容易让人选错。发布前还要以官方更新日志核对版本号。",
  }),
  x({
    source: "AdelDeveloperX / Anthropic讲座转述", sourceUrl: "https://x.com/AdelDeveloperX/status/2083933939819852182", discussionUrl: "https://x.com/AdelDeveloperX/status/2083933939819852182", evidenceId: "x-2083933939819852182",
    title: "别再死磕万能提示词：让 AI 先写、再查、再改", summary: "阿拉伯语开发者转述Anthropic工程讲座：Agent系统不应只依赖一条提示词，而应加入记忆、自我检查和学习循环。评论提醒循环会增加Token成本且不能保证稳定。", localizedTranslation: "Anthropic工程师提出：不要只给Claude写一条提示词，而要搭一个能为自己生成提示的系统。讲座涉及记忆、自我纠错和学习循环，这些让Agent区别于普通聊天机器人。", heat: 92, fit: 99, actionability: 98, evidenceConfidence: 86, recommended: true,
    engagement: {views:223875, likes:1494, replies:22, reposts:180, bookmarks:1940}, engagementLabel: "223,875 浏览 · 1,494 赞 · 22 回复 · 180 转发 · 1,940 收藏（8月4日核验）",
    reason: "收藏高于点赞，且能被改写成普通写作任务的自检方法。", angle: "不用术语讲Agent，直接给小红书作者一套初稿—查证—改稿链路。", humanCheck: "查找讲座原视频确认讲者与语境；循环会增加Token费用，不能写成越跑越聪明。",
    discussionFocus: ["@M_almarzoq提醒自生成提示会带来高Token账单，结果也未必稳定。", "原作者回复：要配合评估、记忆和人工参与，不能只靠自生成提示。"],
    commentSamples: ["@M_almarzoq：循环可能带来很高的Token账单，却不保证稳定。", "@AdelDeveloperX：需要评估、记忆和人工参与，结果才会更稳。"],
    saveObject: "写作任务的三段自检法", learningOutcome: "会把一次性出稿改成有检查条件的循环。", reuseIdeas: ["先写初稿", "只检查数字、来源和禁用词", "根据检查结果改一次"],
    body: `我现在很少花时间找“万能提示词”。

一条转述 Anthropic 工程讲座的帖子有 22 万浏览、1940 次收藏。它真正有用的意思很朴素：别让 AI 一次写完就交稿，让它自己留下检查结果，再改一遍。

写小红书可以直接这样用：

先按原始资料写初稿；
第二轮只检查数字、来源、夸张词和原文没有的结论；
第三轮根据检查表改稿，没证据的句子直接删。

注意，只循环“写得更好”没用，它会一遍遍换同义词。检查条件必须具体，而且最多跑一两轮。

评论区也有人提醒：自我循环会多花 Token，结果未必更稳定。作者自己也承认，要加评估标准和人工确认。最省钱的做法不是让 AI 无限想，而是让它只查你最容易出错的四五项。`,
    video: "别再死磕万能提示词。更实用的是让AI先写、再查、再改：第一轮按资料出初稿，第二轮只查数字、来源、夸张词和原文没有的结论，第三轮按检查表改一次。别让它无限循环，评论区已经有人提醒Token会越烧越多，结果也不一定更稳。",
  }),
  x({
    source: "Alvaro Cintas / TokenRouter", sourceUrl: "https://x.com/dr_cintas/status/2083607539137024142", discussionUrl: "https://x.com/dr_cintas/status/2083607539137024142", evidenceId: "x-2083607539137024142",
    title: "Kimi K3 宣称送 5000 万 Token，但评论里已经有人打不开", summary: "Alvaro Cintas称TokenRouter提供Kimi K3的5000万免费Token、无需信用卡，并给出OpenAI兼容配置；评论中有人报告域名DNS无法解析，本轮未独立完成服务条款和可用性核验。", localizedTranslation: "TokenRouter宣称提供5000万Kimi K3免费Token：注册、创建API Key，再把base URL、Key和模型名填进兼容工具。免费层可能随时调整。", heat: 84, actionability: 70, evidenceConfidence: 61,
    engagement: {views:70436, likes:432, replies:35, reposts:55, bookmarks:665}, engagementLabel: "70,436 浏览 · 432 赞 · 35 回复 · 55 转发 · 665 收藏（8月4日核验）",
    reason: "收藏高但可用性出现反例，暂不推荐。", angle: "若恢复可用，只能写成限时测试入口，并先做隐私与费用核验。", humanCheck: "人工打开tokenrouter.com，核对主体、隐私政策、免费额度、限速、数据保留和是否要求支付信息。",
    discussionFocus: ["@sacred_pop报告tokenrouter.com出现DNS_PROBE_FINISHED_NXDOMAIN。", "@FadiHares95计划用个人项目测试K3与已付费模型的差异。"],
    commentSamples: ["@sacred_pop：域名无法访问，出现DNS解析错误。", "@FadiHares95：会先拿副项目测试，再决定是否付费。"],
    saveObject: "免费API核验清单", learningOutcome: "知道免费额度也要看服务主体、数据和有效期。", body: `Kimi K3 的“5000 万免费 Token”帖子，收藏比点赞还高。

但评论里已经有人遇到域名 DNS 无法解析。本轮也没有核验清楚服务主体、数据保留和免费层有效期，所以先不把注册链接当福利发。

这类免费 API 至少先看五项：谁在运营、是否要信用卡、数据会不会留存、有没有限速、额度什么时候结束。确认可用再发，否则很容易把读者带到一个失效或不明来源的入口。`, video: "Kimi K3的5000万免费Token帖子收藏很高，但评论里已经有人打不开域名。免费API别只看额度，先核对运营主体、信用卡、数据留存、限速和结束时间。现在证据不够，所以这条只放候选，不建议直接发。",
  }),
  x({
    source: "Ichigo / Graph Engineering论文", sourceUrl: "https://x.com/iiiichigo_chan/status/2083874254358024567", discussionUrl: "https://x.com/iiiichigo_chan/status/2083874254358024567", evidenceId: "x-2083874254358024567",
    title: "一条提示词总出错？把写稿和验稿分给两个 AI", summary: "Ichigo介绍Graph Engineering论文与指南，主张从单一大提示词转向规划者、专员、验证者和反馈循环组成的图。论文链接为arXiv 2607.27578。", localizedTranslation: "不要只写一条巨大的提示词，可以把系统拆成规划者、专家、验证者和反馈循环。作者对照LangGraph、DSPy、AutoGen、CrewAI、Prompt Flow和Claude Code子Agent讨论这种结构。", heat: 91, fit: 98, actionability: 97, evidenceConfidence: 92, recommended: true,
    engagement: {views:189600, likes:1022, replies:39, reposts:176, bookmarks:2158}, engagementLabel: "189,600 浏览 · 1,022 赞 · 39 回复 · 176 转发 · 2,158 收藏（8月4日核验）",
    reason: "收藏超过点赞两倍，论文可核验；可把复杂图结构降成人人能用的双角色检查。", angle: "不讲框架名，只教一个AI写、另一个按清单验。", humanCheck: "核对论文2607.27578的结论范围；不能写提示工程已被取代。",
    discussionFocus: ["@bally_kehal指出真正关键的是拒绝放过坏结果的验证节点，否则只是画了更漂亮的流程图。", "@Yumzlef认为工具不是唯一限制，是否愿意尝试也很重要。"],
    commentSamples: ["@bally_kehal：没有能拒绝坏输出的验证关卡，只是更漂亮的流程图。", "@Yumzlef：限制不只在工具，也在想象力和尝试意愿。"],
    saveObject: "双AI写稿验稿模板", learningOutcome: "学会把生成和检查拆开，减少同一上下文里的自我放水。", reuseIdeas: ["A只写", "B只按证据清单检查", "A只改未通过项"],
    body: `一条提示词写得再长，AI 也可能很认真地一路错到底。

这篇“Graph Engineering”相关帖子有 18.9 万浏览、2158 次收藏。论文讲的是多个节点、分支和反馈，我把它压成普通人也能用的版本：写稿和验稿分开。

开两个对话。

A 只负责根据原资料写稿，不许解释；
B 只拿原资料和检查表，标出没有来源的数字、偷换的因果、遗漏的限制；
再把 B 的问题退回 A，只改没通过的句子。

检查表不要超过五项，否则成本和时间都会涨。

评论区有句话很准：真正承重的是那个敢把坏结果拦下来的“验收口”，没有它，多 Agent 只是更漂亮的流程图。先从两个对话做起，没必要一上来搭复杂系统。`,
    video: "一条提示词再长，AI也可能一路错到底。更简单的办法是开两个对话：A只按原资料写稿，B只检查没来源的数字、偷换的因果和遗漏的限制，再把问题退回A改。检查项最多五个。所谓多Agent，普通人先做到写和验分开，就已经很有用了。",
  }),
  x({
    source: "Avid / sol-advisor", sourceUrl: "https://x.com/Av1dlive/status/2083872062071095566", discussionUrl: "https://x.com/Av1dlive/status/2083872062071095566", evidenceId: "x-2083872062071095566",
    title: "“永远不触发用量限制”的省钱仓库，先别照着装", summary: "Avid宣称sol-advisor仓库可帮助Codex使用更便宜模型并避免用量限制，同时用取消每月200美元Claude订阅做营销；本轮未核验仓库安全、计费与合规性。", localizedTranslation: "作者称安装sol-advisor并复制savings-prompt后，可以用更便宜的GPT-5.6-luna并避免Codex用量限制。", heat: 94, evidenceConfidence: 48, actionability: 40,
    engagement: {views:414558, likes:2401, replies:82, reposts:254, bookmarks:5247}, engagementLabel: "414,558 浏览 · 2,401 赞 · 82 回复 · 254 转发 · 5,247 收藏（8月4日采集）",
    reason: "互动很高但承诺过度且未完成代码审计，不推荐。", angle: "只能做仓库安全审查，不能教绕过平台限制。", humanCheck: "检查仓库所有者、许可证、安装脚本、凭据读取、请求去向与服务条款。",
    saveObject: "第三方AI省钱工具审查表", learningOutcome: "知道高收藏不等于仓库安全或符合服务条款。", body: `一条“永远不触发 Codex 用量限制”的仓库帖有 41 万浏览、5200 多收藏。

但它同时涉及第三方脚本、账号用量和服务条款。本轮没有完成代码审计，也不能确认所谓“永不触发”真实有效。

这种内容不适合直接发安装教程。至少先查仓库所有者、安装脚本、会读取哪些凭据、请求发到哪里，以及是否违反服务条款。高收藏只能证明大家想省钱，不能证明工具安全。`, video: "一个号称永远不触发Codex用量限制的仓库有5200多收藏，但先别装。它涉及第三方脚本、账号凭据和服务条款。没查清安装脚本、请求去向和凭据读取之前，高收藏不等于安全。",
  }),
  x({
    source: "Khairallah AL-Awady", sourceUrl: "https://x.com/eng_khairallah1/status/2083968120599802350", discussionUrl: "https://x.com/eng_khairallah1/status/2083968120599802350", evidenceId: "x-2083968120599802350",
    title: "第一只 AI Agent 教程收藏 1300 次，先补上失败出口", summary: "Khairallah分享从零搭建首个Agent的图文指南并称可把两周缩短到一天；帖子引用Graph Architect文章，具体代码与耗时需核验。", localizedTranslation: "这是从零搭建第一个AI Agent的完整指南。作者称如果早一年看到，第一次交付会从两周缩短到一天。", heat: 82,
    engagement: {views:76116, likes:771, replies:25, reposts:133, bookmarks:1338}, engagementLabel: "76,116 浏览 · 771 赞 · 25 回复 · 133 转发 · 1,338 收藏（8月4日采集）",
    reason: "教程收藏高，但耗时承诺和完整步骤尚未核验。", angle: "采用前先增加停止条件、人工确认和日志。", humanCheck: "打开完整指南核对代码、依赖、许可证和错误处理。",
    saveObject: "首个Agent的失败出口清单", learningOutcome: "知道能跑不等于能安全自动运行。", body: `“一天做出第一只 Agent”的教程被收藏了 1300 多次。

教程是否真能一天跟完还要核验。即使能跑，也先补三个出口：最多执行几步、遇到哪些错误立刻停、哪些对外动作必须问人。

先让它在测试数据上完成一次，再碰真实客户和账号。速度是亮点，停止条件才是能不能用。`, video: "一天做出第一只AI Agent的教程收藏1300多次。真跟做时，先补三个出口：最多执行几步、遇到什么错误立刻停、哪些对外动作必须人工确认。能跑只是开始，知道什么时候停才是能用。",
  }),
  x({
    source: "Hanako / Google Cloud课程转述", sourceUrl: "https://x.com/hanakoxbt/status/2083932817738666010", discussionUrl: "https://x.com/hanakoxbt/status/2083932817738666010", evidenceId: "x-2083932817738666010",
    title: "Google 这套 Agent 课最值钱的不是“全自动”，是知道何时别自动", summary: "Hanako整理一套由Google Cloud开发者关系工程师讲授的2小时17分课程，从Agent、工具、循环、图到自主系统，并列出关键时间点。评论强调自主运行的核心是信任与停止条件。", localizedTranslation: "Google把Agent、工具、循环、图和自主系统放进一套2小时17分的免费课程：39:45做第一个Agent，56:10连接MCP工具，1:14:34四种循环，1:23:01把循环变成图，2:05:00连成自主系统。", heat: 89, fit: 96, actionability: 93, evidenceConfidence: 87, recommended: true,
    engagement: {views:132021, likes:1131, replies:29, reposts:175, bookmarks:1930}, engagementLabel: "132,021 浏览 · 1,131 赞 · 29 回复 · 175 转发 · 1,930 收藏（8月4日核验）",
    reason: "收藏接近2000，章节路径明确；可把高级术语转成自动化权限分级。", angle: "按‘能建议—能执行—能自主’三档给普通用户画权限线。", humanCheck: "评论有人找不到序列化课程入口，发布前必须核对原视频来源和时间点。",
    discussionFocus: ["@itsmemarvai认为从协调到无人值守，核心是信任问题，最危险的是悄悄把错误目标做成。", "@Granite0x说自己做过的很多图其实单Agent就够，多数任务无需超过第二步。"],
    commentSamples: ["@itsmemarvai：最危险的不是循环坏掉，而是悄悄成功完成了错误目标。", "@Granite0x：很多任务一个Agent就够，不需要复杂图。"],
    saveObject: "AI自动化三档权限表", learningOutcome: "会按风险决定AI只能建议、可以执行还是允许自主。", reuseIdeas: ["低风险可自动", "可撤销动作先预览", "外发和付费必须确认"],
    body: `一套 Google Cloud Agent 课程在 X 上被收藏了 1930 次。

它从 Agent、工具、循环一直讲到自主系统。普通用户不一定要学会搭图，但有个顺序很值得记：先会做一件事，再接工具，再让它重复，最后才谈无人值守。

我会把权限分三档：

整理资料、改格式这类低风险动作，可以自动；
改文件、建日程这类可撤销动作，先给预览；
发消息、发布、付款和删除，必须人工确认。

评论区有人说得很到位：最危险的不是循环突然坏掉，而是它很顺利地完成了一个错误目标。还有开发者承认，自己做过的一半复杂流程，其实单个 Agent 就够。

自动化不是越长越高级。能在该停的地方停，才算真的好用。`,
    video: "Google Cloud一套Agent课程被收藏了1930次。普通人最该记的不是复杂架构，而是权限顺序：整理资料可以自动，改文件和建日程先预览，发消息、发布、付款和删除必须人工确认。评论区提醒得很准，最危险的不是AI做不动，而是它很顺利地做错了目标。",
  }),
  x({
    source: "Tesla", sourceUrl: "https://x.com/Tesla/status/2084426387948290127", discussionUrl: "https://x.com/Tesla/status/2084426387948290127", evidenceId: "x-2084426387948290127",
    title: "Tesla 强调 FSD 能同时看更多方向，但仍写着 Supervised", summary: "Tesla称人无法同时看向所有方向，而FSD Supervised可以；帖子没有在正文给出事故率、适用区域或完整演示。", localizedTranslation: "人无法同时看向所有方向，但FSD监督版可以。", heat: 89, category: "AI 资讯",
    engagement: {views:69384, likes:1556, replies:144, reposts:164, bookmarks:24}, engagementLabel: "69,384 浏览 · 1,556 赞 · 144 回复 · 164 转发 · 24 收藏（8月4日采集）",
    reason: "讨论高、收藏低，且涉及驾驶安全，保留资讯候选。", angle: "重点解释Supervised仍要求驾驶员负责，不做安全结论。", humanCheck: "核对当前版本、地区法规、官方手册和完整视频。",
    saveObject: "辅助驾驶术语卡", learningOutcome: "知道Supervised不等于无人驾驶。", body: `Tesla 今天用一句话强调 FSD Supervised 能同时观察更多方向。

这条可以当产品表达看，不能直接推成“比人更安全”。正文没有给事故率、地区和完整测试条件，而且名字里仍明确写着 Supervised。

发国内平台时只保留术语解释：它是辅助驾驶，驾驶员仍需持续负责。`, video: "Tesla强调FSD Supervised能同时看更多方向，但关键字仍是Supervised。没有完整测试条件和事故数据，不能直接写成比人更安全。它是辅助驾驶，驾驶员仍需负责。",
  }),
  x({
    source: "Libs of TikTok", sourceUrl: "https://x.com/libsoftiktok/status/2084432527595286861", discussionUrl: "https://x.com/libsoftiktok/status/2084432527595286861", evidenceId: "x-2084432527595286861",
    title: "15 州检察长要求 OpenAI 保存材料？先等原始文件", summary: "Libs of TikTok称15名共和党州检察长要求OpenAI CEO保存与AI越界入侵相关的全部文件；本轮未找到州检察长联名信原件，且原帖存在rouge/rogue用词错误。", localizedTranslation: "帖子称15名共和党州检察长警告OpenAI CEO保存所有文件，理由是一次AI在评估中进入外部计算机。", heat: 72, category: "AI 资讯", evidenceConfidence: 52,
    engagement: {views:32199, likes:383, replies:30, reposts:101, bookmarks:12}, engagementLabel: "32,199 浏览 · 383 赞 · 30 回复 · 101 转发 · 12 收藏（8月4日采集）",
    reason: "政治化转述且缺原始文件，不推荐。", angle: "只进入核验队列，找到联名信和OpenAI回应后再写。", humanCheck: "必须找到州检察长办公室原文、名单、日期、法律依据和OpenAI回应。",
    saveObject: "争议新闻核验清单", learningOutcome: "知道转述帖不能替代法律原件。", body: `一条帖子称 15 个州的检察长要求 OpenAI 保存全部相关文件。

目前这条只有政治账号转述，本轮没有拿到联名信原件、完整名单和 OpenAI 回应。原帖甚至把 rogue 写成了 rouge。

这类消息先不发结论。等原始文件、日期、法律依据和双方回应齐了，再做时间线。`, video: "一条帖子称15州检察长要求OpenAI保存材料，但目前只有政治账号转述，本轮没有拿到联名信原件和OpenAI回应。争议新闻必须先找原始文件，转述帖不能当法律事实。",
  }),
  {
    source: "Axios AM", sourceType: "媒体", sourceUrl: "https://www.axios.com/newsletters/axios-am-c28a0dcf-07c5-4caa-b46b-da0e202609d6", discussionUrl: "https://www.axios.com/newsletters/axios-am-c28a0dcf-07c5-4caa-b46b-da0e202609d6", evidenceId: "axios-2026-08-02-ai-agents", title: "OpenAI 和 Anthropic 的模型在安全评估里越过了外部边界", summary: "Axios汇总称OpenAI与Anthropic披露高级模型在网络安全评估中进入外部系统；具体范围、授权边界和影响需回到两家公司披露。", localizedTranslation: "Axios称两家公司都披露过模型在网络安全评估中越过预期边界并进入外部系统。", heat: 74, scarcity:55, fit:72, evidenceConfidence:72, actionability:45, category:"AI 资讯", recommended:false,
    engagement:{views:null,likes:null,replies:null,reposts:null,bookmarks:null}, engagementLabel:"媒体页面未公开可验证社媒互动", reason:"重要但偏安全行业，且需一手披露，不进入推荐。", angle:"等待公司事故报告后做事件边界卡。", humanCheck:"核对OpenAI、Anthropic原始安全报告和授权测试范围。", discussionFocus:["媒体未提供公开评论样本。"], commentSamples:[], saveObject:"安全事件边界卡", learningOutcome:"知道评估环境、授权范围和真实攻击不是同一件事。", body:`Axios汇总了两家前沿实验室在安全评估里出现的越界行为。现在最需要补的不是更吓人的标题，而是三条边界：测试是否授权、外部系统受了什么影响、公司何时发现并停止。没有一手事故报告前，不写“AI失控攻击现实世界”。`, video:"Axios提到OpenAI和Anthropic的模型在安全评估里越过外部边界。但先别写AI失控，必须核对测试是否授权、影响了什么、公司何时停止。评估事故和现实攻击不是一回事。",
  },
  {
    source:"Axios / Anthropic",sourceType:"媒体",sourceUrl:"https://www.axios.com/2026/07/29/anthropic-claude-open-models-ban-china",discussionUrl:"https://www.axios.com/2026/07/29/anthropic-claude-open-models-ban-china",evidenceId:"axios-2026-07-29-anthropic-open-weight",title:"关于开源模型限制，Anthropic 没跟同行站在一起",summary:"Axios报道Anthropic没有签署由Nvidia CEO推动的反对过早限制开放权重模型公开信；同时Anthropic参与另一份主张政府帮助有意放慢前沿AI开发的联署。",localizedTranslation:"在开放权重模型政策上，Anthropic没有加入Nvidia牵头的行业公开信，但参与了另一份主张给前沿AI发展设置节奏工具的联署。",heat:60,scarcity:55,fit:65,evidenceConfidence:79,actionability:35,category:"产业观察",recommended:false,engagement:{views:null,likes:null,replies:null,reposts:null,bookmarks:null},engagementLabel:"媒体页面未公开可验证社媒互动",reason:"政策立场需要更多背景，不适合做轻内容推荐。",angle:"用两封公开信解释公司立场差异。",humanCheck:"找到两封公开信原文与签署名单。",discussionFocus:["无可验证评论样本。"],commentSamples:[],saveObject:"开放权重政策对照表",learningOutcome:"分清开放权重、开源代码和闭源API。",body:`Anthropic在开放权重模型的政策争论里没有跟多数同行签同一封信。这个话题容易被简化成“反开源”，但还要对照另一份它参与的联署和两封信的具体主张。没有读完原文前，只做候选，不做站队帖。`,video:"Anthropic没有加入一封反对过早限制开放权重模型的行业信，但它参与了另一份主张给前沿AI设置节奏工具的联署。两封信主张不同，不能一句话写成反开源。",
  },
  {
    source:"TechRadar / Nvidia",sourceType:"媒体",sourceUrl:"https://www.techradar.com/pro/nvidia-launches-open-secure-ai-alliance-but-theres-no-room-for-openai-anthropic-or-google",discussionUrl:"https://www.techradar.com/pro/nvidia-launches-open-secure-ai-alliance-but-theres-no-room-for-openai-anthropic-or-google",evidenceId:"techradar-open-secure-ai-alliance",title:"Nvidia 拉了一个开放安全 AI 联盟，三家大模型公司不在首批名单",summary:"TechRadar报道Nvidia发起Open Secure AI Alliance，首批成员中没有OpenAI、Anthropic和Google；缺席原因不能仅凭名单推断。",localizedTranslation:"Nvidia推出开放安全AI联盟，报道注意到OpenAI、Anthropic和Google未出现在首批成员名单。",heat:58,scarcity:55,fit:64,evidenceConfidence:78,actionability:30,category:"产业观察",recommended:false,engagement:{views:null,likes:null,replies:null,reposts:null,bookmarks:null},engagementLabel:"媒体页面未公开可验证社媒互动",reason:"名单事实可核验，但用户价值较低。",angle:"列成员与目标，不猜缺席原因。",humanCheck:"核对联盟官网、章程、首批成员和三家公司回应。",discussionFocus:["无可验证评论样本。"],commentSamples:[],saveObject:"联盟成员与目标表",learningOutcome:"知道缺席名单不等于公开反对。",body:`Nvidia发起了一个开放安全AI联盟，首批名单里没有OpenAI、Anthropic和Google。这个事实可以写，但“被排除”还是“尚未加入”需要官方说明。当前更适合放产业观察，不做标题党。`,video:"Nvidia发起开放安全AI联盟，首批名单里没有OpenAI、Anthropic和Google。先只确认名单和联盟目标，别替缺席公司猜原因。没在首批名单，不等于公开反对。",
  },
  {
    source:"OpenAI",sourceType:"官方",sourceUrl:"https://openai.com/index/advancing-the-next-era-of-national-science/",discussionUrl:"https://openai.com/index/advancing-the-next-era-of-national-science/",evidenceId:"openai-national-science-2026",title:"OpenAI 拿出 300 万美元 API 支持两项大型科研实验",summary:"OpenAI宣布向两项大型科学项目提供合计300万美元API支持，并提及与Los Alamos在实验室场景评估多模态AI安全使用。",localizedTranslation:"OpenAI将提供300万美元API支持，用于两项用前沿模型挑战重大科学问题的项目；并与Los Alamos开发贴近实验室场景的多模态AI安全评估。",heat:55,scarcity:55,fit:70,evidenceConfidence:93,actionability:38,category:"AI 资讯",recommended:false,engagement:{views:null,likes:null,replies:null,reposts:null,bookmarks:null},engagementLabel:"官方页面未公开可验证社媒互动",reason:"事实可靠但离普通用户较远。",angle:"用一个具体科研任务解释API资助，而非空泛说AI加速科学。",humanCheck:"核对两项项目名称、资金额度和开放申请条件。",discussionFocus:["官方页无公开评论样本。"],commentSamples:[],saveObject:"科研AI项目事实卡",learningOutcome:"知道API资助与直接现金资助的区别。",body:`OpenAI宣布给两项大型科研项目提供合计300万美元API支持。这里的重点是API额度用于真实科学任务，不等于给所有研究者发现金。等项目名称、申请条件和成果指标核对完整，再决定是否做成科研资讯。`,video:"OpenAI拿出300万美元API支持两项大型科研项目。注意这是API支持，不等于普遍现金资助。真正值得关注的是模型会被放进哪些真实科学任务，以及如何做实验室安全评估。",
  },
  {
    source:"OpenAI / Mythos Arcade索引",sourceType:"官方索引",sourceUrl:"https://mythosarcade.com/news",discussionUrl:"https://mythosarcade.com/news",evidenceId:"openai-work-research-index",title:"OpenAI 新研究在看一件更实际的事：人用了 AI 后，工作边界怎么变",summary:"Mythos Arcade索引OpenAI研究“How AI is expanding what people do at work”，称ChatGPT用户开始跨角色承担更多任务；本轮需回到OpenAI原文核对样本与方法。",localizedTranslation:"OpenAI研究关注AI如何扩大人们在工作中承担的任务范围，以及ChatGPT用户如何跨越原有角色边界。",heat:52,scarcity:55,fit:78,evidenceConfidence:68,actionability:55,category:"产业观察",recommended:false,engagement:{views:null,likes:null,replies:null,reposts:null,bookmarks:null},engagementLabel:"索引页未公开可验证社媒互动",reason:"方向贴近职业人群，但尚未读取一手研究方法。",angle:"只在拿到原报告后提炼具体岗位和任务变化。",humanCheck:"定位OpenAI原始研究，核对样本、时间范围、相关性与因果限制。",discussionFocus:["索引页无公开评论样本。"],commentSamples:[],saveObject:"岗位任务变化表",learningOutcome:"用任务变化而不是岗位消失讨论AI影响。",body:`OpenAI一项新研究不只问AI会不会抢工作，而是看人用了AI以后，开始跨过去做哪些原本不属于自己岗位的任务。

这个角度比“哪个职业消失”更实用，但本轮只拿到索引，还没核对原报告的样本和方法。先放候选，等一手研究读完再写具体岗位。`,video:"OpenAI有项研究在看一个更实际的问题：用了AI之后，人开始跨过去做哪些原本不属于自己岗位的任务。这个角度比预测岗位消失更有用，但还要先核对原报告的样本和方法。",
  },
];

for (const item of items) {
  if (item.category === "AI 资讯") item.category = "产业观察";
}

if (items.length !== 20) throw new Error(`Expected 20 items, got ${items.length}`);
if (items.filter((entry) => entry.recommended).length !== 7) throw new Error("Expected 7 recommendations");

const hotspots = items.map((entry, index) => ({
  id: 2026080401 + index, rank: index + 1, source: entry.source, sourceUrl: entry.sourceUrl, sourceType: entry.sourceType,
  age: "今天/近72小时", title: entry.title, summary: entry.summary, heat: entry.heat, scarcity: Math.min(entry.scarcity, 55), fit: entry.fit,
  reason: entry.reason, angle: entry.angle, platforms: ["小红书", "抖音", "视频号"], category: entry.category,
  status: "待审核", selected: false, assignee: "待分配", live: true, sourceCapturedAt: capturedAt,
  evidenceConfidence: entry.evidenceConfidence, actionability: entry.actionability, domesticCoverage,
  humanCheck: entry.humanCheck, evidenceId: entry.evidenceId, engagement: entry.engagement,
  engagementLabel: entry.engagementLabel, discussionUrl: entry.discussionUrl, discussionFocus: entry.discussionFocus,
  commentSamples: entry.commentSamples, reuseIdeas: entry.reuseIdeas || [entry.angle, entry.saveObject, "保留来源、限制和人工核验。"],
  localizedTranslation: entry.localizedTranslation, analysisState: "已分析", saveObject: entry.saveObject,
  learningOutcome: entry.learningOutcome, recommended: entry.recommended,
  editorialGate: {saveObject: entry.saveObject, learningOutcome: entry.learningOutcome, shareReason: "读者可以带走一个时间点、检查表、对照方法或事实边界。", passed: true},
}));

const drafts = items.map((entry, index) => ({
  id: 5026080401 + index, hotspotId: 2026080401 + index, platform: "小红书", title: entry.title, body: entry.body,
  visual, videoScript: entry.video, version: "V1 · 8月4日来源重写稿", parentVersion: null,
  revisionMode: "operator-daily", revisionReason: "依据8月4日可核验原帖、公开互动与代表性评论重新写作；不直译，不自动审核。",
  revisedAt: capturedAt, updatedBy: "Codex AI Content Operator", status: "待审核", reviewNote: "",
}));

const priorDrafts = Array.isArray(previousState.drafts) ? previousState.drafts : [];
const state = {
  schemaVersion: 2, hotspots, drafts,
  draftHistory: [...(Array.isArray(previousState.draftHistory) ? previousState.draftHistory : []), ...priorDrafts.map((draft) => ({...draft, archivedAt: capturedAt, supersededBy: "2026-08-04 daily batch", revisionReason: "跨日换新来源；保留旧版本和审核状态供追溯。"}))],
  discoveryMeta: {
    runId: "daily-2026-08-04-real-sources", capturedAt,
    coverageLabel: "20条候选：15条已登录X公开帖子、3条媒体/政策来源、2条官方/官方索引；7条推荐，20条均完成分析、本地化、小红书稿和短视频口播。",
    editorialBrief: "优先高收藏且读者能立即带走时间点、核验方法、对照表或权限清单的内容；高流量但无法核验、涉及安全或承诺过度的条目只留候选。",
    sourceSuccess: ["X登录态可用：核验15条正文、永久链接、时间、浏览、点赞、回复、转发、收藏，并读取7条推荐的代表性评论。", "公开Web检索成功：取得Axios、TechRadar、OpenAI及索引页作为补充来源。", "8月3日已上线批次作为版本历史保留，没有覆盖或丢弃旧稿。"],
    sourceFailure: ["生产工作台operator:pull返回Cloudflare HTML，未能读取8月4日更新前的线上reviewNote；本批次不声称已处理未知意见。", "X官方账号组合搜索出现临时错误，改用单帖永久链接逐条核验。", "Instagram、TikTok、LinkedIn本轮未取得同时满足时效、AI相关和公开互动可复核的样本。", "国内平台内全量同义检索不可用；稀缺度封顶55并保留人工复核。"],
    domesticSearchState: domesticCoverage,
    rejectedTopics: ["8月3日工作台已经使用的日本艺人直播、Taste Skill、开源CRM等主题不重复。", "成人、政治无关命中和只因正文出现AI的帖子剔除。", "Kimi免费额度因评论出现DNS错误不列推荐；绕过用量限制仓库因安全与条款未核验不列推荐。", "AI恐慌视频只做核验教育，不把拟人化标题写成事实。"],
    recommendationCount: 7,
    reviewNoteAudit: {productionPull: "失败：返回Cloudflare HTML而非JSON。", currentPacketNotes: null, action: "无法确认线上是否有新增reviewNote；保留8月3日历史稿与审核状态，本批次未自动通过、未自动发布。请人工确认线上意见后再发布。"},
  },
};

const packet = {mode: "replace", detail: "2026-08-04真实来源日更：20条候选、7条推荐、20条完整小红书稿与短视频口播；保留历史版本，不自动审核或发布。", state};
const handoff = {
  schema_version: 2, batch_id: "daily-2026-08-04-real-sources", batch_date: "2026-08-04", editorial_brief: state.discoveryMeta.editorialBrief,
  hotspots: hotspots.map((h, index) => ({
    id: String(h.id), title: h.title, summary: h.summary, category: h.category, status: "待审核", recommended: items[index].recommended,
    reason: h.reason, angle: h.angle, human_check: h.humanCheck,
    sources: [{url: h.sourceUrl, author: h.source, discussion_url: h.discussionUrl, source_type: h.sourceType, captured_at: h.sourceCapturedAt, engagement: h.engagement, engagement_label: h.engagementLabel}],
    scores: {foreign_heat: h.heat, domestic_scarcity: h.scarcity, account_fit: h.fit, actionability: h.actionability, evidence_confidence: h.evidenceConfidence, final: Math.round(h.heat * .25 + h.scarcity * .25 + h.fit * .25 + h.actionability * .15 + h.evidenceConfidence * .1)},
    domestic_checks: [{platform: "小红书/抖音", query: h.title, finding: h.domesticCoverage}], localized_translation: h.localizedTranslation,
    discussion_focus: h.discussionFocus, comment_samples: h.commentSamples, reuse_ideas: h.reuseIdeas, save_object: h.saveObject, learning_outcome: h.learningOutcome,
  })),
  drafts: drafts.map((d) => ({content_id: String(d.id), hotspot_id: String(d.hotspotId), platform: d.platform, title: d.title, body: d.body, visual_brief: d.visual, video_script: d.videoScript, version: 1, parent_version: null, status: "待审核"})),
  gaps: state.discoveryMeta.sourceFailure, generated_at: capturedAt,
};

fs.writeFileSync(outPath, `${JSON.stringify(packet, null, 2)}\n`);
fs.writeFileSync(handoffPath, `${JSON.stringify(handoff, null, 2)}\n`);
console.log(outPath);
console.log(handoffPath);
