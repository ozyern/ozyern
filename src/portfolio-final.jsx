import{useState,useEffect,useRef,useCallback}from'react'

const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&family=JetBrains+Mono:wght@400;500;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#080808;--red:#e82828;--red2:#ff3838;--rdim:rgba(232,40,40,.12);--bord:rgba(255,255,255,.08);--text:#fff;--muted:rgba(255,255,255,.45);--sub:rgba(255,255,255,.22);--r:20px}
body{background:var(--bg);color:var(--text);font-family:'Inter',sans-serif;overflow-x:hidden;cursor:none;line-height:1.6}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:var(--red);border-radius:2px}
.cdot{width:8px;height:8px;background:#fff;border-radius:50%;position:fixed;pointer-events:none;z-index:9999;transform:translate(-50%,-50%)}
.cring{width:40px;height:40px;border:1.5px solid rgba(232,40,40,.5);border-radius:50%;position:fixed;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:width .3s cubic-bezier(.34,1.56,.64,1),height .3s,border-color .2s}
body.hov .cring{width:60px;height:60px;border-color:var(--red)}
.ldr{position:fixed;inset:0;z-index:10000;background:var(--bg);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;transition:opacity .6s,visibility .6s}
.ldr.out{opacity:0;visibility:hidden}
.llo{font-size:12px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--muted)}
.llo b{color:var(--red)}
.llb{width:180px;height:1px;background:var(--bord);overflow:hidden}
.llf{height:100%;background:var(--red);transition:width .4s ease}
.llp{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--sub);letter-spacing:.1em}
.sidebar{position:fixed;left:14px;top:50%;transform:translateY(-50%);z-index:200}
.sb-pill{background:rgba(14,14,14,.92);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,.09);border-radius:9999px;padding:10px 8px;display:flex;flex-direction:column;gap:2px;align-items:center;box-shadow:0 8px 32px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.06)}
.sb-item{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.32);text-decoration:none;transition:color .2s,background .2s;position:relative}
.sb-item:hover{color:rgba(255,255,255,.8)}
.sb-item.active{background:rgba(255,255,255,.95);color:#111}
.sb-tip{position:absolute;left:calc(100% + 12px);background:rgba(14,14,14,.92);backdrop-filter:blur(16px);border:1px solid var(--bord);color:#fff;font-size:11px;padding:5px 10px;border-radius:8px;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .2s;font-family:'JetBrains Mono',monospace;letter-spacing:.06em}
.sb-item:hover .sb-tip{opacity:1}
main{margin-left:76px}
.hero{position:relative;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding-bottom:80px;overflow:hidden}
.hbg{position:absolute;inset:0;background:radial-gradient(ellipse 80% 70% at 50% 20%,rgba(200,20,20,.22) 0%,rgba(120,10,10,.1) 45%,transparent 70%)}
.hbg::before{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,transparent 30%,rgba(8,8,8,.65) 62%,var(--bg) 100%)}
.hbg::after{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,.013) 2px,rgba(255,255,255,.013) 4px)}
.hportr{position:absolute;top:0;left:50%;transform:translateX(-50%);width:440px;height:68%;display:flex;align-items:center;justify-content:center}
.hportr-inner{width:230px;height:310px;background:linear-gradient(160deg,rgba(55,8,8,.92),rgba(28,4,4,.96));border-radius:50% 50% 48% 48%/60% 60% 40% 40%;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;box-shadow:0 0 80px rgba(200,20,20,.24),0 0 160px rgba(150,8,8,.1)}
.hportr-inner::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 80% at 50% 20%,rgba(232,40,40,.18) 0%,transparent 70%)}
.hpicon{opacity:.22;position:relative;z-index:1}
.hsig{font-family:'Playfair Display',serif;font-style:italic;font-size:30px;font-weight:700;color:rgba(255,255,255,.12);position:absolute;top:52%;left:50%;transform:translateX(-50%);white-space:nowrap}
.hcon{position:relative;z-index:2;text-align:center;width:100%;padding:0 24px}
.htag{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--red);letter-spacing:.2em;text-transform:uppercase;margin-bottom:16px;opacity:0;animation:fup .6s ease .4s forwards}
.hnam{font-size:clamp(50px,7.5vw,96px);font-weight:900;letter-spacing:-.045em;line-height:.88;margin-bottom:12px}
.hnam .hl{display:block;overflow:hidden}
.hnam .hli{display:block;animation:lup .9s cubic-bezier(.22,1,.36,1) both}
.hnam .hl:nth-child(1) .hli{animation-delay:.28s}
.hnam .hl:nth-child(2) .hli{animation-delay:.42s;color:var(--red)}
.hrole{font-size:clamp(13px,1.4vw,16px);color:var(--muted);margin-bottom:8px;opacity:0;animation:fup .6s ease .65s forwards}
.htline{font-family:'Playfair Display',serif;font-style:italic;font-size:clamp(15px,1.7vw,20px);color:rgba(255,255,255,.32);margin-bottom:36px;opacity:0;animation:fup .6s ease .82s forwards}
.hsoc{display:flex;justify-content:center;gap:10px;margin-bottom:28px;opacity:0;animation:fup .5s ease .98s forwards}
.soc{width:52px;height:52px;border-radius:50%;background:rgba(22,22,22,.88);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.11);box-shadow:inset 0 1px 0 rgba(255,255,255,.1),inset 0 -1px 0 rgba(0,0,0,.3),0 4px 20px rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.58);text-decoration:none;transition:all .25s}
.soc:hover{background:rgba(35,35,35,.92);border-color:rgba(255,255,255,.2);color:#fff;transform:translateY(-2px);box-shadow:inset 0 1px 0 rgba(255,255,255,.13),0 8px 28px rgba(0,0,0,.55)}
.hbtns{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;opacity:0;animation:fup .5s ease 1.12s forwards}
.bp{background:var(--red);color:#fff;padding:14px 36px;border-radius:100px;font-size:14px;font-weight:600;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:all .2s}
.bp:hover{background:var(--red2);transform:translateY(-2px)}
.bs{background:rgba(255,255,255,.08);color:#fff;border:1px solid var(--bord);padding:14px 36px;border-radius:100px;font-size:14px;font-weight:500;text-decoration:none;transition:all .2s}
.bs:hover{background:rgba(255,255,255,.13);transform:translateY(-2px)}
.hscr{position:absolute;bottom:28px;right:52px;z-index:2;display:flex;align-items:center;gap:8px;font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--sub);letter-spacing:.14em;text-transform:uppercase}
.hscr::before{content:'';display:block;width:28px;height:1px;background:var(--sub)}
@keyframes fup{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@keyframes lup{from{transform:translateY(108%)}to{transform:translateY(0)}}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;padding:0 52px 72px;position:relative;z-index:2}
.stc{background:rgba(13,13,13,.88);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.07);border-radius:20px;padding:24px 26px;min-height:170px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 4px 24px rgba(0,0,0,.3);transition:all .3s;cursor:default;overflow:hidden;position:relative}
.stc::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 50% 110%,rgba(232,40,40,.06) 0%,transparent 70%);pointer-events:none}
.stc:hover{border-color:rgba(255,255,255,.13);box-shadow:inset 0 1px 0 rgba(255,255,255,.1),0 8px 32px rgba(0,0,0,.4)}
.stl{font-family:'JetBrains Mono',monospace;font-size:10px;color:rgba(255,255,255,.38);letter-spacing:.13em;text-transform:uppercase;display:flex;align-items:center;gap:7px}
.stl::before{content:'•';font-size:16px;color:rgba(255,255,255,.25);line-height:1}
.stn{font-size:58px;font-weight:900;letter-spacing:-.04em;line-height:1;text-align:right}
.stn-sm{font-size:30px;letter-spacing:-.02em}
.stn b{color:var(--red)}
.stnote{font-size:11px;color:var(--sub);margin-top:3px;text-align:right}
section{padding:80px 52px}
.slbl{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--red);letter-spacing:.22em;text-transform:uppercase;margin-bottom:18px;display:flex;align-items:center;gap:10px}
.slbl::before{content:'•';font-size:18px}
.ssti{color:var(--muted);font-size:clamp(14px,1.5vw,17px);margin-bottom:52px;max-width:560px;line-height:1.65}
.ssti em{font-family:'Playfair Display',serif;font-style:italic;color:#fff;font-size:clamp(16px,1.8vw,20px)}
.expi{display:grid;grid-template-columns:220px 1fr 140px;gap:28px;padding:24px 16px;border-bottom:1px solid var(--bord);transition:all .25s;border-radius:14px}
.expi:first-child{border-top:1px solid var(--bord)}
.expi:hover{background:rgba(255,255,255,.03);backdrop-filter:blur(8px)}
.excn{font-size:14px;font-weight:600;margin-bottom:8px}
.extg{display:inline-flex;background:var(--rdim);border:1px solid rgba(232,40,40,.28);color:var(--red);font-family:'JetBrains Mono',monospace;font-size:10px;padding:3px 12px;border-radius:100px;letter-spacing:.06em}
.exrl{font-size:17px;font-weight:700;margin-bottom:6px}
.exdc{font-size:13px;color:var(--muted);line-height:1.65;margin-bottom:12px;max-width:480px}
.extgs{display:flex;flex-wrap:wrap;gap:6px}
.chip{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--sub);border:1px solid var(--bord);padding:3px 11px;border-radius:100px;transition:all .2s}
.chip:hover{color:var(--red);border-color:rgba(232,40,40,.4)}
.exdt{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--sub);text-align:right;padding-top:4px;line-height:1.5}
.pjl{display:flex;flex-direction:column;gap:20px}
.pjc{display:grid;grid-template-columns:1fr 1fr;min-height:380px;border-radius:24px;overflow:hidden;background:rgba(13,13,13,.8);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.07);box-shadow:inset 0 1px 0 rgba(255,255,255,.05),0 8px 40px rgba(0,0,0,.35);transition:border-color .3s,box-shadow .3s}
.pjc:hover{border-color:rgba(255,255,255,.13);box-shadow:inset 0 1px 0 rgba(255,255,255,.09),0 12px 48px rgba(0,0,0,.45)}
.pjc.rev{direction:rtl}
.pjc.rev>*{direction:ltr}
.pjv{position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;min-height:320px;background:linear-gradient(135deg,#161616,#1c1c1c)}
.pjvc{position:relative;z-index:1;text-align:center;padding:52px 40px}
.pjvt{font-family:'Playfair Display',serif;font-size:clamp(26px,3.2vw,42px);font-weight:800;line-height:1.04;color:#fff}
.pjvt i{font-style:italic;color:var(--red)}
.pjchips{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:14px}
.pjb{padding:44px;display:flex;flex-direction:column;justify-content:space-between}
.pjtop{flex:1;margin-bottom:8px}
.pjnm{font-size:clamp(22px,2.5vw,30px);font-weight:800;letter-spacing:-.02em;margin-bottom:14px;line-height:1.1}
.pjdc{font-size:14px;color:var(--muted);line-height:1.75}
.pjfoot{display:flex;align-items:center;justify-content:space-between;margin-top:32px}
.pjdate{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--sub)}
.pjarrow{width:52px;height:52px;border-radius:50%;background:var(--red);color:#fff;display:flex;align-items:center;justify-content:center;text-decoration:none;transition:all .22s;flex-shrink:0}
.pjarrow:hover{background:var(--red2);transform:scale(1.08) translateY(-2px);box-shadow:0 8px 24px rgba(232,40,40,.4)}
.skli{display:grid;grid-template-columns:56px 1fr auto;align-items:center;gap:28px;padding:28px 16px;border-bottom:1px solid var(--bord);transition:all .25s;border-radius:14px}
.skli:first-child{border-top:1px solid var(--bord)}
.skli:hover{background:rgba(255,255,255,.03);backdrop-filter:blur(8px)}
.sklic{width:48px;height:48px;border-radius:12px;background:var(--rdim);border:1px solid rgba(232,40,40,.2);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0}
.sklnm{font-size:18px;font-weight:700;margin-bottom:5px}
.skldc{font-size:13px;color:var(--muted);max-width:500px;line-height:1.55}
.sklch{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}
.sklnu{font-family:'Playfair Display',serif;font-style:italic;font-size:72px;font-weight:800;color:rgba(255,255,255,.04);line-height:1;letter-spacing:-.04em}
.abgr{display:grid;grid-template-columns:1fr 1.4fr;gap:80px;align-items:start}
.abph{aspect-ratio:3/4;border-radius:var(--r);border:1px solid var(--bord);background:linear-gradient(160deg,#1a0505,#240808,#0a0a0a);position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center}
.abph::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 50% 30%,rgba(232,40,40,.17) 0%,transparent 70%)}
.abphl{position:absolute;bottom:0;left:0;right:0;padding:20px 24px;background:linear-gradient(to top,rgba(8,8,8,.95),transparent);display:flex;justify-content:space-between;align-items:flex-end}
.abphn{font-size:16px;font-weight:700}
.abphs{font-size:12px;color:var(--muted);margin-top:2px}
.abphh{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--red)}
.abhl{font-family:'Playfair Display',serif;font-size:clamp(22px,2.8vw,34px);font-weight:700;line-height:1.22;margin-bottom:24px;letter-spacing:-.02em}
.abhl i{font-style:italic;color:var(--red)}
.abp{font-size:15px;color:var(--muted);line-height:1.88;margin-bottom:16px}
.abp a{color:var(--red);text-decoration:none}
.abp strong{color:#fff;font-weight:600}
.abq{background:rgba(232,40,40,.07);border:1px solid rgba(232,40,40,.2);border-radius:12px;padding:22px 28px;margin:24px 0;position:relative}
.abq::before{content:'"';position:absolute;top:-10px;left:20px;font-size:54px;font-family:'Playfair Display',serif;color:rgba(232,40,40,.22);line-height:1}
.abq p{font-family:'Playfair Display',serif;font-style:italic;font-size:16px;color:rgba(255,255,255,.62);line-height:1.6}
.dvs{margin-top:28px;border-top:1px solid var(--bord);padding-top:18px}
.dvsl{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--red);letter-spacing:.16em;text-transform:uppercase;margin-bottom:12px}
.dvsr{display:flex;justify-content:space-between;align-items:center;padding:11px 0;border-bottom:1px solid var(--bord);font-size:14px}
.dvsr:last-child{border-bottom:none}
.dvsrk{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--red)}
.ctwrap{background:rgba(255,255,255,.02);border-top:1px solid var(--bord)}
.ctgr{display:grid;grid-template-columns:1fr 1fr;gap:80px}
.ctbig{font-family:'Playfair Display',serif;font-size:clamp(44px,7vw,88px);font-weight:800;line-height:.9;letter-spacing:-.03em;margin-bottom:44px}
.ctbig i{font-style:italic;color:var(--red)}
.clk{display:flex;align-items:center;gap:16px;padding:18px 16px;border-radius:12px;text-decoration:none;color:#fff;transition:background .2s;position:relative}
.clk::after{content:'';position:absolute;bottom:0;left:16px;right:16px;height:1px;background:var(--bord)}
.clk:last-child::after{display:none}
.clk:hover{background:rgba(255,255,255,.05)}
.clkic{width:44px;height:44px;border-radius:12px;background:var(--rdim);border:1px solid rgba(232,40,40,.22);display:flex;align-items:center;justify-content:center;color:var(--red);flex-shrink:0;transition:all .2s}
.clk:hover .clkic{background:var(--red);color:#fff;transform:scale(1.06)}
.clktx{flex:1}
.clkn{font-size:15px;font-weight:600;margin-bottom:2px}
.clks{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--muted)}
.clka{color:var(--sub);font-size:18px;transition:all .2s}
.clk:hover .clka{transform:translate(4px,-4px);color:var(--red)}
.cifr{padding:20px 0;border-bottom:1px solid var(--bord);transition:padding .2s}
.cifr:first-child{border-top:1px solid var(--bord)}
.cifr:hover{padding-left:8px}
.cifl{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--sub);letter-spacing:.13em;text-transform:uppercase;margin-bottom:6px}
.cifv{font-size:15px;font-weight:600;display:flex;align-items:center;gap:8px}
.cifv a{color:var(--red);text-decoration:none}
.gdot{width:8px;height:8px;border-radius:50%;background:#4ade80;animation:pulse 2s ease-in-out infinite;flex-shrink:0}
@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(74,222,128,.4)}50%{box-shadow:0 0 0 6px rgba(74,222,128,0)}}
footer{padding:24px 52px;border-top:1px solid var(--bord);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px}
.ftcp{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--sub)}
.ftlk{display:flex;gap:24px}
.ftlk a{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--sub);text-decoration:none;letter-spacing:.08em;text-transform:uppercase;transition:color .2s}
.ftlk a:hover{color:var(--red)}
@media(max-width:900px){main{margin-left:0;padding-bottom:80px}.sidebar{position:fixed;bottom:12px;left:50%;transform:translateX(-50%);top:auto}.sb-pill{flex-direction:row;padding:8px 10px}section{padding:60px 24px}.stats{grid-template-columns:1fr 1fr;padding:0 24px 60px}.expi{grid-template-columns:1fr;gap:8px}.pjc{grid-template-columns:1fr}.pjc.rev{direction:ltr}.pjv{min-height:220px}.skli{grid-template-columns:48px 1fr}.sklnu{display:none}.abgr{grid-template-columns:1fr;gap:40px}.ctgr{grid-template-columns:1fr;gap:48px}footer{padding:20px 24px;flex-direction:column;align-items:flex-start}}
`
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

const EXP=[
  {company:'Feather Engine',tag:'Open Source',role:'Maintainer',date:'2024 — Present',desc:'Bash-based ColorOS/OxygenOS 16 porting framework for SM8350. Smali AI patching, OTA generation, SuperVOOC 65W paths.',tags:['Bash','SM8350','ColorOS 16','OTA','Smali']},
  {company:'ReVork',tag:'Community',role:'Founder',date:'2024 — Present',desc:'~200-member Telegram community for custom ROM development. Sabrina Carpenter-themed role system.',tags:['Community','Android','Telegram']},
  {company:'sabrina.ozyern.me',tag:'Web Dev',role:'Developer',date:'2024 — Present',desc:'Liquid-glass fan site — gallery, era-filtered discography, Dynamic Island nav, birthday campaign.',tags:['HTML/CSS/JS','GitHub Pages']},
  {company:'Feather Kernel',tag:'Kernel',role:'Developer',date:'2024',desc:'Custom OP9 Pro kernel — binary string patching, SukiSU Ultra spoof modules, KernelSU framework.',tags:['Kernel','KernelSU','AnyKernel']},
  {company:'patidar.ozyern.me',tag:'Web Dev',role:'Developer',date:'Ongoing',desc:"Dark luxury red/gold fan site for RCB's Rajat Patidar. Dynamic Island nav, detailed animations.",tags:['HTML/CSS/JS','RCB']},
]
const PROJ=[
  {name:'Feather Engine',desc:'A complete bash-based porting framework for ColorOS/OxygenOS 16 on Snapdragon 888. Handles everything from partition manipulation to AI feature patching.',tags:['SM8350','Bash','OTA'],href:'https://github.com/ozyern',vt:<>The Framework<br/>for <i>Feather</i></>,col:'rgba(232,40,40,.15)',date:'Aug 2024',rev:false},
  {name:'sabrina.ozyern.me',desc:'Liquid-glass fan site with era-filtered discography, Dynamic Island nav, gallery and birthday campaign. Reached Foundation Media Partners.',tags:['HTML/CSS','Animations'],href:'https://sabrina.ozyern.me',vt:<><i>Feather</i>&nbsp;&amp;<br/>Espresso</>,col:'rgba(130,80,255,.14)',date:'Dec 2024',rev:true},
  {name:'patidar.ozyern.me',desc:'RP21 Fan HQ for Rajat Patidar — dark luxury red/gold aesthetic, Dynamic Island nav, animated hero. RCB-themed throughout.',tags:['HTML/CSS','RCB'],href:'https://patidar.ozyern.me',vt:<>Bridging <i>Red</i><br/>&amp; Gold.</>,col:'rgba(200,40,40,.14)',date:'Ongoing',rev:false},
]
const SKILLS=[
  {icon:'🔧',name:'Android ROM Dev',num:'01',desc:'Low-level porting, partition manipulation, smali patching, OTA generation.',tags:['port.sh','Smali','ADB','OTA','ColorOS 16']},
  {icon:'⚙️',name:'Kernel & Modules',num:'02',desc:'Feather Kernel, binary patching, SukiSU Ultra spoof modules, KernelSU/Magisk framework.',tags:['KernelSU','Magisk','AnyKernel','SukiSU']},
  {icon:'🌐',name:'Web Development',num:'03',desc:'HTML/CSS/JS with strong visual identity — liquid-glass, Dynamic Island patterns, GitHub Pages.',tags:['HTML/CSS/JS','GitHub Pages','Animations']},
  {icon:'🛠️',name:'Tooling & Env',num:'04',desc:'Dual-boot Ubuntu on ROG Strix G16 2025. Bash scripting, performance tuning, terminal-first dev.',tags:['Bash','Ubuntu','Git','Linux']},
]

function Cursor(){
  const dr=useRef(null),rr=useRef(null),s=useRef({mx:0,my:0,rx:0,ry:0})
  useEffect(()=>{
    const mv=e=>{s.current.mx=e.clientX;s.current.my=e.clientY}
    let raf
    const tick=()=>{const c=s.current;c.rx=c.rx+(c.mx-c.rx)*.12;c.ry=c.ry+(c.my-c.ry)*.12;if(dr.current){dr.current.style.left=c.mx+'px';dr.current.style.top=c.my+'px'}if(rr.current){rr.current.style.left=c.rx+'px';rr.current.style.top=c.ry+'px'};raf=requestAnimationFrame(tick)}
    document.addEventListener('mousemove',mv);raf=requestAnimationFrame(tick)
    const bind=()=>document.querySelectorAll('a,button,.stc,.expi,.skli,.pjc,.soc').forEach(el=>{el.addEventListener('mouseenter',()=>document.body.classList.add('hov'));el.addEventListener('mouseleave',()=>document.body.classList.remove('hov'))})
    setTimeout(bind,600)
    return()=>{document.removeEventListener('mousemove',mv);cancelAnimationFrame(raf)}
  },[])
  return <><div className="cdot" ref={dr}/><div className="cring" ref={rr}/></>
}

function Loader({onDone}){
  const[p,setP]=useState(0),[out,setOut]=useState(false)
  useEffect(()=>{let v=0,id=setInterval(()=>{v+=Math.random()*14+7;if(v>=100){v=100;clearInterval(id);setTimeout(()=>{setOut(true);setTimeout(onDone,600)},200)};setP(Math.round(v))},55);return()=>clearInterval(id)},[onDone])
  return <div className={`ldr${out?' out':''}`}><div className="llo">@ozy<b>ern</b></div><div className="llb"><div className="llf" style={{width:p+'%'}}/></div><div className="llp">{p}%</div></div>
}

function Sidebar(){
  const[active,setActive]=useState('home')
  useEffect(()=>{
    const targets=document.querySelectorAll('section[id],div[id="stats"]')
    const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)setActive(e.target.id)})},{threshold:.25,rootMargin:'-5% 0px -55% 0px'})
    targets.forEach(t=>obs.observe(t))
    return()=>obs.disconnect()
  },[])
  const items=[
    {id:'home',icon:<HoIco/>,label:'Home'},
    {id:'experience',icon:<BrIco/>,label:'Work'},
    {id:'projects',icon:<LaIco/>,label:'Projects'},
    {id:'stats',icon:<PlIco/>,label:'Stats'},
    {id:'skills',icon:<BlIco/>,label:'Skills'},
    {id:'about',icon:<PeIco/>,label:'About'},
    {id:'contact',icon:<MsIco/>,label:'Contact'},
    {href:'mailto:ozi@ozyern.me',id:'_mail',icon:<EnIco/>,label:'Email'},
  ]
  return(
    <div className="sidebar">
      <div className="sb-pill">
        {items.map((it,i)=>(
          <a key={i} href={it.href||`#${it.id}`} className={`sb-item${active===it.id?' active':''}`} onClick={()=>it.id!=='_mail'&&setActive(it.id)} target={it.href?'_blank':undefined} rel={it.href?'noopener':undefined}>
            {it.icon}<span className="sb-tip">{it.label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}

function Hero(){
  return(
    <section id="home" className="hero">
      <div className="hbg"/>
      <div className="hportr"><div className="hportr-inner"><svg className="hpicon" width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="rgba(232,40,40,0.4)" strokeWidth="0.6"><circle cx="12" cy="7" r="5"/><path d="M3 21c0-5 3.6-9 9-9s9 4 9 9"/></svg></div></div>
      <div className="hsig">Aditya Jha</div>
      <div className="hcon">
        <p className="htag">Android Developer &amp; ROM Porter</p>
        <h1 className="hnam"><span className="hl"><span className="hli">Aditya</span></span><span className="hl"><span className="hli">Jha.</span></span></h1>
        <p className="hrole">Feather Engine Maintainer · ReVork Founder · Student</p>
        <p className="htline">Building close to the metal.</p>
        <div className="hsoc">
          {[{href:'https://github.com/ozyern',icon:<GH/>,l:'GitHub'},{href:'https://t.me/ozyern',icon:<TG/>,l:'Telegram'},{href:'mailto:ozi@ozyern.me',icon:<ML/>,l:'Email'},{href:'https://ozyern.me',icon:<WB/>,l:'Website'}].map(s=>(
            <a key={s.l} className="soc" href={s.href} target={s.href.startsWith('mailto')?undefined:'_blank'} rel="noopener" aria-label={s.l}>{s.icon}</a>
          ))}
        </div>
        <div className="hbtns">
          <a className="bp" href="#projects"><span>View my work</span><EX/></a>
          <a className="bs" href="#contact">Get in touch</a>
        </div>
      </div>
      <div className="hscr">scroll</div>
    </section>
  )
}

function Stats(){
  const[v,setV]=useState([0,0,0]),ref=useRef(null)
  useEffect(()=>{
    const ob=new IntersectionObserver(([e])=>{
      if(!e.isIntersecting)return
      const T=[200,6,3]
      T.forEach((t,i)=>{let n=0;const step=Math.ceil(t/20);const id=setInterval(()=>{n=Math.min(n+step,t);setV(prev=>{const nx=[...prev];nx[i]=n;return nx});if(n>=t)clearInterval(id)},40)})
      ob.disconnect()
    },{threshold:.4})
    if(ref.current)ob.observe(ref.current)
    return()=>ob.disconnect()
  },[])
  const cards=[
    {label:'Community members',val:<>{v[0]}<b>+</b></>,note:'ReVork Telegram'},
    {label:'Active projects',val:<>{v[1]}<b>+</b></>,note:'Shipping right now'},
    {label:'Fan sites live',val:<>{v[2]}</>,note:'sabrina · patidar · more'},
    {label:'Primary SoC',val:<>SM<b>8350</b></>,note:'OnePlus 9 Pro target',sm:true},
  ]
  return(
    <div id="stats" className="stats" ref={ref}>
      {cards.map((c,i)=>(
        <div className="stc" key={i}>
          <div className="stl">{c.label}</div>
          <div><div className={`stn${c.sm?' stn-sm':''}`}>{c.val}</div><div className="stnote">{c.note}</div></div>
        </div>
      ))}
    </div>
  )
}

function Experience(){
  return(
    <section id="experience">
      <div className="slbl">Experiences</div>
      <p className="ssti">A chronicle of my journey in <em>Android development and web creation.</em></p>
      {EXP.map((e,i)=>(
        <div className="expi" key={i}>
          <div><div className="excn">{e.company}</div><span className="extg">{e.tag}</span></div>
          <div><div className="exrl">{e.role}</div><p className="exdc">{e.desc}</p><div className="extgs">{e.tags.map(t=><span key={t} className="chip">{t}</span>)}</div></div>
          <div className="exdt">{e.date}</div>
        </div>
      ))}
    </section>
  )
}

function Projects(){
  return(
    <section id="projects" style={{background:'rgba(255,255,255,.02)',borderTop:'1px solid var(--bord)'}}>
      <div className="slbl">Highlighted Works</div>
      <p className="ssti">Things I've <em>actually shipped</em> — from kernels to fan sites.</p>
      <div className="pjl">
        {PROJ.map((p,i)=>(
          <div className={`pjc${p.rev?' rev':''}`} key={i}>
            <div className="pjv">
              <div style={{position:'absolute',inset:0,background:p.col}}/>
              <div className="pjvc"><div className="pjvt">{p.vt}</div><div className="pjchips">{p.tags.map(t=><span key={t} className="chip">{t}</span>)}</div></div>
            </div>
            <div className="pjb">
              <div className="pjtop"><div className="pjnm">{p.name}</div><p className="pjdc">{p.desc}</p></div>
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

function Skills(){
  return(
    <section id="skills">
      <div className="slbl">My Skills</div>
      <p className="ssti">What I <em>actually know</em> and build with every day.</p>
      {SKILLS.map((s,i)=>(
        <div className="skli" key={i}>
          <div className="sklic">{s.icon}</div>
          <div><div className="sklnm">{s.name}</div><p className="skldc">{s.desc}</p><div className="sklch">{s.tags.map(t=><span key={t} className="chip">{t}</span>)}</div></div>
          <div className="sklnu">{s.num}</div>
        </div>
      ))}
    </section>
  )
}

function About(){
  return(
    <section id="about" style={{background:'rgba(255,255,255,.02)',borderTop:'1px solid var(--bord)'}}>
      <div className="slbl">About Me</div>
      <div className="abgr">
        <div className="abph">
          <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="rgba(232,40,40,0.22)" strokeWidth="0.7" style={{position:'relative',zIndex:1}}><circle cx="12" cy="7" r="5"/><path d="M3 21c0-5 3.6-9 9-9s9 4 9 9"/></svg>
          <div className="abphl"><div><div className="abphn">Aditya Jha</div><div className="abphs">Student · Developer</div></div><div className="abphh">@ozyern</div></div>
        </div>
        <div>
          <h3 className="abhl">Building <i>close to the metal</i> — kernels, ROMs, and fan sites that feel alive.</h3>
          <p className="abp">I'm Ozi — a student at Sarala Birla Public School in Ranchi, and an active Android ROM porter. I maintain <strong>Feather Engine</strong>, a bash-based framework for porting ColorOS/OxygenOS 16 to Snapdragon 888 devices.</p>
          <p className="abp">My work spans from partition image manipulation and smali patching, all the way to fan sites with liquid-glass CSS and Dynamic Island navigation.</p>
          <div className="abq"><p>"Every project I name ends up a Sabrina Carpenter reference. Feather, Espresso, Singular, Tornado — that's just how it is."</p></div>
          <p className="abp">I run <strong>ReVork</strong>, a ~200-member Telegram community. Built <a href="https://sabrina.ozyern.me" target="_blank" rel="noopener">sabrina.ozyern.me</a> and cold-emailed her management.</p>
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

function Contact(){
  const lks=[{icon:<GH/>,name:'GitHub',sub:'@ozyern',href:'https://github.com/ozyern'},{icon:<TG/>,name:'Telegram',sub:'@ozyern',href:'https://t.me/ozyern'},{icon:<ML/>,name:'Email',sub:'ozi@ozyern.me',href:'mailto:ozi@ozyern.me'},{icon:<WB/>,name:'Website',sub:'ozyern.me',href:'https://ozyern.me'}]
  const inf=[{l:'Status',v:<><span className="gdot"/>Available for collabs</>},{l:'Current Focus',v:'Feather Engine · RP21 Fan HQ'},{l:'Community',v:<a href="https://t.me/revork" target="_blank" rel="noopener">ReVork on Telegram ↗</a>},{l:'GitHub',v:<a href="https://github.com/ozyern" target="_blank" rel="noopener">github.com/ozyern ↗</a>},{l:'Fun fact',v:<span style={{color:'var(--muted)',fontWeight:400}}>Every project named after a Sabrina Carpenter song.</span>}]
  return(
    <section id="contact" className="ctwrap">
      <div className="ctgr">
        <div>
          <div className="slbl">Get in Touch</div>
          <h2 className="ctbig">Let's <i>build</i><br/>something<br/>together.</h2>
          {lks.map(x=><a key={x.name} className="clk" href={x.href} target={x.href.startsWith('mailto')?undefined:'_blank'} rel="noopener"><div className="clkic">{x.icon}</div><div className="clktx"><div className="clkn">{x.name}</div><div className="clks">{x.sub}</div></div><div className="clka">↗</div></a>)}
        </div>
        <div>{inf.map(r=><div key={r.l} className="cifr"><div className="cifl">{r.l}</div><div className="cifv">{r.v}</div></div>)}</div>
      </div>
    </section>
  )
}

function Footer(){
  return(
    <footer>
      <span className="ftcp">© 2025 Aditya Jha · @ozyern · Crafted with obsession.</span>
      <div className="ftlk">{[['sabrina','https://sabrina.ozyern.me'],['patidar','https://patidar.ozyern.me'],['github','https://github.com/ozyern'],['top ↑','#home']].map(([l,h])=><a key={l} href={h} target={h.startsWith('http')?'_blank':undefined} rel="noopener">{l}</a>)}</div>
    </footer>
  )
}

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
      <style>{CSS}</style>
      <Cursor/>
      <Loader onDone={done}/>
      {ready&&(
        <>
          <Sidebar/>
          <main>
            <Hero/>
            <Stats/>
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
