document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe skill items
    document.querySelectorAll('.scroll-reveal').forEach(item => {
        observer.observe(item);
    });

    // Observe creative title
    const creativeTitle = document.querySelector('.creative-title');
    if (creativeTitle) {
        observer.observe(creativeTitle);
    }
});
