const scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5);

// Camera
const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
camera.position.set(8, 6, 8);

// Renderer
const canvas = document.getElementById("scene");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(400, 350);
renderer.shadowMap.enabled = true;

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lights
const sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.set(10, 15, 10);
sun.castShadow = true;
scene.add(sun);

scene.add(new THREE.AmbientLight(0xffffff, 0.4));

// Ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 50),
  new THREE.MeshStandardMaterial({ color: 0x7ec850 })
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// Materials
const wallMat = new THREE.MeshStandardMaterial({ color: 0xd9b38c });
const roofMat = new THREE.MeshStandardMaterial({ color: 0x8b0000 });
const glassMat = new THREE.MeshStandardMaterial({
  color: 0x88ccee,
  transparent: true,
  opacity: 0.6
});

// Ground floor
const groundFloor = new THREE.Mesh(
  new THREE.BoxGeometry(6, 2.5, 4),
  wallMat
);
groundFloor.position.y = 1.25;
groundFloor.castShadow = true;
scene.add(groundFloor);

// First floor
const firstFloor = new THREE.Mesh(
  new THREE.BoxGeometry(5, 2, 3.5),
  wallMat
);
firstFloor.position.y = 3.5;
firstFloor.castShadow = true;
scene.add(firstFloor);

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(4.5, 2, 4),
  roofMat
);
roof.position.y = 5;
roof.rotation.y = Math.PI / 4;
scene.add(roof);

// Windows
function window(x, y, z) {
  const w = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.8, 0.1),
    glassMat
  );
  w.position.set(x, y, z);
  scene.add(w);
}

window(3.01, 1.5, 1);
window(-3.01, 1.5, -1);
window(2.5, 3.5, 1);

// Garage
const garage = new THREE.Mesh(
  new THREE.BoxGeometry(2.5, 1.8, 2.5),
  new THREE.MeshStandardMaterial({ color: 0x888888 })
);
garage.position.set(-4.5, 0.9, 0);
garage.castShadow = true;
scene.add(garage);

// Animate
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
