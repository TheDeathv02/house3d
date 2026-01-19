const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// Camera
const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
camera.position.set(10, 7, 10);

// Renderer
const canvas = document.getElementById("scene");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(450, 360);
renderer.shadowMap.enabled = true;

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Texture loader
const loader = new THREE.TextureLoader();
const wallTex = loader.load("textures/wall.jpg");
const roofTex = loader.load("textures/roof.jpg");
const grassTex = loader.load("textures/grass.jpg");

// Lights
let sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.set(15, 20, 10);
sun.castShadow = true;
scene.add(sun);

const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

// Ground
grassTex.wrapS = grassTex.wrapT = THREE.RepeatWrapping;
grassTex.repeat.set(10,10);

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 50),
  new THREE.MeshStandardMaterial({ map: grassTex })
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// Materials
const wallMat = new THREE.MeshStandardMaterial({ map: wallTex });
const roofMat = new THREE.MeshStandardMaterial({ map: roofTex });

// House
const groundFloor = new THREE.Mesh(
  new THREE.BoxGeometry(6, 2.5, 4),
  wallMat
);
groundFloor.position.y = 1.25;
groundFloor.castShadow = true;
scene.add(groundFloor);

const firstFloor = new THREE.Mesh(
  new THREE.BoxGeometry(5, 2, 3.5),
  wallMat
);
firstFloor.position.y = 3.5;
firstFloor.castShadow = true;
scene.add(firstFloor);

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(4.8, 2, 4),
  roofMat
);
roof.position.y = 5.2;
roof.rotation.y = Math.PI / 4;
scene.add(roof);

// Garage door animation
const garageDoor = new THREE.Mesh(
  new THREE.BoxGeometry(2.2, 1.5, 0.1),
  new THREE.MeshStandardMaterial({ color: 0x555555 })
);
garageDoor.position.set(-4, 0.8, 2.01);
scene.add(garageDoor);

let open = false;
document.body.addEventListener("click", () => open = !open);

// Day/Night
let night = false;
document.getElementById("toggle").onclick = () => {
  night = !night;
  scene.background.set(night ? 0x0b1026 : 0x87ceeb);
  sun.intensity = night ? 0.2 : 1;
  ambient.intensity = night ? 0.1 : 0.4;
};

// Animate
function animate() {
  requestAnimationFrame(animate);

  garageDoor.position.y += open ? 0.02 : -0.02;
  garageDoor.position.y = THREE.MathUtils.clamp(garageDoor.position.y, 0.8, 2.5);

  controls.update();
  renderer.render(scene, camera);
}
animate();
