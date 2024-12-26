// Initialize Swiper
document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.project-swiper', {
        // Paramètres généraux
        slidesPerView: 1,
        spaceBetween: 20,
        grabCursor: true,
        
        // Configuration responsive
        breakpoints: {
            // Mobile
            320: {
                slidesPerView: 1,
                spaceBetween: 15,
                loop: true
            },
            // Tablet
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
                loop: false
            },
            // Desktop
            1024: {
                slidesPerView: 2,
                spaceBetween: 30,
                loop: false
            },
            // Large Desktop
            1440: {
                slidesPerView: 3,
                spaceBetween: 40,
                loop: false
            }
        },

        // Activer l'autoplay sur mobile uniquement
        autoplay: {
            delay: 5000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true
        },

        // Contrôle du clavier
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },

        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },

        // Boutons de navigation
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // Accessibilité
        a11y: {
            prevSlideMessage: 'Projet précédent',
            nextSlideMessage: 'Projet suivant',
            firstSlideMessage: 'Ceci est le premier projet',
            lastSlideMessage: 'Ceci est le dernier projet',
            paginationBulletMessage: 'Aller au projet {{index}}'
        },

        // Optimisations de performance
        preloadImages: true,
        updateOnWindowResize: true,
        resizeObserver: true,

        // Gestion du touch
        touchRatio: 1.5,
        touchAngle: 45,
        touchMoveStopPropagation: false,
        
        // Effet de transition
        effect: 'slide',
        speed: 400,
    });

    // Pause l'autoplay quand la vidéo est en cours de lecture
    const videos = document.querySelectorAll('.project-image video');
    videos.forEach(video => {
        video.addEventListener('play', () => {
            swiper.autoplay.stop();
        });
        video.addEventListener('pause', () => {
            swiper.autoplay.start();
        });
    });
});
