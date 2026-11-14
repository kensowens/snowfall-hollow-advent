/* Snowfall Hollow scene: an original painted village (assets/village.webp) with
   25 hanging day markers laid over it. All positions are % of the painting. */
(function(){
  // [x%, y%, anchor y% (thread top) or null, type]  b = glass bauble, t = gift tag, s = the star (day 25)
  const SPOTS = {
    // on the big tree
    1:[43.4,49,null,'b'],   7:[40.3,35.5,null,'b'],  12:[46.4,37,null,'b'],  4:[37.6,47.5,null,'b'],
    19:[49.4,48.5,null,'b'], 9:[35.6,62,null,'b'],   15:[41.2,62.5,null,'b'], 22:[47.3,61,null,'b'],
    2:[52.8,63,null,'b'],   17:[44.6,73.5,null,'b'], 10:[38.4,74,null,'b'],
    25:[43.3,15.3,null,'s'],
    // church
    5:[22.2,26,21.2,'t'],   14:[12.4,47.5,41.5,'t'],  20:[30.6,49,43,'t'],
    // left pines and wall
    11:[6.4,44,null,'b'],   23:[8.2,62,null,'b'],     3:[10.6,82.5,77,'t'],
    // cottages on the right
    8:[63.2,70,62.5,'t'],   16:[73.4,71.5,64,'t'],    24:[91.8,70,63,'t'],
    // lamp, birch and wall
    13:[83.4,64.5,59.5,'t'], 18:[86.2,37,25,'t'],     6:[91.6,27,13,'b'],  21:[89.6,84,79,'t']
  };
  // pastel pink, mint, lavender, powder blue, butter yellow, peach: [light, body, deeper tone for the numeral]
  const JEWELS = [['#fde4ea','#f4b9c8','#b05a74'],['#e2f6ec','#aedfc6','#3f8a6a'],['#ece4fb','#c9b8ee','#6f5aa8'],['#e3effb','#afcdee','#4a74a8'],['#fdf5d6','#f4dc94','#97762a'],['#fde8dc','#f6c3a6','#a85f3e']];
  // soft window/lamp glows that gently breathe
  const GLOWS = [[12.6,56,3.2],[18.6,56,3],[25.1,56,3.4],[30.6,56.5,3],[25.6,64.5,2.6],[24.8,29,1.8],
    [68.6,65,2.4],[73.6,65,2.4],[77.8,64.6,2.4],[88.4,64,2.6],[69,73,2.6],[74.5,73,2.4],[80,72.5,2.4],
    [83.4,52.5,5],[90.6,68.6,2.6],[43.5,50,16]];
  // tiny glints on the tree lights
  const GLINTS = [[42.5,24],[44.8,30],[39.6,40],[47.6,42],[36.2,52],[45.6,55],[51,55],[38.8,66],[50,68],[34,70],[54.6,72],[42,78],[47.5,79],[41,45]];

  function marker(day){
    const [x,y,a,type] = SPOTS[day];
    const [c1,c2,c3] = JEWELS[day % JEWELS.length];
    const hang = a!=null ? `--hang:${(y-a).toFixed(1)};` : '';
    let face;
    if(type==='t'){
      face = `<svg class="tag-svg" viewBox="0 0 40 54" aria-hidden="true"><path d="M8 2 H32 L38 9 V50 Q38 52 36 52 H4 Q2 52 2 50 V9 Z" style="fill:var(--c2)" stroke="#fff" stroke-width="1.6"/><path d="M8 2 H32 L38 9 V50 Q38 52 36 52 H4 Q2 52 2 50 V9 Z" fill="#fff" opacity=".42"/>
        <path d="M8 5 H32 L35 9 V48.5 H5 V9 Z" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="2 1.6"/><circle cx="20" cy="10" r="2.6" fill="#fff" style="stroke:var(--c2)" stroke-width="1.2"/></svg>`;
    } else if(type==='s'){
      face = `<svg class="star-svg" viewBox="0 0 64 64" aria-hidden="true"><path d="M32 3 L39.5 23.5 L61 24 L44 37.5 L50 58.5 L32 46 L14 58.5 L20 37.5 L3 24 L24.5 23.5 Z" fill="url(#starGold)" stroke="#fff" stroke-width="2" stroke-linejoin="round"/></svg>`;
    } else {
      face = `<span class="glass"></span>`;
    }
    return `<button class="orn ${type==='t'?'tag':type==='s'?'star':'bauble'}" data-day="${day}" aria-label="December ${day}"
      style="left:${x}%;top:${y}%;--c1:${c1};--c2:${c2};--c3:${c3};${hang}">
      ${a!=null?'<span class="thread"></span>':''}<span class="halo"></span>
      <span class="face">${face}<span class="num">${day}</span><span class="mark" aria-hidden="true"></span></span>
    </button>`;
  }

  function build(){
    const defs = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
      <linearGradient id="tagPaper" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#ffffff" stop-opacity=".2"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></linearGradient>
      <linearGradient id="starGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffbe8"/><stop offset=".5" stop-color="#f8e3a0"/><stop offset="1" stop-color="#f3c9a8"/></linearGradient>
    </defs></svg>`;
    const glows = GLOWS.map(([x,y,s],i)=>`<span class="glow${s>10?' big':''}" style="left:${x}%;top:${y}%;--s:${s};animation-delay:${(-i*1.37).toFixed(2)}s;animation-duration:${(5+(i*7)%5).toFixed(1)}s"></span>`).join('');
    const glints = GLINTS.map(([x,y],i)=>`<span class="glint" style="left:${x}%;top:${y}%;animation-delay:${(-i*0.83).toFixed(2)}s"></span>`).join('');
    const orns = Object.keys(SPOTS).map(Number).sort((a,b)=>a-b).map(marker).join('');
    return `${defs}<img class="scene-img" src="assets/village.webp" alt="A painted snowy village at dusk with a stone church and a big Christmas tree on the green" draggable="false">
      <div class="glows" aria-hidden="true">${glows}${glints}</div>
      <div id="ornaments" class="ornaments">${orns}</div>`;
  }
  window.Scene = { build };
})();
