import fs from 'node:fs/promises';
import crypto from 'node:crypto';
const dir=new URL('../evidence/2026-08-26/',import.meta.url);
const discovery=JSON.parse(await fs.readFile(new URL('discovery.json',dir),'utf8'));
const ids=process.argv.slice(2);
const results=[];
for(let start=0;start<ids.length;start+=4){
  await Promise.all(ids.slice(start,start+4).map(async id=>{
    const h=discovery.hits.find(h=>h.objectID===id);
    if(!h)throw new Error(`Missing discovery ${id}`);
    const sources=[];
    for(const [type,url] of [['discussion',`https://hn.algolia.com/api/v1/items/${id}`],['primary',h.url]]){
      if(!url)continue;
      const capturedAt=new Date().toISOString();
      try{
        const r=await fetch(url,{signal:AbortSignal.timeout(20000),headers:{'User-Agent':'TideContentResearch/1.0'}});
        const raw=await r.text();
        const name=`${id}-${type}.${type==='discussion'?'json':'html'}`;
        await fs.writeFile(new URL(name,dir),raw);
        sources.push({type,url,finalUrl:r.url,status:r.status,capturedAt,contentHash:crypto.createHash('sha256').update(raw).digest('hex'),rawSnapshotRef:`evidence/2026-08-26/${name}`});
      }catch(error){sources.push({type,url,capturedAt,error:error.message});}
    }
    results.push({id,sources});
  }));
}
const existing=await fs.readFile(new URL('capture-index.json',dir),'utf8').then(JSON.parse).catch(()=>[]);
await fs.writeFile(new URL('capture-index.json',dir),JSON.stringify([...existing.filter(e=>!ids.includes(e.id)),...results],null,2));
console.log(JSON.stringify(results.map(r=>({id:r.id,sources:r.sources.map(s=>({type:s.type,status:s.status,error:s.error}))})),null,2));
