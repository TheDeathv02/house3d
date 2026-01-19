const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

const camera = new THREE.PerspectiveCamera(
  75,
  1,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("scene"),
  antialias: true
});
renderer.setSize(400, 350);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

// House body
const houseGeometry = new THREE.BoxGeometry(4, 3, 3);
const houseMaterial = new THREE.MeshStandardMaterial({ color: 0xb5651d });
const house = new THREE.Mesh(houseGeometry, houseMaterial);
scene.add(house);

// Second floor
const secondFloor = new THREE.Mesh(
  new THREE.BoxGeometry(3.5, 2, 3),
  houseMaterial
);
secondFloor.position.y = 2.5;
scene.add(secondFloor);

// Garage
const garage = new THREE.Mesh(
  new THREE.BoxGeometry(2, 1.5, 2),
  new THREE.MeshStandardMaterial({ color: 0x888888 })
);
garage.position.set(-3, -0.75, 0);
scene.add(garage);

// Camera position
camera.position.set(6, 4, 6);
camera.lookAt(0, 1, 0);

// Render loop
function animate() {
  requestAnimationFrame(animate);
  house.rotation.y += 0.003;
  secondFloor.rotation.y += 0.003;
  renderer.render(scene, camera);
}
animate();
