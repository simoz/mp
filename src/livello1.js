/* ===== Livello 1: il giardino di nonna Emma ===== */
(()=>{
const WW=1400,WH=1000;
const house={x:140,y:200,w:280,h:135};
const pond={x:900,y:305,rx:170,ry:100};
const trees=[[640,130],[770,95],[1110,130],[1270,250],[1230,560],[80,640],[170,840],[620,720],[990,840],[1320,820],[60,260],[520,95]].map(([x,y])=>({x,y}));
const emma={x:500,y:360},girl={x:1210,y:890};
const DAISY_POS=[[700,530],[1090,455],[300,820]];
const VASE_POS=[[190,445],[330,470],[600,470],[470,565]];
const pathPts=[[280,345],[300,620],[900,600],[1225,990]];
const tufts=[],flowers=[],bushes=[];
for(let i=0;i<480;i++)tufts.push([R()*WW,R()*WH]);
for(let i=0;i<80;i++){const x=60+R()*(WW-120),y=80+R()*(WH-130);
  if(x>house.x-30&&x<house.x+house.w+30&&y>house.y-140&&y<house.y+house.h+20)continue;
  if(((x-pond.x)/(pond.rx+20))**2+((y-pond.y)/(pond.ry+20))**2<1)continue;
  if(DAISY_POS.some(([a,b])=>Math.hypot(a-x,b-y)<60))continue;
  flowers.push([x,y,FCOL[i%4]]);}
for(let i=0;i<16;i++){const side=i%4;let x,y;
  if(side==0){x=80+R()*(WW-160);y=62;}else if(side==1){x=52;y=120+R()*(WH-240);}else if(side==2){x=WW-52;y=120+R()*(WH-240);}else{x=80+R()*1000;y=WH-40;}
  bushes.push([x,y,18+R()*10]);}

function drawTree(c,x,y){
  E(c,x,y,42,12);c.fillStyle='rgba(40,30,40,.18)';c.fill();
  rr(c,x-8,y-36,16,36,4);fs(c,'#8a5a3b');
  const cs=[[x-22,y-58,26],[x+21,y-60,26],[x,y-84,31]];
  cs.forEach(([a,b,r])=>{C(c,a,b,r);c.lineWidth=6;c.strokeStyle=OL;c.stroke();});
  cs.forEach(([a,b,r])=>{C(c,a,b,r);c.fillStyle='#4fae4a';c.fill();});
  C(c,x-9,y-92,12);c.fillStyle='#7fcf5a';c.fill();C(c,x+20,y-66,7);c.fill();
  C(c,x-24,y-52,3);C(c,x+8,y-76,3);c.fillStyle='#e8524a';c.fill();
}
function drawHouse(c){
  const {x,y,w,h}=house;
  E(c,x+w/2,y+h+4,w/2+20,14);c.fillStyle='rgba(40,30,40,.18)';c.fill();
  rr(c,x+214,y-118,26,84,3);fs(c,'#b0624a');
  c.strokeStyle='#8f4a36';c.lineWidth=2;[-104,-90].forEach(dy=>{c.beginPath();c.moveTo(x+216,y+dy);c.lineTo(x+238,y+dy);c.stroke();});
  rr(c,x+209,y-124,36,10,3);fs(c,'#c4735a');
  rr(c,x,y-10,w,h+10,4);fs(c,'#f6e1b8');
  c.strokeStyle='rgba(59,42,53,.18)';c.lineWidth=2;for(let i=1;i<6;i++){c.beginPath();c.moveTo(x+4,y-10+i*24);c.lineTo(x+w-4,y-10+i*24);c.stroke();}
  c.beginPath();c.moveTo(x-28,y+4);c.lineTo(x+w/2,y-128);c.lineTo(x+w+28,y+4);c.closePath();fs(c,'#e0644a');
  c.save();c.beginPath();c.moveTo(x-28,y+4);c.lineTo(x+w/2,y-128);c.lineTo(x+w+28,y+4);c.closePath();c.clip();
  c.strokeStyle='#b84a36';c.lineWidth=2.5;for(let r=0;r<5;r++){const yy=y-100+r*26;for(let k=-8;k<10;k++){c.beginPath();c.arc(x+w/2+k*28+(r%2)*14,yy,14,0,Math.PI);c.stroke();}}c.restore();
  c.beginPath();c.moveTo(x-28,y+4);c.lineTo(x+w/2,y-128);c.lineTo(x+w+28,y+4);c.closePath();c.lineWidth=3;c.strokeStyle=OL;c.stroke();
  C(c,x+w/2,y-62,16);fs(c,'#8fd3f0');c.beginPath();c.moveTo(x+w/2-16,y-62);c.lineTo(x+w/2+16,y-62);c.moveTo(x+w/2,y-78);c.lineTo(x+w/2,y-46);c.stroke();
  c.beginPath();c.moveTo(x+115,y+h);c.lineTo(x+115,y+70);c.arc(x+140,y+70,25,Math.PI,0);c.lineTo(x+165,y+h);c.closePath();fs(c,'#9a5b3a');
  C(c,x+157,y+105,3.5);c.fillStyle=OL;c.fill();
  [[x+30],[x+w-80]].forEach(([wx])=>{rr(c,wx,y+20,50,46,5);fs(c,'#8fd3f0');c.beginPath();c.moveTo(wx+25,y+20);c.lineTo(wx+25,y+66);c.moveTo(wx,y+43);c.lineTo(wx+50,y+43);c.stroke();
    rr(c,wx-4,y+66,58,12,3);fs(c,'#a86a40');[8,20,32,44].forEach((d,i)=>{C(c,wx-1+d,y+64,5);fs(c,FCOL[i],1.5);});});
}
function drawPond(c,t){
  E(c,pond.x,pond.y,pond.rx+8,pond.ry+8);c.fillStyle='#c9b48a';c.fill();c.lineWidth=3;c.strokeStyle=OL;c.stroke();
  E(c,pond.x,pond.y,pond.rx,pond.ry);fs(c,'#4fb6e0');
  E(c,pond.x-10,pond.y-8,pond.rx-30,pond.ry-28);c.fillStyle='#74cbee';c.fill();
  c.strokeStyle='#e6f7ff';c.lineWidth=2.5;
  [[-70,-20],[30,-40],[60,30],[-30,40]].forEach(([dx,dy],i)=>{const o=RM?0:Math.sin(t*1.5+i)*4;c.beginPath();c.arc(pond.x+dx+o,pond.y+dy,10,Math.PI*1.1,Math.PI*1.9);c.stroke();});
  [[-100,10,16],[90,-20,14],[20,50,12]].forEach(([dx,dy,r])=>{c.beginPath();c.moveTo(pond.x+dx,pond.y+dy);c.arc(pond.x+dx,pond.y+dy,r,.3,TAU-.3);c.closePath();fs(c,'#5bbf5a',2.5);});
  C(c,pond.x-96,pond.y+6,5);fs(c,'#ff8fb8',2);
}
function drawVase(c,v){
  c.save();c.translate(v.x,v.y);
  E(c,0,0,20,6);c.fillStyle='rgba(40,30,40,.18)';c.fill();
  if(v.lifted){
    if(v.item=='nastro'){c.save();c.translate(0,-8);[-1,1].forEach(d=>{c.beginPath();c.moveTo(0,0);c.lineTo(d*14,-8);c.lineTo(d*14,8);c.closePath();fs(c,'#ff6fa8',2.5);});C(c,0,0,4.5);fs(c,'#ff3d8a',2.5);c.restore();}
    if(v.item=='chiocciola'){E(c,4,-5,14,5);fs(c,'#c9d77a',2.5);C(c,-2,-14,10);fs(c,'#e8b04a',2.5);c.beginPath();c.arc(-2,-14,5,0,Math.PI*1.6);c.strokeStyle=OL;c.lineWidth=2;c.stroke();
      c.beginPath();c.moveTo(14,-8);c.lineTo(17,-17);c.moveTo(12,-8);c.lineTo(12,-17);c.stroke();}
    if(v.item=='sasso'){E(c,0,-6,12,8);fs(c,'#a7a3ad',2.5);}
  }
  const lift=v.lifted?Math.min(1,v.lt*3)*54:0,wob=v.wob>0&&!RM?Math.sin(v.wob*40)*.12:0;
  c.translate(0,-lift);c.rotate(wob+(v.lifted?-.25*Math.min(1,v.lt*3):0));
  E(c,-6,-38,6,11,-.5);E(c,6,-40,6,12,.5);E(c,0,-44,5,12);c.fillStyle='#5bbf5a';c.fill();c.lineWidth=2.5;c.strokeStyle=OL;c.stroke();
  c.beginPath();c.moveTo(-12,-26);c.quadraticCurveTo(-20,-10,-10,0);c.lineTo(10,0);c.quadraticCurveTo(20,-10,12,-26);c.closePath();fs(c,'#d8794a');
  rr(c,-15,-33,30,9,3);fs(c,'#e88a58');
  c.beginPath();c.moveTo(-14,-15);c.lineTo(14,-15);c.strokeStyle='#f3b07e';c.lineWidth=3;c.stroke();
  c.restore();
}
function drawFenceRow(c,x1,y1,x2,y2){
  c.lineCap='round';
  [y1-14,y1-4].forEach(dy=>{c.beginPath();c.moveTo(x1,dy);c.lineTo(x2,dy+(y2-y1));c.strokeStyle=OL;c.lineWidth=8;c.stroke();c.strokeStyle='#d99a62';c.lineWidth=4;c.stroke();});
  const n=Math.max(1,Math.round(Math.hypot(x2-x1,y2-y1)/44));
  for(let i=0;i<=n;i++){const px=x1+(x2-x1)*i/n,py=y1+(y2-y1)*i/n;rr(c,px-5,py-24,10,26,3);fs(c,'#c98b55',2.5);}
}
function drawDaisyQuest(c,d){
  const b=RM?0:Math.sin(T*3+d.x)*3;E(c,d.x,d.y,12,4);c.fillStyle='rgba(40,30,40,.15)';c.fill();
  c.beginPath();c.moveTo(d.x,d.y);c.lineTo(d.x,d.y-18);c.strokeStyle=OL;c.lineWidth=5;c.stroke();c.strokeStyle='#4caf50';c.lineWidth=3;c.stroke();
  E(c,d.x+7,d.y-7,7,3,-.5);fs(c,'#5bbf5a',2);
  daisy(c,d.x,d.y-24-b,14,RM?0:T*.6);
  const sp=(T*2+d.x)%2;if(sp<1&&!RM){const sx=d.x+16,sy=d.y-44,k=Math.sin(sp*Math.PI)*6;c.beginPath();c.moveTo(sx,sy-k);c.lineTo(sx+k*.3,sy);c.lineTo(sx,sy+k);c.lineTo(sx-k*.3,sy);c.closePath();c.fillStyle='#fff7b0';c.fill();}
}

function talkEmma(){
  if(S.state==0)openDialog('emma',[`CIAO ${N()}!`,'OGGI È LA FESTA DI MARGHERITA.','TROVA 3 MARGHERITE!'],()=>setState(1));
  else if(S.state==1)openDialog('emma',[['NON HAI ANCORA MARGHERITE.','HAI 1 MARGHERITA.','HAI 2 MARGHERITE.'][S.count],['NE MANCANO 3!','NE MANCANO 2!','NE MANCA 1!'][S.count]]);
  else if(S.state==2)openDialog('emma',[BRAV()+'! CHE BELLE!','SERVE UN NASTRO.','CERCA SOTTO IL VASO!'],()=>setState(3));
  else if(S.state==3)openDialog('emma',['IL NASTRO È SOTTO UN VASO.','PROVA TUTTI I VASI!']);
  else if(S.state==4)openDialog('emma',['CORRI!','PORTA I FIORI A MARGHERITA!']);
  else openDialog('emma',['MIAO! CHE BELLA FESTA!']);
}
function talkGirl(){
  if(S.state==4)openDialog('girl',[`CIAO ${CATS.maci.name} E ${CATS.piumi.name}!`,'CHE BELLE MARGHERITE!','GRAZIE! VI VOGLIO BENE!'],()=>{
    S.crown=true;setState(5);sfx.win();confetti(girl.x,girl.y-110);floatText(girl.x,girl.y-150,'EVVIVA!','#ffc93d');
    finish('Margherita ha la sua coroncina di margherite.',2.2);});
  else if(S.state==5)openDialog('girl',['CHE BELLA CORONCINA!']);
  else openDialog('girl',[`CIAO ${N()}!`,'DOV\'È NONNA EMMA?']);
}

LEVELS.push({
  name:'Il giardino di nonna Emma',ww:WW,wh:WH,bg:'#5f9a44',party:['maci','piumi'],music:'audio/stage1.mp3',
  start:{p:{x:580,y:410},q:{x:540,y:432}},
  quests:['VAI DA NONNA EMMA','TROVA 3 MARGHERITE','TORNA DA NONNA EMMA','CERCA SOTTO IL VASO','PORTA I FIORI A MARGHERITA','FESTA!'],
  fresh(){const items=['nastro','chiocciola','sasso','vuoto'].sort(()=>Math.random()-.5);
    return{count:0,crown:false,daisies:DAISY_POS.map(([x,y])=>({x,y,got:false})),vases:VASE_POS.map(([x,y],i)=>({x,y,item:items[i],lifted:false,lt:0,wob:0}))};},
  progress:()=>S.state>=1?[0,1,2].map(i=>daisySVG(i<S.count)).join(''):'',
  blocked(x,y){
    if(x<55||x>WW-55||y<75||y>WH-38)return true;
    if(x>house.x-14&&x<house.x+house.w+14&&y>house.y&&y<house.y+house.h+10)return true;
    if(((x-pond.x)/(pond.rx+14))**2+((y-pond.y)/(pond.ry+12))**2<1)return true;
    for(const t of trees)if(Math.hypot(t.x-x,t.y-y)<26)return true;
    for(const v of S.vases)if(!v.lifted&&Math.hypot(v.x-x,v.y-y)<22)return true;
    return Math.hypot(emma.x-x,emma.y-y)<28||Math.hypot(girl.x-x,girl.y-y)<20;
  },
  tick(dt){S.vases.forEach(v=>{if(v.lifted)v.lt+=dt;if(v.wob>0)v.wob-=dt;});},
  update(){
    const p=S.p;
    S.daisies.forEach(d=>{if(d.got||Math.hypot(d.x-p.x,d.y-p.y)>36)return;
      if(S.state<1){if(hintCD<=0){floatText(d.x,d.y-50,'PRIMA VAI DA NONNA EMMA','#ffe9a8');hintCD=2.5;}return;}
      d.got=true;S.count++;sfx.pick();burst(d.x,d.y-12,22,['#fff','#ffe14d','#ffc93d']);floatText(d.x,d.y-50,S.count+' MARGHERIT'+(S.count==1?'A':'E')+'!');
      if(S.count>=3&&S.state==1){S.state=2;floatText(p.x,p.y-90,BRAV()+'!','#ffc93d');}updateHUD();});
    S.vases.forEach(v=>{if(v.lifted||Math.hypot(v.x-p.x,v.y-p.y)>44)return;
      if(S.state!=3){if(v.wob<=0){v.wob=.35;sfx.pop();}return;}
      v.lifted=true;v.lt=0;sfx.pop();
      floatText(v.x,v.y-80,{nastro:'IL NASTRO!',chiocciola:'UNA CHIOCCIOLA',sasso:'UN SASSO',vuoto:'VUOTO'}[v.item],v.item=='nastro'?'#ff9cc6':'#fff');
      if(v.item=='nastro'){sfx.pick();burst(v.x,v.y-20,30,['#ff6fa8','#fff','#ffc93d']);setState(4);}});
    proximity('emma',emma.x,emma.y,talkEmma);
    proximity('girl',girl.x,girl.y,talkGirl);
  },
  guide(){
    if(S.state==0||S.state==2)return{x:emma.x,y:emma.y-92};
    if(S.state==4)return{x:girl.x,y:girl.y-150};
    if(S.state==1)return nearest(S.daisies.filter(d=>!d.got),52);
    if(S.state==3)return nearest(S.vases.filter(v=>!v.lifted),72);
    return null;
  },
  drawBack(c){
    c.fillStyle='#8fd16a';c.fillRect(0,0,WW,WH);
    c.beginPath();c.moveTo(...pathPts[0]);c.bezierCurveTo(...pathPts[1],...pathPts[2],...pathPts[3]);
    c.strokeStyle='#c9a86e';c.lineWidth=62;c.stroke();c.strokeStyle='#ecd39c';c.lineWidth=52;c.stroke();
    for(let i=0;i<14;i++){const tt=i/13,u=1-tt;const bx=u*u*u*280+3*u*u*tt*300+3*u*tt*tt*900+tt*tt*tt*1225,by=u*u*u*345+3*u*u*tt*620+3*u*tt*tt*600+tt*tt*tt*990;E(c,bx+(i%2?10:-12),by,7,4);c.fillStyle='#d8bb82';c.fill();}
    rr(c,house.x+10,house.y+house.h-6,house.w-20,70,10);c.fillStyle='#e3cfa8';c.fill();
    c.strokeStyle='#cdb68b';c.lineWidth=2;for(let i=1;i<7;i++){c.beginPath();c.moveTo(house.x+10+i*37,house.y+house.h);c.lineTo(house.x+10+i*37,house.y+house.h+60);c.stroke();}
    drawPond(c,T);
    c.strokeStyle='#6fb84f';c.lineWidth=2;tufts.forEach(([x,y])=>{c.beginPath();c.moveTo(x-4,y-5);c.lineTo(x,y);c.lineTo(x+4,y-6);c.stroke();});
    flowers.forEach(([x,y,col])=>{for(let k=0;k<5;k++){const a=k/5*TAU;C(c,x+Math.cos(a)*3.6,y+Math.sin(a)*3.6,3);c.fillStyle=col;c.fill();}C(c,x,y,2);c.fillStyle='#ffe14d';c.fill();});
    drawFenceRow(c,30,40,WW-30,40);
    for(let y=80;y<WH-30;y+=44){[30,WW-30].forEach(x=>{rr(c,x-5,y-24,10,26,3);fs(c,'#c98b55',2.5);});}
    bushes.forEach(([x,y,r])=>{C(c,x,y-r*.6,r);fs(c,'#5fb84f');C(c,x-r*.3,y-r,r*.35);c.fillStyle='#86d36a';c.fill();});
  },
  ents(c,ents){
    trees.forEach(t=>ents.push([t.y,()=>drawTree(c,t.x,t.y)]));
    ents.push([house.y+house.h,()=>drawHouse(c)]);
    S.vases.forEach(v=>ents.push([v.y,()=>drawVase(c,v)]));
    S.daisies.forEach(d=>{if(!d.got)ents.push([d.y,()=>drawDaisyQuest(c,d)]);});
    ents.push([emma.y,()=>drawCat(c,emma.x,emma.y,CATS.emma,{sit:true,f:S.p.x<emma.x?-1:1,t:T,seed:3})]);
    ents.push([girl.y,()=>drawGirl(c,girl.x,girl.y,{t:T,wave:S.state>=4,crown:S.crown})]);
  },
  drawFront(c){
    drawFenceRow(c,30,WH-20,1150,WH-20);drawFenceRow(c,1300,WH-20,WW-30,WH-20);
    [1150,1300].forEach(x=>{rr(c,x-9,WH-70,18,72,4);fs(c,'#b0784a');C(c,x,WH-74,9);fs(c,'#e0644a');});
  }
});
})();
