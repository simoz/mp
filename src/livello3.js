/* ===== Livello 3: in montagna dai nonni ===== */
(()=>{
const WW=1200,WH=900;
const sx=y=>640+Math.sin(y/90)*24;  /* centro del ruscello */
const BRIDGE={y1:536,y2:590};
const CHALET={x:100,y:200,w:300,h:160};
const TABLE={x:330,y:640};
const BENCH={x:1000,y:540},GIANCO_TALK={x:1000,y:590};
const BERRY_POS=[[130,540],[520,800],[1090,770]];
const PINES=[[470,300],[545,330],[56,660],[250,860],[790,300],[1150,470],[1150,650],[830,860],[1000,872]];
const COWS=[[960,330,1,0],[1100,312,-1,2]];
const tufts=[],flowers=[];
for(let i=0;i<360;i++){const x=R()*WW,y=262+R()*(WH-262);if(Math.abs(x-sx(y))>56)tufts.push([x,y]);}
for(let i=0;i<80;i++){const x=50+R()*(WW-100),y=290+R()*(WH-330);
  if(Math.abs(x-sx(y))<62||(x<420&&y<390)||(x>860&&y<380)||(x>230&&x<430&&y>570&&y<700))continue;
  if(BERRY_POS.some(([a,b])=>Math.hypot(a-x,b-y)<50))continue;
  flowers.push([x,y,i%3]);}
const berrySVG=on=>`<svg viewBox="0 0 26 26" aria-hidden="true"><circle cx="13" cy="14" r="9" fill="${on?'#4a4fb8':'#e4d6b8'}" stroke="#3b2a35" stroke-width="1.6"/><path d="M10 6.5l3 3 3-3" fill="none" stroke="#3b2a35" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="11.5" r="2" fill="${on?'#b9c0ff':'#f3ead6'}"/></svg>`;

function sparkle(c,x,y,k){if(RM)return;const s=((T*1.6+k)%1.4);if(s>1)return;const r=Math.sin(s*Math.PI)*8;
  c.beginPath();c.moveTo(x,y-r);c.lineTo(x+r*.3,y);c.lineTo(x,y+r);c.lineTo(x-r*.3,y);c.closePath();c.moveTo(x-r,y);c.lineTo(x,y-r*.3);c.lineTo(x+r,y);c.lineTo(x,y+r*.3);c.closePath();
  c.fillStyle='#fff7b0';c.fill();}
function mountain(c,x,y,w,h,col){
  c.beginPath();c.moveTo(x-w/2,y);c.lineTo(x,y-h);c.lineTo(x+w/2,y);c.closePath();fs(c,col);
  c.beginPath();c.moveTo(x,y-h);c.lineTo(x-w*.16,y-h*.68);c.lineTo(x-w*.07,y-h*.74);c.lineTo(x,y-h*.65);c.lineTo(x+w*.08,y-h*.75);c.lineTo(x+w*.16,y-h*.68);c.closePath();fs(c,'#ffffff',2.5);
}
function drawSky(c){
  const g=c.createLinearGradient(0,0,0,260);g.addColorStop(0,'#8fd0f5');g.addColorStop(1,'#dcf2fb');c.fillStyle=g;c.fillRect(0,0,WW,262);
  [[180,60],[700,42],[1020,90]].forEach(([x,y])=>{const cx=(x+(RM?0:T*8))%(WW+160)-80;c.fillStyle='#fff';C(c,cx,y,18);c.fill();C(c,cx+22,y-9,23);c.fill();C(c,cx+46,y,18);c.fill();});
  mountain(c,180,250,440,170,'#a9bdd6');mountain(c,880,250,480,190,'#a9bdd6');
  mountain(c,520,250,500,225,'#8ea6c4');mountain(c,1150,250,420,165,'#8ea6c4');
}
const hw=y=>y<300?14+(y-248)*26/52:40;  /* il ruscello si allarga scendendo */
function drawWaterfall(c){
  const x=sx(248);
  c.beginPath();c.moveTo(x-6,156);c.lineTo(x+6,156);c.lineTo(x+11,252);c.lineTo(x-11,252);c.closePath();fs(c,'#8fd6f5',2.5);
  c.strokeStyle='#fff';c.lineWidth=2.5;
  for(let i=0;i<5;i++){const y=162+((i*23+(RM?0:T*70))%80);c.beginPath();c.moveTo(x-4+(i%2)*7,y);c.lineTo(x-4+(i%2)*7,y+12);c.stroke();}
  [[-11,158,9,6],[10,160,8,5]].forEach(([d,y,rx,ry])=>{E(c,x+d,y,rx,ry);fs(c,'#b9b3a8',2.2);});
}
function drawStream(c){
  c.beginPath();for(let y=248;y<=WH;y+=13)c.lineTo(sx(y)-hw(y),y);for(let y=WH;y>=248;y-=13)c.lineTo(sx(y)+hw(y),y);c.closePath();
  c.fillStyle='#4fb6e0';c.fill();c.lineWidth=3;c.strokeStyle=OL;c.stroke();
  c.beginPath();for(let y=252;y<=WH;y+=13)c.lineTo(sx(y)-hw(y)*.55,y);for(let y=WH;y>=252;y-=13)c.lineTo(sx(y)+hw(y)*.45,y);c.closePath();c.fillStyle='#74cbee';c.fill();
  c.strokeStyle='#e6f7ff';c.lineWidth=2.5;
  for(let i=0;i<16;i++){const y=290+((i*53+(RM?0:T*40))%(WH-290)),x=sx(y)+((i*17)%30-15);c.beginPath();c.moveTo(x-7,y);c.quadraticCurveTo(x,y-5,x+7,y);c.stroke();}
  const x0=sx(250);
  c.fillStyle='#fff';[[-8,262,6],[0,266,7],[8,262,6],[-3,274,4],[5,276,4]].forEach(([d,y,r])=>{C(c,x0+d+(RM?0:Math.sin(T*6+d)*1.5),y,r);c.fill();});
  [[-26,252,14,9],[24,254,13,8],[-38,264,9,6]].forEach(([d,y,rx,ry])=>{E(c,x0+d,y,rx,ry);fs(c,'#b9b3a8',2.5);});
  [[330,-1],[430,1],[700,-1],[820,1],[380,1],[760,-1]].forEach(([y,d])=>{E(c,sx(y)+d*43,y,9,5);fs(c,'#b9b3a8',2.2);});
}
function drawHills(c){
  c.beginPath();c.moveTo(0,262);
  for(let x=0;x<=WW;x+=40)c.lineTo(x,240+Math.sin(x/130)*12+Math.sin(x/47)*4);
  c.lineTo(WW,262);c.closePath();fs(c,'#7cc464');
}
function drawFlower(c,x,y,k){
  if(k==0){for(let i=0;i<6;i++){const a=i/6*TAU;E(c,x+Math.cos(a)*4,y+Math.sin(a)*4,3.6,1.8,a);c.fillStyle='#fffdf2';c.fill();}C(c,x,y,2);c.fillStyle='#e8d36a';c.fill();}
  else if(k==1){c.beginPath();c.moveTo(x-5,y-6);c.lineTo(x-3,y+2);c.lineTo(x+3,y+2);c.lineTo(x+5,y-6);c.lineTo(x+2,y-3);c.lineTo(x,y-7);c.lineTo(x-2,y-3);c.closePath();c.fillStyle='#3f63d8';c.fill();}
  else{for(let k2=0;k2<5;k2++){const a=k2/5*TAU;C(c,x+Math.cos(a)*3.4,y+Math.sin(a)*3.4,2.8);c.fillStyle='#ffd23d';c.fill();}C(c,x,y,1.8);c.fillStyle='#ff9a3d';c.fill();}
}
function drawChalet(c){
  const {x,y,w,h}=CHALET,cx=x+w/2;
  shadowAt(c,cx,y+h+4,w/2+24,12);
  const chx=x+w-92;
  for(let i=0;i<3;i++){const k=RM?i/3:((T*.35+i/3)%1);C(c,chx+13+Math.sin(k*5+i)*8,y-66-k*90,8+k*12);c.fillStyle=`rgba(255,255,255,${(1-k)*.75})`;c.fill();}
  rr(c,chx,y-62,26,70,3);fs(c,'#a7a39b');rr(c,chx-4,y-68,34,10,3);fs(c,'#8f8b84');
  c.beginPath();c.moveTo(x+8,y+32);c.lineTo(cx,y-44);c.lineTo(x+w-8,y+32);c.closePath();fs(c,'#c48a55');
  c.strokeStyle='#a86f43';c.lineWidth=2;for(let k=x+30;k<x+w-20;k+=18){const top=y+32-Math.max(0,76-Math.abs(k-cx)*76/(w/2-8));c.beginPath();c.moveTo(k,y+30);c.lineTo(k,top+4);c.stroke();}
  c.beginPath();c.moveTo(cx-14,y+4);c.lineTo(cx-14,y-6);c.arc(cx,y-6,14,Math.PI,0);c.lineTo(cx+14,y+4);c.closePath();fs(c,'#8fd3f0',2.5);
  rr(c,x+6,y+26,w-12,h-56,2);fs(c,'#a8693f');
  c.strokeStyle='#8a5230';c.lineWidth=2.5;for(let ly=y+40;ly<y+h-32;ly+=14){c.beginPath();c.moveTo(x+8,ly);c.lineTo(x+w-8,ly);c.stroke();}
  rr(c,x,y+h-34,w,34,4);fs(c,'#b9b3a8');
  c.strokeStyle='#9a958b';c.lineWidth=2;[[x+20,y+h-22],[x+70,y+h-14],[x+200,y+h-24],[x+250,y+h-12],[x+120,y+h-26]].forEach(([a,b])=>{E(c,a,b,14,6);c.stroke();});
  c.beginPath();c.moveTo(x-36,y+40);c.lineTo(cx,y-74);c.lineTo(x+w+36,y+40);c.lineTo(x+w+22,y+50);c.lineTo(cx,y-52);c.lineTo(x-22,y+50);c.closePath();fs(c,'#6b3d22');
  [[x+30],[x+w-76]].forEach(([wx])=>{
    rr(c,wx-14,y+50,14,44,3);fs(c,'#4f8a3a',2.2);rr(c,wx+46,y+50,14,44,3);fs(c,'#4f8a3a',2.2);
    rr(c,wx,y+50,46,44,4);fs(c,'#8fd3f0');c.beginPath();c.moveTo(wx+23,y+50);c.lineTo(wx+23,y+94);c.moveTo(wx,y+72);c.lineTo(wx+46,y+72);c.lineWidth=2.5;c.stroke();
    rr(c,wx-6,y+96,58,12,3);fs(c,'#8a5230');[6,18,30,42,52].forEach((d,i)=>{C(c,wx-4+d,y+93,5.5);fs(c,i%2?'#ff6fa8':'#e5533d',1.6);});
  });
  rr(c,cx-24,y+h-88,48,88,6);fs(c,'#6b3d22');
  c.strokeStyle='#4f2c18';c.lineWidth=2;[cx-8,cx+8].forEach(dx=>{c.beginPath();c.moveTo(dx,y+h-84);c.lineTo(dx,y+h-4);c.stroke();});
  c.save();c.translate(cx,y+h-62);c.beginPath();c.moveTo(0,6);c.bezierCurveTo(-10,-2,-6,-10,0,-5);c.bezierCurveTo(6,-10,10,-2,0,6);c.fillStyle='#ff9cc6';c.fill();c.restore();
  C(c,cx+16,y+h-40,3.5);c.fillStyle='#ffc93d';c.fill();
}
function drawPine(c,x,y){
  shadowAt(c,x,y,32,9);rr(c,x-7,y-26,14,26,3);fs(c,'#7a4a2a');
  [[-24,42,46],[-56,34,42],[-86,25,38]].forEach(([dy,w,h])=>{c.beginPath();c.moveTo(x-w,y+dy);c.lineTo(x,y+dy-h);c.lineTo(x+w,y+dy);c.closePath();fs(c,'#2f7d4a');
    c.beginPath();c.moveTo(x-w*.45,y+dy-4);c.lineTo(x-w*.1,y+dy-h*.7);c.lineTo(x-w*.05,y+dy-4);c.closePath();c.fillStyle='#3f9a5a';c.fill();});
}
function drawBush(c,b){
  const {x,y}=b;shadowAt(c,x,y,30,8);
  const cs=[[-16,-18,16],[14,-18,16],[0,-30,19]];
  cs.forEach(([a,d,r])=>{C(c,x+a,y+d,r);c.lineWidth=6;c.strokeStyle=OL;c.stroke();});
  cs.forEach(([a,d,r])=>{C(c,x+a,y+d,r);c.fillStyle='#3f9a48';c.fill();});
  C(c,x-6,y-38,8);c.fillStyle='#5cb85c';c.fill();
  if(!b.got)[[-18,-20],[-6,-36],[8,-26],[18,-14],[-2,-14],[12,-40],[-14,-30]].forEach(([a,d])=>{C(c,x+a,y+d,4.5);fs(c,'#4a4fb8',1.6);C(c,x+a-1.2,y+d-1.4,1.3);c.fillStyle='#b9c0ff';c.fill();});
}
function drawBerries(c,x,y){
  [[-6,-2],[0,-4],[6,-2],[-3,-8],[3,-8]].forEach(([a,b])=>{C(c,x+a,y+b,4.5);fs(c,'#4a4fb8',1.6);});
  c.beginPath();c.moveTo(x-13,y-3);c.quadraticCurveTo(x,y+14,x+13,y-3);c.closePath();fs(c,'#fff',2.4);c.fillStyle='#4f8fd8';c.fillRect(x-9,y+1,18,2.5);
}
function drawCow(c,x,y,f,k){
  c.save();c.translate(x,y);c.scale(f,1);
  shadowAt(c,0,0,42,8);
  c.beginPath();c.moveTo(-34,-50);c.quadraticCurveTo(-46,-40,-42,-20);c.strokeStyle=OL;c.lineWidth=3;c.stroke();C(c,-42,-18,4);fs(c,'#3b2a35',2);
  [-24,-12,14,26].forEach(lx=>{rr(c,lx-5,-28,10,28,3);fs(c,'#fff',2.5);rr(c,lx-5,-6,10,6,2);fs(c,'#5a4a4a',2);});
  rr(c,-38,-62,76,40,18);c.fillStyle='#fff';c.fill();
  c.save();rr(c,-38,-62,76,40,18);c.clip();E(c,-16,-50,13,10,.3);E(c,18,-32,11,8);E(c,4,-62,8,6);c.fillStyle='#3b2a35';c.fill();c.restore();
  rr(c,-38,-62,76,40,18);c.lineWidth=3;c.strokeStyle=OL;c.stroke();
  const hb=RM?0:Math.sin(T*2+k)*2;
  c.save();c.translate(0,hb);
  c.beginPath();c.moveTo(30,-78);c.lineTo(26,-90);c.lineTo(36,-80);c.moveTo(50,-78);c.lineTo(56,-90);c.lineTo(46,-80);fs(c,'#f3e3b8',2);
  E(c,22,-74,8,4,-.4);fs(c,'#fff',2.2);E(c,58,-74,8,4,.4);fs(c,'#fff',2.2);
  rr(c,26,-82,30,34,13);fs(c,'#fff');
  E(c,41,-52,16,10);fs(c,'#f6b8c4',2.5);C(c,36,-52,2);C(c,46,-52,2);c.fillStyle=OL;c.fill();
  C(c,34,-68,2.6);C(c,48,-68,2.6);c.fillStyle=OL;c.fill();
  c.restore();
  c.beginPath();c.moveTo(24,-44);c.quadraticCurveTo(32,-36,40,-42);c.strokeStyle='#8a5230';c.lineWidth=3;c.stroke();
  c.beginPath();c.moveTo(27,-40);c.lineTo(25,-30);c.lineTo(37,-30);c.lineTo(35,-40);c.closePath();fs(c,'#ffc93d',2);
  c.restore();
}
function drawFence(c){
  const y=376,x1=870,x2=WW-24;
  [y-16,y-6].forEach(dy=>{c.beginPath();c.moveTo(x1,dy);c.lineTo(x2,dy);c.strokeStyle=OL;c.lineWidth=8;c.stroke();c.strokeStyle='#d99a62';c.lineWidth=4;c.stroke();});
  for(let px=x1;px<=x2;px+=44){rr(c,px-5,y-26,10,28,3);fs(c,'#c98b55',2.5);}
}
function drawSideFence(c){
  for(let py=272;py<376;py+=26){rr(c,865,py-24,10,26,3);fs(c,'#c98b55',2.5);}
}
function drawBridge(c){
  const bx=sx(563),y1=BRIDGE.y1,y2=BRIDGE.y2;
  rr(c,bx-64,y1,128,y2-y1,6);fs(c,'#c48a55');
  c.strokeStyle='#a86f43';c.lineWidth=2;for(let k=bx-52;k<bx+60;k+=12){c.beginPath();c.moveTo(k,y1+3);c.lineTo(k,y2-3);c.stroke();}
  railing(c,bx,y1);
}
function railing(c,bx,y){
  c.beginPath();c.moveTo(bx-64,y-20);c.lineTo(bx+64,y-20);c.strokeStyle=OL;c.lineWidth=8;c.stroke();c.strokeStyle='#d99a62';c.lineWidth=4;c.stroke();
  [-60,-20,20,60].forEach(d=>{rr(c,bx+d-5,y-28,10,30,3);fs(c,'#b0743f',2.5);});
}
function drawBench(c){
  const {x,y}=BENCH;
  rr(c,x-56,y-80,10,62,3);fs(c,'#8a5230',2.5);rr(c,x+46,y-80,10,62,3);fs(c,'#8a5230',2.5);
  rr(c,x-64,y-82,128,12,4);fs(c,'#b0743f');rr(c,x-64,y-64,128,10,4);fs(c,'#b0743f');
  rr(c,x-56,y-24,10,24,3);fs(c,'#8a5230',2.5);rr(c,x+46,y-24,10,24,3);fs(c,'#8a5230',2.5);
  rr(c,x-64,y-36,128,14,4);fs(c,'#c48a55');
}
function drawPicnic(c){
  const x=240,y=598,w=180,h=56;
  shadowAt(c,TABLE.x,y+h+30,110,12);
  rr(c,x+16,y+h-4,12,32,3);fs(c,'#8a5230',2.5);rr(c,x+w-28,y+h-4,12,32,3);fs(c,'#8a5230',2.5);
  rr(c,x,y,w,h,8);fs(c,'#c98b55');
  c.save();rr(c,x+26,y+4,w-52,h-6,4);c.clip();c.fillStyle='#fff';c.fillRect(x,y,w,h);c.fillStyle='rgba(229,83,61,.55)';
  for(let k=0;k<w;k+=14){c.fillRect(x+26+k,y,7,h);}for(let k=0;k<h;k+=14){c.fillRect(x,y+4+k,w,7);}c.restore();
  rr(c,x+26,y+4,w-52,h-6,4);c.lineWidth=2;c.strokeStyle=OL;c.stroke();
  rr(c,x,y+h-6,w,14,5);fs(c,'#a86a40');
  if(S.state>=6){
    E(c,330,628,34,10);fs(c,'#fff',2.2);
    rr(c,302,596,56,28,8);fs(c,'#f2d0a0',2.5);E(c,330,598,28,8);fs(c,'#5a4fa8',2.2);
    [[-14,-1],[-4,1],[6,-2],[16,0],[0,-4],[10,3],[-10,3]].forEach(([a,b])=>{C(c,330+a,598+b,2.6);c.fillStyle='#8f86e0';c.fill();});
  }
  if(S.merenda)[[268,618],[392,618]].forEach(([a,b])=>{E(c,a,b,12,4);fs(c,'#fff',1.8);rr(c,a-7,b-15,14,13,4);fs(c,'#fff',1.8);c.fillStyle='#4f8fd8';c.fillRect(a-7,b-11,14,3);});
}
function seat(c,y){rr(c,250,y,160,14,4);fs(c,'#b0743f');rr(c,262,y+12,10,16,2);fs(c,'#8a5230',2);rr(c,388,y+12,10,16,2);fs(c,'#8a5230',2);}
function drawHat(c,h){
  const fly=S.state==4,lift=fly?(RM?22:20+Math.abs(Math.sin(T*3))*16):4;
  shadowAt(c,h.x,h.y,fly?14:18,5);
  c.save();c.translate(h.x,h.y-lift);if(fly&&!RM)c.rotate(Math.sin(T*4)*.3+h.vx*.0015);alpineHat(c,0,0,1.15);c.restore();
}
function moo(){tone(150,.45,0,'sawtooth');tone(118,.5,.3,'sawtooth');tone(1240,.25,.05,'sine');}

function wallBlocked(x,y){
  if(x<45||x>WW-45||y<272||y>WH-40)return true;
  if(x>CHALET.x-8&&x<CHALET.x+CHALET.w+8&&y<CHALET.y+CHALET.h+16)return true;
  if(x>860&&y<394)return true;
  if(Math.abs(x-sx(y))<46&&!(y>BRIDGE.y1+4&&y<BRIDGE.y2-2))return true;
  if(x>236&&x<424&&y>584&&y<692)return true;
  if(x>932&&x<1068&&y>490&&y<550)return true;
  for(const [px,py] of PINES)if(Math.hypot(x-px,y-py)<24)return true;
  for(const [bx,by] of BERRY_POS)if(Math.hypot(x-bx,y-by)<24)return true;
  return false;
}
const hatBlocked=(x,y)=>x<760||y<404||wallBlocked(x,y);

function talkLucy(){
  const s=S.state;
  if(s==0)openDialog('lucy',[`CIAO ${N()}!`,'FACCIAMO UNA TORTA DI MIRTILLI.','RACCOGLI 3 MIRTILLI!'],()=>setState(1));
  else if(s==1)openDialog('lucy',['CERCA I CESPUGLI BLU!']);
  else if(s==2)openDialog('lucy',['CHE BEI MIRTILLI!',`GRAZIE ${N()}!`,'VAI DAL NONNO GIANCO.'],()=>{sfx.pick();burst(S.npc.lucy.x,S.npc.lucy.y-110,24,['#4a4fb8','#fff','#ffc93d']);setState(3);});
  else if(s<6)openDialog('lucy',['LA TORTA È NEL FORNO.','VAI DAL NONNO GIANCO.']);
}
function talkGianco(){
  const s=S.state;
  if(s<3)openDialog('gianco',[`CIAO ${N()}!`,'VAI DALLA NONNA LUCY.']);
  else if(s==3)openDialog('gianco',[`CIAO ${N()}!`,'IL VENTO HA PRESO IL MIO CAPPELLO!','MI AIUTI A PRENDERLO?'],()=>setState(4));
  else if(s==4)openDialog('gianco',[`CORRI, ${N()}!`]);
  else if(s==5)openDialog('gianco',['IL MIO CAPPELLO!',`GRAZIE ${N()}!`,'LA TORTA È PRONTA!'],()=>{
    S.gianHat=true;sfx.pick();burst(BENCH.x,BENCH.y-130,24,['#4f7d3c','#fff','#ffc93d']);setState(6);
    const bx=sx(563),n=S.npc;
    n.gianco.path=[[bx+80,563],[bx-80,563],[452,646]];
    n.lucy.path=[[205,646]];
    n.girl.path=[[200,560],[330,566]];
    floatText(TABLE.x,TABLE.y-130,'TUTTI A MERENDA!','#ffe9a8');});
}
function talkGirl(){
  if(S.state<6)openDialog('girl',[`CIAO ${N()}!`,'AIUTA I NONNI!']);
}
function merenda(){
  openDialog('lucy',['ECCO LA TORTA DI MIRTILLI!',`${BRAV()} ${N()}!`],()=>{
    S.merenda=true;setState(7);sfx.win();confetti(TABLE.x,TABLE.y-80);floatText(TABLE.x,TABLE.y-130,'MERENDA!','#ffc93d');
    finish('Che buona la torta di mirtilli in montagna!',2.6);});
}

LEVELS.push({
  name:'In montagna dai nonni',ww:WW,wh:WH,bg:'#9ad66f',party:['maci','piumi'],music:'audio/stage3.mp3',
  start:{p:{x:480,y:440},q:{x:440,y:456}},
  quests:['VAI DA NONNA LUCY','RACCOGLI 3 MIRTILLI','PORTA I MIRTILLI ALLA NONNA','VAI DA NONNO GIANCO','PRENDI IL CAPPELLO DEL NONNO','PORTA IL CAPPELLO AL NONNO','TUTTI A MERENDA!','MERENDA!'],
  fresh:()=>({count:0,berries:BERRY_POS.map(([x,y])=>({x,y,got:false})),gianHat:false,merenda:false,
    hat:{x:900,y:720,vx:0,vy:0},
    npc:{lucy:{x:250,y:420,path:[]},gianco:{x:BENCH.x,y:BENCH.y+1,path:[]},girl:{x:170,y:745,path:[]}}}),
  progress:()=>S.state>=1&&S.state<=2?[0,1,2].map(i=>berrySVG(i<S.count)).join(''):'',
  blocked(x,y){
    if(wallBlocked(x,y))return true;
    const n=S.npc;return Math.hypot(x-n.lucy.x,y-n.lucy.y)<26||Math.hypot(x-n.girl.x,y-n.girl.y)<22||(S.state>=6&&Math.hypot(x-n.gianco.x,y-n.gianco.y)<26);
  },
  tick(dt){
    Object.values(S.npc).forEach(n=>{if(!n.path.length)return;const [tx,ty]=n.path[0],d=Math.hypot(tx-n.x,ty-n.y),st=150*dt;
      if(d<=st){n.x=tx;n.y=ty;n.path.shift();}else{n.x+=(tx-n.x)/d*st;n.y+=(ty-n.y)/d*st;}});
  },
  update(dt){
    const p=S.p,s=S.state;
    S.berries.forEach(b=>{if(b.got||Math.hypot(b.x-p.x,b.y-p.y)>48)return;
      if(s<1){if(hintCD<=0){floatText(b.x,b.y-70,'PRIMA VAI DA NONNA LUCY','#ffe9a8');hintCD=2.5;}return;}
      if(s>1)return;
      b.got=true;S.count++;sfx.pick();burst(b.x,b.y-24,22,['#4a4fb8','#8f86e0','#fff']);floatText(b.x,b.y-70,S.count+(S.count==1?' MIRTILLO!':' MIRTILLI!'));
      if(S.count>=3){floatText(p.x,p.y-90,BRAV()+'!','#ffc93d');setState(2);}else updateHUD();});
    if(s==4){const h=S.hat,d=Math.hypot(h.x-p.x,h.y-p.y)||1;let tvx=h.vx*.9,tvy=h.vy*.9;
      if(d<190){const ax=(h.x-p.x)/d,ay=(h.y-p.y)/d,w=Math.sin(T*1.9)*.8;tvx=(ax-ay*w)*125;tvy=(ay+ax*w)*125;}
      const k=Math.min(1,dt*4);h.vx+=(tvx-h.vx)*k;h.vy+=(tvy-h.vy)*k;
      const nx=h.x+h.vx*dt,ny=h.y+h.vy*dt;
      if(hatBlocked(nx,h.y))h.vx*=-.9;else h.x=nx;
      if(hatBlocked(h.x,ny))h.vy*=-.9;else h.y=ny;
      if(d<34){S.carry='cappello';sfx.pick();burst(h.x,h.y-24,24,['#4f7d3c','#fff','#ffc93d']);floatText(h.x,h.y-70,'PRESO!','#ffc93d');setState(5);}}
    if(s==6){proximity('table',TABLE.x,TABLE.y,merenda,150);return;}
    proximity('lucy',S.npc.lucy.x,S.npc.lucy.y,talkLucy);
    proximity('gianco',GIANCO_TALK.x,GIANCO_TALK.y,talkGianco,75);
    proximity('girl',S.npc.girl.x,S.npc.girl.y,talkGirl);
    proximity('cow',1000,400,()=>{moo();floatText(1000,240,'MUUU!','#fff');},60);
  },
  guide(){
    const s=S.state,n=S.npc;
    if(s==0||s==2)return{x:n.lucy.x,y:n.lucy.y-150};
    if(s==1)return nearest(S.berries.filter(b=>!b.got),70);
    if(s==3||s==5)return{x:BENCH.x,y:BENCH.y-150};
    if(s==4)return{x:S.hat.x,y:S.hat.y-60};
    if(s==6)return{x:TABLE.x,y:TABLE.y-120};
    return null;
  },
  carry(c,x,y){const b=RM?0:Math.sin(T*5)*3;if(S.state==2)drawBerries(c,x+6,y-84-b);else if(S.carry=='cappello'&&S.state==5)alpineHat(c,x+6,y-82-b,1);},
  drawBack(c){
    drawSky(c);drawWaterfall(c);
    c.fillStyle='#9ad66f';c.fillRect(0,252,WW,WH-252);
    drawHills(c);drawStream(c);
    c.strokeStyle='#7fbf55';c.lineWidth=2;tufts.forEach(([x,y])=>{c.beginPath();c.moveTo(x-4,y-5);c.lineTo(x,y);c.lineTo(x+4,y-6);c.stroke();});
    flowers.forEach(([x,y,k])=>drawFlower(c,x,y,k));
    c.beginPath();c.moveTo(250,368);c.quadraticCurveTo(300,470,480,470);c.quadraticCurveTo(560,470,sx(563)-60,563);c.strokeStyle='#d8c08a';c.lineWidth=34;c.stroke();
    c.beginPath();c.moveTo(sx(563)+60,563);c.quadraticCurveTo(880,563,940,590);c.stroke();
  },
  ents(c,ents){
    const n=S.npc;
    ents.push([CHALET.y+CHALET.h,()=>drawChalet(c)]);
    PINES.forEach(([x,y])=>ents.push([y,()=>drawPine(c,x,y)]));
    COWS.forEach(([x,y,f,k])=>ents.push([y,()=>drawCow(c,x,y,f,k)]));
    ents.push([376,()=>drawFence(c)]);ents.push([300,()=>drawSideFence(c)]);
    ents.push([BRIDGE.y1,()=>drawBridge(c)]);ents.push([BRIDGE.y2+4,()=>railing(c,sx(563),BRIDGE.y2+4)]);
    S.berries.forEach(b=>ents.push([b.y,()=>drawBush(c,b)]));
    ents.push([588,()=>seat(c,574)]);ents.push([668,()=>drawPicnic(c)]);ents.push([690,()=>seat(c,672)]);
    if(S.state<6){ents.push([BENCH.y-10,()=>drawBench(c)]);ents.push([n.gianco.y,()=>drawPerson(c,n.gianco.x,n.gianco.y,{kind:'gianco',sit:true,t:T,wave:S.state==3})]);}
    else ents.push([n.gianco.y,()=>drawPerson(c,n.gianco.x,n.gianco.y,{kind:'gianco',hat:true,t:T,wave:S.state>=7})]);
    if(S.state>=6)ents.push([BENCH.y-10,()=>drawBench(c)]);
    ents.push([n.lucy.y,()=>drawPerson(c,n.lucy.x,n.lucy.y,{kind:'lucy',t:T,wave:S.state==0||S.state>=7})]);
    ents.push([n.girl.y,()=>drawGirl(c,n.girl.x,n.girl.y,{t:T,wave:S.state>=6})]);
    if(S.state<5)ents.push([S.hat.y,()=>drawHat(c,S.hat)]);
  },
  drawFront(c){
    if(S.state==1)S.berries.forEach((b,i)=>{if(!b.got)sparkle(c,b.x+22,b.y-52,i*.37);});
  }
});
})();
