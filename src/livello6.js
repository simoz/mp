/* ===== Livello 6: surf al mare con mamma e papà ===== */
(()=>{
const WW=5900,WH=900;
const SHORE=600;                 /* sopra c'è il mare, sotto la spiaggia */
const LANE={y1:150,y2:540};      /* dove si surfa */
const START=420,END=4620,SPEED=160,AHEAD=230;
const UMB={x:5420,y:720};
const MAMMA0={x:470,y:680},GIRL0={x:400,y:700};
const starSVG=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8z" fill="#ffc93d" stroke="#3b2a35" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
/* la strada di Margherita tra le onde; alla fine torna verso riva */
function waveY(x){const b=340+Math.sin(x/260)*120+Math.sin(x/97+1)*28;
  if(x<START+300)return 380+(b-380)*Math.max(0,(x-START)/300);
  if(x>END-500){const k=Math.min(1,(x-END+500)/500);return b+(SHORE-30-b)*k;}return b;}
const jumpH=x=>{const k=(x-START)%1100;return x>START+800&&x<END-500&&k<170?Math.sin(k/170*Math.PI)*46:0;};
const UMBS=[[260,640,'#e5533d'],[1300,660,'#4f8fd8'],[2300,650,'#5cbf60'],[3400,660,'#f28cb0'],[4100,650,'#ffc93d'],[5760,680,'#e5533d']];
const SHELLS=[],GULLS=[];
for(let i=0;i<70;i++)SHELLS.push([R()*WW,SHORE+50+R()*(WH-SHORE-90),i%3]);
for(let i=0;i<8;i++)GULLS.push([R()*WW,60+R()*120,R()*6]);

function sparkle(c,x,y,k){if(RM)return;const s=((T*1.6+k)%1.4);if(s>1)return;const r=Math.sin(s*Math.PI)*8;
  c.beginPath();c.moveTo(x,y-r);c.lineTo(x+r*.3,y);c.lineTo(x,y+r);c.lineTo(x-r*.3,y);c.closePath();c.moveTo(x-r,y);c.lineTo(x,y-r*.3);c.lineTo(x+r,y);c.lineTo(x,y+r*.3);c.closePath();
  c.fillStyle='#fff7b0';c.fill();}
function star(c,x,y,r){c.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr2=i%2?r*.45:r;c.lineTo(x+Math.cos(a)*rr2,y+Math.sin(a)*rr2);}c.closePath();fs(c,'#ffc93d',2.2);}
function splash(){tone(300,.12,0,'sine');tone(520,.1,.05,'sine');}

/* ---------- disegno ---------- */
function view(){const cam=camera();return{x0:cam.x-80,x1:cam.x+VW/Z+80};}
function drawSea(c){
  const {x0,x1}=view();
  const g=c.createLinearGradient(0,0,0,SHORE);g.addColorStop(0,'#2f8fd0');g.addColorStop(1,'#5cc6ea');c.fillStyle=g;c.fillRect(x0,-300,x1-x0,SHORE+310);
  c.strokeStyle='rgba(255,255,255,.55)';c.lineWidth=3;
  for(let row=0;row<9;row++){const y=40+row*64+(RM?0:(T*14)%64);
    for(let x=Math.floor(x0/120)*120+(row%2)*60;x<x1;x+=120){c.beginPath();c.moveTo(x-18,y);c.quadraticCurveTo(x,y-9,x+18,y);c.stroke();}}
  /* schiuma della riva */
  c.beginPath();c.moveTo(x0,SHORE+30);for(let x=x0;x<=x1;x+=20)c.lineTo(x,SHORE+(RM?0:Math.sin(x/60+T*2)*4));c.lineTo(x1,SHORE+30);c.closePath();c.fillStyle='#e9f8ff';c.fill();
  c.fillStyle='#f2d9a0';c.beginPath();c.moveTo(x0,WH+300);for(let x=x0;x<=x1;x+=20)c.lineTo(x,SHORE+10+(RM?0:Math.sin(x/60+T*2)*4));c.lineTo(x1,WH+300);c.closePath();c.fill();
  c.fillStyle='rgba(200,160,100,.25)';for(let x=Math.floor(x0/90)*90;x<x1;x+=90){E(c,x+20,SHORE+120,30,5);c.fill();E(c,x+60,SHORE+230,24,4);c.fill();}
  SHELLS.forEach(([x,y,k])=>{if(x<x0||x>x1)return;if(k==0){c.beginPath();c.arc(x,y,6,Math.PI,0);c.closePath();fs(c,'#ffd0c0',1.6);}else if(k==1){C(c,x,y,3.5);fs(c,'#fff',1.4);}else star(c,x,y,5);});
  /* boe che segnano il percorso */
  for(let x=START+600;x<END-400;x+=700){const y=LANE.y1-26+(RM?0:Math.sin(T*2+x)*3);if(x<x0||x>x1)continue;C(c,x,y,10);fs(c,'#e5533d',2.2);c.fillStyle='#fff';c.fillRect(x-10,y-2,20,4);
    const y2=LANE.y2+30+(RM?0:Math.sin(T*2+x+1)*3);C(c,x,y2,10);fs(c,'#e5533d',2.2);c.fillStyle='#fff';c.fillRect(x-10,y2-2,20,4);}
}
function drawDolphin(c,x,y,k){
  const ph=(T*.7+k)%3;if(RM||ph>1)return;const a=ph*Math.PI,hx=x+ph*120-60,hy=y-Math.sin(a)*60;
  c.save();c.translate(hx,hy);c.rotate(-Math.cos(a)*.8);
  c.beginPath();c.moveTo(-26,0);c.quadraticCurveTo(-6,-16,22,-4);c.quadraticCurveTo(30,0,22,3);c.quadraticCurveTo(-6,10,-26,0);c.closePath();fs(c,'#7a9cc0',2.4);
  c.beginPath();c.moveTo(-4,-10);c.lineTo(2,-20);c.lineTo(6,-8);c.closePath();fs(c,'#7a9cc0',2);
  c.beginPath();c.moveTo(-26,0);c.lineTo(-34,-8);c.lineTo(-32,6);c.closePath();fs(c,'#7a9cc0',2);
  C(c,14,-4,1.8);c.fillStyle=OL;c.fill();c.restore();
  E(c,x+(ph<.5?-60:60),y+2,18,4);c.fillStyle='rgba(255,255,255,.7)';c.fill();
}
function drawGulls(c){const {x0,x1}=view();c.strokeStyle=OL;c.lineWidth=2.5;
  GULLS.forEach(([gx,gy,k])=>{const x=(gx+(RM?0:T*30))%WW,y=gy+Math.sin(T+k)*8;if(x<x0||x>x1)return;const f=RM?0:Math.sin(T*6+k)*5;
    c.beginPath();c.moveTo(x-14,y-f);c.quadraticCurveTo(x-6,y-8,x,y);c.quadraticCurveTo(x+6,y-8,x+14,y-f);c.stroke();});}
function board(c,x,y,col,len){const L2=len||48;
  E(c,x,y+2,L2+4,7);c.fillStyle='rgba(255,255,255,.6)';c.fill();
  E(c,x,y-2,L2,9);fs(c,col,2.4);c.fillStyle='rgba(255,255,255,.75)';c.fillRect(x-L2+8,y-3,L2*2-16,3);}
function umbrella(c,x,y,col){
  shadowAt(c,x+10,y+4,50,10);
  rr(c,x-40,y-4,80,14,4);fs(c,col==='#ffc93d'?'#6a8ff0':'#fff4dc',2);
  c.beginPath();c.moveTo(x,y);c.lineTo(x+6,y-96);c.strokeStyle=OL;c.lineWidth=5;c.stroke();c.strokeStyle='#fff';c.lineWidth=2.5;c.stroke();
  c.beginPath();c.moveTo(x-54,y-84);c.quadraticCurveTo(x+6,y-140,x+66,y-84);c.closePath();fs(c,col);
  c.strokeStyle='#fff';c.lineWidth=5;[-30,6,42].forEach(d=>{c.beginPath();c.moveTo(x+6,y-118);c.lineTo(x+d,y-86);c.stroke();});
}
function sandcastle(c,x,y){shadowAt(c,x,y,40,8);rr(c,x-34,y-30,68,30,4);fs(c,'#e6c47e');[-24,0,24].forEach(d=>{rr(c,x+d-9,y-52,18,24,3);fs(c,'#e6c47e',2);});
  c.beginPath();c.moveTo(x,y-52);c.lineTo(x,y-74);c.strokeStyle=OL;c.lineWidth=2;c.stroke();c.beginPath();c.moveTo(x,y-74);c.lineTo(x+14,y-68);c.lineTo(x,y-62);c.closePath();fs(c,'#e5533d',1.6);}
function cooler(c,x,y){shadowAt(c,x,y,30,6);rr(c,x-26,y-30,52,30,6);fs(c,'#4f8fd8');rr(c,x-28,y-36,56,10,4);fs(c,'#fff',2);}
function cone(c,x,y,col){c.beginPath();c.moveTo(x-7,y-10);c.lineTo(x,y+8);c.lineTo(x+7,y-10);c.closePath();fs(c,'#e6b06a',1.8);C(c,x,y-13,7);fs(c,col,1.8);}

/* ---------- logica ---------- */
function startSurf(){
  S.surf=true;setState(1);splash();
  S.p.x=START;S.p.y=380;S.q.x=START-80;S.q.y=380;trail=[];target=null;
  S.girlX=START+AHEAD;S.lastStar=S.girlX;
  say('PRENDI LE STELLINE!','cecilia');floatText(START+120,300,'VIA!','#ffc93d');
}
function talkMamma(){
  if(S.state==0)openDialog('cecilia',[`CIAO ${N()}!`,'ANDIAMO A FARE SURF!','SEGUI MARGHERITA SULLE ONDE!'],()=>openDialog('girl',[`${N()}! GIOCHIAMO?`],startSurf));
}
function talkPapa(){
  if(S.state<2)openDialog('andrea',[`CIAO ${N()}!`]);
  else if(S.state==2)openDialog('andrea',[`CIAO ${N()}!`,S.cur=='piumi'?'CHE BRAVA SURFISTA!':'CHE BRAVO SURFISTA!','ECCO IL GELATO!'],()=>{
    S.gelato=true;setState(3);sfx.win();confetti(UMB.x,UMB.y-90);floatText(UMB.x,UMB.y-150,'GELATO!','#ffc93d');
    finish('Che bello fare surf con mamma e papà!'+(S.stars?` Hai preso ${S.stars} ${S.stars==1?'stellina':'stelline'}!`:''),2.6);});
}
function landing(){
  S.surf=false;setState(2);splash();
  S.p.y=Math.max(S.p.y,SHORE+50);S.q.x=S.p.x-60;S.q.y=S.p.y+10;trail=[];target=null;
  burst(S.p.x,S.p.y-20,30,['#fff','#8fd6f5','#ffc93d']);floatText(S.p.x,S.p.y-100,S.stars+' STELLINE!','#ffc93d');
  S.npc.girl={x:END+420,y:SHORE+130};S.npc.mamma={x:END+520,y:SHORE+96};
  say('CHE BELLE ONDE!','cecilia');
}

LEVELS.push({
  name:'Surf al mare',ww:WW,wh:WH,bg:'#f2d9a0',party:['maci','piumi'],music:'audio/stage6.mp3',
  start:{p:{x:300,y:720},q:{x:250,y:740}},
  quests:['VAI DA MAMMA CECILIA','SEGUI MARGHERITA SULLE ONDE!','VAI DA PAPÀ ANDREA','GELATO!'],
  fresh:()=>({surf:false,stars:0,gelato:false,girlX:0,lastStar:0,starList:[],
    npc:{girl:{...GIRL0},mamma:{...MAMMA0}}}),
  progress:()=>S.state==1?`${starSVG}<b style="font-size:22px;line-height:26px">${S.stars}</b>`:'',
  blocked(x,y){
    if(S.surf)return Math.abs(x-S.p.x)>.01||y<LANE.y1||y>LANE.y2;
    if(x<40||x>WW-40||y<SHORE+40||y>WH-30)return true;
    if(Math.hypot(x-UMB.x,y-UMB.y)<30)return true;
    const n=S.npc;return Math.hypot(x-n.mamma.x,y-n.mamma.y)<26||Math.hypot(x-n.girl.x,y-n.girl.y)<22;
  },
  tick(dt){
    /* sulle onde il gatto va avanti da solo: si sceglie solo su o giù */
    if(S.surf&&target)target.x=S.p.x;
  },
  update(dt){
    const p=S.p,s=S.state;
    if(S.surf){
      p.x+=SPEED*dt;p.f=1;S.girlX=p.x+AHEAD;
      const last=trail[trail.length-1];if(!last||Math.hypot(last.x-p.x,last.y-p.y)>4)trail.push({x:p.x,y:p.y});if(trail.length>60)trail.shift();
      if(S.girlX-S.lastStar>85&&S.girlX<END-200){S.lastStar=S.girlX;S.starList.push({x:S.girlX-10,y:waveY(S.girlX-10)-6,t:0});}
      S.starList=S.starList.filter(st=>{st.t+=dt;
        if(Math.hypot(st.x-p.x,st.y-(p.y-14))<48){S.stars++;sfx.pick();burst(st.x,st.y,10,['#ffc93d','#fff']);floatText(st.x,st.y-30,'+1','#ffe9a8');updateHUD();return false;}
        return st.x>p.x-300;});
      const q=S.q,tp=trail.find(t=>t.x>=p.x-90)||trail[0]||p;q.x=p.x-90;q.y+=(tp.y-q.y)*Math.min(1,dt*6);q.f=1;q.moving=false;
      if(p.x>=END)landing();
      return;
    }
    if(s==0)proximity('mamma',S.npc.mamma.x,S.npc.mamma.y,talkMamma);
    if(s==0)proximity('girl',S.npc.girl.x,S.npc.girl.y,talkMamma);
    proximity('papa',UMB.x-60,UMB.y+10,talkPapa,80);
  },
  guide(){
    const s=S.state;
    if(s==0)return{x:S.npc.mamma.x,y:S.npc.mamma.y-150};
    if(s==1){const x=S.girlX-AHEAD+90;return{x,y:waveY(x)-50};}
    if(s==2)return{x:UMB.x-60,y:UMB.y-160};
    return null;
  },
  drawBack(c){
    drawSea(c);
    [[1800,380,0],[3100,300,1.4],[2600,480,2.1],[3900,260,.7]].forEach(([x,y,k])=>drawDolphin(c,x,y,k));
    if(S.surf){/* la scia di Margherita */
      c.strokeStyle='rgba(255,255,255,.7)';c.lineWidth=5;c.beginPath();
      for(let x=Math.max(START,S.girlX-500);x<=S.girlX;x+=12)c.lineTo(x,waveY(x)+4);c.stroke();}
    drawGulls(c);
  },
  ents(c,ents){
    const n=S.npc,{x0,x1}=view();
    UMBS.forEach(([x,y,col])=>{if(x>x0-80&&x<x1+80)ents.push([y,()=>umbrella(c,x,y,col)]);});
    ents.push([760,()=>sandcastle(c,700,760)]);ents.push([800,()=>sandcastle(c,2900,800)]);ents.push([830,()=>sandcastle(c,5100,830)]);
    ents.push([UMB.y,()=>umbrella(c,UMB.x,UMB.y,'#ff9a3d')]);
    ents.push([UMB.y+30,()=>cooler(c,UMB.x+70,UMB.y+30)]);
    ents.push([UMB.y+5,()=>drawPerson(c,UMB.x-60,UMB.y+10,{kind:'andrea',t:T,wave:S.state==2||S.state>=3})]);
    if(S.gelato){[[n.girl,'#f28cb0',22],[n.mamma,'#8a5a3a',30]].forEach(([q,col,dx])=>ents.push([q.y+1,()=>cone(c,q.x+dx,q.y-60,col)]));
      ents.push([UMB.y+11,()=>cone(c,UMB.x-30,UMB.y-50,'#5cbf60')]);}
    if(S.surf){
      const gx=S.girlX,gy=waveY(gx),j=jumpH(gx);
      ents.push([gy,()=>{c.save();c.translate(0,-j);board(c,gx,gy,'#ff6fa8',44);drawGirl(c,gx,gy-6,{t:T,noShadow:true,wave:j>20});c.restore();}]);
      const mx=gx-80,my=Math.min(LANE.y2,waveY(mx)+70);
      ents.push([my,()=>{board(c,mx,my,'#6ab8ff',54);drawPerson(c,mx,my-6,{kind:'cecilia',t:T,noShadow:true})}]);
      ents.push([S.p.y-.5,()=>board(c,S.p.x,S.p.y,S.cur=='maci'?'#ffc93d':'#5cbf60')]);
      ents.push([S.q.y-.5,()=>board(c,S.q.x,S.q.y,S.cur=='maci'?'#5cbf60':'#ffc93d')]);
      S.starList.forEach((st,i)=>ents.push([st.y-40,()=>{star(c,st.x,st.y-20+(RM?0:Math.sin(T*5+i)*3),11);}]));
    }else{
      if(S.state==0){[[GIRL0.x+70,GIRL0.y+30,'#ff6fa8'],[MAMMA0.x+70,MAMMA0.y+40,'#6ab8ff'],[GIRL0.x-60,GIRL0.y+60,'#ffc93d'],[GIRL0.x+10,GIRL0.y+80,'#5cbf60']].forEach(([x,y,col])=>ents.push([y-20,()=>board(c,x,y,col)]));}
      else [[END+260,SHORE+70,'#ff6fa8'],[END+330,SHORE+66,'#6ab8ff'],[END+180,SHORE+250,'#ffc93d'],[END+260,SHORE+262,'#5cbf60']].forEach(([x,y,col])=>ents.push([y-20,()=>board(c,x,y,col)]));
      ents.push([n.girl.y,()=>drawGirl(c,n.girl.x,n.girl.y,{t:T,wave:S.state==0||S.state>=3})]);
      ents.push([n.mamma.y,()=>drawPerson(c,n.mamma.x,n.mamma.y,{kind:'cecilia',t:T,wave:S.state==0||S.state>=3})]);
    }
  },
  drawFront(c){if(S.state==0)sparkle(c,S.npc.mamma.x+24,S.npc.mamma.y-130,0);}
});
})();
