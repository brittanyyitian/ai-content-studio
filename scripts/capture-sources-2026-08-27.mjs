import fs from 'node:fs/promises';
import crypto from 'node:crypto';
const day='2026-08-27',dir=new URL(`../evidence/${day}/`,import.meta.url);
const discovery=JSON.parse(await fs.readFile(new URL('discovery.json',dir),'utf8'));
const ids=process.argv.slice(2),results=[];
for(let start=0;start<ids.length;start+=4){
  await Promise.all(ids.slice(start,start+4).map(async id=>{
    const h=discovery.hn.find(h=>h.objectID===id); if(!h)throw new Error(`Missing ${id}`);
    const sources=[];
    for(const [type,url] of [['discussion',`https://hn.algolia.com/api/v1/items/${id}`],['primary',h.url]]){
      if(!url)continue; const capturedAt=new Date().toISOString();
      try{const r=await fetch(url,{signal:AbortSignal.timeout(18000),headers:{'User-Agent':'TideContentResearch/1.0'}});const raw=await r.text();const name=`${id}-${type}.${type==='discussion'?'json':'html'}`;await fs.writeFile(new URL(name,dir),raw);sources.push({type,url,finalUrl:r.url,status:r.status,capturedAt,contentHash:crypto.createHash('sha256').update(raw).digest('hex'),rawSnapshotRef:`evidence/${day}/${name}`});}
      catch(error){sources.push({type,url,capturedAt,error:error.message});}
    }
    results.push({id,sources});
  }));
}
await fs.writeFile(new URL('capture-index.json',dir),JSON.stringify(results,null,2)+'\n');
console.log(JSON.stringify(results.map(r=>({id:r.id,sources:r.sources.map(s=>({type:s.type,status:s.status,error:s.error}))})),null,2));
