// =====================
// Preloader
// =====================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1500);
});

// =====================
// Custom Cursor
// =====================
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: 'forwards' });
});

// Scale cursor on link hover
const links = document.querySelectorAll('a, button, .btn');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'scale(2)';
        cursorOutline.style.transform = 'scale(1.5)';
    });
    link.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'scale(1)';
        cursorOutline.style.transform = 'scale(1)';
    });
});

// =====================
// Navigation
// =====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active link on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
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
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// =====================
// Typing Animation
// =====================
const typedTextSpan = document.querySelector('.typed-text');
const textArray = ['Computer Science Student', 'Web Developer', 'Mobile App Developer', 'ML Enthusiast', 'Problem Solver'];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, newTextDelay + 250);
});

// =====================
// Scroll Animations
// =====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll('.skill-category, .project-card, .award-card, .timeline-item');
animatedElements.forEach(el => observer.observe(el));

// Add fadeInUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// =====================
// Scroll to Top Button
// =====================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =====================
// Form Submission
// =====================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Create mailto link
    const mailtoLink = `mailto:mnumanzafar832@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    window.location.href = mailtoLink;
    
    // Reset form
    contactForm.reset();
});

// =====================
// Smooth Scrolling
// =====================
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

// =====================
// Particle Effect (Hero Section)
// =====================
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: 5px;
        height: 5px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0;
        animation: particleFloat 3s ease-in-out infinite;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 3 + 's';
    
    document.querySelector('.hero-particles').appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 3000);
}

// Create particles periodically
setInterval(createParticle, 300);

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// =====================
// Dynamic Year in Footer
// =====================
document.querySelector('.footer-content p').innerHTML = `&copy; ${new Date().getFullYear()} M Noman Zafar. All Rights Reserved.`;