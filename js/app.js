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
  requestAnimationFrame(()=>{ wrap.scrollLeft = (wrap.scrollWidth - wrap.clientWidth)/2; });

  /* ---------- welcome banner + hint ---------- */
  function renderWelcome(){
    const el = $('#welcome');
    el.textContent = Names.count ? `Merry Christmas, ${Names.all()}!` : 'Merry Christmas!';
    el.style.animation='none'; void el.offsetWidth; el.style.animation='';
    const m = NOW.getMonth(), d = NOW.getDate();
    let hint;
    if(PREVIEW) hint = 'Preview mode: tap any bauble';
    else if(m===11 && d<=25) hint = `Today is December ${d}: find bauble number ${d}!`;
    else if(m===11 || (m===0 && d<=6)) hint = 'Every bauble is open. Tap any one to visit again!';
    else hint = `Only ${daysUntil(1)} sleeps until the first bauble opens!`;
    if(wrap.scrollWidth > wrap.clientWidth + 20) hint += ' · swipe to explore';
    $('#hint').textContent = hint;
  }
  renderWelcome();

  /* ---------- snow ---------- */
  const cv = $('#snow'), cx = cv.getContext('2d');
  let flakes = [], sw=0, sh=0;
  function sizeSnow(){
    const dpr = Math.min(2, window.devicePixelRatio||1);
    sw = innerWidth; sh = innerHeight; cv.width = sw*dpr; cv.height = sh*dpr; cx.setTransform(dpr,0,0,dpr,0,0);
    const n = Math.round(Math.min(220, sw*sh/7000));
    flakes = Array.from({length:n}, ()=>({x:Math.random()*sw, y:Math.random()*sh, r:Math.random()*2.6+0.8, s:Math.random()*0.6+0.3, p:Math.random()*6.28}));
  }
  sizeSnow(); addEventListener('resize', sizeSnow);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  (function snow(){
    cx.clearRect(0,0,sw,sh); cx.fillStyle='rgba(255,255,255,.85)';
    for(const f of flakes){
      if(!reduce){ f.y += f.s*f.r*0.55; f.p += 0.01; f.x += Math.sin(f.p)*0.35; }
      if(f.y > sh+5){ f.y=-5; f.x=Math.random()*sw; }
      cx.beginPath(); cx.arc(f.x, f.y, f.r, 0, 6.283); cx.fill();
    }
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
      toast(`<b>Not yet${who}!</b>Bauble ${day} opens on December ${day}.${n>0?` Only ${n} ${n===1?'sleep':'sleeps'} to go!`:''}`);
      return;
    }
    lastFocus = document.activeElement;
    $('#modalDay').textContent = `December ${day}`;
    $('#modalTitle').textContent = typeof def.title==='function' ? def.title() : def.title;
    $('#modalKind').textContent = def.kindLabel;
    const body = $('#modalBody'); body.innerHTML=''; body.scrollTop=0;
    modal.hidden = false; document.querySelector('.modal-panel').scrollTop = 0;
    try { cleanup = def.render(body) || null; } catch(e){ console.error(e); body.innerHTML='<p>Oops, this surprise slipped on the ice. Please try again!</p>'; }
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
  window.chime = (i=4)=>{ if(!ac) return; note(scale[Math.max(0,Math.min(7,i))], ac.currentTime, 1, .08); };
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
