// Optimized Custom Cursor with Smooth Performance
// Disable cursor on touch devices
const isTouchDevice = () => {
    return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
};

const cursorGlow = document.getElementById('cursorGlow');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let isVisible = true;
let activeTimeout;

// Smooth easing factor - optimized for high refresh rates
const easing = 0.3; // Increased from 0.16 for snappier response

// Initialize cursor position (only on non-touch devices)
if (cursorGlow && !isTouchDevice()) {
    cursorGlow.style.transform = 'translate3d(0, 0, 0)';
    cursorGlow.style.display = 'block';
    cursorGlow.style.opacity = '1';
} else if (cursorGlow) {
    cursorGlow.style.display = 'none';
}

function animateCursor() {
    // Smooth exponential moving average
    cursorX += (mouseX - cursorX) * easing;
    cursorY += (mouseY - cursorY) * easing;
    
    if (cursorGlow && isVisible && !isTouchDevice()) {
        // Use transform3d for GPU acceleration
        cursorGlow.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    }
    
    requestAnimationFrame(animateCursor);
}

// Only attach cursor events on non-touch devices
if (!isTouchDevice()) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isVisible = true;
        
        if (cursorGlow) {
            cursorGlow.style.opacity = '1';
            cursorGlow.style.display = 'block';
            
            // Add active class on movement
            if (!cursorGlow.classList.contains('active')) {
                cursorGlow.classList.add('active');
            }
            
            // Debounce active removal
            clearTimeout(activeTimeout);
            activeTimeout = setTimeout(() => {
                cursorGlow.classList.remove('active');
            }, 800);
        }
    });

    document.addEventListener('mouseenter', () => {
        isVisible = true;
        if (cursorGlow) {
            cursorGlow.style.opacity = '1';
            cursorGlow.style.display = 'block';
            cursorGlow.classList.add('active');
        }
    });

    document.addEventListener('mouseleave', () => {
        isVisible = false;
        if (cursorGlow) {
            cursorGlow.style.opacity = '0';
            cursorGlow.style.display = 'none';
            cursorGlow.classList.remove('active');
            clearTimeout(activeTimeout);
        }
    });

    // Click feedback
    document.addEventListener('mousedown', (e) => {
        if (cursorGlow) {
            cursorGlow.classList.add('clicking');
        }
    });

    document.addEventListener('mouseup', () => {
        if (cursorGlow) {
            cursorGlow.classList.remove('clicking');
        }
    });

    document.addEventListener('click', (e) => {
        isVisible = true;
        if (cursorGlow) {
            cursorGlow.style.opacity = '1';
            cursorGlow.style.display = 'block';
        }
    });

    animateCursor();
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenuLinks = document.getElementById('navLinks');

if (mobileMenuBtn && navMenuLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenuLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navMenuLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenuLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navMenuLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
}

// Intersection Observer for Fade In Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-section');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Smooth Scroll for Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Nav Link - Optimized with scroll throttling
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) return;
    
    scrollTimeout = requestAnimationFrame(() => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        scrollTimeout = null;
    });
});

// Initialize Lucide Icons
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}
