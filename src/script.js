import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// // Fog
const fog = new THREE.Fog("#262837", 1, 14);
scene.fog = fog;

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbienOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
doorColorTexture.colorSpace = THREE.SRGBColorSpace;

const bricksColorTexture = textureLoader.load("/textures/bricks/color.png");
bricksColorTexture.colorSpace = THREE.SRGBColorSpace;

bricksColorTexture.repeat.set(4, 4);

bricksColorTexture.wrapS = THREE.RepeatWrapping;
bricksColorTexture.wrapT = THREE.RepeatWrapping;

const grassColorTexture = textureLoader.load("/textures/grass/color.jpg");
grassColorTexture.colorSpace = THREE.SRGBColorSpace;
const grassAmbientOcclusionTexture = textureLoader.load(
  "/textures/grass/ambientOcclusion.jpg"
);
const grassNormalTexture = textureLoader.load("/textures/grass/normal.jpg");
const grassRoughnessTexture = textureLoader.load(
  "/textures/grass/roughness.jpg"
);

grassColorTexture.repeat.set(8, 8);
grassAmbientOcclusionTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);

grassColorTexture.wrapS = THREE.RepeatWrapping;
grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

// const starTexture = textureLoader.load("/textures/particles/4.png");

// // Stars
// const starGeometry = new THREE.BufferGeometry();
// const count = 500;
// const positions = new Float32Array(count * 3);

// for (let i = 0; i < count * 3; i++) {
//   positions[i] = (Math.random() - 0.5) * 75;
// }

// starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

// // Stars Material
// const starMaterial = new THREE.PointsMaterial({
//   size: 0.02,
//   sizeAttenuation: true,
//   transparent: true,
//   alphaMap: starTexture,
//   depthWrite: false,
//   blending: THREE.AdditiveBlending,
// });

// // Stars Points
// const stars = new THREE.Points(starGeometry, starMaterial);
// scene.add(stars);

/**
 * House
 */
// Group
const house = new THREE.Group();
scene.add(house);

// Turret
const turret1 = new THREE.Mesh(
  new THREE.CylinderGeometry(1.7, 2, 3, 8),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    transparent: true,
  })
);
turret1.position.y = 1.5;
turret1.position.x = 1;

const turret1Material = turret1.material;
turret1Material.color.set("#9C8D8D");

const turret2 = new THREE.Mesh(
  new THREE.CylinderGeometry(1.15, 1.75, 7, 8),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    transparent: true,
  })
);

turret2.position.y = 3;
turret2.position.x = 1.75;
turret2.position.z = -5.5;

const turret2Material = turret2.material;
turret2Material.color.set("#9C8D8D");

const turret3 = new THREE.Mesh(
  new THREE.CylinderGeometry(1.15, 1.75, 7, 8),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    transparent: true,
  })
);

turret3.position.y = 3;
turret3.position.x = -3.25;
turret3.position.z = -5.5;

const turret3Material = turret3.material;
turret3Material.color.set("#9C8D8D");

const turret4 = new THREE.Mesh(
  new THREE.CylinderGeometry(1.15, 1.75, 7, 8),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    transparent: true,
  })
);

turret4.position.y = 3;
turret4.position.x = -3.25;

const turret4Material = turret4.material;
turret4Material.color.set("#9C8D8D");
house.add(turret1, turret2, turret3, turret4);

// Walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(6, 4, 4, 8),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    transparent: true,
  })
);
walls.position.y = 2;
walls.rotation.y = Math.PI * 0.45;
walls.position.x = -1;
walls.position.z = -2.5;

const wallsMaterial = walls.material;
wallsMaterial.color.set("#9C8D8D");
house.add(walls);

// Roof
const roof1 = new THREE.Mesh(
  new THREE.ConeGeometry(1.9, 4, 20),
  new THREE.MeshStandardMaterial({ map: bricksColorTexture })
);
roof1.position.y = 5;
roof1.position.x = 1;
roof1.rotation.y = Math.PI * 0.25;
const roof1Material = roof1.material;
roof1Material.color.set("#4f3b3b");
house.add(roof1);

// const roof2 = new THREE.Mesh(
//   new THREE.ConeGeometry(1.2, 3, 15),
//   new THREE.MeshStandardMaterial({ map: bricksColorTexture })
// );
// roof2.position.y = 5;
// roof2.position.x = -3.25;
// roof2.rotation.y = Math.PI * 0.25;
// const roof2Material = roof2.material;
// roof2Material.color.set("#4f3b3b");

// const roof3 = new THREE.Mesh(
//   new THREE.ConeGeometry(2.25, 6, 20),
//   new THREE.MeshStandardMaterial({ map: bricksColorTexture })
// );
// roof3.position.y = 7;
// roof3.position.x = -3.25;
// roof3.position.z = -5.5;
// roof3.rotation.y = Math.PI * 0.25;
// const roof3Material = roof3.material;
// roof3Material.color.set("#4f3b3b");

// const roof4 = new THREE.Mesh(
//   new THREE.ConeGeometry(2.25, 6, 20),
//   new THREE.MeshStandardMaterial({ map: bricksColorTexture })
// );
// roof4.position.y = 7;
// roof4.position.x = 1.75;
// roof4.position.z = -5.5;
// roof4.rotation.y = Math.PI * 0.25;
// const roof4Material = roof4.material;
// roof4Material.color.set("#4f3b3b");
// house.add(roof1, roof2, roof3, roof4);

// Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbienOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  })
);
door.position.y = 1;
door.position.x = 1.65;
door.rotation.y = 0.45;
door.position.z = 1.73;

const doorMaterial = door.material;
doorMaterial.color.set("#545151");
house.add(door);

// Ghosts
const ghost1 = new THREE.PointLight("#ff00ff", 6, 3);
const ghost2 = new THREE.PointLight("#00ffff", 6, 3);
const ghost3 = new THREE.PointLight("#ffff00", 6, 3);
scene.add(ghost1, ghost2, ghost3);

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 30, 30),

  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture,
  })
);
floor.rotation.x = -Math.PI * 0.5;
floor.rotation.z = Math.PI * 0.12;

floor.position.y = 0;
scene.add(floor);

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: "#436F3A" });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.7, 0.5);
bush1.position.set(2.7, 0.2, 1.9);
const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 1.6);
const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.8, 0.4);
bush3.position.set(0.1, 0.1, 2.2);
const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-0.5, 0.05, 2);
house.add(bush1, bush2, bush3, bush4);

// Graves
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });

for (let i = 0; i < 30; i++) {
  const angle = Math.random() * Math.PI * 3;
  const radius = 2.75 + Math.random() * 8;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.set(x, 0.3, z);
  grave.rotation.z = (Math.random() - 0.5) * 0.4;
  grave.rotation.y = (Math.random() - 0.5) * 0.7;
  grave.castShadow = true;
  graves.add(grave);
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.5);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#ffffff", 0.26);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

// Door light
const doorLight = new THREE.PointLight("#ff7d46", 3, 7);
doorLight.position.set(2, 2.2, 2.7);
house.add(doorLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 5;
camera.position.z = 12;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#262837");

// Shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

moonLight.castShadow = true;
doorLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;

floor.receiveShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;

doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update ghosts
  const ghost1Angle = elapsedTime * 0.5;
  ghost1.position.x = Math.cos(ghost1Angle) * 4;
  ghost1.position.z = Math.sin(ghost1Angle) * 4;
  ghost1.position.y = Math.sin(elapsedTime * 3);

  const ghost2Angle = -elapsedTime * 0.32;
  ghost2.position.x = Math.cos(ghost2Angle) * 5;
  ghost2.position.z = Math.sin(ghost2Angle) * 5;
  ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  const ghost3angle = -elapsedTime * 0.18;
  ghost3.position.x =
    Math.cos(ghost3angle) * (7 + Math.sin(elapsedTime * 0.32));
  ghost3.position.z = Math.sin(ghost3angle) * (7 + Math.sin(elapsedTime * 0.5));
  ghost3.position.y = Math.sin(elapsedTime * 4) * Math.sin(elapsedTime * 2.5);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
