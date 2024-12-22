// Animation des cartes d'expérience au scroll
function initializeExperienceCards() {
    const experienceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Jouer le son du radar lors de l'apparition
                const radarSound = document.getElementById('radarSound');
                if (radarSound) {
                    radarSound.currentTime = 0;
                    radarSound.play().catch(() => {});
                }
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px'
    });

    document.querySelectorAll('.timeline-item').forEach(item => {
        experienceObserver.observe(item);
    });
}

// Initialiser l'animation au chargement de la page
document.addEventListener('DOMContentLoaded', initializeExperienceCards);
