/* The 25 days of Snowfall Hollow. */
(function(){
  const kid = (f) => Names.all(f||'little elf');
  const I = (n,s) => Icons.icon(n,s);

  const ILL = {
    cocoa: `<svg class="illus" viewBox="0 0 200 160"><ellipse cx="100" cy="146" rx="70" ry="9" fill="#0001"/><path d="M50 50 h90 l-8 90 h-74z" fill="#c8323a"/><path d="M140 66 q30 0 26 26 q-4 22 -30 22" stroke="#c8323a" stroke-width="10" fill="none"/><ellipse cx="95" cy="50" rx="45" ry="9" fill="#6b3a1e"/>${[70,88,104,118,95].map((x,i)=>`<rect x="${x-7}" y="${40-(i%2)*6}" width="14" height="12" rx="3" fill="#fff" transform="rotate(${i*17} ${x} 46)"/>`).join('')}<path d="M70 30 q-8 -12 0 -24 M95 26 q-8 -12 0 -24 M120 30 q-8 -12 0 -24" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/><path d="M60 90 h70" stroke="#fff" stroke-width="5" stroke-dasharray="8 8"/></svg>`,
    ginger: `<svg class="illus" viewBox="0 0 200 160"><circle cx="100" cy="88" r="70" fill="#fbe9d0"/><g transform="translate(36 22) scale(2)">${''}</g></svg>`,
    cider: `<svg class="illus" viewBox="0 0 200 160"><ellipse cx="100" cy="146" rx="80" ry="9" fill="#0001"/><path d="M40 60 h120 v60 a20 20 0 0 1 -20 20 h-80 a20 20 0 0 1 -20 -20z" fill="#5a6a8a"/><rect x="30" y="54" width="140" height="12" rx="6" fill="#3d4a66"/><ellipse cx="100" cy="62" rx="56" ry="6" fill="#d9822b"/><circle cx="80" cy="60" r="10" fill="#f4a03a" stroke="#fff6" stroke-width="2"/><rect x="104" y="56" width="34" height="6" rx="3" fill="#7b4a2a" transform="rotate(-10 120 59)"/><path d="M70 40 q-8 -12 0 -24 M100 36 q-8 -12 0 -24 M130 40 q-8 -12 0 -24" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/><g transform="translate(148 84) scale(.6)">${''}</g></svg>`,
    shortbread: `<svg class="illus" viewBox="0 0 200 160"><ellipse cx="100" cy="120" rx="86" ry="26" fill="#fff" stroke="#d9c9a8" stroke-width="3"/>${[[60,104],[100,96],[140,106],[80,124],[124,124]].map(([x,y],i)=>`<path transform="translate(${x} ${y}) rotate(${i*20})" d="M0 -20 L6 -7 L20 -6 L9 3 L13 18 L0 10 L-13 18 L-9 3 L-20 -6 L-6 -7Z" fill="#f2d18f" stroke="#c99a4a" stroke-width="2"/>`).join('')}</svg>`,
    bark: `<svg class="illus" viewBox="0 0 200 160">${[[30,60,'-8'],[100,50,'6'],[60,100,'4'],[130,100,'-5']].map(([x,y,r])=>`<g transform="rotate(${r} ${x+30} ${y+20})"><path d="M${x} ${y} l60 -6 l4 40 l-66 6z" fill="#5a3020"/><path d="M${x} ${y-6} l60 -6 l4 26 l-66 6z" fill="#fdf8f0"/>${[0,1,2,3,4].map(k=>`<rect x="${x+6+k*11}" y="${y-2+(k%2)*6}" width="6" height="4" fill="#e04b52" transform="rotate(${k*30} ${x+9+k*11} ${y})"/>`).join('')}</g>`).join('')}</svg>`,
    flakes: `<svg class="illus" viewBox="0 0 240 90">${[['M10 70 h50 v-50 h-50z','1'],['M80 70 h50 l-50 -50z','2'],['M150 70 l25 -50 l25 50 z','3']].map(([d,n],i)=>`<path d="${d}" fill="#fff" stroke="#4f8fe0" stroke-width="2"/><text x="${35+i*70}" y="86" text-anchor="middle" font-size="12" fill="#4f8fe0">${['Square','Triangle','Fold in thirds'][i]}</text>`).join('')}<g transform="translate(220 40) scale(.5)">${'<g stroke="#4f8fe0" stroke-width="5" stroke-linecap="round">'+[0,60,120].map(a=>`<g transform="rotate(${a})"><path d="M0 -36 V36 M-8 -26 l8 8 l8 -8 M-8 26 l8 -8 l8 8"/></g>`).join('')+'</g>'}</g></svg>`,
    pinecone: `<svg class="illus" viewBox="0 0 200 160"><path d="M100 10 V40" stroke="#c8323a" stroke-width="3"/><path d="M90 12 q10 -14 20 0 q-10 8 -20 0" fill="#c8323a"/>${Array.from({length:7},(_,r)=>{const n=3+Math.min(r,6-r); return Array.from({length:n},(_,k)=>`<ellipse cx="${100+(k-(n-1)/2)*16}" cy="${50+r*14}" rx="9" ry="7" fill="#8a5a3a" stroke="#5a3a24"/>`).join('')}).join('')}${Array.from({length:30},(_,i)=>`<circle cx="${70+(i*37)%60}" cy="${48+(i*23)%90}" r="2" fill="${['#f4d48a','#c99a4a','#fff'][i%3]}"/>`).join('')}<g transform="translate(150 110)"><ellipse rx="16" ry="12" fill="#e04b52"/><circle cx="12" cy="-10" r="8" fill="#e04b52"/><path d="M19 -10 l7 2 l-7 2z" fill="#f4c34d"/><circle cx="14" cy="-12" r="1.6" fill="#222"/></g></svg>`,
    saltdough: `<svg class="illus" viewBox="0 0 200 160">${[['star',30,30,'#fdf3e0'],['heart',110,24,'#fdf3e0'],['tree',70,80,'#fdf3e0']].map(([n,x,y])=>`<g transform="translate(${x} ${y})"><path d="M32 0 V-14" stroke="#c8323a" stroke-width="3"/><svg width="64" height="64" viewBox="0 0 64 64">${Icons.ICONS[n]}</svg><circle cx="32" cy="10" r="3" fill="#fff" stroke="#999"/></g>`).join('')}</svg>`,
    chain: `<svg class="illus" viewBox="0 0 240 100">${Array.from({length:7},(_,i)=>`<ellipse cx="${24+i*32}" cy="${50+Math.sin(i)*10}" rx="20" ry="12" fill="none" stroke="${['#e04b52','#3fa36b','#f4c34d','#4f8fe0'][i%4]}" stroke-width="9" transform="rotate(${i%2?70:0} ${24+i*32} ${50+Math.sin(i)*10})"/>`).join('')}</svg>`
  };
  ILL.ginger = `<svg class="illus" viewBox="0 0 200 160"><circle cx="100" cy="86" r="70" fill="#fbe9d0"/><svg x="40" y="20" width="120" height="120" viewBox="0 0 64 64">${Icons.ICONS.ginger}</svg></svg>`;

  function recipe(cfg){
    return (body)=>{
      body.innerHTML = `<p style="text-align:center">${cfg.intro()}</p>
        <div class="meta">${cfg.meta.map(m=>`<span>${m}</span>`).join('')}</div>
        <div class="card-cols"><div>${ILL[cfg.ill]}<h3>You will need</h3><ul class="checklist">${cfg.ing.map(i=>`<li>${i}</li>`).join('')}</ul>
          <p style="font-size:14px;opacity:.75">Tap each one when you've got it ready.</p></div>
        <div><h3>${cfg.stepsTitle||"Let's make it"}</h3><ol>${cfg.steps.map(s=>`<li>${s}</li>`).join('')}</ol>
          ${cfg.grownup?`<div class="grownup"><strong>Grown-up help:</strong> ${cfg.grownup}</div>`:''}
          ${cfg.tip?`<p><strong>Snowfall tip:</strong> ${cfg.tip}</p>`:''}${cfg.extra?cfg.extra():''}</div></div>`;
      body.querySelectorAll('.checklist li').forEach(li=>li.onclick=()=>li.classList.toggle('done'));
      if(cfg.after) cfg.after(body);
    };
  }
  const story = key => body => Stories.renderStory(body, key);
  const game = fn => body => Games[fn](body);

  const DAYS = [
    {title:'The Littlest Snowflake', kindLabel:'A Story', render: story('flurry')},
    {title:"Santa's Sleigh Catch", kindLabel:'A Game', render: game('catchPresents')},
    {title:'Snowy Village Hot Cocoa', kindLabel:'A Recipe', render: recipe({
      ill:'cocoa', intro:()=>`Warm hands, happy tummies! Here's a cozy cup of cocoa for ${kid('you')} to stir up.`,
      meta:['Makes 2 mugs','10 minutes','Easy'],
      ing:['2 cups (500 ml) milk (any kind)','2 tablespoons cocoa powder','2 tablespoons sugar','A tiny pinch of salt','¼ teaspoon vanilla extract','Mini marshmallows or whipped cream'],
      steps:['Put the cocoa, sugar and salt in a small pan. Add a little splash of milk and stir it into a smooth, chocolatey paste.','Pour in the rest of the milk and whisk.','Warm it over medium-low heat, stirring, until it is steamy but not bubbling (about 5 minutes).','Take it off the heat and stir in the vanilla.','Pour into mugs, wait a minute for it to cool a little, then pile on the marshmallows!'],
      grownup:'Please do the stove and the pouring. Kids can measure, stir the paste and add the toppings.',
      tip:'Add a candy cane as a stirring spoon for a minty twist.'
    })},
    {title:'Snowflake Maker', kindLabel:'A Game', render: game('snowflakeMaker')},
    {title:'Real Paper Snowflakes', kindLabel:'A Craft', render: recipe({
      ill:'flakes', intro:()=>`Yesterday you made a snowflake on the screen. Today, ${kid('you')} can make real ones to hang in the window!`,
      meta:['20 minutes','Easy','Craft'], stepsTitle:'How to make it',
      ing:['Square pieces of white paper (thin paper works best)','Child-safe scissors','Tape or string for hanging','A pencil (optional)'],
      steps:['Fold your square in half corner to corner to make a triangle.','Fold the triangle in half again to make a smaller triangle.','Now fold it into thirds: fold one side over, then the other, like a paper cone. Snip off the uneven tips at the top so it is flat.','Cut small shapes out of the edges: triangles, half-circles and zig-zags. Don\'t cut all the way across!','Very gently unfold your paper... ta-da! A snowflake with six points.','Tape your snowflakes to a window or hang them on string.'],
      grownup:'Folded paper can get thick, so little hands may need help with the scissors. Pencil lines first can help younger kids.',
      tip:'Try making one with big cuts and one with tiny cuts. Which do you like best?'
    })},
    {title:"Biscuit the Lamplighter's Cat", kindLabel:'A Story', render: story('biscuit')},
    {title:'Frosty Memory Match', kindLabel:'A Game', render: game('memory')},
    {title:'Gingerbread People', kindLabel:'A Recipe', render: recipe({
      ill:'ginger', intro:()=>`Run, run, as fast as you can... into the kitchen! Bakers ${kid('everywhere')}, aprons on!`,
      meta:['Makes about 20','Chill 1 hour','Bake 8–10 min'],
      ing:['3 cups (375 g) plain flour','1 teaspoon baking soda','2 teaspoons ground ginger','1 teaspoon ground cinnamon','¼ teaspoon salt','¾ cup (170 g) soft butter','¾ cup (150 g) brown sugar','1 egg','½ cup (120 ml) molasses or golden syrup','For icing: 1 cup powdered sugar + 1–2 tablespoons milk'],
      steps:['In a bowl, mix the flour, baking soda, ginger, cinnamon and salt.','In a big bowl, beat the butter and brown sugar until fluffy. Beat in the egg and molasses.','Stir the flour mix in a little at a time until it makes a soft dough.','Wrap the dough and chill it in the fridge for 1 hour.','Heat the oven to 350°F (175°C) and line baking trays with baking paper.','Roll the dough about ¼ inch (½ cm) thick on a floured table and cut out gingerbread people.','Bake for 8–10 minutes, then let them cool completely.','Mix powdered sugar and milk into thick icing and give everyone faces, buttons and smiles!'],
      grownup:'The oven and hot trays are a grown-up job. Contains wheat, egg and dairy.',
      tip:'Give each cookie a name. Maybe even yours!'
    })},
    {title:'Trim the Village Tree', kindLabel:'A Game', render: game('decorateTree')},
    {title:'Pinecone Bird Feeder', kindLabel:'A Craft', render: recipe({
      ill:'pinecone', intro:()=>`The birds of Snowfall Hollow get hungry in winter. Let's make them a treat, ${kid('little elf')}!`,
      meta:['20 minutes','A bit messy!','Craft'], stepsTitle:'How to make it',
      ing:['A big, open pinecone','String or yarn (about an arm long)','Sunflower seed butter or vegetable shortening','Birdseed','A spoon or butter knife','A tray or plate'],
      steps:['Tie the string tightly around the top of the pinecone.','Spoon some sunflower seed butter onto a plate and spread it all over the pinecone, getting into the gaps.','Pour birdseed onto the tray and roll the sticky pinecone in it until it is covered.','Hang it from a tree branch you can see from a window.','Watch for visitors! Can you spot a robin?'],
      grownup:'Sunflower seed butter keeps it nut-free. Help hang the feeder somewhere safe, and wash hands afterwards.',
      tip:'Keep a "bird diary" and draw every bird you see.'
    })},
    {title:'The Sleepy Clock Tower', kindLabel:'A Story', render: story('clock')},
    {title:'Snowman Slide Puzzle', kindLabel:'A Game', render: game('slidingPuzzle')},
    {title:'Warm Spiced Apple Cider', kindLabel:'A Recipe', render: recipe({
      ill:'cider', intro:()=>`This smells like Christmas! A warm, fruity drink for ${kid('you')} after playing in the snow.`,
      meta:['Makes 4 cups','20 minutes','No alcohol'],
      ing:['4 cups (1 litre) apple juice or apple cider','1 orange, sliced into rounds','2 cinnamon sticks','4 whole cloves','1 tablespoon honey or maple syrup (optional)'],
      steps:['Pour the apple juice into a pan.','Add the orange slices, cinnamon sticks and cloves.','Heat it gently until it is steamy, then let it simmer on low for 15 minutes.','Scoop out the spices and orange slices.','Stir in honey if you like it sweeter, and let it cool until it\'s warm, not hot, before drinking.'],
      grownup:'The stove and the hot pan are a grown-up job. Honey is not for babies under 1 year old.',
      tip:'Kids can poke the cloves into an orange slice. It looks like a little star!'
    })},
    {title:'Snowball Target Toss', kindLabel:'A Game', render: game('snowballToss')},
    {title:'Salt Dough Ornaments', kindLabel:'A Craft', render: recipe({
      ill:'saltdough', intro:()=>`Make ornaments that ${kid('you')} can keep for years and years!`,
      meta:['30 min + baking','Easy','Craft'], stepsTitle:'How to make it',
      ing:['1 cup plain flour','½ cup salt','½ cup water','Cookie cutters','A drinking straw','Paints and ribbon'],
      steps:['Mix the flour and salt in a bowl, then slowly stir in the water.','Squish and knead the dough with your hands until it is smooth, like play dough.','Roll it out about ¼ inch (½ cm) thick and press out shapes with cookie cutters.','Poke a hole near the top of each shape with a straw (for the ribbon later).','Bake at 250°F (120°C) for 2–3 hours until hard, or leave them to air-dry for 2 days.','When cool, paint them, let them dry, and thread a ribbon through the hole.'],
      grownup:'Please handle the oven. These are NOT for eating, and keep the dough away from pets (salt is bad for dogs).',
      tip:'Press a hand or a thumbprint into one and write the year on the back!'
    })},
    {title:'The Snowman Who Wanted to See the Sea', kindLabel:'A Story', render: story('sea')},
    {title:'Gingerbread House Decorator', kindLabel:'A Game', render: game('gingerbread')},
    {title:'Easy 3-Ingredient Shortbread', kindLabel:'A Recipe', render: recipe({
      ill:'shortbread', intro:()=>`Only three ingredients! Perfect for little bakers like ${kid('you')}.`,
      meta:['Makes about 16','15 min + baking','Easy'],
      ing:['1 cup (225 g) soft butter','½ cup (100 g) sugar, plus a little extra','2 cups (250 g) plain flour'],
      steps:['Heat the oven to 325°F (160°C) and line a tray with baking paper.','Squish the butter and sugar together with a wooden spoon until creamy.','Add the flour and mix, then use your hands to press it into a ball.','Roll it out about ½ inch (1 cm) thick and cut out stars or circles.','Prick each one with a fork a few times.','Bake for 15–20 minutes until just pale golden at the edges.','Sprinkle with a little sugar and let them cool on the tray: they get crunchy as they cool.'],
      grownup:'The oven is a grown-up job. Contains wheat and dairy.',
      tip:'Wrap a few in a napkin with a ribbon: a perfect homemade gift!'
    })},
    {title:'Winter Word Search', kindLabel:'A Game', render: game('wordSearch')},
    {title:'Kindness Paper Chain', kindLabel:'An Activity', render: recipe({
      ill:'chain', intro:()=>`The best Christmas magic is kindness. Let's make a chain of kind things to do, ${kid('little elf')}!`,
      meta:['15 minutes','Easy','Activity'], stepsTitle:'How to make it',
      ing:['Strips of coloured paper (about 1 inch by 8 inches)','A pencil or crayons','Tape or a glue stick'],
      steps:['On each strip, write or draw one kind thing you could do.','Loop the first strip into a ring and tape it.','Thread the next strip through the ring, loop it and tape it. Keep going to make a chain!','Hang it up. Each day, tear off one link and do the kind thing on it.'],
      grownup:'Younger kids can draw pictures while a grown-up writes the words.',
      extra:()=>`<h3>Kindness missions</h3><ul class="checklist kind">${['Make a card for someone','Help set the table','Share a toy or a treat','Give someone a big hug','Say thank you to a helper in your town','Tidy up without being asked','Draw a picture for a neighbour','Read a story to someone'].map(k=>`<li>${k}</li>`).join('')}</ul>
        <p style="margin-top:12px"><strong>My own kind idea:</strong></p><textarea class="note-box" placeholder="Type your idea here..."></textarea>`,
      after:(body)=>{
        const ta=body.querySelector('textarea'); const KEY='snowfallHollow.kindIdea';
        try{ ta.value=localStorage.getItem(KEY)||''; }catch(e){}
        ta.oninput=()=>{ try{localStorage.setItem(KEY, ta.value);}catch(e){} };
      }
    })},
    {title:'The Owl Who Couldn\'t Hoot', kindLabel:'A Story', render: story('choir')},
    {title:'Melty Peppermint Bark', kindLabel:'A Recipe', render: recipe({
      ill:'bark', intro:()=>`Crunch, smash, sprinkle! A sweet treat that ${kid('you')} can help make.`,
      meta:['Makes 1 tray','15 min + 30 min chilling','Easy'],
      ing:['12 oz (340 g) white or milk chocolate','6 candy canes','A zip-top bag and a rolling pin','A baking tray and baking paper'],
      steps:['Line the tray with baking paper.','Put the candy canes in the bag, seal it, and gently bash them into small pieces with the rolling pin. Fun!','Melt the chocolate in short 30-second bursts in the microwave, stirring in between, until smooth.','Stir half of the candy cane pieces into the chocolate.','Spread the chocolate on the tray and sprinkle the rest of the candy on top.','Pop it in the fridge for 30 minutes, then break it into pieces.'],
      grownup:'Melted chocolate can be hot, so a grown-up should melt and pour it. Hard candy pieces aren\'t safe for very young children.',
      tip:'Put pieces in a jar with a bow and give them to a neighbour.'
    })},
    {title:'Light the Lanterns', kindLabel:'A Game', render: game('lanterns')},
    {title:'Christmas Eve: The Lantern in the Window', kindLabel:'A Christmas Eve Story', render: story('eve')},
    {title:'Christmas Morning in Snowfall Hollow', kindLabel:'The Grand Finale', render: body => Stories.renderFinale(body)}
  ];
  window.DAYS = DAYS;
})();
