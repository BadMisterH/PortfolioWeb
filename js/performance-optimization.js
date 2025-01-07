// Lazy loading pour toutes les images
document.addEventListener('DOMContentLoaded', () => {
    // Convertir les images en WebP si possible
    const images = document.querySelectorAll('img:not([loading="lazy"])');
    images.forEach(img => {
        // Ajouter lazy loading à toutes les images
        img.setAttribute('loading', 'lazy');
        
        // Ajouter des tailles appropriées
        if (!img.hasAttribute('width') && !img.hasAttribute('height')) {
            img.setAttribute('width', '100%');
            img.setAttribute('height', 'auto');
        }
    });

    // Optimiser les vidéos
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        // Ajouter lazy loading
        video.setAttribute('loading', 'lazy');
        video.setAttribute('preload', 'none');
        
        // Ajouter playsinline pour iOS
        video.setAttribute('playsinline', '');
        
        // Optimiser la taille
        if (!video.hasAttribute('width') && !video.hasAttribute('height')) {
            video.setAttribute('width', '100%');
            video.setAttribute('height', 'auto');
        }
    });
});

// Différer le chargement des ressources non critiques
const deferResources = () => {
    // Différer le chargement des sons
    const sounds = document.querySelectorAll('audio');
    sounds.forEach(sound => {
        sound.preload = 'none';
    });
};

// Nettoyer les ressources inutilisées
const cleanupUnusedResources = () => {
    // Supprimer les styles inutilisés
    const unusedStyles = document.querySelectorAll('link[rel="stylesheet"]:not([href*="critical"])');
    unusedStyles.forEach(style => {
        if (!style.hasAttribute('media')) {
            style.setAttribute('media', 'print');
            style.setAttribute('onload', "this.media='all'");
        }
    });
};

// Initialiser les optimisations
deferResources();
cleanupUnusedResources();
