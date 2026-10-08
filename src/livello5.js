/* ===== Livello 5: a casa degli zii (studio) ===== */
(()=>{
const WW=1100,WH=800;
const SHELF={x:50,y:14,w:370,h:220};
const DESK={x:620,y:196,w:380,h:70};
const RACK={x:1010,y:20,w:64,h:250};
const SOFA={x:90,y:556};
const SIMONE_TALK={x:810,y:350};
const DOCKS=[[700,322],[748,330],[930,322]];
const ROBOT_COL=['#cfd3e0','#8fc8ff','#ffd36a'];
const robotSVG=on=>`<svg viewBox="0 0 26 26" aria-hidden="true"><path d="M13 6V3" stroke="#3b2a35" stroke-width="1.6"/><circle cx="13" cy="2.6" r="2" fill="${on?'#e5533d':'#cbbf9f'}"/><rect x="7" y="6" width="12" height="8" rx="2.5" fill="${on?'#8fc8ff':'#e4d6b8'}" stroke="#3b2a35" stroke-width="1.5"/><circle cx="11" cy="10" r="1.2" fill="${on?'#2b2a33':'#cbbf9f'}"/><circle cx="15" cy="10" r="1.2" fill="${on?'#2b2a33':'#cbbf9f'}"/><rect x="6" y="14.5" width="14" height="8" rx="2.5" fill="${on?'#8fc8ff':'#e4d6b8'}" stroke="#3b2a35" stroke-width="1.5"/><circle cx="9" cy="24" r="1.8" fill="#3b2a35"/><circle cx="17" cy="24" r="1.8" fill="#3b2a35"/></svg>`;
const BOOK_POS=[[640,540,'#e5533d'],[960,650,'#5cbf60'],[150,420,'#ffc93d']];
const BOOKS=['#e5533d','#4f8fd8','#5cbf60','#ffc93d','#b46ee0','#ff9a3d','#2f6f8f','#f28cb0'];
const GAPS=[[0,2],[1,5],[2,3]];  /* riga e posto dei libri caduti */
const bookSVG=on=>`<svg viewBox="0 0 26 26" aria-hidden="true"><rect x="5" y="4" width="16" height="19" rx="2" fill="${on?'#4f8fd8':'#e4d6b8'}" stroke="#3b2a35" stroke-width="1.6"/><path d="M8 4v19" stroke="#3b2a35" stroke-width="1.4"/><path d="M11 9h7M11 13h7" stroke="${on?'#fff':'#cbbf9f'}" stroke-width="1.6" stroke-linecap="round"/></svg>`;

function sparkle(c,x,y,k){if(RM)return;const s=((T*1.6+k)%1.4);if(s>1)return;const r=Math.sin(s*Math.PI)*8;
  c.beginPath();c.moveTo(x,y-r);c.lineTo(x+r*.3,y);c.lineTo(x,y+r);c.lineTo(x-r*.3,y);c.closePath();c.moveTo(x-r,y);c.lineTo(x,y-r*.3);c.lineTo(x+r,y);c.lineTo(x,y+r*.3);c.closePath();
  c.fillStyle='#fff7b0';c.fill();}
function beep(){tone(1320,.06,0,'square');tone(1760,.06,.07,'square');tone(990,.1,.14,'square');}

/* ---------- stanza ---------- */
function drawWall(c){
  c.fillStyle='#dfe9f2';c.fillRect(0,0,WW,160);
  c.fillStyle='#d2deea';for(let x=0;x<WW;x+=36)c.fillRect(x,0,12,160);
  const x=448,y=26,w=140,h=104;
  rr(c,x,y,w,h,6);fs(c,'#fff');c.save();rr(c,x+8,y+8,w-16,h-16,3);c.clip();
  c.fillStyle='#1f2a5a';c.fillRect(x,y,w,h);
  [[470,46],[520,60],[560,40],[495,90],[570,84],[540,100]].forEach(([a,b],i)=>{const tw=RM?1:.6+.4*Math.sin(T*3+i);C(c,a,b,1.8*tw+.6);c.fillStyle='#fff7b0';c.fill();});
  C(c,560,60,14);c.fillStyle='#fff3c4';c.fill();C(c,553,55,12);c.fillStyle='#1f2a5a';c.fill();
  c.restore();c.strokeStyle='#fff';c.lineWidth=6;c.beginPath();c.moveTo(x+w/2,y+6);c.lineTo(x+w/2,y+h-6);c.stroke();
  rr(c,x,y,w,h,6);c.lineWidth=3;c.strokeStyle=OL;c.stroke();
  rr(c,-4,150,WW+8,16,3);fs(c,'#8a9bb0');
}
function drawFloor(c){
  c.fillStyle='#c99a6b';c.fillRect(0,160,WW,WH-160);
  c.strokeStyle='#b88a5c';c.lineWidth=2;
  for(let y=166,r=0;y<WH;y+=30,r++){c.beginPath();c.moveTo(0,y);c.lineTo(WW,y);c.stroke();
    for(let x=(r%2)*70;x<WW;x+=140){c.beginPath();c.moveTo(x,y);c.lineTo(x,y+30);c.stroke();}}
  rr(c,0,150,30,WH,0);fs(c,'#dde6ee');rr(c,WW-30,150,30,WH,0);fs(c,'#dde6ee');
  E(c,560,560,210,96);fs(c,'#6fa8d8');E(c,560,560,180,78);c.fillStyle='#8fc0e6';c.fill();E(c,560,560,120,50);c.fillStyle='#ffc93d';c.fill();E(c,560,560,60,24);c.fillStyle='#f28cb0';c.fill();
  /* cavi del computer */
  c.beginPath();c.moveTo(1040,270);c.bezierCurveTo(1060,320,980,300,960,262);c.strokeStyle=OL;c.lineWidth=6;c.stroke();c.strokeStyle='#4f8fd8';c.lineWidth=3;c.stroke();
}
function drawShelf(c){
  const {x,y,w,h}=SHELF;shadowAt(c,x+w/2,y+h+2,w/2,10);
  rr(c,x,y,w,h,6);fs(c,'#9a6239');rr(c,x+10,y+12,w-20,h-30,3);c.fillStyle='#6f4127';c.fill();
  const rh=(h-30)/3;
  for(let r=0;r<3;r++){const by=y+12+(r+1)*rh;let bx=x+14,k=r*7+3,i=0;
    while(bx<x+w-30){const bw=11+(k*37)%9,bh=34+(k*53)%16;
      const gap=GAPS.findIndex(([gr,gi])=>gr==r&&gi==i);
      if(gap<0||S.state>=3){const col=gap<0?BOOKS[k%BOOKS.length]:BOOK_POS[gap][2];rr(c,bx,by-bh-3,bw,bh,2);fs(c,col,1.8);
        c.beginPath();c.moveTo(bx+2,by-bh+5);c.lineTo(bx+bw-2,by-bh+5);c.strokeStyle='rgba(255,255,255,.6)';c.lineWidth=2;c.stroke();}
      bx+=bw+2;k++;i++;}
    rr(c,x+8,by-3,w-16,7,2);fs(c,'#b0743f',2);}
  rr(c,x-6,y-6,w+12,12,4);fs(c,'#b0743f');
  /* un piccolo mappamondo, è una professoressa */
  C(c,x+w-26,y-22,14);fs(c,'#4f8fd8',2.2);E(c,x+w-30,y-26,6,4);E(c,x+w-20,y-16,5,3);c.fillStyle='#5cbf60';c.fill();rr(c,x+w-34,y-8,16,4,2);fs(c,'#b0743f',1.6);
}
function screen(c,x,y,w,h,k){
  rr(c,x,y,w,h,5);fs(c,'#2b2a33');c.save();rr(c,x+6,y+6,w-12,h-12,2);c.clip();
  c.fillStyle='#14202e';c.fillRect(x,y,w,h);
  if(k==1&&S.screen){c.fillStyle='#bfe3a5';c.fillRect(x,y,w,h);
    drawCat(c,x+w/2-22,y+h-10,CATS.maci,{f:1,t:T,sit:true,noShadow:true,scale:.75});drawCat(c,x+w/2+26,y+h-10,CATS.piumi,{f:-1,t:T,sit:true,noShadow:true,scale:.75});}
  else{const cols=['#7fe08a','#ffc93d','#6ab8ff','#f28cb0','#fff'];
    for(let i=0;i<7;i++){const ly=y+12+i*9,off=((i*29+k*13)%40),len=20+((i*53+k*31)%50);
      const sc=RM?0:(T*20+k*7)%9;c.fillStyle=cols[(i+k)%cols.length];c.fillRect(x+10+off%20,ly-sc*0,len,4);}
    if(!RM&&(T*2|0)%2){c.fillStyle='#fff';c.fillRect(x+12,y+h-18,8,6);}}
  c.restore();
}
function drawDesk(c){
  const {x,y,w,h}=DESK;shadowAt(c,x+w/2,y+h+6,w/2+10,10);
  rr(c,x+14,y+h-4,14,26,3);fs(c,'#5a6270',2.5);rr(c,x+w-28,y+h-4,14,26,3);fs(c,'#5a6270',2.5);
  /* tre schermi */
  [[x+20,y-120,110,84,0],[x+136,y-150,120,100,1],[x+262,y-120,104,84,2]].forEach(([a,b,sw,sh,k])=>{rr(c,a+sw/2-6,b+sh,12,26,2);fs(c,'#3b3540',2);screen(c,a,b,sw,sh,k);});
  rr(c,x,y,w,h,8);fs(c,'#e9edf2');rr(c,x,y+h-10,w,16,5);fs(c,'#c4ccd6');
  rr(c,x+120,y+18,140,26,5);fs(c,'#3b3540',2.2);
  for(let i=0;i<12;i++){rr(c,x+126+i*11,y+22,8,7,2);c.fillStyle='#6a6470';c.fill();rr(c,x+126+i*11,y+33,8,7,2);c.fill();}
  if(S.state<4||S.state>=6){E(c,x+290,y+30,9,12);fs(c,'#cfd3e0',2);c.beginPath();c.moveTo(x+290,y+20);c.lineTo(x+290,y+28);c.strokeStyle=OL;c.lineWidth=1.5;c.stroke();}
  else{E(c,x+290,y+32,12,6);c.strokeStyle='rgba(59,42,53,.4)';c.lineWidth=2;c.setLineDash([4,4]);c.stroke();c.setLineDash([]);}
  rr(c,x+30,y+16,30,30,6);fs(c,'#fff',2);c.fillStyle='#e5533d';c.fillRect(x+30,y+24,30,4);
  rr(c,x+64,y+10,24,30,5);fs(c,'#ffc93d',2);
}
function drawRack(c){
  const {x,y,w,h}=RACK;shadowAt(c,x+w/2,y+h,w/2+4,8);
  rr(c,x,y,w,h,6);fs(c,'#2b2a33');
  for(let i=0;i<8;i++){const ry=y+12+i*29;rr(c,x+6,ry,w-12,22,3);fs(c,'#3d3c48',1.6);
    for(let j=0;j<3;j++){const on=RM?(i+j)%2:Math.sin(T*(3+i)+j*2.1+i)>0;C(c,x+16+j*10,ry+11,3);c.fillStyle=on?['#5cff7a','#ffc93d','#6ab8ff'][j]:'#4a4954';c.fill();}
    rr(c,x+44,ry+7,10,8,2);c.fillStyle='#1c1b22';c.fill();}
}
function drawChair(c,x,y){
  rr(c,x-4,y-14,8,16,2);fs(c,'#3b3540',2);
  [[-18,4],[18,4],[0,8]].forEach(([a,b])=>{C(c,x+a,y+b,4);fs(c,'#2b2a33',1.6);});
  rr(c,x-26,y-80,52,56,14);fs(c,'#e5533d');rr(c,x-24,y-28,48,16,6);fs(c,'#c94434');
}
function drawSofa(c){
  const {x,y}=SOFA;shadowAt(c,x+150,y+144,160,12);
  rr(c,x+30,y+132,10,10,2);fs(c,'#5a341d',2);rr(c,x+260,y+132,10,10,2);fs(c,'#5a341d',2);
  rr(c,x+14,y,272,64,24);fs(c,'#e9a23b');
  c.save();c.translate(x+64,y+44);c.rotate(-.15);rr(c,-24,-20,48,40,12);fs(c,'#4f8fd8');c.restore();
  c.save();c.translate(x+236,y+44);c.rotate(.15);rr(c,-24,-20,48,40,12);fs(c,'#5cbf60');C(c,0,0,5);c.fillStyle='#fff';c.fill();c.restore();
  rr(c,x+24,y+52,252,72,14);fs(c,'#f2b44f');
  c.beginPath();c.moveTo(x+150,y+56);c.lineTo(x+150,y+118);c.strokeStyle='#d99430';c.lineWidth=3;c.stroke();
  rr(c,x+24,y+112,252,26,8);fs(c,'#d99430');
  rr(c,x,y+30,44,110,18);fs(c,'#dc962f');rr(c,x+256,y+30,44,110,18);fs(c,'#dc962f');
}
function drawLamp(c){const x=470,y=700;shadowAt(c,x,y,20,6);rr(c,x-3,y-110,6,110,2);fs(c,'#3b3540',2);E(c,x,y-2,16,5);fs(c,'#3b3540',2);
  c.beginPath();c.moveTo(x-24,y-104);c.lineTo(x-14,y-140);c.lineTo(x+14,y-140);c.lineTo(x+24,y-104);c.closePath();fs(c,'#ffe08a');}
function drawPlant(c){
  const x=1030,y=700;shadowAt(c,x,y,30,8);
  [[-1.1,'#4caf50'],[-.5,'#5fbf5a'],[0,'#4caf50'],[.5,'#5fbf5a'],[1.1,'#4caf50']].forEach(([a,col])=>{
    c.save();c.translate(x,y-40);c.rotate(a);E(c,0,-30,12,28);fs(c,col,2.5);c.restore();});
  c.beginPath();c.moveTo(x-22,y-40);c.lineTo(x+22,y-40);c.lineTo(x+16,y);c.lineTo(x-16,y);c.closePath();fs(c,'#6a8ff0');
}
function drawFallen(c,b){const {x,y}=b;shadowAt(c,x,y,18,5);
  c.save();c.translate(x,y-6);c.rotate(-.25);rr(c,-15,-10,30,20,3);fs(c,b.col,2.2);c.fillStyle='#fffaf0';c.fillRect(-12,7,26,3);c.restore();}
function drawBookStack(c,x,y){BOOK_POS.forEach(([,,col],i)=>{rr(c,x-14+i*2,y-i*8,28,8,2);fs(c,col,1.8);});}
function robot(c,m){
  c.save();c.translate(m.x,m.y);c.scale(m.f||1,1);
  shadowAt(c,0,0,16,5);
  const run=m.run&&!RM,hop=run?Math.abs(Math.sin(T*18+m.k))*3:0,sw=run?Math.sin(T*18+m.k)*.6:0;
  [-7,7].forEach(a=>{C(c,a,-4,4.5);fs(c,'#2b2a33',1.6);C(c,a,-4,1.5);c.fillStyle='#8a8f9c';c.fill();});
  c.translate(0,-hop);
  [[-1,sw],[1,-sw]].forEach(([d,r])=>{c.save();c.translate(d*13,-18);c.rotate(d*.5+r);c.beginPath();c.moveTo(0,0);c.lineTo(d*8,8);c.strokeStyle=OL;c.lineWidth=5;c.stroke();c.strokeStyle='#8a8f9c';c.lineWidth=2.5;c.stroke();C(c,d*8,8,3);fs(c,'#ffc93d',1.4);c.restore();});
  rr(c,-13,-28,26,22,5);fs(c,m.col||'#cfd3e0',2.5);
  C(c,0,-17,4);c.fillStyle='#ffc93d';c.fill();
  rr(c,-11,-46,22,17,5);fs(c,m.col||'#cfd3e0',2.5);rr(c,-7,-43,14,11,3);c.fillStyle='#14202e';c.fill();
  const bl=!RM&&((T+m.k*1.3)%3)<.12;
  [-3,3].forEach(a=>{if(bl){c.fillStyle='#5cff7a';c.fillRect(1+a-2,-38,4,1.5);}else{C(c,1+a,-38,1.8);c.fillStyle='#5cff7a';c.fill();}});
  c.beginPath();c.moveTo(0,-46);c.lineTo(0,-54);c.strokeStyle=OL;c.lineWidth=2;c.stroke();
  C(c,0,-56,3);c.fillStyle=(RM||((T*3+m.k)|0)%2)?'#e5533d':'#ffc93d';c.fill();
  c.restore();
}

function wallBlocked(x,y){
  if(x<50||x>WW-50||y<200||y>WH-45)return true;
  if(x>SHELF.x&&x<SHELF.x+SHELF.w&&y<SHELF.y+SHELF.h+4)return true;
  if(x>DESK.x-6&&x<RACK.x+RACK.w+6&&y<DESK.y+DESK.h+26)return true;
  if(Math.hypot(x-810,y-300)<28)return true;
  if(x>SOFA.x&&x<SOFA.x+300&&y>SOFA.y&&y<SOFA.y+148)return true;
  if(Math.hypot(x-470,y-700)<20||Math.hypot(x-1030,y-700)<32)return true;
  return false;
}

function talkSilvia(){
  const s=S.state;
  if(s==0)openDialog('silvia',[`CIAO ${N()}!`,'SONO CADUTI I MIEI LIBRI!','TROVA 3 LIBRI!'],()=>setState(1));
  else if(s==1)openDialog('silvia',['CERCA BENE IN CASA!']);
  else if(s==2)openDialog('silvia',['ECCO I MIEI LIBRI!',`GRAZIE ${N()}!`,'VAI DALLO ZIO SIMONE.'],()=>{S.carry=null;sfx.pick();burst(SHELF.x+SHELF.w/2,SHELF.y+90,26,['#e5533d','#5cbf60','#ffc93d','#fff']);setState(3);});
  else if(s<6)openDialog('silvia',['VAI DALLO ZIO SIMONE.']);
}
function talkSimone(){
  const s=S.state;
  if(s<3)openDialog('simone',[`CIAO ${N()}!`,'VAI DALLA ZIA SILVIA.']);
  else if(s==3)openDialog('simone',[`CIAO ${N()}!`,'I MIEI ROBOTTINI SONO SCAPPATI!','MI AIUTI A PRENDERLI?'],()=>{S.mice.forEach(m=>m.on=true);beep();setState(4);});
  else if(s==4)openDialog('simone',[`CORRI, ${N()}!`]);
  else if(s==5)openDialog('simone',['I MIEI ROBOTTINI!',`GRAZIE ${N()}!`,'GUARDA IL COMPUTER!'],()=>{
    S.carry=null;S.screen=true;sfx.win();burst(DESK.x+196,DESK.y-110,30,['#5cff7a','#6ab8ff','#ffc93d','#fff']);floatText(DESK.x+196,DESK.y-170,'MACI E PIUMI!','#ffc93d');
    openDialog('silvia',['TUTTI SUL DIVANO!'],()=>{setState(6);const n=S.npc;
      n.silvia.path=[[420,500],[430,740],[200,740]];n.simone.path=[[700,420],[440,742],[320,742]];n.girl.path=[[420,740]];
      floatText(SOFA.x+150,SOFA.y-40,'TUTTI SUL DIVANO!','#ffe9a8');});});
}
function talkGirl(){if(S.state<6)openDialog('girl',[`${N()}! GIOCHIAMO?`]);}
function storia(){
  openDialog('silvia',['VI LEGGO UNA STORIA.',"C'ERA UNA VOLTA DUE GATTINI: MACI E PIUMI!"],()=>{
    S.sofa=true;setState(7);sfx.win();confetti(SOFA.x+150,SOFA.y+20);floatText(SOFA.x+150,SOFA.y-40,'CHE BELLA STORIA!','#ffc93d');
    finish('Che bella storia sul divano con gli zii!',2.6);});
}

LEVELS.push({
  name:'A casa degli zii',ww:WW,wh:WH,bg:'#b98a5c',party:['maci','piumi'],music:'audio/stage5.mp3',
  start:{p:{x:560,y:440},q:{x:520,y:460}},
  quests:['VAI DA ZIA SILVIA','TROVA 3 LIBRI','PORTA I LIBRI ALLA ZIA','VAI DA ZIO SIMONE','PRENDI I 3 ROBOTTINI','TORNA DALLO ZIO SIMONE','TUTTI SUL DIVANO!','CHE BELLA STORIA!'],
  fresh:()=>({count:0,carry:null,screen:false,sofa:false,
    books:BOOK_POS.map(([x,y,col])=>({x,y,col,got:false})),
    caught:0,mice:[[560,600],[300,420],[900,560]].map(([x,y],i)=>({x,y,vx:0,vy:0,f:1,on:false,run:false,home:false,path:[],col:ROBOT_COL[i],k:i,wa:i*2})),
    npc:{silvia:{x:470,y:290,path:[]},simone:{x:810,y:300,path:[]},girl:{x:700,y:640,path:[]}}}),
  progress:()=>S.state>=1&&S.state<=2?[0,1,2].map(i=>bookSVG(i<S.count)).join(''):S.state==4?[0,1,2].map(i=>robotSVG(i<S.caught)).join(''):'',
  blocked(x,y){
    if(wallBlocked(x,y))return true;
    const n=S.npc;return Math.hypot(x-n.silvia.x,y-n.silvia.y)<26||Math.hypot(x-n.girl.x,y-n.girl.y)<22||(S.state>=6&&Math.hypot(x-n.simone.x,y-n.simone.y)<26);
  },
  tick(dt){
    Object.values(S.npc).forEach(n=>{if(!n.path.length)return;const [tx,ty]=n.path[0],d=Math.hypot(tx-n.x,ty-n.y),st=150*dt;
      if(d<=st){n.x=tx;n.y=ty;n.path.shift();}else{n.x+=(tx-n.x)/d*st;n.y+=(ty-n.y)/d*st;}});
    S.mice.forEach(m=>{if(!m.path.length){m.run=false;return;}const [tx,ty]=m.path[0],d=Math.hypot(tx-m.x,ty-m.y),st=170*dt;m.run=true;if(Math.abs(tx-m.x)>1)m.f=tx>m.x?1:-1;
      if(d<=st){m.x=tx;m.y=ty;m.path.shift();if(!m.path.length)m.f=1;}else{m.x+=(tx-m.x)/d*st;m.y+=(ty-m.y)/d*st;}});
  },
  update(dt){
    const p=S.p,s=S.state;
    S.books.forEach(b=>{if(b.got||Math.hypot(b.x-p.x,b.y-p.y)>44)return;
      if(s<1){if(hintCD<=0){floatText(b.x,b.y-60,'PRIMA VAI DA ZIA SILVIA','#ffe9a8');hintCD=2.5;}return;}
      if(s>1)return;
      b.got=true;S.count++;sfx.pick();burst(b.x,b.y-14,22,[b.col,'#fff','#ffc93d']);floatText(b.x,b.y-60,S.count+(S.count==1?' LIBRO!':' LIBRI!'));
      if(S.count>=3){S.carry='libri';floatText(p.x,p.y-90,BRAV()+'!','#ffc93d');setState(2);}else updateHUD();});
    if(s==4)S.mice.forEach(m=>{if(m.home)return;const d=Math.hypot(m.x-p.x,m.y-p.y)||1;
      m.wa+=(R()-.5)*dt*6;let tvx=Math.cos(m.wa)*60,tvy=Math.sin(m.wa)*60;
      if(d<200){const ax=(m.x-p.x)/d,ay=(m.y-p.y)/d,w=Math.sin(T*2.6+m.k*2)*.9;tvx=(ax-ay*w)*135;tvy=(ay+ax*w)*135;}
      const k=Math.min(1,dt*5);m.vx+=(tvx-m.vx)*k;m.vy+=(tvy-m.vy)*k;
      const nx=m.x+m.vx*dt,ny=m.y+m.vy*dt;
      if(this.blocked(nx,m.y)){m.vx*=-.9;m.wa=Math.PI-m.wa;}else m.x=nx;
      if(this.blocked(m.x,ny)){m.vy*=-.9;m.wa=-m.wa;}else m.y=ny;
      if(Math.abs(m.vx)>8)m.f=m.vx>0?1:-1;m.run=Math.hypot(m.vx,m.vy)>30;
      if(d<32){m.home=true;m.vx=m.vy=0;const [dx,dy]=DOCKS[S.caught];m.path=[[m.x,Math.max(m.y,400)],[dx,400],[dx,dy]];
        S.caught++;beep();burst(m.x,m.y-14,24,[m.col,'#5cff7a','#fff']);floatText(m.x,m.y-60,'PRESO!','#ffc93d');
        if(S.caught>=3){floatText(p.x,p.y-90,BRAV()+'!','#ffc93d');setState(5);}else updateHUD();}});
    if(s==6){proximity('sofa',SOFA.x+150,SOFA.y+170,storia,130);return;}
    proximity('silvia',S.npc.silvia.x,S.npc.silvia.y,talkSilvia);
    proximity('simone',SIMONE_TALK.x,SIMONE_TALK.y,talkSimone,60);
    proximity('girl',S.npc.girl.x,S.npc.girl.y,talkGirl);
  },
  guide(){
    const s=S.state,n=S.npc;
    if(s==0||s==2)return{x:n.silvia.x,y:n.silvia.y-150};
    if(s==1)return nearest(S.books.filter(b=>!b.got),50);
    if(s==3||s==5)return{x:SIMONE_TALK.x,y:SIMONE_TALK.y-170};
    if(s==4)return nearest(S.mice.filter(m=>!m.home),50);
    if(s==6)return{x:SOFA.x+150,y:SOFA.y+20};
    return null;
  },
  carry(c,x,y){const b=RM?0:Math.sin(T*5)*3;
    if(S.carry=='libri')drawBookStack(c,x+6,y-80-b);},
  drawBack(c){drawFloor(c);drawWall(c);},
  ents(c,ents){
    const n=S.npc;
    ents.push([234,()=>drawShelf(c)]);
    ents.push([270,()=>drawRack(c)]);
    ents.push([DESK.y+DESK.h,()=>drawDesk(c)]);
    ents.push([SOFA.y+140,()=>drawSofa(c)]);
    ents.push([700,()=>drawLamp(c)]);
    ents.push([700,()=>drawPlant(c)]);
    S.books.forEach(b=>{if(!b.got)ents.push([b.y,()=>drawFallen(c,b)]);});
    if(S.state<6){ents.push([n.simone.y-2,()=>drawChair(c,n.simone.x,n.simone.y)]);
      ents.push([n.simone.y,()=>drawPerson(c,n.simone.x,n.simone.y,{kind:'simone',sit:true,t:T,wave:S.state==3})]);}
    else if(S.sofa)ents.push([SOFA.y+141,()=>drawPerson(c,330,SOFA.y+124,{kind:'simone',sit:true,t:T,wave:true})]);
    else{ents.push([300,()=>drawChair(c,810,300)]);ents.push([n.simone.y,()=>drawPerson(c,n.simone.x,n.simone.y,{kind:'simone',t:T})]);}
    if(S.sofa)ents.push([SOFA.y+141,()=>drawPerson(c,210,SOFA.y+124,{kind:'silvia',sit:true,book:true,t:T})]);
    else ents.push([n.silvia.y,()=>drawPerson(c,n.silvia.x,n.silvia.y,{kind:'silvia',book:S.state!=0,t:T,wave:S.state==0})]);
    ents.push([n.girl.y,()=>drawGirl(c,n.girl.x,n.girl.y,{t:T,wave:S.state>=6})]);
    S.mice.forEach(m=>{if(m.on)ents.push([m.y,()=>robot(c,m,false)]);});
  },
  drawFront(c){
    rr(c,-4,WH-30,WW+8,34,0);fs(c,'#b98a5c');
    if(S.state==1)S.books.forEach((b,i)=>{if(!b.got)sparkle(c,b.x+16,b.y-30,i*.37);});
  }
});
})();
