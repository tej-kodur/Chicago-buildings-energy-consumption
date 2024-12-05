// Initialize Cesium Viewer with necessary settings
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmOTg0NjgzNS1kMWIzLTQyNGEtODlkNi1mM2EwYjViNTA5YjgiLCJpZCI6MjYwMTYzLCJpYXQiOjE3MzMzNTE2OTZ9.gIgJIXAzMOxwDagCuqFRDu9NpG_fRNu5qEweZ8S3F60'; // Replace with your Cesium Ion access token
// Initialize Cesium Viewer with necessary settings
// Initialize Cesium Viewer with necessary settings
const viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain(),
    shouldAnimate: true,
    selectionIndicator: false,
    infoBox: false
});

let intensityValues = []; // Array to hold all intensity values for percentile calculation

// Function to add a building to the map as a 3D entity
function addBuilding(longitude, latitude, height, intensity) {
    const position = Cesium.Cartesian3.fromDegrees(longitude, latitude);
    const barHeight = height * 10; // Scale factor for bar height
    const colorMaterial = getColorFromIntensity(intensity);

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

// Function to determine color based on GHG intensity, using percentile-based scaling
function getColorFromIntensity(intensity) {
    const index = Math.floor(getPercentileIndex(intensity) * 120);
    const hue = 120 - index; // Scale hue from green to red
    return new Cesium.Color.fromCssColorString(`hsl(${hue}, 100%, 50%)`);
}

// Calculate the percentile index of a given intensity
function getPercentileIndex(intensity) {
    intensityValues.sort((a, b) => a - b);
    const position = intensityValues.findIndex(value => value >= intensity);
    return position / intensityValues.length;
}

// Fetch building data from the server and create 3D bars
fetch('/api/data')
    .then(response => response.json())
    .then(data => {
        // Collect all intensity values
        intensityValues = data.map(building => parseFloat(building['GHG Intensity (kg CO2e/sq ft)']) / 100);

        // Add buildings to the map
        data.forEach(building => {
            const height = building['Site EUI (kBtu/sq ft)'];
            const intensity = parseFloat(building['GHG Intensity (kg CO2e/sq ft)']) / 100; // Normalize intensity
            addBuilding(building.Longitude, building.Latitude, height, intensity);
        });

        viewer.zoomTo(viewer.entities); // Adjust the camera to include all entities
    })
    .catch(error => console.error('Error loading or processing data:', error));