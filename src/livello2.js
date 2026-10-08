/* ===== Livello 2: a casa dei nonni (soggiorno) ===== */
(()=>{
const WW=1100,WH=800;
const SPOTS=[{x:190,y:252,w:'SOLO LIBRI'},{x:830,y:252,w:'SOLO TAZZE'},{x:962,y:668,w:'SOLO FOGLIE'},{x:130,y:506,w:'SOLO LANA'},{x:820,y:618,w:'SOLO BRICIOLE'}];
const SOFA_SPOT={x:340,y:446},TABLE={x:820,y:484},GIAN_TALK={x:205,y:440};
const BOOKS=['#e5533d','#4f8fd8','#5cbf60','#ffc93d','#b46ee0','#ff9a3d','#2f6f8f','#f28cb0'];
const CHAIRS=[[770,395,false],[870,395,false],[770,578,true],[870,578,true]];

function sparkle(c,x,y,k){if(RM)return;const s=((T*1.6+k)%1.4);if(s>1)return;const r=Math.sin(s*Math.PI)*8;
  c.beginPath();c.moveTo(x,y-r);c.lineTo(x+r*.3,y);c.lineTo(x,y+r);c.lineTo(x-r*.3,y);c.closePath();c.moveTo(x-r,y);c.lineTo(x,y-r*.3);c.lineTo(x+r,y);c.lineTo(x,y+r*.3);c.closePath();
  c.fillStyle='#fff7b0';c.fill();}
function drawWindow(c){
  const x=430,y=26,w=150,h=108;
  rr(c,x,y,w,h,6);fs(c,'#ffffff');
  c.save();rr(c,x+8,y+8,w-16,h-16,3);c.clip();
  c.fillStyle='#bfe6fb';c.fillRect(x,y,w,h);
  c.beginPath();c.moveTo(x,y+80);c.lineTo(x+40,y+30);c.lineTo(x+75,y+70);c.lineTo(x+110,y+22);c.lineTo(x+w,y+70);c.lineTo(x+w,y+h);c.lineTo(x,y+h);c.closePath();c.fillStyle='#8fa3b8';c.fill();
  [[x+40,y+30],[x+110,y+22]].forEach(([a,b])=>{c.beginPath();c.moveTo(a-10,b+12);c.lineTo(a,b);c.lineTo(a+10,b+12);c.closePath();c.fillStyle='#fff';c.fill();});
  c.fillStyle='#e8f6ff';c.fillRect(x+104,y+40,9,46);
  c.fillStyle='#7cc464';c.fillRect(x,y+84,w,30);
  c.restore();
  c.strokeStyle='#fff';c.lineWidth=6;c.beginPath();c.moveTo(x+w/2,y+6);c.lineTo(x+w/2,y+h-6);c.moveTo(x+6,y+h/2);c.lineTo(x+w-6,y+h/2);c.stroke();
  rr(c,x,y,w,h,6);c.lineWidth=3;c.strokeStyle=OL;c.stroke();
  c.beginPath();c.moveTo(404,18);c.lineTo(606,18);c.strokeStyle='#8a5230';c.lineWidth=6;c.stroke();
  [[410,448],[562,600]].forEach(([a,b])=>{c.beginPath();c.moveTo(a,16);c.lineTo(b,16);c.lineTo(b-4,78);c.quadraticCurveTo((a+b)/2,96,b-2,146);c.lineTo(a,146);c.closePath();fs(c,'#e98b7a');
    c.strokeStyle='#d0705f';c.lineWidth=2;for(let k=a+8;k<b-6;k+=9){c.beginPath();c.moveTo(k,20);c.lineTo(k,140);c.stroke();}});
}
function drawWall(c){
  c.fillStyle='#f4e3c3';c.fillRect(0,0,WW,160);
  c.fillStyle='#ecd6ae';for(let x=0;x<WW;x+=36)c.fillRect(x,0,12,160);
  drawWindow(c);
  rr(c,640,42,74,60,4);fs(c,'#d9a73a');rr(c,648,50,58,44,2);c.fillStyle='#fff8ea';c.fill();daisy(c,677,72,12);
  C(c,370,80,20);fs(c,'#fffaf0');c.strokeStyle=OL;c.lineWidth=2;for(let i=0;i<12;i++){const a=i/12*TAU;c.beginPath();c.moveTo(370+Math.cos(a)*15,80+Math.sin(a)*15);c.lineTo(370+Math.cos(a)*17,80+Math.sin(a)*17);c.stroke();}
  c.lineWidth=2.5;c.beginPath();c.moveTo(370,80);c.lineTo(370,68);c.moveTo(370,80);c.lineTo(379,84);c.stroke();
  rr(c,950,28,96,128,6);fs(c,'#9a5b3a');rr(c,962,40,72,46,4);fs(c,'#ad6a45',2);rr(c,962,96,72,46,4);fs(c,'#ad6a45',2);C(c,1032,96,4.5);fs(c,'#ffc93d',2);
  rr(c,-4,150,WW+8,16,3);fs(c,'#a8693f');
}
function drawFloor(c){
  c.fillStyle='#d9a66b';c.fillRect(0,160,WW,WH-160);
  c.strokeStyle='#c79157';c.lineWidth=2;
  for(let y=166,r=0;y<WH;y+=30,r++){c.beginPath();c.moveTo(0,y);c.lineTo(WW,y);c.stroke();
    for(let x=(r%2)*70;x<WW;x+=140){c.beginPath();c.moveTo(x,y);c.lineTo(x,y+30);c.stroke();}}
  rr(c,0,150,30,WH,0);fs(c,'#ecd8b2');rr(c,WW-30,150,30,WH,0);fs(c,'#ecd8b2');
  rr(c,150,455,380,195,20);fs(c,'#e98b7a');rr(c,166,471,348,163,14);c.fillStyle='#f6c9a2';c.fill();rr(c,184,489,312,127,10);c.fillStyle='#e98b7a';c.fill();
  c.beginPath();c.moveTo(340,500);c.lineTo(420,552);c.lineTo(340,604);c.lineTo(260,552);c.closePath();c.fillStyle='#f6c9a2';c.fill();
  c.beginPath();c.moveTo(340,528);c.lineTo(378,552);c.lineTo(340,576);c.lineTo(302,552);c.closePath();c.fillStyle='#ffc93d';c.fill();
  c.strokeStyle='#f6c9a2';c.lineWidth=3;for(let y=470;y<640;y+=12){[[150,140],[530,540]].forEach(([a,b])=>{c.beginPath();c.moveTo(a,y);c.lineTo(b,y);c.stroke();});}
}
function drawLibreria(c){
  const x=70,y=24,w=240,h=206;
  shadowAt(c,x+w/2,y+h+2,w/2,10);
  rr(c,x,y,w,h,6);fs(c,'#9a6239');rr(c,x+10,y+12,w-20,h-30,3);c.fillStyle='#6f4127';c.fill();
  const rh=(h-30)/3;
  for(let r=0;r<3;r++){const by=y+12+(r+1)*rh;let bx=x+14,k=r*7+3;
    while(bx<x+w-30){const bw=10+(k*37)%9,bh=34+(k*53)%16;rr(c,bx,by-bh-3,bw,bh,2);fs(c,BOOKS[k%BOOKS.length],1.8);
      c.beginPath();c.moveTo(bx+2,by-bh+5);c.lineTo(bx+bw-2,by-bh+5);c.strokeStyle='rgba(255,255,255,.6)';c.lineWidth=2;c.stroke();bx+=bw+2;k++;}
    rr(c,x+8,by-3,w-16,7,2);fs(c,'#b0743f',2);}
  rr(c,x-6,y-6,w+12,12,4);fs(c,'#b0743f');
}
function drawVetrinetta(c){
  const x=750,y=14,w=160,h=216;
  shadowAt(c,x+w/2,y+h+2,w/2,10);
  rr(c,x+8,y+h-8,12,12,2);fs(c,'#5a341d',2);rr(c,x+w-20,y+h-8,12,12,2);fs(c,'#5a341d',2);
  rr(c,x,y,w,h-6,6);fs(c,'#7a4a2a');
  [[x+12],[x+84]].forEach(([dx])=>{rr(c,dx,y+16,64,120,4);c.fillStyle='#e9f5f9';c.fill();
    [[y+60],[y+100]].forEach(([sy])=>{c.fillStyle='#c9b08f';c.fillRect(dx,sy,64,4);});
    [dx+16,dx+44].forEach(px=>{E(c,px,y+50,11,9);fs(c,'#fff',1.8);E(c,px,y+50,6,5);c.strokeStyle='#4f8fd8';c.lineWidth=2;c.stroke();});
    [dx+16,dx+44].forEach(px=>{rr(c,px-8,y+80,16,18,3);fs(c,'#fff',1.8);c.fillStyle='#4f8fd8';c.fillRect(px-8,y+86,16,3);c.beginPath();c.arc(px+9,y+88,4,-1.4,1.4);c.strokeStyle=OL;c.lineWidth=1.6;c.stroke();});
    E(c,dx+32,y+124,18,8);fs(c,'#f6e1b8',1.8);
    rr(c,dx,y+16,64,120,4);c.fillStyle='rgba(190,225,240,.28)';c.fill();c.lineWidth=2.5;c.strokeStyle=OL;c.stroke();
    c.beginPath();c.moveTo(dx+10,y+40);c.lineTo(dx+26,y+24);c.moveTo(dx+12,y+58);c.lineTo(dx+38,y+30);c.strokeStyle='rgba(255,255,255,.8)';c.lineWidth=2.5;c.stroke();});
  rr(c,x+12,y+146,136,56,4);fs(c,'#8a5532',2.5);c.beginPath();c.moveTo(x+12,y+174);c.lineTo(x+148,y+174);c.stroke();
  C(c,x+80,y+160,4);fs(c,'#ffc93d',2);C(c,x+80,y+188,4);fs(c,'#ffc93d',2);
  rr(c,x-6,y-6,w+12,12,4);fs(c,'#8f5a33');
}
function drawSofa(c){
  const x=100,y=280;
  shadowAt(c,x+150,y+144,160,12);
  rr(c,x+30,y+132,10,10,2);fs(c,'#5a341d',2);rr(c,x+260,y+132,10,10,2);fs(c,'#5a341d',2);
  rr(c,x+14,y,272,64,24);fs(c,'#7fb8e6');
  [[x+80],[x+150],[x+220]].forEach(([bx])=>{C(c,bx,y+26,3);c.fillStyle='#5f97c7';c.fill();});
  c.save();c.translate(x+64,y+44);c.rotate(-.15);rr(c,-24,-20,48,40,12);fs(c,'#ffc93d');C(c,0,0,5);c.fillStyle='#ff9a3d';c.fill();c.restore();
  c.save();c.translate(x+236,y+44);c.rotate(.15);rr(c,-24,-20,48,40,12);fs(c,'#f28cb0');c.restore();
  rr(c,x+24,y+52,252,72,14);fs(c,'#8cc4ee');
  c.beginPath();c.moveTo(x+150,y+56);c.lineTo(x+150,y+118);c.strokeStyle='#6ea6d4';c.lineWidth=3;c.stroke();
  rr(c,x+24,y+112,252,26,8);fs(c,'#5f97c7');
  rr(c,x,y+30,44,110,18);fs(c,'#6aa5d6');rr(c,x+256,y+30,44,110,18);fs(c,'#6aa5d6');
}
function drawTable(c){
  const x=708,y=412,w=224,h=112;
  shadowAt(c,TABLE.x,y+h+34,124,12);
  rr(c,x+10,y+h,14,36,3);fs(c,'#8a5230',2.5);rr(c,x+w-24,y+h,14,36,3);fs(c,'#8a5230',2.5);
  rr(c,x,y,w,h,10);fs(c,'#b5784a');
  c.strokeStyle='#a3683c';c.lineWidth=2;[[30],[58],[84]].forEach(([dy])=>{c.beginPath();c.moveTo(x+14,y+dy);c.bezierCurveTo(x+70,y+dy-6,x+150,y+dy+6,x+w-14,y+dy);c.stroke();});
  rr(c,x,y+h-8,w,20,6);fs(c,'#94592f');
  if(S.merenda){
    [[750,446],[890,446],[760,500],[880,500]].forEach(([a,b])=>{E(c,a,b,14,5);fs(c,'#fff',1.8);rr(c,a-8,b-16,16,14,4);fs(c,'#fff',1.8);c.fillStyle='#4f8fd8';c.fillRect(a-8,b-12,16,3);});
    E(c,820,500,32,10);fs(c,'#fff',2);[[-16,-2],[-4,-4],[8,-2],[18,0],[0,3],[-10,2]].forEach(([a,b])=>{C(c,820+a,500+b-4,6);fs(c,'#d79a52',1.6);C(c,820+a-1,500+b-5,1.2);c.fillStyle='#8a5230';c.fill();});
    c.beginPath();c.moveTo(840,452);c.quadraticCurveTo(858,450,860,434);c.strokeStyle=OL;c.lineWidth=8;c.stroke();c.strokeStyle='#fff';c.lineWidth=4;c.stroke();
    c.beginPath();c.arc(798,452,9,Math.PI*.5,Math.PI*1.5);c.strokeStyle=OL;c.lineWidth=7;c.stroke();c.strokeStyle='#fff';c.lineWidth=3;c.stroke();
    E(c,820,456,22,17);fs(c,'#fdfdfd');c.fillStyle='#4f8fd8';c.fillRect(800,452,40,4);E(c,820,440,11,4);fs(c,'#fdfdfd',2);C(c,820,435,3.5);fs(c,'#4f8fd8',2);
  }
}
function drawChair(c,x,y,front){
  const leg=()=>{rr(c,x-20,y+6,7,18,2);fs(c,'#8a5230',2);rr(c,x+13,y+6,7,18,2);fs(c,'#8a5230',2);};
  if(!front){rr(c,x-24,y-50,48,40,8);fs(c,'#a86f43');c.strokeStyle='#8a5230';c.lineWidth=3;[-8,0,8].forEach(d=>{c.beginPath();c.moveTo(x+d,y-44);c.lineTo(x+d,y-16);c.stroke();});leg();rr(c,x-24,y-12,48,22,6);fs(c,'#b5784a');}
  else{leg();rr(c,x-24,y-14,48,22,6);fs(c,'#b5784a');rr(c,x-24,y+4,48,30,8);fs(c,'#a86f43');c.strokeStyle='#8a5230';c.lineWidth=3;[-8,0,8].forEach(d=>{c.beginPath();c.moveTo(x+d,y+10);c.lineTo(x+d,y+28);c.stroke();});}
}
function drawPlant(c){
  const x=1015,y=690;
  shadowAt(c,x,y,30,8);
  [[-1.2,'#4caf50'],[-.6,'#5fbf5a'],[0,'#4caf50'],[.6,'#5fbf5a'],[1.2,'#4caf50'],[-.3,'#6fcf5a'],[.3,'#6fcf5a']].forEach(([a,col])=>{
    c.save();c.translate(x,y-40);c.rotate(a);E(c,0,-36,14,32);fs(c,col,2.5);c.beginPath();c.moveTo(0,-8);c.lineTo(0,-62);c.strokeStyle='rgba(59,42,53,.4)';c.lineWidth=2;c.stroke();c.restore();});
  c.beginPath();c.moveTo(x-24,y-40);c.lineTo(x+24,y-40);c.lineTo(x+17,y);c.lineTo(x-17,y);c.closePath();fs(c,'#d8794a');
  rr(c,x-27,y-46,54,10,3);fs(c,'#e88a58');
}
function drawBasket(c){
  const x=78,y=530;
  shadowAt(c,x,y,34,8);
  if(!S.ball.on){C(c,x-10,y-30,11);fs(c,'#e5533d',2.2);c.beginPath();c.arc(x-10,y-30,7,.4,2.6);c.strokeStyle='#b83a2a';c.lineWidth=1.6;c.stroke();}
  C(c,x+11,y-31,10);fs(c,'#6a8ff0',2.2);C(c,x+1,y-40,9);fs(c,'#ffc93d',2.2);
  c.beginPath();c.moveTo(x-4,y-34);c.lineTo(x+22,y-62);c.moveTo(x+4,y-34);c.lineTo(x+28,y-56);c.strokeStyle='#8a5230';c.lineWidth=3;c.stroke();
  rr(c,x-30,y-28,60,28,10);fs(c,'#c9a06a');
  c.strokeStyle='#a87f4a';c.lineWidth=2;for(let i=-22;i<26;i+=8){c.beginPath();c.moveTo(x+i,y-26);c.lineTo(x+i+4,y-2);c.stroke();}
  c.beginPath();c.moveTo(x-28,y-14);c.lineTo(x+28,y-14);c.stroke();
}
function drawBall(c,b){
  shadowAt(c,b.x,b.y,13,4);
  c.beginPath();c.moveTo(b.x,b.y-4);c.quadraticCurveTo(b.x-b.vx*.12,b.y+6,b.x-b.vx*.22,b.y-b.vy*.22+2);c.strokeStyle='#e5533d';c.lineWidth=2.5;c.stroke();
  C(c,b.x,b.y-12,12);fs(c,'#e5533d',2.5);
  c.save();c.translate(b.x,b.y-12);c.rotate(b.rot);c.strokeStyle='#b83a2a';c.lineWidth=1.8;
  [[-.6,6],[0,9],[.6,6]].forEach(([a,r])=>{c.beginPath();c.arc(0,0,r,a,a+2.2);c.stroke();});c.restore();
}
function drawGlassesIcon(c,x,y){c.save();c.translate(x,y);c.scale(1.4,1.4);specs(c,0,'#d9534f');c.restore();}
function drawRemote(c,x,y){rr(c,x-7,y-16,14,32,5);fs(c,'#2f2f38',2.5);C(c,x,y-9,3);c.fillStyle='#e5533d';c.fill();[[-3,0],[3,0],[-3,6],[3,6]].forEach(([a,b])=>{C(c,x+a,y+b,1.8);c.fillStyle='#cfd3e0';c.fill();});}

function talkLuisa(){
  const s=S.state;
  if(s==0)openDialog('luisa',['CIAO PIUMI!','NON TROVO I MIEI OCCHIALI.','MI AIUTI A CERCARLI?'],()=>setState(1));
  else if(s==1)openDialog('luisa',['CERCA BENE, PIUMI!']);
  else if(s==2)openDialog('luisa',['I MIEI OCCHIALI!','GRAZIE PIUMI! ORA CI VEDO.','VAI DAL NONNO GIAN.'],()=>{S.carry=null;S.luisaGlasses=true;sfx.pick();burst(S.npc.luisa.x,S.npc.luisa.y-110,24,['#ff6fa8','#fff','#ffc93d']);setState(3);});
  else if(s==3)openDialog('luisa',['VAI DAL NONNO GIAN.']);
  else if(s<6)openDialog('luisa',['BRAVA PIUMI!']);
  else if(s<8)openDialog('luisa',['GIOCA CON MARGHERITA!']);
  else openDialog('luisa',['VIENI AL TAVOLO!']);
}
function talkGian(){
  const s=S.state;
  if(s==0)openDialog('gian',['CIAO PIUMI!','VAI DALLA NONNA LUISA.']);
  else if(s==1){
    if(S.searched>=2)openDialog('gian',['COSA CERCHI, PIUMI?','GLI OCCHIALI?','OH! SONO SULLA MIA TESTA!'],()=>{S.gianHead=false;S.carry='occhiali';sfx.pick();floatText(S.p.x,S.p.y-90,'GLI OCCHIALI!','#ffc93d');setState(2);});
    else openDialog('gian',['CIAO PIUMI!','CERCA BENE!']);}
  else if(s==2)openDialog('gian',['PORTA GLI OCCHIALI ALLA NONNA!']);
  else if(s==3)openDialog('gian',['CIAO PIUMI!','NON TROVO IL TELECOMANDO.','CERCA SOTTO IL DIVANO!'],()=>setState(4));
  else if(s==4)openDialog('gian',['CERCA SOTTO IL DIVANO!']);
  else if(s==5)openDialog('gian',['IL TELECOMANDO! BRAVA PIUMI!','MARGHERITA VUOLE GIOCARE.'],()=>{S.carry=null;sfx.pick();setState(6);});
  else if(s<8)openDialog('gian',['VAI DA MARGHERITA!']);
  else openDialog('gian',['TUTTI A MERENDA!']);
}
function talkGirl(){
  const s=S.state;
  if(s<6)openDialog('girl',['CIAO PIUMI!','AIUTA I NONNI!']);
  else if(s==6)openDialog('girl',['PIUMI! GIOCHIAMO?','PRENDI IL GOMITOLO!'],()=>{const b=S.ball;b.on=true;b.x=S.npc.girl.x+46;b.y=S.npc.girl.y+12;b.vx=b.vy=0;setState(7);});
  else if(s==7)openDialog('girl',['PRENDI IL GOMITOLO!']);
  else openDialog('girl',['ANDIAMO A MERENDA!']);
}
function merenda(){
  openDialog('luisa',['ECCO TÈ E BISCOTTI!','GRAZIE PIUMI!'],()=>{
    S.merenda=true;S.npc.gian={x:676,y:470};S.npc.luisa={x:968,y:470};S.npc.girl={x:820,y:404};
    setState(9);sfx.win();confetti(TABLE.x,TABLE.y-90);floatText(TABLE.x,TABLE.y-130,'MERENDA!','#ffc93d');
    finish('Che bella merenda dai nonni!',2.6);});
}
function wallBlocked(x,y){
  if(x<50||x>WW-50||y<200||y>WH-45)return true;
  if(x>70&&x<310&&y<234)return true;
  if(x>750&&x<910&&y<234)return true;
  if(x>100&&x<400&&y>280&&y<422)return true;
  if(x>706&&x<934&&y>410&&y<558)return true;
  for(const [cx,cy,front] of CHAIRS){if(Math.abs(x-cx)<26&&(front?(y>556&&y<606):(y>360&&y<422)))return true;}
  if(Math.hypot(x-1015,y-690)<34||Math.hypot(x-78,y-530)<32)return true;
  return false;
}

LEVELS.push({
  name:'A casa dei nonni',ww:WW,wh:WH,bg:'#c58a55',party:['piumi','maci'],locked:true,music:'audio/stage2.mp3',
  start:{p:{x:560,y:380},q:{x:520,y:400}},
  quests:['VAI DA NONNA LUISA','TROVA GLI OCCHIALI DELLA NONNA','PORTA GLI OCCHIALI ALLA NONNA','VAI DA NONNO GIAN','CERCA SOTTO IL DIVANO','PORTA IL TELECOMANDO AL NONNO','VAI DA MARGHERITA','PRENDI IL GOMITOLO','TUTTI A MERENDA!','MERENDA!'],
  fresh:()=>({searched:0,spots:SPOTS.map(s=>({...s,done:false})),luisaGlasses:false,gianHead:true,carry:null,merenda:false,
    ball:{x:0,y:0,vx:0,vy:0,rot:0,on:false},npc:{luisa:{x:640,y:300},girl:{x:470,y:560},gian:{x:205,y:398}}}),
  blocked(x,y){
    if(wallBlocked(x,y))return true;
    const n=S.npc;return Math.hypot(x-n.luisa.x,y-n.luisa.y)<26||Math.hypot(x-n.girl.x,y-n.girl.y)<22;
  },
  update(dt){
    const p=S.p,s=S.state;
    if(s==1)S.spots.forEach((sp,i)=>{if(sp.done||Math.hypot(sp.x-p.x,sp.y-p.y)>50)return;sp.done=true;S.searched++;sfx.pop();floatText(sp.x,sp.y-70,sp.w);});
    if(s==4&&Math.hypot(SOFA_SPOT.x-p.x,SOFA_SPOT.y-p.y)<46){S.carry='telecomando';sfx.pick();burst(SOFA_SPOT.x,SOFA_SPOT.y-10,24,['#fff','#ffe14d','#6a8ff0']);floatText(SOFA_SPOT.x,SOFA_SPOT.y-70,'IL TELECOMANDO!','#ffc93d');setState(5);}
    if(s==7){const b=S.ball,d=Math.hypot(b.x-p.x,b.y-p.y)||1;let tvx=b.vx*.92,tvy=b.vy*.92;
      if(d<200){const ax=(b.x-p.x)/d,ay=(b.y-p.y)/d,w=Math.sin(T*2.3)*.7;tvx=(ax-ay*w)*130;tvy=(ay+ax*w)*130;}
      const k=Math.min(1,dt*4);b.vx+=(tvx-b.vx)*k;b.vy+=(tvy-b.vy)*k;
      const nx=b.x+b.vx*dt,ny=b.y+b.vy*dt;
      if(this.blocked(nx,b.y))b.vx*=-.9;else b.x=nx;
      if(this.blocked(b.x,ny))b.vy*=-.9;else b.y=ny;
      b.rot+=Math.hypot(b.vx,b.vy)*dt/12;
      if(d<32){b.on=false;sfx.pick();burst(b.x,b.y-12,26,['#e5533d','#fff','#ffc93d']);floatText(b.x,b.y-60,'PRESO!','#ffc93d');setState(8);
        say('TUTTI A MERENDA!','luisa');floatText(S.npc.luisa.x,S.npc.luisa.y-150,'TUTTI A MERENDA!','#ffe9a8');}}
    proximity('luisa',S.npc.luisa.x,S.npc.luisa.y,talkLuisa);
    proximity('gian',GIAN_TALK.x,GIAN_TALK.y,talkGian,75);
    proximity('girl',S.npc.girl.x,S.npc.girl.y,talkGirl);
    if(s==8)proximity('table',TABLE.x,TABLE.y,merenda,150);
  },
  guide(){
    const s=S.state,n=S.npc;
    if(s==0||s==2)return{x:n.luisa.x,y:n.luisa.y-150};
    if(s==1)return S.searched>=2?{x:GIAN_TALK.x,y:270}:nearest(S.spots.filter(sp=>!sp.done),40);
    if(s==3||s==5)return{x:GIAN_TALK.x,y:270};
    if(s==4)return{x:SOFA_SPOT.x,y:SOFA_SPOT.y-40};
    if(s==6)return{x:n.girl.x,y:n.girl.y-150};
    if(s==7)return{x:S.ball.x,y:S.ball.y-40};
    if(s==8)return{x:TABLE.x,y:TABLE.y-90};
    return null;
  },
  carry(c,x,y){if(!S.carry)return;const b=RM?0:Math.sin(T*5)*3;if(S.carry=='occhiali')drawGlassesIcon(c,x+6,y-82-b);else drawRemote(c,x+6,y-88-b);},
  drawBack(c){drawFloor(c);drawWall(c);},
  ents(c,ents){
    const n=S.npc;
    ents.push([234,()=>drawLibreria(c)]);
    ents.push([234,()=>drawVetrinetta(c)]);
    ents.push([422,()=>drawSofa(c)]);
    if(!S.merenda)ents.push([423,()=>drawPerson(c,n.gian.x,n.gian.y,{kind:'gian',sit:true,headGlasses:S.gianHead,t:T,wave:S.state==3})]);
    else ents.push([n.gian.y,()=>drawPerson(c,n.gian.x,n.gian.y,{kind:'gian',t:T,wave:true})]);
    CHAIRS.forEach(([x,y,front])=>ents.push([front?606:400,()=>drawChair(c,x,y,front)]));
    ents.push([558,()=>drawTable(c)]);
    ents.push([690,()=>drawPlant(c)]);
    ents.push([530,()=>drawBasket(c)]);
    ents.push([n.luisa.y,()=>drawPerson(c,n.luisa.x,n.luisa.y,{kind:'luisa',glasses:S.luisaGlasses,t:T,wave:S.state==0||S.state>=8})]);
    ents.push([n.girl.y,()=>drawGirl(c,n.girl.x,n.girl.y,{t:T,wave:S.state==6||S.state>=8})]);
    if(S.ball.on)ents.push([S.ball.y,()=>drawBall(c,S.ball)]);
  },
  drawFront(c){
    rr(c,-4,WH-30,WW+8,34,0);fs(c,'#c58a55');
    if(S.state==1)S.spots.forEach((sp,i)=>{if(!sp.done)sparkle(c,sp.x+18,sp.y-40,i*.37);});
    if(S.state==4)sparkle(c,SOFA_SPOT.x+20,SOFA_SPOT.y-30,0);
  }
});
})();
