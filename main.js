import "./style.css";

import * as THREE from "three";
import { WebGLRenderer } from "three";
/*import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";*/
import {
  Lensflare,
  LensflareElement,
} from "three/examples/jsm/objects/Lensflare";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

const spaceTexture = new THREE.TextureLoader().load(
  "./images/background_space.jpg"
);
scene.background = spaceTexture;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

camera.position.setZ(20);

/**
 * Mars
 */
const marsTexture = new THREE.TextureLoader().load("./images/mars-texture.jpg");

const marsGeometry = new THREE.SphereGeometry(15, 64, 32);
const marsMaterial = new THREE.MeshStandardMaterial({
  map: marsTexture,
});

const mars = new THREE.Mesh(marsGeometry, marsMaterial);

mars.position.setX(15);
mars.position.setY(-3);

mars.rotation.z -= 0.1;

/**
 * Earth
 */
const earthTexture = new THREE.TextureLoader().load(
  "./images/earth-texture.jpg"
);

const earthGeometry = new THREE.SphereGeometry(2, 64, 32);
const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture,
});

const earth = new THREE.Mesh(earthGeometry, earthMaterial);

earth.position.set(-50, 0, -50);

/**
 * Venus
 */
const venusTexture = new THREE.TextureLoader().load(
  "./images/venus-texture.jpg"
);

const venusGeometry = new THREE.SphereGeometry(0.5, 64, 32);
const venusMaterial = new THREE.MeshStandardMaterial({
  map: venusTexture,
});

const venus = new THREE.Mesh(venusGeometry, venusMaterial);

venus.position.set(-90, 0, -60);

scene.add(mars, earth, venus);

/**
 * Sun
 */
const sunTexture = new THREE.TextureLoader().load("./images/sun-texture.jpg");

const sunGeometry = new THREE.SphereGeometry(0.3, 32, 16);
const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture,
});

const sun = new THREE.Mesh(sunGeometry, sunMaterial);

/**
 * Sun lensflare
 */
const flareTexture = new THREE.TextureLoader().load("./images/sun-flare.png");

const sunLensFlare = new Lensflare();

sunLensFlare.addElement(new LensflareElement(flareTexture, 50, -0.002));

sun.position.set(-100, 0, -50);

sun.castShadow = true;

scene.add(sun);

/**
 * Light
 */
const pointLight = new THREE.PointLight(0xffffff, 2);

pointLight.position.set(-100, 0, -50);
pointLight.castShadow = true;

pointLight.add(sunLensFlare);

scene.add(pointLight);

/**
 * Orbiting animation
 */
const animate = () => {
  requestAnimationFrame(animate);

  mars.rotation.y += 0.0004;
  earth.rotation.y += 0.0015;
  venus.rotation.y += 0.003;

  mars.position.z += 0.0012;
  mars.position.x -= 0.0006;
  mars.position.z -= 0.0006;

  earth.position.z += 0.0025;
  earth.position.x -= 0.0012;

  venus.position.z += 0.0012;
  venus.position.x -= 0.0006;

  renderer.render(scene, camera);
};

animate();
