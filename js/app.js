
(() => {
  const slides=[...document.querySelectorAll('.slide')]; let current=0; let touchX=null;
  const title=document.getElementById('navTitle'), counter=document.getElementById('counter'), bar=document.getElementById('bar');
  function show(i){
    i=Math.max(0,Math.min(slides.length-1,i));
    slides.forEach((s,idx)=>{s.classList.toggle('active',idx===i);s.classList.toggle('exit-left',idx<i)});
    current=i; title.textContent=slides[i].dataset.title||''; counter.textContent=`${i+1} / ${slides.length}`; bar.style.width=`${((i+1)/slides.length)*100}%`;
    slides[i].scrollTop=0;
  }
  document.getElementById('next').addEventListener('click',()=>show(current+1));
  document.getElementById('prev').addEventListener('click',()=>show(current-1));
  document.addEventListener('keydown',e=>{if(document.getElementById('appendix').classList.contains('open')){if(e.key==='Escape')closeAppendix();return;} if(['ArrowRight','PageDown',' '].includes(e.key)){if(!/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)){e.preventDefault();show(current+1)}} if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();show(current-1)} if(e.key.toLowerCase()==='a')toggleAppendix();});
  document.getElementById('deck').addEventListener('touchstart',e=>{touchX=e.changedTouches[0].clientX},{passive:true});
  document.getElementById('deck').addEventListener('touchend',e=>{if(touchX===null)return;const dx=e.changedTouches[0].clientX-touchX;if(Math.abs(dx)>70)show(current+(dx<0?1:-1));touchX=null},{passive:true});
  show(0);

  // Prediction activity
  document.querySelectorAll('.molecule').forEach(card=>{
    card.querySelectorAll('.choice').forEach(btn=>btn.addEventListener('click',()=>{
      card.querySelectorAll('.choice').forEach(b=>b.classList.remove('selected','correct','wrong'));btn.classList.add('selected');
    }));
  });
  document.getElementById('revealAll').addEventListener('click',()=>{
    document.querySelectorAll('.molecule').forEach(card=>{
      const ans=card.dataset.answer; const chosen=card.querySelector('.choice.selected');
      card.querySelectorAll('.choice').forEach(b=>{if(b.textContent.trim()===ans)b.classList.add('correct')});
      if(chosen && chosen.textContent.trim()!==ans)chosen.classList.add('wrong');
      const box=card.querySelector('.answer');box.textContent=ans;box.classList.add('revealed');
    });
  });

  // Prompt animation
  let promptTimer=null;
  document.getElementById('animatePrompt').addEventListener('click',()=>{
    const lines=[...document.querySelectorAll('.prompt-line')]; lines.forEach(x=>x.classList.remove('on')); clearInterval(promptTimer); let i=0;
    const add=()=>{if(i<lines.length){lines[i++].classList.add('on')}else clearInterval(promptTimer)};add();promptTimer=setInterval(add,420);
  });
  document.querySelectorAll('.prompt-line').forEach(x=>x.classList.add('on'));


  // Interactive molecular viewer is initialized from js/molecule-viewer.js
  window.MoleculeViewer?.init();

  // Stoichiometry tutor
  const tutor=document.getElementById('stoichTutor'); const steps=[...tutor.querySelectorAll('.tutor-step')]; const dots=[...tutor.querySelectorAll('.progress-dots i')]; let ts=0;
  function tutorShow(n){ts=n;steps.forEach((s,i)=>s.classList.toggle('on',i===n));dots.forEach((d,i)=>d.classList.toggle('on',i<=n));}
  function mark(step,ok,msg){const fb=steps[step].querySelector('.feedback');fb.className='feedback '+(ok?'good':'bad');fb.innerHTML=msg;if(ok)setTimeout(()=>tutorShow(step+1),650)}
  tutor.querySelectorAll('.tutorCheck').forEach((b,i)=>b.addEventListener('click',()=>{
    if(i===0){const v=document.getElementById('s1').value;mark(0,v==='mass',v==='mass'?'Correct — 6.0 g is a mass of Mg.':'Look again: the problem gives 6.0 g of Mg.')}
    if(i===1){const v=parseFloat(document.getElementById('s2').value);const target=6/24.3;mark(1,Number.isFinite(v)&&Math.abs(v-target)<0.005,`6.0 ÷ 24.3 = <strong>${target.toFixed(3)} mol Mg</strong>.`)}
    if(i===2){const v=document.getElementById('s3').value;mark(2,v==='1','The coefficients 2 and 2 simplify to a <strong>1 : 1</strong> mole ratio.')}
    if(i===3){const v=parseFloat(document.getElementById('s4').value);const target=(6/24.3)*40.3;mark(3,Number.isFinite(v)&&Math.abs(v-target)<0.12,`(${(6/24.3).toFixed(3)} mol) × 40.3 g mol⁻¹ ≈ <strong>${target.toFixed(2)} g MgO</strong>.`)}
  }));
  document.getElementById('restartTutor').addEventListener('click',()=>{['s1','s2','s3','s4'].forEach(id=>document.getElementById(id).value='');steps.forEach(s=>{const f=s.querySelector('.feedback');if(f&&s.dataset.step!=='4'){f.className='feedback';f.textContent=''}});tutorShow(0)});

  // Participant VSEPR source pack
  const vseprPack=document.getElementById('vseprPack');
  function openVseprPack(){closeAppendix();vseprPack.classList.add('open');vseprPack.setAttribute('aria-hidden','false')}
  function closeVseprPack(){vseprPack.classList.remove('open');vseprPack.setAttribute('aria-hidden','true')}
  document.getElementById('openVseprPack')?.addEventListener('click',openVseprPack);
  document.getElementById('openVseprPackFromToolkit')?.addEventListener('click',openVseprPack);
  document.getElementById('closeVseprPack')?.addEventListener('click',closeVseprPack);

  // Appendix
  const appendix=document.getElementById('appendix');
  function openAppendix(){closeVseprPack();appendix.classList.add('open');appendix.setAttribute('aria-hidden','false')}
  function closeAppendix(){appendix.classList.remove('open');appendix.setAttribute('aria-hidden','true')}
  function toggleAppendix(){appendix.classList.contains('open')?closeAppendix():openAppendix()}
  document.getElementById('appendixBtn').addEventListener('click',toggleAppendix);document.getElementById('closeAppendix').addEventListener('click',closeAppendix);document.getElementById('openAppendixFromEnd').addEventListener('click',openAppendix);
})();

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(() => {}));
}
