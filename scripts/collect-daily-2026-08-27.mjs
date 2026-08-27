import fs from 'node:fs/promises';
import crypto from 'node:crypto';
const day='2026-08-27', dir=new URL(`../evidence/${day}/`,import.meta.url);
await fs.mkdir(dir,{recursive:true});
const attempts=[];
async function fetchAndSave(provider,url,name,parse='json'){
  const startedAt=new Date().toISOString();
  try{
    const response=await fetch(url,{signal:AbortSignal.timeout(25000),headers:{'User-Agent':'TideContentResearch/1.0','Accept':'application/json, application/xml, text/html'}});
    const body=await response.text(), capturedAt=new Date().toISOString();
    await fs.writeFile(new URL(name,dir),body);
    attempts.push({provider,started_at:startedAt,ended_at:capturedAt,outcome:response.ok?'success':'failed',item_count:null,reason:response.ok?'':`HTTP ${response.status}`,url,status:response.status,capturedAt,content_hash:crypto.createHash('sha256').update(body).digest('hex'),raw_snapshot_ref:`evidence/${day}/${name}`});
    if(!response.ok)return null;
    return parse==='json'?JSON.parse(body):body;
  }catch(error){attempts.push({provider,started_at:startedAt,ended_at:new Date().toISOString(),outcome:'failed',item_count:0,reason:error.message,url});return null;}
}
const since=Math.floor(Date.parse('2026-08-26T00:44:54Z')/1000), hn=new Map();
for(const query of ['AI','LLM','agent','Claude','ChatGPT']){
  for(let page=0;page<3;page++){
    const data=await fetchAndSave('hn-algolia',`https://hn.algolia.com/api/v1/search_by_date?query=${query}&tags=story&numericFilters=created_at_i%3E%3D${since}&hitsPerPage=100&page=${page}`,`hn-${query}-${page}.json`);
    for(const h of data?.hits??[])hn.set(h.objectID,h);
    if(!data||page+1>=data.nbPages)break;
  }
}
const github=await fetchAndSave('github-search','https://api.github.com/search/repositories?q=created%3A%3E%3D2026-08-26%20%28AI%20OR%20LLM%20OR%20agent%29&sort=stars&order=desc&per_page=100','github.json');
const openai=await fetchAndSave('openai-rss','https://openai.com/news/rss.xml','openai.xml','text');
const techcrunch=await fetchAndSave('techcrunch-rss','https://techcrunch.com/category/artificial-intelligence/feed/','techcrunch.xml','text');
const arxiv=await fetchAndSave('arxiv-atom','https://export.arxiv.org/api/query?search_query=cat%3Acs.AI%20OR%20cat%3Acs.CL&sortBy=submittedDate&sortOrder=descending&max_results=30','arxiv.xml','text');
const result={capturedAt:new Date().toISOString(),since:new Date(since*1000).toISOString(),hn:[...hn.values()].sort((a,b)=>b.points-a.points),github:github?.items??[],rss:{openai:!!openai,techcrunch:!!techcrunch,arxiv:!!arxiv},attempts};
await fs.writeFile(new URL('discovery.json',dir),JSON.stringify(result,null,2)+'\n');
await fs.writeFile(new URL('attempts.json',dir),JSON.stringify(attempts,null,2)+'\n');
console.log(JSON.stringify({capturedAt:result.capturedAt,hnCount:result.hn.length,hnTop:result.hn.slice(0,40).map(h=>({id:h.objectID,title:h.title,url:h.url,points:h.points,comments:h.num_comments,published:h.created_at,author:h.author})),githubTop:result.github.slice(0,20).map(g=>({name:g.full_name,url:g.html_url,stars:g.stargazers_count,description:g.description,created:g.created_at,updated:g.updated_at})),providers:attempts.map(a=>({provider:a.provider,status:a.status,outcome:a.outcome,reason:a.reason}))},null,2));
