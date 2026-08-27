import {execFileSync} from 'node:child_process';
const key=service=>execFileSync('security',['find-generic-password','-a',process.env.USER||'edy','-s',service,'-w'],{encoding:'utf8',stdio:['ignore','pipe','ignore']}).trim();
const response=await fetch('https://tide-ai-content-studio.brittanyyitian.chatgpt.site/api/operator',{redirect:'manual',signal:AbortSignal.timeout(20000),headers:{Authorization:`Bearer ${key('tide-ai-content-operator')}`,'OAI-Sites-Authorization':`Bearer ${key('tide-ai-content-siwc-bypass')}`}});
const body=await response.text();
console.log(JSON.stringify({status:response.status,contentType:response.headers.get('content-type'),title:body.match(/<title[^>]*>(.*?)<\/title>/is)?.[1],cloudflare:body.includes('cf-mitigated')||body.includes('Just a moment')||body.includes('Cloudflare'),json:response.headers.get('content-type')?.includes('application/json')},null,2));
