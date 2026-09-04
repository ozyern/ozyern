/**
 * All of the site's copy lives here.
 *
 * Two reasons: fixing a typo should never mean opening a component, and
 * `SECTIONS` below is the single source of truth for both the page order and
 * the side navigation — they used to be two hand-kept lists that drifted apart.
 */

export const PROFILE = {
  name: 'Aditya Jha',
  handle: '@ozyern',
  email: 'ozyern.dev@gmail.com',
  role: 'Android ROM Porter · Kernel Dev · Web Builder',
  availability: 'Open to collabs',
  lede:
    'I port ColorOS and OxygenOS 16 onto Snapdragon 888 hardware, write the kernels that keep them alive, and build the interfaces that make them worth looking at.',
}

/** Drives both the page order and the side rail. */
export const SECTIONS = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'stats', label: 'Numbers', icon: 'chart' },
  { id: 'experience', label: 'Work', icon: 'briefcase' },
  { id: 'projects', label: 'Projects', icon: 'layers' },
  { id: 'skills', label: 'Skills', icon: 'bolt' },
  { id: 'about', label: 'About', icon: 'person' },
  { id: 'contact', label: 'Contact', icon: 'mail' },
]

export const SOCIALS = [
  { id: 'github', label: 'GitHub', handle: '@ozyern', icon: 'github', href: 'https://github.com/ozyern' },
  { id: 'telegram', label: 'Telegram', handle: '@ozyern', icon: 'telegram', href: 'https://t.me/ozyern' },
  { id: 'email', label: 'Email', handle: PROFILE.email, icon: 'mail', href: `mailto:${PROFILE.email}` },
  { id: 'site', label: 'Website', handle: 'ozyern.me', icon: 'globe', href: 'https://ozyern.me' },
]

/** The pull quote in the About block. */
export const QUOTE =
  'Just a random Sabrina Carpenter fan who happens to write kernels. Feather, Espresso, Singular, Tornado — every project I ship ends up named after one of her songs.'

/**
 * `to` is the number the counter animates towards; `suffix` is appended once
 * it lands. `text` opts a card out of counting entirely.
 */
export const STATS = [
  { label: 'Community Members', to: 370, suffix: '+', note: 'ReVork · Telegram', live: true },
  { label: 'Active Projects', to: 14, suffix: '+', note: 'Shipping right now' },
  { label: 'Fan Sites Live', to: 3, note: 'sabrina · exhale' },
  { label: 'Primary SoC', text: 'SM8350', note: 'OnePlus 9 Pro' },
]

export const EXPERIENCE = [
  {
    company: 'BrinaOS Ports',
    role: 'Maintainer',
    tag: 'Open Source',
    date: '2025 — Present',
    icon: 'terminal',
    summary:
      'Bash-based ColorOS/OxygenOS 16 porting framework for SM8350. Smali AI patching, OTA generation, SuperVOOC 65W paths and premium feature-gating.',
    stack: ['Bash', 'SM8350', 'ColorOS 16', 'OTA', 'Smali'],
  },
  {
    company: 'ReVork',
    role: 'Founder',
    tag: 'Community',
    date: '2025 — Present',
    icon: 'telegram',
    summary:
      'A ~370-member Telegram community for custom ROM development — themed role system, release channels and hands-on developer support.',
    stack: ['Community', 'Android', 'Telegram'],
  },
  {
    company: 'sabrina.ozyern.me',
    role: 'Developer',
    tag: 'Web Dev',
    date: '2024 — Present',
    icon: 'globe',
    summary:
      'Liquid-glass fan site — gallery, era-filtered discography, Dynamic Island navigation and a birthday campaign. Cold-emailed Foundation Media Partners about it.',
    stack: ['HTML/CSS/JS', 'GitHub Pages'],
  },
  {
    company: 'Feather Kernel',
    role: 'Developer',
    tag: 'Kernel',
    date: '2025',
    icon: 'chip',
    summary:
      'Custom OnePlus 9 Pro kernel — binary string patching, SukiSU Ultra spoof modules, KernelSU framework and AnyKernel3 packaging.',
    stack: ['Kernel', 'KernelSU', 'AnyKernel'],
  },
]

/** `preview` names a component in components/ProjectPreviews.jsx. */
export const PROJECTS = [
  {
    name: 'BrinaOS Ports',
    date: 'Aug 2025',
    href: 'https://github.com/ozyern',
    url: 'github.com/ozyern/BrinaOS-Ports',
    preview: 'brinaos',
    summary:
      'A complete bash-based porting framework for ColorOS and OxygenOS 16 on Snapdragon 888. It handles partition manipulation, smali patching, OTA generation and feature unlocking end to end.',
  },
  {
    name: 'sabrina.ozyern.me',
    date: 'Dec 2024',
    href: 'https://sabrina.ozyern.me',
    url: 'sabrina.ozyern.me',
    preview: 'sabrina',
    summary:
      'Liquid-glass fan site for Sabrina Carpenter — era-filtered discography, Dynamic Island navigation, a gallery and a birthday campaign. It reached Foundation Media Partners off a cold email.',
  },
  {
    name: 'Exhale',
    date: '2025 — Present',
    href: 'https://github.com/ozyern/Exhale',
    url: 'github.com/ozyern/Exhale',
    preview: 'exhale',
    summary:
      'A breath of fresh air for your music — a premium, open-source Android player built around a fluid Liquid Glass interface and a genuinely fast library scanner.',
  },
]

export const SKILLS = [
  {
    name: 'Android ROM Dev',
    icon: 'terminal',
    blurb: 'Low-level porting, partition manipulation, smali patching and OTA generation.',
    tags: ['port.sh', 'Smali', 'ADB', 'OTA', 'ColorOS 16'],
  },
  {
    name: 'Kernel & Modules',
    icon: 'chip',
    blurb: 'Binary patching, boot image packing and root framework implementations.',
    tags: ['KernelSU', 'Magisk', 'AnyKernel', 'SukiSU'],
  },
  {
    name: 'Web Development',
    icon: 'layers',
    blurb: 'High-performance, design-driven sites and React applications.',
    tags: ['React', 'Vite', 'Liquid-Glass UI', 'Animation'],
  },
  {
    name: 'Tooling & Env',
    icon: 'person',
    blurb: 'The environment I live in daily to keep all of the above shippable.',
    tags: ['Bash', 'Ubuntu', 'Git', 'Docker', 'Linux'],
  },
]

export const DEVICES = [
  { name: 'OnePlus 13', note: '"Espresso"' },
  { name: 'OnePlus 9 Pro (lemonadep)', note: '"Feather"' },
  { name: 'ROG Strix SCAR 16 2025', note: 'Daily driver' },
]
