// Optimized Custom Cursor with Smooth Performance
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let isVisible = true;
let activeTimeout;

// Smooth easing factor
const easing = 0.16;

// Initialize cursor position
if (cursorGlow) {
    cursorGlow.style.left = '0px';
    cursorGlow.style.top = '0px';
    cursorGlow.style.display = 'block';
    cursorGlow.style.opacity = '1';
}

function animateCursor() {
    // Smooth exponential moving average
    cursorX += (mouseX - cursorX) * easing;
    cursorY += (mouseY - cursorY) * easing;
    
    if (cursorGlow && isVisible) {
        cursorGlow.style.left = cursorX + 'px';
        cursorGlow.style.top = cursorY + 'px';
    }
    
    requestAnimationFrame(animateCursor);
}

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

// Active Nav Link
window.addEventListener('scroll', () => {
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
});

// Initialize Lucide Icons
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}
