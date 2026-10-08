/* ===== Motore condiviso: disegno, audio, voci, dialoghi, movimento ===== */
const cv=document.getElementById('game'),ctx=cv.getContext('2d');
const OL='#3b2a35',TAU=Math.PI*2;
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
let VW,VH,DPR,Z;
function resize(){DPR=Math.min(2,devicePixelRatio||1);VW=innerWidth;VH=innerHeight;cv.width=VW*DPR;cv.height=VH*DPR;Z=Math.max(.55,Math.min(1.25,Math.min(VW,VH)/620));}
addEventListener('resize',resize);resize();

let seed=7;const R=()=>(seed=(seed*16807)%2147483647)/2147483647;
const E=(c,x,y,rx,ry,rot)=>{c.beginPath();c.ellipse(x,y,rx,ry,rot||0,0,TAU);};
const C=(c,x,y,r)=>{c.beginPath();c.arc(x,y,r,0,TAU);};
function rr(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();}
const fs=(c,f,lw)=>{c.fillStyle=f;c.fill();c.lineWidth=lw||3;c.strokeStyle=OL;c.stroke();};
const shadowAt=(c,x,y,rx,ry)=>{E(c,x,y,rx,ry);c.fillStyle='rgba(40,30,40,.18)';c.fill();};
const FCOL=['#ef5a6f','#6a8ff0','#b46ee0','#ff9a3d'];
function shade(h){const n=parseInt(h.slice(1),16),f=.82;return 'rgb('+[(n>>16)&255,(n>>8)&255,n&255].map(v=>Math.round(v*f)).join(',')+')';}

const CATS={
  maci:{name:'MACI',body:'#2b2930',belly:'#ffffff',ear:'#f4a6b6',eye:'#e9dc6a',kind:'maci'},
  piumi:{name:'PIUMI',body:'#a2978c',belly:'#f3ece2',ear:'#f4b0b0',eye:'#f2d34a',kind:'piumi'},
  emma:{name:'NONNA EMMA',body:'#a8804f',belly:'#fff8ef',ear:'#f0b3a6',eye:'#9cc06a',kind:'emma'}
};

/* ---------- personaggi ---------- */
function drawCat(c,x,y,cat,o){
  c.save();c.translate(x,y);const s=o.scale||1;c.scale(s*(o.f||1),s);
  const t=o.t||0,mv=o.moving,bob=RM?0:(mv?Math.abs(Math.sin(t*12))*3:Math.sin(t*2)*.8);
  c.lineJoin='round';c.lineCap='round';
  if(!o.noShadow){E(c,0,0,24,7);c.fillStyle='rgba(40,30,40,.18)';c.fill();}
  const sway=RM?0:Math.sin(t*(mv?10:2.5))*6,tw=cat.kind=='piumi'?14:8;
  let tx,ty;c.beginPath();
  if(o.sit){c.moveTo(-8,-6);c.quadraticCurveTo(-32,-2,-28+sway*.3,-24);tx=-28+sway*.3;ty=-24;}
  else{c.moveTo(-14,-18);c.quadraticCurveTo(-36,-24,-30+sway,-46);tx=-30+sway;ty=-46;}
  c.strokeStyle=OL;c.lineWidth=tw+6;c.stroke();c.strokeStyle=cat.body;c.lineWidth=tw;c.stroke();
  if(cat.kind=='piumi'){c.strokeStyle='#c4b9ad';c.lineWidth=3;c.stroke();}
  if(cat.kind=='emma'){C(c,tx,ty,tw/2+1);c.fillStyle='#1e1b20';c.fill();}
  if(!o.sit){const ph=mv&&!RM?Math.sin(t*12):0;
    [[-11,ph],[11,-ph],[-4,-ph],[14,ph]].forEach(([lx,p],i)=>{const ox=lx+p*4;rr(c,ox-5,-16,10,15,5);fs(c,i<2?shade(cat.body):cat.body,2.5);
      if(cat.kind!='piumi'){E(c,ox,-3,5,3);c.fillStyle='#fff';c.fill();}});}
  if(o.sit)E(c,0,-20,18,20);else E(c,0,-17-bob*.3,20,14);
  c.fillStyle=cat.body;c.fill();
  c.save();c.clip();
  if(o.sit)E(c,5,-15,10,14);else E(c,9,-14,9,9);c.fillStyle=cat.belly;c.fill();
  if(cat.kind=='emma'){c.strokeStyle='#4a3626';c.lineWidth=3;for(let i=-16;i<12;i+=7){c.beginPath();c.moveTo(i,-40);c.lineTo(i-3,-22);c.stroke();}}
  if(cat.kind=='piumi'){c.strokeStyle='#8c8176';c.lineWidth=2;for(let i=-14;i<10;i+=6){c.beginPath();c.moveTo(i,-6);c.lineTo(i+3,-12);c.stroke();}}
  c.restore();
  if(o.sit)E(c,0,-20,18,20);else E(c,0,-17-bob*.3,20,14);c.lineWidth=3;c.strokeStyle=OL;c.stroke();
  if(o.sit){[[-6],[8]].forEach(([px])=>{E(c,px,-3,6,4);fs(c,cat.kind=='piumi'?cat.body:'#fff',2.5);});}
  const hx=6,hy=(o.sit?-46:-40)-bob;
  [[-16,-6,-12,-28,-2,-15],[4,-15,14,-28,18,-6]].forEach(a=>{c.beginPath();c.moveTo(hx+a[0],hy+a[1]);c.lineTo(hx+a[2],hy+a[3]);c.lineTo(hx+a[4],hy+a[5]);c.closePath();fs(c,cat.body);
    c.beginPath();c.moveTo(hx+a[0]*.6+a[2]*.4,hy+a[1]*.6+a[3]*.4+3);c.lineTo(hx+a[2]*.85+a[4]*.15,hy+a[3]+6);c.lineTo(hx+a[4]*.6+a[2]*.4,hy+a[5]*.6+a[3]*.4+3);c.closePath();c.fillStyle=cat.ear;c.fill();});
  if(cat.kind=='piumi'){[[-1,1],[1,1]].forEach(([d])=>{c.beginPath();const bx=hx+d*16;c.moveTo(bx,hy-2);c.lineTo(bx+d*10,hy+4);c.lineTo(bx+d*2,hy+6);c.lineTo(bx+d*8,hy+11);c.lineTo(bx-d*2,hy+12);c.closePath();fs(c,cat.body,2.5);});}
  C(c,hx,hy,18);c.fillStyle=cat.body;c.fill();
  c.save();C(c,hx,hy,18);c.clip();
  if(cat.kind=='maci'){c.beginPath();c.moveTo(hx+2,hy-19);c.lineTo(hx+7,hy+2);c.lineTo(hx-2,hy+2);c.closePath();c.fillStyle='#fff';c.fill();}
  E(c,hx+3,hy+8,11,7);c.fillStyle=cat.belly;c.fill();
  if(cat.kind=='maci'){E(c,hx+3,hy+4.5,5,2.6);c.fillStyle='#141016';c.fill();}
  if(cat.kind!='maci'){c.strokeStyle=cat.kind=='emma'?'#4a3626':'#7d7266';c.lineWidth=2.5;[-4,1,6].forEach(d=>{c.beginPath();c.moveTo(hx+d,hy-17);c.lineTo(hx+d*.7,hy-10);c.stroke();});}
  if(cat.kind=='emma'){c.strokeStyle='#4a3626';c.lineWidth=2.5;[[-18,0],[-18,5],[18,0],[18,5]].forEach(([dx,dy])=>{c.beginPath();c.moveTo(hx+dx,hy+dy);c.lineTo(hx+dx*.75,hy+dy);c.stroke();});}
  c.restore();
  C(c,hx,hy,18);c.lineWidth=3;c.strokeStyle=OL;c.stroke();
  const eyes=[[hx-5,hy-2],[hx+10,hy-2]];
  if(cat.kind=='emma'){
    eyes.forEach(([ex,ey])=>{c.beginPath();c.arc(ex,ey+2,3.8,Math.PI*1.15,Math.PI*1.85);c.strokeStyle=OL;c.lineWidth=2.5;c.stroke();
      C(c,ex,ey,7);c.strokeStyle='#d9a73a';c.lineWidth=2.5;c.stroke();});
    c.beginPath();c.moveTo(hx+2,hy-3);c.lineTo(hx+3,hy-3);c.stroke();
  }else{
    const blink=!RM&&((t+(o.seed||0)*1.7)%4.2)<.13;
    eyes.forEach(([ex,ey])=>{if(blink){c.beginPath();c.moveTo(ex-4,ey);c.lineTo(ex+4,ey);c.strokeStyle=OL;c.lineWidth=2.5;c.stroke();return;}
      E(c,ex,ey,4.8,5.8);fs(c,cat.eye,1.8);E(c,ex+.8,ey+.6,2.2,4.4);c.fillStyle='#1a1418';c.fill();C(c,ex-1.4,ey-2.2,1.7);c.fillStyle='#fff';c.fill();});
  }
  E(c,hx-10,hy+6,4,2.5);E(c,hx+16,hy+6,4,2.5);c.fillStyle='rgba(255,110,140,.5)';c.fill();
  c.beginPath();c.moveTo(hx+.5,hy+2.5);c.lineTo(hx+5.5,hy+2.5);c.lineTo(hx+3,hy+5.5);c.closePath();c.fillStyle=cat.kind=='maci'?'#141016':'#f07a8a';c.fill();
  c.beginPath();c.moveTo(hx+3,hy+5.5);c.quadraticCurveTo(hx+1,hy+9,hx-1.5,hy+8);c.moveTo(hx+3,hy+5.5);c.quadraticCurveTo(hx+5,hy+9,hx+7.5,hy+8);c.strokeStyle=cat.kind=='maci'?'#555':OL;c.lineWidth=1.6;c.stroke();
  c.strokeStyle=cat.kind=='maci'?'#e8e8e8':'rgba(255,255,255,.9)';c.lineWidth=1.2;
  [[13,4,27,1],[13,7,27,9],[-7,4,-20,1],[-7,7,-20,9]].forEach(([a,b,d,e])=>{c.beginPath();c.moveTo(hx+a,hy+b);c.lineTo(hx+d,hy+e);c.stroke();});
  c.restore();
}

function daisy(c,x,y,r,rot){for(let i=0;i<8;i++){const a=i/8*TAU+(rot||0);E(c,x+Math.cos(a)*r*.62,y+Math.sin(a)*r*.62,r*.5,r*.24,a);c.fillStyle='#fff';c.fill();c.lineWidth=1.4;c.strokeStyle=OL;c.stroke();}
  C(c,x,y,r*.36);fs(c,'#f6c830',1.4);}

function drawGirl(c,x,y,o){
  c.save();c.translate(x,y);c.lineJoin='round';c.lineCap='round';const t=o.t||0,SK='#f8d5bd',HR='#6b4226';
  if(!o.noShadow){E(c,0,0,22,6);c.fillStyle='rgba(40,30,40,.18)';c.fill();}
  rr(c,-9,-40,7,37,3);fs(c,SK,2.5);rr(c,2,-40,7,37,3);fs(c,SK,2.5);
  E(c,-6,-3,7,4);fs(c,'#e85a5a',2.5);E(c,6,-3,7,4);fs(c,'#e85a5a',2.5);
  rr(c,-12,-52,24,15,4);fs(c,'#5a7fc0',2.5);
  const wave=o.wave&&!RM?Math.sin(t*7)*6:0;
  const arm=(x1,y1,x2,y2)=>{c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.strokeStyle=OL;c.lineWidth=10;c.stroke();c.strokeStyle=SK;c.lineWidth=6;c.stroke();};
  arm(-11,-80,-17,-52);
  if(o.wave)arm(11,-80,22+wave,-100);else arm(11,-80,17,-52);
  rr(c,-13,-84,26,36,7);fs(c,'#5cbf60',2.8);
  c.save();rr(c,-13,-84,26,36,7);c.clip();c.fillStyle='#48a04c';c.fillRect(5,-84,10,36);c.restore();rr(c,-13,-84,26,36,7);c.lineWidth=2.8;c.strokeStyle=OL;c.stroke();
  daisy(c,0,-67,7);
  rr(c,-3,-90,6,8,2);c.fillStyle=SK;c.fill();
  c.beginPath();c.moveTo(-21,-89);c.lineTo(-21,-104);c.arc(0,-104,21,Math.PI,0);c.lineTo(21,-89);c.lineTo(11,-89);c.lineTo(7,-97);c.lineTo(-7,-97);c.lineTo(-11,-89);c.closePath();fs(c,HR,2.8);
  c.strokeStyle='#9a6a40';c.lineWidth=1.6;[[-17,-100,-17,-91],[17,-100,17,-91]].forEach(([a,b,d,e])=>{c.beginPath();c.moveTo(a,b);c.lineTo(d,e);c.stroke();});
  C(c,0,-102,15);fs(c,SK,2.8);
  c.beginPath();c.moveTo(-16,-101);c.quadraticCurveTo(-17,-121,0,-121);c.quadraticCurveTo(17,-121,16,-101);c.quadraticCurveTo(9,-110,3,-106);c.quadraticCurveTo(-6,-112,-16,-101);fs(c,HR,2.5);
  c.beginPath();c.moveTo(-8,-116);c.quadraticCurveTo(0,-120,7,-117);c.strokeStyle='#9a6a40';c.lineWidth=2;c.stroke();
  [[-5.5],[5.5]].forEach(([ex])=>{E(c,ex,-99,2.4,3.2);c.fillStyle='#2b2026';c.fill();C(c,ex-.8,-100.3,.9);c.fillStyle='#fff';c.fill();});
  E(c,-9,-94,3.4,2);E(c,9,-94,3.4,2);c.fillStyle='rgba(255,110,140,.5)';c.fill();
  c.beginPath();c.arc(0,-96,4,.2*Math.PI,.8*Math.PI);c.strokeStyle='#b04650';c.lineWidth=1.8;c.stroke();
  if(o.crown){for(let i=0;i<7;i++){const a=Math.PI*(1.08+i*.14);daisy(c,Math.cos(a)*16,-104+Math.sin(a)*15,5,i);}}
  else daisy(c,12,-113,4.5);
  c.restore();
}

/* nonno Gian e nonna Luisa, nonno Gianco e nonna Lucy, zio Giulio e zia Mile, zio Simone e zia Silvia */
const PEOPLE={
  gian:{shirt:'#a9cdea',stripe:'#ffffff',pants:'#2f3a5a',hair:'#f4f4f4',skin:'#f3c9a8',shoes:'#3a2a2a'},
  luisa:{shirt:'#26365e',pants:'#8d7a66',hair:'#e3d2b0',skin:'#f6d3b8',shoes:'#5a3a2a'},
  gianco:{shirt:'#2c3b63',inner:'#bcd7f0',tie:'#3d63a8',pants:'#4a4f5c',hair:'#e8e6e2',skin:'#efc3a0',shoes:'#2a2222'},
  lucy:{shirt:'#d9c7a3',scarf:'#3f6fb5',pants:'#3a3f55',hair:'#8a3f2a',skin:'#f6d3b8',shoes:'#5a3a2a'},
  giulio:{shirt:'#93303f',pants:'#59606e',hair:'#4a4340',beard:'#bdb6ad',beard2:'#d8d2ca',must:'#9d968d',skin:'#efc3a0',shoes:'#4a3428'},
  simone:{shirt:'#5b86c4',pants:'#3a3f55',hair:'#3a2a20',beard:'#7a5638',beard2:'#946c4c',must:'#5e4029',skin:'#f3c9a8',shoes:'#2f2a28'},
  silvia:{shirt:'#c8453f',scarf:'#7a2a4a',pants:'#3a3f55',hair:'#5a3a26',skin:'#f6d3b8',shoes:'#4a3428'},
  mile:{shirt:'#2b2730',apron:'#7fb35a',pants:'#4a5a7a',hair:'#2a1e1e',skin:'#f6d3b8',shoes:'#6b3d22'}
};
function specs(c,cy,col){c.strokeStyle=col;c.lineWidth=2.4;rr(c,-12.5,cy-4.5,10,9,3);c.stroke();rr(c,2.5,cy-4.5,10,9,3);c.stroke();c.beginPath();c.moveTo(-2.5,cy-1.5);c.lineTo(2.5,cy-1.5);c.stroke();}
/* cappello da montagna di nonno Gianco */
function alpineHat(c,x,y,s){
  c.save();c.translate(x,y);c.scale(s||1,s||1);
  E(c,13,-15,4,13,.5);fs(c,'#f4f4f4',2);c.beginPath();c.moveTo(9,-4);c.lineTo(17,-26);c.strokeStyle='#bbb';c.lineWidth=1.4;c.stroke();
  c.beginPath();c.moveTo(-14,0);c.lineTo(-11,-17);c.quadraticCurveTo(0,-23,11,-17);c.lineTo(14,0);c.closePath();fs(c,'#4f7d3c',2.5);
  c.beginPath();c.moveTo(-4,-20);c.lineTo(0,-15);c.lineTo(4,-20);c.strokeStyle='#3f6a33';c.lineWidth=2;c.stroke();
  rr(c,-13.5,-7,27,5,2);c.fillStyle='#d9534f';c.fill();[-8,0,8].forEach(d=>{C(c,d,-4.5,1.2);c.fillStyle='#fff';c.fill();});
  E(c,0,0,24,6);fs(c,'#3f6a33',2.5);
  c.restore();
}
function drawPerson(c,x,y,o){
  const P=PEOPLE[o.kind],t=o.t||0;
  c.save();c.translate(x,y);c.lineJoin='round';c.lineCap='round';
  if(!o.noShadow)shadowAt(c,0,0,24,6);
  const lt=o.sit?-30:-50,top=o.sit?-76:-96,hy=top-17;
  rr(c,-12,lt,10,-lt-4,4);fs(c,P.pants,2.5);rr(c,2,lt,10,-lt-4,4);fs(c,P.pants,2.5);
  E(c,-7,-3,8,4.5);fs(c,P.shoes,2.5);E(c,7,-3,8,4.5);fs(c,P.shoes,2.5);
  const wave=o.wave&&!RM?Math.sin(t*7)*6:0;
  const arm=(x1,y1,x2,y2)=>{c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.strokeStyle=OL;c.lineWidth=13;c.stroke();c.strokeStyle=P.shirt;c.lineWidth=9;c.stroke();C(c,x2,y2,5);fs(c,P.skin,2.5);};
  arm(-14,top+8,-21,top+40);
  if(o.wave)arm(14,top+8,26+wave,top-12);else arm(14,top+8,21,top+40);
  rr(c,-17,top,34,lt-top+6,10);c.fillStyle=P.shirt;c.fill();
  c.save();rr(c,-17,top,34,lt-top+6,10);c.clip();
  if(o.kind=='gian'){for(let i=-16;i<18;i+=6){c.fillStyle=(i/6|0)%2?P.stripe:'#7aa6cf';c.fillRect(i,top,2,lt-top+6);}
    c.beginPath();c.moveTo(-7,top);c.lineTo(0,top+9);c.lineTo(7,top);c.closePath();c.fillStyle='#fff';c.fill();c.strokeStyle=OL;c.lineWidth=1.5;c.stroke();}
  else if(o.kind=='luisa'){const bx=3,by=top+20;[[-1],[1]].forEach(([d])=>{E(c,bx+d*5,by-3,5,4,d*.5);c.fillStyle='#f28cb0';c.fill();E(c,bx+d*4,by+3,3.5,3,-d*.4);c.fillStyle='#ff9a3d';c.fill();});
    c.beginPath();c.moveTo(bx,by-6);c.lineTo(bx,by+5);c.strokeStyle=OL;c.lineWidth=1.5;c.stroke();}
  else if(o.kind=='gianco'){c.beginPath();c.moveTo(-8,top);c.lineTo(0,top+18);c.lineTo(8,top);c.closePath();c.fillStyle=P.inner;c.fill();
    c.beginPath();c.moveTo(-2.5,top+2);c.lineTo(2.5,top+2);c.lineTo(3.5,top+13);c.lineTo(0,top+18);c.lineTo(-3.5,top+13);c.closePath();c.fillStyle=P.tie;c.fill();
    c.beginPath();c.moveTo(-9,top);c.lineTo(0,top+21);c.lineTo(9,top);c.strokeStyle=OL;c.lineWidth=1.5;c.stroke();
    [top+27,top+35].forEach(by=>{C(c,0,by,1.6);c.fillStyle=OL;c.fill();});}
  else if(o.kind=='lucy'){c.fillStyle='#e8d9b8';[[-1],[1]].forEach(([d])=>{c.beginPath();c.moveTo(d*16,top);c.lineTo(d*2,top);c.lineTo(d*7,top+15);c.closePath();c.fill();});
    c.fillStyle='#b9a47c';c.fillRect(-17,top+(lt-top)*.62,34,5);rr(c,-4,top+(lt-top)*.62-1,8,7,1.5);c.strokeStyle=OL;c.lineWidth=1.5;c.stroke();
    c.beginPath();c.moveTo(0,top+14);c.lineTo(0,lt+6);c.stroke();}
  else if(o.kind=='giulio'){C(c,2,top+20,9);c.fillStyle='#f4ece4';c.fill();c.strokeStyle='#c9b9a8';c.lineWidth=1.5;c.stroke();
    C(c,2,top+19,4.5);c.fillStyle='#93303f';c.fill();E(c,2,top+20,3,2.2);c.fillStyle='#f4ece4';c.fill();}
  else if(o.kind=='mile'){rr(c,-12,top+12,24,lt-top-4,6);c.fillStyle=P.apron;c.fill();c.strokeStyle=OL;c.lineWidth=1.8;c.stroke();
    rr(c,-6,top+22,12,8,2);c.strokeStyle='#5e8f40';c.stroke();[[-6,top+40],[5,top+46]].forEach(([a,b])=>{C(c,a,b,2.4);c.fillStyle='#fff';c.fill();});
    c.beginPath();c.moveTo(-12,top+12);c.lineTo(-6,top);c.moveTo(12,top+12);c.lineTo(6,top);c.strokeStyle=P.apron;c.lineWidth=3;c.stroke();}
  else if(o.kind=='simone'){c.fillStyle='rgba(38,62,112,.45)';for(let k=-15;k<18;k+=12){c.fillRect(k,top,5,lt-top+6);c.fillRect(-17,top+4+k+15,34,5);}
    c.strokeStyle='rgba(255,255,255,.55)';c.lineWidth=1;for(let k=-11;k<18;k+=12){c.beginPath();c.moveTo(k,top);c.lineTo(k,lt+6);c.moveTo(-17,top+k+25);c.lineTo(17,top+k+25);c.stroke();}
    c.beginPath();c.moveTo(0,top+8);c.lineTo(0,lt+6);c.strokeStyle='#2f4f86';c.lineWidth=1.6;c.stroke();[top+16,top+26,top+36].forEach(by=>{C(c,0,by,1.5);c.fillStyle='#fff';c.fill();});
    [-1,1].forEach(d=>{c.beginPath();c.moveTo(d*1,top);c.lineTo(d*9,top);c.lineTo(d*5,top+9);c.closePath();c.fillStyle='#4a74b0';c.fill();c.strokeStyle=OL;c.lineWidth=1.5;c.stroke();});}
  else if(o.kind=='silvia'){c.beginPath();c.moveTo(0,top+10);c.lineTo(0,lt+6);c.strokeStyle='#9a2f2a';c.lineWidth=2;c.stroke();
    c.strokeStyle='#a83a34';c.lineWidth=1.6;[-1,1].forEach(d=>{c.beginPath();c.moveTo(d*16,top+24);c.lineTo(d*6,top+24);c.stroke();});}
  c.restore();rr(c,-17,top,34,lt-top+6,10);c.lineWidth=2.8;c.strokeStyle=OL;c.stroke();
  rr(c,-4,top-7,8,9,2);c.fillStyle=P.skin;c.fill();
  if(o.kind=='lucy'){E(c,0,top+1,13,6);fs(c,P.scarf,2.2);rr(c,3,top+2,7,17,3);fs(c,P.scarf,2);}
  if(o.kind=='silvia'){E(c,0,top+1,15,8);fs(c,P.scarf,2.2);rr(c,-9,top+3,8,20,3);fs(c,P.scarf,2);}
  if(o.kind=='luisa'){for(let a=.85;a<=2.15;a+=.13){C(c,Math.cos(a*Math.PI)*16,hy-2+Math.sin(a*Math.PI)*15,6.5);fs(c,P.hair,2);}}
  if(o.kind=='lucy'){rr(c,-21,hy-18,42,32,14);fs(c,P.hair,2.4);}
  else if(o.kind=='mile'){rr(c,-22,hy-18,44,48,15);fs(c,P.hair,2.4);}
  else if(o.kind=='silvia'){rr(c,-21,hy-17,42,35,14);fs(c,P.hair,2.4);}
  else{C(c,-17,hy+2,4);fs(c,P.skin,2);C(c,17,hy+2,4);fs(c,P.skin,2);}
  C(c,0,hy,17);fs(c,P.skin,2.8);
  if(o.kind=='gian'){
    c.beginPath();c.arc(0,hy,18,Math.PI*1.08,Math.PI*1.92);c.arc(0,hy-3,12,Math.PI*1.85,Math.PI*1.15,true);c.closePath();fs(c,P.hair,2.2);
    E(c,-15,hy-4,4.5,8);fs(c,P.hair,2);E(c,15,hy-4,4.5,8);fs(c,P.hair,2);
    c.strokeStyle='#d8d8d8';c.lineWidth=2.4;[[-9,-6],[4,-6]].forEach(([a])=>{c.beginPath();c.moveTo(a,hy-6);c.lineTo(a+5,hy-7);c.stroke();});
  }else if(o.kind=='gianco'){
    E(c,-15.5,hy-1,4,7);fs(c,P.hair,2);E(c,15.5,hy-1,4,7);fs(c,P.hair,2);
    c.beginPath();c.arc(-4,hy-6,8,Math.PI*1.15,Math.PI*1.55);c.strokeStyle='rgba(255,255,255,.75)';c.lineWidth=2.5;c.stroke();
    c.strokeStyle='#cfcfcf';c.lineWidth=2.4;[[-9],[4]].forEach(([a])=>{c.beginPath();c.moveTo(a,hy-5);c.lineTo(a+5,hy-6);c.stroke();});
    if(o.hat)alpineHat(c,0,hy-12,1);
  }else if(o.kind=='lucy'){
    c.beginPath();c.moveTo(-18,hy+3);c.quadraticCurveTo(-20,hy-20,0,hy-19);c.quadraticCurveTo(19,hy-19,18,hy+4);c.quadraticCurveTo(12,hy-8,3,hy-9);c.quadraticCurveTo(-8,hy-6,-18,hy+3);c.closePath();fs(c,P.hair,2.5);
    c.beginPath();c.moveTo(-10,hy-14);c.quadraticCurveTo(0,hy-17,9,hy-13);c.strokeStyle='#b0573a';c.lineWidth=2;c.stroke();
  }else if(P.beard){const bl=o.kind=='simone'?.75:1;
    if(o.kind=='simone'){c.beginPath();c.arc(-4,hy-6,8,Math.PI*1.15,Math.PI*1.55);c.strokeStyle='rgba(255,255,255,.75)';c.lineWidth=2.5;c.stroke();}
    else{c.beginPath();c.arc(0,hy,17.5,Math.PI*1.02,Math.PI*1.98);c.quadraticCurveTo(8,hy-9,0,hy-10);c.quadraticCurveTo(-9,hy-9,-17.5,hy-1);c.closePath();fs(c,P.hair,2.2);}
    c.beginPath();c.moveTo(-15,hy-1);c.quadraticCurveTo(-18,hy+16*bl,-8,hy+24*bl);c.quadraticCurveTo(0,hy+29*bl,8,hy+24*bl);c.quadraticCurveTo(18,hy+16*bl,15,hy-1);c.quadraticCurveTo(13,hy+9,7,hy+5);c.quadraticCurveTo(0,hy+3,-7,hy+5);c.quadraticCurveTo(-13,hy+9,-15,hy-1);c.closePath();fs(c,P.beard,2.2);
    c.strokeStyle=P.beard2;c.lineWidth=1.6;[[-8,hy+14],[0,hy+19],[8,hy+14],[-4,hy+22],[4,hy+22]].forEach(([a,b])=>{if(b-hy<24*bl){c.beginPath();c.moveTo(a,b);c.lineTo(a+1,b+3);c.stroke();}});
    c.beginPath();c.moveTo(-9,hy+7);c.quadraticCurveTo(0,hy+3,9,hy+7);c.quadraticCurveTo(0,hy+9,-9,hy+7);c.fillStyle=P.must;c.fill();
  }else if(o.kind=='mile'){
    c.beginPath();c.moveTo(-17,hy-1);c.quadraticCurveTo(-19,hy-20,0,hy-19);c.quadraticCurveTo(19,hy-20,17,hy-1);c.lineTo(15,hy-5);c.lineTo(15,hy-7);c.lineTo(-15,hy-7);c.lineTo(-15,hy-5);c.closePath();fs(c,P.hair,2.4);
    c.beginPath();c.moveTo(-8,hy-15);c.quadraticCurveTo(0,hy-18,8,hy-15);c.strokeStyle='#5a4646';c.lineWidth=2;c.stroke();
    [[-16],[16]].forEach(([d])=>{C(c,d,hy+9,3);c.strokeStyle='#e0b23a';c.lineWidth=1.8;c.stroke();});
  }else if(o.kind=='silvia'){
    c.beginPath();c.moveTo(-18,hy+4);c.quadraticCurveTo(-20,hy-20,0,hy-19);c.quadraticCurveTo(19,hy-19,18,hy+6);c.quadraticCurveTo(12,hy-6,-1,hy-9);c.quadraticCurveTo(-10,hy-8,-18,hy+4);c.closePath();fs(c,P.hair,2.5);
    c.beginPath();c.moveTo(-6,hy-15);c.quadraticCurveTo(4,hy-17,12,hy-11);c.strokeStyle='#7a5238';c.lineWidth=2;c.stroke();
  }else{[[-8,-13],[0,-15],[8,-13]].forEach(([a,b])=>{C(c,a,hy+b,6);fs(c,P.hair,2);});}
  const squint=o.kind=='luisa'&&!o.glasses;
  [[-7.5],[7.5]].forEach(([ex])=>{if(squint){c.beginPath();c.moveTo(ex-3,hy+1);c.lineTo(ex+3,hy+1);c.strokeStyle=OL;c.lineWidth=2.4;c.stroke();}
    else{E(c,ex,hy+1,2.2,2.8);c.fillStyle='#2b2026';c.fill();C(c,ex-.7,hy,.8);c.fillStyle='#fff';c.fill();}});
  if(o.kind=='gian')specs(c,hy+1,'#333');
  if(o.kind=='giulio')specs(c,hy+1,'#7a3b2e');
  if(o.kind=='luisa'&&o.glasses)specs(c,hy+1,'#d9534f');
  if(o.headGlasses)specs(c,hy-13,'#d9534f');
  if(!P.beard){E(c,-11,hy+7,3.4,2);E(c,11,hy+7,3.4,2);c.fillStyle='rgba(255,110,140,.45)';c.fill();}
  if(o.kind=='mile'){c.beginPath();c.moveTo(-6,hy+6);c.quadraticCurveTo(0,hy+15,6,hy+6);c.closePath();fs(c,'#fff',1.8);}
  else if(P.beard){c.beginPath();c.arc(0,hy+8,4,.15*Math.PI,.85*Math.PI);c.strokeStyle='#7a3b35';c.lineWidth=2;c.stroke();}
  else{c.beginPath();c.arc(0,hy+7,5,.18*Math.PI,.82*Math.PI);c.strokeStyle='#a5524a';c.lineWidth=2;c.stroke();}
  if(o.book){const by=top+34;rr(c,-19,by-14,38,24,3);fs(c,'#4f8fd8',2.4);
    [-1,1].forEach(d=>{c.beginPath();c.moveTo(0,by-10);c.quadraticCurveTo(d*8,by-14,d*17,by-11);c.lineTo(d*17,by+7);c.quadraticCurveTo(d*8,by+4,0,by+8);c.closePath();fs(c,'#fffaf0',1.8);
      c.strokeStyle='#c9bfae';c.lineWidth=1.2;[-4,0,4].forEach(k=>{c.beginPath();c.moveTo(d*4,by+k-1);c.lineTo(d*14,by+k-1);c.stroke();});});
    C(c,-17,by+4,4.5);fs(c,P.skin,2);C(c,17,by+4,4.5);fs(c,P.skin,2);}
  c.restore();
}

/* ---------- livelli e stato ---------- */
const LEVELS=[];let L=null,S=null;
let trail=[],target=null,ptrDown=false,keys={},floats=[],parts=[],T=0,dlg=null,voice=true,ready={},hintCD=0,endTimer=0;
const daisySVG=on=>`<svg viewBox="0 0 26 26" aria-hidden="true">${[...Array(8)].map((_,i)=>`<ellipse cx="${13+Math.cos(i*Math.PI/4)*6.5}" cy="${13+Math.sin(i*Math.PI/4)*6.5}" rx="5" ry="2.6" transform="rotate(${i*45} ${13+Math.cos(i*Math.PI/4)*6.5} ${13+Math.sin(i*Math.PI/4)*6.5})" fill="${on?'#fff':'#e4d6b8'}" stroke="#3b2a35" stroke-width="1.3"/>`).join('')}<circle cx="13" cy="13" r="4" fill="${on?'#f6c830':'#cbbf9f'}" stroke="#3b2a35" stroke-width="1.3"/></svg>`;

/* ---------- audio ---------- */
let AC=null;
function tone(f,d,delay,type){if(!AC)return;try{const o=AC.createOscillator(),g=AC.createGain();o.type=type||'triangle';o.frequency.value=f;const t0=AC.currentTime+(delay||0);g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(.18,t0+.02);g.gain.exponentialRampToValueAtTime(.0001,t0+d);o.connect(g).connect(AC.destination);o.start(t0);o.stop(t0+d+.05);}catch(e){}}
const sfx={pick:()=>{tone(660,.15);tone(880,.15,.08);tone(1320,.22,.16);},pop:()=>tone(420,.12,0,'sine'),win:()=>[523,659,784,1046,1318].forEach((f,i)=>tone(f,.3,i*.11)),meow:()=>{tone(700,.1,0,'sine');tone(520,.2,.08,'sine');}};
const music=new Audio();music.loop=true;music.preload='auto';
const VOL=.35;music.volume=VOL;
let musicOn=true;try{musicOn=localStorage.getItem('musica')!=='no';}catch(e){}
function setMusic(on){musicOn=on;try{localStorage.setItem('musica',on?'si':'no');}catch(e){}
  const b=document.getElementById('bMus');b.classList.toggle('on',on);b.setAttribute('aria-pressed',on);
  if(on&&S&&S.started)music.play().catch(()=>{});else music.pause();}

/* ---------- voci ---------- */
let voices=[],chosen=null;
function voiceScore(v){const n=v.name.toLowerCase();let s=0;
  if(/natural|neural|online/.test(n))s+=50;if(/premium/.test(n))s+=45;if(/enhanced|migliorat/.test(n))s+=35;if(/google/.test(n))s+=30;
  if(/alice|federica|elsa|isabella|paola|emma|silvia|giulia/.test(n))s+=8;
  if(/compact|espeak/.test(n))s-=40;if(v.localService===false)s+=5;return s;}
function loadVoices(){try{voices=speechSynthesis.getVoices().filter(v=>/^it/i.test(v.lang)).sort((a,b)=>voiceScore(b)-voiceScore(a));}catch(e){voices=[];}chosen=voices[0]||null;}
try{loadVoices();speechSynthesis.onvoiceschanged=loadVoices;}catch(e){}
const VOX={emma:{pitch:.95,rate:.82},girl:{pitch:1.3,rate:.95},luisa:{pitch:.95,rate:.85},gian:{pitch:.7,rate:.85},lucy:{pitch:1,rate:.85},gianco:{pitch:.75,rate:.85},giulio:{pitch:.8,rate:.9},mile:{pitch:1.05,rate:.9},simone:{pitch:.9,rate:.92},silvia:{pitch:1.05,rate:.9},cat:{pitch:1.15,rate:.9}};
/* Ogni frase registrata: audio/voce/<prefisso><numero>.mp3, nell'ordine di queste liste */
const PREFIX={emma:'e',girl:'m',luisa:'l',gian:'g',lucy:'y',gianco:'k',giulio:'u',mile:'i',simone:'o',silvia:'s'};
const LINES={
  emma:['CIAO MACI!','CIAO PIUMI!','OGGI È LA FESTA DI MARGHERITA.','TROVA 3 MARGHERITE!','NON HAI ANCORA MARGHERITE.','HAI 1 MARGHERITA.','HAI 2 MARGHERITE.','NE MANCANO 3!','NE MANCANO 2!','NE MANCA 1!','BRAVO! CHE BELLE!','BRAVA! CHE BELLE!','SERVE UN NASTRO.','CERCA SOTTO IL VASO!','IL NASTRO È SOTTO UN VASO.','PROVA TUTTI I VASI!','CORRI!','PORTA I FIORI A MARGHERITA!','MIAO! CHE BELLA FESTA!'],
  girl:['CIAO MACI!','CIAO PIUMI!',"DOV'È NONNA EMMA?",'CIAO MACI E PIUMI!','CHE BELLE MARGHERITE!','GRAZIE! VI VOGLIO BENE!','CHE BELLA CORONCINA!','AIUTA I NONNI!','PIUMI! GIOCHIAMO?','PRENDI IL GOMITOLO!','ANDIAMO A MERENDA!','MACI! GIOCHIAMO?'],
  luisa:['CIAO PIUMI!','NON TROVO I MIEI OCCHIALI.','MI AIUTI A CERCARLI?','CERCA BENE, PIUMI!','I MIEI OCCHIALI!','GRAZIE PIUMI! ORA CI VEDO.','VAI DAL NONNO GIAN.','GIOCA CON MARGHERITA!','VIENI AL TAVOLO!','ECCO TÈ E BISCOTTI!','BRAVA PIUMI!','TUTTI A MERENDA!',
    'CIAO MACI!','CERCA BENE, MACI!','GRAZIE MACI! ORA CI VEDO.','BRAVO MACI!','GRAZIE PIUMI!','GRAZIE MACI!'],
  gian:['CIAO PIUMI!','VAI DALLA NONNA LUISA.','CERCA BENE!','COSA CERCHI, PIUMI?','GLI OCCHIALI?','OH! SONO SULLA MIA TESTA!','PORTA GLI OCCHIALI ALLA NONNA!','NON TROVO IL TELECOMANDO.','CERCA SOTTO IL DIVANO!','IL TELECOMANDO! BRAVA PIUMI!','MARGHERITA VUOLE GIOCARE.','VAI DA MARGHERITA!','TUTTI A MERENDA!',
    'CIAO MACI!','COSA CERCHI, MACI?','IL TELECOMANDO! BRAVO MACI!'],
  lucy:['CIAO MACI!','FACCIAMO UNA TORTA DI MIRTILLI.','RACCOGLI 3 MIRTILLI!','CERCA I CESPUGLI BLU!','CHE BEI MIRTILLI!','GRAZIE MACI!','VAI DAL NONNO GIANCO.','LA TORTA È NEL FORNO.','ECCO LA TORTA DI MIRTILLI!','BRAVO MACI!','TUTTI A MERENDA!','CIAO PIUMI!','GRAZIE PIUMI!','BRAVA PIUMI!'],
  gianco:['CIAO MACI!','VAI DALLA NONNA LUCY.','IL VENTO HA PRESO IL MIO CAPPELLO!','MI AIUTI A PRENDERLO?','CORRI, MACI!','IL MIO CAPPELLO!','GRAZIE MACI!','LA TORTA È PRONTA!','TUTTI A MERENDA!','CIAO PIUMI!','CORRI, PIUMI!','GRAZIE PIUMI!'],
  giulio:['CIAO MACI!',"MI AIUTI NELL'ORTO?",'RACCOGLI 3 CAROTE!','CERCA LE FOGLIE GRANDI!','CHE BELLE CAROTE!','GRAZIE MACI!','VAI DALLA ZIA MILE.','TUTTI A TAVOLA!','CIAO PIUMI!','GRAZIE PIUMI!'],
  mile:['CIAO MACI!','VAI DALLO ZIO GIULIO.','LE GALLINE SONO SCAPPATE!','RIPORTALE NEL POLLAIO!','CORRI, MACI!','GRAZIE MACI!','PRENDI LE UOVA!','CHE BELLE UOVA!','FACCIAMO LA FRITTATA.','ECCO LA FRITTATA!','BRAVO MACI!','CIAO PIUMI!','CORRI, PIUMI!','GRAZIE PIUMI!','BRAVA PIUMI!'],
  simone:['CIAO MACI!','VAI DALLA ZIA SILVIA.','I MIEI ROBOTTINI SONO SCAPPATI!','MI AIUTI A PRENDERLI?','CORRI, MACI!','I MIEI ROBOTTINI!','GRAZIE MACI!','GUARDA IL COMPUTER!','CIAO PIUMI!','CORRI, PIUMI!','GRAZIE PIUMI!'],
  silvia:['CIAO MACI!','SONO CADUTI I MIEI LIBRI!','TROVA 3 LIBRI!','CERCA BENE IN CASA!','ECCO I MIEI LIBRI!','GRAZIE MACI!','VAI DALLO ZIO SIMONE.','TUTTI SUL DIVANO!','VI LEGGO UNA STORIA.',"C'ERA UNA VOLTA DUE GATTINI: MACI E PIUMI!",'CIAO PIUMI!','GRAZIE PIUMI!']
};
let clip=null;
function stopVoice(){try{speechSynthesis.cancel();}catch(e){}if(clip){clip.pause();clip=null;}}
function say(t,who){if(!voice)return;stopVoice();
  const k=(LINES[who]||[]).indexOf(t);
  if(k>=0){clip=new Audio('audio/voce/'+PREFIX[who]+String(k+1).padStart(2,'0')+'.mp3');clip.play().catch(()=>ttsSay(t,who));return;}
  ttsSay(t,who);}
function ttsSay(t,who){try{speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(t.toLowerCase().replace(/!/g,'! ').replace(/\./g,'. '));u.lang='it-IT';if(chosen)u.voice=chosen;
  const p=VOX[who]||VOX.cat;u.pitch=p.pitch;u.rate=p.rate;speechSynthesis.speak(u);}catch(e){}}

/* ---------- dialoghi ---------- */
const NAMES={emma:'NONNA EMMA',girl:'MARGHERITA',luisa:'NONNA LUISA',gian:'NONNO GIAN',lucy:'NONNA LUCY',gianco:'NONNO GIANCO',giulio:'ZIO GIULIO',mile:'ZIA MILE',simone:'ZIO SIMONE',silvia:'ZIA SILVIA'};
const PORTRAIT={
  emma:p=>{p.setTransform(2.6,0,0,2.6,0,0);drawCat(p,30,74,CATS.emma,{sit:true,f:1,t:0,noShadow:true});},
  girl:p=>{p.setTransform(2.4,0,0,2.4,0,0);drawGirl(p,38,148,{t:0,noShadow:true,crown:S.crown});},
  luisa:p=>{p.setTransform(2.2,0,0,2.2,0,0);drawPerson(p,42,150,{kind:'luisa',glasses:S.luisaGlasses,noShadow:true});},
  gian:p=>{p.setTransform(2.2,0,0,2.2,0,0);drawPerson(p,42,150,{kind:'gian',headGlasses:S.gianHead,noShadow:true});},
  lucy:p=>{p.setTransform(2.2,0,0,2.2,0,0);drawPerson(p,42,150,{kind:'lucy',noShadow:true});},
  gianco:p=>{p.setTransform(2.2,0,0,2.2,0,0);drawPerson(p,42,158,{kind:'gianco',hat:S.gianHat,noShadow:true});},
  giulio:p=>{p.setTransform(2.2,0,0,2.2,0,0);drawPerson(p,42,145,{kind:'giulio',noShadow:true});},
  mile:p=>{p.setTransform(2.2,0,0,2.2,0,0);drawPerson(p,42,150,{kind:'mile',noShadow:true});},
  simone:p=>{p.setTransform(2.2,0,0,2.2,0,0);drawPerson(p,42,145,{kind:'simone',noShadow:true});},
  silvia:p=>{p.setTransform(2.2,0,0,2.2,0,0);drawPerson(p,42,150,{kind:'silvia',noShadow:true});}
};
function openDialog(who,pages,done){
  dlg={who,pages,i:0,done};target=null;music.volume=VOL*.35;
  document.getElementById('dlg').hidden=false;
  document.getElementById('dName').textContent=NAMES[who];
  const pctx=document.getElementById('dlgPic').getContext('2d');
  pctx.setTransform(1,0,0,1,0,0);pctx.clearRect(0,0,184,184);PORTRAIT[who](pctx);
  showPage();
}
function showPage(){const t=dlg.pages[dlg.i];document.getElementById('dText').textContent=t;say(t,dlg.who);sfx.meow();document.getElementById('dOk').focus({preventScroll:true});}
function nextPage(){if(!dlg)return;dlg.i++;if(dlg.i<dlg.pages.length){showPage();return;}
  const d=dlg.done;dlg=null;music.volume=VOL;document.getElementById('dlg').hidden=true;stopVoice();if(d)d();}
document.getElementById('dOk').onclick=nextPage;
document.getElementById('dSay').onclick=()=>{if(dlg){const v=voice;voice=true;say(dlg.pages[dlg.i],dlg.who);voice=v;}};

/* ---------- aiuti per i livelli ---------- */
const other=()=>S.cur=='maci'?'piumi':'maci';
const N=()=>CATS[S.cur].name;
const BRAV=()=>S.cur=='piumi'?'BRAVA':'BRAVO';
function setState(n){S.state=n;updateHUD();}
function floatText(x,y,txt,col){floats.push({x,y,txt,t:0,col:col||'#fff'});}
function burst(x,y,n,cols){for(let i=0;i<(RM?Math.ceil(n/4):n);i++){const a=R()*TAU,s=60+R()*160;parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-120,life:1+R()*.6,col:cols[i%cols.length],r:3+R()*4,rot:R()*6});}}
const confetti=(x,y)=>burst(x,y,90,['#ff6fa8','#ffc93d','#5cbf60','#6a8ff0','#fff']);
function proximity(key,x,y,fn,near){const d=Math.hypot(x-S.p.x,y-S.p.y);if(d>(near||70)+40)ready[key]=true;if(d<(near||70)&&ready[key]!==false){ready[key]=false;fn();}}
function finish(msg,delay){S.done=msg;endTimer=delay||2.2;}
function nearest(list,yoff){let best=null,bd=1e9;list.forEach(o=>{const d=Math.hypot(o.x-S.p.x,o.y-S.p.y);if(d<bd){bd=d;best=o;}});return best?{x:best.x,y:best.y-(yoff||0)}:null;}

function updateHUD(){
  document.getElementById('questText').textContent=L.quests[S.state];
  document.getElementById('questProg').innerHTML=L.progress?L.progress():'';
  ['maci','piumi'].forEach(k=>{const b=document.getElementById(k=='maci'?'bMaci':'bPiumi');b.hidden=!L.party.includes(k);b.classList.toggle('on',S.cur==k);});
}

/* ---------- input ---------- */
function toWorld(cx,cy){const cam=camera();return{x:cx/Z+cam.x,y:cy/Z+cam.y};}
cv.addEventListener('pointerdown',e=>{if(!S.started||dlg)return;ptrDown=true;target=toWorld(e.clientX,e.clientY);});
cv.addEventListener('pointermove',e=>{if(ptrDown&&!dlg)target=toWorld(e.clientX,e.clientY);});
addEventListener('pointerup',()=>ptrDown=false);
addEventListener('keydown',e=>{
  if(dlg&&(e.key=='Enter'||e.key==' ')){e.preventDefault();nextPage();return;}
  keys[e.key.toLowerCase()]=true;if(e.key.startsWith('Arrow'))e.preventDefault();});
addEventListener('keyup',e=>keys[e.key.toLowerCase()]=false);
function switchTo(k){if(S.cur==k||!L.party.includes(k))return;S.cur=k;const a={...S.p};S.p.x=S.q.x;S.p.y=S.q.y;S.q.x=a.x;S.q.y=a.y;trail=[];target=null;sfx.meow();floatText(S.p.x,S.p.y-80,CATS[k].name+'!');updateHUD();}
document.getElementById('bMaci').onclick=()=>switchTo('maci');
document.getElementById('bPiumi').onclick=()=>switchTo('piumi');
document.getElementById('bMus').onclick=()=>setMusic(!musicOn);
document.getElementById('stars').innerHTML=[0,1,2].map(()=>'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8z" fill="#ffc93d" stroke="#3b2a35" stroke-width="1.6" stroke-linejoin="round"/></svg>').join('');

/* ---------- avvio dei livelli ---------- */
function startLevel(i){
  L=LEVELS[i];
  S=Object.assign({lvl:i,started:false,state:0,cur:L.party[0],done:null,
    p:{...L.start.p,f:1,moving:false},q:{...(L.start.q||L.start.p),f:1,moving:false}},L.fresh());
  trail=[];target=null;floats=[];parts=[];ready={};endTimer=0;
  if(!music.src.endsWith(L.music)){music.src=L.music;}
  updateHUD();drawPortraits();
}
function play(i){
  try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();}catch(e){}
  startLevel(i);S.started=true;
  document.getElementById('start').hidden=true;document.getElementById('end').hidden=true;
  sfx.meow();setMusic(musicOn);
}
document.getElementById('again').onclick=()=>play(S.lvl);
document.getElementById('next').onclick=()=>play(Math.min(S.lvl+1,LEVELS.length-1));
document.getElementById('menu').onclick=()=>{document.getElementById('end').hidden=true;document.getElementById('start').hidden=false;music.pause();S.started=false;};
function showEnd(){
  document.getElementById('endRibbon').textContent='LIVELLO '+(S.lvl+1)+' COMPLETATO';
  document.getElementById('endText').textContent=S.done;
  const nx=document.getElementById('next');nx.hidden=S.lvl+1>=LEVELS.length;nx.textContent='LIVELLO '+(S.lvl+2);
  document.getElementById('end').hidden=false;
}

/* ---------- aggiornamento ---------- */
function camera(){const vw=VW/Z,vh=VH/Z;
  let x=S.p.x-vw/2,y=S.p.y-vh/2-20;
  x=vw>=L.ww?(L.ww-vw)/2:Math.max(0,Math.min(L.ww-vw,x));
  y=vh>=L.wh?(L.wh-vh)/2:Math.max(0,Math.min(L.wh-vh,y));return{x,y};}
function update(dt){
  T+=dt;hintCD-=dt;
  if(L.tick)L.tick(dt);
  floats.forEach(f=>f.t+=dt);floats=floats.filter(f=>f.t<1.8);
  parts.forEach(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=380*dt;p.life-=dt;p.rot+=dt*6;});parts=parts.filter(p=>p.life>0);
  if(endTimer>0){endTimer-=dt;if(endTimer<=0)showEnd();}
  const p=S.p;let dx=0,dy=0;
  if(S.started&&!dlg&&!S.done){
    if(keys.arrowleft||keys.a)dx-=1;if(keys.arrowright||keys.d)dx+=1;if(keys.arrowup||keys.w)dy-=1;if(keys.arrowdown||keys.s)dy+=1;
    if(dx||dy)target=null;
    else if(target){const ex=target.x-p.x,ey=target.y-p.y,d=Math.hypot(ex,ey);if(d>6){dx=ex/d;dy=ey/d;}else target=null;}
  }
  const len=Math.hypot(dx,dy);p.moving=len>0;
  if(len){dx/=len;dy/=len;const sp=180*dt;const nx=p.x+dx*sp,ny=p.y+dy*sp;let moved=false;
    if(!L.blocked(nx,p.y)){p.x=nx;moved=true;}if(!L.blocked(p.x,ny)){p.y=ny;moved=true;}
    if(!moved){target=null;p.moving=false;}
    if(Math.abs(dx)>.15)p.f=dx>0?1:-1;
    const last=trail[trail.length-1];if(!last||Math.hypot(last.x-p.x,last.y-p.y)>4)trail.push({x:p.x,y:p.y});if(trail.length>60)trail.shift();}
  if(L.party.length>1){const q=S.q,tgt=trail.length>9?trail[trail.length-9]:null;
    if(tgt&&Math.hypot(tgt.x-q.x,tgt.y-q.y)>2){const ex=tgt.x-q.x,ey=tgt.y-q.y,d=Math.hypot(ex,ey),st=Math.min(d,190*dt);q.x+=ex/d*st;q.y+=ey/d*st;q.moving=true;if(Math.abs(ex)>1)q.f=ex>0?1:-1;}else q.moving=false;}
  if(!S.started||dlg||S.done)return;
  L.update(dt);
}

/* ---------- disegno ---------- */
function render(){
  const cam=camera(),c=ctx;
  c.setTransform(DPR,0,0,DPR,0,0);c.fillStyle=L.bg;c.fillRect(0,0,VW,VH);
  c.setTransform(DPR*Z,0,0,DPR*Z,-cam.x*DPR*Z,-cam.y*DPR*Z);
  c.lineCap='round';c.lineJoin='round';
  L.drawBack(c);
  const ents=[];L.ents(c,ents);
  if(L.party.length>1)ents.push([S.q.y,()=>drawCat(c,S.q.x,S.q.y,CATS[other()],{f:S.q.f,t:T,moving:S.q.moving,seed:2})]);
  ents.push([S.p.y,()=>{drawCat(c,S.p.x,S.p.y,CATS[S.cur],{f:S.p.f,t:T,moving:S.p.moving,seed:1});if(L.carry)L.carry(c,S.p.x,S.p.y);}]);
  ents.sort((a,b)=>a[0]-b[0]).forEach(e=>e[1]());
  if(L.drawFront)L.drawFront(c);
  if(target&&S.started){E(c,target.x,target.y,14,6);c.strokeStyle='rgba(255,255,255,.8)';c.lineWidth=3;c.stroke();}
  parts.forEach(p=>{c.save();c.translate(p.x,p.y);c.rotate(p.rot);c.globalAlpha=Math.min(1,p.life*1.5);c.fillStyle=p.col;c.fillRect(-p.r,-p.r/2,p.r*2,p.r);c.restore();});
  c.textAlign='center';c.font='700 24px Fredoka, "Trebuchet MS", sans-serif';c.lineJoin='round';
  floats.forEach(f=>{const a=Math.max(0,1-Math.max(0,f.t-1)/.8);c.globalAlpha=a;const y=f.y-f.t*26;c.lineWidth=6;c.strokeStyle=OL;c.strokeText(f.txt,f.x,y);c.fillStyle=f.col;c.fillText(f.txt,f.x,y);});
  c.globalAlpha=1;
  const g=S.started&&!S.done?L.guide():null;
  if(g&&!dlg){
    c.setTransform(DPR,0,0,DPR,0,0);
    let sx=(g.x-cam.x)*Z,sy=(g.y-cam.y)*Z;const m=56,top=110;
    const inside=sx>m&&sx<VW-m&&sy>top&&sy<VH-m;
    let ang=Math.PI/2;
    if(!inside){const cx=VW/2,cy=VH/2;ang=Math.atan2(sy-cy,sx-cx);sx=Math.max(m,Math.min(VW-m,sx));sy=Math.max(top,Math.min(VH-m,sy));}
    else sy+=RM?0:Math.sin(T*6)*6-6;
    c.save();c.translate(sx,sy);c.rotate(ang);c.beginPath();c.moveTo(16,0);c.lineTo(-10,-14);c.lineTo(-4,0);c.lineTo(-10,14);c.closePath();
    c.fillStyle='#ffc93d';c.fill();c.lineWidth=3.5;c.strokeStyle=OL;c.lineJoin='round';c.stroke();c.restore();
  }
}
function drawPortraits(){
  [['bMaci','maci'],['bPiumi','piumi']].forEach(([id,k])=>{const p=document.querySelector('#'+id+' canvas').getContext('2d');p.setTransform(1,0,0,1,0,0);p.clearRect(0,0,104,104);p.setTransform(1.55,0,0,1.55,0,0);drawCat(p,30,62,CATS[k],{f:1,t:0,sit:true,noShadow:true});});
}
