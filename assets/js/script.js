// Custom macOS-style Cursor
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let isVisible = true;

const speed = 0.15;

// Initialize cursor position
if (cursorGlow) {
    cursorGlow.style.left = '0px';
    cursorGlow.style.top = '0px';
    cursorGlow.style.display = 'block';
    cursorGlow.style.opacity = '1';
}

function animateCursor() {
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    
    if (cursorGlow && isVisible) {
        cursorGlow.style.left = cursorX + 'px';
        cursorGlow.style.top = cursorY + 'px';
        cursorGlow.style.opacity = '1';
        cursorGlow.style.display = 'block';
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
    }
});

document.addEventListener('mouseover', () => {
    isVisible = true;
    if (cursorGlow) {
        cursorGlow.style.opacity = '1';
        cursorGlow.style.display = 'block';
    }
});

document.addEventListener('mouseenter', () => {
    isVisible = true;
    if (cursorGlow) {
        cursorGlow.style.opacity = '1';
        cursorGlow.style.display = 'block';
    }
});

document.addEventListener('mouseleave', () => {
    isVisible = false;
    if (cursorGlow) {
        cursorGlow.style.opacity = '0';
        cursorGlow.style.display = 'none';
    }
});

// Ensure custom cursor stays visible on all elements
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
