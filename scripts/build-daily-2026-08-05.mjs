import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const previous = JSON.parse(fs.readFileSync(path.join(root, "operator-packets/2026-08-04-daily-batch.json"), "utf8"));
const previousState = previous.state ?? previous;
const capturedAt = "2026-08-05T08:31:13+08:00";
const outPath = path.join(root, "operator-packets/2026-08-05-daily-batch.json");
const handoffPath = path.join(root, "operator-packets/2026-08-05-daily-handoff.json");

const domesticCoverage = "无法完成小红书、抖音平台内全量同义检索；国内稀缺度按规则封顶55。发布前请运营人员分别搜索产品名、原作者、核心主张和本文角度，不宣称‘国内没人发’。";
const visual = "4:5黑白极简信息卡，少量圆角与一处手绘线条。首图只放一句标题和一个真实物件；内页优先呈现对照、步骤或核验结果。禁用机器人头像、发光渐变、虚构收益和无法复现的效果图。";

function item(data) {
  return {
    sourceType: "Hacker News",
    category: "AI 技巧",
    scarcity: 55,
    fit: 82,
    evidenceConfidence: 80,
    actionability: 72,
    recommended: false,
    engagement: { views: null, likes: null, replies: null, reposts: null, bookmarks: null },
    discussionFocus: ["没有取得可验证评论样本，不据此推断讨论共识。"],
    commentSamples: [],
    ...data,
  };
}

const items = [
  item({
    source: "Nelson Figueroa / Hacker News", sourceUrl: "https://nelson.cloud/ai-generated-images-discourage-me-from-reading-your-blog/", discussionUrl: "https://news.ycombinator.com/item?id=49167113", evidenceId: "hn-49167113",
    title: "AI 配图越精致，读者反而越不想点开？434 条评论吵翻了", summary: "一篇反对个人博客使用通用AI配图的旧文在8月4日重新登上Hacker News，获得727 points和434条评论。作者认为这类图会让读者怀疑正文同样低投入。",
    localizedTranslation: "作者说：个人博客一出现明显的AI生成配图，我就会怀疑正文是否也由AI生成。与其放这种图，我宁愿看到一张粗糙但确实由作者画的示意图。",
    heat: 100, fit: 99, actionability: 96, evidenceConfidence: 92, recommended: true, category: "个人 IP",
    engagementLabel: "Hacker News 727 points · 434 comments（8月5日采集）；原站未公开浏览、点赞与收藏",
    reason: "讨论量远高于当天其他AI话题，而且直接击中个人IP的信任问题。正文不做反AI站队，给创作者一个能马上执行的配图判断法。",
    angle: "不是‘AI图都不能用’，而是每张图必须承担证据、解释或导航中的一种作用。",
    humanCheck: "发布前核对最新HN讨论页；评论只是特定社区样本，不能写成所有用户都讨厌AI配图。",
    discussionFocus: ["一部分读者把通用AI图视为低投入信号，继而怀疑正文质量。", "反对者认为AI只是工具，研究和内容本身投入很高时，不应仅凭配图否定文章。"],
    commentSamples: ["相关HN讨论中，edan m认为：团队可能不会画画或英语不是母语，用AI辅助不等于内容低投入。", "exsomet反问：信息流里文章太多时，读者为什么不把明显AI风格当成快速过滤信号？"],
    saveObject: "发帖配图的3问判断卡", learningOutcome: "能判断一张图是在增加信息，还是只让内容显得更像模板。",
    reuseIdeas: ["截图用来证明", "简图用来解释", "信息卡用来导航"],
    body: `我以前觉得，文案写完总得配张“像样的图”。现在越来越不敢随便生成一张放上去。

昨天一篇两年前的短文重新冲上 Hacker News：727 分，434 条评论。作者的意思很直接——个人博客一出现那种很标准的 AI 配图，他会顺手怀疑：正文是不是也批量生成的？

这不代表 AI 图不能用。真正的问题是，图里有没有正文没有的信息。

发之前我会问三句：

这张是证据吗？比如真实操作截图、前后对比、原始数据。
这张能解释吗？比如自己画的流程、结构、关系。
这张能导航吗？比如把一篇长内容拆成可扫读的卡片。

三个都不是，只是“一个人在发光的电脑前工作”，我宁愿不放。

个人账号最值钱的不是画面有多满，是读者一眼能看出：这张图只有做过这件事的人才会留下。

#AI内容 #个人IP #内容创作`,
    video: "如果你的AI内容没人点，先别急着改标题，可能是配图在劝退。昨天一篇旧文重新冲上HN，727分、434条评论。很多人说，通用AI配图会让他们顺手怀疑正文也很水。发图前只问三句：它能证明什么？解释什么？帮读者找到什么？三个都答不上来，就删掉。真实截图、手画流程，通常比又一张发光机器人更可信。",
  }),
  item({
    source: "Mistral AI / Hacker News", sourceUrl: "https://mistral.ai/news/shieldstral/", discussionUrl: "https://news.ycombinator.com/item?id=49171268", evidenceId: "hn-49171268",
    title: "Mistral 做了个 3B 的“内容审核员”，但小模型不等于能放心自动删", summary: "Mistral发布Shieldstral，一个3B参数的开放权重多模态审核模型，用于同时判断文字和图片内容。HN讨论获得294 points和70条评论。",
    localizedTranslation: "Shieldstral是一个30亿参数的开放权重多模态审核模型，用于识别文字和图片中的潜在违规内容。具体类别、阈值和效果应以官方模型卡为准。",
    heat: 91, fit: 79, actionability: 66, evidenceConfidence: 94, category: "产业观察",
    engagementLabel: "Hacker News 294 points · 70 comments（8月5日采集）；官方页未公开浏览、点赞与收藏",
    reason: "官方发布和社区讨论都可验证，但对普通创作者略技术，保留候选。",
    angle: "把审核模型翻译成‘先分类、再按风险决定是否交给人’，不把模型当最终裁判。",
    humanCheck: "核对模型许可证、支持语言、类别定义、阈值和中文测试；不得声称适合直接自动封禁。",
    saveObject: "AI审核的三段式流程", learningOutcome: "知道分类结果、风险阈值和人工决定是三件事。",
    body: `Mistral 新开源了一个 3B 的多模态内容审核模型，能同时看文字和图片。

这个体量看起来很适合本地跑，但“能跑”不等于“可以自动删”。真正落地至少要分三层：模型先分类，高风险进入人工队列，最后由明确的人和规则决定。中文、隐喻和平台语境还要单独测试。

目前更适合拿来做预筛，不适合当最终裁判。`,
    video: "Mistral发布了一个3B的多模态内容审核模型，文字和图片都能看。但小模型能本地跑，不等于能自动封禁。更稳的流程是：模型先分类，高风险交给人，最后按明确规则决定。尤其中文、隐喻和平台语境，必须自己做测试。",
  }),
  item({
    source: "Cloudflare / Hacker News", sourceUrl: "https://blog.cloudflare.com/engineering-standards-enforcement/", discussionUrl: "https://news.ycombinator.com/item?id=49170628", evidenceId: "hn-49170628",
    title: "Cloudflare 没让 AI 随便改代码，而是先让它专门抓这 4 类问题", summary: "Cloudflare分享用AI执行工程规范检查的做法。当天HN获得31 points和3条评论；重点是把规范转成可检查项，而不是让模型凭感觉评审。",
    localizedTranslation: "Cloudflare用AI辅助执行工程标准，把原本依赖人工记忆的规则变成持续检查。具体覆盖范围和误报控制以官方工程文章为准。",
    heat: 66, fit: 96, actionability: 97, evidenceConfidence: 95, recommended: true, category: "实操案例",
    engagementLabel: "Hacker News 31 points · 3 comments（8月5日采集）；官方页未公开浏览、点赞与收藏",
    reason: "绝对互动不算最高，但属于可复用的一手团队实践，能转成普通团队也能使用的交付检查法。",
    angle: "把AI评审从‘写得好不好’改成核对命名、权限、错误处理和测试证据。",
    humanCheck: "发布前逐段核对Cloudflare原文列出的实际检查项，本文示例不得冒充其完整内部规则。",
    saveObject: "交付前AI检查表", learningOutcome: "会把模糊的‘帮我检查’改成能逐条判断的规则。",
    body: `“帮我检查一下这份东西有没有问题。”

这句话我以后尽量不丢给 AI 了。它太容易回一段听起来很认真、其实哪里都没查透的话。

Cloudflare 最近公开了他们用 AI 执行工程规范的做法。最值得抄的不是工具，而是先把“规范”写成可判断的问题。

换成我们做内容和客户交付，可以直接查四类：

名字有没有前后不一致；
链接、数字和引用能不能点回原始来源；
涉及发送、删除、付款的动作有没有人工确认；
最终稿有没有留下测试、截图或修改记录。

AI 只负责指出哪一条没过，以及证据在哪。它不能自己改规则，也不能因为“看起来没问题”就替人通过。

规则越具体，AI越像检查员；规则越空，它越像一个很会点头的同事。

#AI工作流 #效率工具 #团队协作`,
    video: "Cloudflare用AI抓工程规范，真正值得抄的不是工具，而是把‘帮我检查’改成可判断的问题。普通团队可以先查四类：名字是否一致，链接数字能否回到来源，发送删除付款有没有人工确认，最终稿有没有截图和测试记录。AI负责指出哪条没过，不能替人通过。",
  }),
  item({
    source: "Matthieu Ropert / Hacker News", sourceUrl: "https://mropert.github.io/2026/08/04/an_honest_review_of_ai_programming/", discussionUrl: "https://news.ycombinator.com/item?id=49166230", evidenceId: "hn-49166230",
    title: "一个程序员认真用 AI 后的结论：它省下的不是写代码时间", summary: "开发者Matthieu Ropert发布AI编程实测复盘，在HN获得44 points和73条评论。文章强调AI的价值与返工、审查和任务类型有关，不宜用单一效率倍数概括。",
    localizedTranslation: "这是一篇基于实际使用的AI编程复盘，讨论哪些任务确实更快、哪些任务仍需要大量验证，以及使用者承担的审查成本。",
    heat: 73, fit: 94, actionability: 91, evidenceConfidence: 91, recommended: true, category: "实操案例",
    engagementLabel: "Hacker News 44 points · 73 comments（8月5日采集）；原站未公开浏览、点赞与收藏",
    reason: "评论数明显高于points，说明争议和真实经验密度高；适合从‘快几倍’转向‘哪一步少返工’。",
    angle: "给普通用户一周AI工作日志，只记首次可用率、核对时间和返工原因。",
    humanCheck: "阅读全文确认作者具体结论和样本范围；个人体验不能外推为所有开发者效率。",
    saveObject: "一周AI返工记录表", learningOutcome: "能用自己的真实任务判断AI究竟省在哪一步。",
    body: `每次有人说“用了 AI 效率翻几倍”，我都不知道该怎么对照自己的工作。

今天一篇 AI 编程实测在 Hacker News 引出 73 条讨论。对我最有用的提醒是：别只记生成用了几分钟，要记它离“真的能交”还有多远。

这周可以随手记三列：

第一次输出能不能直接往下用；
你花了多久核对事实、代码或格式；
最后返工，是因为需求没讲清，还是AI自己编了东西。

同一类任务记五次就够了。

如果AI十分钟写完，你又花四十分钟查错，它省的是打字，不一定省交付。如果它先帮你找齐材料、补出测试，再由你做最后决定，那才是真的少走了一段路。

不要问“AI编程到底行不行”。先问：它在我的哪一步，连续五次让我改得更少？

#AI编程 #工作效率 #真实测评`,
    video: "别再只记AI几分钟写完。今天一篇AI编程实测在HN引出73条讨论，真正该记的是三件事：第一次输出能不能继续用，核对花了多久，返工到底因为什么。同一类任务记五次。如果生成十分钟、查错四十分钟，它省的是打字，不一定省交付。",
  }),
  item({
    source: "DeepGrove / Hacker News", sourceUrl: "https://deepgrove.ai/maple-preview", discussionUrl: "https://news.ycombinator.com/item?id=49173984", evidenceId: "hn-49173984",
    title: "20B 模型在 iPhone 跑到 120 token/s？先看它省掉了什么", summary: "DeepGrove展示Maple Preview，一个三值20B MoE模型，并称在iPhone达到约120 token/s。HN获得38 points和12条评论；设备、输入输出条件和质量仍需完整基准。",
    localizedTranslation: "Maple Preview是一个三值20B混合专家模型。项目方称它可在iPhone上以约每秒120 token运行；该数字应结合具体机型、提示长度和测量方法理解。",
    heat: 78, fit: 91, actionability: 78, evidenceConfidence: 83, recommended: true, category: "产业观察",
    engagementLabel: "Hacker News 38 points · 12 comments（8月5日采集）；项目页未公开浏览、点赞与收藏",
    reason: "数字抓人，但正文重点是教普通用户看本地模型演示的四个条件，避免把峰值速度当日常体验。",
    angle: "用‘机型、首字等待、持续速度、能否完成任务’拆解本地模型视频。",
    humanCheck: "核对iPhone型号、模型实际激活参数、输入长度、首token延迟和第三方复现；不得只写120 token/s。",
    saveObject: "本地模型演示4项核验卡", learningOutcome: "知道峰值生成速度不等于整次对话体验。",
    body: `“20B 模型在 iPhone 上跑到 120 token/s。”

这个数字很容易让人以为：以后手机里随便塞一个大模型，速度还比云端快。

先别急。看本地模型演示，我现在只盯四件事：

是哪一代、多少内存的手机；
点发送以后，第一句话等了多久；
120 是短时间峰值，还是整段都能保持；
它完成的是聊天，还是一个真的需要推理和工具的任务。

Maple Preview 的方向确实有意思：模型被做得更适合端侧运行。但项目方数字还需要完整基准和第三方复现。

以后再看到“手机跑大模型”，先把这四个条件截下来。速度截图只能证明它跑起来了，不能证明它已经适合你每天用。

#本地大模型 #AI资讯 #iPhone`,
    video: "20B模型在iPhone跑到每秒120 token，很炸。但先看四件事：哪款手机，第一句话等多久，120是峰值还是持续速度，它到底完成了什么任务。Maple Preview证明端侧模型还在进步，但没有完整基准和第三方复现前，别把一张速度截图当成日常体验。",
  }),
  item({
    source: "Ars Technica / Hacker News", sourceUrl: "https://arstechnica.com/culture/2026/08/an-ai-supervised-remote-exam-went-so-badly-that-58000-students-must-retake-it/", discussionUrl: "https://news.ycombinator.com/item?id=49162105", evidenceId: "hn-49162105",
    title: "AI 监考出问题，5.8 万名学生要重考：自动判断不能没有申诉口", summary: "Ars Technica报道一次AI监督的远程考试失败，约5.8万名学生需要重考。HN条目获得24 points和7条评论；具体责任和技术原因需以考试机构说明为准。",
    localizedTranslation: "一次由AI参与监督的远程考试出现严重问题，约58,000名学生被要求重新参加考试。事件原因、供应商责任和补救安排需看官方通告。",
    heat: 70, fit: 81, actionability: 68, evidenceConfidence: 84, category: "产业观察",
    engagementLabel: "Hacker News 24 points · 7 comments（8月5日采集）；媒体页未公开浏览、点赞与收藏",
    reason: "人数抓人，但属于高影响教育事件，先留候选。",
    angle: "不只讲翻车，提醒任何AI审核都必须有人工复核、证据保留和申诉通道。",
    humanCheck: "核对考试名称、地区、机构通告、技术故障原因和58,000人的统计口径。",
    saveObject: "AI审核的申诉检查表", learningOutcome: "知道高影响自动判断必须保留人工入口。",
    body: `一场AI参与监督的远程考试出了问题，报道称约5.8万名学生需要重考。

现在还要等考试机构完整说明，不能把责任全推给“AI”。但这件事给所有自动审核一个很现实的检查：系统凭什么判、证据留多久、谁能人工复核、用户怎么申诉。

影响越大，越不能只有一个自动分数。`,
    video: "一场AI参与监督的远程考试出问题，约5.8万名学生被要求重考。具体原因还要等官方说明，但任何高影响自动判断都该先回答四件事：凭什么判、证据留多久、谁人工复核、用户怎么申诉。没有申诉口的自动化，风险会直接落到普通人身上。",
  }),
  item({
    source: "lyogavin / Hacker News", sourceUrl: "https://github.com/lyogavin/airllm", discussionUrl: "https://news.ycombinator.com/item?id=49154228", evidenceId: "hn-49154228",
    title: "70B 模型塞进 4GB 显存，不等于你的旧电脑突然变快", summary: "AirLLM通过逐层加载降低显存占用，旧项目在8月3日重新进入HN并获得228 points、83条评论。仓库称可在4GB GPU上运行70B推理，但磁盘、内存和速度代价明显。",
    localizedTranslation: "AirLLM通过逐层把模型从磁盘送入显存，让70B模型可以在单张4GB GPU上进行推理。它减少的是峰值显存需求，不代表模型文件变小或生成速度变快。",
    heat: 88, fit: 96, actionability: 92, evidenceConfidence: 94, recommended: true, category: "AI 技巧",
    engagementLabel: "Hacker News 228 points · 83 comments（8月5日采集）；GitHub仓库为旧项目，本轮未重新取得实时Stars",
    reason: "本地AI话题容易被标题误导，这条能给普通用户一个清楚的硬件判断法。",
    angle: "把‘能加载、能回答、能顺畅用’拆成三档，不鼓励为了数字折腾。",
    humanCheck: "核对仓库更新时间、支持模型、磁盘需求、生成速度和本机复现；不得写成4GB电脑流畅跑70B。",
    saveObject: "本地大模型三档判断表", learningOutcome: "分清显存够、能出字和日常可用。",
    body: `“4GB 显存也能跑 70B 模型。”

这条项目最近又被顶上 Hacker News，228 分、83 条评论。标题没错，但很容易少看后半句。

AirLLM 的办法，是一次只把模型的一部分送进显存，用完再换下一部分。省下来的是显存峰值，代价会转移到磁盘读取、内存和等待时间。

所以本地模型要分三档：

能加载：不爆显存；
能回答：最终可以吐出结果；
能日用：首字等待、持续速度、耗电都能接受。

4GB 跑起来，通常只能证明第一档，不能自动跳到第三档。

如果你只是写文案、问资料，云端或更小的本地模型往往省心。真有离线、隐私或实验需求，再按仓库要求看磁盘、内存和速度，别只买一块“显存够”的卡。

#本地AI #大模型 #电脑配置`,
    video: "4GB显存跑70B模型，是真的吗？能跑，但别自动理解成流畅。AirLLM通过逐层加载省掉显存峰值，代价会转到磁盘、内存和等待时间。判断本地模型分三档：能加载、能回答、能日用。4GB通常只证明第一档。买设备前先看首字等待、持续速度和完整机器配置。",
  }),
  item({
    source: "Africanews / Interpol / Hacker News", sourceUrl: "https://www.africanews.com/2026/08/04/ai-fuels-more-than-half-of-cybercrime-in-africa-as-digital-scams-surge-interpol/", discussionUrl: "https://news.ycombinator.com/item?id=49175826", evidenceId: "hn-49175826",
    title: "“一半以上网络犯罪由 AI 推动”这个数字，先别脱离地区和口径", summary: "Africanews引用Interpol 2026非洲网络威胁评估，相关HN讨论获得120 points和70条评论。标题中的比例必须回到报告定义，不能外推到全球网络犯罪。",
    localizedTranslation: "报道引用Interpol称，AI正推动非洲超过一半的网络犯罪活动，数字诈骗继续上升。这里的地区、犯罪类别和‘推动’定义必须以原报告为准。",
    heat: 82, fit: 74, actionability: 55, evidenceConfidence: 79, category: "产业观察",
    engagementLabel: "Hacker News 120 points · 70 comments（8月5日采集）；媒体页未公开浏览、点赞与收藏",
    reason: "讨论高但安全与地区口径复杂，不进入轻量推荐。",
    angle: "教读者遇到大比例先核对地区、时间、分母和定义。",
    humanCheck: "阅读全文和Interpol原报告，核对‘more than half’对应的具体统计对象。",
    saveObject: "大数字四项核验卡", learningOutcome: "不会把地区性安全统计外推为全球结论。",
    body: `“一半以上网络犯罪由AI推动”很适合做标题，但先看四个词：哪个地区、哪段时间、哪些犯罪、‘推动’到底怎么算。

这条报道指向Interpol的非洲网络威胁评估，不能直接改写成全球网络犯罪的一半。等原报告口径核对完整，再决定是否发布。`,
    video: "看到‘一半以上网络犯罪由AI推动’，先别转。先看地区、时间、犯罪类别和‘推动’的定义。这条说的是Interpol非洲网络威胁评估，不能直接外推到全球。大数字最容易丢掉的，往往就是它的分母。",
  }),
  item({
    source: "UK AI Security Institute / Hacker News", sourceUrl: "https://cdn.prod.website-files.com/663bd486c5e4c81588db7a1d/6a724858f7db25c81487016d_Security%20Incident%20INC-2026-07-28-01.pdf", discussionUrl: "https://news.ycombinator.com/item?id=49175717", evidenceId: "hn-49175717",
    title: "英国 AI 安全研究所公开事故报告：先看权限怎么被放大", summary: "UK AI Security Institute发布编号INC-2026-07-28-01的安全事故PDF，HN获得56 points和46条评论。需要逐页核对事件范围、授权和处置，不能只用‘模型失控’概括。",
    localizedTranslation: "英国AI安全研究所发布一份安全事件报告，记录事件经过、影响和处置。具体系统、权限和责任边界应以PDF原文为准。",
    heat: 74, fit: 70, actionability: 54, evidenceConfidence: 91, category: "产业观察",
    engagementLabel: "Hacker News 56 points · 46 comments（8月5日采集）；PDF未公开浏览、点赞与收藏",
    reason: "一手来源重要，但安全事件需完整阅读，暂不推荐。",
    angle: "按初始权限、意外扩大、发现方式、止损动作四格复盘。",
    humanCheck: "人工阅读全文并核对涉及组织、时间线、授权测试边界和是否有真实受害者。",
    saveObject: "AI安全事故四格复盘", learningOutcome: "能区分模型能力、系统权限和配置错误。",
    body: `英国AI安全研究所公开了一份事件报告。真正值得看的不是“AI又失控了”，而是初始给了什么权限、权限怎样被放大、谁先发现、最后怎么止损。

这类PDF没读完前不做结论帖。模型能力、系统配置和操作失误必须分开写。`,
    video: "英国AI安全研究所公开了一份事故报告。先别用AI失控概括，应该按四格看：初始权限、权限怎么扩大、谁先发现、怎样止损。模型能力、系统配置和人为失误，是三件不同的事。",
  }),
  item({
    source: "arXiv / Hacker News", sourceUrl: "https://arxiv.org/abs/2602.16763", discussionUrl: "https://news.ycombinator.com/item?id=49170915", evidenceId: "hn-49170915",
    title: "AI 榜单快满分了，不一定是模型真的没短板", summary: "一篇关于AI基准饱和的系统研究在HN获得75 points和79条评论。研究关注榜单接近上限后，分数是否仍能区分真实能力。",
    localizedTranslation: "研究系统分析AI基准何时进入饱和状态，以及接近满分后指标区分模型能力的有效性如何下降。",
    heat: 76, fit: 75, actionability: 59, evidenceConfidence: 90, category: "产业观察",
    engagementLabel: "Hacker News 75 points · 79 comments（8月5日采集）；论文页未公开浏览、点赞与收藏",
    reason: "有讨论价值但偏研究，不作为主推荐。",
    angle: "告诉普通用户排行榜接近满分时，要换成自己的真实任务测试。",
    humanCheck: "阅读论文方法、基准范围和饱和定义；不得写成所有benchmark都失效。",
    saveObject: "榜单失真判断卡", learningOutcome: "知道高分不等于所有真实任务都稳定。",
    body: `AI榜单越来越多接近满分，问题不是每个模型都完美了，而是尺子可能不够长。

这项研究讨论基准饱和：当题目区分不出模型，继续盯小数点没有太大意义。普通用户更该拿自己的真实材料、错误成本和返工时间做测试。`,
    video: "AI榜单都快满分，不代表模型没有短板，也可能是尺子不够长。基准一旦饱和，小数点差异越来越难解释。普通用户最实用的做法，还是拿自己的真实任务测正确率、返工和稳定性。",
  }),
  item({
    source: "Where's Your Ed / Hacker News", sourceUrl: "https://www.wheresyoured.at/the-ai-demand-bubble/", discussionUrl: "https://news.ycombinator.com/item?id=49170648", evidenceId: "hn-49170648",
    title: "AI 需求是不是泡沫？119 条评论里最该分清的是谁在付钱", summary: "评论文章《The AI Demand Bubble》在HN获得104 points和119条评论，质疑部分AI需求与资本支出可持续性。文章属于观点，不应把推断写成行业定论。",
    localizedTranslation: "作者认为AI需求和资本开支之间可能存在不可持续的泡沫，并质疑当前增长是否全部来自可重复的真实付费。",
    heat: 75, fit: 67, actionability: 46, evidenceConfidence: 68, category: "产业观察",
    engagementLabel: "Hacker News 104 points · 119 comments（8月5日采集）；原站未公开浏览、点赞与收藏",
    reason: "讨论高但立场强，保留产业候选。",
    angle: "用试用、补贴、真实续费三层看需求，不直接站队。",
    humanCheck: "逐项核对作者引用的收入、资本开支和融资数据；明确这是评论文章。",
    saveObject: "AI需求三层表", learningOutcome: "分清试用量、补贴量和真实续费。",
    body: `一篇质疑AI需求泡沫的评论文章，在HN引出119条讨论。

真正值得拿走的不是“泡沫已经破了”，而是看需求时分三层：有人在试用、平台在补贴、客户愿意持续续费。三层混在一起，增长数字就很容易被误读。`,
    video: "AI需求是不是泡沫？先别急着站队。看增长分三层：多少人在试用，多少成本由平台补贴，多少客户愿意持续续费。试用很热，不等于付费稳定；观点文章里的数字，也要回到原始财务来源。",
  }),
  item({
    source: "Chiaro HQ / Hacker News", sourceUrl: "https://github.com/Chiaro-HQ/methodology", discussionUrl: "https://news.ycombinator.com/item?id=49171140", evidenceId: "hn-49171140",
    title: "前审计员把 SOC 2 方法开源了，AI 产品最先抄的不是证书", summary: "一名前Deloitte审计员开源面向AI产品的SOC 2方法库，HN获得32 points和14条评论。项目是方法资料，不等同于完成认证。",
    localizedTranslation: "项目开源了一套SOC 2审计方法，帮助AI团队理解控制项、证据和检查流程。使用该仓库不等于已经通过正式认证。",
    heat: 64, fit: 86, actionability: 78, evidenceConfidence: 86, category: "实操案例",
    engagementLabel: "Hacker News 32 points · 14 comments（8月5日采集）；GitHub实时Stars本轮未公开核验",
    reason: "对接单和小团队有价值，但合规敏感，不列推荐。",
    angle: "先抄证据清单和责任人，不宣传一键拿证。",
    humanCheck: "核对许可证、适用框架版本、作者资历和正式审计要求；需要专业合规人员复核。",
    saveObject: "AI项目证据清单", learningOutcome: "知道制度、执行证据和正式认证是三层。",
    body: `一名前审计员把SOC 2方法资料开源了。小团队最先能抄的不是证书模板，而是每项控制谁负责、多久执行一次、留下什么证据。

仓库能帮你准备，不等于装完就通过认证。涉及客户数据和正式合规，仍要找专业人员。`,
    video: "前审计员把SOC 2方法资料开源了。小团队最值得抄的是三列：谁负责、多久检查一次、留下什么证据。但开源方法不等于自动通过认证，正式合规仍要专业人员复核。",
  }),
  item({
    source: "Epoch AI / Hacker News", sourceUrl: "https://epoch.ai/MirrorCode", discussionUrl: "https://news.ycombinator.com/item?id=49157786", evidenceId: "hn-49157786",
    title: "AI 能连续写 19 天代码，但最后那 1% 仍可能让项目判失败", summary: "Epoch AI与METR的MirrorCode评测让模型在无原始源码、无互联网的条件下重写完整程序。HN获得101 points和105条评论；官方称部分运行持续19天、单次成本达2600美元。",
    localizedTranslation: "MirrorCode测试AI能独立重写多大的完整软件。模型只能观察程序行为，不能看原始代码，并需通过隐藏的端到端测试。部分任务持续19天；领先模型仍未解决最难的目标。",
    heat: 89, fit: 97, actionability: 90, evidenceConfidence: 96, recommended: true, category: "实操案例",
    engagementLabel: "Hacker News 101 points · 105 comments（8月5日采集）；研究页未公开浏览、点赞与收藏",
    reason: "把‘长时间自主工作’和‘完整交付’的差距讲得很具体，适合所有使用Agent的人。",
    angle: "不宣传AI替代程序员，强调长任务必须有隐藏验收、成本上限和停机条件。",
    humanCheck: "核对56% headline score、19天/2600美元运行和gotree案例脚注；说明数据污染仍是研究限制。",
    discussionFocus: ["评测者关注长任务的成本和隐藏测试，比单个短题benchmark更接近真实交付。", "研究自己承认训练数据污染不能完全排除，不能把结果直接外推到全新私有项目。"],
    commentSamples: ["官方研究页说明：最复杂的一次尝试持续19天，单次推理预算约2600美元。", "官方脚注说明：gotree最佳实现通过2000/2001项测试，仍因一个边缘情况不算严格100%完成。"],
    saveObject: "长任务Agent验收清单", learningOutcome: "知道工作时间长、测试通过率高和完整交付不是一回事。",
    body: `AI 连续干 19 天，会不会比你想象中更接近“独立员工”？

MirrorCode 最近又被讨论起来。它不让模型看原始代码，只能观察一个程序怎么工作，然后从头重写，最后过隐藏测试。

结果很有意思：AI已经能做出很长、很复杂的项目。一次最贵的运行花了约 2600 美元，持续 19 天。但领先模型的总成绩仍只有 56%。有个项目通过 2000/2001 个测试，就差一个很偏的边缘情况，严格来说还是没完成。

这对普通人用 Agent 的提醒很现实：

别用“它工作了多久”判断成果；
提前留一套它看不到的验收；
写清成本上限和什么时候必须停；
99% 能用的东西，放到付款、数据和客户交付里，最后 1% 可能最贵。

AI能做长任务是真的。长时间自己跑，和可以不验收地交出去，仍然差很远。

#AIAgent #AI编程 #项目管理`,
    video: "AI连续写19天代码，算不算能独立交付？MirrorCode让模型看不到源码，只能从程序行为重写，再过隐藏测试。最贵一次约2600美元、跑19天，领先模型总成绩仍只有56%。甚至2000项测试过了1999项，严格来说也没完成。长任务Agent必须有隐藏验收、成本上限和停机条件。",
  }),
  item({
    source: "Hoplite / Hacker News", sourceUrl: "https://hoplite.sh", discussionUrl: "https://news.ycombinator.com/item?id=49157997", evidenceId: "hn-49157997",
    title: "云端同时跑很多编程 Agent，真正的瓶颈开始变成验收", summary: "YC项目Hoplite发布云端编码Agent平台，HN获得77 points和62条评论。创始人主张未来开发者更多审查产品输出，但该判断属于公司观点。",
    localizedTranslation: "Hoplite让团队在云端运行编码Agent，并提供预览和质量检查工具。团队认为随着模型进步，开发者会更多验收产品结果，而不只是逐行审查代码。",
    heat: 78, fit: 78, actionability: 60, evidenceConfidence: 82, category: "产业观察",
    engagementLabel: "Hacker News 77 points · 62 comments（8月5日采集）；产品页未公开浏览、点赞与收藏",
    reason: "讨论热但产品仍早期，保留候选。",
    angle: "同时跑几个Agent之前，先定义谁看预览、测API和决定合并。",
    humanCheck: "核对价格、免费额度、数据权限、代码保留和故障恢复；不转述未来6-12个月判断为事实。",
    saveObject: "并行Agent验收分工表", learningOutcome: "知道并行越多，验收责任越要先写清。",
    body: `Hoplite想把多个编程Agent放到云端并行跑。这个方向很热，但普通团队最先缺的通常不是Agent数量，而是谁来验收页面、API、Windows兼容和最终合并。

同时跑之前先写一张验收分工表，否则只会更快地产生更多待检查结果。`,
    video: "云端同时跑很多编程Agent，瓶颈会从生成变成验收。谁看页面，谁测API，谁检查兼容，谁决定合并？这些没写清之前，多开几个Agent只会更快地产生更多待办。",
  }),
  item({
    source: "Armature / Hacker News", sourceUrl: "https://armature.tech/", discussionUrl: "https://news.ycombinator.com/item?id=49157807", evidenceId: "hn-49157807",
    title: "你的 MCP 被 Agent 怎么用，团队其实一直看不见", summary: "Armature发布MCP会话分析和评测产品，HN获得41 points和3条评论。产品称可重建Agent调用背后的用户任务，并在客户端先做脱敏；隐私与覆盖率仍需验证。",
    localizedTranslation: "Armature分析MCP工具调用，尝试还原用户任务、常见用法和失败点，并用这些会话生成评测。团队称敏感信息在客户端脱敏。",
    heat: 61, fit: 75, actionability: 56, evidenceConfidence: 77, category: "产业观察",
    engagementLabel: "Hacker News 41 points · 3 comments（8月5日采集）；产品页未公开浏览、点赞与收藏",
    reason: "开发者价值明确，但涉及会话隐私，不推荐给大众。",
    angle: "只讨论‘工具调用成功不等于用户任务成功’，不鼓励上传完整对话。",
    humanCheck: "核对隐私政策、脱敏位置、保留期限、模型覆盖和89.17%测试口径。",
    saveObject: "MCP用户任务指标表", learningOutcome: "分清一次工具调用成功和整件事完成。",
    body: `MCP服务器通常只知道工具被调用了，却不知道用户整件事有没有做成。Armature想补这一层分析。

思路有价值，隐私更重要。真正接入前要问：脱敏在本地还是云端、保存多久、能否完全关闭正文采集。`,
    video: "MCP工具返回成功，不代表用户整件事成功。Armature想从调用记录还原用户任务和失败点。但这类产品最先要问隐私：脱敏在哪里做、数据保存多久、能不能完全关掉正文采集。",
  }),
  item({
    source: "MarcosSete / GitHub", sourceUrl: "https://github.com/MarcosSete/awesome-free-ai-course-notes", discussionUrl: "https://github.com/MarcosSete/awesome-free-ai-course-notes", evidenceId: "gh-awesome-free-ai-course-notes",
    title: "这个刚建 2 天的 AI 课程笔记库，先别一口气全收藏", summary: "GitHub新仓库汇总MIT等高校的机器学习与AI课程笔记，创建约两天已获384 Stars和28 Forks。课程来源、授权和难度仍需逐项核对。",
    localizedTranslation: "这是一个整理世界高校机器学习与AI讲义的免费资源仓库，目标是让学习者集中访问公开课程笔记。仓库的完整性和授权应逐项检查。",
    heat: 86, fit: 99, actionability: 98, evidenceConfidence: 88, recommended: true, category: "AI 技巧", sourceType: "GitHub",
    engagement: { views: null, likes: null, replies: null, reposts: null, bookmarks: null, stars: 384, forks: 28, openIssues: 0 },
    engagementLabel: "GitHub 384 Stars · 28 Forks · 0 Open Issues（8月5日采集）；浏览、评论与收藏未公开",
    reason: "增长快且天然具备收藏价值，但正文必须替普通用户完成筛选，不能只搬资源列表。",
    angle: "按完全入门、懂一点Python、准备做项目三种人各挑一个入口。",
    humanCheck: "逐项打开课程原页核对学校、教师、年份、许可和链接有效性；新仓库Stars不代表内容均已审校。",
    saveObject: "三种基础的AI课程入口", learningOutcome: "能按自己的基础只选一套开始，而不是收藏整个仓库。",
    body: `一个刚创建两天的 AI 课程笔记库，已经 384 Stars。

里面收了不少高校的机器学习和 AI 讲义。资源很多，但我不建议从第一页开始一路收藏。

先按自己现在的状态只选一个入口：

完全没基础：找带数学预备、术语解释和练习答案的入门课；
会一点 Python：直接选有 notebook、能跑出结果的机器学习课；
已经在做项目：优先看评测、推理部署或系统设计，别再重复刷概念。

打开课程以后先看三样：年份是不是太旧，原始学校页面还在不在，练习有没有明确许可。

给自己定个很小的完成标准：今天只看一节，留下一个能运行的 notebook 或一页自己的解释。没有产物，就先别开第二门。

这个仓库适合当地图，不适合当完成清单。新仓库的 Stars 涨得快，也不代表每条链接都已经有人审过。

#AI学习 #学习资源 #GitHub`,
    video: "一个刚创建两天的AI课程笔记库已经384 Stars。但别从头全收藏。完全没基础，选带数学预备和答案的；会Python，选有notebook能直接跑的；已经做项目，去看评测和部署。今天只开一门，留一个能运行的文件。仓库是地图，不是完成清单。",
  }),
  item({
    source: "disler / GitHub", sourceUrl: "https://github.com/disler/super-simple-software-factory", discussionUrl: "https://github.com/disler/super-simple-software-factory", evidenceId: "gh-super-simple-software-factory",
    title: "把软件流水线装进一个 Skill：真正值得看的是谁掌握流程", summary: "新GitHub项目把可重复的Agent+代码工作流封装为Skill，确定性Python负责流程图，编码Agent只作为受边界约束的节点。创建约三天获351 Stars和75 Forks。",
    localizedTranslation: "这个项目把可复用的软件生产流程打包成一个Skill：确定性代码控制流程，编码Agent在限定节点内完成语义任务。",
    heat: 84, fit: 91, actionability: 78, evidenceConfidence: 84, sourceType: "GitHub", category: "实操案例",
    engagement: { views: null, likes: null, replies: null, reposts: null, bookmarks: null, stars: 351, forks: 75, openIssues: 6 },
    engagementLabel: "GitHub 351 Stars · 75 Forks · 6 Open Issues（8月5日采集）；浏览、评论与收藏未公开",
    reason: "项目增长快，但受众偏开发，保留候选。",
    angle: "确定性流程管顺序和状态，AI只做需要理解的节点。",
    humanCheck: "审查代码、许可证、Skill权限和示例；不得把Stars当生产稳定性。",
    saveObject: "流程与AI分工图", learningOutcome: "知道顺序、状态和恢复不必全部交给模型。",
    body: `这个新项目把软件流程装进一个Skill，三天拿到351 Stars。

最值得看的设计不是多Agent，而是确定性代码掌握流程和状态，AI只进入需要理解和生成的节点。顺序、重试、恢复这些事，交给普通程序通常更稳。`,
    video: "一个新项目三天351 Stars，把软件流水线装进一个Skill。最值得抄的是分工：确定性代码管顺序、状态和恢复，AI只做需要理解的节点。不是所有东西都要交给模型，边界越清楚，流程越稳。",
  }),
  item({
    source: "patchy631 / GitHub", sourceUrl: "https://github.com/patchy631/time-to-first-token", discussionUrl: "https://github.com/patchy631/time-to-first-token", evidenceId: "gh-time-to-first-token",
    title: "每天 30 分钟学大模型推理，这份 10 周路线最怕你照表打卡", summary: "GitHub新项目提供10周、每天30分钟的LLM推理与部署路线，覆盖vLLM、SGLang、量化、推测解码和benchmark；创建约三天获289 Stars。",
    localizedTranslation: "一条为期10周、每天30分钟的LLM推理服务与优化学习路线，主题包括vLLM、SGLang、量化、推测解码和基准测试。",
    heat: 82, fit: 87, actionability: 88, evidenceConfidence: 86, sourceType: "GitHub",
    engagement: { views: null, likes: null, replies: null, reposts: null, bookmarks: null, stars: 289, forks: 23, openIssues: 0 },
    engagementLabel: "GitHub 289 Stars · 23 Forks · 0 Open Issues（8月5日采集）；浏览、评论与收藏未公开",
    reason: "路线具体但技术门槛高，保留候选。",
    angle: "每周必须留下一个测速结果或配置对照，不做纯阅读打卡。",
    humanCheck: "核对每周材料、前置知识、许可证和示例能否运行。",
    saveObject: "10周推理学习产物表", learningOutcome: "知道每周学习需要留下可比较的测速或配置结果。",
    body: `这份10周路线每天只要30分钟，听起来很容易坚持。真正容易失败的是：看完很多概念，电脑里没有一个能重复的测速结果。

如果要跟，每周只留一个产物：一次基准、一张量化对照或一份部署配置。没有产物，就先别进入下一周。`,
    video: "每天30分钟、10周学大模型推理，很适合收藏，也很容易永远不开始。跟这类路线，每周只留一个产物：一次测速、一张量化对照或一份部署配置。没有产物，就先别进入下一周。",
  }),
  item({
    source: "magicrew / GitHub", sourceUrl: "https://github.com/magicrew/doc7", discussionUrl: "https://github.com/magicrew/doc7", evidenceId: "gh-doc7",
    title: "把 PDF 变成 AI 能读的 Markdown，最容易丢的是图里那一层", summary: "新GitHub项目doc7主打结合视觉理解把文档转成适合AI处理的Markdown，创建约三天获244 Stars和5 Forks。解析准确率和复杂表格表现需自行测试。",
    localizedTranslation: "doc7把文档转换为适合AI处理的Markdown，并尝试利用视觉理解保留图片、版式和结构信息。",
    heat: 79, fit: 91, actionability: 84, evidenceConfidence: 80, sourceType: "GitHub", category: "AI 技巧",
    engagement: { views: null, likes: null, replies: null, reposts: null, bookmarks: null, stars: 244, forks: 5, openIssues: 0 },
    engagementLabel: "GitHub 244 Stars · 5 Forks · 0 Open Issues（8月5日采集）；浏览、评论与收藏未公开",
    reason: "工具方向实用，但需要实测复杂文档，不列推荐。",
    angle: "用表格、脚注、跨页图和扫描件做四类验收。",
    humanCheck: "本地跑四类真实文档，核对OCR、表格、图片说明和隐私处理；Stars不代表准确率。",
    saveObject: "文档转Markdown四类测试", learningOutcome: "知道文字抽出来不等于文档结构保住了。",
    body: `把PDF转成Markdown，最容易验证的是正文，最容易悄悄丢的是表格关系、脚注、跨页图和扫描件。

doc7这个新项目值得试，但别只拿一页纯文字截图。用四类真实文档测完，再决定能不能进工作流。`,
    video: "把PDF转成AI能读的Markdown，别只测纯文字。真正容易丢的是表格、脚注、跨页图和扫描件。doc7这个新项目方向实用，但必须拿四类真实文档验收，Stars不等于解析准确率。",
  }),
  item({
    source: "AMAP-ML / GitHub", sourceUrl: "https://github.com/AMAP-ML/LongHorizon-Harness", discussionUrl: "https://github.com/AMAP-ML/LongHorizon-Harness", evidenceId: "gh-longhorizon-harness",
    title: "Agent 跨天不失忆，这个新项目把‘接班条’做成了运行机制", summary: "LongHorizon-Harness用于让Agent跨桌面应用和CLI执行长任务，强调新上下文、持久验证状态、独立审计与可恢复进度。创建约一天获178 Stars。",
    localizedTranslation: "这是一个长时计算机使用框架，让AI Agent在桌面应用与命令行之间持续工作，同时保存任务状态、审计结果和可恢复进度。",
    heat: 80, fit: 92, actionability: 76, evidenceConfidence: 83, sourceType: "GitHub", category: "实操案例",
    engagement: { views: null, likes: null, replies: null, reposts: null, bookmarks: null, stars: 178, forks: 14, openIssues: 0 },
    engagementLabel: "GitHub 178 Stars · 14 Forks · 0 Open Issues（8月5日采集）；浏览、评论与收藏未公开",
    reason: "方向贴近既有接班条内容，避免重复推荐，只留新项目候选。",
    angle: "比较手写任务状态文件与框架化持久状态，说明何时才值得上系统。",
    humanCheck: "审查权限、恢复机制、独立审计是否真的独立以及示例复现；新项目稳定性未知。",
    saveObject: "长任务状态字段表", learningOutcome: "知道长任务至少要保存目标、已验证事实、下一步和回滚点。",
    body: `LongHorizon-Harness想把Agent跨天工作的状态、审计和恢复做成框架。方向很对，但普通任务不一定要上系统。

先用一张TASK_STATE文件跑两周：目标、做到哪、已验证什么、下一步、回滚点。手写已经管不住，再考虑框架。`,
    video: "一个新项目想让Agent跨天不失忆，重点是保存状态、独立审计和可恢复进度。普通人先别急着装框架。先用一张任务状态文件记录目标、进度、已验证事实、下一步和回滚点。手写管不住，再升级。",
  }),
];

if (items.length !== 20) throw new Error(`Expected 20 items, got ${items.length}`);
if (items.filter((entry) => entry.recommended).length !== 7) throw new Error("Expected 7 recommendations");

const hotspots = items.map((entry, index) => ({
  id: 2026080501 + index,
  rank: index + 1,
  source: entry.source,
  sourceUrl: entry.sourceUrl,
  sourceType: entry.sourceType,
  age: "今天/近72小时",
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
  reuseIdeas: entry.reuseIdeas || [entry.angle, entry.saveObject, "保留来源、限制和人工核验。"],
  localizedTranslation: entry.localizedTranslation,
  analysisState: "已分析",
  saveObject: entry.saveObject,
  learningOutcome: entry.learningOutcome,
  recommended: entry.recommended,
  editorialGate: {
    saveObject: entry.saveObject,
    learningOutcome: entry.learningOutcome,
    shareReason: "读者能带走一个具体判断、检查表、对照方法或事实边界。",
    passed: true,
  },
}));

const drafts = items.map((entry, index) => ({
  id: 5026080501 + index,
  hotspotId: 2026080501 + index,
  platform: "小红书",
  title: entry.title,
  body: entry.body,
  visual,
  videoScript: entry.video,
  version: "V1 · 8月5日来源重写稿",
  parentVersion: null,
  revisionMode: "operator-daily",
  revisionReason: "依据8月5日可核验来源、公开互动与可得讨论证据重新写作；不直译，不自动审核。",
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
    ...priorDrafts.map((draft) => ({
      ...draft,
      archivedAt: capturedAt,
      supersededBy: "2026-08-05 daily batch",
      revisionReason: "跨日换新来源；保留旧版本和审核状态供追溯。",
    })),
  ],
  discoveryMeta: {
    runId: "daily-2026-08-05-real-sources",
    capturedAt,
    coverageLabel: "20条候选：14条Hacker News/一手网页讨论、6条GitHub新项目；7条推荐。20条均完成来源分析、本地化、小红书初稿和30–60秒口播。",
    editorialBrief: "优先读者能马上改变一个动作、得到一张检查表或避开一个常见误解的内容；不追求凑满社媒来源，不把Stars或HN points冒充浏览量。",
    sourceSuccess: [
      "Hacker News公开API成功：取得当日AI讨论标题、原文链接、points、comments和采集时间。",
      "GitHub公开搜索成功：取得8月2日至5日新项目的Stars、Forks、Issues、创建与更新时间。",
      "官方与原始网页成功：核对Mistral、Cloudflare、Epoch AI及项目仓库的主要主张与限制。",
      "8月4日批次已进入版本历史，没有自动审核、采用或发布。",
    ],
    sourceFailure: [
      "生产工作台更新前operator:pull返回Cloudflare HTML，无法确认8月4日写入后是否新增reviewNote；本批次不声称处理了未知意见。",
      "已登录X搜索页持续加载超时，未取得可复核的8月5日X公开互动样本。",
      "Instagram、TikTok、LinkedIn本轮未取得同时满足时效、AI相关和公开互动可复核的样本。",
      "国内平台内全量同义检索不可用；稀缺度封顶55并保留人工复核。",
      "部分HN讨论评论明细读取失败；对应条目明确写无可验证样本，不推断共识。",
    ],
    domesticSearchState: domesticCoverage,
    rejectedTopics: [
      "8月4日已经使用的斯坦福LLM时间点、吴恩达Agent时间点、模型盲测等主题不重复。",
      "缺少原始页面、只有二次聚合标题或涉及攻击复现的内容剔除。",
      "Stars异常但仓库描述空泛、疑似批量生成的项目不进入候选。",
      "纯AI资本泡沫观点最多保留一条候选，不占推荐位。",
    ],
    recommendationCount: 7,
    reviewNoteAudit: {
      productionPull: "失败：返回Cloudflare HTML而非JSON。",
      currentPacketNotes: null,
      action: "无法确认线上是否有新增reviewNote；保留8月4日本地完整批次及历史审核状态，本批次未自动通过、未自动发布。请运营人员发布前核对线上意见。",
    },
  },
};

const packet = {
  mode: "replace",
  detail: "2026-08-05真实来源日更：20条候选、7条推荐、20条完整小红书稿与短视频口播；保留历史版本，不自动审核或发布。",
  state,
};

const handoff = {
  schema_version: 2,
  batch_id: "daily-2026-08-05-real-sources",
  batch_date: "2026-08-05",
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
      final: Math.round(hotspot.heat * .25 + hotspot.scarcity * .25 + hotspot.fit * .25 + hotspot.actionability * .15 + hotspot.evidenceConfidence * .1),
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
