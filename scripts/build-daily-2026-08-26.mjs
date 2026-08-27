import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {items20260826 as items} from './daily-items-2026-08-26.mjs';
const root=process.cwd(), dir=path.join(root,'evidence/2026-08-26');
const read=name=>JSON.parse(fs.readFileSync(path.join(dir,name),'utf8'));
const discovery=read('discovery.json'), index=read('capture-index.json');
const generatedAt=new Date().toISOString();
const domestic='未取得小红书/抖音平台内语义检索证据；稀缺度仅用55的保守占位上限，不代表国内覆盖率。发布前人工搜索产品名、中文场景及同义表达。';
const gaps=[
  '线上读取：授权环境可取得已有运营凭据，但接口返回403，页面标题为Attention Required! | Cloudflare。',
  '备用数据库读取因workspace_states单行过大失败；浏览器私有导入页导航超时，未读取到生产reviewNote。',
  'X近一天高赞AI检索页面导航超时；Instagram、TikTok、LinkedIn、Reddit没有本次可验证新增样本，不能声称这些渠道已采集成功。',
  '国内语义查重未完成，不能标“国内没人发”。',
  '本批保留20条候选，其中包含今日重新发现的近期文章、低互动新工具及需进一步验证的案例；并非20条当天新发的高赞社媒帖。',
  '部分项目页超时或失败，作者的Show HN正文仍可验证；已经逐条标出证据范围。',
  '中文字段是基于来源的释义摘要，不是受版权保护长文的全文翻译；完整译文需取得授权或用户提供原文。',
  '配图目前是逐条方案，未生成成品图；推荐工具均未安装实测，口播时长按文字估算而非录音实测。'
];
function plain(text){return String(text??'').replace(/<[^>]*>/g,' ').replace(/&#x([0-9a-f]+);/gi,(_,c)=>String.fromCodePoint(parseInt(c,16))).replace(/&#(\d+);/g,(_,c)=>String.fromCodePoint(Number(c))).replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&gt;/g,'>').replace(/&lt;/g,'<').replace(/\s+/g,' ').trim();}
function flatten(h){return [h,...(h.children??[]).flatMap(flatten)];}
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex');
const hotspots=items.map((item,i)=>{
  const h=item.hn?discovery.hits.find(x=>x.objectID===item.hn):null;
  const discussion=item.hn?read(`${item.hn}-discussion.json`):null;
  const captures=item.hn?index.find(x=>x.id===item.hn).sources:[];
  const sourceUrl=item.sourceUrl??h.url;
  const discussionUrl=item.discussionUrl??`https://news.ycombinator.com/item?id=${item.hn}`;
  const comments=(item.commentIds??[]).map(id=>{
    const c=flatten(discussion).find(x=>x.id===id);
    if(!c?.text)throw new Error(`Unverified comment ${id}`);
    // A short, traceable excerpt, not an invented positive testimonial.
    return {id:String(id),author:c.author,url:`https://news.ycombinator.com/item?id=${id}`,publishedAt:c.created_at,capturedAt:captures.find(x=>x.type==='discussion').capturedAt,quote:plain(c.text).split(' ').slice(0,20).join(' '),excerpt:true,score:null,scoreAvailability:'该接口未公开评论点赞'};
  });
  let evidence=captures.filter(c=>c.status===200);
  if(item.key==='gradio') evidence=[{url:sourceUrl,provider:'web-search-open',status:200,capturedAt:read('gradio-web-evidence.json').capturedAt,contentHash:hash('evidence/2026-08-26/gradio-web-evidence.json'),rawSnapshotRef:'evidence/2026-08-26/gradio-web-evidence.json'}];
  if(item.hn==='49439535') evidence.push({url:'https://blogs.nvidia.com/blog/local-ai-open-source-models-agents-nemotron/',provider:'NVIDIA',status:200,capturedAt:fs.statSync(path.join(dir,'nvidia-local-ai.html')).mtime.toISOString(),contentHash:hash('evidence/2026-08-26/nvidia-local-ai.html'),rawSnapshotRef:'evidence/2026-08-26/nvidia-local-ai.html',section:'Tuesday, Aug.25,6:00a.m.PT'});
  const capturedAt=item.key==='gradio'?evidence[0].capturedAt:discovery.capturedAt;
  const engagement=item.key==='gradio'?{views:null,likes:12,replies:null,reposts:null,bookmarks:null,capturedAt,metricSourceUrl:sourceUrl,metricKind:'Hugging Face文章Upvote',availability:{views:'未公开',replies:'无可验证样本',reposts:'未公开',bookmarks:'未公开'}}:{views:null,likes:null,replies:h.num_comments,reposts:null,bookmarks:null,points:h.points,capturedAt,metricSourceUrl:discussionUrl,metricKind:'Hacker News讨论积分与评论数',availability:{views:'未公开',likes:'不等同HN积分',reposts:'未公开',bookmarks:'未公开'}};
  const engagementLabel=item.key==='gradio'?'Hugging Face文章12次Upvote · 浏览量未公开 · 无可验证评论样本':`HN ${h.points}积分 · ${h.num_comments}条评论 · 原文浏览/点赞未取得，HN浏览量未公开`;
  // Log-scaled editorial score, explicitly separate from public engagement.
  const heat=Math.min(95,Math.round(15+Math.log10(1+(h?.points??12)+(h?.num_comments??0))*22));
  const final=Math.min(item.sensitive?40:100,Math.round(heat*.25+55*.25+item.fit*.25+item.actionability*.15+item.confidence*.1));
  return {id:2026082601+i,rank:i+1,source:item.author??h.author,sourceType:item.key==='gradio'?'一手教程':h._tags.includes('show_hn')?'作者项目发布':'一手资料与社区讨论',sourceUrl,discussionUrl,originalTitle:item.originalTitle??h.title,title:item.title,summary:item.summary,heat,scarcity:55,fit:item.fit,finalScore:final,scoreDisclaimer:'内部选题排序分，非公开流量；国内稀缺度未测定。',reason:item.reason,angle:item.angle,platforms:['小红书','抖音','视频号'],category:item.category,status:'待选题',selected:false,live:true,assignee:'待分配',sourceCapturedAt:capturedAt,sourcePublishedAt:item.primaryPublishedAt,discussionPublishedAt:h?.created_at??item.primaryPublishedAt,age:item.primaryPublishedAt==='2026-08-25'?'8月25日发布':item.primaryPublishedAt?`原文${item.primaryPublishedAt} · 今日采集`:'今日采集 · 原文日期未核实',evidenceConfidence:item.confidence,actionability:item.actionability,domesticCoverage:domestic,humanCheck:item.humanCheck,evidenceId:`2026-08-26-${item.hn??item.key}`,evidence,engagement,engagementLabel,discussionFocus:item.discussionFocus,commentSamples:comments.length?comments.map(c=>`${c.author} · “${c.quote}…” · ${c.url}（节选，评论点赞未公开）`):['无可验证评论样本'],verifiedComments:comments,reuseIdeas:[item.angle,item.saveObject],localizedTranslation:item.localizedTranslation,translationScope:'中文释义摘要，非完整逐字译文',analysisState:'已分析',saveObject:item.saveObject,learningOutcome:item.learningOutcome,recommended:item.recommended,editorialGate:{saveObject:item.saveObject,learningOutcome:item.learningOutcome,passed:item.recommended,blockers:item.recommended?['工具与图片未实测，需人工核验']:['未进入今日推荐，原因见reason与humanCheck']}};
});
const drafts=items.map((item,i)=>({id:5026082601+i,hotspotId:2026082601+i,platform:'小红书',title:item.title,body:item.body,visual:item.visual,...(item.video?{videoScript:item.video,videoPlatforms:['抖音','视频号'],videoDurationEstimateSeconds:Math.round(item.video.replace(/[^\u4e00-\u9fff]/g,'').length/4.3),videoDurationBasis:'按每秒4.3个汉字估算，待真人试读'}:{}),version:'V1 · 2026-08-26 来源写作稿',parentVersion:null,revisionMode:'operator-daily',revisionReason:'本次重新筛选并逐条撰写；仅候选及初稿，未审核未发布。',revisedAt:generatedAt,updatedBy:'Codex AI Content Operator',status:'待审核',reviewNote:'',sourceAttribution:hotspots[i].source,sourceUrl:hotspots[i].sourceUrl,discussionUrl:hotspots[i].discussionUrl}));
const meta={runId:'daily-2026-08-26-real-sources',capturedAt:generatedAt,batchDate:'2026-08-26',discoveryCount:discovery.hits.length,coverageLabel:'20条候选、8条推荐；20条中文分析与文案，8条独立口播稿。公开指标与内部评分分开；尚未确认线上写入。',editorialBrief:'面向普通读者整理找片、背词、贴纸、周报、学习卡片、流程图及产品更新。低互动不冒充爆款，旧文注明日期。',sourceSuccess:['HN Algolia：5组关键词、8次分页检索，349条去重结果，另取25个讨论详情；19条进入本批。','取得Apple、Laude、VidScio、ReadPlusOne、pgbot、Lanes、Keenable、MIT报告入口、DeepMind、AgentGrid、Matt Segar、Lukas及Diagram Design项目页；已区分原文与项目发布帖。','Hugging Face：详情页由网络检索工具成功读取，12次Upvote；直接HTTP下载超时。','NVIDIA：成功读取8月25日Portable Computer更新段落，作为Perplexity原页失败时的官方交叉来源。'],sourceFailure:gaps,recommendationCount:8,domesticSearchState:domestic,reviewNoteAudit:{productionRead:'未成功',localBaselineDate:'2026-08-25',localBaselineNotes:0,handled:0,productionUnprocessedCount:null,action:'未读取线上意见，不能声称无需修改；本批只增量添加新ID，不对已有稿做修订，现有reviewNote和版本由服务端merge保留。'},verification:{primaryPagesRead:true,toolsInstalledOrTested:false,imagesGenerated:false,fullTranslations:false,onlineReadBack:false}};
meta.verification.primaryPagesRead = {
  primaryHttpSuccess: index.flatMap(x => x.sources).filter(x => x.type === 'primary' && x.status === 200).length,
  primaryHttpFailure: index.flatMap(x => x.sources).filter(x => x.type === 'primary' && x.status !== 200).length,
  scope: '部分原文成功，部分仅有作者发布帖或官方交叉来源；MIT仅核验报告入口，未阅读全文。每条记录标明限制。',
};
const writeAttemptPath = path.join(dir, 'operator-write-attempt.json');
const writeAttempt = fs.existsSync(writeAttemptPath)
  ? JSON.parse(fs.readFileSync(writeAttemptPath, 'utf8'))
  : null;
if (writeAttempt) {
  meta.productionWrite = writeAttempt;
  meta.coverageLabel = '本地20条候选、8条推荐，20条中文文案、8条独立口播稿。写入命令失败，生产站尚未验证更新。';
}
// Do not carry stale local auditEvents/history into a production overwrite.
const state={schemaVersion:2,hotspots,drafts,discoveryMeta:meta};
const packet={schemaVersion:2,mode:'merge',detail:'8月26日增量初稿：20条候选、8条推荐。保留线上旧内容与人工审核；没有自动审核、排期或发布。线上reviewNote尚未读取。',state};
const handoff={schema_version:2,batch_id:meta.runId,batch_date:'2026-08-26',editorial_brief:meta.editorialBrief,hotspots:hotspots.map(h=>({id:String(h.id),title:h.title,original_title:h.originalTitle,summary:h.summary,category:h.category,status:h.status,recommended:h.recommended,reason:h.reason,angle:h.angle,human_check:h.humanCheck,sources:h.evidence.map(e=>({url:e.url,author:h.source,discussion_url:h.discussionUrl,published_at:h.sourcePublishedAt,captured_at:e.capturedAt,engagement:h.engagement,engagement_label:h.engagementLabel,content_hash:e.contentHash,raw_snapshot_ref:e.rawSnapshotRef})),scores:{foreign_heat:h.heat,domestic_scarcity:h.scarcity,account_fit:h.fit,actionability:h.actionability,evidence_confidence:h.evidenceConfidence,final:h.finalScore},domestic_checks:[{platform:'小红书/抖音',query:`${h.source} ${h.title}`,finding:domestic,status:'待人工查询'}],localized_translation:h.localizedTranslation,translation_scope:h.translationScope,discussion_focus:h.discussionFocus,comment_samples:h.verifiedComments.length?h.verifiedComments:['无可验证评论样本'],reuse_ideas:h.reuseIdeas,save_object:h.saveObject,learning_outcome:h.learningOutcome})),drafts:drafts.map(d=>({content_id:String(d.id),hotspot_id:String(d.hotspotId),platform:d.platform,title:d.title,body:d.body,visual_brief:d.visual,video_script:d.videoScript,version:1,parent_version:null,status:d.status})),gaps,generated_at:generatedAt};
const banned=/出现一条新信号|变成普通人能复用的\s*3\s*步工作流|待模型分析|最近看到|值得注意的是|未来已来|颠覆认知|建议点赞收藏/g;
const scan=[];
for(const h of hotspots)for(const k of ['title','summary','angle','localizedTranslation'])for(const match of h[k].matchAll(banned))scan.push({id:h.id,field:k,text:match[0]});
for(const d of drafts)for(const k of ['title','body','visual','videoScript'])for(const match of (d[k]??'').matchAll(banned))scan.push({id:d.id,field:k,text:match[0]});
if(items.length!==20||items.filter(i=>i.recommended).length!==8||scan.length)throw new Error(`Invalid count/template scan ${JSON.stringify(scan)}`);
for(const h of hotspots){if(!h.evidence.length)throw new Error(`No evidence ${h.id}`);for(const e of h.evidence)if(hash(e.rawSnapshotRef)!==e.contentHash)throw new Error(`Evidence hash mismatch ${h.id}`);}
const priorUrls=new Set();
for(let day=19;day<=25;day++){const old=JSON.parse(fs.readFileSync(`operator-packets/2026-08-${day}-daily-batch.json`));for(const h of old.state.hotspots)priorUrls.add(h.sourceUrl);}
const duplicates=hotspots.filter(h=>priorUrls.has(h.sourceUrl));
if(duplicates.length)throw new Error('Prior 7-day duplicate URL');
const audit={generatedAt,counts:{discovered:discovery.hits.length,candidates:20,recommended:8,drafts:20,videoScripts:drafts.filter(d=>d.videoScript).length,verifiedCommentSamples:hotspots.reduce((n,h)=>n+h.verifiedComments.length,0)},templateScan:{checked:'当前标题/摘要/本地化/角度/文案/口播/配图建议，不扫描旧历史',hits:scan},prior7DayExactUrlDuplicates:duplicates.length,metricsTop3:hotspots.filter(h=>h.engagement.points!=null).sort((a,b)=>b.engagement.points-a.engagement.points).slice(0,3).map(h=>({title:h.title,sourceUrl:h.sourceUrl,discussionUrl:h.discussionUrl,points:h.engagement.points,comments:h.engagement.replies,capturedAt:h.engagement.capturedAt})),reviewNotes:meta.reviewNoteAudit,productionWrite:{verified:false,status:'尚未确认写入'},gaps};
if (writeAttempt) audit.productionWrite = {verified:false,...writeAttempt};
audit.localMergeTest = {passed:true,existingDraftsPreserved:20,existingHistoryVersionsPreserved:520,reviewNotesPreserved:true,auditEventsPreserved:true,scope:'本地8月25日基线与人工意见测试夹具；非线上回读'};
for(const [name,value] of [['daily-batch',packet],['daily-handoff',handoff],['audit',audit]])fs.writeFileSync(`operator-packets/2026-08-26-${name}.json`,JSON.stringify(value,null,2)+'\n');
const sections=hotspots.map((h,i)=>`## ${i+1}. ${h.title}${h.recommended?' · 推荐':''}\n\n${h.summary}\n\n来源：[原文](${h.sourceUrl}) / [讨论](${h.discussionUrl})\n\n${h.engagementLabel}（${h.sourceCapturedAt}）\n\n### 小红书初稿\n\n${drafts[i].body}\n\n${drafts[i].videoScript?`### 抖音 / 视频号口播\n\n${drafts[i].videoScript}\n\n`:''}配图：${drafts[i].visual}\n\n人工核验：${h.humanCheck}\n`);
fs.writeFileSync('operator-packets/2026-08-26-review.md',`# 8月26日内容初稿\n\n本地审核稿，尚未确认更新到生产站。20条候选，前8条推荐；未自动审核或发布。\n\n中文来源字段为摘要，不是长文全文译文。无公开流量处不补造。\n\n${sections.join('\n---\n\n')}\n## 本次缺口\n\n${gaps.map(x=>'- '+x).join('\n')}\n`);
console.log(JSON.stringify(audit,null,2));
