(function(){
  const $ = s => document.querySelector(s);
  const params = new URLSearchParams(location.search);
  const PREVIEW = params.get('preview') === '1';
  const OPENED_KEY = 'snowfallHollow.opened';

  /* ---------- date logic ---------- */
  function today(){
    const t = params.get('today'); // testing override: ?today=2026-12-05
    if(t && /^\d{4}-\d{2}-\d{2}$/.test(t)){ const [y,m,d]=t.split('-').map(Number); return new Date(y,m-1,d,12); }
    return new Date();
  }
  const NOW = today();
  function isUnlocked(day){
    if(PREVIEW) return true;
    const m = NOW.getMonth(), d = NOW.getDate();
    if(m === 11) return d >= day;      // December: day N opens on Dec N (local time)
    if(m === 0 && d <= 6) return true; // first week of January: whole calendar stays open
    return false;
  }
  function daysUntil(day){
    const y = NOW.getMonth()===0 ? NOW.getFullYear()-1 : NOW.getFullYear();
    const target = new Date(y, 11, day);
    const start = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate());
    return Math.round((target - start)/86400000);
  }
  let opened = {};
  try{ opened = JSON.parse(localStorage.getItem(OPENED_KEY)||'{}') || {}; }catch(e){}
  function markOpened(day){ opened[day]=true; try{localStorage.setItem(OPENED_KEY, JSON.stringify(opened));}catch(e){} refreshOrnaments(); }

  /* ---------- scene ---------- */
  $('#scene').innerHTML = Scene.build();
  function refreshOrnaments(){
    document.querySelectorAll('.orn').forEach(o=>{
      const d = +o.dataset.day, un = isUnlocked(d);
      o.classList.toggle('locked', !un);
      o.classList.toggle('unlocked', un);
      o.classList.toggle('opened', !!opened[d]);
      o.classList.toggle('today', un && !opened[d] && (PREVIEW ? false : (NOW.getMonth()===11 && NOW.getDate()===d)));
      o.setAttribute('aria-label', `December ${d}${un?(opened[d]?' (opened)':' (ready to open)'):' (locked)'}`);
    });
    const n = Object.keys(opened).length;
    $('#status').textContent = PREVIEW ? 'Preview mode: every day unlocked' : `${n} of 25 opened`;
  }
  refreshOrnaments();
  // center the scene on narrow screens
  const wrap = $('#sceneWrap');
  function centerScene(){ const sc=$('#scene'); const t=document.querySelector('.orn.today'); const f = t ? parseFloat(t.style.left)/100 : (innerWidth/innerHeight > 1.2 ? 0.5 : 0.44); wrap.scrollLeft = Math.max(0, sc.offsetWidth*f - wrap.clientWidth/2); }
  // desktop: mouse wheel and click-drag pan the painting sideways
  wrap.addEventListener('wheel', e=>{ if(wrap.scrollWidth<=wrap.clientWidth+2) return; if(Math.abs(e.deltaY)>Math.abs(e.deltaX)){ wrap.scrollLeft += e.deltaY; } }, {passive:true});
  let drag=null;
  wrap.addEventListener('pointerdown', e=>{ if(e.pointerType!=='mouse' || e.button!==0) return; drag={x:e.clientX, s:wrap.scrollLeft, moved:false}; });
  addEventListener('pointermove', e=>{ if(!drag) return; const dx=e.clientX-drag.x; if(Math.abs(dx)>6){ drag.moved=true; wrap.style.cursor='grabbing'; } if(drag.moved) wrap.scrollLeft = drag.s - dx; });
  addEventListener('pointerup', ()=>{ if(drag && drag.moved){ const stop=ev=>{ ev.stopPropagation(); ev.preventDefault(); }; wrap.addEventListener('click', stop, {capture:true, once:true}); setTimeout(()=>wrap.removeEventListener('click', stop, {capture:true}), 50); } drag=null; wrap.style.cursor=''; });
  requestAnimationFrame(centerScene); addEventListener('orientationchange', ()=>setTimeout(centerScene, 300));

  /* ---------- welcome banner + hint ---------- */
  function renderWelcome(){
    const el = $('#welcome');
    el.textContent = Names.count ? `Merry Christmas, ${Names.all()}!` : 'Merry Christmas!';
    el.style.animation='none'; void el.offsetWidth; el.style.animation='';
    const m = NOW.getMonth(), d = NOW.getDate();
    let hint;
    if(PREVIEW) hint = 'Preview mode: every day is open';
    else if(m===11 && d<=25) hint = `It's December ${d}. Find number ${d} in the village!`;
    else if(m===11 || (m===0 && d<=6)) hint = 'Every day is open. Tap any one to visit again';
    else hint = `Only ${daysUntil(1)} sleeps until the first day opens`;
    if(wrap.scrollWidth > wrap.clientWidth + 20) hint += matchMedia('(pointer:fine)').matches ? ' · scroll to explore' : ' · swipe to explore';
    $('#hint').textContent = hint;
  }
  renderWelcome();

  /* ---------- snow: three depths, soft sprites ---------- */
  const cv = $('#snow'), cx = cv.getContext('2d');
  let flakes = [], sw=0, sh=0;
  function sprite(px, soft){
    const c=document.createElement('canvas'); c.width=c.height=px*2; const g=c.getContext('2d');
    const gr=g.createRadialGradient(px,px,0,px,px,px);
    gr.addColorStop(0,'rgba(255,255,255,1)'); gr.addColorStop(soft?0.25:0.5,'rgba(255,255,255,'+(soft?.55:.9)+')'); gr.addColorStop(1,'rgba(255,255,255,0)');
    g.fillStyle=gr; g.fillRect(0,0,px*2,px*2); return c;
  }
  const SPR = [sprite(8,false), sprite(16,true), sprite(32,true)];
  // layer: 0 far (tiny, slow), 1 mid, 2 near (big, blurred, few)
  const LAYERS = [{n:1/5200, r:[0.6,1.4], v:[0.18,0.35], a:[.45,.75], s:0},{n:1/16000, r:[1.6,2.8], v:[0.45,0.8], a:[.6,.9], s:1},{n:1/90000, r:[5,9], v:[0.9,1.5], a:[.18,.32], s:2}];
  const rr = (a)=>a[0]+Math.random()*(a[1]-a[0]);
  function sizeSnow(){
    const dpr = Math.min(2, window.devicePixelRatio||1);
    sw = innerWidth; sh = innerHeight; cv.width = sw*dpr; cv.height = sh*dpr; cx.setTransform(dpr,0,0,dpr,0,0);
    flakes = [];
    LAYERS.forEach((L,li)=>{ const n=Math.max(li===2?3:10, Math.round(Math.min(li?120:260, sw*sh*L.n)));
      for(let i=0;i<n;i++) flakes.push({x:Math.random()*sw, y:Math.random()*sh, r:rr(L.r), v:rr(L.v), a:rr(L.a), p:Math.random()*6.28, w:0.004+Math.random()*0.01, s:L.s, d:li}); });
  }
  sizeSnow(); addEventListener('resize', sizeSnow);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let wind = 0;
  (function snow(t){
    cx.clearRect(0,0,sw,sh);
    wind = Math.sin((t||0)/9000)*0.25;
    for(const f of flakes){
      if(!reduce){ f.p += f.w; f.y += f.v; f.x += Math.sin(f.p)*0.3*(f.d+1)*0.5 + wind*(f.d+1)*0.5; }
      if(f.y > sh+20){ f.y=-20; f.x=Math.random()*sw; }
      if(f.x > sw+20) f.x=-20; else if(f.x < -20) f.x=sw+20;
      const img=SPR[f.s], d=f.r*2.4;
      cx.globalAlpha=f.a; cx.drawImage(img, f.x-d/2, f.y-d/2, d, d);
    }
    cx.globalAlpha=1;
    requestAnimationFrame(snow);
  })();

  /* ---------- toast ---------- */
  let toastTimer;
  function toast(html, ms=3200){
    const t=$('#toast'); t.innerHTML=html; t.hidden=false; clearTimeout(toastTimer);
    toastTimer=setTimeout(()=>t.hidden=true, ms);
  }
  window.toast = toast;

  /* ---------- modal ---------- */
  const modal = $('#modal'); let cleanup = null, lastFocus = null;
  function openDay(day){
    const def = window.DAYS[day-1];
    if(!def){ return; }
    if(!isUnlocked(day)){
      const n = daysUntil(day);
      const who = Names.count ? `, ${Names.all()}` : '';
      toast(`<b>Not yet${who}!</b>Number ${day} opens on December ${day}.${n>0?` Only ${n} ${n===1?'sleep':'sleeps'} to go!`:''}`);
      return;
    }
    lastFocus = document.activeElement;
    $('#modalDay').textContent = `December ${day}`;
    $('#modalTitle').textContent = typeof def.title==='function' ? def.title() : def.title;
    const hasSpy = !!(window.ISpy && window.ISPY_DATA && window.ISPY_DATA[day]);
    $('#modalKind').textContent = hasSpy ? `I Spy  ·  ${def.kindLabel}` : def.kindLabel;
    const body = $('#modalBody'); body.innerHTML=''; body.scrollTop=0;
    modal.hidden = false; document.querySelector('.modal-panel').scrollTop = 0;
    const cleanups = []; cleanup = ()=>cleanups.forEach(f=>{ try{ f(); }catch(e){ console.error(e); } });
    const renderMain = (el)=>{ try { const c = def.render(el); if(typeof c==='function') cleanups.push(c); } catch(e){ console.error(e); el.innerHTML='<p>Oops, this surprise slipped on the ice. Please try again!</p>'; } };
    if(!hasSpy){ renderMain(body); }
    else {
      // Two things to do every day: the I Spy picture and the day's story/game/recipe/craft.
      const label = def.kindLabel.replace(/^(A|An|The)\s+/,'');
      const spyP = window.ISpy.progress(day);
      body.innerHTML = `<div class="day-tabs" role="tablist" aria-label="Today's surprises">
          <button role="tab" class="day-tab" id="tab-spy" aria-controls="pane-spy" aria-selected="true"><span class="tab-ico">◎</span> I Spy${spyP.found===spyP.total?' <span class="tab-done" aria-label="done">✓</span>':''}</button>
          <button role="tab" class="day-tab" id="tab-main" aria-controls="pane-main" aria-selected="false"><span class="tab-ico">✦</span> ${label}</button>
        </div>
        <div class="tab-pane" id="pane-spy" role="tabpanel" aria-labelledby="tab-spy"></div>
        <div class="tab-pane" id="pane-main" role="tabpanel" aria-labelledby="tab-main" hidden></div>`;
      const paneSpy = $('#pane-spy'), paneMain = $('#pane-main'); let mainDone = false;
      const c = window.ISpy.render(paneSpy, day); if(typeof c==='function') cleanups.push(c);
      const show = which=>{
        const spy = which==='spy';
        $('#tab-spy').setAttribute('aria-selected', spy); $('#tab-main').setAttribute('aria-selected', !spy);
        paneSpy.hidden = !spy; paneMain.hidden = spy;
        if(!spy && !mainDone){ mainDone = true; renderMain(paneMain); }
        document.querySelector('.modal-panel').scrollTop = 0;
      };
      $('#tab-spy').onclick = ()=>show('spy'); $('#tab-main').onclick = ()=>show('main');
      body.querySelector('.day-tabs').addEventListener('keydown', e=>{ if(e.key==='ArrowRight'||e.key==='ArrowLeft'){ const t = e.target.id==='tab-spy'?'main':'spy'; show(t); $('#tab-'+t).focus(); } });
    }
    markOpened(day);
    setTimeout(()=>$('.modal-close').focus({preventScroll:true}), 50);
  }
  function closeModal(){
    if(modal.hidden) return;
    if(typeof cleanup==='function'){ try{cleanup();}catch(e){console.error(e);} }
    cleanup = null; modal.hidden = true; $('#modalBody').innerHTML='';
    if(lastFocus && lastFocus.focus) lastFocus.focus({preventScroll:true});
  }
  window.closeModal = closeModal;
  modal.addEventListener('click', e=>{ if(e.target.closest('[data-close]')) closeModal(); });
  document.addEventListener('keydown', e=>{
    if(e.key==='Escape'){ if(!$('#namesScreen').hidden && Names.isSet) hideNames(); else closeModal(); }
  });
  $('#ornaments').addEventListener('click', e=>{ const o=e.target.closest('.orn'); if(o) openDay(+o.dataset.day); });
  $('#ornaments').addEventListener('keydown', e=>{ const o=e.target.closest('.orn'); if(o && (e.key==='Enter'||e.key===' ')){ e.preventDefault(); openDay(+o.dataset.day); } });
  window.openDay = openDay;

  /* ---------- names screen ---------- */
  const fields = $('#nameFields');
  function addField(val=''){
    const row = document.createElement('div'); row.className='name-row';
    row.innerHTML = `<input type="text" maxlength="20" placeholder="A name, like Ava" aria-label="Name"><button type="button" aria-label="Remove name">×</button>`;
    row.querySelector('input').value = val;
    row.querySelector('button').onclick = ()=>{ row.remove(); if(!fields.children.length) addField(); };
    fields.appendChild(row);
    return row.querySelector('input');
  }
  function showNames(){
    fields.innerHTML=''; const l = Names.list; (l.length?l:['']).forEach(n=>addField(n));
    $('#skipNames').textContent = Names.isSet ? 'Cancel' : 'Skip for now';
    $('#namesScreen').hidden = false; setTimeout(()=>fields.querySelector('input').focus(), 60);
  }
  function hideNames(){ $('#namesScreen').hidden = true; }
  $('#addName').onclick = ()=>{ if(fields.children.length<8) addField().focus(); };
  $('#namesForm').onsubmit = e=>{
    e.preventDefault();
    Names.set([...fields.querySelectorAll('input')].map(i=>i.value));
    hideNames(); renderWelcome();
    if(Names.count) toast(`<b>Hello, ${Names.all()}!</b>Snowfall Hollow is so happy you're here.`);
  };
  $('#skipNames').onclick = ()=>{ if(!Names.isSet) Names.set([]); hideNames(); renderWelcome(); };
  $('#settingsBtn').onclick = showNames;
  if(!Names.isSet) showNames();

  /* ---------- music box (Web Audio, original) ---------- */
  let ac=null, musicTimer=null, playing=false;
  const scale=[523.25,587.33,659.25,783.99,880,1046.5,1174.66,1318.5];
  const tune=[0,2,4,5, 4,2,3,1, 0,2,4,7, 6,4,5,-1, 2,3,4,2, 1,0,1,-1, 0,4,5,6, 7,5,4,-1];
  function note(f,t,dur=1.6,vol=.12){
    const o=ac.createOscillator(), g=ac.createGain(), o2=ac.createOscillator(), g2=ac.createGain();
    o.type='sine'; o.frequency.value=f; o2.type='sine'; o2.frequency.value=f*3.01; g2.gain.value=.25;
    o2.connect(g2).connect(g); o.connect(g).connect(ac.destination);
    g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(vol,t+.01); g.gain.exponentialRampToValueAtTime(.0001,t+dur);
    o.start(t); o2.start(t); o.stop(t+dur); o2.stop(t+dur);
  }
  // sound effects use their own context so they work even when the music box is off
  let sfx=null; const sfxCtx=()=>{ try{ sfx = sfx || new (window.AudioContext||window.webkitAudioContext)(); if(sfx.state==='suspended') sfx.resume(); }catch(e){ sfx=null; } return sfx; };
  function sfxNote(f,t,dur,vol){ const prev=ac; ac=sfx; try{ note(f,t,dur,vol); } finally { ac=prev; } }
  window.chime = (i=4)=>{ if(!sfxCtx()) return; sfxNote(scale[Math.max(0,Math.min(7,i))], sfx.currentTime, .9, .05); };
  window.fanfare = ()=>{ if(!sfxCtx()) return; const t=sfx.currentTime+.02; [0,2,4,7,5,7].forEach((n,i)=>sfxNote(scale[n], t+i*.12, 1.4, .07)); };
  function playLoop(){
    let t=ac.currentTime+.05; const beat=.42;
    tune.forEach((n,i)=>{ if(n>=0) note(scale[n], t+i*beat); if(i%4===0) note(scale[[0,3,4,0][(i/4)%4]]/2, t+i*beat, 2.2, .07); });
    musicTimer=setTimeout(playLoop, tune.length*beat*1000);
  }
  $('#musicBtn').onclick = ()=>{
    playing=!playing; $('#musicBtn').setAttribute('aria-pressed', playing);
    if(playing){ ac = ac || new (window.AudioContext||window.webkitAudioContext)(); ac.resume(); playLoop(); }
    else { clearTimeout(musicTimer); if(ac) ac.suspend(); }
  };
})();
