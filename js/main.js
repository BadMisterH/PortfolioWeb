// Navigation active state on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
    threshold: 0.2,
    rootMargin: '-100px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

// Also handle initial state based on scroll position
function setInitialActiveSection() {
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    
    let currentSection = sections[0];
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollPosition >= sectionTop) {
            currentSection = section;
        }
    });
    
    const currentId = currentSection.getAttribute('id');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
        }
    });
}

// Call setInitialActiveSection on page load and scroll
document.addEventListener('DOMContentLoaded', setInitialActiveSection);
document.addEventListener('scroll', setInitialActiveSection);

sections.forEach(section => observer.observe(section));

// Radar animation enhancements
const radar = document.querySelector('.radar-container');
const skillPoints = document.querySelectorAll('.skill-point');

function updateRadarEffects() {
    skillPoints.forEach(point => {
        point.style.animation = 'pulse 2s infinite';
    });
}

updateRadarEffects();

// Enhanced Radar Chart Animation
const dataPoints = document.querySelectorAll('.data-point');

function initializeRadarChart() {
    const radarShape = document.querySelector('.radar-shape');
    let isAnimating = false;

    function calculateRadarPoints() {
        const points = [];
        dataPoints.forEach(point => {
            const angle = parseFloat(point.style.getPropertyValue('--angle')) * Math.PI / 180;
            const value = parseFloat(point.style.getPropertyValue('--value'));
            points.push({
                x: Math.cos(angle) * value,
                y: Math.sin(angle) * value
            });
        });
        return points;
    }

    function updateRadarShape(scale = 1) {
        const points = calculateRadarPoints();
        points.forEach((point, index) => {
            radarShape.style.setProperty(`--p${index + 1}-x`, point.x * scale);
            radarShape.style.setProperty(`--p${index + 1}-y`, point.y * scale);
        });
    }

    // Pulse animation on hover
    function pulseAnimation() {
        if (isAnimating) return;
        isAnimating = true;

        let scale = 1;
        const maxScale = 1.1;
        const duration = 1000;
        const startTime = performance.now();

        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = elapsed / duration;

            if (progress < 1) {
                scale = 1 + Math.sin(progress * Math.PI) * (maxScale - 1);
                updateRadarShape(scale);
                requestAnimationFrame(animate);
            } else {
                updateRadarShape(1);
                isAnimating = false;
            }
        }

        requestAnimationFrame(animate);
    }

    // Interactive hover effects
    dataPoints.forEach((point, index) => {
        point.addEventListener('mouseenter', () => {
            point.style.transform = `
                rotate(var(--angle)) 
                translateX(calc(260px * var(--value))) 
                rotate(calc(-1 * var(--angle)))
                scale(1.2)
            `;
            pulseAnimation();
        });

        point.addEventListener('mouseleave', () => {
            point.style.transform = `
                rotate(var(--angle)) 
                translateX(calc(250px * var(--value))) 
                rotate(calc(-1 * var(--angle)))
            `;
        });

        // Add glitch effect on click
        point.addEventListener('click', () => {
            point.style.animation = 'none';
            point.offsetHeight; // Trigger reflow
            point.style.animation = 'glitch 0.3s ease';
        });
    });

    // Animate radar points on scroll
    const radarChart = document.querySelector('.radar-chart');
    const radarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Initial animation
                dataPoints.forEach((point, index) => {
                    setTimeout(() => {
                        point.style.opacity = '1';
                        point.style.transform = `
                            rotate(var(--angle)) 
                            translateX(calc(250px * var(--value))) 
                            rotate(calc(-1 * var(--angle)))
                        `;
                    }, index * 200);
                });
                updateRadarShape();
            }
        });
    }, { threshold: 0.5 });

    if (radarChart) {
        radarObserver.observe(radarChart);
    }
}

// Enhanced Skill Tags Animation
function initializeSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-5px) scale(1.1)';
        });

        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
        });

        // Add click interaction
        tag.addEventListener('click', () => {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            tag.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 1000);

            // Trigger glitch animation
            tag.style.animation = 'none';
            tag.offsetHeight; // Trigger reflow
            tag.style.animation = 'glitch 0.3s ease';
        });
    });
}

// Initialize all enhanced features
document.addEventListener('DOMContentLoaded', () => {
    initializeRadarChart();
    initializeSkillTags();
});

// Add glitch animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes glitch {
        0% {
            transform: translate(0);
        }
        20% {
            transform: translate(-2px, 2px);
        }
        40% {
            transform: translate(-2px, -2px);
        }
        60% {
            transform: translate(2px, 2px);
        }
        80% {
            transform: translate(2px, -2px);
        }
        100% {
            transform: translate(0);
        }
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(0, 255, 157, 0.3);
        transform: scale(0);
        animation: rippleEffect 1s linear;
        pointer-events: none;
    }

    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Interactive hover effects
dataPoints.forEach(point => {
    point.addEventListener('mouseenter', () => {
        point.style.transform = `
            rotate(var(--angle)) 
            translateX(calc(260px * var(--value))) 
            rotate(calc(-1 * var(--angle)))
            scale(1.1)
        `;
    });

    point.addEventListener('mouseleave', () => {
        point.style.transform = `
            rotate(var(--angle)) 
            translateX(calc(250px * var(--value))) 
            rotate(calc(-1 * var(--angle)))
        `;
    });
});

// Skill tags animation
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'translateY(-5px)';
    });

    tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'translateY(0)';
    });
});

// Parallax effect for grid overlay
const gridOverlay = document.querySelector('.grid-overlay');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const delta = (currentScrollY - lastScrollY) * 0.1;
    
    gridOverlay.style.transform = `translateY(${delta}px)`;
    lastScrollY = currentScrollY;
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add glitch effect on hover for profile image
// const profileContainer = document.querySelector('.profile-container');

// profileContainer?.addEventListener('mouseenter', () => {
//     profileContainer.style.animation = 'glitch 0.5s infinite';
// });

// profileContainer?.addEventListener('mouseleave', () => {
//     profileContainer.style.animation = 'none';
// });

// // Dynamic skill point animations
// function animateSkillPoints() {
//     skillPoints.forEach((point, index) => {
//         const delay = index * 0.2;
//         point.style.animation = `fadeIn 0.5s ${delay}s forwards`;
//     });
// }

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Suppression de l'appel à animateSkillPoints qui n'existe pas
    initializeProjectCarousel();
    initRadarScanner();
});

// Enhanced Project Carousel with Advanced Navigation
function initializeProjectCarousel() {
    const carousel = document.querySelector('.carousel-container');
    if (!carousel) return; // Protection si l'élément n'existe pas

    const track = document.querySelector('.carousel-track');
    if (!track) return; // Protection si l'élément n'existe pas

    const cards = document.querySelectorAll('.project-card');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let currentIndex = 0;
    let startX;
    let currentX;
    let isDragging = false;
    let autoplayInterval;
    
    // Create progress bar with null check
    function createProgressBar() {
        if (!carousel) return; // Protection supplémentaire
        const progressContainer = document.querySelector('.carousel-progress-container');
        if (!progressContainer) return;
        
        const progressBar = document.createElement('div');
        progressBar.className = 'carousel-progress';
        progressContainer.appendChild(progressBar);
    }

    // Initialize touch events
    if (track) {
        track.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
            if (typeof stopAutoScroll === 'function') {
                stopAutoScroll();
            }
        });

        track.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            if (typeof handleSwipe === 'function') {
                handleSwipe();
            }
            if (typeof startAutoScroll === 'function') {
                startAutoScroll();
            }
        });
    }
}

// Radar Scanner Animation with protection
function initRadarScanner() {
    const scanner = document.querySelector('.radar-scanner');
    if (!scanner) return; // Protection si l'élément n'existe pas

    let rotation = 0;
    function animate() {
        if (!scanner) return; // Protection supplémentaire
        rotation = (rotation + 1) % 360;
        scanner.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        requestAnimationFrame(animate);
    }
    animate();
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeProjectCarousel();
});

// Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-inner');
    const cards = document.querySelectorAll('.project-card');
    const prevBtn = document.querySelector('.carousel-button.prev');
    const nextBtn = document.querySelector('.carousel-button.next');
    const dots = document.querySelectorAll('.dot');
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 32; // Including gap
    const maxIndex = cards.length - 1;

    function updateCarousel() {
        // Update transform
        carousel.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });

        // Update buttons visibility
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex === maxIndex ? '0.5' : '1';
    }

    // Event listeners for buttons
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentIndex < maxIndex) {
                // Swipe left
                currentIndex++;
                updateCarousel();
            } else if (diff < 0 && currentIndex > 0) {
                // Swipe right
                currentIndex--;
                updateCarousel();
            }
        }
    }

    // Auto-play functionality
    let autoplayInterval;

    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        }, 5000); // Change slide every 5 seconds
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Start autoplay initially
    // startAutoplay();

    // Pause autoplay on hover
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Initial setup
    updateCarousel();
})

// Radar Wave Effect with Sound
let hasPlayedSound = false;

document.addEventListener('click', (e) => {
    // Créer l'effet d'onde
    const wave = document.createElement('div');
    wave.classList.add('radar-wave');
    wave.style.left = `${e.clientX}px`;
    wave.style.top = `${e.clientY}px`;
    document.body.appendChild(wave);

    // Jouer le son du radar uniquement la première fois
    const radarSound = document.getElementById('radarSound');
    if (radarSound && !hasPlayedSound) {
        radarSound.currentTime = 0;
        radarSound.play().catch(error => {
            console.warn('Unable to play radar sound:', error);
        });
        hasPlayedSound = true;
    }

    // Supprimer l'élément une fois l'animation terminée
    wave.addEventListener('animationend', () => {
        wave.remove();
    });
});

// Skills animation on scroll
const skillBars = document.querySelectorAll('.skill-bar');

const observerOptions2 = {
    threshold: 0.5,
    rootMargin: "0px"
};

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.querySelector('.progress');
            progress.style.transform = 'scaleX(1)';
        }
    });
}, observerOptions2);

skillBars.forEach(bar => skillsObserver.observe(bar));

// Touch events for carousel
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    if (!track) return;

    let touchStartX = 0;
    let touchEndX = 0;
    let currentIndex = 0;
    const maxIndex = document.querySelectorAll('.project-card').length - 1;

    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            } else if (diff < 0 && currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }
    }

    function updateCarousel() {
        if (!track) return;
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;
    }
});

// Page ripple effect
document.addEventListener('click', (e) => {
    const rippleContainer = document.querySelector('.ripple-container');
    const ripple = document.createElement('div');
    const rippleCircle = document.createElement('div');
    
    ripple.className = 'ripple';
    rippleCircle.className = 'ripple-circle';
    
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    
    ripple.appendChild(rippleCircle);
    rippleContainer.appendChild(ripple);
    
    // Clean up
    rippleCircle.addEventListener('animationend', () => {
        ripple.remove();
    });
});
