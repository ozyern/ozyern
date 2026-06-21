import{useState,useEffect,useRef,useCallback}from'react'

const heroPhoto='/assets/favicon.png'

/* ── Icons ────────────────────────────────────────────────── */
const HoIco=()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
const BrIco=()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="2" y1="11" x2="22" y2="11"/></svg>
const LaIco=()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
const PlIco=()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="4"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/></svg>
const BlIco=()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
const PeIco=()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
const MsIco=()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
const EnIco=()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
const GH=()=><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
const TG=()=><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.048 9.648c-.154.686-.555.854-1.123.531l-3.107-2.29-1.499 1.44c-.166.166-.305.305-.625.305l.223-3.164 5.756-5.196c.25-.223-.054-.346-.387-.123L7.398 14.8 4.332 13.84c-.672-.21-.686-.672.14-.994l10.88-4.194c.558-.203 1.048.123.87.994l-.66-.398z"/></svg>
const ML=()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
const WB=()=><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
const EX=()=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
const Arw=()=><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>

const EMAIL='ozyern.dev@gmail.com'

/* ── Data ─────────────────────────────────────────────────── */
const EXP=[
  {company:'Feather Engine',tag:'Open Source',role:'Maintainer',date:'2025 — Present',desc:'Bash-based ColorOS/OxygenOS 16 porting framework for SM8350. Smali AI patching, OTA generation, SuperVOOC 65W paths, premium feature-gating.',tags:['Bash','SM8350','ColorOS 16','OTA','Smali']},
  {company:'ReVork',tag:'Community',role:'Founder',date:'2025 — Present',desc:'~200-member Telegram community for custom ROM development. Sabrina Carpenter-themed role system, release channels, developer support.',tags:['Community','Android','Telegram']},
  {company:'sabrina.ozyern.me',tag:'Web Dev',role:'Developer',date:'2024 — Present',desc:'Liquid-glass fan site — gallery, era-filtered discography, Dynamic Island nav, birthday campaign. Cold-emailed Foundation Media Partners.',tags:['HTML/CSS/JS','GitHub Pages']},
  {company:'Feather Kernel',tag:'Kernel',role:'Developer',date:'2025',desc:'Custom OP9 Pro kernel — binary string patching, SukiSU Ultra spoof modules, KernelSU framework, AnyKernel3 packaging.',tags:['Kernel','KernelSU','AnyKernel']},
  {company:'patidar.ozyern.me',tag:'Web Dev',role:'Developer',date:'2025 — Present',desc:"Dark luxury red/gold fan site for RCB's Rajat Patidar. Dynamic Island nav, dense grid layouts, AI-powered news page.",tags:['HTML/CSS/JS','RCB','Anthropic API']},
]

const AWARDS=[
  {icon:'👥',name:'ReVork Community',sub:'~200 members · Telegram'},
  {icon:'🔴',name:'OOS 16.1 Port',sub:'First SM8350 release'},
  {icon:'⚡',name:'Feather Kernel v1.4',sub:'SukiSU Ultra · OP9 Pro'},
  {icon:'📧',name:'Foundation Media',sub:'Cold email · Sabrina site'},
  {icon:'🏏',name:'patidar.ozyern.me',sub:'RP21 · RCB Fan HQ'},
  {icon:'🌐',name:'sabrina.ozyern.me',sub:'Indexed · Live globally'},
]

const SKILLS=[
  {icon:'🔧',name:'Android ROM Dev',num:'01',desc:'Low-level porting, partition manipulation, smali patching, OTA generation.',tags:['port.sh','Smali','ADB','OTA','ColorOS 16']},
  {icon:'⚙️',name:'Kernel & Modules',num:'02',desc:'Feather Kernel, binary patching, SukiSU Ultra spoof modules, KernelSU/Magisk framework.',tags:['KernelSU','Magisk','AnyKernel','SukiSU']},
  {icon:'🌐',name:'Web Development',num:'03',desc:'HTML/CSS/JS with strong visual identity — liquid-glass, Dynamic Island patterns, GitHub Pages, custom subdomains.',tags:['HTML/CSS/JS','GitHub Pages','Animations']},
  {icon:'🛠️',name:'Tooling & Env',num:'04',desc:'Dual-boot Ubuntu on ROG Strix G16 2025. Bash scripting, performance tuning, terminal-first dev.',tags:['Bash','Ubuntu','Git','Linux']},
]


/* ── Reveal-on-scroll hook ───────────────────────────────── */
function useInView(threshold=0.15){
  const ref=useRef(null)
  const[inView,setInView]=useState(false)
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting){setInView(true);obs.disconnect()}
    },{threshold})
    if(ref.current)obs.observe(ref.current)
    return()=>obs.disconnect()
  },[threshold])
  return[ref,inView]
}
function rv(inView,extra=''){return`rv${inView?' in':''}${extra?' '+extra:''}`}


/* ── Browser Mockup (project cards) ──────────────────────── */
function Browser({url,children}){
  return(
    <div className="brw">
      <div className="brw-bar">
        <div className="brw-dots"><span style={{background:'#ff5f57'}}/><span style={{background:'#ffbd2e'}}/><span style={{background:'#28c840'}}/></div>
        <div className="brw-url">{url}</div>
      </div>
      <div className="brw-body">{children}</div>
    </div>
  )
}

/* ── Cursor ───────────────────────────────────────────────── */
function Cursor(){
  const dr=useRef(null),rr=useRef(null),s=useRef({mx:0,my:0,rx:0,ry:0})
  useEffect(()=>{
    const mv=e=>{s.current.mx=e.clientX;s.current.my=e.clientY}
    let raf
    const tick=()=>{const c=s.current;c.rx=c.rx+(c.mx-c.rx)*.16;c.ry=c.ry+(c.my-c.ry)*.16;if(dr.current){dr.current.style.left=c.mx+'px';dr.current.style.top=c.my+'px'}if(rr.current){rr.current.style.left=c.rx+'px';rr.current.style.top=c.ry+'px'};raf=requestAnimationFrame(tick)}
    document.addEventListener('mousemove',mv);raf=requestAnimationFrame(tick)
    const bind=()=>document.querySelectorAll('a,button,.stc,.expi,.skli,.pjc,.soc,.awc').forEach(el=>{
      el.addEventListener('mouseenter',()=>document.body.classList.add('hov'))
      el.addEventListener('mouseleave',()=>document.body.classList.remove('hov'))
    })
    setTimeout(bind,600)
    const down=()=>document.body.classList.add('press')
    const up=()=>document.body.classList.remove('press')
    document.addEventListener('mousedown',down);document.addEventListener('mouseup',up)
    return()=>{document.removeEventListener('mousemove',mv);cancelAnimationFrame(raf);document.removeEventListener('mousedown',down);document.removeEventListener('mouseup',up)}
  },[])
  return <><div className="cdot" ref={dr}/><div className="cring" ref={rr}/></>
}

/* ── Loader ───────────────────────────────────────────────── */
function Loader({onDone}){
  const[p,setP]=useState(0),[out,setOut]=useState(false)
  useEffect(()=>{let v=0,id=setInterval(()=>{v+=Math.random()*14+7;if(v>=100){v=100;clearInterval(id);setTimeout(()=>{setOut(true);setTimeout(onDone,650)},250)};setP(Math.round(v))},55);return()=>clearInterval(id)},[onDone])
  return <div className={`ldr${out?' out':''}`}><div className="llo">@ozy<b>ern</b></div><div className="llb"><div className="llf" style={{width:p+'%'}}/></div><div className="llp">{p}%</div></div>
}

/* ── Sidebar — smooth sliding indicator ──────────────────── */
function Sidebar(){
  const[active,setActive]=useState('home')
  const pillRef=useRef(null)
  const itemRefs=useRef({})
  const[ind,setInd]=useState({y:0,h:44,ready:false})
  const[mouseY,setMouseY]=useState(null)
  const sectionIds=['home','experience','projects','stats','skills','about','contact']

  /* Deterministic scroll-position detection — picks exactly one section,
     no overlap/flicker like IntersectionObserver thresholds can cause. */
  useEffect(()=>{
    let raf=null
    const compute=()=>{
      raf=null
      const line=window.scrollY+window.innerHeight*0.3
      let current=sectionIds[0]
      for(const id of sectionIds){
        const el=document.getElementById(id)
        if(el&&el.offsetTop<=line)current=id
      }
      setActive(current)
    }
    const onScroll=()=>{if(raf===null)raf=requestAnimationFrame(compute)}
    compute()
    window.addEventListener('scroll',onScroll,{passive:true})
    window.addEventListener('resize',onScroll)
    return()=>{
      window.removeEventListener('scroll',onScroll)
      window.removeEventListener('resize',onScroll)
      if(raf)cancelAnimationFrame(raf)
    }
  },[])

  useEffect(()=>{
    const measure=()=>{
      const el=itemRefs.current[active]
      if(el&&pillRef.current){
        const pr=pillRef.current.getBoundingClientRect()
        const er=el.getBoundingClientRect()
        setInd({y:er.top-pr.top,h:er.height,ready:true})
      }
    }
    measure()
    window.addEventListener('resize',measure)
    return()=>window.removeEventListener('resize',measure)
  },[active])

  const items=[
    {id:'home',icon:<HoIco/>,label:'Home'},
    {id:'experience',icon:<BrIco/>,label:'Work'},
    {id:'projects',icon:<LaIco/>,label:'Projects'},
    {id:'stats',icon:<PlIco/>,label:'Stats'},
    {id:'skills',icon:<BlIco/>,label:'Skills'},
    {id:'about',icon:<PeIco/>,label:'About'},
    {id:'contact',icon:<MsIco/>,label:'Contact'},
    {href:`mailto:${EMAIL}`,id:'_mail',icon:<EnIco/>,label:'Email'},
  ]

  /* Dock-style magnification: scale falls off with distance from cursor.
     Uses offsetTop (layout-stable) instead of getBoundingClientRect, so the
     scale transform itself can never feed back into the distance math. */
  const getScale=id=>{
    if(mouseY===null)return 1
    const el=itemRefs.current[id]
    if(!el)return 1
    const center=el.offsetTop+el.offsetHeight/2
    const dist=Math.abs(mouseY-center)
    const maxDist=64
    if(dist>=maxDist)return 1
    const t=1-dist/maxDist
    return 1+t*0.3
  }

  return(
    <div className="sidebar">
      <div className="sb-pill" ref={pillRef}
        onMouseMove={e=>{
          if(!pillRef.current)return
          setMouseY(e.clientY-pillRef.current.getBoundingClientRect().top)
        }}
        onMouseLeave={()=>setMouseY(null)}
      >
        {ind.ready&&<div className="sb-indicator" style={{transform:`translateY(${ind.y}px)`,height:ind.h}}/>}
        {items.map((it,i)=>(
          <a key={i}
            ref={el=>{itemRefs.current[it.id]=el}}
            href={it.href||`#${it.id}`}
            className={`sb-item${active===it.id?' active':''}`}
            style={{transform:`scale(${getScale(it.id)})`}}
            onClick={()=>it.id!=='_mail'&&setActive(it.id)}
            target={it.href?'_blank':undefined}
            rel={it.href?'noopener':undefined}
          >
            {it.icon}
            <span className="sb-tip">{it.label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

/* ── Hero ─────────────────────────────────────────────────── */
function Hero(){
  const socials=[
    {href:'https://github.com/ozyern',icon:<GH/>,l:'GitHub'},
    {href:`mailto:${EMAIL}`,icon:<ML/>,l:'Email'},
    {href:'https://t.me/ozyern',icon:<TG/>,l:'Telegram'},
    {href:'https://ozyern.me',icon:<WB/>,l:'Website'},
  ]
  return(
    <section id="home" className="hero">
      <div className="hbg"/>
      <div className="hbadge-float">
        <span className="hbf-label">Currently Building</span>
        <span className="hbf-value">Feather Engine</span>
      </div>
      <div className="hcenter">
        <div className="hphoto">
          <img src={heroPhoto} alt="Aditya Jha"/>
        </div>
        <h1 className="hgreet"><span>Hi, I'm</span> <span className="cursive">Aditya Jha.</span></h1>
        <div className="hsoc">
          {socials.map(s=>(
            <a key={s.l} className="soc" href={s.href} target={s.href.startsWith('mailto')?undefined:'_blank'} rel="noopener" aria-label={s.l}>{s.icon}</a>
          ))}
        </div>
        <div className="hbtns">
          <a className="bp" href="#projects"><span>View my work</span><span className="bp-arrow"><EX/></span></a>
          <a className="bs" href="#contact"><MsIco/><span>Get in touch</span></a>
        </div>
      </div>
      <div className="hscr">scroll</div>
    </section>
  )
}

/* ── Stats ────────────────────────────────────────────────── */
function Stats(){
  const[v,setV]=useState([0,0,0,0]),ref=useRef(null)
  useEffect(()=>{
    const ob=new IntersectionObserver(([e])=>{
      if(!e.isIntersecting)return
      const T=[200,6,3,4]
      T.forEach((t,i)=>{let n=0;const step=Math.ceil(t/24);const id=setInterval(()=>{n=Math.min(n+step,t);setV(prev=>{const nx=[...prev];nx[i]=n;return nx});if(n>=t)clearInterval(id)},38)})
      ob.disconnect()
    },{threshold:.4})
    if(ref.current)ob.observe(ref.current)
    return()=>ob.disconnect()
  },[])
  const cards=[
    {label:'Community Members',val:<>{v[0]}<b>+</b></>,note:'ReVork · Telegram'},
    {label:'Active Projects',val:<>{v[1]}<b>+</b></>,note:'Shipping right now'},
    {label:'Fan Sites Live',val:<>{v[2]}</>,note:'sabrina · patidar'},
    {label:'Primary SoC',val:<>SM<b>8350</b></>,note:'OnePlus 9 Pro',sm:true},
  ]
  return(
    <div id="stats" className="stats" ref={ref}>
      {cards.map((c,i)=>(
        <div className="stc" key={i} style={{transitionDelay:`${i*.06}s`}}>
          <div className="stl">{c.label}</div>
          <div><div className={`stn${c.sm?' stn-sm':''}`}>{c.val}</div><div className="stnote">{c.note}</div></div>
        </div>
      ))}
    </div>
  )
}

/* ── Recognition ──────────────────────────────────────────── */
function Recognition(){
  const[ref,inView]=useInView(0.1)
  return(
    <section id="recognition" ref={ref} style={{paddingTop:60,paddingBottom:60}}>
      <div className={rv(inView)}><div className="slbl">Recognition &amp; Milestones</div></div>
      <div className="awgr">
        {AWARDS.map((a,i)=>(
          <div className={rv(inView,'awc')} key={i} style={{transitionDelay:`${.08+i*.06}s`}}>
            <div className="awicon">{a.icon}</div>
            <div className="awn">{a.name}</div>
            <div className="aws">{a.sub}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Experience ───────────────────────────────────────────── */
function Experience(){
  const[ref,inView]=useInView(0.08)
  return(
    <section id="experience" ref={ref}>
      <div className={rv(inView)}><div className="slbl">Experiences</div></div>
      <p className={rv(inView,'ssti')} style={{transitionDelay:'.08s'}}>A chronicle of my journey in <em>Android development and web creation.</em></p>
      {EXP.map((e,i)=>(
        <div className={rv(inView,'expi')} key={i} style={{transitionDelay:`${.15+i*.07}s`}}>
          <div><div className="excn">{e.company}</div><span className="extg">{e.tag}</span></div>
          <div><div className="exrl">{e.role}</div><p className="exdc">{e.desc}</p><div className="extgs">{e.tags.map(t=><span key={t} className="chip">{t}</span>)}</div></div>
          <div className="exdt">{e.date}</div>
        </div>
      ))}
    </section>
  )
}

/* ── Projects ─────────────────────────────────────────────── */
function Projects(){
  const[ref,inView]=useInView(0.08)
  const proj=[
    {
      name:'Feather Engine',
      desc:'A complete bash-based porting framework for ColorOS/OxygenOS 16 on Snapdragon 888. Handles partition manipulation, smali patching, OTA generation and AI feature unlocking.',
      href:'https://github.com/ozyern',date:'Aug 2025',revc:false,
      url:'github.com/ozyern/Feather-Engine',
      preview:(
        <div style={{background:'#000',height:'100%',padding:'28px 32px',fontFamily:'JetBrains Mono,monospace',display:'flex',flexDirection:'column',gap:14}}>
          <div style={{fontSize:11,color:'rgba(232,40,40,.7)',letterSpacing:'.12em'}}>ozyern / Feather-Engine</div>
          <div style={{fontSize:26,fontWeight:900,color:'#fff',fontFamily:'Inter,sans-serif',lineHeight:1.05}}>Port anything.<br/><span style={{color:'#e82828'}}>Fast.</span></div>
          <div style={{fontSize:10,color:'rgba(255,255,255,.35)'}}>ColorOS 16 · OxygenOS 16 · SM8350</div>
          <div style={{display:'flex',gap:6,marginTop:2}}>
            {['★ Bash','⚡ OTA','🔧 SM8350'].map(t=><span key={t} style={{background:'rgba(232,40,40,.12)',border:'1px solid rgba(232,40,40,.25)',color:'rgba(232,40,40,.9)',fontSize:9,padding:'3px 10px',borderRadius:100}}>{t}</span>)}
          </div>
          <div style={{background:'#0a0a0a',borderRadius:8,padding:'12px 14px',marginTop:4,fontSize:9,color:'#4ade80',lineHeight:1.9}}>
            <div style={{color:'rgba(255,255,255,.28)',marginBottom:2}}>$ ./port.sh --device lemonadep</div>
            <div>✓ Extracted system partitions</div>
            <div>✓ Applied smali patches (AI)</div>
            <div style={{color:'rgba(255,255,255,.38)'}}>↳ Building OTA package...</div>
          </div>
        </div>
      )
    },
    {
      name:'sabrina.ozyern.me',
      desc:'Liquid-glass fan site for Sabrina Carpenter — era-filtered discography, Dynamic Island nav, gallery and birthday campaign. Reached Foundation Media Partners via cold email.',
      href:'https://sabrina.ozyern.me',date:'Dec 2024',revc:true,
      url:'sabrina.ozyern.me',
      preview:(
        <div style={{background:'linear-gradient(160deg,#0d0312 0%,#150620 50%,#000 100%)',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:12,padding:'28px',textAlign:'center'}}>
          <div style={{fontSize:9,letterSpacing:'.35em',color:'rgba(255,160,210,.45)',textTransform:'uppercase',fontFamily:'JetBrains Mono,monospace'}}>Fan Site</div>
          <div style={{fontSize:34,fontWeight:900,color:'#fff',fontFamily:'Playfair Display,serif',fontStyle:'italic',lineHeight:.95}}>Sabrina</div>
          <div style={{fontSize:11,color:'rgba(255,160,210,.55)',letterSpacing:'.18em',textTransform:'uppercase'}}>Carpenter</div>
          <div style={{width:40,height:1,background:'rgba(255,160,210,.2)',margin:'4px 0'}}/>
          <div style={{display:'flex',gap:6,flexWrap:'wrap',justifyContent:'center'}}>
            {["Short n' Sweet","Espresso","Feather"].map(t=><span key={t} style={{background:'rgba(255,160,210,.08)',border:'1px solid rgba(255,160,210,.18)',color:'rgba(255,160,210,.65)',fontSize:9,padding:'3px 10px',borderRadius:100}}>{t}</span>)}
          </div>
          <div style={{marginTop:8,fontSize:9,color:'rgba(255,255,255,.18)',fontFamily:'JetBrains Mono,monospace'}}>Dynamic Island · Liquid Glass</div>
        </div>
      )
    },
    {
      name:'patidar.ozyern.me',
      desc:'RP21 Fan HQ for Rajat Patidar — dark luxury red/gold aesthetic, Dynamic Island nav, dense grid layouts, animated hero and AI-powered news page using the Anthropic API.',
      href:'https://patidar.ozyern.me',date:'2025 — Present',revc:false,
      url:'patidar.ozyern.me',
      preview:(
        <div style={{background:'linear-gradient(160deg,#120000 0%,#170400 50%,#000 100%)',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:12,padding:'28px',textAlign:'center'}}>
          <div style={{fontSize:9,letterSpacing:'.35em',color:'rgba(255,200,60,.4)',textTransform:'uppercase',fontFamily:'JetBrains Mono,monospace'}}>RCB Fan HQ</div>
          <div style={{fontSize:48,fontWeight:900,color:'#fff',fontFamily:'Playfair Display,serif',lineHeight:.85}}>RP<span style={{color:'#e82828'}}>21</span></div>
          <div style={{fontSize:10,color:'rgba(255,200,60,.65)',letterSpacing:'.22em',textTransform:'uppercase'}}>Rajat Patidar</div>
          <div style={{display:'flex',alignItems:'center',gap:10,margin:'4px 0'}}>
            <div style={{width:30,height:3,background:'#e82828',borderRadius:2}}/>
            <div style={{width:8,height:8,borderRadius:'50%',background:'rgba(255,200,60,.5)'}}/>
            <div style={{width:30,height:3,background:'#f59e0b',borderRadius:2}}/>
          </div>
          <div style={{fontSize:9,color:'rgba(255,255,255,.2)',fontFamily:'JetBrains Mono,monospace'}}>Royal Challengers Bengaluru</div>
        </div>
      )
    },
  ]
  return(
    <section id="projects" ref={ref} style={{background:'rgba(255,255,255,.015)',borderTop:'1px solid var(--bord)'}}>
      <div className={rv(inView)}><div className="slbl">Highlighted Works</div></div>
      <p className={rv(inView,'ssti')} style={{transitionDelay:'.08s'}}>Things I've <em>actually shipped</em> — from kernels to fan sites.</p>
      <div className="pjl">
        {proj.map((p,i)=>(
          <div className={rv(inView,`pjc${p.revc?' rev':''}`)} key={i} style={{transitionDelay:`${.15+i*.1}s`}}>
            <div className="pjv">
              <Browser url={p.url}>{p.preview}</Browser>
            </div>
            <div className="pjb">
              <div className="pjtop">
                <div className="pjnm">{p.name}</div>
                <p className="pjdc">{p.desc}</p>
              </div>
              <div className="pjfoot">
                <span className="pjdate">{p.date}</span>
                <a className="pjarrow" href={p.href} target="_blank" rel="noopener"><Arw/></a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Skills ───────────────────────────────────────────────── */
function Skills(){
  const[ref,inView]=useInView(0.08)
  return(
    <section id="skills" ref={ref}>
      <div className={rv(inView)}><div className="slbl">My Skills</div></div>
      <p className={rv(inView,'ssti')} style={{transitionDelay:'.08s'}}>What I <em>actually know</em> and build with every day.</p>
      {SKILLS.map((s,i)=>(
        <div className={rv(inView,'skli')} key={i} style={{transitionDelay:`${.15+i*.07}s`}}>
          <div className="sklic">{s.icon}</div>
          <div><div className="sklnm">{s.name}</div><p className="skldc">{s.desc}</p><div className="sklch">{s.tags.map(t=><span key={t} className="chip">{t}</span>)}</div></div>
          <div className="sklnu">{s.num}</div>
        </div>
      ))}
    </section>
  )
}

/* ── About ────────────────────────────────────────────────── */
function About(){
  const[ref,inView]=useInView(0.1)
  return(
    <section id="about" ref={ref} style={{background:'rgba(255,255,255,.015)',borderTop:'1px solid var(--bord)'}}>
      <div className={rv(inView)}><div className="slbl">About Me</div></div>
      <div className="abgr">
        <div className={rv(inView,'abph')} style={{transitionDelay:'.1s'}}>
          <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="rgba(232,40,40,0.22)" strokeWidth="0.7" style={{position:'relative',zIndex:1}}><circle cx="12" cy="7" r="5"/><path d="M3 21c0-5 3.6-9 9-9s9 4 9 9"/></svg>
          <div className="abphl"><div><div className="abphn">Aditya Jha</div><div className="abphs">Student · Developer</div></div><div className="abphh">@ozyern</div></div>
        </div>
        <div className={rv(inView)} style={{transitionDelay:'.18s'}}>
          <h3 className="abhl">Building <i>close to the metal</i> — kernels, ROMs, and fan sites that feel alive.</h3>
          <p className="abp">I'm Ozi — a student and an active Android ROM porter. I maintain <strong>Feather Engine</strong>, a bash-based framework for porting ColorOS/OxygenOS 16 to Snapdragon 888 devices, primarily the OnePlus 9 Pro.</p>
          <p className="abp">My work spans from partition image manipulation and smali patching, all the way to fan sites with liquid-glass CSS, Dynamic Island navigation, and AI-powered news pages using the Anthropic API.</p>
          <div className="abq"><p>"Every project I name ends up a Sabrina Carpenter reference. Feather, Espresso, Singular, Tornado — that's just how it is."</p></div>
          <p className="abp">I run <strong>ReVork</strong>, a ~200-member Telegram community. Built <a href="https://sabrina.ozyern.me" target="_blank" rel="noopener">sabrina.ozyern.me</a> and cold-emailed her management. Currently iterating on <a href="https://patidar.ozyern.me" target="_blank" rel="noopener">patidar.ozyern.me</a>.</p>
          <div className="dvs">
            <div className="dvsl">Device lineup</div>
            <div className="dvsr"><span>OnePlus 13</span><span className="dvsrk">"Espresso"</span></div>
            <div className="dvsr"><span>OnePlus 9 Pro (lemonadep)</span><span className="dvsrk">"Feather"</span></div>
            <div className="dvsr"><span>ROG Strix G16 2025 · Ultra 9 275HX · RTX 5060</span><span className="dvsrk">Daily driver</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Contact ──────────────────────────────────────────────── */
function Contact(){
  const[ref,inView]=useInView(0.1)
  const lks=[{icon:<GH/>,name:'GitHub',sub:'@ozyern',href:'https://github.com/ozyern'},{icon:<TG/>,name:'Telegram',sub:'@ozyern',href:'https://t.me/ozyern'},{icon:<ML/>,name:'Email',sub:EMAIL,href:`mailto:${EMAIL}`},{icon:<WB/>,name:'Website',sub:'ozyern.me',href:'https://ozyern.me'}]
  const inf=[{l:'Status',v:<><span className="gdot"/>Available for collabs</>},{l:'Current Focus',v:'Feather Engine · RP21 Fan HQ'},{l:'Community',v:<a href="https://t.me/revork" target="_blank" rel="noopener">ReVork on Telegram ↗</a>},{l:'GitHub',v:<a href="https://github.com/ozyern" target="_blank" rel="noopener">github.com/ozyern ↗</a>},{l:'Fun fact',v:<span style={{color:'var(--muted)',fontWeight:400}}>Every project named after a Sabrina song.</span>}]
  return(
    <section id="contact" ref={ref} className="ctwrap">
      <div className="ctgr">
        <div className={rv(inView)}>
          <div className="slbl">Get in Touch</div>
          <h2 className="ctbig">Let's <i>build</i><br/>something<br/>together.</h2>
          {lks.map((x)=><a key={x.name} className="clk" href={x.href} target={x.href.startsWith('mailto')?undefined:'_blank'} rel="noopener"><div className="clkic">{x.icon}</div><div className="clktx"><div className="clkn">{x.name}</div><div className="clks">{x.sub}</div></div><div className="clka">↗</div></a>)}
        </div>
        <div className={rv(inView)} style={{transitionDelay:'.12s'}}>{inf.map(r=><div key={r.l} className="cifr"><div className="cifl">{r.l}</div><div className="cifv">{r.v}</div></div>)}</div>
      </div>
    </section>
  )
}

/* ── Footer ───────────────────────────────────────────────── */
function Footer(){
  return(
    <footer>
      <span className="ftcp">© 2025 Aditya Jha · @ozyern · Crafted with obsession.</span>
      <div className="ftlk">{[['sabrina','https://sabrina.ozyern.me'],['patidar','https://patidar.ozyern.me'],['github','https://github.com/ozyern'],['top ↑','#home']].map(([l,h])=><a key={l} href={h} target={h.startsWith('http')?'_blank':undefined} rel="noopener">{l}</a>)}</div>
    </footer>
  )
}

/* ── App ──────────────────────────────────────────────────── */
export default function App(){
  const[ready,setReady]=useState(false)
  const done=useCallback(()=>setReady(true),[])
  useEffect(()=>{
    if(!ready)return
    document.querySelectorAll('.bp,.bs').forEach(btn=>{
      btn.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect();btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.15}px,${(e.clientY-r.top-r.height/2)*.15}px)`})
      btn.addEventListener('mouseleave',()=>btn.style.transform='')
    })
  },[ready])
  return(
    <>
      <Cursor/>
      <Loader onDone={done}/>
      {ready&&(
        <>
          <Sidebar/>
          <main>
            <Hero/>
            <Stats/>
            <Recognition/>
            <Experience/>
            <Projects/>
            <Skills/>
            <About/>
            <Contact/>
            <Footer/>
          </main>
        </>
      )}
    </>
  )
}
