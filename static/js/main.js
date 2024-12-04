import * as THREE from 'https://unpkg.com/three/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(50, 50, 50);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040);  // Soft white light
scene.add(ambientLight);

// Base latitude and longitude for Chicago (adjust as needed)
const baseLat = 41.8781;
const baseLon = -87.6298;

// Scale factors for visibility
const positionScale = 1000;
const heightScale = 0.1;

// Fetch and visualize buildings
fetch('/api/data')
    .then(response => response.json())
    .then(data => {
        data.forEach(building => {

            const lat = (building.Latitude - baseLat) * positionScale;
            const lon = (building.Longitude - baseLon) * positionScale;
            const height = building['Site EUI (kBtu/sq ft)'] * heightScale;

            const geometry = new THREE.BoxGeometry(0.1, 0.1, Math.max(height, 0.1));
            const colorValue = building['GHG Intensity (kg CO2e/sq ft)'] * 20;
            const material = new THREE.MeshPhongMaterial({ color: `hsl(${colorValue}, 100%, 50%)` });

            const buildingMesh = new THREE.Mesh(geometry, material);
            buildingMesh.position.set(lon, lat, height / 2);  // Set position
            scene.add(buildingMesh);
        });
    });

// Set camera position to look at the center of the scene
camera.position.set(0, -30, 30);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// Render loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();