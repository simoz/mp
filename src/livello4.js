/* ===== Livello 4: in campagna dagli zii ===== */
(()=>{
const WW=1200,WH=900;
const HOUSE={x:70,y:150,w:320,h:170};
const BEDS=[330,420,510],BED={x1:720,x2:1130,h:46};
const CARROT_POS=[[790,BEDS[0]],[1070,BEDS[1]],[900,BEDS[2]]];
const PEN={x1:760,x2:1170,y1:640,gate1:720,gate2:800};
const COOP={x:990,y:730};
const NEST={x:880,y:820};
const TABLE={x:300,y:700};
const TREE={x:170,y:640};
const TRACTOR={x:520,y:330};
const HEN_HOME=[[1050,790],[830,690],[1110,840]];
const HEN_COL=[['#c8743a','#a65a28'],['#fbf7ef','#e0d6c4'],['#3b3540','#24202a']];
const tufts=[],flowers=[];
for(let i=0;i<340;i++)tufts.push([R()*WW,262+R()*(WH-262)]);
for(let i=0;i<70;i++){const x=50+R()*(WW-100),y=300+R()*(WH-340);
  if((x>BED.x1-20&&y<560)||(x>PEN.x1-20&&y>PEN.y1-20)||(x<420&&y<350)||Math.hypot(x-TABLE.x,y-TABLE.y)<140)continue;
  flowers.push([x,y,i%3]);}
const carrotSVG=on=>`<svg viewBox="0 0 26 26" aria-hidden="true"><path d="M7 9l8 15c1 1 2 0 2-1L15 8z" fill="${on?'#ff8a2a':'#e4d6b8'}" stroke="#3b2a35" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 8l-2-6M14 8l2-6M13 8V1" stroke="${on?'#4caf50':'#cbbf9f'}" stroke-width="2.2" stroke-linecap="round"/></svg>`;
const henSVG=on=>`<svg viewBox="0 0 26 26" aria-hidden="true"><ellipse cx="12" cy="15" rx="8" ry="7" fill="${on?'#fff':'#e4d6b8'}" stroke="#3b2a35" stroke-width="1.6"/><circle cx="18" cy="9" r="4.5" fill="${on?'#fff':'#e4d6b8'}" stroke="#3b2a35" stroke-width="1.6"/><path d="M16 4.5l1.5-2 1.5 2 1.5-1.5v3" fill="${on?'#e5533d':'#cbbf9f'}" stroke="#3b2a35" stroke-width="1.2"/><path d="M22 9l3 1-3 1z" fill="${on?'#ffc93d':'#cbbf9f'}"/></svg>`;

function sparkle(c,x,y,k){if(RM)return;const s=((T*1.6+k)%1.4);if(s>1)return;const r=Math.sin(s*Math.PI)*8;
  c.beginPath();c.moveTo(x,y-r);c.lineTo(x+r*.3,y);c.lineTo(x,y+r);c.lineTo(x-r*.3,y);c.closePath();c.moveTo(x-r,y);c.lineTo(x,y-r*.3);c.lineTo(x+r,y);c.lineTo(x,y+r*.3);c.closePath();
  c.fillStyle='#fff7b0';c.fill();}
function cluck(){tone(880,.07,0,'square');tone(990,.07,.09,'square');tone(760,.14,.18,'square');}

/* ---------- disegno ---------- */
function drawSky(c){
  const g=c.createLinearGradient(0,0,0,260);g.addColorStop(0,'#8fd0f5');g.addColorStop(1,'#e6f6fb');c.fillStyle=g;c.fillRect(0,0,WW,262);
  C(c,1080,70,34);c.fillStyle='#ffe066';c.fill();
  [[220,70],[640,48],[930,110]].forEach(([x,y])=>{const cx=(x+(RM?0:T*8))%(WW+160)-80;c.fillStyle='#fff';C(c,cx,y,18);c.fill();C(c,cx+22,y-9,23);c.fill();C(c,cx+46,y,18);c.fill();});
  c.beginPath();c.moveTo(0,262);for(let x=0;x<=WW;x+=30)c.lineTo(x,200+Math.sin(x/160)*22+Math.sin(x/70)*6);c.lineTo(WW,262);c.closePath();fs(c,'#a8d48a');
  [[600,196],[700,190],[760,200]].forEach(([x,y])=>{rr(c,x-3,y,6,14,2);c.fillStyle='#7a4a2a';c.fill();E(c,x,y-14,10,22);fs(c,'#2f7d4a',2);});
  c.beginPath();c.moveTo(0,262);for(let x=0;x<=WW;x+=40)c.lineTo(x,240+Math.sin(x/120+1)*10);c.lineTo(WW,262);c.closePath();fs(c,'#8fcf63');
}
function drawFlower(c,x,y,k){
  if(k==0){for(let i=0;i<6;i++){const a=i/6*TAU;E(c,x+Math.cos(a)*4,y+Math.sin(a)*4,3.6,1.8,a);c.fillStyle='#fffdf2';c.fill();}C(c,x,y,2);c.fillStyle='#e8d36a';c.fill();}
  else if(k==1){for(let i=0;i<5;i++){const a=i/5*TAU;C(c,x+Math.cos(a)*3.4,y+Math.sin(a)*3.4,2.8);c.fillStyle='#e5533d';c.fill();}C(c,x,y,1.8);c.fillStyle='#2b2026';c.fill();}
  else{for(let k2=0;k2<5;k2++){const a=k2/5*TAU;C(c,x+Math.cos(a)*3.4,y+Math.sin(a)*3.4,2.8);c.fillStyle='#ffd23d';c.fill();}C(c,x,y,1.8);c.fillStyle='#ff9a3d';c.fill();}
}
function drawHouse(c){
  const {x,y,w,h}=HOUSE,cx=x+w/2;
  shadowAt(c,cx,y+h+4,w/2+20,12);
  rr(c,x+w-80,y-50,24,60,3);fs(c,'#c9a27a');
  rr(c,x,y,w,h,4);fs(c,'#f2c98a');
  c.fillStyle='rgba(200,140,80,.25)';[[x+40,y+30,30,14],[x+220,y+110,40,16],[x+150,y+20,24,10]].forEach(([a,b,rw,rh])=>{E(c,a,b,rw,rh);c.fill();});
  c.beginPath();c.moveTo(x-22,y+6);c.lineTo(x+36,y-56);c.lineTo(x+w-36,y-56);c.lineTo(x+w+22,y+6);c.closePath();fs(c,'#d0623c');
  c.strokeStyle='#b04e2e';c.lineWidth=2;for(let k=0;k<4;k++){const yy=y-44+k*13;c.beginPath();c.moveTo(x+30-k*13,yy);c.lineTo(x+w-30+k*13,yy);c.stroke();}
  [[x+28],[x+w-88]].forEach(([wx])=>{
    rr(c,wx,y+40,56,50,4);fs(c,'#8fd3f0');c.beginPath();c.moveTo(wx+28,y+40);c.lineTo(wx+28,y+90);c.moveTo(wx,y+65);c.lineTo(wx+56,y+65);c.lineWidth=2.5;c.stroke();
    rr(c,wx-12,y+38,12,54,2);fs(c,'#4f8a3a',2.2);rr(c,wx+56,y+38,12,54,2);fs(c,'#4f8a3a',2.2);
    rr(c,wx-4,y+94,64,10,3);fs(c,'#b0743f');[8,22,36,50].forEach((d,i)=>{C(c,wx-2+d,y+92,5.5);fs(c,i%2?'#ffd23d':'#e5533d',1.6);});
  });
  rr(c,cx-26,y+h-92,52,92,6);fs(c,'#4f8a3a');
  c.strokeStyle='#3d6e2c';c.lineWidth=2;[cx-10,cx+10].forEach(dx=>{c.beginPath();c.moveTo(dx,y+h-86);c.lineTo(dx,y+h-4);c.stroke();});
  C(c,cx+16,y+h-44,3.5);c.fillStyle='#ffc93d';c.fill();
  /* girasoli accanto alla casa */
  [[x+w+20,y+h-6],[x+w+44,y+h+2]].forEach(([sx,sy],i)=>{c.beginPath();c.moveTo(sx,sy);c.lineTo(sx,sy-70-i*10);c.strokeStyle='#3f9a48';c.lineWidth=4;c.stroke();
    E(c,sx+8,sy-36,9,4,-.5);c.fillStyle='#4caf50';c.fill();
    const fy=sy-74-i*10;for(let k=0;k<10;k++){const a=k/10*TAU;E(c,sx+Math.cos(a)*10,fy+Math.sin(a)*10,6,3,a);c.fillStyle='#ffd23d';c.fill();}C(c,sx,fy,7);fs(c,'#7a4a2a',2);});
}
function drawTractor(c){
  const {x,y}=TRACTOR;shadowAt(c,x,y,58,10);
  rr(c,x-46,y-58,64,34,6);fs(c,'#e5533d');
  rr(c,x-8,y-96,40,48,5);fs(c,'#e5533d');rr(c,x-2,y-90,28,22,3);fs(c,'#bfe7f7',2.2);
  rr(c,x-40,y-74,8,20,2);fs(c,'#555',2);
  C(c,x+18,y-26,26);fs(c,'#3b3540');C(c,x+18,y-26,11);fs(c,'#ffc93d',2.2);
  C(c,x-34,y-16,16);fs(c,'#3b3540');C(c,x-34,y-16,7);fs(c,'#ffc93d',2.2);
}
function drawTree(c){
  const {x,y}=TREE;shadowAt(c,x+40,y+4,90,18);
  rr(c,x-12,y-90,24,92,6);fs(c,'#8a5a36');
  [[-50,-110,44],[40,-120,48],[-6,-160,52],[60,-170,36],[-60,-160,34]].forEach(([a,b,r])=>{C(c,x+a,y+b,r);c.lineWidth=6;c.strokeStyle=OL;c.stroke();});
  [[-50,-110,44],[40,-120,48],[-6,-160,52],[60,-170,36],[-60,-160,34]].forEach(([a,b,r])=>{C(c,x+a,y+b,r);c.fillStyle='#5aaa4a';c.fill();});
  [[-20,-150],[30,-130],[-50,-120],[50,-170],[10,-180],[-40,-170]].forEach(([a,b])=>{C(c,x+a,y+b,5);fs(c,'#ffb347',1.6);});
}
function drawBedBack(c){
  BEDS.forEach((by,k)=>{rr(c,BED.x1,by-BED.h/2,BED.x2-BED.x1,BED.h,12);fs(c,'#8a5a3a');
    c.strokeStyle='#74482c';c.lineWidth=2;[-10,0,10].forEach(d=>{c.beginPath();c.moveTo(BED.x1+14,by+d);c.lineTo(BED.x2-14,by+d);c.stroke();});});
  /* staccionata dell'orto */
  const fy=290;c.beginPath();c.moveTo(BED.x1-20,fy-10);c.lineTo(WW-20,fy-10);c.strokeStyle=OL;c.lineWidth=8;c.stroke();c.strokeStyle='#e8d2a8';c.lineWidth=4;c.stroke();
  for(let px=BED.x1-20;px<=WW-20;px+=30){c.beginPath();c.moveTo(px-5,fy+2);c.lineTo(px-5,fy-20);c.lineTo(px,fy-26);c.lineTo(px+5,fy-20);c.lineTo(px+5,fy+2);c.closePath();fs(c,'#f7ead0',2.2);}
}
function carrotTop(c,x,y,big){
  const s=big?1.5:1;
  c.strokeStyle=OL;c.lineWidth=big?6:5;
  [[-8,-18],[0,-22],[8,-18]].forEach(([a,b])=>{c.beginPath();c.moveTo(x,y-2);c.lineTo(x+a*s,y+b*s);c.stroke();});
  c.strokeStyle=big?'#4fc25a':'#3f9a48';c.lineWidth=big?3:2.4;
  [[-8,-18],[0,-22],[8,-18]].forEach(([a,b])=>{c.beginPath();c.moveTo(x,y-2);c.lineTo(x+a*s,y+b*s);c.stroke();});
  E(c,x,y,big?7:5,big?4:3);fs(c,'#ff8a2a',1.8);
}
function lettuce(c,x,y){C(c,x,y-8,12);fs(c,'#8fd36a',2.2);C(c,x,y-9,6);c.fillStyle='#c4ee9a';c.fill();}
function tomato(c,x,y){rr(c,x-2,y-48,4,48,2);c.fillStyle='#b0743f';c.fill();
  [[-7,-16],[7,-30],[-6,-40]].forEach(([a,b])=>{E(c,x+a*1.4,y+b+2,8,4,a>0?.4:-.4);c.fillStyle='#3f9a48';c.fill();});
  [[-6,-22],[6,-14],[5,-38]].forEach(([a,b])=>{C(c,x+a,y+b,5);fs(c,'#e5533d',1.6);});}
function carrot(c,x,y,rot){
  c.save();c.translate(x,y);c.rotate(rot||0);
  c.beginPath();c.moveTo(-5,-2);c.lineTo(0,20);c.lineTo(5,-2);c.closePath();fs(c,'#ff8a2a',2);
  c.strokeStyle='#3f9a48';c.lineWidth=2.5;[[-4,-10],[0,-12],[4,-10]].forEach(([a,b])=>{c.beginPath();c.moveTo(0,-2);c.lineTo(a,b);c.stroke();});
  c.restore();}
function drawCarrots(c,x,y){[-.35,0,.35].forEach((r,i)=>carrot(c,x+(i-1)*7,y,r));}
function drawScarecrow(c){
  const x=1150,y=470;shadowAt(c,x,y,18,5);
  rr(c,x-3,y-90,6,90,2);fs(c,'#8a5a36',2);rr(c,x-30,y-76,60,6,2);fs(c,'#8a5a36',2);
  rr(c,x-16,y-80,32,40,6);fs(c,'#6a8ff0',2.5);C(c,x,y-92,13);fs(c,'#f2d0a0',2.5);
  C(c,x-5,y-94,1.8);C(c,x+5,y-94,1.8);c.fillStyle=OL;c.fill();
  c.beginPath();c.moveTo(x-22,y-100);c.lineTo(x+22,y-100);c.lineTo(x+10,y-106);c.lineTo(x+8,y-116);c.lineTo(x-8,y-116);c.lineTo(x-10,y-106);c.closePath();fs(c,'#e8c66a',2.2);
}
function drawHoe(c,x,y){c.beginPath();c.moveTo(x,y);c.lineTo(x+14,y-92);c.strokeStyle=OL;c.lineWidth=7;c.stroke();c.strokeStyle='#b0743f';c.lineWidth=4;c.stroke();
  c.beginPath();c.moveTo(x+12,y-90);c.lineTo(x+28,y-86);c.lineTo(x+26,y-76);c.lineTo(x+16,y-80);c.closePath();fs(c,'#9aa3ad',2);}
function drawPenFence(c,which){
  const post=(px,py)=>{rr(c,px-5,py-28,10,30,3);fs(c,'#c98b55',2.5);};
  const rail=(x1,y1,x2,y2)=>[-18,-8].forEach(d=>{c.beginPath();c.moveTo(x1,y1+d);c.lineTo(x2,y2+d);c.strokeStyle=OL;c.lineWidth=7;c.stroke();c.strokeStyle='#e0a868';c.lineWidth=3.5;c.stroke();});
  if(which=='top'){rail(PEN.x1,PEN.y1,PEN.x2,PEN.y1);for(let px=PEN.x1;px<=PEN.x2;px+=46)post(px,PEN.y1);}
  else{for(let py=PEN.y1+40;py<=WH-30;py+=40){if(py>PEN.gate1-10&&py<PEN.gate2+10)continue;post(PEN.x1,py);}
    c.strokeStyle=OL;c.lineWidth=7;[[PEN.y1,PEN.gate1-10],[PEN.gate2+10,WH-30]].forEach(([a,b])=>{c.beginPath();c.moveTo(PEN.x1,a-12);c.lineTo(PEN.x1,b-12);c.stroke();});
    c.strokeStyle='#e0a868';c.lineWidth=3.5;[[PEN.y1,PEN.gate1-10],[PEN.gate2+10,WH-30]].forEach(([a,b])=>{c.beginPath();c.moveTo(PEN.x1,a-12);c.lineTo(PEN.x1,b-12);c.stroke();});}
}
function drawCoop(c){
  const {x,y}=COOP;shadowAt(c,x,y+4,96,12);
  rr(c,x-80,y-90,160,90,4);fs(c,'#e9c27a');
  c.strokeStyle='#cfa25c';c.lineWidth=2;for(let k=x-64;k<x+80;k+=20){c.beginPath();c.moveTo(k,y-88);c.lineTo(k,y-2);c.stroke();}
  c.beginPath();c.moveTo(x-96,y-84);c.lineTo(x,y-140);c.lineTo(x+96,y-84);c.closePath();fs(c,'#d0623c');
  c.beginPath();c.moveTo(x-22,y);c.lineTo(x-22,y-40);c.arc(x,y-40,22,Math.PI,0);c.lineTo(x+22,y);c.closePath();fs(c,'#5a3a2a');
  c.beginPath();c.moveTo(x-30,y+16);c.lineTo(x-10,y);c.lineTo(x+10,y);c.lineTo(x+30,y+16);c.closePath();fs(c,'#b0743f',2.2);
  C(c,x-52,y-56,10);fs(c,'#8fd3f0',2.2);
  /* il gallo sul tetto */
  hen(c,x+4,y-136,1,['#e5533d','#b0402a'],{rooster:true,t:T});
}
function drawNest(c){
  const {x,y}=NEST;
  E(c,x,y-6,28,12);fs(c,'#e8c66a',2.5);c.strokeStyle='#c9a24a';c.lineWidth=1.6;for(let k=-20;k<=20;k+=7){c.beginPath();c.moveTo(x+k-4,y-12);c.lineTo(x+k+4,y-2);c.stroke();}
  if(!S.eggs){[[-10,-10],[0,-13],[10,-10],[-4,-6],[6,-6]].forEach(([a,b])=>{E(c,x+a,y+b,5.5,7);fs(c,'#fff8ec',1.8);});}
}
function drawBasket(c,x,y){
  [[-8,-6],[0,-9],[8,-6]].forEach(([a,b])=>{E(c,x+a,y+b,5.5,7);fs(c,'#fff8ec',1.8);});
  c.beginPath();c.moveTo(x-14,y-4);c.lineTo(x-10,y+10);c.lineTo(x+10,y+10);c.lineTo(x+14,y-4);c.closePath();fs(c,'#c98b55',2.2);
  c.beginPath();c.arc(x,y-4,14,Math.PI,0);c.strokeStyle=OL;c.lineWidth=2.4;c.stroke();
}
function hen(c,x,y,f,col,o){
  c.save();c.translate(x,y);c.scale(f*(o.s||1),o.s||1);
  const t=o.t||0,run=o.run,peck=!run&&!RM&&o.peck&&Math.sin(t*3+o.k)>.6;
  const bob=RM?0:run?Math.abs(Math.sin(t*16))*3:0;
  if(!o.noShadow)shadowAt(c,0,0,16,5);
  const lp=run&&!RM?Math.sin(t*16)*5:0;
  c.strokeStyle='#e8a33a';c.lineWidth=2.4;[[-4,lp],[4,-lp]].forEach(([a,d])=>{c.beginPath();c.moveTo(a,-10-bob);c.lineTo(a+d,0);c.stroke();});
  c.translate(0,-bob);
  c.beginPath();c.moveTo(-12,-18);c.lineTo(-22,-34);c.lineTo(-16,-36);c.lineTo(-18,-28);c.closePath();fs(c,o.rooster?'#2f7d4a':col[1],2);
  E(c,0,-20,16,12);fs(c,col[0],2.5);
  E(c,-3,-20,8,6,-.3);c.fillStyle=col[1];c.fill();
  const hx=peck?16:11,hy=peck?-14:-34;
  c.beginPath();c.moveTo(hx-3,hy-8);c.lineTo(hx-1,hy-14);c.lineTo(hx+2,hy-9);c.lineTo(hx+5,hy-14);c.lineTo(hx+6,hy-6);c.closePath();fs(c,'#e5533d',1.6);
  C(c,hx,hy,8);fs(c,col[0],2.2);
  c.beginPath();c.moveTo(hx+7,hy-2);c.lineTo(hx+13,hy);c.lineTo(hx+7,hy+3);c.closePath();fs(c,'#ffc93d',1.4);
  E(c,hx+5,hy+6,2.5,3.5);c.fillStyle='#e5533d';c.fill();
  C(c,hx+2,hy-1,1.8);c.fillStyle=OL;c.fill();
  c.restore();
}

/* ---------- ostacoli ---------- */
function wallBlocked(x,y){
  if(x<45||x>WW-45||y<272||y>WH-40)return true;
  if(x>HOUSE.x-8&&x<HOUSE.x+HOUSE.w+8&&y<HOUSE.y+HOUSE.h+16)return true;
  if(y<300&&x>BED.x1-30)return true;
  if(Math.hypot(x-TRACTOR.x,(y-TRACTOR.y)*1.6)<62)return true;
  if(Math.hypot(x-TREE.x,y-TREE.y)<22)return true;
  if(x>TABLE.x-104&&x<TABLE.x+104&&y>TABLE.y-46&&y<TABLE.y+50)return true;
  if(Math.abs(x-PEN.x1)<14&&y>PEN.y1-10&&!(y>PEN.gate1&&y<PEN.gate2))return true;
  if(x>PEN.x1&&Math.abs(y-PEN.y1)<14)return true;
  if(x>COOP.x-86&&x<COOP.x+86&&y>COOP.y-60&&y<COOP.y+10)return true;
  if(Math.hypot(x-1150,y-470)<18)return true;
  return false;
}
/* le galline scappano solo fuori dal recinto */
const henBlocked=(x,y)=>wallBlocked(x,y)||(x>PEN.x1-24&&y>PEN.y1-24);

/* ---------- dialoghi ---------- */
function talkGiulio(){
  const s=S.state;
  if(s==0)openDialog('giulio',[`CIAO ${N()}!`,"MI AIUTI NELL'ORTO?",'RACCOGLI 3 CAROTE!'],()=>setState(1));
  else if(s==1)openDialog('giulio',['CERCA LE FOGLIE GRANDI!']);
  else if(s==2)openDialog('giulio',['CHE BELLE CAROTE!',`GRAZIE ${N()}!`,'VAI DALLA ZIA MILE.'],()=>{S.carry=null;sfx.pick();burst(S.npc.giulio.x,S.npc.giulio.y-110,24,['#ff8a2a','#4caf50','#fff']);setState(3);});
  else if(s<7)openDialog('giulio',['VAI DALLA ZIA MILE.']);
}
function talkMile(){
  const s=S.state;
  if(s<3)openDialog('mile',[`CIAO ${N()}!`,'VAI DALLO ZIO GIULIO.']);
  else if(s==3)openDialog('mile',[`CIAO ${N()}!`,'LE GALLINE SONO SCAPPATE!','RIPORTALE NEL POLLAIO!'],()=>setState(4));
  else if(s==4)openDialog('mile',[`CORRI, ${N()}!`]);
  else if(s==5)openDialog('mile',['PRENDI LE UOVA!']);
  else if(s==6)openDialog('mile',['CHE BELLE UOVA!',`GRAZIE ${N()}!`,'FACCIAMO LA FRITTATA.'],()=>{
    S.carry=null;sfx.pick();burst(S.npc.mile.x,S.npc.mile.y-110,24,['#fff8ec','#ffc93d','#fff']);
    openDialog('giulio',['TUTTI A TAVOLA!'],()=>{
      setState(7);const n=S.npc;
      n.giulio.path=[[620,600],[TABLE.x+128,TABLE.y-6]];
      n.mile.path=[[450,630],[TABLE.x+20,TABLE.y-50]];
      n.girl.path=[[TABLE.x-128,TABLE.y-6]];
      floatText(TABLE.x,TABLE.y-130,'TUTTI A TAVOLA!','#ffe9a8');});});
}
function talkGirl(){if(S.state<7)openDialog('girl',[`${N()}! GIOCHIAMO?`]);}
function pranzo(){
  openDialog('mile',['ECCO LA FRITTATA!',`${BRAV()} ${N()}!`],()=>{
    S.pranzo=true;setState(8);sfx.win();confetti(TABLE.x,TABLE.y-80);floatText(TABLE.x,TABLE.y-130,'BUON APPETITO!','#ffc93d');
    finish('Che buona la frittata con le uova delle galline!',2.6);});
}

function drawTable(c){
  const {x,y}=TABLE,w=200,h=60,x0=x-w/2,y0=y-h/2;
  rr(c,x0+18,y0+h-4,12,34,3);fs(c,'#8a5230',2.5);rr(c,x0+w-30,y0+h-4,12,34,3);fs(c,'#8a5230',2.5);
  rr(c,x0,y0,w,h,8);fs(c,'#c98b55');
  c.save();rr(c,x0+20,y0+4,w-40,h-6,4);c.clip();c.fillStyle='#fff';c.fillRect(x0,y0,w,h);c.fillStyle='rgba(79,143,216,.5)';
  for(let k=0;k<w;k+=14)c.fillRect(x0+20+k,y0,7,h);for(let k=0;k<h;k+=14)c.fillRect(x0,y0+4+k,w,7);c.restore();
  rr(c,x0+20,y0+4,w-40,h-6,4);c.lineWidth=2;c.strokeStyle=OL;c.stroke();
  rr(c,x0,y0+h-6,w,14,5);fs(c,'#a86a40');
  if(S.state>=7){
    E(c,x,y-2,38,12);fs(c,'#fff',2.2);E(c,x,y-6,30,9);fs(c,'#ffd35a',2.2);
    [[-14,-6],[8,-8],[-2,-3],[16,-4]].forEach(([a,b])=>{C(c,x+a,y+b,2.4);c.fillStyle='#ff8a2a';c.fill();});
    [[-8,-9],[4,-4],[12,-10]].forEach(([a,b])=>{C(c,x+a,y+b,1.8);c.fillStyle='#4caf50';c.fill();});
    E(c,x-68,y-2,16,7);fs(c,'#fff',2);lettuce(c,x-68,y+4);
    drawCarrots(c,x+70,y-6);
  }
  if(S.pranzo)[[x-40,y+8],[x+40,y+8]].forEach(([a,b])=>{E(c,a,b,11,4);fs(c,'#fff',1.8);});
}

LEVELS.push({
  name:'In campagna dagli zii',ww:WW,wh:WH,bg:'#9ad66f',party:['maci','piumi'],music:'audio/stage4.mp3',
  start:{p:{x:480,y:470},q:{x:440,y:486}},
  quests:['VAI DA ZIO GIULIO','RACCOGLI 3 CAROTE','PORTA LE CAROTE ALLO ZIO','VAI DA ZIA MILE','RIPORTA LE GALLINE NEL POLLAIO','PRENDI LE UOVA','PORTA LE UOVA ALLA ZIA','TUTTI A TAVOLA!','BUON APPETITO!'],
  fresh:()=>({count:0,henCount:0,eggs:false,pranzo:false,carry:null,
    carrots:CARROT_POS.map(([x,y])=>({x,y,got:false,pop:0})),
    hens:[[420,420,0],[600,780,1],[300,830,2]].map(([x,y,k])=>({x,y,k,vx:0,vy:0,f:1,home:false,path:[],wx:x,wy:y})),
    npc:{giulio:{x:670,y:430,path:[]},mile:{x:660,y:760,path:[]},girl:{x:120,y:470,path:[]}}}),
  progress:()=>S.state>=1&&S.state<=2?[0,1,2].map(i=>carrotSVG(i<S.count)).join(''):S.state==4?[0,1,2].map(i=>henSVG(i<S.henCount)).join(''):'',
  blocked(x,y){
    if(wallBlocked(x,y))return true;
    const n=S.npc;return Math.hypot(x-n.giulio.x,y-n.giulio.y)<26||Math.hypot(x-n.mile.x,y-n.mile.y)<26||Math.hypot(x-n.girl.x,y-n.girl.y)<22;
  },
  tick(dt){
    const walk=(n,sp)=>{if(!n.path.length)return false;const [tx,ty]=n.path[0],d=Math.hypot(tx-n.x,ty-n.y),st=sp*dt;
      if(Math.abs(tx-n.x)>1)n.f=tx>n.x?1:-1;
      if(d<=st){n.x=tx;n.y=ty;n.path.shift();}else{n.x+=(tx-n.x)/d*st;n.y+=(ty-n.y)/d*st;}return true;};
    Object.values(S.npc).forEach(n=>walk(n,150));
    S.carrots.forEach(b=>{if(b.got&&b.pop<1)b.pop=Math.min(1,b.pop+dt*2);});
    S.hens.forEach(h=>{h.moving=walk(h,170);
      if(h.moving||S.state==4&&!h.home)return;
      /* passeggiano piano qua e là */
      if(Math.hypot(h.wx-h.x,h.wy-h.y)<4){if(R()<dt*.6){const a=R()*TAU,r=40;const nx=h.x+Math.cos(a)*r,ny=h.y+Math.sin(a)*r;
        if(h.home?(nx>PEN.x1+30&&ny>PEN.y1+30&&ny<WH-50&&nx<WW-50&&!wallBlocked(nx,ny)):!henBlocked(nx,ny)){h.wx=nx;h.wy=ny;}}}
      else{const d=Math.hypot(h.wx-h.x,h.wy-h.y),st=Math.min(d,30*dt);h.x+=(h.wx-h.x)/d*st;h.y+=(h.wy-h.y)/d*st;h.f=h.wx>h.x?1:-1;h.moving=true;}});
  },
  update(dt){
    const p=S.p,s=S.state;
    S.carrots.forEach(b=>{if(b.got||Math.hypot(b.x-p.x,b.y-p.y)>44)return;
      if(s<1){if(hintCD<=0){floatText(b.x,b.y-60,'PRIMA VAI DA ZIO GIULIO','#ffe9a8');hintCD=2.5;}return;}
      if(s>1)return;
      b.got=true;S.count++;sfx.pick();burst(b.x,b.y-14,22,['#ff8a2a','#4caf50','#8a5a3a']);floatText(b.x,b.y-60,S.count+(S.count==1?' CAROTA!':' CAROTE!'));
      if(S.count>=3){S.carry='carote';floatText(p.x,p.y-90,BRAV()+'!','#ffc93d');setState(2);}else updateHUD();});
    if(s==4)S.hens.forEach((h,i)=>{if(h.home||h.path.length)return;
      const d=Math.hypot(h.x-p.x,h.y-p.y)||1;let tvx=h.vx*.9,tvy=h.vy*.9;
      if(d<170){const ax=(h.x-p.x)/d,ay=(h.y-p.y)/d,w=Math.sin(T*2.1+i*2)*.8;tvx=(ax-ay*w)*115;tvy=(ay+ax*w)*115;}
      const k=Math.min(1,dt*4);h.vx+=(tvx-h.vx)*k;h.vy+=(tvy-h.vy)*k;
      const nx=h.x+h.vx*dt,ny=h.y+h.vy*dt;
      if(henBlocked(nx,h.y))h.vx*=-.9;else h.x=nx;
      if(henBlocked(h.x,ny))h.vy*=-.9;else h.y=ny;
      if(Math.abs(h.vx)>8)h.f=h.vx>0?1:-1;h.run=Math.hypot(h.vx,h.vy)>30;
      if(d<34){h.home=true;h.run=false;h.vx=h.vy=0;const [hx,hy]=HEN_HOME[S.henCount];
        h.path=[[PEN.x1-40,(PEN.gate1+PEN.gate2)/2],[PEN.x1+40,(PEN.gate1+PEN.gate2)/2],[hx,hy]];h.wx=hx;h.wy=hy;
        S.henCount++;cluck();burst(h.x,h.y-24,18,['#fff','#ffc93d','#e5533d']);floatText(h.x,h.y-60,'COCCODÈ!','#fff');
        if(S.henCount>=3){floatText(p.x,p.y-90,BRAV()+'!','#ffc93d');
          setTimeout(()=>{if(S.state==4)openDialog('mile',[`GRAZIE ${N()}!`,'PRENDI LE UOVA!'],()=>setState(5));},900);}
        else updateHUD();}});
    if(s==5)proximity('nest',NEST.x,NEST.y,()=>{S.eggs=true;S.carry='uova';sfx.pick();burst(NEST.x,NEST.y-20,22,['#fff8ec','#ffc93d','#fff']);floatText(NEST.x,NEST.y-60,'LE UOVA!','#ffc93d');setState(6);},50);
    if(s==7){proximity('table',TABLE.x,TABLE.y,pranzo,150);return;}
    proximity('giulio',S.npc.giulio.x,S.npc.giulio.y,talkGiulio);
    proximity('mile',S.npc.mile.x,S.npc.mile.y,talkMile);
    proximity('girl',S.npc.girl.x,S.npc.girl.y,talkGirl);
    proximity('gallo',COOP.x-120,COOP.y+40,()=>{tone(523,.15,0,'square');tone(784,.15,.15,'square');tone(1046,.4,.3,'square');floatText(COOP.x,COOP.y-180,'CHICCHIRICHÌ!','#fff');},60);
  },
  guide(){
    const s=S.state,n=S.npc;
    if(s==0||s==2)return{x:n.giulio.x,y:n.giulio.y-150};
    if(s==1)return nearest(S.carrots.filter(b=>!b.got),60);
    if(s==3||s==6)return{x:n.mile.x,y:n.mile.y-150};
    if(s==4)return nearest(S.hens.filter(h=>!h.home),70);
    if(s==5)return{x:NEST.x,y:NEST.y-50};
    if(s==7)return{x:TABLE.x,y:TABLE.y-120};
    return null;
  },
  carry(c,x,y){const b=RM?0:Math.sin(T*5)*3;if(S.carry=='carote')drawCarrots(c,x+6,y-90-b);else if(S.carry=='uova')drawBasket(c,x+6,y-82-b);},
  drawBack(c){
    drawSky(c);
    c.fillStyle='#9ad66f';c.fillRect(0,256,WW,WH-256);
    c.strokeStyle='#7fbf55';c.lineWidth=2;tufts.forEach(([x,y])=>{c.beginPath();c.moveTo(x-4,y-5);c.lineTo(x,y);c.lineTo(x+4,y-6);c.stroke();});
    c.fillStyle='#c9e39a';c.fillRect(PEN.x1,PEN.y1,WW-PEN.x1,WH-PEN.y1);
    flowers.forEach(([x,y,k])=>drawFlower(c,x,y,k));
    c.beginPath();c.moveTo(230,330);c.quadraticCurveTo(280,470,480,480);c.quadraticCurveTo(640,490,700,420);c.moveTo(480,480);c.quadraticCurveTo(560,600,PEN.x1-10,(PEN.gate1+PEN.gate2)/2);
    c.strokeStyle='#d8c08a';c.lineWidth=34;c.stroke();
    drawBedBack(c);
    BEDS.forEach((by,k)=>{for(let x=BED.x1+30;x<BED.x2-10;x+=40){
      if(CARROT_POS.some(([a,b])=>b==by&&Math.abs(a-x)<30))continue;
      if(k==0)carrotTop(c,x,by+4,false);else if(k==1)lettuce(c,x,by+6);}});
  },
  ents(c,ents){
    const n=S.npc;
    ents.push([HOUSE.y+HOUSE.h,()=>drawHouse(c)]);
    ents.push([TRACTOR.y,()=>drawTractor(c)]);
    ents.push([TREE.y,()=>drawTree(c)]);
    for(let x=BED.x1+30;x<BED.x2-10;x+=40)if(!CARROT_POS.some(([a,b])=>b==BEDS[2]&&Math.abs(a-x)<30)){const bx=x;ents.push([BEDS[2]+6,()=>tomato(c,bx,BEDS[2]+6)]);}
    S.carrots.forEach(b=>{if(!b.got)ents.push([b.y+8,()=>carrotTop(c,b.x,b.y+6,true)]);
      else if(b.pop<1)ents.push([b.y+8,()=>{c.globalAlpha=1-b.pop;carrot(c,b.x,b.y-b.pop*50,b.pop*4);c.globalAlpha=1;}]);});
    ents.push([470,()=>drawScarecrow(c)]);
    ents.push([PEN.y1,()=>drawPenFence(c,'top')]);
    ents.push([PEN.gate1-20,()=>drawPenFence(c,'side')]);
    ents.push([COOP.y,()=>drawCoop(c)]);
    ents.push([NEST.y,()=>drawNest(c)]);
    ents.push([TABLE.y+30,()=>drawTable(c)]);
    S.hens.forEach(h=>ents.push([h.y,()=>hen(c,h.x,h.y,h.f,HEN_COL[h.k],{t:T,k:h.k,run:h.run||h.path.length>0,peck:!h.moving})]));
    if(S.state<7)ents.push([n.giulio.y-1,()=>drawHoe(c,n.giulio.x+26,n.giulio.y)]);
    ents.push([n.giulio.y,()=>drawPerson(c,n.giulio.x,n.giulio.y,{kind:'giulio',t:T,wave:S.state==0||S.state>=8})]);
    ents.push([n.mile.y,()=>drawPerson(c,n.mile.x,n.mile.y,{kind:'mile',t:T,wave:S.state==3||S.state>=8})]);
    ents.push([n.girl.y,()=>drawGirl(c,n.girl.x,n.girl.y,{t:T,wave:S.state>=7})]);
  },
  drawFront(c){
    if(S.state==1)S.carrots.forEach((b,i)=>{if(!b.got)sparkle(c,b.x+16,b.y-30,i*.37);});
    if(S.state==5&&!S.eggs)sparkle(c,NEST.x+20,NEST.y-24,.2);
  }
});
})();
