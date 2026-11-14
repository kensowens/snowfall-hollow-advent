/* Builds the original Snowfall Hollow village scene as inline SVG. */
(function(){
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const W = 1600, H = 1000;

  function stars(){
    let s='';
    for(let i=0;i<140;i++){
      const x=rnd()*W*1.6-W*0.3, y=rnd()*520-200, r=rnd()*1.6+0.4;
      s+=`<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="#fff" class="${rnd()<.4?'twinkle':''}" style="animation-delay:${(rnd()*3).toFixed(2)}s"/>`;
    }
    return s;
  }
  function pine(x, base, h, opts={}){
    const w = h*0.62, dark = opts.dark || '#1e5a3e', mid = opts.mid || '#27704d';
    let s=`<g class="pine"><rect x="${x-h*0.04}" y="${base-h*0.12}" width="${h*0.08}" height="${h*0.12}" fill="#5a3a24"/>`;
    const tiers=4;
    for(let i=0;i<tiers;i++){
      const ty = base - h*0.1 - i*(h*0.22);
      const tw = w*(1 - i*0.2);
      const top = ty - h*0.36;
      s+=`<path d="M${x-tw/2} ${ty} Q${x} ${ty+10} ${x+tw/2} ${ty} L${x} ${top} Z" fill="${i%2?mid:dark}"/>`;
      s+=`<path d="M${x-tw/2+4} ${ty-2} Q${x-tw/4} ${ty+6} ${x} ${ty-4} Q${x+tw/4} ${ty+6} ${x+tw/2-4} ${ty-2} L${x+tw*0.18} ${ty-h*0.1} Q${x} ${ty-h*0.05} ${x-tw*0.18} ${ty-h*0.1} Z" fill="#f4f8ff" opacity=".9"/>`;
    }
    s+=`<path d="M${x-8} ${base-h*0.1-3*(h*0.22)-h*0.3} L${x} ${base-h} L${x+8} ${base-h*0.1-3*(h*0.22)-h*0.3} Z" fill="#f4f8ff"/></g>`;
    return s;
  }
  function smoke(x,y){
    let s=`<g class="smoke">`;
    for(let i=0;i<5;i++) s+=`<circle cx="${x}" cy="${y}" r="9" fill="#dfe6f5" style="animation-delay:${i*1.2}s"/>`;
    return s+'</g>';
  }
  function windowEl(x,y,w,h){
    return `<g><rect x="${x-3}" y="${y-3}" width="${w+6}" height="${h+6}" rx="3" fill="#3b2a20"/>
      <rect class="win" x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#winGlow)" style="animation-delay:${(rnd()*4).toFixed(1)}s"/>
      <path d="M${x+w/2} ${y}V${y+h}M${x} ${y+h/2}H${x+w}" stroke="#3b2a20" stroke-width="3"/>
      <rect x="${x-5}" y="${y+h}" width="${w+10}" height="5" fill="#f4f8ff"/></g>`;
  }
  function cottage(x, base, w, h, wall, roof, opt={}){
    const peak = base - h - w*0.42;
    let s = `<g class="cottage">`;
    // window glow on snow
    s += `<ellipse cx="${x+w/2}" cy="${base+8}" rx="${w*0.7}" ry="14" fill="#ffcf6b" opacity=".18"/>`;
    // chimney
    const cx = x + w*(opt.chimLeft?0.22:0.72);
    s += `<rect x="${cx}" y="${peak + (base-h-peak)*0.25}" width="${w*0.1}" height="${w*0.3}" fill="#7b4a3a"/>
          <rect x="${cx-4}" y="${peak + (base-h-peak)*0.25-6}" width="${w*0.1+8}" height="9" fill="#f4f8ff"/>`;
    s += smoke(cx + w*0.05, peak + (base-h-peak)*0.25 - 10);
    s += `<rect x="${x}" y="${base-h}" width="${w}" height="${h}" fill="${wall}"/>`;
    s += `<rect x="${x}" y="${base-h}" width="${w}" height="${h}" fill="url(#wallShade)"/>`;
    // roof
    s += `<path d="M${x-16} ${base-h+4} L${x+w/2} ${peak} L${x+w+16} ${base-h+4} Z" fill="${roof}"/>`;
    s += `<path d="M${x-20} ${base-h+6} L${x+w/2} ${peak-6} L${x+w+20} ${base-h+6} L${x+w+12} ${base-h-6} Q${x+w*0.75} ${base-h-2} ${x+w*0.68} ${base-h-14} Q${x+w/2} ${base-h} ${x+w*0.3} ${base-h-12} Q${x+w*0.2} ${base-h} ${x-12} ${base-h-6} Z" fill="#f4f8ff"/>`;
    s += `<path d="M${x+w/2-14} ${peak+w*0.22} h28 v26 h-28z" fill="url(#winGlow)" class="win" stroke="#3b2a20" stroke-width="3"/>`;
    // door
    const dx = x + w*(opt.doorLeft?0.18:0.62), dw = w*0.2, dh = h*0.55;
    s += `<rect x="${dx}" y="${base-dh}" width="${dw}" height="${dh}" rx="${dw/2}" ry="10" fill="#6b2f2a"/>
          <circle cx="${dx+dw*0.8}" cy="${base-dh*0.45}" r="2.5" fill="#f4c34d"/>
          <circle cx="${dx+dw/2}" cy="${base-dh*0.72}" r="${dw*0.28}" fill="none" stroke="#2f7d4f" stroke-width="6"/>
          <circle cx="${dx+dw/2}" cy="${base-dh*0.72+dw*0.28}" r="3" fill="#c8323a"/>`;
    // windows
    const wx = x + w*(opt.doorLeft?0.5:0.12), ww = w*0.18, wh=h*0.28;
    s += windowEl(wx, base-h*0.68, ww, wh);
    s += windowEl(wx+ww+w*0.06, base-h*0.68, ww, wh);
    // fairy lights along eave
    const n = Math.round(w/22);
    for(let i=0;i<=n;i++){
      const px = x-10 + (w+20)*i/n, py = base-h+8 + Math.sin(i/n*Math.PI)*8;
      const col = ['#ff6b6b','#ffd166','#7bdff2','#95e06c'][i%4];
      s += `<circle class="bulb" cx="${px}" cy="${py}" r="3.5" fill="${col}" style="animation-delay:${(i%3)*0.6}s"/>`;
    }
    s += `<rect x="${x-6}" y="${base-4}" width="${w+12}" height="10" rx="5" fill="#f4f8ff"/>`;
    return s + '</g>';
  }
  function church(){
    const tx=560, tw=76, base=690;
    let s=`<g class="church">
      <rect x="${tx+tw}" y="${base-150}" width="170" height="150" fill="#b9a99b"/>
      <path d="M${tx+tw-6} ${base-146} L${tx+tw+85} ${base-230} L${tx+tw+176} ${base-146}Z" fill="#5d4a5e"/>
      <path d="M${tx+tw-10} ${base-142} L${tx+tw+85} ${base-236} L${tx+tw+180} ${base-142} L${tx+tw+168} ${base-152} Q${tx+tw+120} ${base-160} ${tx+tw+85} ${base-200} Q${tx+tw+50} ${base-160} ${tx+tw+6} ${base-152}Z" fill="#f4f8ff"/>
      ${[0,1,2].map(i=>`<path class="win" d="M${tx+tw+28+i*48} ${base-40} v-50 a12 12 0 0 1 24 0 v50z" fill="url(#stained)"/>`).join('')}
      <rect x="${tx}" y="${base-380}" width="${tw}" height="380" fill="#c8b8a8"/>
      <rect x="${tx}" y="${base-380}" width="${tw}" height="380" fill="url(#wallShade)"/>
      <path d="M${tx-8} ${base-380} L${tx+tw/2} ${base-520} L${tx+tw+8} ${base-380}Z" fill="#5d4a5e"/>
      <path d="M${tx+tw/2-10} ${base-470} L${tx+tw/2} ${base-520} L${tx+tw/2+10} ${base-470}Z" fill="#f4f8ff"/>
      <rect x="${tx-10}" y="${base-386}" width="${tw+20}" height="10" fill="#f4f8ff"/>
      <line x1="${tx+tw/2}" y1="${base-520}" x2="${tx+tw/2}" y2="${base-560}" stroke="#d4a017" stroke-width="4"/>
      <path d="M${tx+tw/2-12} ${base-546} h24" stroke="#d4a017" stroke-width="4"/>
      <circle cx="${tx+tw/2}" cy="${base-320}" r="28" fill="#fff4cc" stroke="#3b2a20" stroke-width="4"/>
      <circle cx="${tx+tw/2}" cy="${base-320}" r="38" fill="#ffd877" fill-opacity=".25" class="lampglow"/>
      ${Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return `<circle cx="${tx+tw/2+Math.sin(a)*22}" cy="${base-320-Math.cos(a)*22}" r="1.8" fill="#3b2a20"/>`}).join('')}
      <line x1="${tx+tw/2}" y1="${base-320}" x2="${tx+tw/2}" y2="${base-336}" stroke="#3b2a20" stroke-width="3" stroke-linecap="round"/>
      <line x1="${tx+tw/2}" y1="${base-320}" x2="${tx+tw/2+11}" y2="${base-320}" stroke="#3b2a20" stroke-width="3" stroke-linecap="round"/>
      <path class="win" d="M${tx+tw/2-14} ${base-220} v-40 a14 14 0 0 1 28 0 v40z" fill="url(#winGlow)" stroke="#3b2a20" stroke-width="3"/>
      <path d="M${tx+tw/2-18} ${base} v-60 a18 18 0 0 1 36 0 v60z" fill="#5a2a22"/>
    </g>`;
    return s;
  }
  function lamp(x, base, dir){
    const top = base-190, ax = x + dir*44;
    return `<g class="lamp">
      <ellipse cx="${x}" cy="${base}" rx="60" ry="12" fill="#ffd877" fill-opacity=".25" class="lampglow"/>
      <circle cx="${x}" cy="${top}" r="70" fill="url(#lampHalo)" class="lampglow"/>
      <rect x="${x-5}" y="${top}" width="10" height="190" fill="#2b2236"/>
      <rect x="${x-10}" y="${base-14}" width="20" height="14" rx="3" fill="#2b2236"/>
      <path d="M${x} ${top+40} q${dir*30} -14 ${dir*44} 0" stroke="#2b2236" stroke-width="5" fill="none"/>
      <path d="M${x-16} ${top} h32 l-6 -36 h-20z" fill="#ffe7a0" stroke="#2b2236" stroke-width="4"/>
      <path d="M${x-20} ${top-36} h40 l-20 -16z" fill="#2b2236"/>
      <path d="M${x-22} ${top-40} q22 -18 44 0" stroke="#f4f8ff" stroke-width="5" fill="none"/>
      <rect x="${x-20}" y="${top}" width="40" height="5" fill="#2b2236"/>
      <g class="sway" style="transform-origin:${ax}px ${top+40}px">
        <path d="M${ax-12} ${top+44} q12 -10 24 0" stroke="#2f7d4f" stroke-width="7" fill="none"/>
        <circle cx="${ax-9}" cy="${top+48}" r="3" fill="#c8323a"/><circle cx="${ax+9}" cy="${top+48}" r="3" fill="#c8323a"/>
      </g>
    </g>`;
  }
  function bigTree(cx, base, h){
    let s = `<g class="bigtree"><ellipse cx="${cx}" cy="${base}" rx="190" ry="20" fill="#ffd877" opacity=".2"/>
      <rect x="${cx-16}" y="${base-50}" width="32" height="50" fill="#5a3a24"/>`;
    const tiers = 5;
    for(let i=0;i<tiers;i++){
      const ty = base-40 - i*h*0.17, tw = 330*(1-i*0.18), top = ty - h*0.3;
      s += `<path d="M${cx-tw/2} ${ty} Q${cx} ${ty+16} ${cx+tw/2} ${ty} L${cx} ${top} Z" fill="${i%2?'#25714a':'#1b5c3b'}"/>`;
      s += `<path d="M${cx-tw/2+6} ${ty-2} Q${cx-tw/4} ${ty+10} ${cx} ${ty-2} Q${cx+tw/4} ${ty+10} ${cx+tw/2-6} ${ty-2} L${cx+tw*.3} ${ty-12} Q${cx} ${ty-2} ${cx-tw*.3} ${ty-12}Z" fill="#f4f8ff" opacity=".85"/>`;
      // light garland
      for(let k=0;k<9;k++){
        const t=k/8, px = cx - tw*0.42 + tw*0.84*t, py = ty - h*0.1 + Math.sin(t*Math.PI)*12 - t*14;
        const col=['#ffd166','#ff6b6b','#7bdff2','#fff'][ (k+i)%4];
        s+=`<circle class="bulb" cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="4" fill="${col}" style="animation-delay:${((k+i)%3)*0.5}s"/>`;
      }
    }
    const topY = base-40-(tiers-1)*h*0.17 - h*0.3;
    s += `<g transform="translate(${cx} ${topY-6})"><circle r="30" fill="#ffe08a" fill-opacity=".35" class="lampglow"/>
      <path d="M0 -22 L6 -7 L22 -7 L9 3 L14 19 L0 9 L-14 19 L-9 3 L-22 -7 L-6 -7Z" fill="#f4c34d" stroke="#fff3c4" stroke-width="2"/></g>`;
    return s + '</g>';
  }
  function fence(x1,x2,y){
    let s=`<g class="fence"><rect x="${x1}" y="${y-28}" width="${x2-x1}" height="6" fill="#6b4a33"/><rect x="${x1}" y="${y-12}" width="${x2-x1}" height="6" fill="#6b4a33"/>`;
    for(let x=x1;x<=x2;x+=34) s+=`<path d="M${x} ${y} v-40 l7 -8 l7 8 v40z" fill="#7b5a40"/><path d="M${x} ${y-40} l7 -8 l7 8z" fill="#f4f8ff"/>`;
    return s+`<rect x="${x1-6}" y="${y-34}" width="${x2-x1+12}" height="5" rx="2" fill="#f4f8ff"/></g>`;
  }
  function snowman(x, base){
    return `<g class="snowman"><ellipse cx="${x}" cy="${base}" rx="40" ry="8" fill="#c9d6ef"/>
      <circle cx="${x}" cy="${base-30}" r="34" fill="#fff"/><circle cx="${x}" cy="${base-82}" r="24" fill="#fff"/>
      <circle cx="${x-8}" cy="${base-88}" r="3" fill="#2b2236"/><circle cx="${x+8}" cy="${base-88}" r="3" fill="#2b2236"/>
      <path d="M${x} ${base-82} l18 4 l-18 4z" fill="#f08a24"/>
      <path d="M${x-22} ${base-66} q22 12 44 0 l-4 10 q-18 8 -36 0z" fill="#c8323a"/><rect x="${x+8}" y="${base-64}" width="10" height="26" fill="#c8323a" rx="3"/>
      <rect x="${x-18}" y="${base-120}" width="36" height="22" fill="#2b2236"/><rect x="${x-26}" y="${base-100}" width="52" height="6" fill="#2b2236"/>
      <circle cx="${x}" cy="${base-40}" r="3" fill="#2b2236"/><circle cx="${x}" cy="${base-25}" r="3" fill="#2b2236"/>
      <path d="M${x-32} ${base-56} l-30 -22 M${x+32} ${base-56} l30 -24" stroke="#6b4a33" stroke-width="4" stroke-linecap="round"/></g>`;
  }

  /* Ornament positions: [x, y, anchorY or null (sits on tree)] */
  const SPOTS = [
    // big tree (cx 800)
    [800,560,null],[765,630,null],[845,640,null],[730,715,null],[815,725,null],[880,790,null],[715,800,null],[795,830,null],
    // lamps
    [604,836,782],[996,842,787],[1474,614,578],
    // cottage eaves
    [70,745,692],[232,752,692],[322,745,692],[448,742,692],[1060,742,688],[1215,748,688],[1320,772,718],[1462,770,718],
    // pines
    [500,770,null],[484,835,null],[1556,760,null],[1540,840,null],[150,890,null],
    // church tower
    [598,565,505]
  ];
  // scatter numbers so they are not in reading order
  const ORDER = [12,4,19,7,1,22,15,24, 9,17,3, 6,20,11,2,14,25,8,18, 13,5,21,10,23, 16];
  const COLORS = [['#e04b52','#8a1f2a'],['#f4c34d','#a87a12'],['#3fa36b','#1d5a39'],['#4f8fe0','#1f4a8a'],['#a265d6','#5a2a8a'],['#e8784a','#9a3a16']];

  function ornament(day, spot, idx){
    const [x,y,anchor] = spot; const [c1,c2] = COLORS[idx % COLORS.length];
    const thread = anchor!=null ? `<line x1="0" y1="${anchor-y}" x2="0" y2="-30" stroke="#e8dcc0" stroke-width="2"/>` : `<path d="M-6 -30 q6 -12 12 0" stroke="#e8dcc0" stroke-width="2" fill="none"/>`;
    return `<g class="orn" data-day="${day}" tabindex="0" role="button" aria-label="December ${day}" transform="translate(${x} ${y})">
      ${thread}
      <circle r="40" fill="transparent"/>
      <circle class="halo" r="44" fill="url(#halo)"/>
      <g class="ball">
        <rect x="-8" y="-34" width="16" height="9" rx="2" fill="#d4a017" stroke="#8a6a10" stroke-width="1.5"/>
        <circle r="27" fill="url(#og${idx%COLORS.length})" stroke="${c2}" stroke-width="2"/>
        <path d="M-25 -4 Q0 6 25 -4" stroke="#fff6" stroke-width="2" fill="none"/>
        <path d="M-24 8 Q0 18 24 8" stroke="#fff4" stroke-width="2" fill="none"/>
        <ellipse cx="-9" cy="-11" rx="7" ry="4" fill="#fff" opacity=".55" transform="rotate(-30 -9 -11)"/>
        <text y="9" text-anchor="middle" font-size="27" fill="#fff" stroke="#3a1a20" stroke-width="3" paint-order="stroke">${day}</text>
        <g class="check" transform="translate(19 -19)"><circle r="10" fill="#fff" stroke="#2f7d4f" stroke-width="2"/><path d="M-5 0 l3.5 4 l6.5 -8" stroke="#2f7d4f" stroke-width="3" fill="none" stroke-linecap="round"/></g>
      </g>
    </g>`;
  }

  function build(){
    seed = 7;
    const grads = COLORS.map((c,i)=>`<radialGradient id="og${i}" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#fff" stop-opacity=".6"/><stop offset=".25" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></radialGradient>`).join('');
    const svg = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" role="img" aria-label="A snowy village at night with 25 numbered baubles">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1230"/><stop offset=".45" stop-color="#232a5c"/><stop offset=".75" stop-color="#5a4a7c"/><stop offset="1" stop-color="#c98f8a"/></linearGradient>
      <radialGradient id="moonGlow"><stop offset="0" stop-color="#fff8dc" stop-opacity=".6"/><stop offset="1" stop-color="#fff8dc" stop-opacity="0"/></radialGradient>
      <radialGradient id="winGlow" cx="50%" cy="60%" r="70%"><stop offset="0" stop-color="#fff2b0"/><stop offset=".6" stop-color="#ffc85a"/><stop offset="1" stop-color="#f08a24"/></radialGradient>
      <linearGradient id="stained" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd166"/><stop offset=".5" stop-color="#ff8a5c"/><stop offset="1" stop-color="#8a5ad6"/></linearGradient>
      <linearGradient id="wallShade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#0b1230" stop-opacity=".35"/></linearGradient>
      <radialGradient id="lampHalo"><stop offset="0" stop-color="#ffe7a0" stop-opacity=".8"/><stop offset="1" stop-color="#ffe7a0" stop-opacity="0"/></radialGradient>
      <radialGradient id="halo"><stop offset=".55" stop-color="#ffe08a" stop-opacity=".9"/><stop offset="1" stop-color="#ffe08a" stop-opacity="0"/></radialGradient>
      <linearGradient id="snowGround" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dfe8f7"/><stop offset="1" stop-color="#b8c6e6"/></linearGradient>
      ${grads}
    </defs>
    <rect x="-1200" y="-600" width="${W+2400}" height="${H+1200}" fill="url(#sky)"/>
    ${stars()}
    <circle cx="1330" cy="160" r="150" fill="url(#moonGlow)"/>
    <circle cx="1330" cy="160" r="52" fill="#fff6d8"/>
    <circle cx="1314" cy="148" r="9" fill="#efe2b8"/><circle cx="1346" cy="178" r="6" fill="#efe2b8"/>
    <path d="M-1200 560 Q-300 470 200 540 Q600 450 1000 520 Q1400 440 2800 530 V1600 H-1200Z" fill="#9fb0d8"/>
    ${[...Array(26)].map((_,i)=>{const x=-300+i*90+rnd()*40; return pine(x, 560+rnd()*30-Math.sin(i/3)*12, 50+rnd()*30, {dark:'#3d5a7a',mid:'#4a6a8a'})}).join('')}
    <path d="M-1200 640 Q-200 580 300 630 Q800 560 1300 620 Q1600 590 2800 640 V1600 H-1200Z" fill="#c7d3ee"/>
    ${[...Array(14)].map((_,i)=>`<rect class="win" x="${-100+i*130+rnd()*60}" y="${600+rnd()*20}" width="5" height="5" fill="#ffd877"/>`).join('')}
    ${church()}
    ${cottage(830,672,120,80,'#c46a5a','#4a3a5c',{chimLeft:true})}
    ${cottage(1400,668,150,92,'#7a8fb0','#3d3350')}
    <path d="M-1200 700 Q0 660 800 690 Q1300 670 2800 700 V1600 H-1200Z" fill="url(#snowGround)"/>
    ${pine(500,870,230)}
    ${cottage(30,840,230,150,'#d98c5f','#7a2e3a')}
    ${cottage(300,815,170,125,'#e6cfa3','#3e5a4a',{doorLeft:true,chimLeft:true})}
    ${bigTree(800,900,420)}
    ${cottage(1030,825,210,140,'#a24f4f','#2f3b5c',{doorLeft:true})}
    ${cottage(1290,850,200,135,'#8fa874','#5c3a2e',{chimLeft:true})}
    ${pine(1560,890,270)}
    ${lamp(560,930,1)}${lamp(1040,935,-1)}
    <path d="M-1200 880 Q300 850 700 900 Q1100 940 2800 880 V1600 H-1200Z" fill="#eef3fc"/>
    <path d="M640 1000 Q700 930 800 905 Q900 930 960 1000Z" fill="#d9e2f3"/>
    ${fence(240,470,960)}${fence(1120,1400,965)}
    ${snowman(1010,985)}
    ${pine(150,975,170)}
    ${[...Array(40)].map(()=>`<circle class="twinkle" cx="${(rnd()*W).toFixed(0)}" cy="${(900+rnd()*100).toFixed(0)}" r="1.5" fill="#fff" style="animation-delay:${(rnd()*3).toFixed(1)}s"/>`).join('')}
    <g id="ornaments">${SPOTS.map((s,i)=>ornament(ORDER[i], s, i)).join('')}</g>
    </svg>`;
    return svg;
  }
  window.Scene = { build };
})();
