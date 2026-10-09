/* ===== Livello 7: il sapone con papà Andrea e Margherita ===== */
(()=>{
const WW=1200,WH=900;
const HOUSE={x:60,y:120,w:330,h:170};
const TABLE={x:600,y:520};
const POT_TALK={x:600,y:610};           /* davanti al tavolo si mette tutto nel pentolone */
const OLIVE={x:190,y:720};
const LAV={x1:820,x2:1150,y1:340,y2:480};
const HIVE={x:1070,y:760};
const ING=[{k:'olio',x:270,y:760,name:"L'OLIO!"},{k:'lavanda',x:1000,y:500,name:'LA LAVANDA!'},{k:'miele',x:985,y:800,name:'IL MIELE!'}];
const BUBBLE_TO=[[300,600],[880,640],[600,790],[440,400],[1040,580]];
const tufts=[],flowers=[];
for(let i=0;i<320;i++)tufts.push([R()*WW,262+R()*(WH-262)]);
for(let i=0;i<60;i++){const x=50+R()*(WW-100),y=310+R()*(WH-350);
  if((x>LAV.x1-20&&y<LAV.y2+20)||Math.hypot(x-TABLE.x,y-TABLE.y)<160||Math.hypot(x-HIVE.x,y-HIVE.y)<90||Math.hypot(x-OLIVE.x,y-OLIVE.y)<80)continue;
  flowers.push([x,y,i%3]);}
const ingSVG={
  olio:on=>`<svg viewBox="0 0 26 26" aria-hidden="true"><rect x="10" y="2" width="6" height="5" rx="1.5" fill="${on?'#b0743f':'#cbbf9f'}" stroke="#3b2a35" stroke-width="1.4"/><path d="M10 7h6v3l3 4v9a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 7 23v-9l3-4z" fill="${on?'#b5c93a':'#e4d6b8'}" stroke="#3b2a35" stroke-width="1.6" stroke-linejoin="round"/><rect x="9" y="15" width="8" height="5" rx="1" fill="${on?'#fff':'#f3ead6'}"/></svg>`,
  lavanda:on=>`<svg viewBox="0 0 26 26" aria-hidden="true"><path d="M13 24V10M13 24l-5-12M13 24l5-12" stroke="${on?'#4caf50':'#cbbf9f'}" stroke-width="2" stroke-linecap="round"/>${[[13,6],[8,9],[18,9],[13,10],[8,6],[18,6],[13,3]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="2.2" ry="3" fill="${on?'#9b6fd6':'#e4d6b8'}" stroke="#3b2a35" stroke-width="1"/>`).join('')}<rect x="10" y="17" width="6" height="3" rx="1" fill="${on?'#f28cb0':'#cbbf9f'}"/></svg>`,
  miele:on=>`<svg viewBox="0 0 26 26" aria-hidden="true"><rect x="7" y="3" width="12" height="5" rx="2" fill="${on?'#e5533d':'#cbbf9f'}" stroke="#3b2a35" stroke-width="1.4"/><rect x="5" y="8" width="16" height="16" rx="4" fill="${on?'#ffb52e':'#e4d6b8'}" stroke="#3b2a35" stroke-width="1.6"/><path d="M9 13h8" stroke="${on?'#fff3c4':'#f3ead6'}" stroke-width="2" stroke-linecap="round"/></svg>`
};
const bubbleSVG=on=>`<svg viewBox="0 0 26 26" aria-hidden="true"><circle cx="13" cy="13" r="10" fill="${on?'#d8f1ff':'#e4d6b8'}" stroke="#3b2a35" stroke-width="1.6"/><path d="M8 10a6 6 0 0 1 5-4" stroke="#fff" stroke-width="2.4" stroke-linecap="round" fill="none"/></svg>`;

function sparkle(c,x,y,k){if(RM)return;const s=((T*1.6+k)%1.4);if(s>1)return;const r=Math.sin(s*Math.PI)*8;
  c.beginPath();c.moveTo(x,y-r);c.lineTo(x+r*.3,y);c.lineTo(x,y+r);c.lineTo(x-r*.3,y);c.closePath();c.moveTo(x-r,y);c.lineTo(x,y-r*.3);c.lineTo(x+r,y);c.lineTo(x,y+r*.3);c.closePath();
  c.fillStyle='#fff7b0';c.fill();}
function plop(){tone(520,.08,0,'sine');tone(780,.1,.06,'sine');}
function popSnd(){tone(1200,.05,0,'sine');tone(1700,.06,.03,'sine');}
function buzz(){tone(180,.25,0,'sawtooth');tone(200,.25,.12,'sawtooth');}

/* ---------- disegno ---------- */
function drawSky(c){
  const g=c.createLinearGradient(0,0,0,260);g.addColorStop(0,'#9fd8f7');g.addColorStop(1,'#eef9fc');c.fillStyle=g;c.fillRect(0,0,WW,262);
  C(c,1090,72,32);c.fillStyle='#ffe066';c.fill();
  [[300,60],[700,40],[960,120]].forEach(([x,y])=>{const cx=(x+(RM?0:T*7))%(WW+160)-80;c.fillStyle='#fff';C(c,cx,y,17);c.fill();C(c,cx+21,y-9,22);c.fill();C(c,cx+44,y,17);c.fill();});
  c.beginPath();c.moveTo(0,262);for(let x=0;x<=WW;x+=30)c.lineTo(x,210+Math.sin(x/180+2)*20+Math.sin(x/60)*5);c.lineTo(WW,262);c.closePath();fs(c,'#b3da8e');
  c.beginPath();c.moveTo(0,262);for(let x=0;x<=WW;x+=40)c.lineTo(x,244+Math.sin(x/110)*9);c.lineTo(WW,262);c.closePath();fs(c,'#95d06a');
}
function drawFlower(c,x,y,k){
  const col=['#fffdf2','#f28cb0','#ffd23d'][k];
  for(let i=0;i<5;i++){const a=i/5*TAU;C(c,x+Math.cos(a)*3.4,y+Math.sin(a)*3.4,2.8);c.fillStyle=col;c.fill();}C(c,x,y,1.8);c.fillStyle=k==2?'#ff9a3d':'#e8d36a';c.fill();
}
function drawHouse(c){
  const {x,y,w,h}=HOUSE,cx=x+w/2;
  shadowAt(c,cx,y+h+4,w/2+20,12);
  rr(c,x,y,w,h,4);fs(c,'#f7efe2');
  c.beginPath();c.moveTo(x-22,y+6);c.lineTo(x+40,y-58);c.lineTo(x+w-40,y-58);c.lineTo(x+w+22,y+6);c.closePath();fs(c,'#d9714a');
  c.strokeStyle='#bb5a36';c.lineWidth=2;for(let k=0;k<4;k++){const yy=y-46+k*13;c.beginPath();c.moveTo(x+34-k*14,yy);c.lineTo(x+w-34+k*14,yy);c.stroke();}
  [[x+30],[x+w-86]].forEach(([wx])=>{
    rr(c,wx,y+40,56,50,4);fs(c,'#bfe7f7');c.beginPath();c.moveTo(wx+28,y+40);c.lineTo(wx+28,y+90);c.moveTo(wx,y+65);c.lineTo(wx+56,y+65);c.lineWidth=2.5;c.stroke();
    rr(c,wx-12,y+38,12,54,2);fs(c,'#4f8fd8',2.2);rr(c,wx+56,y+38,12,54,2);fs(c,'#4f8fd8',2.2);
    rr(c,wx-4,y+94,64,10,3);fs(c,'#b0743f');[8,22,36,50].forEach((d,i)=>{C(c,wx-2+d,y+92,5.5);fs(c,i%2?'#9b6fd6':'#f28cb0',1.6);});
  });
  rr(c,cx-26,y+h-92,52,92,6);fs(c,'#4f8fd8');
  c.strokeStyle='#3d72b8';c.lineWidth=2;[cx-10,cx+10].forEach(dx=>{c.beginPath();c.moveTo(dx,y+h-86);c.lineTo(dx,y+h-4);c.stroke();});
  C(c,cx+16,y+h-44,3.5);c.fillStyle='#ffc93d';c.fill();
}
function drawOlive(c){
  const {x,y}=OLIVE;shadowAt(c,x+30,y+4,90,18);
  c.beginPath();c.moveTo(x-14,y);c.quadraticCurveTo(x-4,y-50,x-18,y-96);c.lineTo(x+4,y-96);c.quadraticCurveTo(x+16,y-50,x+12,y);c.closePath();fs(c,'#8f7a5e');
  const blobs=[[-56,-110,40],[30,-120,46],[-12,-156,48],[56,-160,34],[-60,-158,30]];
  blobs.forEach(([a,b,r])=>{C(c,x+a,y+b,r);c.lineWidth=6;c.strokeStyle=OL;c.stroke();});
  blobs.forEach(([a,b,r])=>{C(c,x+a,y+b,r);c.fillStyle='#8fae6a';c.fill();});
  c.fillStyle='#a9c487';[[-40,-130],[20,-150],[50,-120],[-10,-110]].forEach(([a,b])=>{E(c,x+a,y+b,10,4,.4);c.fill();});
  [[-30,-140],[30,-130],[-50,-110],[45,-170],[5,-176],[-36,-170],[10,-110]].forEach(([a,b])=>{E(c,x+a,y+b,3.5,4.5);fs(c,'#3b3540',1.4);});
}
function oil(c,x,y,s){c.save();c.translate(x,y);c.scale(s,s);
  rr(c,-4,-42,8,8,2);fs(c,'#b0743f',2);
  c.beginPath();c.moveTo(-4,-34);c.lineTo(4,-34);c.lineTo(4,-28);c.lineTo(10,-18);c.lineTo(10,0);c.lineTo(-10,0);c.lineTo(-10,-18);c.lineTo(-4,-28);c.closePath();fs(c,'#b5c93a',2.4);
  rr(c,-8,-16,16,10,2);c.fillStyle='#fff';c.fill();E(c,0,-11,3,2.4);c.fillStyle='#4f7d3c';c.fill();
  c.fillStyle='rgba(255,255,255,.5)';c.fillRect(-7,-24,3,8);c.restore();}
function lavender(c,x,y,s){c.save();c.translate(x,y);c.scale(s,s);
  [-.35,-.12,.12,.35].forEach((a,i)=>{c.save();c.rotate(a);c.beginPath();c.moveTo(0,0);c.lineTo(0,-30);c.strokeStyle='#4caf50';c.lineWidth=2.4;c.stroke();
    for(let k=0;k<5;k++){E(c,0,-30-k*5,3.4,3.8);fs(c,i%2?'#9b6fd6':'#8a5cc8',1.2);}c.restore();});
  rr(c,-6,-12,12,6,2);fs(c,'#f28cb0',1.6);c.restore();}
function honey(c,x,y,s){c.save();c.translate(x,y);c.scale(s,s);
  rr(c,-12,-26,24,26,6);fs(c,'#ffb52e',2.4);
  c.beginPath();c.moveTo(-14,-24);c.lineTo(14,-24);c.lineTo(12,-32);c.lineTo(-12,-32);c.closePath();fs(c,'#e5533d',2);
  [-8,-2,4,10].forEach(d=>{C(c,d,-32,2);c.fillStyle='#fff';c.fill();});
  rr(c,-8,-18,16,9,2);c.fillStyle='#fff3c4';c.fill();
  c.beginPath();c.moveTo(-6,-26);c.quadraticCurveTo(-7,-20,-5,-18);c.strokeStyle='#e89a14';c.lineWidth=3;c.stroke();c.restore();}
const DRAW_ING={olio:oil,lavanda:lavender,miele:honey};
function drawLavField(c){
  for(let y=LAV.y1;y<=LAV.y2;y+=35)for(let x=LAV.x1+(y/35%2)*18;x<LAV.x2;x+=36){
    E(c,x,y-6,16,9);fs(c,'#6a9a52',2);
    for(let k=-2;k<=2;k++){c.beginPath();c.moveTo(x+k*4,y-8);c.lineTo(x+k*6,y-28+Math.abs(k)*3);c.strokeStyle='#5a8a44';c.lineWidth=1.6;c.stroke();
      E(c,x+k*6,y-30+Math.abs(k)*3,2.6,5);c.fillStyle='#9b6fd6';c.fill();}}
}
function drawHive(c){
  const {x,y}=HIVE;shadowAt(c,x,y+4,46,10);
  rr(c,x-30,y-12,60,12,3);fs(c,'#8a5a36',2.2);
  [[0,'#ffd35a'],[1,'#ffc93d'],[2,'#ffd35a']].forEach(([i,col])=>{rr(c,x-34+i*2,y-40-i*26,68-i*4,28,6);fs(c,col,2.4);});
  c.beginPath();c.moveTo(x-38,y-90);c.lineTo(x,y-112);c.lineTo(x+38,y-90);c.closePath();fs(c,'#d9714a');
  rr(c,x-8,y-22,16,8,4);c.fillStyle=OL;c.fill();
  for(let k=0;k<4;k++){const a=T*(2+k*.4)+k*1.6,bx=x+Math.cos(a)*(40+k*6),by=y-70+Math.sin(a*1.3)*24;bee(c,RM?x-40+k*26:bx,RM?y-130:by,Math.cos(a)<0?1:-1);}
}
function bee(c,x,y,f){c.save();c.translate(x,y);c.scale(f,1);
  E(c,-2,-6,4,5,-.4);E(c,3,-6,4,5,.4);c.fillStyle='rgba(255,255,255,.8)';c.fill();
  E(c,0,0,6,4.5);fs(c,'#ffc93d',1.6);c.fillStyle=OL;c.fillRect(-1.5,-4,2,8);c.fillRect(2.5,-3.5,1.6,7);c.restore();}
function drawTable(c){
  const {x,y}=TABLE,w=200,h=60,x0=x-w/2,y0=y-h/2;
  rr(c,x0+18,y0+h-4,12,34,3);fs(c,'#8a5230',2.5);rr(c,x0+w-30,y0+h-4,12,34,3);fs(c,'#8a5230',2.5);
  rr(c,x0,y0,w,h,8);fs(c,'#c98b55');
  c.save();rr(c,x0+20,y0+4,w-40,h-6,4);c.clip();c.fillStyle='#fff';c.fillRect(x0,y0,w,h);c.fillStyle='rgba(155,111,214,.45)';
  for(let k=0;k<w;k+=14)c.fillRect(x0+20+k,y0,7,h);for(let k=0;k<h;k+=14)c.fillRect(x0,y0+4+k,w,7);c.restore();
  rr(c,x0+20,y0+4,w-40,h-6,4);c.lineWidth=2;c.strokeStyle=OL;c.stroke();
  rr(c,x0,y0+h-6,w,14,5);fs(c,'#a86a40');
  if(S.soap){
    rr(c,x-46,y-14,92,22,5);fs(c,'#e0c9a6',2.2);
    /* saponette tagliate a mano, con lo spago e un fiore sopra */
    [['#c7a8f0',-30,-.06],['#ffd56a',0,.04],['#c9e58f',30,-.03]].forEach(([col,d,r])=>{c.save();c.translate(x+d,y-16);c.rotate(r);
      c.beginPath();c.moveTo(-13,-7);c.lineTo(12,-8);c.lineTo(13,7);c.lineTo(-12,8);c.closePath();fs(c,col,2);
      c.fillStyle='rgba(255,255,255,.35)';[[-6,-2],[5,3],[2,-4]].forEach(([a,b])=>{C(c,a,b,1.4);c.fill();});
      c.strokeStyle='#b08a5a';c.lineWidth=1.8;c.beginPath();c.moveTo(0,-8);c.lineTo(0,8);c.stroke();
      c.restore();});
    lavender(c,x-30,y-22,.3);
    if(!RM)for(let k=0;k<4;k++){const ph=(T*.6+k*.25)%1;C(c,x-40+k*26,y-30-ph*60,4+ph*3);c.strokeStyle=`rgba(120,170,220,${1-ph})`;c.lineWidth=1.6;c.stroke();}
    return;
  }
  /* il pentolone sul fornelletto */
  const px=x,py=y-6;
  rr(c,px-34,py-6,68,10,3);fs(c,'#4a4954',2);
  if(!RM){C(c,px-16,py-2,3);C(c,px,py-2,3);C(c,px+16,py-2,3);c.fillStyle='#ff9a3d';c.fill();}
  rr(c,px-32,py-50,64,46,10);fs(c,'#c96f3b',2.6);
  rr(c,px-40,py-40,8,6,2);fs(c,'#8a4a26',2);rr(c,px+32,py-40,8,6,2);fs(c,'#8a4a26',2);
  E(c,px,py-50,34,8);fs(c,'#a8582c',2.4);
  E(c,px,py-50,28,5);c.fillStyle=S.count>=3?'#f1e6ff':S.count>0?'#e8d68a':'#6a4a3a';c.fill();
  /* il cucchiaio di legno gira */
  const a=RM?0:Math.sin(T*(S.count>=3?6:2))*.35;
  c.save();c.translate(px,py-52);c.rotate(a);c.beginPath();c.moveTo(0,0);c.lineTo(12,-44);c.strokeStyle=OL;c.lineWidth=7;c.stroke();c.strokeStyle='#d9a066';c.lineWidth=4;c.stroke();c.restore();
  if(S.count>=3&&!RM)for(let k=0;k<6;k++){const ph=(T*.8+k/6)%1;C(c,px-20+k*8+Math.sin(T*3+k)*4,py-54-ph*40,3+ph*5);c.strokeStyle=`rgba(120,170,220,${1-ph})`;c.lineWidth=1.8;c.stroke();}
  else if(S.count>0&&!RM)for(let k=0;k<3;k++){const ph=(T*.5+k/3)%1;E(c,px-10+k*10,py-60-ph*30,4+ph*4,3+ph*2);c.fillStyle=`rgba(255,255,255,${.6*(1-ph)})`;c.fill();}
  /* gli ingredienti già messi */
  const put=S.ings.filter(g=>g.in);put.forEach((g,i)=>DRAW_ING[g.k](c,[x-74,x+56,x+80][i],y+6,.7));
}
function drawBubble(c,b){
  const fl=b.popping?b.pop*10:0,r=18+fl,y=b.y-46+(RM?0:Math.sin(T*2+b.k)*6);
  shadowAt(c,b.x,b.y,12,4);
  c.globalAlpha=b.popping?1-b.pop:1;
  C(c,b.x,y,r);c.fillStyle='rgba(190,230,255,.55)';c.fill();c.lineWidth=3;c.strokeStyle='rgba(70,120,190,1)';c.stroke();
  c.beginPath();c.arc(b.x,y,r-4,Math.PI*1.1,Math.PI*1.45);c.strokeStyle='#fff';c.lineWidth=3;c.stroke();
  c.beginPath();c.arc(b.x,y,r-3,Math.PI*.1,Math.PI*.4);c.strokeStyle='rgba(242,140,176,.8)';c.lineWidth=2;c.stroke();
  c.globalAlpha=1;
}

/* ---------- ostacoli ---------- */
function wallBlocked(x,y){
  if(x<45||x>WW-45||y<272||y>WH-40)return true;
  if(x>HOUSE.x-8&&x<HOUSE.x+HOUSE.w+8&&y<HOUSE.y+HOUSE.h+16)return true;
  if(x>TABLE.x-104&&x<TABLE.x+104&&y>TABLE.y-46&&y<TABLE.y+50)return true;
  if(Math.hypot(x-OLIVE.x,y-OLIVE.y)<22)return true;
  if(Math.hypot(x-HIVE.x,(y-HIVE.y)*1.6)<46)return true;
  return false;
}

/* ---------- dialoghi ---------- */
function talkAndrea(){
  const s=S.state;
  if(s==0)openDialog('andrea',[`CIAO ${N()}!`,'FACCIAMO IL SAPONE CON MARGHERITA!','TROVA OLIO, LAVANDA E MIELE!','PORTALI AL PENTOLONE!'],()=>setState(1));
  else if(s==1)openDialog('andrea',['TROVA OLIO, LAVANDA E MIELE!']);
  else if(s==3)openDialog('andrea',['SCOPPIA LE BOLLE!']);
  else if(s==4)sapone();
}
function talkGirl(){if(S.state==0||S.state==1)openDialog('girl',[`CIAO ${N()}!`]);}
function deliver(){
  const g=S.ings.find(g=>g.k==S.carry);g.in=true;S.carry=null;S.count++;
  plop();burst(TABLE.x,TABLE.y-60,22,g.k=='olio'?['#b5c93a','#fff']:g.k=='lavanda'?['#9b6fd6','#c7a8f0','#fff']:['#ffb52e','#fff3c4']);
  floatText(TABLE.x,TABLE.y-110,'NEL PENTOLONE!','#fff');
  if(S.count<3){setState(1);return;}
  updateHUD();
  openDialog('andrea',['CHE BEL PROFUMO!',`GRAZIE ${N()}!`],()=>{
    S.bubbles=BUBBLE_TO.map(([x,y],k)=>({x:TABLE.x,y:TABLE.y-20,k,tx:x,ty:y,fly:true,vx:0,vy:0,wa:k*1.3,popping:false,pop:0}));
    sfx.pick();floatText(TABLE.x,TABLE.y-120,'BOLLE!','#d8f1ff');
    setTimeout(()=>{if(S.state==1||S.state==2)openDialog('andrea',['OH! LE BOLLE SONO SCAPPATE!','SCOPPIA LE BOLLE!'],()=>setState(3));},1300);});
}
function sapone(){
  openDialog('andrea',['ECCO IL SAPONE!',`${BRAV()} ${N()}!`],()=>
    openDialog('girl',['GRAZIE! VI VOGLIO BENE!'],()=>{
      setState(5);sfx.win();confetti(TABLE.x,TABLE.y-80);floatText(TABLE.x,TABLE.y-130,'CHE PROFUMO!','#ffc93d');
      finish('Che profumo il sapone di papà e Margherita!',2.6);}));
}

LEVELS.push({
  name:'Il sapone',ww:WW,wh:WH,bg:'#9ad66f',party:['maci','piumi'],music:'audio/stage7.mp3',
  start:{p:{x:230,y:400},q:{x:190,y:416}},
  quests:['VAI DA PAPÀ ANDREA','TROVA OLIO, LAVANDA E MIELE','PORTALO AL PENTOLONE','SCOPPIA 5 BOLLE','TORNA DA PAPÀ ANDREA','CHE PROFUMO!'],
  fresh:()=>({count:0,popped:0,carry:null,soap:false,bubbles:[],
    ings:ING.map(g=>({...g,got:false,in:false})),
    npc:{andrea:{x:740,y:510},girl:{x:462,y:520}}}),
  progress:()=>S.state>=1&&S.state<=2?S.ings.map(g=>ingSVG[g.k](g.in)).join(''):S.state==3?[0,1,2,3,4].map(i=>bubbleSVG(i<S.popped)).join(''):'',
  blocked(x,y){
    if(wallBlocked(x,y))return true;
    const n=S.npc;return Math.hypot(x-n.andrea.x,y-n.andrea.y)<26||Math.hypot(x-n.girl.x,y-n.girl.y)<22;
  },
  tick(dt){
    S.bubbles.forEach(b=>{
      if(b.popping){b.pop+=dt*3;return;}
      if(b.fly){const d=Math.hypot(b.tx-b.x,b.ty-b.y),st=220*dt;if(d<=st){b.x=b.tx;b.y=b.ty;b.fly=false;}else{b.x+=(b.tx-b.x)/d*st;b.y+=(b.ty-b.y)/d*st;}}});
    S.bubbles=S.bubbles.filter(b=>!b.popping||b.pop<1);
  },
  update(dt){
    const p=S.p,s=S.state;
    S.ings.forEach(g=>{if(g.got||Math.hypot(g.x-p.x,g.y-p.y)>44)return;
      if(s<1){if(hintCD<=0){floatText(g.x,g.y-60,'PRIMA VAI DA PAPÀ','#ffe9a8');hintCD=2.5;}return;}
      if(s==2){if(hintCD<=0){floatText(g.x,g.y-60,'PRIMA AL PENTOLONE!','#ffe9a8');hintCD=2.5;}return;}
      if(s>2)return;
      g.got=true;S.carry=g.k;sfx.pick();burst(g.x,g.y-14,20,['#fff','#ffc93d']);floatText(g.x,g.y-60,g.name);setState(2);});
    if(s==2)proximity('pot',POT_TALK.x,POT_TALK.y,deliver,80);
    if(s==3)S.bubbles.forEach(b=>{if(b.fly||b.popping)return;
      const d=Math.hypot(b.x-p.x,b.y-p.y)||1;
      b.wa+=(R()-.5)*dt*4;let tvx=Math.cos(b.wa)*30,tvy=Math.sin(b.wa)*30;
      if(d<160){const ax=(b.x-p.x)/d,ay=(b.y-p.y)/d,w=Math.sin(T*1.8+b.k*2)*.8;tvx=(ax-ay*w)*85;tvy=(ay+ax*w)*85;}
      const k=Math.min(1,dt*3);b.vx+=(tvx-b.vx)*k;b.vy+=(tvy-b.vy)*k;
      const nx=b.x+b.vx*dt,ny=b.y+b.vy*dt;
      if(wallBlocked(nx,b.y)){b.vx*=-.9;b.wa=Math.PI-b.wa;}else b.x=nx;
      if(wallBlocked(b.x,ny)){b.vy*=-.9;b.wa=-b.wa;}else b.y=ny;
      if(d<36){b.popping=true;S.popped++;popSnd();burst(b.x,b.y-46,16,['#d8f1ff','#fff','#f28cb0']);floatText(b.x,b.y-90,'POP!','#fff');
        if(S.popped>=5){floatText(p.x,p.y-90,BRAV()+'!','#ffc93d');S.soap=true;sfx.pick();setState(4);}else updateHUD();}});
    if(s==5)return;
    proximity('andrea',S.npc.andrea.x,S.npc.andrea.y,talkAndrea);
    proximity('girl',S.npc.girl.x,S.npc.girl.y,talkGirl);
    proximity('hive',HIVE.x,HIVE.y+30,()=>{buzz();floatText(HIVE.x,HIVE.y-140,'BZZZ!','#fff');},70);
  },
  guide(){
    const s=S.state,n=S.npc;
    if(s==0||s==4)return{x:n.andrea.x,y:n.andrea.y-150};
    if(s==1)return nearest(S.ings.filter(g=>!g.got),50);
    if(s==2)return{x:TABLE.x,y:TABLE.y-120};
    if(s==3)return nearest(S.bubbles.filter(b=>!b.popping),90);
    return null;
  },
  carry(c,x,y){const b=RM?0:Math.sin(T*5)*3;if(S.carry)DRAW_ING[S.carry](c,x+6,y-74-b,.8);},
  drawBack(c){
    drawSky(c);
    c.fillStyle='#9ad66f';c.fillRect(0,256,WW,WH-256);
    c.strokeStyle='#7fbf55';c.lineWidth=2;tufts.forEach(([x,y])=>{c.beginPath();c.moveTo(x-4,y-5);c.lineTo(x,y);c.lineTo(x+4,y-6);c.stroke();});
    flowers.forEach(([x,y,k])=>drawFlower(c,x,y,k));
    c.beginPath();c.moveTo(225,300);c.quadraticCurveTo(260,430,TABLE.x,POT_TALK.y+20);c.strokeStyle='#d8c08a';c.lineWidth=34;c.stroke();
    E(c,TABLE.x,TABLE.y+30,170,70);c.fillStyle='#d8c08a';c.fill();
  },
  ents(c,ents){
    const n=S.npc;
    ents.push([HOUSE.y+HOUSE.h,()=>drawHouse(c)]);
    ents.push([LAV.y1,()=>drawLavField(c)]);
    ents.push([OLIVE.y,()=>drawOlive(c)]);
    ents.push([HIVE.y,()=>drawHive(c)]);
    ents.push([TABLE.y+30,()=>drawTable(c)]);
    S.ings.forEach(g=>{if(!g.got)ents.push([g.y,()=>{shadowAt(c,g.x,g.y,14,4);DRAW_ING[g.k](c,g.x,g.y,1);}]);});
    ents.push([n.andrea.y,()=>drawPerson(c,n.andrea.x,n.andrea.y,{kind:'andrea',t:T,wave:S.state==0||S.state==4||S.state>=5})]);
    ents.push([n.girl.y,()=>drawGirl(c,n.girl.x,n.girl.y,{t:T,wave:S.state>=4})]);
    S.bubbles.forEach(b=>ents.push([b.y,()=>drawBubble(c,b)]));
  },
  drawFront(c){
    if(S.state==1)S.ings.forEach((g,i)=>{if(!g.got)sparkle(c,g.x+16,g.y-36,i*.37);});
  }
});
})();
