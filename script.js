const $=id=>document.getElementById(id),sleep=ms=>new Promise(r=>setTimeout(r,ms)),R=(a,b)=>a+Math.random()*(b-a);
const YES=new Date('2026-11-11T11:11:00'),now=()=>new Date();

// masthead info
const todayStr=now().toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short',year:'numeric'});
$('today').textContent=todayStr.toUpperCase();
const days=Math.max(0,Math.floor((now()-YES)/864e5));
$('vol').textContent='VOL. I · NO. '+(days+1);

// ticker: rotating daily breaking news
const NEWS=[
 'Disha ji makes every ordinary day feel a little more special.',
 'Her smile is still the best part of my day.',
 'Distance cannot change how close she feels.',
 'Her voice is the calmest part of my day.',
 'Grateful, once again, that she is in my life.',
 'Her kindness is something I admire every single day.',
 'Disha ji is the best art my eyes have ever seen.'
];
const di=Math.floor((now()-new Date('2026-11-26T00:00:00'))/864e5);
const a=NEWS[((di%NEWS.length)+NEWS.length)%NEWS.length],b=NEWS[(((di+1)%NEWS.length)+NEWS.length)%NEWS.length];
const line=`${a}  ◆  ${b}  ◆  Every page of this paper is for Disha ji  ◆  `;
$('tk1').textContent=line;$('tk2').textContent=line;

// headline: word by word ink reveal
function writeHead(){
  const h=$('head');h.innerHTML='';
  const parts=[['One Smile',''],['One Person','and everything'],['Best','ap']];
  let i=0;parts.forEach(([t,c],li)=>{
    t.trim().split(' ').forEach(w=>{const s=document.createElement('span');s.className='w '+c;s.textContent=w;s.style.animationDelay=(i++*.28)+'s';h.appendChild(s)});
    if(li<2)h.appendChild(document.createElement('br'));
  });
}

// intro sequence
const intro=$('intro'),paper=$('paper');
async function play(){
  intro.style.display='';intro.className='';$('ex').className='ex';paper.classList.remove('on');
  document.querySelectorAll('.rv').forEach(e=>e.classList.remove('in'));$('stamp').classList.remove('on');$('photo').classList.remove('color');
  window.scrollTo(0,0);$('head').innerHTML='';
  // restart css animations
  document.querySelectorAll('.np').forEach(n=>{n.style.animation='none';void n.offsetWidth;n.style.animation=''});
  await sleep(3300);$('ex').classList.add('on');confetti(innerWidth/2,innerHeight*.72,40);
  await sleep(1500);intro.classList.add('zoom');
  await sleep(800);paper.classList.add('on');intro.classList.add('out');
  await sleep(600);writeHead();setTimeout(()=>$('stamp').classList.add('on'),1800);
  await sleep(1200);observe();
  setTimeout(()=>{intro.style.display='none'},1200);
}

// reveal on scroll
let io;
function observe(){
  if(io)io.disconnect();
  io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);
    if(e.target.id==='photo')setTimeout(()=>e.target.classList.add('color'),1200);
    if(e.target.classList.contains('counter'))count()}}),{threshold:.2});
  document.querySelectorAll('.rv').forEach(e=>io.observe(e));
}
function count(){let n=0;const end=days,el=$('days'),t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/1600);el.textContent=Math.round(end*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)})(t0)}

// canvas: petals + tap doodles
const cv=$('fx'),cx=cv.getContext('2d');let W,H,parts=[],pet=[],dood=[];
const rs=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight};rs();addEventListener('resize',rs);
const cc=['#b3262e','#2a2622','#ffc2d6','#d98ca3','#e8c36a'];
function confetti(x,y,n){for(let i=0;i<n;i++){const an=R(-Math.PI,0),v=R(4,12);parts.push({x,y,vx:Math.cos(an)*v,vy:Math.sin(an)*v,w:R(5,9),h:R(3,6),r:R(0,6),vr:R(-.3,.3),c:cc[Math.random()*5|0],l:1})}}
for(let i=0;i<16;i++)pet.push({x:R(0,innerWidth),y:R(-innerHeight,innerHeight),s:R(4,7),vy:R(.4,.9),vx:R(-.2,.5),r:R(0,6),vr:R(-.02,.02)});
function heart(x,y,s,rot,p){cx.save();cx.translate(x,y);cx.rotate(rot);cx.scale(s,s);cx.beginPath();cx.moveTo(0,7);cx.bezierCurveTo(-14,-3,-11,-13,-4,-12);cx.bezierCurveTo(-1,-12,0,-9,0,-8);cx.bezierCurveTo(0,-9,1,-12,4,-12);cx.bezierCurveTo(11,-13,14,-3,0,7);cx.restore()}
addEventListener('pointerdown',e=>{if(e.target.tagName==='BUTTON')return;dood.push({x:e.clientX,y:e.clientY,s:R(1.4,2.2),r:R(-.4,.4),t:0})});
(function lp(t){cx.clearRect(0,0,W,H);
  parts=parts.filter(p=>p.l>0&&p.y<H+20);parts.forEach(p=>{p.vy+=.25;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;p.l-=.008;cx.save();cx.globalAlpha=Math.min(1,p.l*2);cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.fillRect(-p.w/2,-p.h/2,p.w,p.h);cx.restore()});
  pet.forEach(p=>{p.x+=p.vx+Math.sin(t/1100+p.r)*.4;p.y+=p.vy;p.r+=p.vr;if(p.y>H+10){p.y=-10;p.x=R(0,W)}cx.save();cx.globalAlpha=.5;cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle='#e9a3bb';cx.beginPath();cx.ellipse(0,0,p.s,p.s*.6,0,0,7);cx.fill();cx.restore()});
  dood=dood.filter(d=>d.t<1);dood.forEach(d=>{d.t+=.018;const k=d.t;cx.save();cx.globalAlpha=k<.7?1:1-(k-.7)/.3;cx.strokeStyle='#b3262e';cx.lineWidth=2;cx.lineCap='round';
    // hand-drawn heart: draw progressively
    const pts=[];for(let a=0;a<=Math.PI*2;a+=.08){pts.push([16*Math.pow(Math.sin(a),3),-(13*Math.cos(a)-5*Math.cos(2*a)-2*Math.cos(3*a)-Math.cos(4*a))])}
    const n=Math.floor(pts.length*Math.min(1,k/.6));cx.translate(d.x,d.y-12);cx.rotate(d.r);cx.scale(d.s*.8,d.s*.8);cx.beginPath();for(let i=0;i<n;i++){const [x,y]=pts[i];i?cx.lineTo(x,y):cx.moveTo(x,y)}cx.stroke();cx.restore()});
  requestAnimationFrame(lp)})(0);

$('again').onclick=()=>play();
play();
