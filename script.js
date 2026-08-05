// Grain intensifies as you scroll down the page.
(function(){
  var grain = document.querySelector('.grain-layer');
  if(!grain) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce){ grain.style.setProperty('--grain','.09'); return; }
  var MIN = 0.035, MAX = 0.16, ticking = false;
  function update(){
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var p = h > 0 ? Math.min(window.scrollY / h, 1) : 0;
    grain.style.setProperty('--grain', (MIN + (MAX - MIN) * p).toFixed(3));
    ticking = false;
  }
  window.addEventListener('scroll', function(){
    if(!ticking){ requestAnimationFrame(update); ticking = true; }
  }, {passive:true});
  window.addEventListener('resize', update);
  update();
})();

// Reveal list/card rows on scroll.
(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.reveal');
  if(reduce || !('IntersectionObserver' in window)){
    items.forEach(function(el){ el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:.15});
  items.forEach(function(el){ io.observe(el); });
})();
