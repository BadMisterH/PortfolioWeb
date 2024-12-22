import * as THREE from 'https://unpkg.com/three@0.157.0/build/three.module.js';

let scene, camera, renderer, cube;
const textureLoader = new THREE.TextureLoader();

function init() {
    scene = new THREE.Scene();
    
    // Caméra plus proche pour une meilleure visibilité
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 3.5;

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

    // Chargement de la texture
    const texture = textureLoader.load('../assets/img/qrCV.png', () => {
        console.log('Texture chargée avec succès.');

        const geometry = new THREE.BoxGeometry(2, 2, 2);
        
        // Amélioration du matériau pour plus de brillance et d'effets
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

        // Ajout d'un wireframe pour les contours néon
        const wireframeGeometry = new THREE.EdgesGeometry(geometry);
        const wireframeMaterial = new THREE.LineBasicMaterial({
            color: 0x00ff9d,
            transparent: true,
            opacity: 0.5,
            linewidth: 1
        });
        const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
        cube.add(wireframe);

        // Éclairage amélioré
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // Points lumineux néon
        const pointLight1 = new THREE.PointLight(0x00ff9d, 1);
        pointLight1.position.set(5, 5, 5);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x00ff9d, 0.8);
        pointLight2.position.set(-5, -5, -5);
        scene.add(pointLight2);

        animate();
    }, undefined, (error) => {
        console.error('Erreur lors du chargement de la texture :', error);
    });
}

function animate() {
    requestAnimationFrame(animate);

    if (cube) {
        // Animation plus fluide et naturelle
        const time = Date.now() * 0.001;
        cube.rotation.x = Math.sin(time * 0.5) * 0.2;
        cube.rotation.y += 0.01;
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
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});
