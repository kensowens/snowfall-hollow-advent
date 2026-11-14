/* Original illustrated, animated stories. The children's names become the heroes. */
(function(){
  const K = () => Names.prose('Pip and Tilly');          // all the heroes
  const A = () => Names.hero(0, 'Pip');                    // first hero
  const B = () => Names.count>1 ? Names.hero(1) : (Names.count===1 ? 'Biscuit the cat' : 'Tilly');
  const WE = () => Names.count===1 ? 'I' : 'We';

  function sky(id, top='#101a45', bottom='#4b3f7a'){
    let stars=''; for(let i=0;i<40;i++) stars+=`<circle cx="${(i*137)%800}" cy="${(i*71)%220}" r="${1+(i%3)*0.5}" fill="#fff" opacity="${0.4+(i%5)/10}"/>`;
    return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/></linearGradient></defs>
      <rect width="800" height="400" fill="url(#${id})"/>${stars}`;
  }
  const house = (x,y,s,col='#c46a5a',roof='#fff') => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="0" y="0" width="80" height="60" fill="${col}"/><path d="M-8 2 L40 -34 L88 2Z" fill="${roof}"/><rect x="12" y="16" width="16" height="16" fill="#ffd877" class="glow"/><rect x="50" y="26" width="16" height="34" fill="#6b2f2a"/></g>`;
  const pine = (x,y,s) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 -90 L28 -40 H16 L36 0 H-36 L-16 -40 H-28Z" fill="#256f46"/><path d="M0 -90 L10 -70 L-10 -70Z" fill="#fff"/><path d="M-36 0 L-22 -10 L-6 -2 L10 -12 L36 0Z" fill="#fff"/></g>`;
  const snow = (n=30) => { let s='<g class="sfall">'; for(let i=0;i<n;i++) s+=`<circle cx="${(i*53)%800}" cy="${-10-(i*37)%300}" r="${1.5+(i%3)}" fill="#fff" style="animation-delay:${(i%10)*0.6}s;animation-duration:${6+(i%5)}s"/>`; return s+'</g>'; };
  const baseCss = `.sfall circle{animation:sfall 7s linear infinite}@keyframes sfall{to{transform:translate(30px,440px)}} .glow{animation:glw 3s ease-in-out infinite}@keyframes glw{50%{opacity:.7}}`;
  const kidFig = (x,y,col,hat) => `<g transform="translate(${x} ${y})"><path d="M-16 0 L-12 -40 Q0 -48 12 -40 L16 0Z" fill="${col}"/><circle cx="0" cy="-54" r="13" fill="#f5d0b0"/><path d="M-14 -56 Q0 -80 14 -56Z" fill="${hat}"/><circle cx="0" cy="-74" r="5" fill="#fff"/><circle cx="-4" cy="-54" r="1.6" fill="#333"/><circle cx="4" cy="-54" r="1.6" fill="#333"/><path d="M-4 -48 q4 3 8 0" stroke="#333" stroke-width="1.5" fill="none"/><path d="M-14 -38 h28" stroke="#fff" stroke-width="5"/></g>`;
  function kidsRow(x,y,gap=44){
    const n = Math.max(1, Math.min(4, Names.count || 2)); const cols=[['#c8323a','#2f7d4f'],['#4f8fe0','#c8323a'],['#a265d6','#f4c34d'],['#2f7d4f','#e8784a']];
    let s=''; for(let i=0;i<n;i++) s+=kidFig(x+(i-(n-1)/2)*gap, y, cols[i][0], cols[i][1]); return s;
  }

  const ART = {
    flurry: () => `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice"><style>${baseCss}
      .s1f{animation:s1fall 7s ease-in-out infinite}@keyframes s1fall{0%{transform:translate(380px,-40px)}30%{transform:translate(300px,110px)}60%{transform:translate(440px,220px)}85%,100%{transform:translate(400px,290px)}}
      .s1spin{animation:s1spin 4s linear infinite;transform-box:fill-box;transform-origin:center}@keyframes s1spin{to{transform:rotate(360deg)}}
      .s1star{animation:glw 2s infinite}</style>
      ${sky('s1sky')}<circle cx="660" cy="80" r="34" fill="#fff6d8"/>
      <path d="M0 300 Q400 260 800 300 V400 H0Z" fill="#e8eefb"/>
      ${house(60,250,1,'#d98c5f')}${house(190,262,.8,'#7a8fb0')}${house(560,250,1,'#8fa874')}${house(680,262,.8,'#a24f4f')}
      ${pine(470,300,1.1)}<path class="s1star" d="M470 196 l5 10 l11 1 l-8 7 l3 11 l-11 -6 l-11 6 l3 -11 l-8 -7 l11 -1z" fill="#f4c34d"/>
      <g transform="translate(400 330)"><path d="M-30 60 V0 C-30 -30 20 -30 22 -4 L22 4 L34 -6 C44 -10 48 4 38 10 L22 26 V60Z" fill="#c8323a"/><rect x="-34" y="44" width="60" height="16" rx="4" fill="#fff"/></g>
      ${snow(25)}
      <g class="s1f"><g class="s1spin"><g stroke="#fff" stroke-width="3" stroke-linecap="round">${[0,60,120].map(a=>`<g transform="rotate(${a})"><path d="M0 -16 V16 M-5 -11 l5 5 l5 -5 M-5 11 l5 -5 l5 5"/></g>`).join('')}</g></g></g>
    </svg>`,
    biscuit: () => `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice"><style>${baseCss}
      .s6l{opacity:0;animation:s6l 10s infinite}@keyframes s6l{0%{opacity:0}8%,90%{opacity:1}100%{opacity:0}}
      .s6cat{animation:s6walk 10s linear infinite}@keyframes s6walk{from{transform:translate(-80px,0)}to{transform:translate(860px,0)}}
      .s6tail{animation:s6tail .6s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:0% 100%}@keyframes s6tail{to{transform:rotate(18deg)}}
      .s6legs{animation:s6legs .4s steps(2) infinite}@keyframes s6legs{50%{transform:translateX(3px)}}</style>
      ${sky('s6sky','#1d2a5e','#8a6a9a')}
      <path d="M0 320 Q400 300 800 320 V400 H0Z" fill="#e8eefb"/>
      ${house(40,250,1,'#c46a5a')}${house(330,240,1.1,'#e6cfa3')}${house(640,250,1,'#7a8fb0')}
      ${[100,260,420,580,740].map((x,i)=>`<g><rect x="${x-3}" y="230" width="6" height="95" fill="#2b2236"/><path d="M${x-12} 232 h24 l-4 -26 h-16z" fill="#4a4466" stroke="#2b2236" stroke-width="3"/>
        <g class="s6l" style="animation-delay:${i*1.5}s"><circle cx="${x}" cy="218" r="40" fill="#ffd877" opacity=".35"/><path d="M${x-12} 232 h24 l-4 -26 h-16z" fill="#ffe7a0" stroke="#2b2236" stroke-width="3"/></g>
        <path d="M${x-15} 206 h30 l-15 -12z" fill="#2b2236"/></g>`).join('')}
      <g class="s6cat" transform="translate(0 0)"><g transform="translate(0 322)">
        <path class="s6tail" d="M-26 -16 q-16 -6 -14 -30" stroke="#e8902e" stroke-width="7" fill="none" stroke-linecap="round"/>
        <ellipse cx="0" cy="-16" rx="28" ry="14" fill="#e8902e"/><circle cx="28" cy="-28" r="13" fill="#e8902e"/>
        <path d="M20 -38 l3 -12 l7 9z M30 -39 l6 -11 l3 12z" fill="#e8902e"/><circle cx="32" cy="-30" r="2" fill="#222"/><circle cx="25" cy="-30" r="2" fill="#222"/>
        <g class="s6legs"><rect x="-20" y="-6" width="6" height="12" fill="#c87420"/><rect x="12" y="-6" width="6" height="12" fill="#c87420"/></g>
        <path d="M-10 -26 q6 6 0 12 M2 -28 q6 6 0 12" stroke="#c87420" stroke-width="3" fill="none"/></g></g>
      ${snow(18)}</svg>`,
    clock: () => `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice"><style>${baseCss}
      .s11m{animation:s11 6s linear infinite;transform-origin:400px 170px}@keyframes s11{to{transform:rotate(360deg)}}
      .s11h{animation:s11 72s linear infinite;transform-origin:400px 170px}
      .s11bong{animation:s11b 3s ease-out infinite;opacity:0}@keyframes s11b{0%{opacity:0;transform:translateY(0) scale(.6)}20%{opacity:1}100%{opacity:0;transform:translateY(-60px) scale(1.2)}}
      .s11robin{animation:s11hop 1.6s ease-in-out infinite}@keyframes s11hop{0%,60%,100%{transform:translate(0,0)}75%{transform:translate(0,-10px)}}</style>
      ${sky('s11sky','#3a5a9a','#f2b7a0')}
      <path d="M0 340 Q400 310 800 340 V400 H0Z" fill="#e8eefb"/>${house(60,290,.9,'#d98c5f')}${house(640,290,.9,'#8fa874')}
      <rect x="340" y="90" width="120" height="270" fill="#c8b8a8"/><path d="M328 92 L400 10 L472 92Z" fill="#5d4a5e"/><rect x="330" y="86" width="140" height="10" fill="#fff"/>
      <circle cx="400" cy="170" r="48" fill="#fff4cc" stroke="#3b2a20" stroke-width="5"/>
      ${Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return `<circle cx="${400+Math.sin(a)*38}" cy="${170-Math.cos(a)*38}" r="3" fill="#3b2a20"/>`}).join('')}
      <line class="s11h" x1="400" y1="170" x2="400" y2="142" stroke="#3b2a20" stroke-width="6" stroke-linecap="round"/>
      <line class="s11m" x1="400" y1="170" x2="400" y2="130" stroke="#3b2a20" stroke-width="4" stroke-linecap="round"/>
      <g transform="translate(470 250)"><rect x="-26" y="-30" width="52" height="40" fill="#a8602e"/><path d="M-32 -28 L0 -50 L32 -28Z" fill="#7b3a1a"/><circle cx="0" cy="-10" r="10" fill="#3b2a20"/></g>
      <g class="s11robin" transform="translate(0 0)"><g transform="translate(470 212)"><ellipse cx="0" cy="0" rx="14" ry="11" fill="#7b5a40"/><circle cx="10" cy="-8" r="8" fill="#7b5a40"/><ellipse cx="6" cy="2" rx="8" ry="7" fill="#e8502e"/><path d="M17 -8 l7 2 l-7 2z" fill="#f4c34d"/><circle cx="12" cy="-10" r="1.6" fill="#222"/></g></g>
      <text class="s11bong" x="510" y="110" font-family="Georgia" font-size="30" font-weight="bold" fill="#8a1f2a">BONG!</text>
      <text class="s11bong" x="220" y="120" font-family="Georgia" font-size="24" font-weight="bold" fill="#8a1f2a" style="animation-delay:1.5s">BONG!</text>
      ${kidsRow(250,350)}${snow(14)}</svg>`,
    sea: () => `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice"><style>${baseCss}
      .s16tw{animation:s16tw 2.4s ease-in-out infinite}@keyframes s16tw{50%{opacity:.2}}
      .s16sled{animation:s16sled 8s ease-in-out infinite}@keyframes s16sled{0%{transform:translate(-120px,-30px)}50%,100%{transform:translate(0,0)}}</style>
      ${sky('s16sky','#0b1230','#2a3a7a')}<circle cx="600" cy="80" r="36" fill="#fff6d8"/>
      <ellipse cx="420" cy="330" rx="420" ry="70" fill="#5a7ac0"/><ellipse cx="420" cy="330" rx="400" ry="60" fill="#7a9ad8" opacity=".6"/>
      ${Array.from({length:22},(_,i)=>`<circle class="s16tw" cx="${60+(i*97)%720}" cy="${300+(i*29)%60}" r="${1.5+(i%3)}" fill="#fff" style="animation-delay:${(i%7)*.4}s"/>`).join('')}
      <ellipse cx="600" cy="340" rx="30" ry="6" fill="#fff6d8" opacity=".7"/>
      <path d="M0 230 Q160 200 300 280 L0 300Z" fill="#e8eefb"/>
      <g class="s16sled"><g transform="translate(230 270)">
        <path d="M-60 20 H50 q14 0 14 -12" stroke="#a8602e" stroke-width="6" fill="none"/><rect x="-56" y="4" width="100" height="10" fill="#c8323a"/>
        <circle cx="-6" cy="-20" r="26" fill="#fff"/><circle cx="-6" cy="-60" r="18" fill="#fff"/><circle cx="-12" cy="-64" r="2.5" fill="#222"/><circle cx="0" cy="-64" r="2.5" fill="#222"/><path d="M-6 -58 l12 3 l-12 3z" fill="#f08a24"/>
        <path d="M-22 -46 q16 8 32 0" stroke="#c8323a" stroke-width="6" fill="none"/><circle cx="-6" cy="-24" r="3" fill="#222"/><circle cx="-6" cy="-12" r="3" fill="#222"/>
        <path d="M-12 -52 q6 4 12 0" stroke="#222" stroke-width="2" fill="none"/></g></g>
      ${kidsRow(120,262,36)}${snow(10)}</svg>`,
    choir: () => `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice"><style>${baseCss}
      .s21n{animation:s21n 4s ease-out infinite;opacity:0}@keyframes s21n{0%{opacity:0;transform:translate(0,0)}20%{opacity:1}100%{opacity:0;transform:translate(40px,-150px) rotate(20deg)}}
      .s21blink{animation:s21b 4s infinite}@keyframes s21b{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}
      .s21sway{animation:s21s 2s ease-in-out infinite alternate}@keyframes s21s{to{transform:translateY(-4px)}}</style>
      ${sky('s21sky')}
      <path d="M0 330 Q400 300 800 330 V400 H0Z" fill="#e8eefb"/>
      ${pine(400,330,2.4)}${Array.from({length:10},(_,i)=>`<circle class="glow" cx="${330+(i*37)%140}" cy="${150+(i*23)%160}" r="5" fill="${['#ffd166','#ff6b6b','#7bdff2'][i%3]}" style="animation-delay:${i*.3}s"/>`).join('')}
      <path d="M640 120 h160" stroke="#5a3a24" stroke-width="10"/>
      <g transform="translate(700 92)"><ellipse cx="0" cy="0" rx="22" ry="26" fill="#b08a6a"/><ellipse cx="0" cy="8" rx="13" ry="14" fill="#e6d2b8"/>
        <g class="s21blink" style="transform-origin:0 -10px"><circle cx="-8" cy="-10" r="8" fill="#fff"/><circle cx="8" cy="-10" r="8" fill="#fff"/><circle cx="-8" cy="-10" r="4" fill="#222"/><circle cx="8" cy="-10" r="4" fill="#222"/></g>
        <path d="M-4 -2 l4 6 l4 -6z" fill="#f4c34d"/><path d="M-18 -22 l-4 -10 l10 6z M18 -22 l4 -10 l-10 6z" fill="#b08a6a"/></g>
      <g class="s21sway">${kidsRow(150,350,46)}</g>
      <g class="s21sway" style="animation-delay:.5s">${kidFig(560,350,'#2f7d4f','#c8323a')}${kidFig(610,352,'#7a8fb0','#f4c34d')}</g>
      ${['♪','♫','♪','♫','♪'].map((n,i)=>`<text class="s21n" x="${120+i*110}" y="260" font-size="34" fill="#ffe08a" style="animation-delay:${i*.8}s">${n}</text>`).join('')}
      <text class="s21n" x="690" y="150" font-size="18" font-family="Georgia" font-weight="bold" fill="#fff" style="animation-delay:2s">HOOO!</text>
      ${snow(14)}</svg>`,
    eve: () => `<svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice"><style>${baseCss}
      .s24sleigh{animation:s24fly 9s linear infinite}@keyframes s24fly{from{transform:translate(-300px,140px)}to{transform:translate(900px,-60px)}}
      .s24w{opacity:0;animation:s24w 9s infinite}@keyframes s24w{0%{opacity:0}10%,95%{opacity:1}100%{opacity:0}}
      .s24leg{animation:s24leg .3s steps(2) infinite}@keyframes s24leg{50%{transform:translateY(2px)}}</style>
      ${sky('s24sky','#070d26','#2a2556')}<circle cx="560" cy="110" r="60" fill="#fff6d8"/><circle cx="560" cy="110" r="90" fill="#fff6d8" opacity=".15"/>
      <path d="M0 300 Q400 270 800 300 V400 H0Z" fill="#e8eefb"/>
      ${[[30,260,'#d98c5f'],[150,270,'#7a8fb0'],[270,255,'#a24f4f'],[420,268,'#e6cfa3'],[540,258,'#8fa874'],[670,266,'#c46a5a']].map(([x,y,c],i)=>`<g transform="translate(${x} ${y})"><rect width="90" height="56" fill="${c}"/><path d="M-8 2 L45 -32 L98 2Z" fill="#fff"/><rect x="14" y="14" width="20" height="18" fill="#3b2a20"/><rect class="s24w" style="animation-delay:${i*0.7}s" x="14" y="14" width="20" height="18" fill="#ffd877"/><circle class="s24w" style="animation-delay:${i*0.7}s" cx="24" cy="23" r="22" fill="#ffd877" fill-opacity=".25"/><rect x="58" y="22" width="18" height="34" fill="#6b2f2a"/></g>`).join('')}
      <g class="s24sleigh">
        ${[0,1,2].map(i=>`<g transform="translate(${130+i*48} ${-6-i*6})"><ellipse cx="0" cy="0" rx="18" ry="8" fill="#8a5a3a"/><circle cx="18" cy="-8" r="6" fill="#8a5a3a"/><path d="M18 -14 l-4 -10 M20 -14 l6 -9" stroke="#5a3a24" stroke-width="2"/><g class="s24leg"><path d="M-10 6 l-4 10 M10 6 l4 10" stroke="#5a3a24" stroke-width="3"/></g>${i===2?'<circle cx="24" cy="-7" r="3" fill="#ffb0a0"/>':''}</g>`).join('')}
        <path d="M60 -4 L120 -14" stroke="#f4c34d" stroke-width="1.5"/>
        <path d="M0 0 h60 q10 0 10 -14 v-8 h-14 v8 h-44 q-12 -20 -18 0z" fill="#c8323a"/><path d="M-8 6 h76 q10 0 12 -8" stroke="#f4c34d" stroke-width="3" fill="none"/>
        <circle cx="30" cy="-30" r="10" fill="#c8323a"/><circle cx="34" cy="-36" r="7" fill="#f5d0b0"/><path d="M28 -40 q8 -10 14 2z" fill="#c8323a"/><circle cx="42" cy="-40" r="3" fill="#fff"/><path d="M28 -32 q6 8 12 0" fill="#fff"/>
        <rect x="6" y="-28" width="16" height="14" fill="#3fa36b"/><rect x="12" y="-28" width="4" height="14" fill="#f4c34d"/>
      </g>${snow(30)}</svg>`
  };

  const STORIES = {
    flurry: () => [
      `High above Snowfall Hollow, in a fluffy grey cloud, lived a tiny snowflake called Flurry. Flurry was the littlest snowflake of all, with six sparkly arms and one very big wish: to see the village lights up close.`,
      `On the first night of December, the cloud gave a gentle shiver, and down Flurry floated. Past the moon. Past the clock tower. Twirling and swirling until... plip! Flurry landed right on ${A()}'s mitten.`,
      `"Hello, little snowflake," whispered ${K()}. "Would you like to see our village?" Flurry sparkled a happy yes.`,
      `So off they went. They saw the bakery window full of cinnamon buns, the lanterns glowing like tiny suns, and the big Christmas tree in the square, waiting for its lights.`,
      `"Where would you like to stay?" asked ${K()}. Flurry looked up, up, up at the very top of the tree. So, very gently, Flurry was lifted high and tucked beside the golden star.`,
      `And there Flurry stayed, twinkling all December long, watching over Snowfall Hollow as the countdown to Christmas began.`
    ],
    biscuit: () => [
      `Every evening at dusk, old Mr. Bramble walked through Snowfall Hollow with his long brass pole and lit every lantern in the village. Trotting beside him, tail held high, came his orange cat, Biscuit.`,
      `But one snowy evening, Mr. Bramble had a terrible cold. "Ah... ah... ACHOO! I can't go out tonight," he sniffed. "Who will light the lanterns?" Biscuit gave a worried little "Mew?"`,
      `Just then, there was a knock at the door. It was ${K()}, bringing Mr. Bramble a jar of warm soup. "${WE()} can help!" ${Names.count===1?'said':'they said'} ${Names.count===1?A():''}${Names.count===1?'':'together'}.`,
      `Biscuit led the way, from lantern to lantern, padding through the snow. ${A()} held the little light steady, and Biscuit showed exactly where to go. One, two, three... until all twelve lanterns blinked awake, glowing gold.`,
      `From his window, Mr. Bramble saw the whole village shining. "Thank you, ${K()}," he smiled. "Biscuit chose the very best helpers." And Biscuit purred so loudly it nearly melted the snow.`
    ],
    clock: () => [
      `The clock in Snowfall Hollow's tower had chimed every hour for a hundred years. BONG! BONG! But one morning... it didn't. Its hands were stuck at seven o'clock.`,
      `Without the clock, everything went topsy-turvy. The rooster crowed at teatime. The baker made breakfast buns at bedtime. And nobody knew when to open their advent calendar!`,
      `So ${K()} climbed the winding stairs of the tower with Mrs. Penny, the clock keeper. There, tucked between the big brass gears, was a tiny nest of straw and ribbon. Inside sat a little robin, all fluffed up against the cold.`,
      `"The robin was keeping warm by the gears!" said ${A()}. "We can't send it out into the snow." Then ${K()} had a wonderful idea: a snug wooden robin house, lined with soft wool, hung right beside the warm clock face.`,
      `The robin hopped inside and chirped. Mrs. Penny gave the gears a gentle nudge, and... BONG! BONG! BONG! The whole village cheered. Now, if you listen closely when the clock chimes, you can hear a tiny "cheep!" right after.`
    ],
    sea: () => [
      `${K()} built the finest snowman Snowfall Hollow had ever seen. He had coal-button eyes, a carrot nose and a bright red scarf. His name was Sir Button.`,
      `That night, Sir Button sighed a frosty sigh. "I have heard of a place called the sea," he said, "big and sparkly and wide. I wish I could see it, just once." But the sea was very far away, and snowmen cannot go anywhere warm.`,
      `${A()} thought and thought. Then ${A()}'s eyes lit up. "Wait right here, Sir Button!"`,
      `The next evening, out came the old wooden sled. Carefully, carefully, Sir Button was rolled on board and pulled over the snowy hill. Below lay the frozen lake. The moon shone on the ice, and every star in the sky was reflected in it, as if the whole sky had come down to rest.`,
      `Sir Button gasped. "Is this... the sea?" "It's our snowy sea," smiled ${K()}. "Sparkly as the stars." "It's even better than I dreamed," whispered Sir Button, and he smiled the biggest coal-button smile.`
    ],
    choir: () => [
      `On the longest night of the year, everyone in Snowfall Hollow gathered by the big tree to sing carols. Lanterns bobbed, mittens clapped, and breath puffed out like little clouds.`,
      `High in a pine tree sat Olive, a very small owl. Olive loved music more than anything. But whenever she tried to hoot, out came only a squeaky "eep!"`,
      `${K()} spotted her up on her branch. "Come and sing with us, Olive!" "I can only squeak," said Olive sadly. ${A()} smiled. "Then we'll teach you a secret."`,
      `"Take a big breath," said ${K()}. "Puff out your feathers. And sing from your tummy!" Olive breathed in... puffed up... and out came "Hoo... hoo... HOOO!"`,
      `When the choir sang the very last song, a deep, warm "HOOO" floated down from the pine tree, right on the beat. It was the most perfect note of the night. And ever since, the choir saves Olive a place in the front row (well, the front branch).`
    ],
    eve: () => [
      `It was Christmas Eve in Snowfall Hollow. Stockings hung by the fire, cookies and a carrot waited on a plate, and ${K()} could hardly sit still.`,
      `But outside, the wind began to whoosh, and the snow fell so thick that nobody could see the clock tower. "What if Santa can't find our village?" asked ${A()}.`,
      `${Names.count===1?A()+' had':K()+' had'} an idea. With a grown-up's help, the little lantern from the hallway was lit and set in the window. Then the neighbours were told, and they told their neighbours... and one by one, a light glowed in every window of Snowfall Hollow.`,
      `High above the clouds, a sleigh was circling. "I can't see a thing!" said Santa. Then the littlest reindeer spotted a glow... and another... a whole village of tiny lights, shining up like a map of stars. "There it is!" cried Santa. "Snowfall Hollow!"`,
      `Down came the sleigh, as soft as a snowflake. And in the morning, beside the empty cookie plate, there was a note: <em>"Dear ${K()}, thank you for lighting my way. Love, S."</em>`,
      `Now snuggle down and close your eyes, ${K()}. When you wake up... it will be Christmas!`
    ]
  };

  function renderStory(body, key){
    const art = document.createElement('div'); art.className='story-art'; art.innerHTML = ART[key]();
    const txt = document.createElement('div'); txt.className='story-text';
    txt.innerHTML = STORIES[key]().map(p=>`<p>${p}</p>`).join('') + `<p class="story-end">~ The End ~</p>`;
    body.append(art, txt);
  }

  /* ---- Christmas morning finale ---- */
  const GIFTS = [
    ['a pocketful of starlight','to keep for cloudy days'],
    ['Biscuit the cat\'s loudest purr','and a very warm lap'],
    ['a sled ride with Sir Button','to the snowy sea'],
    ['a song from Olive the owl','HOOO-ray!'],
    ['Flurry the snowflake','who will never, ever melt'],
    ['the robin\'s first cheep of the morning','just for you'],
    ['a never-ending hug','from everyone in Snowfall Hollow'],
    ['a sprinkle of Christmas magic','use it wisely!']
  ];
  function renderFinale(body){
    const names = Names.list.length ? Names.list : ['You'];
    const wrap = document.createElement('div');
    wrap.innerHTML = `<div class="story-art"><svg viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice"><style>${baseCss}
      .f-night{animation:fnight 5s ease-in forwards}@keyframes fnight{to{opacity:0}}
      .f-sun{animation:fsun 5s ease-out forwards}@keyframes fsun{from{transform:translateY(160px)}to{transform:translateY(0)}}
      .f-ray{animation:fray 12s linear infinite;transform-origin:400px 170px}@keyframes fray{to{transform:rotate(360deg)}}
      .f-bell{animation:fbell 1s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:50% 0}@keyframes fbell{from{transform:rotate(-15deg)}to{transform:rotate(15deg)}}
      .f-msg{animation:fmsg 1.2s 3.5s both}@keyframes fmsg{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:none}}</style>
      <defs><linearGradient id="fday" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ec5ff"/><stop offset=".7" stop-color="#ffd6a8"/><stop offset="1" stop-color="#ffb08a"/></linearGradient>
      <linearGradient id="fnt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1230"/><stop offset="1" stop-color="#3a2f6a"/></linearGradient></defs>
      <rect width="800" height="400" fill="url(#fday)"/>
      <g class="f-sun"><g class="f-ray" opacity=".35">${Array.from({length:12},(_,i)=>`<path d="M400 170 L${400+Math.cos(i*Math.PI/6-0.08)*500} ${170+Math.sin(i*Math.PI/6-0.08)*500} L${400+Math.cos(i*Math.PI/6+0.08)*500} ${170+Math.sin(i*Math.PI/6+0.08)*500}Z" fill="#fff6c0"/>`).join('')}</g><circle cx="400" cy="170" r="50" fill="#ffe27a"/></g>
      <rect class="f-night" width="800" height="400" fill="url(#fnt)"/>
      <path d="M0 290 Q400 250 800 290 V400 H0Z" fill="#f4f8ff"/>
      ${house(40,240,1,'#d98c5f')}${house(170,250,.85,'#7a8fb0')}${house(560,244,1,'#8fa874')}${house(690,252,.85,'#a24f4f')}
      ${pine(400,300,1.6)}<path d="M400 140 l6 12 l13 1 l-10 9 l3 13 l-12 -7 l-12 7 l3 -13 l-10 -9 l13 -1z" fill="#f4c34d"/>
      <g transform="translate(290 70)"><g class="f-bell"><path d="M0 0 C-14 0 -16 14 -16 24 L-22 34 H22 L16 24 C16 14 14 0 0 0Z" fill="#f4c34d"/><circle cx="0" cy="36" r="5" fill="#b8860b"/></g></g>
      <g transform="translate(510 70)"><g class="f-bell" style="animation-delay:.5s"><path d="M0 0 C-14 0 -16 14 -16 24 L-22 34 H22 L16 24 C16 14 14 0 0 0Z" fill="#f4c34d"/><circle cx="0" cy="36" r="5" fill="#b8860b"/></g></g>
      <g class="f-msg"><rect x="140" y="320" width="520" height="62" rx="31" fill="#c8323a" stroke="#fff" stroke-width="5"/>
      <text x="400" y="361" text-anchor="middle" font-family="'Mountains of Christmas',cursive" font-weight="700" font-size="${Names.count>2?26:32}" fill="#fff">Merry Christmas${Names.count?', '+Names.all().replace(/&/g,'&amp;'):''}!</text></g>
      ${snow(16)}</svg></div>
      <div class="story-text" style="text-align:center">
        <p>The sun is up, the bells are ringing, and Snowfall Hollow is wide awake. Flurry is twinkling, Biscuit is purring, Sir Button is waving, and Olive is hooting her happiest HOOO. Everyone has left a present under the tree for ${names.length>1?'each of you':Names.count?names[0]:'you'}.</p>
        <p><strong>Tap ${names.length>1?'each present':'the present'} to unwrap it!</strong></p>
      </div>
      <div class="finale-gifts" style="display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin:10px 0"></div>
      <p class="win-msg" id="finaleMsg"></p>
      <p style="text-align:center" id="finaleCount"></p>`;
    body.appendChild(wrap);
    const box = wrap.querySelector('.finale-gifts');
    const colors=['#e04b52','#3fa36b','#4f8fe0','#a265d6','#f4c34d','#e8784a','#c8323a','#2f7d4f'];
    let unwrapped = 0;
    names.forEach((n,i)=>{
      const b = document.createElement('button');
      b.style.cssText='border:0;background:none;padding:0;width:150px;cursor:pointer;font:inherit;color:inherit';
      b.innerHTML = `<svg viewBox="0 0 120 120" width="120" height="120"><rect x="14" y="44" width="92" height="66" rx="5" fill="${colors[i%8]}"/><rect x="8" y="30" width="104" height="20" rx="5" fill="${colors[(i+6)%8]}"/><rect x="54" y="30" width="12" height="80" fill="#fff6c0"/><path d="M60 30 C40 4 22 18 38 30 M60 30 C80 4 98 18 82 30" stroke="#fff6c0" stroke-width="6" fill="none"/></svg>
        <div style="background:#fff;border:2px dashed #c8323a;border-radius:10px;padding:2px 6px;font-weight:600">For ${n}</div>`;
      b.setAttribute('aria-label', `Present for ${n}`);
      b.onclick = ()=>{
        if(b.dataset.open) return; b.dataset.open=1; unwrapped++;
        const [g, sub] = GIFTS[(i*3 + 1) % GIFTS.length];
        b.innerHTML = `<div style="font-size:54px;line-height:1.2;animation:pop .5s">${Icons.icon(['star','heart','snowflake','bell','snowman','gift','holly','moon'][i%8],90)}</div>
          <div style="background:#fff6d8;border-radius:12px;padding:6px 8px;font-size:15px"><strong>${n}</strong> got ${g}, <em>${sub}</em>!</div>`;
        window.confettiBurst && confettiBurst(body.closest('.modal-panel') ? wrap : wrap, 50);
        window.chime && [0,2,4,7].forEach((k,j)=>setTimeout(()=>chime(k), j*150));
        if(unwrapped===names.length) wrap.querySelector('#finaleMsg').textContent = Names.count ? `Merry Christmas, ${Names.all()}! Thank you for spending December in Snowfall Hollow.` : 'Merry Christmas! Thank you for spending December in Snowfall Hollow.';
      };
      box.appendChild(b);
    });
    wrap.style.position='relative'; wrap.style.overflow='hidden';
    let opened=0; try{ const o=JSON.parse(localStorage.getItem('snowfallHollow.opened')||'{}'); o[25]=true; opened=Object.keys(o).length; }catch(e){}
    wrap.querySelector('#finaleCount').textContent = `You opened ${Math.max(opened,1)} of 25 baubles this December. See you next year!`;
  }

  window.Stories = { renderStory, renderFinale };
})();
