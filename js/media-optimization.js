// Lazy loading for videos
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for videos
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                // Load the video source only when it comes into view
                if (video.dataset.src) {
                    video.src = video.dataset.src;
                    video.removeAttribute('data-src');
                }
                videoObserver.unobserve(video);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });

    // Observe all videos
    document.querySelectorAll('video[data-src]').forEach(video => {
        videoObserver.observe(video);
    });

    // Optimize sound loading
    const radarSound = document.getElementById('radarSound');
    let soundLoaded = false;

    // Function to load sound
    function loadSound() {
        if (!soundLoaded && radarSound) {
            radarSound.load();
            soundLoaded = true;
        }
    }

    // Load sound only when user interacts with elements that need it
    document.querySelectorAll('.timeline-item, .competences-item').forEach(item => {
        item.addEventListener('mouseenter', loadSound, { once: true });
    });
});
