from html.parser import HTMLParser
from pathlib import Path
import sys
class Text(HTMLParser):
    def __init__(self):
        super().__init__();self.hidden=0;self.out=[]
    def handle_starttag(self,tag,attrs):
        if tag in ('script','style'):self.hidden+=1
        if tag in ('p','div','h1','h2','h3','li','br','article'):self.out.append('\n')
    def handle_endtag(self,tag):
        if tag in ('script','style'):self.hidden=max(0,self.hidden-1)
    def handle_data(self,data):
        if not self.hidden:self.out.append(data)
for name in sys.argv[1:]:
    p=Path('evidence/2026-08-26')/name
    if not p.exists():continue
    t=Text();t.feed(p.read_text());print('\nFILE '+name+'\n'+'\n'.join(x.strip() for x in ''.join(t.out).splitlines() if x.strip()))
