/* ===== Schermata iniziale: Maci e Piumi sfilano per tutti i livelli ===== */
const INTRO_MUSIC='audio/intro.mp3';
const SEG=760,IH=600,HZ=300,WALK=520;   /* larghezza di un posto, altezza virtuale, orizzonte, dove camminano */
const INTRO=[
  {sky:'#9fd8f7',ground:'#8fcf63',draw:introGarden},
  {sky:'#f8e2b8',ground:'#a8d88a',draw:introNonni},
  {sky:'#a9dcf5',ground:'#9fd27a',draw:introMountain},
  {sky:'#8fd0f5',ground:'#9ad66f',draw:introFarm},
  {sky:'#cfe3f2',ground:'#b5d98a',draw:introZii},
  {sky:'#7cc8f0',ground:'#f2d9a0',draw:introSea},
  {sky:'#bfe6fa',ground:'#98d26c',draw:introSoap},
  {sky:'#a8dcf6',ground:'#9ad66f',draw:introRebecca}
];
let introX=0;
/* la musica dell'intro si scarica tutta subito (i telefoni da soli la scaricano solo dopo il tocco),
   così al primo tocco parte senza aspettare */
let introURL=INTRO_MUSIC;
const isIntro=()=>music.src===introURL||music.src.endsWith(INTRO_MUSIC);
try{fetch(INTRO_MUSIC).then(r=>r.ok?r.blob():null).then(b=>{if(!b)return;
  const was=isIntro()&&music.paused;introURL=URL.createObjectURL(b);if(was)music.src=introURL;}).catch(()=>{});}catch(e){}
function introMusicStart(){
  if(!musicOn||(S&&S.started))return;
  if(music.src!==introURL&&(music.paused||!isIntro()))music.src=introURL;
  music.play().catch(()=>{});
}
/* i browser fanno partire la musica solo dopo un gesto: sui telefoni conta quando il dito si stacca */
['pointerup','touchend','click','keydown'].forEach(ev=>addEventListener(ev,()=>{if(S&&!S.started&&music.paused)introMusicStart();},true));

/* all'apertura il pulsante GIOCA: il tocco fa partire la musica e mostra i livelli */
document.getElementById('bPlay').onclick=()=>{introMusicStart();sfx.meow();document.getElementById('start').classList.remove('splash');};

/* ---------- i posti ---------- */
function sign(c,x,n){
  rr(c,x-4,WALK-120,8,110,2);fs(c,'#8a5a36',2.4);
  rr(c,x-30,WALK-132,60,38,6);fs(c,'#e0a868',2.6);
  c.fillStyle=OL;c.font='700 26px Fredoka, "Trebuchet MS", sans-serif';c.textAlign='center';c.textBaseline='middle';c.fillText(n,x,WALK-112);c.textBaseline='alphabetic';
}
function bush(c,x,y,col,dots){C(c,x-18,y-14,18);C(c,x+16,y-14,20);C(c,x,y-28,22);c.lineWidth=5;c.strokeStyle=OL;c.stroke();
  C(c,x-18,y-14,18);c.fillStyle=col;c.fill();C(c,x+16,y-14,20);c.fill();C(c,x,y-28,22);c.fill();
  if(dots)[[-14,-20],[10,-30],[20,-12],[-4,-12],[0,-38]].forEach(([a,b])=>{C(c,x+a,y+b,4);fs(c,dots,1.4);});}
function miniHouse(c,x,y,wall,roof,door){
  rr(c,x-110,y-120,220,120,4);fs(c,wall);
  c.beginPath();c.moveTo(x-130,y-114);c.lineTo(x,y-190);c.lineTo(x+130,y-114);c.closePath();fs(c,roof);
  rr(c,x-22,y-74,44,74,6);fs(c,door);
  [[x-82],[x+38]].forEach(([wx])=>{rr(c,wx,y-96,44,38,4);fs(c,'#bfe7f7');c.beginPath();c.moveTo(wx+22,y-96);c.lineTo(wx+22,y-58);c.lineWidth=2.4;c.stroke();});
}
function introGarden(c,x){
  [[x+120,WALK-40],[x+300,WALK-60],[x+560,WALK-36],[x+660,WALK-70]].forEach(([a,b],i)=>daisy(c,a,b,9,i));
  [[x+250],[x+620]].forEach(([px])=>{c.beginPath();c.moveTo(px-22,HZ+90);c.lineTo(px+22,HZ+90);c.lineTo(px+16,HZ+130);c.lineTo(px-16,HZ+130);c.closePath();fs(c,'#d0623c');
    C(c,px,HZ+76,16);fs(c,'#5cbf60');daisy(c,px,HZ+70,8,px);});
  bush(c,x+460,HZ+120,'#5aaa4a','#f28cb0');
  /* nonna Emma saluta con la zampa: esce dal fianco, dietro il corpo, lontano dalla faccia */
  const pa=RM?0:Math.sin(T*7)*.3;c.save();c.translate(x+410,WALK-72);c.rotate(.55+pa);
  rr(c,-6,-34,12,38,6);fs(c,CATS.emma.body,2.6);C(c,0,-34,7.5);fs(c,'#fff8ef',2.2);
  [[-3.5,-37],[0,-39],[3.5,-37]].forEach(([a,b])=>{C(c,a,b,1.6);c.fillStyle='#f0b3a6';c.fill();});c.restore();
  drawCat(c,x+400,WALK-50,CATS.emma,{sit:true,f:-1,t:T});
  drawGirl(c,x+520,WALK-40,{t:T,wave:true});
}
function introNonni(c,x){
  miniHouse(c,x+330,HZ+110,'#f2c98a','#d0623c','#7a4a2a');
  drawPerson(c,x+170,WALK-40,{kind:'luisa',glasses:true,t:T,wave:true});
  drawPerson(c,x+520,WALK-40,{kind:'gian',t:T,wave:true});
  C(c,x+640,WALK-20,14);fs(c,'#e5533d');c.strokeStyle='#b0402a';c.lineWidth=2;c.beginPath();c.arc(x+640,WALK-20,8,0,Math.PI);c.stroke();
}
function introMountain(c,x){
  [[x+120,180,'#8fa3b8'],[x+380,230,'#7d93aa'],[x+620,170,'#8fa3b8']].forEach(([mx,h,col])=>{
    c.beginPath();c.moveTo(mx-200,HZ+4);c.lineTo(mx,HZ-h);c.lineTo(mx+200,HZ+4);c.closePath();fs(c,col);
    c.beginPath();c.moveTo(mx-50,HZ-h+56);c.lineTo(mx,HZ-h);c.lineTo(mx+50,HZ-h+56);c.lineTo(mx+20,HZ-h+44);c.lineTo(mx,HZ-h+60);c.lineTo(mx-22,HZ-h+44);c.closePath();fs(c,'#fff',2.4);});
  bush(c,x+120,HZ+110,'#4f8a4a','#3f5fb5');bush(c,x+620,HZ+100,'#4f8a4a','#3f5fb5');
  drawPerson(c,x+260,WALK-40,{kind:'lucy',t:T,wave:true});
  drawPerson(c,x+470,WALK-40,{kind:'gianco',hat:true,t:T,wave:true});
}
function introFarm(c,x){
  for(let k=0;k<6;k++){const cx=x+90+k*44;c.strokeStyle='#3f9a48';c.lineWidth=3;[[-6,-14],[0,-18],[6,-14]].forEach(([a,b])=>{c.beginPath();c.moveTo(cx,HZ+90);c.lineTo(cx+a,HZ+90+b);c.stroke();});E(c,cx,HZ+92,6,3.5);fs(c,'#ff8a2a',1.6);}
  E(c,x+620,HZ+110,60,40);fs(c,'#e8c66a');c.strokeStyle='#c9a24a';c.lineWidth=2;for(let k=-40;k<=40;k+=14){c.beginPath();c.moveTo(x+620+k,HZ+80);c.lineTo(x+624+k,HZ+140);c.stroke();}
  drawPerson(c,x+200,WALK-40,{kind:'giulio',t:T,wave:true});
  drawPerson(c,x+470,WALK-40,{kind:'mile',t:T,wave:true});
}
function introZii(c,x){
  miniHouse(c,x+380,HZ+110,'#dfe9f2','#5a6270','#4f8fd8');
  [['#e5533d',0],['#4f8fd8',1],['#ffc93d',2],['#5cbf60',3]].forEach(([col,i])=>{rr(c,x+90-i*2,WALK-30-i*12,46,12,3);fs(c,col,2);});
  drawPerson(c,x+220,WALK-40,{kind:'silvia',t:T,wave:true});
  drawPerson(c,x+560,WALK-40,{kind:'simone',t:T,wave:true});
}
function introSea(c,x){
  c.fillStyle='#4fb8e6';c.fillRect(x,HZ-30,SEG,60);
  c.strokeStyle='rgba(255,255,255,.7)';c.lineWidth=3;for(let k=0;k<SEG;k+=90){const wy=HZ-10+(k/90%2)*20;c.beginPath();c.moveTo(x+k,wy);c.quadraticCurveTo(x+k+18,wy-8,x+k+36,wy);c.stroke();}
  c.fillStyle='#e9f8ff';c.fillRect(x,HZ+26,SEG,8);
  const ux=x+380;rr(c,ux-3,HZ+20,6,120,2);fs(c,'#fff4dc',2);c.beginPath();c.moveTo(ux-80,HZ+40);c.quadraticCurveTo(ux,HZ-30,ux+80,HZ+40);c.closePath();fs(c,'#e5533d');
  c.fillStyle='#fff';c.beginPath();c.moveTo(ux-26,HZ+30);c.quadraticCurveTo(ux,HZ-28,ux+26,HZ+30);c.closePath();c.fill();
  drawPerson(c,x+200,WALK-40,{kind:'cecilia',t:T,wave:true});
  drawPerson(c,x+570,WALK-40,{kind:'andrea',t:T,wave:true});
}
function introSoap(c,x){
  for(let k=0;k<5;k++){const lx=x+80+k*34;E(c,lx,HZ+90,16,9);fs(c,'#6a9a52',2);for(let j=-2;j<=2;j++){E(c,lx+j*6,HZ+68+Math.abs(j)*3,2.6,5);c.fillStyle='#9b6fd6';c.fill();}}
  drawGirl(c,x+420,WALK-40,{t:T,wave:true});
  for(let k=0;k<7;k++){const ph=RM?k/7:(T*.25+k/7)%1,bx=x+440+Math.sin(ph*9+k)*60+k*20,by=WALK-150-ph*260;
    c.globalAlpha=Math.min(1,(1-ph)*3);C(c,bx,by,10+k%3*4);c.fillStyle='rgba(190,230,255,.5)';c.fill();c.lineWidth=2.4;c.strokeStyle='rgba(70,120,190,1)';c.stroke();c.globalAlpha=1;}
}

function introRebecca(c,x){
  miniHouse(c,x+330,HZ+110,'#f6d6dc','#7a5aa8','#ffd23d');
  rr(c,x+440,WALK-60,200,60,10);fs(c,'#fff4dc',2.4);[0,1,2,3,4,5,6].forEach(k=>{c.fillStyle=FCOL[k%4];c.globalAlpha=.55;c.fillRect(x+446+k*27,WALK-57,13,54);c.globalAlpha=1;});
  const by=WALK-30-(RM?0:Math.abs(Math.sin(T*3))*30);C(c,x+600,by,15);fs(c,'#fff',2.4);c.save();C(c,x+600,by,15);c.clip();c.fillStyle='#e5533d';c.fillRect(x+585,by-5,30,10);c.restore();
  drawGirl(c,x+200,WALK-40,{t:T,rebecca:true,wave:true});
}

/* ---------- disegno ---------- */
let introCatX=0;
function drawIntro(dt){
  const c=ctx,k=Math.max(.6,VH/IH),vw=VW/k;
  if(!RM)introX+=dt*75;
  const len=SEG*INTRO.length;introX%=len;
  introCatX=vw*.42+introX;           /* posizione dei gatti nel mondo della sfilata */
  c.setTransform(DPR*k,0,0,DPR*k,0,0);
  const vh=VH/k,top=Math.min(0,vh-IH);
  c.translate(-introX,0);
  const x0=introX,x1=introX+vw,first=Math.floor(x0/SEG)-1,last=Math.floor(x1/SEG)+1;
  /* cielo e prato sfumano da un posto all'altro */
  const grad=key=>{const g=c.createLinearGradient(first*SEG+SEG/2,0,last*SEG+SEG/2,0),n=last-first;
    for(let i=first;i<=last;i++)g.addColorStop((i-first)/n,INTRO[((i%INTRO.length)+INTRO.length)%INTRO.length][key]);return g;};
  c.fillStyle=grad('sky');c.fillRect(x0-10,top-10,vw+20,HZ-top+10);
  c.fillStyle=grad('ground');c.fillRect(x0-10,HZ,vw+20,Math.max(vh,IH)-HZ+10);
  [[200,70],[640,50],[1000,110],[1500,60]].forEach(([cx0,cy])=>{const cx=x0+((cx0-introX*.3)%(vw+200)+vw+200)%(vw+200)-100;c.fillStyle='#fff';C(c,cx,cy,18);c.fill();C(c,cx+22,cy-9,23);c.fill();C(c,cx+46,cy,18);c.fill();});
  c.beginPath();c.moveTo(x0-10,WALK+30);c.lineTo(x1+10,WALK+30);c.strokeStyle='rgba(120,90,60,.18)';c.lineWidth=60;c.stroke();
  for(let i=first;i<=last;i++){const n=((i%INTRO.length)+INTRO.length)%INTRO.length,sx=i*SEG;
    INTRO[n].draw(c,sx);sign(c,sx+40,n+1);}
  /* Piumi insegue Maci, ogni tanto saltano */
  const hop=RM?0:Math.max(0,Math.sin(T*2.2))**8*26;
  drawCat(c,introCatX-80,WALK+20-(RM?0:Math.max(0,Math.sin(T*2.2-1.2))**8*22),CATS.piumi,{f:1,t:T,moving:!RM,seed:2});
  drawCat(c,introCatX,WALK+24-hop,CATS.maci,{f:1,t:T,moving:!RM,seed:1});
}
