import * as THREE from 'https://unpkg.com/three@0.157.0/build/three.module.js';

let scene, camera, renderer, cube;

// Création d'un chargeur de textures
const textureLoader = new THREE.TextureLoader();

function init() {
    // Initialisation de la scène
    scene = new THREE.Scene();

    // Initialisation de la caméra
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;

    // Initialisation du renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);

    const container = document.getElementById('threejs-cube');
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Chargement de la texture depuis BK.jpg
    const texture = textureLoader.load('../assets/img/BK.jpg', () => {
        console.log('Texture chargée avec succès.');

        // Création du cube avec cette texture
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshBasicMaterial({
            map: texture, // Applique la texture sur toutes les faces
        });

        cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Éclairage
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        animate();
    }, undefined, (error) => {
        console.error('Erreur lors du chargement de la texture :', error);
    });
}

function animate() {
    requestAnimationFrame(animate);

    // Rotation fluide
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

// Initialiser lorsque le DOM est chargé
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
