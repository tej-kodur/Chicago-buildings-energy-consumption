import * as THREE from 'https://unpkg.com/three/build/three.module.js';

// Initialize the map
const map = L.map('map').setView([41.8781, -87.6298], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Make sure the renderer background is transparent
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(50, 50, 50);
scene.add(light);
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Function to convert Lat/Lon to Leaflet point
function latLonToLeafletPoint(lat, lon) {
    const point = map.latLngToLayerPoint(new L.LatLng(lat, lon));
    return [point.x, point.y];
}

fetch('/api/data')
    .then(response => response.json())
    .then(data => {
        const scaleHeight = 0.1; // Scale factor for height to make it visible
        data.forEach(building => {
            const [x, y] = latLonToLeafletPoint(building.Latitude, building.Longitude);
            const height = building['Site EUI (kBtu/sq ft)'] * scaleHeight;
            const geometry = new THREE.BoxGeometry(1, 1, height);
            const colorValue = building['GHG Intensity (kg CO2e/sq ft)'] * 20;
            const material = new THREE.MeshPhongMaterial({ color: `hsl(${colorValue}, 100%, 50%)` });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(x - window.innerWidth / 2, -y + window.innerHeight / 2, height / 2);
            scene.add(mesh);
        });
    });

camera.position.set(0, -300, 300);
camera.lookAt(new THREE.Vector3(0, 0, 0));

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();