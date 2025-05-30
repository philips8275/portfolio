// Custom JavaScript for Philips Dsouza Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavbar();
    initScrollSpy();
    initSmoothScrolling();
    initAnimations();
    initTypingEffect();
    initContactForm();
    initThemeToggle();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.custom-navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu close on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}

// Scroll spy functionality
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animation for cards
                if (entry.target.classList.contains('project-card') || 
                    entry.target.classList.contains('skills-category')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.card, .skill-item, .timeline-item');
    animateElements.forEach(el => observer.observe(el));
}

// Typing effect for hero section
function initTypingEffect() {
    const typingElement = document.querySelector('.hero-content h2');
    if (!typingElement) return;
    
    const titles = [
        'Python Developer',
        'AI/ML Enthusiast',
        'Web Developer',
        'Problem Solver'
    ];
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeTitle() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Typing speed
        let typeSpeed = isDeleting ? 100 : 150;
        
        // Check if word is complete
        if (!isDeleting && charIndex === currentTitle.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typeSpeed = 500; // Pause before next word
        }
        
        setTimeout(typeTitle, typeSpeed);
    }
    
    // Start typing effect after page load
    setTimeout(typeTitle, 1000);
}

// Contact form functionality
function initContactForm() {
    // Email button click tracking
    const emailButton = document.querySelector('a[href^="mailto:"]');
    const phoneButton = document.querySelector('a[href^="tel:"]');
    
    if (emailButton) {
        emailButton.addEventListener('click', function() {
            // Track email click (you can add analytics here)
            console.log('Email button clicked');
        });
    }
    
    if (phoneButton) {
        phoneButton.addEventListener('click', function() {
            // Track phone click (you can add analytics here)
            console.log('Phone button clicked');
        });
    }
}

// Theme toggle functionality (for future enhancement)
function initThemeToggle() {
    // This can be expanded to include dark/light mode toggle
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // You can add theme switching logic here
    if (prefersDarkScheme.matches) {
        document.body.classList.add('dark-theme');
    }
}

// Skill progress animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
}

// Parallax effect for hero section
function initParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Loading animation
function showLoading(element) {
    element.innerHTML = '<span class="loading"></span>';
}

function hideLoading(element, originalText) {
    element.innerHTML = originalText;
}

// Scroll to top functionality
function initScrollToTop() {
    // Create scroll to top button
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top btn btn-primary';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: none;
        z-index: 1000;
        border: none;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });
    
    // Scroll to top on click
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollToTop();
});

// Project card hover effects
function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Copy to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        showNotification('Copied to clipboard!');
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification alert alert-success';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1050;
        min-width: 200px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', function() {
    initProjectCardEffects();
    
    // Add click to copy email functionality
    const emailElements = document.querySelectorAll('[href^="mailto:"]');
    emailElements.forEach(el => {
        el.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            const email = this.href.replace('mailto:', '');
            copyToClipboard(email);
        });
    });
});

// Preloader (optional)
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;
    preloader.innerHTML = '<div class="loading" style="width: 50px; height: 50px; border-width: 5px;"></div>';
    
    document.body.insertBefore(preloader, document.body.firstChild);
    
    window.addEventListener('load', function() {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    });
}

// Initialize preloader
// initPreloader();

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor page load time
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    });
    
    // Monitor scroll performance
    let ticking = false;
    
    function updateScrollEffects() {
        // Add any scroll-based animations here
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
}

// Initialize performance monitoring
initPerformanceMonitoring();

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
        .then(function(registration) {
            console.log('ServiceWorker registration successful');
        })
        .catch(function(err) {
            console.log('ServiceWorker registration failed');
        });
    });
}