import * as THREE from 'https://unpkg.com/three@0.157.0/build/three.module.js';

let scene, camera, renderer, cube;
const textureLoader = new THREE.TextureLoader();

// Variables pour l'animation
let rotationSpeedX = 0.008;
let rotationSpeedY = 0.008;
let rotationSpeedZ = 0.004;
let time = 0;

function init() {
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 4;

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
    });
    
    // Ajuster la taille du rendu en fonction du conteneur
    const container = document.getElementById('threejs-cube');
    const containerSize = Math.min(container.clientWidth, container.clientHeight);
    renderer.setSize(containerSize, containerSize);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.innerHTML = '';
    const canvas = renderer.domElement;
    canvas.setAttribute('data-engine', 'three.js r157');
    container.appendChild(canvas);

    // Chargement de la texture
    const texture = textureLoader.load('../assets/img/qrCV.png', () => {
        console.log('Texture chargée avec succès.');

        const geometry = new THREE.BoxGeometry(2, 2, 2);
        
        const material = new THREE.MeshPhongMaterial({
            map: texture,
            shininess: 100,
            specular: new THREE.Color(0x00ff9d),
            emissive: new THREE.Color(0x002211),
            emissiveIntensity: 0.2,
            transparent: true,
            opacity: 0.95
        });

        cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Contours néon
        const wireframeGeometry = new THREE.EdgesGeometry(geometry);
        const wireframeMaterial = new THREE.LineBasicMaterial({
            color: 0x00ff9d,
            transparent: true,
            opacity: 0.5,
            linewidth: 1
        });
        const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
        cube.add(wireframe);

        // Éclairage
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0x00ff9d, 1);
        pointLight1.position.set(5, 5, 5);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x00ff9d, 0.8);
        pointLight2.position.set(-5, -5, -5);
        scene.add(pointLight2);

        // Ajouter des événements pour l'interaction
        container.addEventListener('mousemove', onMouseMove);
        container.addEventListener('mouseleave', onMouseLeave);

        animate();
    }, undefined, (error) => {
        console.error('Erreur lors du chargement de la texture :', error);
    });
}

// Gestion de l'interaction à la souris
function onMouseMove(event) {
    const rect = event.target.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Ajuster les vitesses de rotation en fonction de la position de la souris
    rotationSpeedX = y * 0.02;
    rotationSpeedY = x * 0.02;
    rotationSpeedZ = (Math.abs(x) + Math.abs(y)) * 0.01;
}

// Réinitialiser les vitesses quand la souris quitte le cube
function onMouseLeave() {
    rotationSpeedX = 0.008;
    rotationSpeedY = 0.008;
    rotationSpeedZ = 0.004;
}

function animate() {
    requestAnimationFrame(animate);

    if (cube) {
        time += 0.005;

        // Animation complexe avec des mouvements sinusoïdaux
        cube.rotation.x += rotationSpeedX * Math.sin(time * 0.3);
        cube.rotation.y += rotationSpeedY;
        cube.rotation.z += rotationSpeedZ * Math.cos(time * 0.2);

        // Mouvement de "respiration"
        const scale = 1 + Math.sin(time * 0.5) * 0.02;
        cube.scale.set(scale, scale, scale);
    }

    renderer.render(scene, camera);
}

// Initialisation
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Gestion du redimensionnement
window.addEventListener('resize', () => {
    const container = document.getElementById('threejs-cube');
    const containerSize = Math.min(container.clientWidth, container.clientHeight);
    
    camera.aspect = 1;
    camera.updateProjectionMatrix();
    
    renderer.setSize(containerSize, containerSize);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
