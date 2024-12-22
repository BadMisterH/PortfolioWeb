document.addEventListener('DOMContentLoaded', function() {
    // Création des points radar
    for (let i = 0; i < 50; i++) {
        const dot = document.createElement('div');
        dot.className = 'radar-dot';
        dot.style.left = Math.random() * 100 + 'vw';
        dot.style.top = Math.random() * 100 + 'vh';
        dot.style.animationDelay = Math.random() * 3 + 's';
        document.body.appendChild(dot);
    }

    // Création des cercles radar
    const circles = document.createElement('div');
    circles.className = 'radar-circles';
    for (let i = 0; i < 5; i++) {
        const circle = document.createElement('div');
        circle.className = 'radar-circle';
        circle.style.animationDelay = i * 0.8 + 's';
        circles.appendChild(circle);
    }
    document.body.appendChild(circles);
});
