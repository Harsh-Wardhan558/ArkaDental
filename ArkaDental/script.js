// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileMenuBtn.textContent = mobileMenu.classList.contains('active') ? '✕' : '☰';
});

// Services Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Show current slide
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    
    // Move carousel
    const carousel = document.getElementById('servicesCarousel');
    carousel.style.transform = `translateX(-${index * 100}%)`;
    
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Carousel navigation
document.getElementById('nextBtn').addEventListener('click', nextSlide);
document.getElementById('prevBtn').addEventListener('click', prevSlide);

// Indicator navigation
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto-play carousel
let autoplayInterval = setInterval(nextSlide, 5000);

// Pause autoplay on hover
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
});

carouselContainer.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(nextSlide, 5000);
});

// Newsletter Subscription
function subscribeNewsletter() {
    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value.trim();
    
    if (email === '') {
        alert('Please enter your email address.');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate successful subscription
    alert('Thank you for subscribing! You will receive weekly smile hacks and dental tips.');
    emailInput.value = '';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            }
        }
    });
});

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .tourism-item, .stat-item, .testimonial-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in', 'visible');
        }
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to animated elements
    const animatedElements = document.querySelectorAll('.feature-card, .tourism-item, .stat-item, .testimonial-card');
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Initial animation check
    animateOnScroll();
});

// Scroll event listener for animations
window.addEventListener('scroll', animateOnScroll);

// CTA Button Actions
document.querySelectorAll('.cta-btn, .appointment-btn, .learn-more-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (!this.getAttribute('href')) {
            e.preventDefault();
            
            // Simulate booking action
            if (this.textContent.includes('Book') || this.textContent.includes('Appointment')) {
                alert('Booking system would be integrated here. Please call +91 9398819667 to book your appointment.');
            } else if (this.textContent.includes('Learn More')) {
                alert('Detailed information about this service would be shown here.');
            }
        }
    });
});

// Header scroll effect
let lastScrollTop = 0;
const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Add header transition
header.style.transition = 'transform 0.3s ease';

// Contact form validation (if contact form is added)
function validateContactForm(form) {
    const name = form.querySelector('input[name="name"]')?.value.trim();
    const email = form.querySelector('input[name="email"]')?.value.trim();
    const phone = form.querySelector('input[name="phone"]')?.value.trim();
    const message = form.querySelector('textarea[name="message"]')?.value.trim();
    
    if (!name) {
        alert('Please enter your name.');
        return false;
    }
    
    if (!email || !isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    if (!phone) {
        alert('Please enter your phone number.');
        return false;
    }
    
    if (!message) {
        alert('Please enter your message.');
        return false;
    }
    
    return true;
}

// Lazy loading for images (if images are added)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if supported
if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', lazyLoadImages);
}

// Preloader (optional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.textContent = '☰';
    }
    
    // Arrow keys for carousel navigation
    if (document.activeElement.closest('.carousel-container')) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextSlide();
        }
    }
});

// Touch/swipe support for carousel
let startX = 0;
let endX = 0;

carouselContainer.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
});

carouselContainer.addEventListener('touchend', e => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const difference = startX - endX;
    
    if (Math.abs(difference) > swipeThreshold) {
        if (difference > 0) {
            // Swipe left - next slide
            nextSlide();
        } else {
            // Swipe right - previous slide
            prevSlide();
        }
    }
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll-heavy functions
const debouncedAnimateOnScroll = debounce(animateOnScroll, 10);
window.removeEventListener('scroll', animateOnScroll);
window.addEventListener('scroll', debouncedAnimateOnScroll);

// Statistics counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format the number based on original content
            const originalText = counter.textContent;
            if (originalText.includes('+')) {
                counter.textContent = Math.floor(current) + '+';
            } else if (originalText.includes('/')) {
                counter.textContent = originalText; // Keep rating format
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 20);
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.statistics');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            animateCounters();
            statsAnimated = true;
        }
    });
});

if (statsSection) {
    statsObserver.observe(statsSection);
}

console.log('ARKA Dental Care website loaded successfully!');
