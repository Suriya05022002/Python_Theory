 // Enhanced Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Animate the hamburger icon
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'rotate(0) translate(0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translate(0)';
        }
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset hamburger icon
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'rotate(0) translate(0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translate(0)';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset hamburger icon
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'rotate(0) translate(0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translate(0)';
        }
    });
}

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20;
            
            // Add smooth scroll with easing
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Add visual feedback
            target.style.transform = 'scale(1.02)';
            target.style.transition = 'transform 0.3s ease';
            setTimeout(() => {
                target.style.transform = 'scale(1)';
            }, 300);
        }
    });
});

// Enhanced active section highlighting
const sections = document.querySelectorAll('.section');
const tocLinks = document.querySelectorAll('.toc a');
const navLinks = document.querySelectorAll('.nav-link');

function highlightActiveSection() {
    let current = '';
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const scrollPosition = window.pageYOffset + navbarHeight + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionBottom = sectionTop + sectionHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            current = section.getAttribute('id');
        }
    });

    // Update TOC links
    tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
            
            // Smooth scroll the sidebar to show active item
            const sidebar = document.querySelector('.sidebar');
            const linkRect = link.getBoundingClientRect();
            const sidebarRect = sidebar.getBoundingClientRect();
            
            if (linkRect.bottom > sidebarRect.bottom || linkRect.top < sidebarRect.top) {
                link.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    });

    // Update nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Run once on load to set initial active section
highlightActiveSection();
window.addEventListener('scroll', highlightActiveSection);


    
  

// Progress indicator
const progressBar = document.querySelector('.progress-bar');
function updateProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = Math.min(scrolled, 100) + '%';
}
window.addEventListener('scroll', updateProgress);

// Back to top button
const backToTopButton = document.getElementById('backToTop');
function toggleBackToTop() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
}
window.addEventListener('scroll', toggleBackToTop);
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Syntax highlighting for code blocks
document.addEventListener('DOMContentLoaded', () => {
    // Check if Prism is loaded
    if (typeof Prism !== 'undefined') {
        // Manually highlight all code blocks
        document.querySelectorAll('pre code').forEach((block) => {
            Prism.highlightElement(block);
        });
    }
});

// Collapsible sections for better mobile experience
const sectionHeaders = document.querySelectorAll('.section h2');
sectionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const section = header.parentElement;
        const content = section.querySelector('.content-card');
        content.classList.toggle('collapsed');
    });
});


// Initialize tooltips for code examples
tippy('.copy-button', {
    content: 'Copy to clipboard',
    delay: [100, 0],
    animation: 'scale',
    theme: 'light',
});

// Lazy loading for images (if any)
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// Add animation to cards when they come into view
const animateOnScroll = () => {
    const cards = document.querySelectorAll('.content-card, .operator-card, .example-box');
    const windowHeight = window.innerHeight;
    const windowTop = window.scrollY;
    const windowBottom = windowTop + windowHeight;

    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top + windowTop;
        const cardBottom = cardTop + card.offsetHeight;

        if (cardBottom >= windowTop && cardTop <= windowBottom) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.querySelectorAll('.content-card, .operator-card, .example-box').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);
animateOnScroll(); // Run once on initialization

// Keyboard

// Save scroll position when navigating between sections
window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('scrollPosition', window.pageYOffset);
});

// Restore scroll position on load
window.addEventListener('load', () => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        sessionStorage.removeItem('scrollPosition');
    }
});