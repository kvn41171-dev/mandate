// Premium JavaScript for NCRST Website

// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const backToTopBtn = document.getElementById('backToTop');
const currentYearSpan = document.getElementById('currentYear');
const contactForm = document.getElementById('contactForm');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set current year
    currentYearSpan.textContent = new Date().getFullYear();
    
    // Initialize animations
    initAnimations();
    
    // Initialize form handling
    initForm();
    
    // Initialize scroll effects
    initScrollEffects();
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Back to Top Button
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
    
    // Update active nav link
    updateActiveNavLink();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize animations
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Initialize form handling
function initForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formValues = Object.fromEntries(formData.entries());
        
        // Basic validation
        if (!formValues.name || !formValues.email || !formValues.message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            
            // Log form data (remove in production)
            console.log('Form submitted:', formValues);
        }, 1500);
    });
}

// Initialize scroll effects
function initScrollEffects() {
    // Add shadow to navbar on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(44, 44, 44, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(44, 44, 44, 0.1)';
        }
    });
}

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        </div>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(autoRemove);
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--white);
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        padding: 1rem 1.5rem;
        min-width: 300px;
        max-width: 400px;
        transform: translateX(400px);
        transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        z-index: 9999;
        border-left: 4px solid var(--mustard-yellow);
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        border-left-color: #10B981;
    }
    
    .notification-error {
        border-left-color: #EF4444;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
    
    .notification-success .notification-content i {
        color: #10B981;
    }
    
    .notification-error .notification-content i {
        color: #EF4444;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--medium-grey);
        cursor: pointer;
        margin-left: auto;
        padding: 0.25rem;
        transition: color 0.3s ease;
    }
    
    .notification-close:hover {
        color: var(--primary-grey);
    }
    
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--yellow-gradient);
        color: var(--primary-grey);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: var(--shadow-yellow);
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        opacity: 0;
        visibility: hidden;
        z-index: 999;
    }
    
    .back-to-top:hover {
        transform: translateY(-5px) scale(1.1);
        box-shadow: 0 8px 25px rgba(255, 212, 59, 0.4);
    }
    
    .highlight {
        color: var(--mustard-yellow) !important;
        font-weight: 700 !important;
    }
`;
document.head.appendChild(notificationStyles);

// =========================================
// VIDEO PLAYER FUNCTIONALITY
// =========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Get modal elements
    const videoModal = document.getElementById('videoModal');
    const modalVideoPlayer = document.getElementById('modalVideoPlayer');
    const modalVideoTitle = document.getElementById('modalVideoTitle');
    const modalVideoDescription = document.getElementById('modalVideoDescription');
    const modalClose = document.querySelector('.modal-close');
    
    // Video data for each card
    const videoData = {
        'mandates-video.mp4': {
            title: 'Our Core Mandates Explained',
            description: 'Detailed breakdown of NCRST\'s six strategic mandates and how they guide Namibia\'s research, science, and technology landscape.'
        },
        'research-video.mp4': {
            title: 'Research Impact Stories',
            description: 'Success stories and breakthroughs from NCRST-funded research initiatives across various sectors in Namibia.'
        },
        'capacity-video.mp4': {
            title: 'Capacity Building Programs',
            description: 'Our initiatives to develop Namibia\'s next generation of researchers, scientists, and innovators through training and mentorship.'
        },
        'innovation-video.mp4': {
            title: 'Innovation Showcase',
            description: 'Highlighting technological innovations and commercialized research supported by NCRST across Namibia.'
        }
    };
    
    // Make all video cards clickable
    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on play button directly (it has its own handler)
            if (!e.target.closest('.play-btn')) {
                const videoSrc = this.getAttribute('data-video');
                const videoFileName = videoSrc.split('/').pop(); // Get just filename
                
                // Set modal content
                modalVideoPlayer.src = videoSrc;
                modalVideoTitle.textContent = videoData[videoFileName]?.title || this.querySelector('h4').textContent;
                modalVideoDescription.textContent = videoData[videoFileName]?.description || this.querySelector('p').textContent;
                
                // Show modal
                videoModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
                
                // Try to play video
                modalVideoPlayer.play().catch(error => {
                    console.log('Autoplay prevented. User must click play button.');
                });
            }
        });
    });
    
    // Make play buttons work (for hover effect)
    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Don't trigger card click
            const card = this.closest('.video-card');
            card.click(); // Trigger the card click
        });
    });
    
    // Featured video click to play in modal
    const featuredVideo = document.querySelector('.featured-video video');
    const featuredVideoContainer = document.querySelector('.featured-video .video-container');
    
    if (featuredVideoContainer) {
        featuredVideoContainer.addEventListener('click', function() {
            const videoSrc = featuredVideo.querySelector('source').src;
            
            // Set modal content for featured video
            modalVideoPlayer.src = videoSrc;
            modalVideoTitle.textContent = document.querySelector('.video-info h3').textContent;
            modalVideoDescription.textContent = document.querySelector('.video-info p').textContent;
            
            // Show modal
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Try to play
            modalVideoPlayer.play().catch(error => {
                console.log('Autoplay prevented.');
            });
        });
    }
    
    // Close modal when clicking close button
    modalClose.addEventListener('click', closeVideoModal);
    
    // Close modal when clicking overlay
    videoModal.addEventListener('click', function(e) {
        if (e.target === this || e.target.classList.contains('modal-overlay')) {
            closeVideoModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });
    
    // Function to close video modal
    function closeVideoModal() {
        // Pause video
        modalVideoPlayer.pause();
        modalVideoPlayer.currentTime = 0;
        
        // Hide modal
        videoModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Handle video errors
    modalVideoPlayer.addEventListener('error', function() {
        alert('Error loading video. Please check if the video file exists at: ' + this.src);
        closeVideoModal();
    });
    
    // Video preloading for better performance
    function preloadVideos() {
        const videoCards = document.querySelectorAll('.video-card[data-video]');
        videoCards.forEach(card => {
            const videoSrc = card.getAttribute('data-video');
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.src = videoSrc;
        });
    }
    
    // Start preloading videos
    setTimeout(preloadVideos, 1000);
});