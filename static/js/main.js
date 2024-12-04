// Initialize Cesium Viewer with necessary settings
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmOTg0NjgzNS1kMWIzLTQyNGEtODlkNi1mM2EwYjViNTA5YjgiLCJpZCI6MjYwMTYzLCJpYXQiOjE3MzMzNTE2OTZ9.gIgJIXAzMOxwDagCuqFRDu9NpG_fRNu5qEweZ8S3F60'; // Replace with your Cesium Ion access token

const viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain(),
    shouldAnimate: true,
    selectionIndicator: false,
    infoBox: false
});

// Function to add a building to the map as a 3D entity
function addBuilding(longitude, latitude, height, color) {
    const position = Cesium.Cartesian3.fromDegrees(longitude, latitude);
    const barHeight = height * 10; // Scale factor for bar height
    const colorMaterial = new Cesium.Color.fromCssColorString(color);

    viewer.entities.add({
        position: position,
        box: {
            dimensions: new Cesium.Cartesian3(30, 30, barHeight),
            material: colorMaterial,
            outline: true,
            outlineColor: Cesium.Color.BLACK
        }
    });
}

// Fetch building data from the server and create 3D bars
fetch('/api/data')
    .then(response => response.json())
    .then(data => {
        data.forEach(building => {
            const height = building['Site EUI (kBtu/sq ft)'];
            const intensity = building['GHG Intensity (kg CO2e/sq ft)'];
            const color = `hsl(${intensity * 360}, 100%, 50%)`; // Convert GHG intensity to a color
            addBuilding(building.Longitude, building.Latitude, height, color);
        });
        viewer.zoomTo(viewer.entities); // Adjust the camera to include all entities
    })
    .catch(error => console.error('Error loading or processing data:', error));