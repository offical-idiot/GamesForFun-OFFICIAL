import * as THREE from 'https://cdn.skypack.dev/three@0.158.0';
import { PointerLockControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/PointerLockControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

// Ground
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshStandardMaterial({ color: 0x007700 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Player controls
const controls = new PointerLockControls(camera, document.body);
camera.position.y = 1.6;

const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", () => {
  controls.lock();
  startBtn.style.display = "none";
});

let keys = {};
document.addEventListener('keydown', (e) => keys[e.key.toLowerCase()] = true);
document.addEventListener('keyup', (e) => keys[e.key.toLowerCase()] = false);

function animate() {
  requestAnimationFrame(animate);

  let speed = 0.1;
  if (keys['w']) controls.moveForward(speed);
  if (keys['s']) controls.moveForward(-speed);
  if (keys['a']) controls.moveRight(-speed);
  if (keys['d']) controls.moveRight(speed);

  renderer.render(scene, camera);
}
animate();
