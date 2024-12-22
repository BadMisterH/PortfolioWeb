// Animation des cartes d'expérience et de formation au scroll
function initializeTimelineCards() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observer les cartes d'expérience et de formation
    document.querySelectorAll('.timeline-item').forEach(item => {
        timelineObserver.observe(item);
        
        // Ajouter l'événement de clic pour le son
        item.addEventListener('click', () => {
            const radarSound = document.getElementById('radarSound');
            if (radarSound) {
                radarSound.currentTime = 0;
                radarSound.volume = 0.5; // Réduire le volume à 50%
                radarSound.play().catch(() => {});
                
                // Ajouter un effet visuel au clic
                const dot = item.querySelector('.timeline-dot');
                if (dot) {
                    dot.style.animation = 'none';
                    dot.offsetHeight; // Force reflow
                    dot.style.animation = 'ping 1s cubic-bezier(0, 0, 0.2, 1)';
                }
            }
        });
    });
}

// Initialiser l'animation au chargement de la page
document.addEventListener('DOMContentLoaded', initializeTimelineCards);
