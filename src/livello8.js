/* ===== Livello 8: a giocare dalla cuginetta Rebecca ===== */
(()=>{
const WW=1200,WH=900;
const HOUSE={x:60,y:120,w:330,h:170};
const RUG={x1:470,x2:730,y1:540,y2:650};         /* la coperta dei giochi */
const CESTE=[[470,370],[1090,420],[700,820]];
const PIECES=[[170,560,'#e5533d'],[960,620,'#4f8fd8'],[1010,770,'#ffc93d']];
const BALL0={x:260,y:800};
const TREE={x:150,y:720};
const SWING={x:960,y:470};
const tufts=[],flowers=[];
for(let i=0;i<320;i++)tufts.push([R()*WW,262+R()*(WH-262)]);
for(let i=0;i<60;i++){const x=50+R()*(WW-100),y=310+R()*(WH-350);
  if((x>RUG.x1-60&&x<RUG.x2+60&&y>RUG.y1-80&&y<RUG.y2+40)||Math.hypot(x-TREE.x,y-TREE.y)<90||Math.hypot(x-SWING.x,y-SWING.y)<110)continue;
  flowers.push([x,y,i%3]);}
const bearSVG=on=>`<svg viewBox="0 0 26 26" aria-hidden="true"><circle cx="7" cy="7" r="4" fill="${on?'#b07a4a':'#e4d6b8'}" stroke="#3b2a35" stroke-width="1.4"/><circle cx="19" cy="7" r="4" fill="${on?'#b07a4a':'#e4d6b8'}" stroke="#3b2a35" stroke-width="1.4"/><circle cx="13" cy="14" r="9" fill="${on?'#c98b55':'#e4d6b8'}" stroke="#3b2a35" stroke-width="1.6"/><ellipse cx="13" cy="17" rx="4" ry="3" fill="${on?'#f3dcae':'#f3ead6'}"/><circle cx="10" cy="12" r="1.3" fill="#3b2a35"/><circle cx="16" cy="12" r="1.3" fill="#3b2a35"/></svg>`;
const pieceSVG=on=>`<svg viewBox="0 0 26 26" aria-hidden="true"><path d="M5 8h5a3 3 0 1 1 6 0h5v5a3 3 0 1 1 0 6v4H5v-4a3 3 0 1 0 0-6z" fill="${on?'#6a8ff0':'#e4d6b8'}" stroke="#3b2a35" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
const ballSVG=on=>`<svg viewBox="0 0 26 26" aria-hidden="true"><circle cx="13" cy="13" r="10" fill="${on?'#fff':'#e4d6b8'}" stroke="#3b2a35" stroke-width="1.6"/><path d="M3.5 11a10 10 0 0 0 19 0" fill="${on?'#e5533d':'#cbbf9f'}"/><circle cx="13" cy="13" r="10" fill="none" stroke="#3b2a35" stroke-width="1.6"/></svg>`;

function sparkle(c,x,y,k){if(RM)return;const s=((T*1.6+k)%1.4);if(s>1)return;const r=Math.sin(s*Math.PI)*8;
  c.beginPath();c.moveTo(x,y-r);c.lineTo(x+r*.3,y);c.lineTo(x,y+r);c.lineTo(x-r*.3,y);c.closePath();c.moveTo(x-r,y);c.lineTo(x,y-r*.3);c.lineTo(x+r,y);c.lineTo(x,y+r*.3);c.closePath();
  c.fillStyle='#fff7b0';c.fill();}
function boing(){tone(330,.08,0,'sine');tone(220,.12,.06,'sine');}

/* ---------- disegno ---------- */
function drawSky(c){
  const g=c.createLinearGradient(0,0,0,260);g.addColorStop(0,'#9fd8f7');g.addColorStop(1,'#eef9fc');c.fillStyle=g;c.fillRect(0,0,WW,262);
  C(c,1080,70,32);c.fillStyle='#ffe066';c.fill();
  [[260,60],[680,44],[960,110]].forEach(([x,y])=>{const cx=(x+(RM?0:T*7))%(WW+160)-80;c.fillStyle='#fff';C(c,cx,y,17);c.fill();C(c,cx+21,y-9,22);c.fill();C(c,cx+44,y,17);c.fill();});
  c.beginPath();c.moveTo(0,262);for(let x=0;x<=WW;x+=30)c.lineTo(x,214+Math.sin(x/170+1)*18+Math.sin(x/66)*5);c.lineTo(WW,262);c.closePath();fs(c,'#b3da8e');
  c.beginPath();c.moveTo(0,262);for(let x=0;x<=WW;x+=40)c.lineTo(x,244+Math.sin(x/120+2)*9);c.lineTo(WW,262);c.closePath();fs(c,'#95d06a');
}
function drawFlower(c,x,y,k){
  const col=['#fffdf2','#f28cb0','#ffd23d'][k];
  for(let i=0;i<5;i++){const a=i/5*TAU;C(c,x+Math.cos(a)*3.4,y+Math.sin(a)*3.4,2.8);c.fillStyle=col;c.fill();}C(c,x,y,1.8);c.fillStyle=k==2?'#ff9a3d':'#e8d36a';c.fill();
}
function drawHouse(c){
  const {x,y,w,h}=HOUSE,cx=x+w/2;
  shadowAt(c,cx,y+h+4,w/2+20,12);
  rr(c,x,y,w,h,4);fs(c,'#f6d6dc');
  c.beginPath();c.moveTo(x-22,y+6);c.lineTo(x+40,y-58);c.lineTo(x+w-40,y-58);c.lineTo(x+w+22,y+6);c.closePath();fs(c,'#7a5aa8');
  c.strokeStyle='#64478f';c.lineWidth=2;for(let k=0;k<4;k++){const yy=y-46+k*13;c.beginPath();c.moveTo(x+34-k*14,yy);c.lineTo(x+w-34+k*14,yy);c.stroke();}
  [[x+30],[x+w-86]].forEach(([wx])=>{
    rr(c,wx,y+40,56,50,4);fs(c,'#bfe7f7');c.beginPath();c.moveTo(wx+28,y+40);c.lineTo(wx+28,y+90);c.moveTo(wx,y+65);c.lineTo(wx+56,y+65);c.lineWidth=2.5;c.stroke();
    rr(c,wx-4,y+94,64,10,3);fs(c,'#fff');});
  rr(c,cx-26,y+h-92,52,92,6);fs(c,'#ffd23d');
  C(c,cx+16,y+h-44,3.5);c.fillStyle=OL;c.fill();
  /* bandierine colorate */
  c.beginPath();c.moveTo(x+10,y+16);c.quadraticCurveTo(cx,y+40,x+w-10,y+16);c.strokeStyle=OL;c.lineWidth=1.6;c.stroke();
  for(let k=1;k<10;k++){const t2=k/10,fx=x+10+(w-20)*t2,fy=y+16+Math.sin(t2*Math.PI)*12;c.beginPath();c.moveTo(fx-7,fy);c.lineTo(fx+7,fy);c.lineTo(fx,fy+13);c.closePath();fs(c,FCOL[k%4],1.4);}
}
function drawTree(c){
  const {x,y}=TREE;shadowAt(c,x+30,y+4,90,18);
  rr(c,x-12,y-90,24,92,6);fs(c,'#8a5a36');
  const bl=[[-50,-110,44],[40,-120,48],[-6,-160,52],[60,-170,36],[-60,-160,34]];
  bl.forEach(([a,b,r])=>{C(c,x+a,y+b,r);c.lineWidth=6;c.strokeStyle=OL;c.stroke();});
  bl.forEach(([a,b,r])=>{C(c,x+a,y+b,r);c.fillStyle='#5aaa4a';c.fill();});
  [[-20,-150],[30,-130],[-50,-120],[50,-170],[10,-180],[-40,-170]].forEach(([a,b])=>{C(c,x+a,y+b,6);fs(c,'#e5533d',1.6);});
}
function drawSwing(c){
  const {x,y}=SWING;shadowAt(c,x,y+4,90,12);
  [[-80],[80]].forEach(([d])=>{c.beginPath();c.moveTo(x+d-26,y);c.lineTo(x+d,y-140);c.lineTo(x+d+26,y);c.strokeStyle=OL;c.lineWidth=9;c.stroke();c.strokeStyle='#e5533d';c.lineWidth=5;c.stroke();});
  c.beginPath();c.moveTo(x-86,y-140);c.lineTo(x+86,y-140);c.strokeStyle=OL;c.lineWidth=10;c.stroke();c.strokeStyle='#4f8fd8';c.lineWidth=6;c.stroke();
  const a=RM?0:Math.sin(T*1.6)*.25;
  [[-34],[34]].forEach(([d])=>{c.save();c.translate(x+d,y-140);c.rotate(a);c.beginPath();c.moveTo(-12,0);c.lineTo(-12,96);c.moveTo(12,0);c.lineTo(12,96);c.strokeStyle='#8a8f9c';c.lineWidth=2;c.stroke();rr(c,-18,94,36,8,3);fs(c,'#ffd23d',2);c.restore();});
}
function cesta(c,b){
  const {x,y}=b;shadowAt(c,x,y,30,7);
  c.save();if(b.shake>0&&!RM)c.translate(Math.sin(b.shake*40)*3,0);
  c.beginPath();c.moveTo(x-28,y-40);c.lineTo(x-22,y);c.lineTo(x+22,y);c.lineTo(x+28,y-40);c.closePath();fs(c,'#d9a066',2.6);
  c.strokeStyle='#b07a40';c.lineWidth=2;for(let k=-30;k<=-8;k+=10){c.beginPath();c.moveTo(x-27,y+k);c.lineTo(x+27,y+k);c.stroke();}
  if(b.open){E(c,x,y-40,28,7);fs(c,'#7a5230',2.4);}
  else{E(c,x,y-42,31,9);fs(c,'#e8b578',2.4);rr(c,x-6,y-54,12,8,3);fs(c,'#b07a40',1.8);}
  c.restore();
}
function bear(c,x,y,s){c.save();c.translate(x,y);c.scale(s,s);
  [[-12],[12]].forEach(([d])=>{E(c,d,-6,8,7);fs(c,'#b07a4a',2.2);});
  E(c,0,-22,15,16);fs(c,'#c98b55',2.4);E(c,0,-18,8,9);c.fillStyle='#f3dcae';c.fill();
  [[-16],[16]].forEach(([d])=>{E(c,d,-26,6,9,d>0?.4:-.4);fs(c,'#b07a4a',2.2);});
  [[-10],[10]].forEach(([d])=>{C(c,d,-56,7);fs(c,'#b07a4a',2.2);C(c,d,-56,3.5);c.fillStyle='#f3dcae';c.fill();});
  C(c,0,-46,14);fs(c,'#c98b55',2.4);E(c,0,-41,6,4.5);c.fillStyle='#f3dcae';c.fill();
  E(c,0,-43,2.6,2);c.fillStyle=OL;c.fill();C(c,-5,-49,1.8);C(c,5,-49,1.8);c.fill();
  c.beginPath();c.moveTo(-8,-33);c.lineTo(0,-30);c.lineTo(8,-33);c.lineTo(8,-27);c.lineTo(0,-30);c.lineTo(-8,-27);c.closePath();fs(c,'#e5533d',1.6);
  c.restore();}
function piece(c,x,y,col,s,rot){c.save();c.translate(x,y);c.scale(s,s);c.rotate(rot||0);
  c.beginPath();c.moveTo(-14,-10);c.lineTo(-4,-10);c.arc(0,-12,4.5,Math.PI*.8,Math.PI*.2);c.lineTo(14,-10);c.lineTo(14,-2);c.arc(16,2,4.5,Math.PI*1.3,Math.PI*.7);c.lineTo(14,12);c.lineTo(-14,12);c.closePath();
  c.lineWidth=7;c.strokeStyle='#fff';c.stroke();fs(c,col,2.2);
  c.restore();}
function ball(c,x,y,spin,s){const r=17*(s||1);
  shadowAt(c,x,y,r*.9,5);
  c.save();C(c,x,y-r,r);c.fillStyle='#fff';c.fill();c.clip();
  c.translate(x,y-r);c.rotate(spin);c.fillStyle='#e5533d';c.fillRect(-r,-r*.35,r*2,r*.7);c.fillStyle='#4f8fd8';C(c,0,0,r*.3);c.fill();c.restore();
  C(c,x,y-r,r);c.lineWidth=2.6;c.strokeStyle=OL;c.stroke();
  c.beginPath();c.arc(x-r*.35,y-r*1.35,r*.3,Math.PI*1.1,Math.PI*1.6);c.strokeStyle='rgba(255,255,255,.9)';c.lineWidth=2.4;c.stroke();
}
function drawRug(c){
  const {x1,x2,y1,y2}=RUG;
  rr(c,x1,y1,x2-x1,y2-y1,10);fs(c,'#fff4dc',2.6);
  c.save();rr(c,x1,y1,x2-x1,y2-y1,10);c.clip();
  for(let k=0;k<(x2-x1)/26;k++){c.fillStyle=FCOL[k%4];c.globalAlpha=.55;c.fillRect(x1+k*26,y1,13,y2-y1);}
  c.globalAlpha=.35;c.fillStyle='#fff';for(let k=0;k<(y2-y1)/26;k++)c.fillRect(x1,y1+k*26,x2-x1,13);c.globalAlpha=1;c.restore();
  rr(c,x1,y1,x2-x1,y2-y1,10);c.lineWidth=2.6;c.strokeStyle=OL;c.stroke();
}
/* il puzzle finito: Maci e Piumi */
function drawPuzzle(c,x,y){
  rr(c,x-34,y-26,68,44,4);fs(c,'#bfe3a5',2.4);
  drawCat(c,x-14,y+12,CATS.maci,{f:1,t:0,sit:true,noShadow:true,scale:.42});drawCat(c,x+14,y+12,CATS.piumi,{f:-1,t:0,sit:true,noShadow:true,scale:.42});
  c.strokeStyle='rgba(59,42,53,.35)';c.lineWidth=1.4;c.beginPath();c.moveTo(x-11,y-26);c.lineTo(x-11,y+18);c.moveTo(x+11,y-26);c.lineTo(x+11,y+18);c.stroke();
}

/* ---------- ostacoli ---------- */
function wallBlocked(x,y){
  if(x<45||x>WW-45||y<272||y>WH-40)return true;
  if(x>HOUSE.x-8&&x<HOUSE.x+HOUSE.w+8&&y<HOUSE.y+HOUSE.h+16)return true;
  if(Math.hypot(x-TREE.x,y-TREE.y)<22)return true;
  if(Math.abs(y-SWING.y)<16&&(Math.abs(x-SWING.x+106)<14||Math.abs(x-SWING.x-106)<14||Math.abs(x-SWING.x+54)<14||Math.abs(x-SWING.x-54)<14))return true;
  return CESTE.some(([cx,cy])=>Math.abs(x-cx)<30&&y>cy-26&&y<cy+10);
}

/* ---------- dialoghi ---------- */
function talkRebecca(){
  const s=S.state;
  if(s==0)openDialog('rebecca',[`CIAO ${N()}!`,'SONO SPARITI TUTTI I GIOCHI!','MI AIUTI A TROVARLI?',"CERCA L'ORSETTO NELLE CESTE!"],()=>setState(1));
  else if(s==1)openDialog('rebecca',["CERCA L'ORSETTO NELLE CESTE!"]);
  else if(s==2)openDialog('rebecca',['IL MIO ORSETTO!',`GRAZIE ${N()}!`,'TROVA 3 PEZZI DEL PUZZLE!'],()=>{S.carry=null;S.bear=true;sfx.pick();burst(RUG.x1+60,RUG.y1+20,22,['#c98b55','#e5533d','#fff']);setState(3);});
  else if(s==3)openDialog('rebecca',['TROVA 3 PEZZI DEL PUZZLE!']);
  else if(s==4)openDialog('rebecca',['CHE BELLO IL PUZZLE!'],()=>{S.carry=null;S.puzzle=true;sfx.pick();burst(RUG.x2-80,RUG.y1+40,26,['#e5533d','#4f8fd8','#5cbf60','#fff']);floatText(RUG.x2-80,RUG.y1-30,'MACI E PIUMI!','#ffc93d');
    openDialog('rebecca',['MANCA LA PALLA!','SPINGI LA PALLA FINO A NOI!'],()=>{S.ball.on=true;setState(5);});});
  else if(s==5)openDialog('rebecca',['SPINGI LA PALLA FINO A NOI!']);
}
function talkGirl(){if(S.state<6)openDialog('girl',[`${N()}! GIOCHIAMO?`]);}
function festa(){
  openDialog('rebecca',[`${BRAV()} ${N()}!`,'ADESSO GIOCHIAMO TUTTI INSIEME!'],()=>
    openDialog('girl',['GRAZIE! VI VOGLIO BENE!'],()=>{
      setState(6);sfx.win();confetti((RUG.x1+RUG.x2)/2,RUG.y1-40);floatText((RUG.x1+RUG.x2)/2,RUG.y1-110,'TUTTI A GIOCARE!','#ffc93d');
      finish('Che bello giocare tutti insieme con Rebecca!',2.8);}));
}

LEVELS.push({
  name:'A giocare da Rebecca',ww:WW,wh:WH,bg:'#9ad66f',party:['maci','piumi'],music:'audio/stage8.mp3',
  start:{p:{x:240,y:400},q:{x:200,y:416}},
  quests:['VAI DA REBECCA',"CERCA L'ORSETTO NELLE CESTE","PORTA L'ORSETTO A REBECCA",'TROVA 3 PEZZI DEL PUZZLE','PORTA IL PUZZLE A REBECCA','SPINGI LA PALLA SULLA COPERTA','TUTTI A GIOCARE!'],
  fresh:()=>({opened:0,count:0,carry:null,bear:false,puzzle:false,
    ceste:CESTE.map(([x,y])=>({x,y,open:false,shake:0})),
    pieces:PIECES.map(([x,y,col],i)=>({x,y,col,got:false,rot:(i-1)*.4})),
    ball:{x:BALL0.x,y:BALL0.y,vx:0,vy:0,spin:0,on:false,home:false},
    npc:{rebecca:{x:680,y:520},girl:{x:520,y:520}}}),
  progress:()=>S.state>=1&&S.state<=2?bearSVG(S.state==2):S.state>=3&&S.state<=4?[0,1,2].map(i=>pieceSVG(i<S.count)).join(''):S.state==5?ballSVG(false):'',
  blocked(x,y){
    if(wallBlocked(x,y))return true;
    const n=S.npc;return Math.hypot(x-n.rebecca.x,y-n.rebecca.y)<24||Math.hypot(x-n.girl.x,y-n.girl.y)<22;
  },
  tick(dt){
    S.ceste.forEach(b=>{if(b.shake>0)b.shake=Math.max(0,b.shake-dt);});
    const b=S.ball;if(!b.on)return;
    if(b.home){const tx=(RUG.x1+RUG.x2)/2,ty=RUG.y1+70,d=Math.hypot(tx-b.x,ty-b.y);if(d>2){const st=Math.min(d,120*dt);b.x+=(tx-b.x)/d*st;b.y+=(ty-b.y)/d*st;b.spin+=st/17;}return;}
    const f=Math.exp(-1.8*dt);b.vx*=f;b.vy*=f;
    const nx=b.x+b.vx*dt,ny=b.y+b.vy*dt;
    if(wallBlocked(nx,b.y)){b.vx*=-.8;}else b.x=nx;
    if(wallBlocked(b.x,ny)){b.vy*=-.8;}else b.y=ny;
    b.spin+=(b.vx>=0?1:-1)*Math.hypot(b.vx,b.vy)*dt/17;
  },
  update(dt){
    const p=S.p,s=S.state;
    S.ceste.forEach(b=>{if(b.open||Math.hypot(b.x-p.x,b.y+20-p.y)>50)return;
      if(s<1){if(hintCD<=0){floatText(b.x,b.y-80,'PRIMA VAI DA REBECCA','#ffe9a8');hintCD=2.5;}return;}
      if(s!=1)return;
      b.open=true;b.shake=.5;S.opened++;
      /* l'orsetto è sempre nell'ultima cesta che si apre */
      if(S.opened>=3){S.carry='orsetto';sfx.pick();burst(b.x,b.y-50,24,['#c98b55','#e5533d','#fff']);floatText(b.x,b.y-90,"L'ORSETTO!",'#ffc93d');setState(2);}
      else{boing();floatText(b.x,b.y-90,'VUOTA!','#fff');}});
    S.pieces.forEach(g=>{if(g.got||Math.hypot(g.x-p.x,g.y-p.y)>44)return;
      if(s<3){if(hintCD<=0){floatText(g.x,g.y-60,'UN PEZZO DEL PUZZLE!','#ffe9a8');hintCD=2.5;}return;}
      if(s>3)return;
      g.got=true;S.count++;sfx.pick();burst(g.x,g.y-14,20,[g.col,'#fff','#ffc93d']);floatText(g.x,g.y-60,S.count+(S.count==1?' PEZZO!':' PEZZI!'));
      if(S.count>=3){S.carry='puzzle';floatText(p.x,p.y-90,BRAV()+'!','#ffc93d');setState(4);}else updateHUD();});
    if(s==5){const b=S.ball,d=Math.hypot(b.x-p.x,b.y-p.y);
      if(!b.home&&d<36){const ax=(b.x-p.x)/(d||1),ay=(b.y-p.y)/(d||1);
        /* un piccolo aiuto: la palla va un po' verso la coperta */
        const gx=(RUG.x1+RUG.x2)/2-b.x,gy=(RUG.y1+RUG.y2)/2-b.y,gd=Math.hypot(gx,gy)||1;
        let dx=ax*.7+gx/gd*.3,dy=ay*.7+gy/gd*.3;const dl=Math.hypot(dx,dy)||1;
        b.vx=dx/dl*280;b.vy=dy/dl*280;boing();}
      if(!b.home&&b.x>RUG.x1+10&&b.x<RUG.x2-10&&b.y>RUG.y1+10&&b.y<RUG.y2+10){b.home=true;b.vx=b.vy=0;sfx.pick();burst(b.x,b.y-20,24,['#e5533d','#4f8fd8','#fff']);floatText(b.x,b.y-70,'GOL!','#ffc93d');setTimeout(()=>{if(S.state==5)festa();},700);}}
    proximity('rebecca',S.npc.rebecca.x,S.npc.rebecca.y,talkRebecca);
    proximity('girl',S.npc.girl.x,S.npc.girl.y,talkGirl);
  },
  guide(){
    const s=S.state,n=S.npc;
    if(s==0||s==2||s==4)return{x:n.rebecca.x,y:n.rebecca.y-160};
    if(s==1)return nearest(S.ceste.filter(b=>!b.open),70);
    if(s==3)return nearest(S.pieces.filter(g=>!g.got),40);
    if(s==5&&!S.ball.home)return{x:S.ball.x,y:S.ball.y-60};
    return null;
  },
  carry(c,x,y){const b=RM?0:Math.sin(T*5)*3;
    if(S.carry=='orsetto')bear(c,x+6,y-74-b,.7);
    else if(S.carry=='puzzle')PIECES.forEach(([,,col],i)=>piece(c,x+6+(i-1)*10,y-84-b-i*5,col,.6,(i-1)*.3));},
  drawBack(c){
    drawSky(c);
    c.fillStyle='#9ad66f';c.fillRect(0,256,WW,WH-256);
    c.strokeStyle='#7fbf55';c.lineWidth=2;tufts.forEach(([x,y])=>{c.beginPath();c.moveTo(x-4,y-5);c.lineTo(x,y);c.lineTo(x+4,y-6);c.stroke();});
    flowers.forEach(([x,y,k])=>drawFlower(c,x,y,k));
    c.beginPath();c.moveTo(225,300);c.quadraticCurveTo(250,470,RUG.x1,RUG.y1+50);c.strokeStyle='#d8c08a';c.lineWidth=34;c.stroke();
    drawRug(c);
  },
  ents(c,ents){
    const n=S.npc;
    ents.push([HOUSE.y+HOUSE.h,()=>drawHouse(c)]);
    ents.push([TREE.y,()=>drawTree(c)]);
    ents.push([SWING.y,()=>drawSwing(c)]);
    S.ceste.forEach(b=>ents.push([b.y,()=>cesta(c,b)]));
    S.pieces.forEach(g=>{if(!g.got)ents.push([g.y,()=>{shadowAt(c,g.x,g.y,14,4);piece(c,g.x,g.y-14,g.col,1.4,g.rot);}]);});
    if(S.bear)ents.push([RUG.y1+44,()=>bear(c,RUG.x1+56,RUG.y1+44,.75)]);
    if(S.puzzle)ents.push([RUG.y1+60,()=>drawPuzzle(c,RUG.x2-80,RUG.y1+40)]);
    if(S.ball.on)ents.push([S.ball.y,()=>ball(c,S.ball.x,S.ball.y,S.ball.spin)]);
    ents.push([n.rebecca.y,()=>drawGirl(c,n.rebecca.x,n.rebecca.y,{t:T,rebecca:true,wave:S.state==0||S.state>=6})]);
    ents.push([n.girl.y,()=>drawGirl(c,n.girl.x,n.girl.y,{t:T,wave:S.state>=6})]);
  },
  drawFront(c){
    if(S.state==1)S.ceste.forEach((b,i)=>{if(!b.open)sparkle(c,b.x+20,b.y-60,i*.37);});
    if(S.state==3)S.pieces.forEach((g,i)=>{if(!g.got)sparkle(c,g.x+16,g.y-30,i*.37);});
    if(S.state==5&&!S.ball.home)sparkle(c,S.ball.x+18,S.ball.y-40,.1);
  }
});
})();
