/* ===== Avvio ===== */
const lv=document.getElementById('levels');
lv.innerHTML=LEVELS.map((l,i)=>`<button class="lvl" data-l="${i}"><b>${i+1}</b><span>${l.name}</span></button>`).join('');
lv.querySelectorAll('.lvl').forEach(b=>b.onclick=()=>play(+b.dataset.l));
let last=performance.now();
function frame(now){const dt=Math.min(.05,(now-last)/1000);last=now;update(dt);render(dt);requestAnimationFrame(frame);}
function start(data){
  if(data&&data.S&&LEVELS[data.S.lvl]){S=data.S;L=LEVELS[S.lvl];music.src=L.music;updateHUD();drawPortraits();if(S.started)document.getElementById('start').hidden=true;}
  else startLevel(0);
  /* carica subito la musica dell'intro e prova a farla partire (se il browser lo permette) */
  if(!S.started){music.preload='auto';introMusicStart();}
  document.getElementById('bMus').classList.toggle('on',musicOn);
  requestAnimationFrame(frame);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(drawPortraits);
}
window.claude?.hot?.snapshot?.(()=>({S}));
window.claude?.hot?.ready?window.claude.hot.ready(start):start(window.claude?.hot?.data??{});
if(location.hash=='#debug')window.__gioco={get S(){return S;},setState,play};
