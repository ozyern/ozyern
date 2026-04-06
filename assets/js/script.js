const isTouchDevice = () => {
    return ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
};

const cursorGlow = document.getElementById('cursorGlow');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = mouseX;
let cursorY = mouseY;
let cursorVisible = true;
let activeTimeout;
const cursorEasing = 0.18;

const navbar = document.querySelector('.navbar');
const heroSection = document.getElementById('hero');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenuLinks = document.getElementById('navLinks');
const navLinks = navMenuLinks ? Array.from(navMenuLinks.querySelectorAll('a[href^="#"]')) : [];
const sections = Array.from(document.querySelectorAll('main section[id]'));

function animateCursor() {
    cursorX += (mouseX - cursorX) * cursorEasing;
    cursorY += (mouseY - cursorY) * cursorEasing;

    if (cursorGlow && cursorVisible) {
        cursorGlow.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    }

    requestAnimationFrame(animateCursor);
}

if (cursorGlow) {
    if (isTouchDevice()) {
        cursorGlow.style.display = 'none';
    } else {
        cursorGlow.style.display = 'block';
        cursorGlow.style.opacity = '1';

        document.addEventListener('mousemove', (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
            cursorVisible = true;

            cursorGlow.style.display = 'block';
            cursorGlow.style.opacity = '1';
            cursorGlow.classList.add('active');

            clearTimeout(activeTimeout);
            activeTimeout = setTimeout(() => {
                cursorGlow.classList.remove('active');
            }, 700);
        });

        document.addEventListener('mouseenter', () => {
            cursorVisible = true;
            cursorGlow.style.opacity = '1';
            cursorGlow.style.display = 'block';
        });

        document.addEventListener('mouseleave', () => {
            cursorVisible = false;
            cursorGlow.style.opacity = '0';
            cursorGlow.style.display = 'none';
            cursorGlow.classList.remove('active');
        });

        document.addEventListener('mousedown', () => {
            cursorGlow.classList.add('clicking');
        });

        document.addEventListener('mouseup', () => {
            cursorGlow.classList.remove('clicking');
        });

        animateCursor();
    }
}

const closeMobileMenu = () => {
    if (!mobileMenuBtn || !navMenuLinks) {
        return;
    }

    navMenuLinks.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
};

if (mobileMenuBtn && navMenuLinks) {
    mobileMenuBtn.setAttribute('aria-expanded', 'false');

    mobileMenuBtn.addEventListener('click', () => {
        const isActive = navMenuLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active', isActive);
        mobileMenuBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        document.body.classList.toggle('menu-open', isActive);

        if (navbar) {
            navbar.classList.remove('nav-hidden');
        }
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.navbar')) {
            closeMobileMenu();
        }
    });
}

const smoothScrollToSection = (selector) => {
    const target = document.querySelector(selector);
    if (!target) {
        return;
    }

    const offset = navbar ? navbar.offsetHeight + 26 : 0;
    const targetTop = target.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
    });
};

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const selector = anchor.getAttribute('href');
        if (!selector || selector === '#') {
            return;
        }

        const target = document.querySelector(selector);
        if (!target) {
            return;
        }

        event.preventDefault();
        smoothScrollToSection(selector);
    });
});

const setActiveNavLink = (scrollYValue) => {
    if (!navLinks.length || !sections.length) {
        return;
    }

    let currentSectionId = sections[0].id;

    sections.forEach((section) => {
        if (scrollYValue + 220 >= section.offsetTop) {
            currentSectionId = section.id;
        }
    });

    navLinks.forEach((link) => {
        const target = link.getAttribute('href');
        link.classList.toggle('active', target === `#${currentSectionId}`);
    });
};

let lastScrollY = window.scrollY;
let scrollTicking = false;

const updateScrollEffects = () => {
    const currentY = window.scrollY;

    if (navbar) {
        navbar.classList.toggle('scrolled', currentY > 24);
        navbar.classList.remove('nav-hidden');
    }

    if (heroSection) {
        const heroShift = Math.min(currentY * 0.045, 18);
        heroSection.style.setProperty('--hero-shift', `${heroShift}px`);
    }

    setActiveNavLink(currentY);

    lastScrollY = currentY;
    scrollTicking = false;
};

window.addEventListener('scroll', () => {
    if (scrollTicking) {
        return;
    }

    scrollTicking = true;
    requestAnimationFrame(updateScrollEffects);
}, { passive: true });

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }

    updateScrollEffects();
}, { passive: true });

const setupRevealAnimations = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    document.body.classList.add('motion-ready');

    const revealGroups = [
        { selector: '.hero-content > *', step: 72 },
        { selector: '#about .section-title, #about .about-card', step: 60 },
        { selector: '#projects .project-card', step: 72 },
        { selector: '#connect .connect-intro, #connect .connect-status, #connect .connect-platform', step: 56 },
        { selector: '.glass-footer > *', step: 60 }
    ];

    const revealTargets = [];

    revealGroups.forEach((group) => {
        const items = Array.from(document.querySelectorAll(group.selector));

        items.forEach((item, index) => {
            item.classList.add('reveal-target');

            if (!item.style.getPropertyValue('--reveal-delay')) {
                const delay = Math.min(index * group.step, 420);
                item.style.setProperty('--reveal-delay', `${delay}ms`);
            }

            revealTargets.push(item);
        });
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -2% 0px'
    });

    revealTargets.forEach((target) => revealObserver.observe(target));
};

setupRevealAnimations();
updateScrollEffects();

if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}
