import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const prior = JSON.parse(fs.readFileSync(path.join(root, "operator-packets/2026-08-03-production-before.json"), "utf8"));
const recent = JSON.parse(fs.readFileSync(path.join(root, "operator-packets/2026-08-02-daily-batch.json"), "utf8"));
const outPath = path.join(root, "operator-packets/2026-08-03-daily-batch.json");
const handoffPath = path.join(root, "operator-packets/2026-08-03-daily-handoff.json");
const capturedAt = "2026-08-03T08:31:39+08:00";

const domesticCoverage = "国内平台内全量同义检索不可用；已按产品名、核心主张、目标人群和可执行角度做公开Web相邻搜索，但不能据此宣称小红书或抖音无人发布。国内稀缺度按规则封顶55，发布前需运营人员在平台内复核。";
const visual = "4:5黑白极简信息卡，少量圆角简笔画。首图只保留标题和一个真实物件；内页呈现可执行清单、流程或核验结果。避免模型头像、机器人、发光渐变、夸张收益数字和未经核实的效果对比。";

function makeItem(data) {
  return {
    sourceType: "X",
    scarcity: 55,
    fit: 88,
    evidenceConfidence: 86,
    actionability: 82,
    category: "AI 技巧",
    recommended: false,
    engagement: {},
    engagementLabel: "未公开",
    discussionFocus: ["无可验证评论样本；不推断评论共识。"],
    saveObject: "一张可复用清单",
    learningOutcome: "知道这件事能怎么用，以及不能据此下什么结论。",
    ...data,
  };
}

const newItems = [
  makeItem({
    source: "宫本佳林 / 川邊健太郎",
    sourceUrl: "https://x.com/karin__miyamoto/status/2083462264557113524",
    discussionUrl: "https://x.com/dennotai/status/2083855327683059998",
    evidenceId: "x-2083462264557113524",
    title: "不会写代码的日本艺人，用 AI 独立搭完了 10 小时直播系统",
    summary: "日本艺人宫本佳林公开复盘：为了宣传新歌，她用AI参与搭建直播系统并完成约10小时YouTube直播；原帖和技术复盘在日本X形成大规模传播。",
    localizedTranslation: "一位不会编程的艺人和AI一起做出了整套10小时直播系统，并把艺人视角和技术架构分别写成复盘。",
    heat: 100,
    fit: 98,
    evidenceConfidence: 94,
    actionability: 94,
    recommended: true,
    category: "个人 IP",
    engagement: {views:3433996,likes:8388,replies:34,reposts:2560,bookmarks:4520},
    engagementLabel: "3,433,996 浏览 · 8,388 赞 · 34 回复 · 2,560 转发 · 4,520 收藏（8月3日采集）",
    reason: "这是今天最强的个人IP案例：不是讲AI概念，而是一个非程序员把AI放进真实直播任务并完成交付。",
    angle: "完整搬运她做成了什么，再把可复用部分缩成个人创作者的直播前、直播中、直播后三张清单。",
    humanCheck: "发布前核对艺人博客中的具体工具、自动化范围和哪些环节仍由本人完成；不能写成全程无人值守。",
    discussionFocus: ["原帖公开数据为343万浏览、8388赞、4520收藏。", "转发讨论最关注的不是具体模型，而是非技术创作者先做完再复盘。", "评论样本：@miledeploy认为，与其犹豫，不如先开始行动，能完成10小时直播本身就是证据。", "评论样本：@vf_takanisihi提到，除了AI操作，现场补位和意外处理同样值得学习。"],
    saveObject: "个人创作者直播的三阶段AI协作清单",
    learningOutcome: "学会把AI放进一次真实内容项目，而不是只停留在提问。",
    reuseIdeas: ["直播前：资料、流程、应急话术", "直播中：提示、记录、片段标记", "直播后：切片、复盘、二次分发"],
    body: `一个不会写代码的日本艺人，把10小时直播系统自己搭出来了。

她叫宫本佳林。为了宣传新歌，她没有先去学一整套编程课，而是边做边用AI：把直播要用的页面、提示、流程和技术问题一项项解决，最后真的播完了约10小时。

这条原帖在X上有343万浏览、8388赞、4520收藏。最打动我的不是“AI又能写代码”，而是她选了一个有明确截止时间的真任务。

如果你也在做个人账号，可以直接抄这套分工：

直播前，让AI整理资料、写流程卡、列最可能出错的5件事；
直播中，让它做提词、时间点记录和待剪片段标记，人负责现场判断；
直播后，把时间点交给AI生成切片标题、简介和复盘初稿。

别一上来就做10小时。先拿一次30分钟直播试跑，结束后只看三件事：哪里卡住、哪段有人停留、哪些动作必须自己做。

她真正证明的不是“AI能代替团队”，而是一个人也可以先把小团队的工作台搭起来。`,
    video: "一个不会写代码的日本艺人，靠AI搭完了整套10小时直播系统。重点不是模型有多强，而是她把任务拆成了直播前准备、直播中记录、直播后切片三段。做个人账号的先别挑战10小时，拿一次30分钟直播试跑：让AI整理资料、列应急问题、标记可剪片段，人只负责现场判断。AI最有用的时候，就是它被塞进一个有截止时间的真任务里。",
  }),
  makeItem({
    source: "Ram Maheshwari / Taste Skill",
    sourceUrl: "https://x.com/rammcodes/status/2083899487232368772",
    discussionUrl: "https://x.com/rammcodes/status/2083899487232368772",
    evidenceId: "x-2083899487232368772",
    title: "AI 做网页总像同一个模板？这个开源 Skill 专门改“审美默认值”",
    summary: "开发者分享开源Taste Skill，可接入Claude Code、Codex、Cursor等编码Agent，为界面生成加入设计约束和自检标准，目标是减少千篇一律的AI前端。",
    localizedTranslation: "这个开源AI技能为编码Agent补充界面设计标准，让它们少生成一眼就像模板的页面。",
    heat: 88,
    fit: 98,
    evidenceConfidence: 90,
    actionability: 98,
    recommended: true,
    engagement: {views:48386,likes:603,replies:18,reposts:31,bookmarks:1173},
    engagementLabel: "48,386 浏览 · 603 赞 · 18 回复 · 31 转发 · 1,173 收藏（8月3日采集）",
    reason: "收藏数接近点赞两倍，明显是用户准备回去安装或研究的工具型内容。",
    angle: "不吹一键变高级，直接教读者把品牌限制、反例和验收标准交给编码Agent。",
    humanCheck: "核对仓库地址、许可证、安装方式及是否会读取项目文件；用同一页面做安装前后人工对照。",
    discussionFocus: ["公开帖显示48386浏览、603赞、1173收藏。", "评论样本：@bally_kehal认为真正的价值是给Agent评估标准，而不只是生成能力。", "评论样本：@kachmass质疑审美不能简单外挂，否则所有人安装同一Skill后又会长得一样。", "评论样本：@MoezZhioua认为它更适合底层代码已经干净、提示约束明确的项目。"],
    saveObject: "AI网页去模板味的4项输入清单",
    learningOutcome: "知道要给AI设计目标、禁用项、参考物和验收标准。",
    body: `AI做网页最烦的，不是它不会写，是做出来像“同一家模板店”。

大标题、发光渐变、三张圆角卡，再配一个看起来很贵但什么都没说的副标题。

今天看到一个开源的 Taste Skill，专门给 Claude Code、Codex、Cursor 这类编码工具补设计约束。原帖只有4.8万浏览，却有1173次收藏，收藏差不多是点赞的两倍。

我试这类工具时，不会只丢一句“做高级一点”，而是先给四样东西：

品牌里必须保留的颜色和字体；
三个绝对不要出现的元素；
一个真实参考页面，并说清楚喜欢哪里；
验收标准，比如手机首屏只能有一个主按钮，正文最小16px。

Skill的作用不是替你长出审美，而是让AI在交稿前有东西可检查。

如果所有人装同一个Skill，页面还是可能再次撞脸。所以最后一步别省：删掉一个最像模板的区块，再补一个只有你这个业务才需要的细节。`,
    video: "AI做网页为什么总像同一个模板？因为你只给了生成任务，没给验收标准。今天这个Taste Skill在X上收藏比点赞还高，它会给Claude Code、Codex、Cursor补设计规则。真正能抄的是四项输入：保留什么、禁止什么、参考哪里、怎么验收。最后再手动删掉一个最像模板的区块，补上你的业务细节。Skill能减少套模板，但不能替你长出审美。",
  }),
  makeItem({
    source: "Lewis Carhart / Comp AI",
    sourceUrl: "https://x.com/lewiscarhart/status/2083610805069611230",
    discussionUrl: "https://x.com/lewiscarhart/status/2083610805069611230",
    evidenceId: "x-2083610805069611230",
    title: "他嫌 CRM 报价太贵，半天做了一个开源版：最值得抄的是这 4 个动作",
    summary: "Comp AI公开内部使用的MIT许可Agent CRM；帖子称因小销售团队收到约8万美元年费报价而自建，系统会从邮件和日历补全客户信息、研究客户并安排跟进。",
    localizedTranslation: "一个不到10人的销售团队因为CRM报价过高，自己做了一个以Agent为中心的开源CRM。",
    heat: 99,
    fit: 96,
    evidenceConfidence: 91,
    actionability: 95,
    recommended: true,
    category: "实操案例",
    engagement: {views:760141,likes:3787,replies:116,reposts:321,bookmarks:7678},
    engagementLabel: "760,141 浏览 · 3,787 赞 · 116 回复 · 321 转发 · 7,678 收藏（8月3日采集）",
    reason: "收藏数超过点赞两倍，既有开源代码又对应小团队真实痛点。",
    angle: "不教读者复制整套CRM，只搬最有价值的客户信息补全、下一步提醒、来源留痕和人工确认。",
    humanCheck: "核对MIT许可证、邮件与日历权限、报价上下文和数据存储方式；不能把作者半天原型写成成熟SaaS。",
    discussionFocus: ["公开帖现为76万浏览、3787赞、7678收藏。", "作者称会从Gmail和日历补全联系人，并提供研究、排队和跟进工具。", "评论样本：@smixshima批评半天vibe coding容易留下大量错误。", "讨论焦点集中在隐私权限、原型稳定性和能否替代成熟CRM。"],
    saveObject: "个人接单客户表的4个自动化字段",
    learningOutcome: "学会先自动化跟进动作，而不是先做一套完整CRM。",
    body: `不到10人的销售团队，CRM报价一年8万美元。

这家公司没买，花半天做了一个自己的版本，还把代码按MIT许可证开源了。现在这条帖子有76万浏览、7678次收藏。

先别学“半天做SaaS”。真正适合个人接单和小团队抄的，是四个动作：

邮件和日历出现新客户时，自动补进客户表；
每个客户只保留一个“下一步做什么”；
AI查到的信息必须带来源，别把猜测写进客户档案；
所有自动发送先排队，最后由人点确认。

你甚至不需要开发。飞书多维表、Notion或普通表格都能先做：客户、来源、最近联系、下一步、截止时间，五列够了。

先跑两周。如果你真的因为忘记跟进丢单，再考虑换CRM；如果表格都没更新，买更贵的软件也救不了。

这条内容最值得搬的不是“CRM已死”，而是小团队先把最痛的四个动作做顺。`,
    video: "一个不到10人的销售团队收到CRM一年8万美元的报价，干脆半天做了一个开源版。别急着学半天做SaaS，个人接单最值得抄的是四件事：新客户自动进表、每人只留一个下一步、AI资料必须带来源、自动发送必须人工确认。先用表格跑两周，真的因为跟进漏单，再考虑上更重的CRM。工具贵不贵不是重点，能不能让你少漏一次跟进才是。",
  }),
  makeItem({
    source: "ゆきち",
    sourceUrl: "https://x.com/fukuzawa_afi/status/2083926051944898725",
    discussionUrl: "https://x.com/fukuzawa_afi/status/2083926051944898725",
    evidenceId: "x-2083926051944898725",
    title: "别把 Claude 当一个万能员工：一个人做业务，先拆这 4 个角色",
    summary: "日本创作者分享用Claude Code承担记录、内容、研究和分析等工作，并用一人公司的比喻组织多个AI角色；原文含低成本和零雇员等营销化表达。",
    localizedTranslation: "用Claude Code建立一个没有正式员工的个人公司，让不同AI角色承担秘书、营销、研究和分析工作。",
    heat: 89,
    fit: 97,
    evidenceConfidence: 78,
    actionability: 96,
    recommended: true,
    category: "接单变现",
    engagement: {views:105478,likes:575,replies:7,reposts:48,bookmarks:845},
    engagementLabel: "105,478 浏览 · 575 赞 · 7 回复 · 48 转发 · 845 收藏（8月3日采集）",
    reason: "收藏高于点赞，个人经营和AI角色分工对目标受众直接有用，但需要去掉夸张成本承诺。",
    angle: "搬运角色分工方法，不搬零员工、低月费就能开公司的结果承诺。",
    humanCheck: "核对原文费用包含哪些服务；会计、税务、合同和最终对外发送不得交给AI自动决定。",
    discussionFocus: ["公开帖为10.5万浏览、575赞、845收藏。", "评论样本：@Restart20241031说过去让一个AI做全部工作，角色拆分的思路最有启发。", "评论样本：@ai28hide认为关键是保留记录和角色分工，让工作第二天能继续。", "评论数量仅7条，不据此推断广泛共识。"],
    saveObject: "一人业务的4个AI角色卡",
    learningOutcome: "学会按输入、产出和权限拆AI角色。",
    body: `我以前也会把所有事都扔给同一个AI：

查资料、写文案、回客户、做复盘，最后上下文挤成一团，它也不知道现在到底在扮演谁。

日本有位创作者最近把Claude Code当成“一人公司”来用，帖子10.5万浏览、845次收藏。这个比喻真正有用的地方，不是零员工开公司，而是角色分开。

个人接单可以先拆四个：

前台：收集客户需求，只整理，不承诺；
研究员：找资料，每条结论带来源；
内容编辑：按你的口吻出初稿，不直接发布；
项目助理：更新待办、截止时间和下一步。

每个角色只写清三件事：它能看什么、要交什么、哪些动作必须问你。

合同、报价、税务、最终发送，都不要自动化。

角色分工的价值不是让AI假装有一家公司，而是让你第二天打开电脑，还知道昨天做到了哪里。`,
    video: "别把Claude当一个万能员工。个人做业务最容易踩的坑，就是查资料、写文案、回客户、做复盘全部塞进一个对话。可以先拆四个角色：前台只收需求，研究员每条结论带来源，编辑只出初稿，项目助理只管待办。每个角色再写清能看什么、交什么、哪些动作必须问你。合同、报价和最终发送永远保留人工确认。",
  }),
  makeItem({
    source: "ゆとりくん",
    sourceUrl: "https://x.com/katap_yutori/status/2083889713757450638",
    discussionUrl: "https://x.com/katap_yutori/status/2083889713757450638",
    evidenceId: "x-2083889713757450638",
    title: "把长视频丢给 Claude 自动切片：想真能用，先保留这 3 个时间点",
    summary: "日本创作者展示一个把长视频交给Claude后自动生成短切片的工具，帖子公开互动较高，但未公开完整准确率和人工修剪耗时。",
    localizedTranslation: "我做了一个工具，可以把交给Claude的长视频自动切成短片。",
    heat: 82,
    fit: 94,
    evidenceConfidence: 72,
    actionability: 90,
    engagement: {views:60537,likes:571,replies:2,reposts:24,bookmarks:325},
    engagementLabel: "60,537 浏览 · 571 赞 · 2 回复 · 24 转发 · 325 收藏（8月3日采集）",
    reason: "切片需求真实，但原帖没有足够结果样本，先进入候选观察。",
    angle: "搬运自动切片思路，补上开头结论、情绪变化、独立案例三种时间点和人工复核。",
    humanCheck: "核对工具链接、上传隐私、支持格式、字幕准确率和人工修剪时间。",
    discussionFocus: ["公开互动为6.05万浏览、571赞、325收藏。", "评论只有2条，无足够可验证样本，不能推断用户满意度。"],
    saveObject: "长视频切片的3类时间点",
    learningOutcome: "知道自动切片后仍需检查上下文、字幕和画面完整性。",
    body: `长视频自动切片，真正难的不是“切”，是别把一句话切得没头没尾。

日本创作者展示了一个把长视频交给Claude自动生成短片的工具，6万浏览、571赞。不过原帖没有公开准确率，也没说最后人工修了多久。

如果你自己做，先让AI只找三类时间点：

一句能单独成立的结论；
情绪明显变化的瞬间；
有起因和结果的完整小案例。

每条候选都保留前后各15秒，再人工检查字幕、人名、数字和画面有没有断。

能自动找候选，已经能省时间；别把“自动切片”理解成“直接发布”。`,
    video: "长视频自动切片最怕什么？不是切得慢，是把一句话切得没头没尾。让AI先只找三类时间点：能独立成立的结论、情绪变化、完整小案例。每条前后多留15秒，再人工检查字幕、人名、数字和画面。自动找候选已经很省时间，但自动发布还差得远。",
  }),
  makeItem({
    source: "ゆきち",
    sourceUrl: "https://x.com/fukuzawa_afi/status/2083387232149528676",
    discussionUrl: "https://x.com/fukuzawa_afi/status/2083387232149528676",
    evidenceId: "x-2083387232149528676",
    title: "一份 AI 学习清单在日本被收藏 1.8 万次，但别照单全收",
    summary: "日本创作者用5张YouTube截图组成两小时AI学习清单，帖子获得278万浏览和1.8万收藏；清单主要面向日语受众，具体内容需要逐项核验。",
    localizedTranslation: "今晚少看两小时Netflix，改看下面5个YouTube视频，作者声称能大幅提升AI水平。",
    heat: 100,
    fit: 90,
    evidenceConfidence: 78,
    actionability: 76,
    engagement: {views:2785945,likes:14373,replies:72,reposts:898,bookmarks:18002},
    engagementLabel: "2,785,945 浏览 · 14,373 赞 · 72 回复 · 898 转发 · 18,002 收藏（8月3日采集）",
    reason: "互动极高，但清单依赖日语视频截图，尚未完成逐条内容和版权核验，因此不直接推荐发布。",
    angle: "可借鉴两小时学习路线的包装方式，但需重新选择适合中文用户的5个一手资源。",
    humanCheck: "逐条核对5个视频标题、作者、发布时间、内容质量和是否允许使用封面截图。",
    discussionFocus: ["公开互动为278万浏览、1.43万赞、1.8万收藏。", "评论样本：@putrillate认为难点不是找到资源，而是真正坐下来观看。", "评论样本：@joshua91104质疑100倍提升是夸张承诺。"],
    saveObject: "两小时AI学习路线",
    learningOutcome: "学会按基础、实操、商业三个层次安排学习，而不是收藏后不看。",
    body: `一份“少看两小时Netflix，改看5个AI视频”的清单，在日本X上被收藏了1.8万次。

这个包装很会抓人，但“看完AI水平提升100倍”显然不能当事实。

如果要做中文版，别直接搬5张截图。更实用的安排是：

20分钟看模型为什么会答错；
30分钟学一次完整提示和资料整理；
40分钟跟做一个能交付的小项目；
20分钟看隐私、版权和核验；
10分钟写下明天要试的一个动作。

学习清单最大的敌人不是资源少，是收藏以后从没点开。

所以每看完一个，必须留下一个产物：提示词、表格、页面或复盘。没有产物，就不算学完。`,
    video: "一份AI学习清单在日本被收藏1.8万次，标题是少看两小时Netflix，改看5个AI视频。100倍提升当然是夸张，但它提醒了一个问题：收藏不等于学会。两小时可以这样分：20分钟懂原理，30分钟学方法，40分钟跟做项目，20分钟补隐私和核验，最后10分钟写明天要试的动作。每看完一个资源，必须留下一个产物。",
  }),
  makeItem({
    source: "タイガ",
    sourceUrl: "https://x.com/taiga_aii/status/2083855348767887487",
    discussionUrl: "https://x.com/taiga_aii/status/2083855348767887487",
    evidenceId: "x-2083855348767887487",
    title: "Claude Code 的 Skill 开始有“应用商店”了，安全性不能只看热门",
    summary: "日本创作者分享一个汇总Claude Code Skills的网站，帖子获得高收藏；原文声称列表基本安全，但没有公开完整审核标准。",
    localizedTranslation: "这是一个收集全球Claude Code Skills的网站，作者称其中多数可以安全使用。",
    heat: 86,
    fit: 92,
    evidenceConfidence: 66,
    actionability: 84,
    engagement: {views:64441,likes:672,replies:8,reposts:45,bookmarks:1043},
    engagementLabel: "64,441 浏览 · 672 赞 · 8 回复 · 45 转发 · 1,043 收藏（8月3日采集）",
    reason: "收藏高，但站点和安全审核标准需要人工核验，暂不推荐。",
    angle: "借鉴Skill目录的发现方式，同时给出安装前权限、来源、更新记录和卸载路径检查。",
    humanCheck: "确认目录网址、维护者、审核规则及Skill实际代码来源；不得写成官方或保证安全。",
    discussionFocus: ["公开互动为64441浏览、672赞、1043收藏。", "可验证评论仅8条，当前无足够样本证明目录中的Skill安全。"],
    saveObject: "安装AI Skill前的4项安全检查",
    learningOutcome: "知道热门目录只是发现入口，不是安全背书。",
    body: `Claude Code的Skill开始像插件一样越装越多，也出现了专门收集Skill的网站。

日本一条相关帖子有6.4万浏览、1043次收藏。但原帖一句“基本都安全”不能直接信。

安装前至少看四件事：代码从哪里来；会读取哪些文件；最近一次更新是什么时候；出问题怎么卸载。

热门只说明很多人想试，不说明已经有人审过代码。

目录可以帮你找工具，权限边界还是要自己看。`,
    video: "Claude Code的Skill开始像插件一样越装越多，也出现了专门的目录站。相关帖子有1043次收藏，但热门不等于安全。安装前看四件事：代码来源、能读哪些文件、最近更新时间、怎么卸载。目录负责发现，安全边界必须自己确认。",
  }),
  makeItem({
    source: "Alec Fong",
    sourceUrl: "https://x.com/alecqfong/status/2083679692897603838",
    discussionUrl: "https://x.com/alecqfong/status/2083679692897603838",
    evidenceId: "x-2083679692897603838",
    title: "四台英伟达设备跑本地 AI：这不是普通人的入门配置",
    summary: "Alec Fong展示用两台DGX Spark和两台DGX Station分别运行DeepSeek与GLM，并用Brev负责集群网络和编排。",
    localizedTranslation: "当前本地AI配置：两台DGX Spark负责实现和子Agent，两台DGX Station负责规划与建议。",
    heat: 92,
    fit: 65,
    evidenceConfidence: 88,
    actionability: 45,
    category: "产业观察",
    engagement: {views:280142,likes:1798,replies:114,reposts:108,bookmarks:1018},
    engagementLabel: "280,142 浏览 · 1,798 赞 · 114 回复 · 108 转发 · 1,018 收藏（8月3日采集）",
    reason: "互动高但配置昂贵且技术门槛高，不适合作为普通用户教程。",
    angle: "解释规划模型和执行模型分工，不鼓励照抄硬件。",
    humanCheck: "核对设备型号、内存、量化格式、功耗和实际成本。",
    discussionFocus: ["公开互动为28万浏览、1798赞、1018收藏。", "114条回复主要围绕成本、速度和是否值得本地部署；需人工抽样核验后才能归纳共识。"],
    saveObject: "规划模型与执行模型的分工图",
    learningOutcome: "知道本地运行可分工，但普通电脑不等于同等体验。",
    body: `有人用两台DGX Spark跑执行模型，再用两台DGX Station跑规划模型。

这个配置在X上有28万浏览，但它不是普通人的本地AI入门教程。

能借鉴的是分工：一个模型负责规划和检查，一个负责真正写代码、跑任务。

不能照搬的是硬件结论。设备、内存、量化方式和功耗都会决定体验。

普通用户先用云端或一台现有电脑验证工作流，再考虑买设备。`,
    video: "四台英伟达设备跑本地AI的帖子很火，但别把它当普通电脑教程。真正能抄的是分工：规划模型负责拆任务和检查，执行模型负责写代码和跑动作。先用云端或现有电脑验证工作流，确认隐私、速度或成本真的有问题，再谈买硬件。",
  }),
  makeItem({
    source: "Nova",
    sourceUrl: "https://x.com/NovaXCode/status/2083876901676798226",
    discussionUrl: "https://x.com/NovaXCode/status/2083876901676798226",
    evidenceId: "x-2083876901676798226",
    title: "凌晨 2:45 还在和 Claude 改项目：这条梗为什么有人转",
    summary: "开发者用一段深夜和Claude协作的视频表达AI编程的沉浸感，内容偏情绪共鸣而非教程。",
    localizedTranslation: "凌晨2:45的我和Claude。",
    heat: 90,
    fit: 72,
    evidenceConfidence: 90,
    actionability: 35,
    category: "个人 IP",
    engagement: {views:203043,likes:3663,replies:55,reposts:319,bookmarks:942},
    engagementLabel: "203,043 浏览 · 3,663 赞 · 55 回复 · 319 转发 · 942 收藏（8月3日采集）",
    reason: "情绪共鸣强但信息量低，只作为个人IP表现形式候选。",
    angle: "借鉴真实使用场景，不鼓励熬夜，也不把视频当效率证明。",
    humanCheck: "核对视频内容是否包含可识别项目或客户信息。",
    discussionFocus: ["公开互动为20.3万浏览、3663赞、319转发。", "原帖仅一句话，不能据此推断工具效果。"],
    saveObject: "开发者日常短视频镜头表",
    learningOutcome: "知道个人IP内容可以展示真实过程，但要补一个具体收获。",
    body: `“凌晨2:45的我和Claude。”

就这一句配一段视频，20万浏览、3663赞。

它有共鸣，因为很多人真的经历过：本来只想改一个小问题，回过神已经半夜。

如果做自己的版本，别只拍屏幕。加上三个信息：原本要解决什么、AI在哪一步卡住、最后你亲手改了什么。

这样才不是熬夜打卡，而是一段有结论的工作记录。`,
    video: "凌晨2:45还在和Claude改项目，这种视频为什么有人看？因为场景是真的。但自己的版本别只拍屏幕，补三句话：原本要解决什么，AI在哪一步卡住，最后你亲手改了什么。真实过程加一个具体结论，才不是单纯熬夜打卡。",
  }),
  makeItem({
    source: "Krishna Agrawal",
    sourceUrl: "https://x.com/Krishnasagrawal/status/2083640298123776067",
    discussionUrl: "https://x.com/Krishnasagrawal/status/2083640298123776067",
    evidenceId: "x-2083640298123776067",
    title: "一场 Stanford AI 讲座被收藏 1162 次，但先核对它到底讲什么",
    summary: "创作者推荐一段约两小时的Stanford会议视频，称适合解释ChatGPT和Claude的工作方式；帖子没有在正文完整列出课程信息。",
    localizedTranslation: "今晚少看两小时Netflix，改看这场Stanford会议，它能解释ChatGPT和Claude如何工作。",
    heat: 84,
    fit: 80,
    evidenceConfidence: 65,
    actionability: 65,
    engagement: {views:78859,likes:510,replies:14,reposts:124,bookmarks:1162},
    engagementLabel: "78,859 浏览 · 510 赞 · 14 回复 · 124 转发 · 1,162 收藏（8月3日采集）",
    reason: "高收藏但课程身份和内容范围未完整核验，先留候选。",
    angle: "核验后可做中文观看笔记，而不是只搬链接。",
    humanCheck: "确认视频标题、讲者、时长、发布日期和是否确为Stanford官方会议。",
    discussionFocus: ["公开互动为78859浏览、510赞、1162收藏。", "评论仅14条，当前未完成逐条核验。"],
    saveObject: "一页中文观看笔记",
    learningOutcome: "知道看AI原理课时应带着哪些问题。",
    body: `一段号称能讲清ChatGPT和Claude原理的Stanford视频，被收藏了1162次。

不过原帖没有把课程标题、讲者和范围写完整，所以现在还不适合直接搬成“必看课”。

真正可用的发布方式，是先把视频看完，整理三件事：模型为什么会编、上下文为什么会丢、什么时候必须查来源。

链接只是入口，中文观看笔记才是这个账号应该补的价值。`,
    video: "一场号称讲清ChatGPT和Claude原理的Stanford视频，被收藏1162次。但原帖连课程信息都没写完整，先别急着搬链接。真正值得做的是看完以后整理三件事：模型为什么会编、上下文为什么会丢、什么时候必须查来源。资源只是入口，中文笔记才是价值。",
  }),
  makeItem({
    source: "CyrilXBT",
    sourceUrl: "https://x.com/cyrilXBT/status/2083762211718394276",
    discussionUrl: "https://x.com/cyrilXBT/status/2083762211718394276",
    evidenceId: "x-2083762211718394276",
    title: "Claude Code 一条命令接入 1.7 万只股票数据？金融内容先别照抄",
    summary: "帖子展示通过MCP把金融数据服务接入Claude Code，并声称覆盖1.7万只股票、加密货币价格和财报；属于高风险金融信息场景。",
    localizedTranslation: "Claude Code可以在一分钟内接入覆盖1.7万只股票、加密货币和财报的实时数据。",
    heat: 88,
    fit: 64,
    evidenceConfidence: 62,
    actionability: 60,
    category: "产业观察",
    engagement: {views:141866,likes:800,replies:37,reposts:149,bookmarks:1809},
    engagementLabel: "141,866 浏览 · 800 赞 · 37 回复 · 149 转发 · 1,809 收藏（8月3日采集）",
    reason: "收藏很高，但实时性、授权和投资误用风险未核验，按高风险规则降级。",
    angle: "只讨论数据接入和来源校验，不提供投资判断。",
    humanCheck: "核对数据供应商、延迟、市场覆盖、授权条款和免责声明；必须由金融合规人员复核。",
    discussionFocus: ["公开互动为14.1万浏览、800赞、1809收藏。", "无足够可验证评论样本证明数据实时或完整。"],
    saveObject: "金融数据接入的来源核验表",
    learningOutcome: "知道能取到数据不等于能据此做投资决策。",
    body: `一条命令把金融数据接进Claude Code，帖子被收藏了1809次。

看起来很方便，但金融数据最重要的不是“接进来了”，而是来源、延迟、市场覆盖和授权。

如果只是做研究，至少让每个数字带时间和来源；如果涉及交易或给别人建议，不能让AI直接下结论。

能查数据，不等于能替你做投资决策。`,
    video: "Claude Code一条命令接入1.7万只股票数据的帖子，被收藏1809次。但金融数据先看四件事：来源、延迟、覆盖、授权。每个数字都要带时间和出处，涉及交易或对外建议时必须人工复核。能查到数据，不等于能替你做投资决策。",
  }),
  makeItem({
    source: "Andrew Curran",
    sourceUrl: "https://x.com/AndrewCurran_/status/2083998274906894449",
    discussionUrl: "https://x.com/AndrewCurran_/status/2083998274906894449",
    evidenceId: "x-2083998274906894449",
    title: "有人称 Claude Code 8 分钟找到钱包漏洞：攻击复现不能当教程发",
    summary: "帖子称Claude Code可在8分钟内找到某钱包攻击使用的同类漏洞，但没有在正文提供足够独立复现材料。",
    localizedTranslation: "Claude Code可以独立在8分钟内找到这次攻击所利用的同类钱包漏洞。",
    heat: 82,
    fit: 50,
    evidenceConfidence: 55,
    actionability: 20,
    category: "产业观察",
    engagement: {views:70174,likes:630,replies:31,reposts:62,bookmarks:115},
    engagementLabel: "70,174 浏览 · 630 赞 · 31 回复 · 62 转发 · 115 收藏（8月3日采集）",
    reason: "安全攻击内容敏感且证据不足，只保留为风险观察。",
    angle: "可讨论开发者要加强依赖与密钥审计，不公开可操作攻击步骤。",
    humanCheck: "安全专家核对漏洞编号、测试环境、授权范围和复现证据。",
    discussionFocus: ["公开互动为7万浏览、630赞、31回复。", "当前没有足够独立材料验证8分钟结论。"],
    saveObject: "代码安全复核清单",
    learningOutcome: "知道AI会降低漏洞发现门槛，但不能传播攻击步骤。",
    body: `有人称Claude Code用8分钟找到了钱包攻击里的同类漏洞。

这个数字很抓人，但正文没有给出足够独立复现材料，不能直接写成事实教程。

对普通开发者更有用的提醒是：密钥别进仓库、依赖定期更新、关键交易路径做人工审计。

安全内容可以讲防守，不要把未经授权的攻击复现包装成技巧。`,
    video: "有人称Claude Code八分钟找到钱包漏洞，但证据还不够，攻击步骤也不适合拿来做教程。普通开发者真正该做的是三件事：密钥不进仓库、依赖定期更新、关键交易路径人工审计。AI降低了找漏洞的门槛，也让基础安全更不能省。",
  }),
  makeItem({
    source: "Mulan Chun-Li / Qi Guang",
    sourceUrl: "https://x.com/chunlimulan/status/2083769235432669482",
    discussionUrl: "https://x.com/chunlimulan/status/2083769235432669482",
    evidenceId: "x-2083769235432669482",
    title: "一条“东方仙境”AI视频拿到 6546 赞，审美题材比模型名更重要",
    summary: "创作者发布由Qi Guang生成的东方仙境主题AI视频，在X获得高点赞和转发；未公开完整制作流程。",
    localizedTranslation: "不朽之境：由Qi Guang用AI生成的中国式天堂想象。",
    heat: 94,
    fit: 78,
    evidenceConfidence: 82,
    actionability: 55,
    category: "个人 IP",
    engagement: {views:323925,likes:6546,replies:86,reposts:759,bookmarks:2313},
    engagementLabel: "323,925 浏览 · 6,546 赞 · 86 回复 · 759 转发 · 2,313 收藏（8月3日采集）",
    reason: "视觉传播强，但缺少制作流程和版权信息，暂不推荐。",
    angle: "讨论题材、色彩和运动设计，不假装掌握作者提示词。",
    humanCheck: "确认模型、素材版权、音乐授权和是否允许二次使用画面。",
    discussionFocus: ["公开互动为32.3万浏览、6546赞、759转发、2313收藏。", "未核验86条回复，不能推断具体审美共识。"],
    saveObject: "东方幻想AI视频的视觉拆解卡",
    learningOutcome: "知道视觉内容先确定题材和镜头，再选模型。",
    body: `一条东方仙境AI视频，在X上有6546赞、759次转发。

它火的原因不能简单归给某个模型。题材、色彩、镜头运动和音乐共同决定了效果。

如果做自己的版本，先写清三个视觉词、一个镜头运动和一条禁用项，再去生成。

原帖没有公开完整流程，也没有说明素材授权，所以现在只能做审美拆解，不能照搬画面和提示词。`,
    video: "一条东方仙境AI视频拿到6546赞。别只问它用了什么模型，先看题材、色彩、镜头运动和音乐。自己的版本先写三个视觉词、一个镜头动作和一条禁用项，再去生成。没有完整流程和版权信息时，只做审美拆解，不照搬画面。",
  }),
];

function carry(title, overrides = {}) {
  const h = recent.state.hotspots.find((entry) => entry.title === title);
  if (!h) throw new Error(`Missing carry item: ${title}`);
  const d = recent.state.drafts.find((entry) => entry.hotspotId === h.id);
  return makeItem({
    source: h.source, sourceUrl: h.sourceUrl, sourceType: h.sourceType, discussionUrl: h.discussionUrl,
    evidenceId: h.evidenceId, title: h.title, summary: h.summary, localizedTranslation: h.localizedTranslation,
    heat: h.heat, scarcity: Math.min(h.scarcity, 55), fit: h.fit, evidenceConfidence: h.evidenceConfidence,
    actionability: h.actionability, category: h.category, engagement: h.engagement,
    engagementLabel: h.engagementLabel, reason: h.reason, angle: h.angle, humanCheck: h.humanCheck,
    discussionFocus: h.discussionFocus, saveObject: h.saveObject, learningOutcome: h.learningOutcome,
    body: d.body, video: d.videoScript, recommended: false, ...overrides,
  });
}

const carryItems = [
  carry("别再只看每百万Token多少钱：这次有人开始算整件任务", {recommended:true, reason:"任务成本比Token单价更适合普通用户比较模型，且原帖仍在快速传播。"}),
  carry("YC 把公司内部的 AI 助手开源了，但先别急着装"),
  carry("每天跟AI聊到停不下来，Hank Green先给自己踩了刹车"),
  carry("Snapchat不再奖励纯AI内容：以后要留下这三种“人做的证据”", {recommended:true}),
  carry("Google上线一天就撤掉AI地图功能：做历史图最怕这一件事", {recommended:true}),
  carry("今天起，欧盟这4类AI内容要更清楚地告诉用户"),
  carry("7.6PB训练数据里藏着密钥：公开数据集不等于安全数据集"),
];

const items = [...newItems, ...carryItems];
if (items.length !== 20) throw new Error(`Expected 20 items, got ${items.length}`);
if (items.filter((entry) => entry.recommended).length !== 7) throw new Error("Expected 7 recommendations");

const hotspots = items.map((entry, index) => ({
  id: 2026080301 + index, rank:index+1, source:entry.source, sourceUrl:entry.sourceUrl, sourceType:entry.sourceType,
  age:"今天/近48小时", title:entry.title, summary:entry.summary, heat:entry.heat, scarcity:Math.min(entry.scarcity,55), fit:entry.fit,
  reason:entry.reason, angle:entry.angle, platforms:["小红书","抖音","视频号"], category:entry.category,
  status:"待审核", selected:false, assignee:"待分配", live:true, sourceCapturedAt:capturedAt,
  evidenceConfidence:entry.evidenceConfidence, actionability:entry.actionability, domesticCoverage,
  humanCheck:entry.humanCheck, evidenceId:entry.evidenceId, engagement:entry.engagement,
  engagementLabel:entry.engagementLabel, discussionUrl:entry.discussionUrl, discussionFocus:entry.discussionFocus,
  commentSamples:entry.discussionFocus.filter((line)=>line.includes("评论样本")),
  reuseIdeas:entry.reuseIdeas || [`首屏：${entry.title}`, `本地化角度：${entry.angle}`, "只搬可验证事实和方法，保留来源与边界。"],
  localizedTranslation:entry.localizedTranslation, analysisState:"已分析", saveObject:entry.saveObject,
  learningOutcome:entry.learningOutcome, recommended:entry.recommended,
  editorialGate:{saveObject:entry.saveObject,learningOutcome:entry.learningOutcome,shareReason:"读者能得到一个可执行动作、可复用清单或清晰判断。",passed:true},
}));

const drafts = items.map((entry,index)=>({
  id:5026080301+index, hotspotId:2026080301+index, platform:"小红书", title:entry.title, body:entry.body,
  visual, videoScript:entry.video, version:"V1 · 8月3日来源重写稿", parentVersion:null,
  revisionMode:"operator-daily", revisionReason:"基于8月3日仍在传播的真实原帖、公开互动和可验证评论重新筛选并本地化。",
  revisedAt:capturedAt, updatedBy:"Codex AI Content Operator", status:"待审核", reviewNote:"",
}));

const priorState = prior.state ?? prior;
const priorDrafts = Array.isArray(priorState.drafts) ? priorState.drafts : [];
const state = {
  schemaVersion:2, hotspots, drafts,
  draftHistory:[...(Array.isArray(priorState.draftHistory)?priorState.draftHistory:[]), ...priorDrafts.map((draft)=>({...draft,archivedAt:capturedAt,supersededBy:"2026-08-03 daily batch",revisionReason:"跨日换新来源；保留旧版本和审核状态供追溯。"}))],
  discoveryMeta:{
    runId:"daily-2026-08-03-real-sources", capturedAt,
    coverageLabel:"20条候选：X 13个主题、近48小时一手/讨论来源7个主题；7条推荐，20条均有来源分析、小红书稿与短视频口播。",
    editorialBrief:"优先高收藏、普通读者看得懂且能马上照做的AI技巧、个人IP案例和平台资讯；不把高赞但证据薄弱、金融或攻击内容列为推荐。",
    sourceSuccess:["X已登录浏览器：核验正文、链接、发布时间、浏览、点赞、回复、转发、收藏与代表性评论。","生产工作台拉取成功：确认当前仍为7月31日内容，未发现reviewNote。","近48小时的一手项目页、媒体报道和官方规则作为补充证据。"],
    sourceFailure:["Hacker News Algolia、TechCrunch RSS和公开Web在本轮出现TLS/网络错误，未把失败或空结果包装成新内容。","Instagram、TikTok、LinkedIn未取得同时满足时效、AI相关和公开互动可复核的样本。","国内平台内全量语义查重不可用；稀缺度封顶55，并保留人工复核任务。"],
    domesticSearchState:"无法完成小红书/抖音平台内全量同义搜索，不宣称国内没人发；发布前需按产品名、核心主张、目标人群和具体做法分别搜索。",
    rejectedTopics:["X搜索中的成人内容、广告和仅因正文出现AI而命中的无关高赞帖。","GPT不限量、AI投资和攻击复现等高风险或证据不足主张不进入推荐。","同一艺人直播事件的转述帖合并为一个热点，不重复占位。","旧生产批次已出现的20个主题不重复推荐。"],
    recommendationCount:7,
    reviewNoteAudit:{productionPull:"成功：更新前已拉取20条候选与20条草稿。",currentPacketNotes:priorDrafts.filter((draft)=>(draft.reviewNote??"").trim()!=="").length,action:"未发现待处理reviewNote；旧草稿、版本和状态已归档；没有自动审核或发布。"},
  },
};

const packet={mode:"replace",detail:"2026-08-03真实来源日更：20条候选、7条推荐、20条完整小红书稿与短视频口播；保留历史版本，不自动审核或发布。",state};
const handoff={
  schema_version:2,batch_id:"daily-2026-08-03-real-sources",batch_date:"2026-08-03",editorial_brief:state.discoveryMeta.editorialBrief,
  hotspots:hotspots.map((h,index)=>({
    id:String(h.id),title:h.title,summary:h.summary,category:h.category,status:"待审核",recommended:items[index].recommended,
    reason:h.reason,angle:h.angle,human_check:h.humanCheck,
    sources:[{url:h.sourceUrl,author:h.source,discussion_url:h.discussionUrl,source_type:h.sourceType,captured_at:h.sourceCapturedAt,engagement:h.engagement,engagement_label:h.engagementLabel}],
    scores:{foreign_heat:h.heat,domestic_scarcity:h.scarcity,account_fit:h.fit,actionability:h.actionability,evidence_confidence:h.evidenceConfidence,final:Math.round(h.heat*.25+h.scarcity*.25+h.fit*.25+h.actionability*.15+h.evidenceConfidence*.1)},
    domestic_checks:[{platform:"小红书/抖音",query:h.title,finding:h.domesticCoverage}],localized_translation:h.localizedTranslation,
    discussion_focus:h.discussionFocus,comment_samples:h.commentSamples,reuse_ideas:h.reuseIdeas,save_object:h.saveObject,learning_outcome:h.learningOutcome,
  })),
  drafts:drafts.map((d)=>({content_id:String(d.id),hotspot_id:String(d.hotspotId),platform:d.platform,title:d.title,body:d.body,visual_brief:d.visual,video_script:d.videoScript,version:1,parent_version:null,status:"待审核"})),
  gaps:state.discoveryMeta.sourceFailure,generated_at:capturedAt,
};

fs.writeFileSync(outPath, `${JSON.stringify(packet,null,2)}\n`);
fs.writeFileSync(handoffPath, `${JSON.stringify(handoff,null,2)}\n`);
console.log(outPath);
console.log(handoffPath);
