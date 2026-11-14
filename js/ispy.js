/* I Spy: a painted hidden-object hunt for every day.
   Hotspots are the exact rectangles where each item was composited into the painting (see ispy-data.js). */
(function(){
  const KEY = 'snowfallHollow.ispy';
  const load = ()=>{ try{ return JSON.parse(localStorage.getItem(KEY)||'{}')||{}; }catch(e){ return {}; } };
  const save = (all)=>{ try{ localStorage.setItem(KEY, JSON.stringify(all)); }catch(e){} };
  const h = (html)=>{ const t=document.createElement('template'); t.innerHTML=html.trim(); return t.content.firstElementChild; };
  const kid = ()=> Names.all('little elf');
  const esc = s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const MAG = `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="10" cy="10" r="6.5" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M15 15l6 6" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/></svg>`;

  function progress(day){ const d=window.ISPY_DATA[day]; const f=load()[day]||[]; return {found:f.length, total:d?d.items.length:0}; }

  function render(root, day){
    const data = window.ISPY_DATA && window.ISPY_DATA[day];
    if(!data){ root.innerHTML='<p>No I Spy picture today.</p>'; return null; }
    const all = load(); let found = new Set((all[day]||[]).filter(id=>data.items.some(i=>i.id===id)));
    const el = h(`<div class="ispy">
      <p class="ispy-intro">${esc(data.title)}: can you spy all ${data.items.length} things hiding in the picture?</p>
      <div class="ispy-cluebox"><span class="ispy-mag">${MAG}</span><p class="ispy-clue" aria-live="polite"></p></div>
      <div class="ispy-view" tabindex="0" aria-label="I Spy picture: ${esc(data.title)}. Tap the things in the clues.">
        <div class="ispy-inner"><img alt="${esc(data.title)}, a painted I Spy picture" draggable="false"><div class="ispy-marks"></div></div>
        <div class="ispy-loading">Painting the picture…</div>
      </div>
      <p class="ispy-tip"></p>
      <div class="ispy-bar"><span class="score ispy-count"></span><span class="ispy-zoom" role="group" aria-label="Zoom"><button class="zbtn" data-z="out" aria-label="Zoom out">−</button><span class="zlabel">Zoom</span><button class="zbtn" data-z="in" aria-label="Zoom in">+</button></span><button class="pill ispy-hint" hidden>Need a hint?</button><button class="pill ispy-reset" hidden>Play again</button></div>
      <ul class="ispy-list" aria-label="Things to spy"></ul>
    </div>`);
    root.appendChild(el);
    const view=el.querySelector('.ispy-view'), inner=el.querySelector('.ispy-inner'), img=inner.querySelector('img'), marks=el.querySelector('.ispy-marks');
    const clueEl=el.querySelector('.ispy-clue'), list=el.querySelector('.ispy-list'), count=el.querySelector('.ispy-count');
    const hintBtn=el.querySelector('.ispy-hint'), resetBtn=el.querySelector('.ispy-reset'), tip=el.querySelector('.ispy-tip');
    const touchy = matchMedia('(pointer:coarse)').matches || innerWidth<640;
    tip.textContent = touchy ? 'Tip: drag the picture to look around. Pinch or use + and − to zoom.' : 'Tip: click a thing when you spy it. Use + and − (or double-click) to zoom in close.';
    img.onload = ()=>{ el.querySelector('.ispy-loading').remove(); view.classList.add('ready'); };
    img.src = data.img;   // loaded only when this day is opened

    // ---------- checklist ----------
    let current = null;
    const rows = data.items.map(it=>{
      const li = h(`<li><button type="button" class="ispy-item" aria-pressed="false"><img src="assets/ispy/items/${it.id}.webp" alt="" loading="lazy"><span>${esc(it.name)}</span><i class="tick" aria-hidden="true">✓</i></button></li>`);
      li.querySelector('button').onclick = ()=>{ current=it; showClue(); };
      list.appendChild(li); return {it, li};
    });
    function showClue(){
      if(found.size===data.items.length){ clueEl.innerHTML = `You spied everything, ${esc(kid())}! ✦`; return; }
      if(!current || found.has(current.id)) current = data.items.find(i=>!found.has(i.id));
      clueEl.textContent = current.clue;
      rows.forEach(r=>r.li.classList.toggle('current', r.it===current));
    }
    function refresh(){
      rows.forEach(r=>{ const f=found.has(r.it.id); r.li.classList.toggle('found', f); r.li.querySelector('button').setAttribute('aria-pressed', f); });
      count.textContent = `Found ${found.size} of ${data.items.length}`;
      resetBtn.hidden = found.size===0; resetBtn.textContent = found.size===data.items.length ? 'Play again' : 'Start over';
      showClue();
    }
    function ring(it, cls){
      const m = h(`<div class="ispy-ring ${cls||''}"></div>`);
      const pad = 1.2; m.style.left=(it.x-pad)+'%'; m.style.top=(it.y-pad*4/3)+'%'; m.style.width=(it.w+pad*2)+'%'; m.style.height=(it.h+pad*8/3)+'%';
      marks.appendChild(m); return m;
    }
    data.items.forEach(it=>{ if(found.has(it.id)) ring(it,'done'); });
    refresh();

    // ---------- zoom & pan ----------
    let s=1, tx=0, ty=0;
    const vw=()=>view.clientWidth, vh=()=>view.clientHeight;
    function clamp(){ s=Math.max(1,Math.min(4,s)); tx=Math.min(0,Math.max(vw()-vw()*s,tx)); ty=Math.min(0,Math.max(vh()-vh()*s,ty)); }
    function apply(anim){ clamp(); inner.style.transition = anim?'transform .35s ease':'none'; inner.style.transform=`translate(${tx}px,${ty}px) scale(${s})`; view.classList.toggle('zoomed', s>1.01); }
    function zoomAt(ns, cx, cy, anim){ const k=ns/s; tx = cx-(cx-tx)*k; ty = cy-(cy-ty)*k; s=ns; apply(anim); }
    function centerOn(it, ns){ s=ns||Math.max(s,2); tx = vw()/2 - (it.x+it.w/2)/100*vw()*s; ty = vh()/2 - (it.y+it.h/2)/100*vh()*s; apply(true); }
    el.querySelector('[data-z=in]').onclick = ()=>zoomAt(Math.min(4,s*1.5), vw()/2, vh()/2, true);
    el.querySelector('[data-z=out]').onclick = ()=>zoomAt(Math.max(1,s/1.5), vw()/2, vh()/2, true);
    const onResize = ()=>apply(false); addEventListener('resize', onResize);

    const pts = new Map(); let gesture=null;
    view.addEventListener('pointerdown', e=>{
      view.setPointerCapture(e.pointerId); pts.set(e.pointerId,{x:e.clientX,y:e.clientY});
      if(pts.size===1) gesture={type:'tap', sx:e.clientX, sy:e.clientY, tx, ty, t:Date.now()};
      else if(pts.size===2){ const [a,b]=[...pts.values()]; gesture={type:'pinch', d:Math.hypot(a.x-b.x,a.y-b.y), s, tx, ty, mx:(a.x+b.x)/2, my:(a.y+b.y)/2}; }
    });
    view.addEventListener('pointermove', e=>{
      if(!pts.has(e.pointerId) || !gesture) return; pts.set(e.pointerId,{x:e.clientX,y:e.clientY});
      const r=view.getBoundingClientRect();
      if(gesture.type==='pinch' && pts.size>=2){
        const [a,b]=[...pts.values()]; const d=Math.hypot(a.x-b.x,a.y-b.y); const ns=Math.max(1,Math.min(4,gesture.s*d/gesture.d));
        const mx=gesture.mx-r.left, my=gesture.my-r.top; const k=ns/gesture.s;
        s=ns; tx=mx-(mx-gesture.tx)*k + ((a.x+b.x)/2-gesture.mx); ty=my-(my-gesture.ty)*k + ((a.y+b.y)/2-gesture.my); apply(false);
      } else if(gesture.type==='tap' || gesture.type==='pan'){
        const dx=e.clientX-gesture.sx, dy=e.clientY-gesture.sy;
        if(gesture.type==='tap' && Math.hypot(dx,dy)>8) gesture.type='pan';
        if(gesture.type==='pan'){ tx=gesture.tx+dx; ty=gesture.ty+dy; apply(false); }
      }
    });
    const end = e=>{
      if(!pts.has(e.pointerId)) return; pts.delete(e.pointerId);
      if(gesture && gesture.type==='tap' && e.type==='pointerup' && pts.size===0) tapAt(e.clientX, e.clientY);
      if(pts.size===0) gesture=null; else if(gesture && gesture.type==='pinch') gesture={type:'pan-wait'};
    };
    view.addEventListener('pointerup', end); view.addEventListener('pointercancel', end);
    view.addEventListener('dblclick', e=>{ const r=view.getBoundingClientRect(); zoomAt(s>=3.5?1:Math.min(4,s*2), e.clientX-r.left, e.clientY-r.top, true); });
    view.addEventListener('wheel', e=>{ if(!(e.ctrlKey||e.metaKey)) return; e.preventDefault(); const r=view.getBoundingClientRect(); zoomAt(Math.max(1,Math.min(4,s*(e.deltaY<0?1.15:1/1.15))), e.clientX-r.left, e.clientY-r.top, false); }, {passive:false});

    // ---------- finding ----------
    let lastFind = Date.now(), hintTimer=null, hintEl=null, misses=0;
    function tapAt(cx, cy){
      if(!view.classList.contains('ready')) return;
      const r = inner.getBoundingClientRect();
      const px = (cx-r.left)/r.width*100, py = (cy-r.top)/r.height*100;
      // generous kid-sized targets: at least ~48px across on screen, plus a little forgiveness
      const hitBox = it=>{ const hx=Math.max(it.w/2+12/r.width*100, 24/r.width*100), hy=Math.max(it.h/2+12/r.height*100, 24/r.height*100);
        return {cx:it.x+it.w/2, cy:it.y+it.h/2, hx, hy}; };
      let hit=null, best=1e9;
      data.items.forEach(it=>{ if(found.has(it.id)) return; const b=hitBox(it); const dx=Math.abs(px-b.cx)/b.hx, dy=Math.abs(py-b.cy)/b.hy;
        if(dx<=1 && dy<=1){ const d=dx*dx+dy*dy; if(d<best){best=d; hit=it;} } });
      if(hit) return spy(hit);
      const already = data.items.find(it=>found.has(it.id) && px>=it.x && px<=it.x+it.w && py>=it.y && py<=it.y+it.h);
      puff(px, py, already ? 'Found that one!' : ['Not there…','Keep looking!','Hmm, not that','Try again!'][misses++%4]);
    }
    function puff(px, py, text){
      const p = h(`<div class="ispy-puff"><span>${text}</span></div>`); p.style.left=px+'%'; p.style.top=py+'%'; p.style.setProperty('--inv', 1/s);
      marks.appendChild(p); setTimeout(()=>p.remove(), 1100);
    }
    function spy(it){
      found.add(it.id); const all=load(); all[day]=[...found]; save(all);
      lastFind = Date.now(); clearHint();
      ring(it,'done pop');
      const sp = h(`<div class="ispy-sparkle">${Array.from({length:10},(_,i)=>`<i style="--a:${i*36}deg;--d:${(i%3)*.06}s"></i>`).join('')}</div>`);
      sp.style.left=(it.x+it.w/2)+'%'; sp.style.top=(it.y+it.h/2)+'%'; marks.appendChild(sp); setTimeout(()=>sp.remove(), 1400);
      window.chime && chime(Math.min(7, found.size));
      const row = rows.find(r=>r.it===it); row.li.classList.add('just'); setTimeout(()=>row.li.classList.remove('just'), 1200);
      current = null; refresh();
      if(found.size===data.items.length) finish();
    }
    function finish(){
      hintBtn.hidden = true;
      const fake = {root:el, msg:{set textContent(v){}}};
      if(window.celebrateWin) window.celebrateWin(fake, `Hooray, ${kid()}! You spied every single thing in ${data.title}!`, {title:'I spied it all!', again:reset, againLabel:'Play again', keepLabel:'Admire the picture'});
      else window.confettiBurst && confettiBurst(el, 60);
    }
    function reset(){ found=new Set(); const all=load(); delete all[day]; save(all); marks.innerHTML=''; s=1; tx=0; ty=0; apply(true); current=null; lastFind=Date.now(); refresh(); el.querySelectorAll('.celebrate').forEach(c=>c.remove()); }
    resetBtn.onclick = reset;

    // ---------- gentle hints ----------
    function clearHint(){ if(hintEl){ hintEl.remove(); hintEl=null; } hintBtn.hidden = true; }
    hintTimer = setInterval(()=>{ if(found.size<data.items.length && Date.now()-lastFind>25000) hintBtn.hidden=false; }, 1000);
    hintBtn.onclick = ()=>{
      const it = (current && !found.has(current.id)) ? current : data.items.find(i=>!found.has(i.id)); if(!it) return;
      current = it; showClue(); if(hintEl) hintEl.remove();
      // a soft glow near (not exactly on) the item
      const cx = it.x+it.w/2 + (Math.random()-.5)*it.w*.8, cy = it.y+it.h/2 + (Math.random()-.5)*it.h*.8;
      hintEl = h(`<div class="ispy-hintglow"></div>`); hintEl.style.left=cx+'%'; hintEl.style.top=cy+'%'; marks.appendChild(hintEl);
      if(s>1.01) centerOn(it, s);
      lastFind = Date.now(); hintBtn.hidden = true;
    };
    if(found.size===data.items.length){ clueEl.innerHTML = `You already spied everything here, ${esc(kid())}! Tap <b>Play again</b> to hunt once more.`; }
    return ()=>{ clearInterval(hintTimer); removeEventListener('resize', onResize); };
  }
  window.ISpy = { render, progress };
})();
