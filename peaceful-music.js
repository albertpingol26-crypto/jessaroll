const peacefulAudio=document.querySelector('#peace-audio');
const peacefulButton=document.querySelector('#peace-toggle');
const peacefulStatus=document.querySelector('#peace-status');
const peacefulPanel=document.querySelector('#peace-panel');
peacefulAudio.volume=.3;
function setPeacefulPanel(open){
 peacefulPanel.classList.toggle('is-open',open);
 peacefulPanel.inert=!open;
 peacefulPanel.setAttribute('aria-hidden',String(!open));
 peacefulButton.setAttribute('aria-expanded',String(open));
 peacefulButton.textContent=open?'Hide music ♫':'Quiet Peace ♫';
 peacefulButton.setAttribute('aria-label',open?'Hide Quiet Peace music controls':'Show Quiet Peace music controls');
}
async function playPeacefulMusic(){try{await peacefulAudio.play()}catch(error){peacefulStatus.textContent=error.name==='NotAllowedError'?'Tap Play whenever you’re ready.':'Please refresh to load the music.'}}
peacefulAudio.addEventListener('play',()=>{peacefulStatus.textContent='Soft notes. A little moment of peace.'});
peacefulAudio.addEventListener('error',()=>{peacefulStatus.textContent='Please refresh to load the music.'});
peacefulButton.addEventListener('click',()=>setPeacefulPanel(peacefulButton.getAttribute('aria-expanded')!=='true'));
document.querySelector('.music').addEventListener('keydown',event=>{if(event.key==='Escape'&&peacefulButton.getAttribute('aria-expanded')==='true'){setPeacefulPanel(false);peacefulButton.focus()}});
setPeacefulPanel(false);
const welcome=document.querySelector('#welcome');
const enterButton=document.querySelector('#enter-garden');
const mainPage=document.querySelector('#main-page');
enterButton.addEventListener('click',()=>{
 mainPage.hidden=false;
 mainPage.inert=false;
 // Invoke playback inside the click gesture, before waiting for the transition.
 playPeacefulMusic();
 welcome.inert=true;
 welcome.setAttribute('aria-hidden','true');
 welcome.classList.add('leaving');
 mainPage.classList.add('entered');
 document.body.classList.remove('welcome-active');
 window.scrollTo(0,0);
 const heading=document.querySelector('#home h1');
 heading.setAttribute('tabindex','-1');
 heading.focus({preventScroll:true});
 const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 setTimeout(()=>{welcome.hidden=true},reduceMotion?0:650);
},{once:true});
