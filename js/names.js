/* Names: stored in localStorage, overridable via ?names=Ava,Leo */
(function(){
  const KEY='snowfallHollow.names';
  const clean = n => String(n||'').replace(/[<>&"]/g,'').trim().slice(0,20);
  const params = new URLSearchParams(location.search);
  let names = null;          // null = never set; [] = skipped
  try{ const raw=localStorage.getItem(KEY); if(raw!==null) names=JSON.parse(raw); }catch(e){}
  if(params.has('names')){
    names = params.get('names').split(',').map(clean).filter(Boolean).slice(0,8);
    try{ localStorage.setItem(KEY, JSON.stringify(names)); }catch(e){}
  }
  if(names && !Array.isArray(names)) names=null;

  function join(list, fallback){
    if(!list.length) return fallback;
    if(list.length===1) return list[0];
    return list.slice(0,-1).join(', ')+' & '+list[list.length-1];
  }
  const N = {
    get list(){ return (names||[]).slice(); },
    get isSet(){ return names!==null; },
    get count(){ return (names||[]).length; },
    set(list){ names=list.map(clean).filter(Boolean).slice(0,8); try{localStorage.setItem(KEY,JSON.stringify(names));}catch(e){} },
    /* "Ava", "Ava & Leo", "Ava, Leo & Mia" or fallback */
    all(fallback='little elf'){ return join(N.list, fallback); },
    /* hero i (0-based) of a story, falling back to a storybook character */
    hero(i, fallback){ const l=N.list; return l.length? l[i % l.length] : fallback; },
    /* group phrase for "you": "Ava" / "Ava and Leo" / "Ava, Leo and Mia" */
    you(){ return N.count? join(N.list,'') : 'you'; },
    friends(){ return N.count>1; },
    /* prose: "Ava" / "Ava and Leo" / "Ava, Leo and Mia" */
    prose(fallback){ const l=N.list; if(!l.length) return fallback; return l.length===1?l[0]:l.slice(0,-1).join(', ')+' and '+l[l.length-1]; },
    /* the others besides hero 0, for "and her friends" etc */
    others(){ return N.list.slice(1); }
  };
  window.Names = N;
})();
