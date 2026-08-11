import { useState, useEffect, useRef, useCallback, useMemo } from 'react'

// Hero photo - place your photo at public/assets/hero-photo.jpg
// Falls back to a beautiful gradient if no photo exists
const heroPhoto = './assets/hero-photo.jpg'
const HERO_GRADIENT = 'linear-gradient(145deg, #1a0f0a 0%, #2d1a0a 35%, #1a0f0a 70%, #0a0500 100%)'

/* ── Icons ────────────────────────────────────────────────────────────────── */

/* ── Icons (Premium Duotone Glass) ────────────────────────── */
const HoIco=()=><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 10l8-7 8 7v10h-16z" fill="currentColor" fillOpacity="0.15"/><path d="M3 11l9-8 9 8M5 11v9h14v-9M10 20v-5h4v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
const BrIco=()=><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="8" width="18" height="13" rx="2" fill="currentColor" fillOpacity="0.15"/><rect x="3" y="8" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 8V6a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
const LaIco=()=><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><polygon points="12 3 3 8 12 13 21 8" fill="currentColor" fillOpacity="0.15"/><polygon points="12 3 3 8 12 13 21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="3 13 12 18 21 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="3 18 12 23 21 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
const PlIco=()=><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="4" y="14" width="4" height="6" rx="1" fill="currentColor" fillOpacity="0.15"/><rect x="10" y="10" width="4" height="10" rx="1" fill="currentColor" fillOpacity="0.15"/><rect x="16" y="4" width="4" height="16" rx="1" fill="currentColor" fillOpacity="0.15"/><rect x="4" y="14" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="10" y="10" width="4" height="10" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="16" y="4" width="4" height="16" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
const BlIco=()=><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10" fill="currentColor" fillOpacity="0.15"/><polygon points="13 2 3 14 12 14 11 22 21 10 12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
const PeIco=()=><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill="currentColor" fillOpacity="0.15"/><circle cx="12" cy="7" r="4" fill="currentColor" fillOpacity="0.15"/><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
const MsIco=()=><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" fill="currentColor" fillOpacity="0.15"/><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="3 7 12 13 21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
const EnIco=()=><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" fill="currentColor" fillOpacity="0.15"/><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="3 7 12 13 21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
const GH=()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.5 5.5 0 0 0-1.5-3.8 5.4 5.4 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0c-2.7-1.8-3.9-1.4-3.9-1.4a5.4 5.4 0 0 0-.1 3.8A5.5 5.5 0 0 0 2 12.24c0 5.23 3 6.42 6 6.76a4.8 4.8 0 0 0-1 3.24v4"/><path d="M9 19c-4.3 1.4-5-2.5-7-3"/></svg>
const TG=()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
const ML=()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
const WB=()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
const EX=()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
const Arw=()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>

const EMAIL='ozyern.dev@gmail.com'

/* ── Data ─────────────────────────────────────────────────── */
const EXP=[
  {company:'BrinaOS Ports',tag:'Open Source',role:'Maintainer',date:'2025 — Present',desc:'Bash-based ColorOS/OxygenOS 16 porting framework for SM8350. Smali AI patching, OTA generation, SuperVOOC 65W paths, premium feature-gating.',tags:['Bash','SM8350','ColorOS 16','OTA','Smali']},
  {company:'ReVork',tag:'Community',role:'Founder',date:'2025 — Present',desc:'~320-member Telegram community for custom ROM development. Sabrina Carpenter-themed role system, release channels, developer support.',tags:['Community','Android','Telegram']},
  {company:'sabrina.ozyern.me',tag:'Web Dev',role:'Developer',date:'2024 — Present',desc:'Liquid-glass fan site — gallery, era-filtered discography, Dynamic Island nav, birthday campaign. Cold-emailed Foundation Media Partners.',tags:['HTML/CSS/JS','GitHub Pages']},
  {company:'Feather Kernel',tag:'Kernel',role:'Developer',date:'2025',desc:'Custom OP9 Pro kernel — binary string patching, SukiSU Ultra spoof modules, KernelSU framework, AnyKernel3 packaging.',tags:['Kernel','KernelSU','AnyKernel']},
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

/* ── Scroll progress bar ──────────────────────────────────── */
function ScrollProgress(){
  const[p,setP]=useState(0)
  useEffect(()=>{
    let raf=null
    const compute=()=>{
      raf=null
      const max=document.documentElement.scrollHeight-window.innerHeight
      setP(max>0?Math.min(100,(window.scrollY/max)*100):0)
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
  return <div className="scroll-progress"><div className="scroll-progress-fill" style={{width:`${p}%`}}/><div className="scroll-progress-glow"/></div>
}

/* ── Cursor ───────────────────────────────────────────────── */
function Cursor(){
  const dr=useRef(null),rr=useRef(null),s=useRef({mx:0,my:0,rx:0,ry:0})
  useEffect(()=>{
    const mv=e=>{s.current.mx=e.clientX;s.current.my=e.clientY}
    let raf
    const tick=()=>{const c=s.current;c.rx=c.rx+(c.mx-c.rx)*.12;c.ry=c.ry+(c.my-c.ry)*.12;if(dr.current){dr.current.style.left=c.mx+'px';dr.current.style.top=c.my+'px'}if(rr.current){rr.current.style.left=c.rx+'px';rr.current.style.top=c.ry+'px'};raf=requestAnimationFrame(tick)}
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
const sectionIds = ['home', 'experience', 'projects', 'stats', 'skills', 'about', 'contact']

const sidebarItems = [
  { id: 'home', icon: <HoIco />, label: 'Home' },
  { id: 'experience', icon: <BrIco />, label: 'Work' },
  { id: 'projects', icon: <LaIco />, label: 'Projects' },
  { id: 'stats', icon: <PlIco />, label: 'Stats' },
  { id: 'skills', icon: <BlIco />, label: 'Skills' },
  { id: 'about', icon: <PeIco />, label: 'About' },
  { id: 'contact', icon: <MsIco />, label: 'Contact' },
]

function MagneticItem({ it, active, setActive, itemRefs }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const ref = useRef(null)
  
  const handleMouseMove = (e) => {
    if(!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = (e.clientX - left - width / 2) * 0.4
    const y = (e.clientY - top - height / 2) * 0.4
    setPos({ x, y })
  }
  const handleMouseLeave = () => setPos({ x: 0, y: 0 })

  return (
    <a
      ref={el => {
        ref.current = el
        itemRefs.current[it.id] = el
      }}
      href={`#${it.id}`}
      className={`sb-item${active === it.id ? ' active' : ''}`}
      onClick={() => setActive(it.id)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: pos.x !== 0 ? `translate(${pos.x}px, ${pos.y}px)` : 'translate(0px, 0px)',
        transition: pos.x === 0 ? 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'color 0.3s'
      }}
    >
      {it.icon}
      <span className="sb-tip">{it.label}</span>
    </a>
  )
}

function Sidebar(){
  const[active,setActive]=useState('home')
  const pillRef=useRef(null)
  const itemRefs=useRef({})
  const[ind,setInd]=useState({x:0,y:0,ready:false})

  // Compute indicator position only when active changes
  const updateIndicator = useCallback(() => {
    const pill = pillRef.current
    const activeEl = itemRefs.current[active]
    if (pill && activeEl) {
      setInd({
        x: activeEl.offsetLeft,
        y: activeEl.offsetTop,
        ready: true
      })
    }
  }, [active])

  // Update indicator when active changes
  useEffect(() => {
    const raf = requestAnimationFrame(updateIndicator)
    return () => cancelAnimationFrame(raf)
  }, [active, updateIndicator])

  // Also update on resize/orientation change
  useEffect(() => {
    const handleResize = () => {
      const raf = requestAnimationFrame(updateIndicator)
      return () => cancelAnimationFrame(raf)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [updateIndicator])

  /* Scroll-position detection: pick the section that occupies the center/top
     of viewport, with fallback for document edges. */
  useEffect(()=>{
    let raf=null
    const compute=()=>{
      raf=null
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const scrollHeight = document.documentElement.scrollHeight
      const maxScroll = scrollHeight - viewportHeight

      // Edge case: Bottom of the page reached (activate last section)
      if (scrollY >= maxScroll - 60) {
        if (active !== sectionIds[sectionIds.length - 1]) {
          setActive(sectionIds[sectionIds.length - 1])
        }
        return
      }

      // Edge case: Top of the page reached (activate first section)
      if (scrollY <= 50) {
        if (active !== sectionIds[0]) {
          setActive(sectionIds[0])
        }
        return
      }

      const line = scrollY + viewportHeight * 0.4
      let current = sectionIds[0]
      let bestTop = -Infinity
      for(const id of sectionIds){
        const el=document.getElementById(id)
        if(el&&el.offsetTop<=line&&el.offsetTop>bestTop){
          bestTop=el.offsetTop
          current=id
        }
      }
      if (current !== active) {
        setActive(current)
      }
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
  },[active])

  return(
    <div className="sidebar">
      <div className="sb-pill" ref={pillRef}>
        {ind.ready && (
          <div className="sb-indicator" style={{
            transform: `translate(${ind.x}px, ${ind.y}px)`
          }}/>
        )}
        {sidebarItems.map((it,i)=>(
          <MagneticItem key={i} it={it} active={active} setActive={setActive} itemRefs={itemRefs} />
        ))}

      </div>
    </div>
  )
}

/* ── Hero — Redesigned Premium Aesthetic ───────────────────── */
function MagneticSocial({ s, i }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const ref = useRef(null)
  
  const handleMouseMove = (e) => {
    if(!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = (e.clientX - left - width / 2) * 0.3
    const y = (e.clientY - top - height / 2) * 0.3
    setPos({ x, y })
  }
  const handleMouseLeave = () => setPos({ x: 0, y: 0 })

  return (
    <a
      ref={ref}
      className="soc"
      href={s.href}
      target={s.href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener"
      aria-label={s.l}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        animationDelay: `${0.6 + i * 0.05}s`,
        transform: pos.x !== 0 ? `translate(${pos.x}px, ${pos.y}px) scale(1.1) rotate(-3deg)` : undefined,
        transition: pos.x === 0 ? 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'background 0.3s, border-color 0.3s, color 0.3s, box-shadow 0.3s'
      }}
    >
      {s.icon}
    </a>
  )
}

function Hero() {
  const photoRef = useRef(null)
  const heroRef = useRef(null)
  const [magnetic, setMagnetic] = useState({ x: 0, y: 0, tiltX: 0, tiltY: 0, rawX: -1000, rawY: -1000 })
  const [imgError, setImgError] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  // Parallax scroll effect on photo
  useEffect(() => {
    let raf = null
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = null
        if (photoRef.current) {
          photoRef.current.style.transform = `translateY(${window.scrollY * 0.12}px)`
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [])

  // Magnetic mouse follow & Spotlight & 3D tilt
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const rawX = e.clientX - rect.left
    const rawY = e.clientY - rect.top
    const x = rawX - rect.width / 2
    const y = rawY - rect.height / 2
    
    // 3D tilt math for the photo
    const tiltX = (y / rect.height) * -20 // up to 10 deg
    const tiltY = (x / rect.width) * 20  // up to 10 deg

    setMagnetic({ x: x * 0.08, y: y * 0.08, tiltX, tiltY, rawX, rawY })
  }
  const handleMouseLeave = () => setMagnetic({ x: 0, y: 0, tiltX: 0, tiltY: 0, rawX: -1000, rawY: -1000 })

  const socials = [
    { href: 'https://github.com/ozyern', icon: <GH />, l: 'GitHub' },
    { href: `mailto:${EMAIL}`, icon: <ML />, l: 'Email' },
    { href: 'https://t.me/ozyern', icon: <TG />, l: 'Telegram' },
    { href: 'https://ozyern.me', icon: <WB />, l: 'Website' },
  ]

  return (
    <section id="home" className="hero" ref={heroRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {/* Dynamic Spotlight */}
      <div className="h-spotlight" style={{ left: magnetic.rawX, top: magnetic.rawY, opacity: magnetic.rawX > 0 ? 1 : 0 }} aria-hidden="true" />
      
      {/* Layered atmospheric background */}
      <div className="hbg" />
      <div className="hbg-mesh" aria-hidden="true" />
      <div className="hbg-noise" aria-hidden="true" />

      <div className="hcenter">
        {/* Minimal Glass Hero Photo - No Mouse Follow */}
        <div className="hphoto-wrap" ref={photoRef}>
          <div className="hphoto">
            <img
              src={heroPhoto}
              alt="Aditya Jha"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              style={{ opacity: imgLoaded ? 1 : 0 }}
              loading="eager"
              fetchPriority="high"
            />
            {!imgLoaded && !imgError && <div className="hphoto-skeleton" aria-hidden="true" />}
            {imgError && (
              <div className="hphoto-gradient" style={{ background: HERO_GRADIENT }} aria-hidden="true">
                <svg className="hphoto-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Cinematic Text Reveal */}
        <div className="htext">
          <div className="hgreet-wrap">
            <span className="hgreet-label reveal-up" style={{ animationDelay: '0.1s' }}>Hey, I'm</span>
            <h1 className="hgreet-name reveal-up" style={{ animationDelay: '0.2s' }}>
              <span>Aditya</span>
              <span>Jha</span>
              <span className="hgreet-dot">.</span>
            </h1>
          </div>
          <p className="hrole reveal-up" style={{ animationDelay: '0.3s' }}>Android ROM Porter · Kernel Dev · Web Builder</p>
          <div className="hbadges reveal-up" style={{ animationDelay: '0.4s' }}>
            <span className="hbadge">BrinaOS Ports</span>
            <span className="hbadge">SM8350</span>
            <span className="hbadge">KernelSU</span>
            <span className="hbadge">Liquid Glass</span>
          </div>
        </div>

        {/* CTA and Social Links */}
        <div className="hactions reveal-up" style={{ animationDelay: '0.5s' }}>
          <div className="hsoc">
            {socials.map((s, i) => (
              <MagneticSocial key={s.l} s={s} i={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hscr reveal-up" style={{ animationDelay: '1s' }}>
        <span>scroll</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>

      {/* Floating particles */}
      <div className="hparticles" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <span key={i} className="hparticle" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 8}s`, animationDuration: `${12 + Math.random() * 8}s` }} />
        ))}
      </div>
    </section>
  )
}

/* ── Stats ────────────────────────────────────────────────── */
function Stats(){
  const[ref,inView]=useInView(0.1)
  const T=useMemo(()=>[320,14,3],[])
  const[v,setV]=useState([0,0,0])
  useEffect(()=>{
    if(!inView)return
    let start=null,raf=null
    const tick=now=>{
      if(!start)start=now
      const t=Math.min(1,(now-start)/2000)
      const eased=1-Math.pow(1-t,4)
      setV(T.map(target=>Math.round(target*eased)))
      if(t<1)raf=requestAnimationFrame(tick)
    }
    raf=requestAnimationFrame(tick)
    return()=>cancelAnimationFrame(raf)
  },[inView,T])

  const cards=[
    {label:'Community Members',val:<>{v[0]}<b>+</b></>,note:'ReVork · Telegram'},
    {label:'Active Projects',val:<>{v[1]}<b>+</b></>,note:'Shipping right now'},
    {label:'Fan Sites Live',val:<>{v[2]}</>,note:'sabrina · exhale'},
    {label:'Primary SoC',val:<>SM<b>8350</b></>,note:'OnePlus 9 Pro',sm:true},
  ]
  return(
    <section id="stats" ref={ref} className="stats-section">
      <div className="stats">
        {cards.map((c,i)=>(
          <div className={rv(inView,'stc')} key={i} style={{transitionDelay:`${i*.06}s`}}>
            <div className="stl">{c.label}</div>
            <div><div className={`stn${c.sm?' stn-sm':''}`}>{c.val}</div><div className="stnote">{c.note}</div></div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Experience ───────────────────────────────────────────── */
function Experience(){
  const[ref,inView]=useInView(0.08)
  
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // For the spotlight glow
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    
    // For 3D tilt effect
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5; 
    const rotateY = ((x - centerX) / centerX) * 5;
    
    card.style.setProperty('--rotateX', `${rotateX}deg`);
    card.style.setProperty('--rotateY', `${rotateY}deg`);
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty('--rotateX', `0deg`);
    card.style.setProperty('--rotateY', `0deg`);
  };

  return(
    <section id="experience" ref={ref}>
      <div className={rv(inView)}><div className="slbl">Experiences</div></div>
      <p className={rv(inView,'ssti')} style={{transitionDelay:'.08s'}}>A chronicle of my journey in <em>Android development and web creation.</em></p>
      
      <div className="holo-grid">
        {EXP.map((e,i)=>(
          <div 
            className={`holo-card-wrapper ${rv(inView)}`} 
            key={i} 
            style={{transitionDelay:`${.15+i*.1}s`}}
          >
            <div 
              className="holo-card" 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="holo-content">
                <div className="holo-header">
                  <div className="holo-icon"><BrIco/></div>
                  <div className="holo-title-group">
                    <div className="holo-company">{e.company}</div>
                    <div className="holo-date">{e.date}</div>
                  </div>
                </div>
                
                <div className="holo-role-band">
                  <span className="holo-role">{e.role}</span>
                  <span className="holo-tag-badge">{e.tag}</span>
                </div>
                
                <p className="holo-desc">{e.desc}</p>
                
                <div className="holo-skills">
                  {e.tags.map(t => (
                    <span key={t} className="holo-skill">{t}</span>
                  ))}
                </div>
              </div>
              {/* Glass reflection layer */}
              <div className="holo-glare"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}


/* ── Projects ─────────────────────────────────────────────── */
function Projects(){
  const[ref,inView]=useInView(0.08)
  const proj=[
    {
      name:'BrinaOS Ports',
      desc:'A complete bash-based porting framework for ColorOS/OxygenOS 16 on Snapdragon 888. Handles partition manipulation, smali patching, OTA generation and AI feature unlocking.',
      href:'https://github.com/ozyern',date:'Aug 2025',revc:false,
      url:'github.com/ozyern/BrinaOS-Ports',
      preview:(
        <div style={{background:'#000',height:'100%',padding:'28px 32px',fontFamily:'JetBrains Mono,monospace',display:'flex',flexDirection:'column',gap:14}}>
          <div style={{fontSize:11,color:'rgba(232,40,40,.7)',letterSpacing:'.12em'}}>ozyern / BrinaOS-Ports</div>
          <div style={{fontSize:26,fontWeight:900,color:'#fff',fontFamily:'Inter,sans-serif',lineHeight:1.05}}>Port anything.<br/><span style={{color:'#e82828'}}>Fast.</span></div>
          <div style={{fontSize:10,color:'rgba(255,255,255,.35)'}}>ColorOS 16 · OxygenOS 16 · SM8350</div>
          <div style={{display:'flex',gap:6,marginTop:2}}>
            {['Bash','OTA','SM8350'].map(t=><span key={t} style={{background:'rgba(232,40,40,.12)',border:'1px solid rgba(232,40,40,.25)',color:'rgba(232,40,40,.9)',fontSize:9,padding:'3px 10px',borderRadius:100}}>{t}</span>)}
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
      name:'Exhale',
      desc:'A breath of fresh air for your music. A premium, open-source Android music player featuring a fluid Liquid Glass UI.',
      href:'https://github.com/ozyern/Exhale',date:'2025 — Present',revc:false,
      url:'github.com/ozyern/Exhale',
      preview:(
        <div style={{background:'linear-gradient(160deg,#0a0f14 0%,#111827 50%,#000 100%)',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:12,padding:'28px',textAlign:'center'}}>
          <div style={{fontSize:9,letterSpacing:'.35em',color:'rgba(120,220,255,.45)',textTransform:'uppercase',fontFamily:'JetBrains Mono,monospace'}}>GitHub Project</div>
          <div style={{fontSize:48,fontWeight:900,color:'#fff',fontFamily:'Playfair Display,serif',lineHeight:.85}}>Ex<span style={{color:'#78dcff'}}>ha</span>le</div>
          <div style={{fontSize:10,color:'rgba(120,220,255,.7)',letterSpacing:'.22em',textTransform:'uppercase'}}>ozyern / Exhale</div>
          <div style={{display:'flex',alignItems:'center',gap:10,margin:'4px 0'}}>
            <div style={{width:30,height:3,background:'#78dcff',borderRadius:2}}/>
            <div style={{width:8,height:8,borderRadius:'50%',background:'rgba(120,220,255,.55)'}}/>
            <div style={{width:30,height:3,background:'#60a5fa',borderRadius:2}}/>
          </div>
          <div style={{fontSize:9,color:'rgba(255,255,255,.2)',fontFamily:'JetBrains Mono,monospace'}}>Open source · GitHub</div>
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
          <div className={rv(inView,'work-card-horizontal')} key={i} style={{transitionDelay:`${.15+i*.1}s`}}>
            <div className="work-content-side">
              <div>
                <div className="pjnm" style={{fontSize:'36px',fontWeight:700,marginBottom:'16px',color:'#fff',letterSpacing:'-0.03em'}}>{p.name}</div>
                <p className="pjdc" style={{fontSize:'16px',color:'rgba(255,255,255,0.5)',lineHeight:1.7}}>{p.desc}</p>
              </div>
              <div style={{marginTop:'32px',display:'flex',alignItems:'center',justifyContent:'space-between',borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'24px'}}>
                <span style={{color:'rgba(255,255,255,0.4)',fontSize:'14px',fontFamily:'JetBrains Mono, monospace'}}>{p.date}</span>
                <a href={p.href} target="_blank" rel="noopener" style={{display:'flex',alignItems:'center',justifyContent:'center',width:'48px',height:'48px',background:'var(--red)',color:'#fff',borderRadius:'50%',transition:'all 0.3s'}} className="btns-link">
                  <Arw/>
                </a>
              </div>
            </div>
            <div className="work-image-side" style={{padding:'40px',display:'flex',alignItems:'center',justifyContent:'center',background:p.revc?'linear-gradient(135deg,#0a0a0a,#111)':'#0a0a0a',overflow:'hidden'}}>
               <Browser url={p.url}>{p.preview}</Browser>
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
  const cats=[
    {n:'Android ROM Dev',i:<EnIco/>,d:'Low-level porting, partition manipulation, smali patching, OTA generation.',s:['port.sh','Smali','ADB','OTA','ColorOS 16']},
    {n:'Kernel & Modules',i:<BrIco/>,d:'Binary patching, boot image packing, and root framework implementations.',s:['KernelSU','Magisk','AnyKernel','SukiSU']},
    {n:'Web Development',i:<LaIco/>,d:'Building high-performance, design-driven fan sites and React applications.',s:['React','Tailwind','Liquid-Glass UI','Animations']},
    {n:'Tooling & Env',i:<PeIco/>,d:'The environment and tools I use daily to build robust software systems.',s:['Bash','Ubuntu','Git','Docker','Linux']}
  ]
  return(
    <section id="skills" ref={ref}>
      <div className={rv(inView)}><div className="slbl">My Skills</div></div>
      <p className={rv(inView,'ssti')} style={{transitionDelay:'.08s'}}>What I <em>actually know</em> and build with every day.</p>
      
      <div className={rv(inView,'sk-bento')} style={{transitionDelay:'.15s'}}>
        {cats.map((c,i)=>(
          <div key={i} className="sk-card">
            <div className="sk-num">0{i+1}</div>
            <div className="sk-icon-wrap">
              <div className="sk-icon">{c.i}</div>
              <div className="sk-title">{c.n}</div>
            </div>
            <div className="sk-desc">{c.d}</div>
            <div className="sk-tags">
              {c.s.map(s=><span key={s} className="sk-tag">{s}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── About ────────────────────────────────────────────────── */
function About(){
  const[ref,inView]=useInView(0.1)
  return(
    <section id="about" ref={ref} style={{background:'rgba(255,255,255,.015)',borderTop:'1px solid var(--bord)'}}>
      <div className={rv(inView)}><div className="slbl">About Me</div></div>
      
      <div className="ab-bento">
        {/* Main Bio */}
        <div className={rv(inView, 'ab-card ab-bio')}>
          <div className="ab-icon"><PeIco/></div>
          <h3 className="ab-hl">Building <i>close to the metal</i> — kernels, ROMs, and fan sites that feel alive.</h3>
          <p className="ab-p">I'm Ozi — a student and an active Android ROM porter. I maintain <strong>BrinaOS Ports</strong>, a bash-based framework for porting ColorOS/OxygenOS 16 to Snapdragon 888 devices, primarily the OnePlus 9 Pro.</p>
          <p className="ab-p">My work spans from partition image manipulation and smali patching, all the way to fan sites with liquid-glass CSS, Dynamic Island navigation, and AI-powered news pages using the Anthropic API. I also run <strong>ReVork</strong>, a ~320-member Telegram community.</p>
        </div>
        
        {/* Photo Card */}
        <div className={rv(inView, 'ab-card ab-photo')} style={{transitionDelay:'.1s'}}>
          <img src="https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1000&auto=format&fit=crop" alt="Close to the metal" className="ab-img" loading="lazy" />
          <div className="ab-img-overlay">
            <div className="ab-img-name">Aditya Jha</div>
            <div className="ab-img-role">@ozyern</div>
          </div>
        </div>

        {/* Quote Card */}
        <div className={rv(inView, 'ab-card ab-quote')} style={{transitionDelay:'.15s'}}>
          <div className="ab-quote-mark">"</div>
          <p className="ab-quote-text">Every project I name ends up a Sabrina Carpenter reference. Feather, Espresso, Singular, Tornado — that's just how it is.</p>
        </div>

        {/* Device Lineup */}
        <div className={rv(inView, 'ab-card ab-devices')} style={{transitionDelay:'.2s'}}>
          <div className="ab-dev-title"><span className="gdot" style={{width:8,height:8,marginRight:10}}/>Device Lineup</div>
          <div className="ab-dev-list">
            <div className="ab-dev-item">
              <div className="ab-dev-name">OnePlus 13</div>
              <div className="ab-dev-code">"Espresso"</div>
            </div>
            <div className="ab-dev-item">
              <div className="ab-dev-name">OnePlus 9 Pro (lemonadep)</div>
              <div className="ab-dev-code">"Feather"</div>
            </div>
            <div className="ab-dev-item">
              <div className="ab-dev-name">ROG Strix SCAR 16 2025</div>
              <div className="ab-dev-code">Daily driver</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Contact ──────────────────────────────────────────────── */
function Contact(){
  const[ref,inView]=useInView(0.1)
  const lks=[
    {icon:<GH/>,name:'GitHub',sub:'@ozyern',href:'https://github.com/ozyern'},
    {icon:<TG/>,name:'Telegram',sub:'@ozyern',href:'https://t.me/ozyern'},
    {icon:<ML/>,name:'Email',sub:EMAIL,href:`mailto:${EMAIL}`},
    {icon:<WB/>,name:'Website',sub:'ozyern.me',href:'https://ozyern.me'}
  ]
  return(
    <section id="contact" ref={ref} className="ctwrap">
      <div className="ct-glow"></div>
      <div className="ctgr">
        <div className={rv(inView, 'ct-left')}>
          <div className="slbl">Get in Touch</div>
          <h2 className="ctbig">Let's <i>build</i><br/>something<br/>together.</h2>
          
          <div className="ct-status">
            <span className="gdot"/>
            <div>
              <div className="ct-status-lbl">Status</div>
              <div className="ct-status-val">Available for collabs</div>
            </div>
          </div>
          
          <p className="ct-desc">
            Currently focusing on BrinaOS Ports and the RP21 Fan HQ.<br/>
            Drop a message if you want to create something cool.
          </p>

          <div className="ct-funfact" style={{ marginTop: '28px', paddingLeft: '18px', borderLeft: '2px solid rgba(232,40,40,0.4)' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'var(--red)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '6px' }}>Fun Fact</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>Every project named after a Sabrina song.</div>
          </div>
        </div>

        <div className={rv(inView, 'ct-right')} style={{transitionDelay:'.12s'}}>
          <div className="ct-cards">
            {lks.map((x, i)=>(
              <a key={x.name} className="ct-card" href={x.href} target={x.href.startsWith('mailto')?undefined:'_blank'} rel="noopener" style={{transitionDelay:`${0.15 + i*0.05}s`}}>
                <div className="ct-card-icon">{x.icon}</div>
                <div className="ct-card-info">
                  <div className="ct-card-name">{x.name}</div>
                  <div className="ct-card-sub">{x.sub}</div>
                </div>
                <div className="ct-card-arrow"><Arw/></div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Footer ───────────────────────────────────────────────── */
function Footer(){
  return(
    <footer>
      <span className="ftcp">© 2025 Aditya Jha · @ozyern · Crafted with obsession.</span>
      <div className="ftlk">{[['sabrina','https://sabrina.ozyern.me'],['exhale','https://github.com/ozyern/Exhale'],['github','https://github.com/ozyern'],['top ↑','#home']].map(([l,h])=><a key={l} href={h} target={h.startsWith('http')?'_blank':undefined} rel="noopener">{l}</a>)}</div>
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
      <ScrollProgress/>
      <Cursor/>
      <Loader onDone={done}/>
      {ready&&(
        <>
          <Sidebar/>
          <main>
            <Hero/>
            <Experience/>
            <Projects/>
            <Stats/>
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
