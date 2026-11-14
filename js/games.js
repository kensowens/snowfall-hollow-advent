/* Icons and kid-friendly mini games for Snowfall Hollow. All original. */
(function(){
  const ICONS = {
    star:`<path d="M32 4 L40 23 L60 24 L44 37 L50 58 L32 46 L14 58 L20 37 L4 24 L24 23Z" fill="#f4c34d" stroke="#b8860b" stroke-width="2.5" stroke-linejoin="round"/>`,
    tree:`<path d="M32 4 L50 26 H42 L56 44 H8 L22 26 H14Z" fill="#2f8a57"/><rect x="27" y="44" width="10" height="12" fill="#7b4a2a"/><circle cx="26" cy="30" r="3" fill="#e04b52"/><circle cx="38" cy="38" r="3" fill="#f4c34d"/><circle cx="33" cy="20" r="3" fill="#4f8fe0"/>`,
    bell:`<path d="M32 8 C18 8 16 22 16 34 L10 46 H54 L48 34 C48 22 46 8 32 8Z" fill="#f4c34d" stroke="#b8860b" stroke-width="2.5"/><circle cx="32" cy="50" r="6" fill="#b8860b"/><path d="M24 6 q8 -6 16 0" stroke="#c8323a" stroke-width="4" fill="none"/>`,
    gift:`<rect x="8" y="24" width="48" height="34" rx="3" fill="#e04b52"/><rect x="5" y="16" width="54" height="12" rx="3" fill="#c8323a"/><rect x="28" y="16" width="8" height="42" fill="#f4c34d"/><path d="M32 16 C22 2 12 10 20 16 M32 16 C42 2 52 10 44 16" stroke="#f4c34d" stroke-width="4" fill="none"/>`,
    snowman:`<circle cx="32" cy="44" r="15" fill="#fff" stroke="#9fb0d8" stroke-width="2"/><circle cx="32" cy="21" r="11" fill="#fff" stroke="#9fb0d8" stroke-width="2"/><circle cx="28" cy="19" r="1.8" fill="#222"/><circle cx="36" cy="19" r="1.8" fill="#222"/><path d="M32 22 l7 2 l-7 2z" fill="#f08a24"/><path d="M22 30 q10 6 20 0" stroke="#c8323a" stroke-width="4" fill="none"/><rect x="24" y="4" width="16" height="8" fill="#2b2236"/><rect x="20" y="11" width="24" height="3" fill="#2b2236"/>`,
    cane:`<path d="M38 58 V20 a10 10 0 0 0 -20 0" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M38 58 V20 a10 10 0 0 0 -20 0" stroke="#e04b52" stroke-width="10" fill="none" stroke-linecap="round" stroke-dasharray="6 6"/>`,
    mitten:`<path d="M20 56 V26 C20 10 44 8 46 24 L46 30 L52 24 C58 20 62 28 56 34 L46 46 V56Z" fill="#4f8fe0"/><rect x="18" y="50" width="30" height="10" rx="3" fill="#fff"/><path d="M26 30 l4 4 l4 -4 l4 4" stroke="#fff" stroke-width="2.5" fill="none"/>`,
    stocking:`<path d="M22 6 H42 V36 L50 44 C56 52 46 62 38 56 L20 42 C16 38 22 32 22 30Z" fill="#c8323a"/><rect x="20" y="4" width="24" height="10" rx="3" fill="#fff"/><path d="M42 40 l6 6" stroke="#fff" stroke-width="3"/>`,
    bauble:`<rect x="27" y="6" width="10" height="7" rx="2" fill="#d4a017"/><circle cx="32" cy="36" r="22" fill="#a265d6"/><path d="M11 32 q21 10 42 0" stroke="#f4c34d" stroke-width="3" fill="none"/><ellipse cx="24" cy="27" rx="5" ry="3" fill="#fff" opacity=".6"/>`,
    ginger:`<g fill="#c4793d"><circle cx="32" cy="14" r="10"/><path d="M22 24 H42 L54 30 C58 33 55 38 50 36 L44 34 L46 54 C46 60 38 60 37 55 L32 44 L27 55 C26 60 18 60 18 54 L20 34 L14 36 C9 38 6 33 10 30Z"/></g><circle cx="28" cy="12" r="1.8" fill="#fff"/><circle cx="36" cy="12" r="1.8" fill="#fff"/><path d="M28 17 q4 3 8 0" stroke="#fff" stroke-width="2" fill="none"/><circle cx="32" cy="30" r="2.2" fill="#e04b52"/><circle cx="32" cy="38" r="2.2" fill="#3fa36b"/>`,
    holly:`<path d="M30 34 C20 20 8 30 4 22 C10 34 4 40 14 46 C18 38 26 42 30 34Z" fill="#2f8a57"/><path d="M34 34 C44 20 56 30 60 22 C54 34 60 40 50 46 C46 38 38 42 34 34Z" fill="#2f8a57"/><circle cx="28" cy="34" r="5" fill="#e04b52"/><circle cx="36" cy="34" r="5" fill="#e04b52"/><circle cx="32" cy="27" r="5" fill="#c8323a"/>`,
    moon:`<path d="M40 6 A26 26 0 1 0 58 44 A20 20 0 1 1 40 6Z" fill="#f4e3a1"/>`,
    heart:`<path d="M32 56 C8 40 4 26 12 16 C20 8 30 12 32 20 C34 12 44 8 52 16 C60 26 56 40 32 56Z" fill="#e04b52"/>`,
    gumdropR:`<path d="M12 52 C12 20 52 20 52 52Z" fill="#e04b52"/><circle cx="22" cy="40" r="2" fill="#fff8"/><circle cx="34" cy="34" r="2" fill="#fff8"/><circle cx="40" cy="44" r="2" fill="#fff8"/>`,
    gumdropG:`<path d="M12 52 C12 20 52 20 52 52Z" fill="#3fa36b"/><circle cx="22" cy="40" r="2" fill="#fff8"/><circle cx="34" cy="34" r="2" fill="#fff8"/><circle cx="40" cy="44" r="2" fill="#fff8"/>`,
    gumdropY:`<path d="M12 52 C12 20 52 20 52 52Z" fill="#f4c34d"/><circle cx="22" cy="40" r="2" fill="#fff8"/><circle cx="34" cy="34" r="2" fill="#fff8"/><circle cx="40" cy="44" r="2" fill="#fff8"/>`,
    mint:`<circle cx="32" cy="32" r="22" fill="#fff" stroke="#e04b52" stroke-width="2"/>${[0,1,2,3,4,5].map(i=>`<path d="M32 32 L${32+22*Math.cos(i*Math.PI/3)} ${32+22*Math.sin(i*Math.PI/3)} A22 22 0 0 1 ${32+22*Math.cos(i*Math.PI/3+0.5)} ${32+22*Math.sin(i*Math.PI/3+0.5)}Z" fill="#e04b52"/>`).join('')}`,
    icing:`<path d="M8 40 q6 -12 12 0 q6 -12 12 0 q6 -12 12 0 q6 -12 12 0" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>`,
    window:`<rect x="12" y="12" width="40" height="40" rx="4" fill="#ffd877" stroke="#fff" stroke-width="5"/><path d="M32 12 V52 M12 32 H52" stroke="#fff" stroke-width="4"/>`,
    snowflake:`<g stroke="#9fd0ff" stroke-width="4" stroke-linecap="round">${[0,60,120].map(a=>`<g transform="rotate(${a} 32 32)"><path d="M32 6 V58 M26 12 l6 6 l6 -6 M26 52 l6 -6 l6 6"/></g>`).join('')}</g>`,
    lightR:`<rect x="27" y="6" width="10" height="10" rx="2" fill="#555"/><path d="M32 14 C18 24 20 50 32 58 C44 50 46 24 32 14Z" fill="#ff5a5a"/>`,
    lightB:`<rect x="27" y="6" width="10" height="10" rx="2" fill="#555"/><path d="M32 14 C18 24 20 50 32 58 C44 50 46 24 32 14Z" fill="#5ab4ff"/>`,
    bow:`<path d="M32 30 C18 14 6 22 10 32 C6 42 18 48 32 34 C46 48 58 42 54 32 C58 22 46 14 32 30Z" fill="#c8323a"/><circle cx="32" cy="32" r="6" fill="#8a1f2a"/><path d="M28 36 L20 56 M36 36 L44 56" stroke="#c8323a" stroke-width="6"/>`
  };
  const icon = (name, size) => `<svg viewBox="0 0 64 64" ${size?`width="${size}" height="${size}"`:''} xmlns="http://www.w3.org/2000/svg">${ICONS[name]||''}</svg>`;
  const imgCache = {};
  function iconImg(name){
    if(imgCache[name]) return imgCache[name];
    const im = new Image(); im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(icon(name,64)); imgCache[name]=im; return im;
  }
  const kid = () => Names.all('little elf');
  const h = (html) => { const t=document.createElement('template'); t.innerHTML=html.trim(); return t.content.firstElementChild; };
  function confetti(stage, n=40){
    const box = stage.getBoundingClientRect();
    for(let i=0;i<n;i++){
      const c = document.createElement('div');
      const col = ['#e04b52','#f4c34d','#3fa36b','#4f8fe0','#a265d6','#fff'][i%6];
      c.style.cssText = `position:absolute;left:${Math.random()*100}%;top:-10px;width:9px;height:14px;background:${col};border-radius:2px;pointer-events:none;z-index:4;transition:transform ${1.4+Math.random()}s cubic-bezier(.2,.6,.4,1), opacity 2.4s;`;
      stage.appendChild(c);
      requestAnimationFrame(()=>requestAnimationFrame(()=>{ c.style.transform=`translate(${(Math.random()-.5)*120}px, ${box.height+20}px) rotate(${Math.random()*720}deg)`; c.style.opacity='0'; }));
      setTimeout(()=>c.remove(), 2600);
    }
  }
  function canvasSetup(canvas, W, H){
    const dpr = Math.min(2, devicePixelRatio||1);
    canvas.width = W*dpr; canvas.height = H*dpr; const c = canvas.getContext('2d'); c.setTransform(dpr,0,0,dpr,0,0); return c;
  }
  function canvasPoint(canvas, e, W, H){
    const r = canvas.getBoundingClientRect(); return { x:(e.clientX-r.left)*W/r.width, y:(e.clientY-r.top)*H/r.height };
  }
  function shell(body, instr){
    const g = h(`<div class="game"><p class="game-instr">${instr}</p><div class="game-bar"></div><div class="game-stage"></div><p class="win-msg" aria-live="polite"></p></div>`);
    body.appendChild(g);
    return { root:g, bar:g.querySelector('.game-bar'), stage:g.querySelector('.game-stage'), msg:g.querySelector('.win-msg') };
  }
  function nightBg(c, W, H, ground=true){
    const g = c.createLinearGradient(0,0,0,H); g.addColorStop(0,'#16224f'); g.addColorStop(1,'#4b3f7a'); c.fillStyle=g; c.fillRect(0,0,W,H);
    c.fillStyle='#fff'; for(let i=0;i<40;i++){ const x=(i*97)%W, y=(i*53)%(H*0.5); c.globalAlpha=.4+((i*7)%5)/10; c.fillRect(x,y,2,2);} c.globalAlpha=1;
    if(ground){ c.fillStyle='#e8eefb'; c.beginPath(); c.moveTo(0,H-50); c.quadraticCurveTo(W/2,H-80,W,H-50); c.lineTo(W,H); c.lineTo(0,H); c.fill(); }
  }

  /* ---------------- 1. Catch the presents ---------------- */
  function catchPresents(body){
    const W=680,H=440, GOAL=15;
    const s = shell(body, 'Move the sleigh to catch the falling presents! Drag, slide your finger, or use the arrow keys. Catch 15 to fill the sleigh.');
    const score = h(`<span class="score">Presents: 0 / ${GOAL}</span>`); s.bar.appendChild(score);
    const again = h(`<button class="pill red">Play again</button>`); again.hidden=true; s.bar.appendChild(again);
    const cv = h(`<canvas aria-label="Catch the presents game"></canvas>`); s.stage.appendChild(cv);
    const c = canvasSetup(cv, W, H);
    let sled, items, caught, t, raf, done, keys={};
    const kinds=['gift','gift','gift','star','bell','stocking'];
    function reset(){ sled={x:W/2}; items=[]; caught=0; t=0; done=false; score.textContent=`Presents: 0 / ${GOAL}`; s.msg.textContent=''; again.hidden=true; }
    reset();
    function move(e){ sled.x = Math.max(60, Math.min(W-60, canvasPoint(cv,e,W,H).x)); }
    cv.addEventListener('pointerdown', e=>{ cv.setPointerCapture(e.pointerId); move(e); });
    cv.addEventListener('pointermove', e=>{ if(e.pointerType==='mouse' || e.buttons) move(e); });
    const kd = e=>{ keys[e.key]=e.type==='keydown'; };
    addEventListener('keydown', kd); addEventListener('keyup', kd);
    again.onclick = reset;
    function drawSled(x){
      const y=H-70;
      c.fillStyle='#c8323a'; c.beginPath(); c.moveTo(x-60,y); c.lineTo(x+50,y); c.quadraticCurveTo(x+64,y,x+60,y+26); c.lineTo(x-56,y+26); c.closePath(); c.fill();
      c.fillStyle='#f4c34d'; c.fillRect(x-60,y+4,110,5);
      c.strokeStyle='#d4a017'; c.lineWidth=4; c.beginPath(); c.moveTo(x-64,y+38); c.lineTo(x+60,y+38); c.quadraticCurveTo(x+78,y+38,x+74,y+24); c.stroke();
      c.beginPath(); c.moveTo(x-40,y+26); c.lineTo(x-40,y+38); c.moveTo(x+36,y+26); c.lineTo(x+36,y+38); c.stroke();
      // pile of caught gifts
      const n=Math.min(caught,GOAL);
      for(let i=0;i<n;i++){ const px=x-48+(i%5)*22, py=y-16-Math.floor(i/5)*16; c.drawImage(iconImg(['gift','bell','star'][i%3]), px, py, 22, 22); }
    }
    function frame(){
      t++;
      if(keys.ArrowLeft) sled.x=Math.max(60,sled.x-8); if(keys.ArrowRight) sled.x=Math.min(W-60,sled.x+8);
      if(!done && t%Math.max(34, 60-caught*2)===0) items.push({x:40+Math.random()*(W-80), y:-40, v:1.6+Math.random()*0.8+caught*0.05, k:kinds[Math.floor(Math.random()*kinds.length)], r:Math.random()*6});
      nightBg(c,W,H);
      for(const it of items){
        it.y+=it.v; it.r+=0.02;
        c.save(); c.translate(it.x,it.y); c.rotate(Math.sin(it.r)*0.25); c.drawImage(iconImg(it.k),-24,-24,48,48); c.restore();
        if(!it.hit && it.y>H-100 && it.y<H-50 && Math.abs(it.x-sled.x)<80){ it.hit=true; caught++; window.chime && chime(caught%8); score.textContent=`Presents: ${Math.min(caught,GOAL)} / ${GOAL}`;
          if(caught===GOAL && !done){ done=true; s.msg.textContent=`Hooray, ${kid()}! The sleigh is full of presents!`; confetti(s.stage); again.hidden=false; } }
      }
      items = items.filter(it=>!it.hit && it.y<H+40);
      drawSled(sled.x);
      raf=requestAnimationFrame(frame);
    }
    frame();
    return ()=>{ cancelAnimationFrame(raf); removeEventListener('keydown',kd); removeEventListener('keyup',kd); };
  }

  /* ---------------- 2. Snowflake maker ---------------- */
  function snowflakeMaker(body){
    const S=520, C=S/2, R=230;
    const s = shell(body, 'Draw across the paper to snip it with magic scissors. Every snip is copied all the way around, so you always make a snowflake!');
    const sizes = {Small:10, Medium:20, Big:34}; let brush=20;
    const sizeBtns = Object.entries(sizes).map(([k,v])=>{ const b=h(`<button class="pill ${v===brush?'gold':''}">${k} snips</button>`); b.onclick=()=>{brush=v; sizeBtns.forEach(x=>x.classList.remove('gold')); b.classList.add('gold');}; s.bar.appendChild(b); return b; });
    const newBtn = h(`<button class="pill green">New paper</button>`), spinBtn=h(`<button class="pill">Spin it ✦</button>`), saveBtn=h(`<a class="pill" download="my-snowflake.png" href="#">Save picture</a>`);
    s.bar.append(newBtn, spinBtn, saveBtn);
    s.stage.style.maxWidth='440px'; s.stage.style.background='radial-gradient(circle,#4a6fb5,#1d2c5e)';
    const cv = h(`<canvas aria-label="Snowflake paper"></canvas>`); s.stage.appendChild(cv);
    cv.style.transition='transform 3s ease-in-out';
    const c = canvasSetup(cv, S, S);
    let snips=0;
    function paper(){
      c.globalCompositeOperation='source-over'; c.clearRect(0,0,S,S);
      c.fillStyle='#fdfdff'; c.beginPath();
      for(let i=0;i<6;i++){ const a=i*Math.PI/3-Math.PI/2; c.lineTo(C+R*Math.cos(a), C+R*Math.sin(a)); } c.closePath(); c.fill();
      c.strokeStyle='#dfe8f7'; c.lineWidth=1; c.setLineDash([4,6]);
      for(let i=0;i<6;i++){ const a=i*Math.PI/3-Math.PI/2; c.beginPath(); c.moveTo(C,C); c.lineTo(C+R*Math.cos(a), C+R*Math.sin(a)); c.stroke(); }
      c.setLineDash([]); snips=0; s.msg.textContent='';
    }
    paper();
    let last=null;
    function cut(a,b){
      c.globalCompositeOperation='destination-out'; c.lineCap='round'; c.lineJoin='round'; c.lineWidth=brush; c.strokeStyle='#000';
      for(let k=0;k<6;k++){
        for(const m of [1,-1]){
          c.save(); c.translate(C,C); c.rotate(k*Math.PI/3); c.scale(1,m);
          c.beginPath(); c.moveTo(a.x-C,a.y-C); c.lineTo(b.x-C,b.y-C); c.stroke(); c.restore();
        }
      }
      c.globalCompositeOperation='source-over';
    }
    cv.addEventListener('pointerdown', e=>{ cv.setPointerCapture(e.pointerId); last=canvasPoint(cv,e,S,S); cut(last,{x:last.x+0.1,y:last.y}); });
    cv.addEventListener('pointermove', e=>{ if(!last) return; const p=canvasPoint(cv,e,S,S); cut(last,p); last=p; });
    const up=()=>{ if(last){ snips++; if(snips===6) s.msg.textContent=`What a beautiful snowflake, ${kid()}! No two are ever the same.`; } last=null; };
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
    newBtn.onclick=paper;
    let spun=0; spinBtn.onclick=()=>{ spun+=360; cv.style.transform=`rotate(${spun}deg)`; };
    saveBtn.onclick=()=>{ saveBtn.href = cv.toDataURL('image/png'); };
  }

  /* ---------------- 3. Decorator engine (tree & gingerbread) ---------------- */
  function decorator(body, cfg){
    const s = shell(body, cfg.instr);
    const VB = cfg.viewBox || [600,520];
    const pal = h(`<div class="palette" role="toolbar" aria-label="Decorations"></div>`);
    s.root.insertBefore(pal, s.stage);
    const undo = h(`<button class="pill">Undo</button>`), clear=h(`<button class="pill">Start over</button>`);
    s.bar.append(undo, clear); (cfg.extraButtons||[]).forEach(b=>s.bar.appendChild(b));
    s.stage.style.background = cfg.stageBg || '#16224f';
    s.stage.innerHTML = `<svg viewBox="0 0 ${VB[0]} ${VB[1]}" style="display:block;width:100%;height:auto;touch-action:none">${cfg.bg}<g class="placed"></g></svg>`;
    const svg = s.stage.querySelector('svg'), layer = svg.querySelector('.placed');
    let selected = cfg.items[0].name, placed=[], praised=false;
    const btns = cfg.items.map(it=>{
      const b = h(`<button class="item" aria-label="${it.label||it.name}" title="${it.label||it.name}">${icon(it.name)}</button>`);
      if(it.name===selected) b.classList.add('sel');
      b.addEventListener('pointerdown', e=>startPaletteDrag(e, it, b));
      pal.appendChild(b); return b;
    });
    function select(name){ selected=name; btns.forEach((b,i)=>b.classList.toggle('sel', cfg.items[i].name===name)); }
    function toSvg(e){ const pt=svg.createSVGPoint(); pt.x=e.clientX; pt.y=e.clientY; return pt.matrixTransform(svg.getScreenCTM().inverse()); }
    function inside(e){ const r=svg.getBoundingClientRect(); return e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom; }
    function place(name, x, y){
      const it = cfg.items.find(i=>i.name===name); const sz = it.size || cfg.size || 54;
      const g = document.createElementNS('http://www.w3.org/2000/svg','g');
      g.innerHTML = `<svg x="${-sz/2}" y="${-sz/2}" width="${sz}" height="${sz}" viewBox="0 0 64 64" overflow="visible">${ICONS[name]}</svg>`;
      g.setAttribute('transform', `translate(${x} ${y})`); g.style.cursor='grab'; g.dataset.x=x; g.dataset.y=y;
      g.addEventListener('pointerdown', e=>startMove(e,g));
      layer.appendChild(g); placed.push(g); window.chime && chime(placed.length%8);
      if(placed.length>=cfg.praiseAt && !praised){ praised=true; s.msg.textContent = cfg.praise(); confetti(s.stage,30); }
    }
    // tap on stage places the selected decoration
    svg.addEventListener('pointerup', e=>{ if(dragging) return; if(e.target.closest('.placed g')) return; const p=toSvg(e); place(selected, p.x, p.y); });
    let dragging=false;
    function startPaletteDrag(e, it, btn){
      e.preventDefault(); select(it.name); dragging=true;
      const ghost = h(`<div style="position:fixed;width:60px;height:60px;pointer-events:none;z-index:100;opacity:.9;left:${e.clientX-30}px;top:${e.clientY-30}px;display:none">${icon(it.name)}</div>`);
      document.body.appendChild(ghost); const sx=e.clientX, sy=e.clientY; let moved=false;
      const mv = ev=>{ if(Math.hypot(ev.clientX-sx, ev.clientY-sy)>8){ moved=true; ghost.style.display='block'; } ghost.style.left=(ev.clientX-30)+'px'; ghost.style.top=(ev.clientY-30)+'px'; };
      const upf = ev=>{ removeEventListener('pointermove',mv); removeEventListener('pointerup',upf); removeEventListener('pointercancel',upf); ghost.remove(); dragging=false;
        if(moved && inside(ev)){ const p=toSvg(ev); place(it.name,p.x,p.y); } };
      addEventListener('pointermove',mv); addEventListener('pointerup',upf); addEventListener('pointercancel',upf);
    }
    function startMove(e, g){
      e.stopPropagation(); e.preventDefault(); dragging=true; const start=toSvg(e), ox=+g.dataset.x, oy=+g.dataset.y;
      const mv = ev=>{ const p=toSvg(ev); const x=ox+p.x-start.x, y=oy+p.y-start.y; g.setAttribute('transform',`translate(${x} ${y})`); g.dataset.x=x; g.dataset.y=y; g.style.opacity = inside(ev)?1:.4; };
      const upf = ev=>{ removeEventListener('pointermove',mv); removeEventListener('pointerup',upf); removeEventListener('pointercancel',upf);
        if(!inside(ev)){ g.remove(); placed=placed.filter(x=>x!==g); }
        dragging=false; };
      addEventListener('pointermove',mv); addEventListener('pointerup',upf); addEventListener('pointercancel',upf);
    }
    undo.onclick=()=>{ const g=placed.pop(); if(g) g.remove(); };
    clear.onclick=()=>{ placed.forEach(g=>g.remove()); placed=[]; praised=false; s.msg.textContent=''; };
    const hint = h(`<p class="game-instr" style="font-size:15px;opacity:.8">Tip: pick a decoration, then tap where it goes. Drag one off the picture to take it away.</p>`);
    s.root.appendChild(hint);
    return { svg, place, s };
  }

  function decorateTree(body){
    const lightsBtn = h(`<button class="pill gold">Lights on ✨</button>`);
    const bg = `<defs><radialGradient id="dtg" cx="50%" cy="40%" r="70%"><stop offset="0" stop-color="#2d3c7a"/><stop offset="1" stop-color="#121a3d"/></radialGradient></defs>
      <rect width="600" height="520" fill="url(#dtg)"/>
      <rect x="0" y="440" width="600" height="80" fill="#e8eefb"/><rect x="40" y="120" width="120" height="150" rx="6" fill="#0d1430" stroke="#6b4a33" stroke-width="10"/><path d="M100 120 V270 M40 195 H160" stroke="#6b4a33" stroke-width="6"/>
      <circle cx="130" cy="150" r="12" fill="#fff6d8"/>
      <rect x="282" y="420" width="36" height="40" fill="#7b4a2a"/><path d="M240 440 h120 l-14 40 h-92z" fill="#c8323a"/>
      <path d="M300 60 L400 190 H360 L440 310 H390 L470 430 H130 L210 310 H160 L240 190 H200Z" fill="#2f8a57"/>
      <path d="M300 60 L400 190 H360 L440 310 H390 L470 430 H300Z" fill="#256f46"/>
      <g class="tree-lights" opacity="0">${Array.from({length:26},(_,i)=>{const row=Math.floor(i/6.5), t=(i%7)/6; const y=170+row*80+t*25; const half=40+row*55; const x=300-half+2*half*t; return `<circle class="bulb" cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="6" fill="${['#ffd166','#ff6b6b','#7bdff2','#95e06c'][i%4]}" style="animation-delay:${(i%3)*.5}s"/>`}).join('')}</g>`;
    const d = decorator(body, {
      instr: 'Make the village tree beautiful! Choose a decoration and tap the tree, or drag decorations onto it.',
      bg, items:[{name:'bauble',label:'Bauble'},{name:'star',label:'Star'},{name:'cane',label:'Candy cane'},{name:'bell',label:'Bell'},{name:'gift',label:'Present',size:70},{name:'bow',label:'Bow'},{name:'ginger',label:'Gingerbread'},{name:'lightR',label:'Red light',size:36},{name:'lightB',label:'Blue light',size:36},{name:'snowflake',label:'Snowflake'},{name:'heart',label:'Heart',size:40},{name:'stocking',label:'Stocking'}],
      praiseAt: 10, praise: ()=>`${kid()}, that is the prettiest tree in all of Snowfall Hollow!`, extraButtons:[lightsBtn]
    });
    let on=false; lightsBtn.onclick=()=>{ on=!on; d.svg.querySelector('.tree-lights').setAttribute('opacity', on?1:0); lightsBtn.textContent = on?'Lights off':'Lights on ✨'; };
  }

  function gingerbread(body){
    const bg = `<rect width="600" height="520" fill="#fbe9d0"/><circle cx="80" cy="80" r="40" fill="#fff" opacity=".5"/><rect y="450" width="600" height="70" fill="#fff"/>
      <path d="M100 250 L300 90 L500 250Z" fill="#a8602e"/><path d="M90 255 L300 80 L510 255" stroke="#fff" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      ${Array.from({length:7},(_,i)=>`<circle cx="${130+i*57}" cy="262" r="9" fill="#fff"/>`).join('')}
      <rect x="130" y="250" width="340" height="210" fill="#c4793d"/><rect x="130" y="250" width="340" height="210" fill="none" stroke="#a8602e" stroke-width="4"/>
      <path d="M260 460 V370 a40 40 0 0 1 80 0 V460Z" fill="#8a4a20"/><circle cx="325" cy="415" r="5" fill="#f4c34d"/>
      <rect x="380" y="140" width="40" height="70" fill="#a8602e"/><rect x="374" y="132" width="52" height="14" rx="6" fill="#fff"/>`;
    decorator(body, {
      instr: "Decorate the gingerbread house with yummy sweets! Tap a sweet, then tap the house. You can't eat these ones (sorry!).",
      bg, stageBg:'#fbe9d0', items:[{name:'gumdropR',label:'Red gumdrop',size:40},{name:'gumdropG',label:'Green gumdrop',size:40},{name:'gumdropY',label:'Yellow gumdrop',size:40},{name:'mint',label:'Peppermint',size:44},{name:'cane',label:'Candy cane'},{name:'icing',label:'Icing'},{name:'window',label:'Candy window',size:60},{name:'heart',label:'Heart',size:40},{name:'star',label:'Star',size:44},{name:'ginger',label:'Gingerbread friend',size:64},{name:'holly',label:'Holly'},{name:'snowflake',label:'Snowflake',size:44}],
      praiseAt: 10, praise: ()=>`Mmm! ${kid()}, that house looks good enough to eat!`
    });
  }

  /* ---------------- 4. Memory match ---------------- */
  function memory(body){
    const s = shell(body, 'Flip two cards at a time and find the matching pairs. Take your time: there is no timer!');
    const moves = h(`<span class="score">Turns: 0</span>`), again=h(`<button class="pill red">Shuffle again</button>`); s.bar.append(moves, again);
    const grid = h(`<div class="mem-grid"></div>`); s.stage.replaceWith(grid); s.stage = grid;
    const set = ['snowman','gift','star','tree','mitten','bell'];
    let first=null, lock=false, turns=0, found=0;
    function deal(){
      grid.innerHTML=''; first=null; lock=false; turns=0; found=0; moves.textContent='Turns: 0'; s.msg.textContent='';
      const cards=[...set,...set].sort(()=>Math.random()-.5);
      cards.forEach(name=>{
        const b=h(`<button class="mem-card" aria-label="Hidden card"><span class="face back">❄</span><span class="face front">${icon(name,'70%')}</span></button>`);
        b.dataset.name=name;
        b.onclick=()=>{
          if(lock || b.classList.contains('flip')) return;
          b.classList.add('flip'); b.setAttribute('aria-label', name);
          if(!first){ first=b; return; }
          turns++; moves.textContent=`Turns: ${turns}`;
          if(first.dataset.name===name){ first.classList.add('matched'); b.classList.add('matched'); first=null; found++; window.chime&&chime(found+1);
            if(found===set.length){ s.msg.textContent=`You found them all, ${kid()}! What a super memory!`; confetti(s.root); } }
          else { lock=true; const a=first; first=null; setTimeout(()=>{ a.classList.remove('flip'); b.classList.remove('flip'); a.setAttribute('aria-label','Hidden card'); b.setAttribute('aria-label','Hidden card'); lock=false; }, 900); }
        };
        grid.appendChild(b);
      });
    }
    s.root.style.position='relative';
    again.onclick=deal; deal();
  }

  /* ---------------- 5. Sliding puzzle ---------------- */
  function puzzlePicture(){
    const kids = Names.count ? Names.all() : '';
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><rect width="300" height="300" fill="#1d2c5e"/><circle cx="240" cy="55" r="26" fill="#fff6d8"/>
      ${Array.from({length:18},(_,i)=>`<circle cx="${(i*67)%300}" cy="${(i*41)%150}" r="1.6" fill="#fff"/>`).join('')}
      <path d="M0 200 Q150 170 300 200 V300 H0Z" fill="#eef3fc"/>
      <path d="M60 60 L110 130 H90 L125 185 H-5 L30 130 H10Z" fill="#2f8a57"/><circle cx="60" cy="58" r="8" fill="#f4c34d"/><circle cx="50" cy="120" r="5" fill="#e04b52"/><circle cx="75" cy="160" r="5" fill="#4f8fe0"/>
      <rect x="150" y="150" width="110" height="80" fill="#c46a5a"/><path d="M140 152 L205 100 L270 152Z" fill="#fff"/><rect x="165" y="170" width="24" height="24" fill="#ffd877"/><rect x="220" y="185" width="24" height="45" fill="#6b2f2a"/>
      <circle cx="105" cy="250" r="30" fill="#fff"/><circle cx="105" cy="205" r="20" fill="#fff"/><circle cx="98" cy="200" r="2.5" fill="#222"/><circle cx="112" cy="200" r="2.5" fill="#222"/><path d="M105 206 l12 3 l-12 3z" fill="#f08a24"/><path d="M88 222 q17 9 34 0" stroke="#c8323a" stroke-width="6" fill="none"/>
      <text x="150" y="292" text-anchor="middle" font-family="Georgia" font-size="20" fill="#8a1f2a" font-weight="bold">${kids? 'Merry Christmas '+kids.replace(/&/g,'&amp;') : 'Merry Christmas!'}</text></svg>`;
  }
  function slidingPuzzle(body){
    const s = shell(body, 'Tap a picture piece next to the empty space to slide it. Put the picture back together!');
    const shuffleBtn=h(`<button class="pill red">Mix it up</button>`), numBtn=h(`<button class="pill">Show numbers</button>`), peek=h(`<button class="pill">Peek at picture</button>`);
    const moves=h(`<span class="score">Moves: 0</span>`); s.bar.append(moves, shuffleBtn, numBtn, peek);
    const grid=h(`<div class="slide-grid"></div>`); s.stage.replaceWith(grid);
    const url = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(puzzlePicture())}")`;
    let state=[0,1,2,3,4,5,6,7,8], count=0, nums=false, solved=false;
    const tiles = state.map(i=>{ const b=h(`<button class="tile" aria-label="Piece ${i+1}"><span>${i+1}</span></button>`); b.style.backgroundImage=url; b.style.backgroundPosition=`${(i%3)*50}% ${Math.floor(i/3)*50}%`; b.querySelector('span').hidden=true; b.onclick=()=>tap(i); return b; });
    function render(){
      grid.innerHTML=''; state.forEach(i=>{ const t=tiles[i]; t.classList.toggle('empty', i===8 && !solved); t.querySelector('span').hidden = !nums || i===8; grid.appendChild(t); });
      moves.textContent=`Moves: ${count}`;
    }
    function tap(i){
      if(solved) return; const p=state.indexOf(i), e=state.indexOf(8);
      const adj = (Math.abs(p-e)===3) || (Math.abs(p-e)===1 && Math.floor(p/3)===Math.floor(e/3));
      if(!adj || i===8) return;
      [state[p],state[e]]=[state[e],state[p]]; count++; window.chime&&chime(count%8);
      if(state.every((v,k)=>v===k)){ solved=true; s.msg.textContent=`You did it, ${kid()}! The picture is whole again!`; confetti(s.root); }
      render();
    }
    function shuffle(){
      state=[0,1,2,3,4,5,6,7,8]; let prev=-1;
      for(let k=0;k<24;k++){ const e=state.indexOf(8); const opts=[e-3,e+3,(e%3)?e-1:-1,(e%3<2)?e+1:-1].filter(x=>x>=0&&x<9&&x!==prev); const pick=opts[Math.floor(Math.random()*opts.length)]; [state[pick],state[e]]=[state[e],state[pick]]; prev=e; }
      if(state.every((v,k)=>v===k)) return shuffle();
      count=0; solved=false; s.msg.textContent=''; render();
    }
    numBtn.onclick=()=>{ nums=!nums; numBtn.textContent=nums?'Hide numbers':'Show numbers'; render(); };
    let peekEl=null; peek.onclick=()=>{ if(peekEl){peekEl.remove();peekEl=null;return;} peekEl=h(`<div style="width:min(200px,50vw);aspect-ratio:1;border-radius:10px;background-size:cover;border:3px solid #fff;box-shadow:0 4px 12px #0003"></div>`); peekEl.style.backgroundImage=url; grid.after(peekEl); };
    s.root.style.position='relative';
    shuffleBtn.onclick=shuffle; shuffle();
  }

  /* ---------------- 6. Snowball toss ---------------- */
  function snowballToss(body){
    const W=680,H=440, GOAL=10;
    const s = shell(body, 'Tap a target to toss a snowball at it! Hit 10 targets to win a gold star.');
    const score=h(`<span class="score">Hits: 0 / ${GOAL}</span>`), again=h(`<button class="pill red">Play again</button>`); again.hidden=true; s.bar.append(score,again);
    const cv=h(`<canvas aria-label="Snowball toss game"></canvas>`); s.stage.appendChild(cv); const c=canvasSetup(cv,W,H);
    let targets, balls, pops, hits, raf, done;
    function reset(){ targets=[0,1,2].map(i=>({x:120+i*220, y:150+i*70, dir:i%2?-1:1, sp:0.9+i*0.35, r:38, wob:0})); balls=[]; pops=[]; hits=0; done=false; score.textContent=`Hits: 0 / ${GOAL}`; s.msg.textContent=''; again.hidden=true; }
    reset(); again.onclick=reset;
    cv.addEventListener('pointerdown', e=>{ e.preventDefault(); const p=canvasPoint(cv,e,W,H); balls.push({sx:W/2, sy:H-20, tx:p.x, ty:p.y, t:0}); });
    function drawTarget(t){
      c.save(); c.translate(t.x,t.y); c.rotate(Math.sin(t.wob)*0.3*Math.min(1,t.wob)); 
      c.fillStyle='#6b4a33'; c.fillRect(-5,t.r-4,10,60);
      [[t.r,'#fff'],[t.r*0.75,'#e04b52'],[t.r*0.5,'#fff'],[t.r*0.25,'#e04b52']].forEach(([r,col])=>{ c.fillStyle=col; c.beginPath(); c.arc(0,0,r,0,6.283); c.fill(); });
      c.restore();
    }
    function frame(){
      nightBg(c,W,H);
      c.fillStyle='#d6e0f5'; c.fillRect(0,H-150,W,6);
      for(const t of targets){ t.x+=t.dir*t.sp; if(t.x<60||t.x>W-60) t.dir*=-1; if(t.wob>0) t.wob=Math.max(0,t.wob-0.05); drawTarget(t); }
      for(const b of balls){
        b.t+=0.045; const k=Math.min(1,b.t); const x=b.sx+(b.tx-b.sx)*k, y=b.sy+(b.ty-b.sy)*k - Math.sin(k*Math.PI)*120; const r=16-8*k;
        c.fillStyle='#fff'; c.beginPath(); c.arc(x,y,r,0,6.283); c.fill(); c.strokeStyle='#c9d6ef'; c.lineWidth=2; c.stroke();
        if(k>=1 && !b.done){ b.done=true;
          const hit = targets.find(t=>Math.hypot(t.x-b.tx, t.y-b.ty) < t.r+22);
          if(hit){ hit.wob=1.5; hits++; window.chime&&chime(hits%8); score.textContent=`Hits: ${Math.min(hits,GOAL)} / ${GOAL}`; pops.push({x:b.tx,y:b.ty,t:0,hit:true});
            if(hits===GOAL && !done){ done=true; s.msg.textContent=`Gold star for ${kid()}! What a snowball champion!`; confetti(s.stage); again.hidden=false; } }
          else pops.push({x:b.tx,y:b.ty,t:0});
        }
      }
      balls=balls.filter(b=>!b.done);
      for(const p of pops){ p.t+=0.04; c.globalAlpha=1-p.t; for(let i=0;i<8;i++){ const a=i*Math.PI/4; c.fillStyle=p.hit?'#f4c34d':'#fff'; c.beginPath(); c.arc(p.x+Math.cos(a)*30*p.t, p.y+Math.sin(a)*30*p.t, p.hit?6:4, 0, 6.283); c.fill(); } c.globalAlpha=1; }
      pops=pops.filter(p=>p.t<1);
      if(done){ c.drawImage(iconImg('star'), W/2-50, 20, 100, 100); }
      raf=requestAnimationFrame(frame);
    }
    frame();
    return ()=>cancelAnimationFrame(raf);
  }

  /* ---------------- 7. Word search ---------------- */
  function wordSearch(body){
    let words=['SNOW','STAR','BELL','TREE','GIFT','ELF'];
    const first=(Names.list[0]||'').toUpperCase().replace(/[^A-Z]/g,'');
    const bonus = first.length>=2 && first.length<=8 && !words.includes(first) ? first : null;
    if(bonus) words.push(bonus);
    const N=8;
    const s=shell(body, `Find the hidden words! They go across (→) or down (↓). Drag over a word, or tap its first and last letter.${bonus?` Look closely: there's a special name hiding in here too!`:''}`);
    const again=h(`<button class="pill red">New puzzle</button>`); s.bar.appendChild(again);
    const list=h(`<div class="ws-words"></div>`); s.root.insertBefore(list, s.stage);
    const grid=h(`<div class="ws-grid" style="grid-template-columns:repeat(${N},1fr)"></div>`); s.stage.replaceWith(grid);
    let cells, letters, foundSet, placements;
    function build(){
      for(let attempt=0; attempt<200; attempt++){
        letters=Array(N*N).fill(null); placements={}; let ok=true;
        for(const w of [...words].sort((a,b)=>b.length-a.length)){
          let placed=false;
          for(let tries=0;tries<200 && !placed;tries++){
            const down=Math.random()<.5, r=Math.floor(Math.random()*(down?N-w.length+1:N)), col=Math.floor(Math.random()*(down?N:N-w.length+1));
            const idx=[...w].map((_,i)=> down? (r+i)*N+col : r*N+col+i);
            if(idx.every((p,i)=>letters[p]===null||letters[p]===w[i])){ idx.forEach((p,i)=>letters[p]=w[i]); placements[w]=idx; placed=true; }
          }
          if(!placed){ ok=false; break; }
        }
        if(ok) break;
      }
      const AB='ABCDEFGHIKLMNOPRSTUW';
      letters=letters.map(l=>l||AB[Math.floor(Math.random()*AB.length)]);
      grid.innerHTML=''; foundSet=new Set(); s.msg.textContent='';
      cells=letters.map((l,i)=>{ const d=h(`<div class="ws-cell" data-i="${i}">${l}</div>`); grid.appendChild(d); return d; });
      list.innerHTML=words.map(w=>`<span data-w="${w}">${w===bonus?'★ '+w:w}</span>`).join('');
    }
    function line(a,b){
      const ar=Math.floor(a/N), ac=a%N, br=Math.floor(b/N), bc=b%N;
      if(ar===br){ const [x,y]=ac<bc?[ac,bc]:[bc,ac]; return Array.from({length:y-x+1},(_,k)=>ar*N+x+k); }
      if(ac===bc){ const [x,y]=ar<br?[ar,br]:[br,ar]; return Array.from({length:y-x+1},(_,k)=>(x+k)*N+ac); }
      return [a];
    }
    function highlight(idx){ cells.forEach((c,i)=>c.classList.toggle('sel', idx.includes(i))); }
    function check(idx){
      const word=idx.map(i=>letters[i]).join(''), rev=[...word].reverse().join('');
      const w = words.find(w=>!foundSet.has(w) && (w===word||w===rev) && placements[w].every(p=>idx.includes(p)) && idx.length===w.length);
      if(w){ foundSet.add(w); idx.forEach(i=>cells[i].classList.add('found')); list.querySelector(`[data-w="${w}"]`).classList.add('found'); window.chime&&chime(foundSet.size);
        if(w===bonus) s.msg.textContent=`You found your own name, ${bonus[0]+bonus.slice(1).toLowerCase()}!`;
        if(foundSet.size===words.length){ s.msg.textContent=`All words found! Brilliant searching, ${kid()}!`; confetti(s.root); } }
      highlight([]);
    }
    let start=null, cur=null, pending=null;
    const cellAt=e=>{ const el=document.elementFromPoint(e.clientX,e.clientY); return el && el.classList.contains('ws-cell') ? +el.dataset.i : null; };
    grid.addEventListener('pointerdown', e=>{ const i=cellAt(e); if(i==null) return; e.preventDefault(); start=i; cur=i; highlight(pending!=null?line(pending,i):[i]); });
    grid.addEventListener('pointermove', e=>{ if(start==null) return; const i=cellAt(e); if(i!=null && i!==cur){ cur=i; highlight(line(start,i)); } });
    addEventListener('pointerup', up);
    function up(){
      if(start==null) return;
      if(cur!==start){ check(line(start,cur)); pending=null; }
      else if(pending!=null && pending!==start){ check(line(pending,start)); pending=null; }
      else { pending=start; highlight([start]); }
      start=null;
    }
    s.root.style.position='relative';
    again.onclick=()=>{ pending=null; build(); }; build();
    return ()=>removeEventListener('pointerup', up);
  }

  /* ---------------- 8. Light the lanterns ---------------- */
  function lanterns(body){
    const s=shell(body, 'The wind keeps blowing out the village lanterns! Tap the dark lanterns to light them. Can you get all 9 glowing at once?');
    const again=h(`<button class="pill red">Play again</button>`); again.hidden=true; s.bar.appendChild(again);
    const grid=h(`<div class="lantern-grid"></div>`); s.stage.replaceWith(grid);
    const lantern = on => `<svg viewBox="0 0 60 80"><circle cx="30" cy="44" r="30" fill="#ffd877" opacity="${on?.45:0}"/><path d="M22 10 h16 l-8 -8z" fill="#2b2236"/><rect x="18" y="10" width="24" height="6" fill="#2b2236"/>
      <path d="M18 16 h24 l4 44 h-32z" fill="${on?'#ffe7a0':'#4a4466'}" stroke="#2b2236" stroke-width="4"/><path d="M30 16 v44" stroke="#2b2236" stroke-width="2"/>
      ${on?'<path d="M30 30 c-6 10 -4 18 0 20 c4 -2 6 -10 0 -20z" fill="#f08a24"/>':''}<rect x="12" y="60" width="36" height="7" fill="#2b2236"/><path d="M14 4 q16 -8 32 0" stroke="#fff" stroke-width="3" fill="none"/></svg>`;
    let lit, timer, done;
    const btns=[...Array(9)].map((_,i)=>{ const b=h(`<button class="lantern-btn" aria-label="Lantern ${i+1}"></button>`); b.onclick=()=>{ if(done||lit[i]) return; lit[i]=true; window.chime&&chime(lit.filter(Boolean).length-1); draw(); check(); }; grid.appendChild(b); return b; });
    function draw(){ btns.forEach((b,i)=>{ b.innerHTML=lantern(lit[i]); b.setAttribute('aria-pressed', lit[i]); }); }
    function check(){ if(lit.every(Boolean)){ done=true; clearInterval(timer); s.msg.textContent=`The whole village is glowing! Thank you, ${kid()}!`; confetti(s.root); again.hidden=false; } }
    function breeze(){ if(done) return; const on=lit.map((v,i)=>v?i:-1).filter(i=>i>=0); if(on.length<3) return; const k=on[Math.floor(Math.random()*on.length)]; lit[k]=false; draw(); }
    function start(){ lit=Array(9).fill(false); done=false; s.msg.textContent=''; again.hidden=true; draw(); clearInterval(timer); timer=setInterval(breeze, 2600); }
    s.root.style.position='relative';
    again.onclick=start; start();
    return ()=>clearInterval(timer);
  }

  window.Games = { catchPresents, snowflakeMaker, decorateTree, gingerbread, memory, slidingPuzzle, snowballToss, wordSearch, lanterns };
  window.Icons = { icon, ICONS };
  window.confettiBurst = confetti;
})();
