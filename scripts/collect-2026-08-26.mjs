import fs from 'node:fs/promises';
import crypto from 'node:crypto';
const dir = new URL('../evidence/2026-08-26/', import.meta.url);
await fs.mkdir(dir, {recursive:true});
const since = Math.floor(Date.parse('2026-08-25T00:41:52Z') / 1000);
const records=[];
async function get(url,name) {
  const capturedAt=new Date().toISOString();
  try {
    const response=await fetch(url,{signal:AbortSignal.timeout(25000),headers:{'User-Agent':'TideContentResearch/1.0'}});
    const body=await response.text();
    const record={url,status:response.status,capturedAt,contentHash:crypto.createHash('sha256').update(body).digest('hex'),rawSnapshotRef:`evidence/2026-08-26/${name}`};
    await fs.writeFile(new URL(name,dir),body);
    records.push(record);
    return response.ok ? JSON.parse(body) : null;
  } catch(error) {records.push({url,capturedAt,error:error.message});return null;}
}
const found=new Map();
for(const query of ['AI','LLM','agent','Claude','ChatGPT']) {
  const first=await get(`https://hn.algolia.com/api/v1/search_by_date?query=${query}&tags=story&numericFilters=created_at_i%3E%3D${since}&hitsPerPage=100`,`hn-${query}-0.json`);
  for(const h of first?.hits??[])found.set(h.objectID,h);
  for(let page=1;page<Math.min(first?.nbPages??0,4);page++){
    const more=await get(`https://hn.algolia.com/api/v1/search_by_date?query=${query}&tags=story&numericFilters=created_at_i%3E%3D${since}&hitsPerPage=100&page=${page}`,`hn-${query}-${page}.json`);
    for(const h of more?.hits??[])found.set(h.objectID,h);
  }
}
const hits=[...found.values()].sort((a,b)=>b.points-a.points);
await fs.writeFile(new URL('discovery.json',dir),JSON.stringify({capturedAt:new Date().toISOString(),records,hits},null,2));
console.log(JSON.stringify({requests:records.map(r=>({status:r.status,error:r.error,url:r.url})),count:hits.length,top:hits.slice(0,90).map(h=>({id:h.objectID,title:h.title,url:h.url,points:h.points,comments:h.num_comments,publishedAt:h.created_at,hasText:!!h.story_text}))},null,2));
