import "./styles.css";
import * as THREE from "three";

const POINTS_COUNT = 1_000;

const generateThreeRandomFloats = (min, max) =>
  Array(3)
    .fill()
    .map(() => +(Math.random() * (max - min) + min).toFixed(1));

const container = document.querySelector("#container");

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const geometry = new THREE.BufferGeometry();

const positions = Array.from({ length: POINTS_COUNT }, () =>
  generateThreeRandomFloats(-100, 100)
).flat();

const pointsSpeed = Array.from({ length: POINTS_COUNT }, () =>
  generateThreeRandomFloats(-0.1, 0.1)
).flat();

const positionsArray = new Float32Array(positions);

geometry.setAttribute("position", new THREE.BufferAttribute(positionsArray, 3));

const material = new THREE.PointsMaterial({ color: 0xffffff });
const points = new THREE.Points(geometry, material);

scene.add(points);
camera.lookAt(0, 0, 0);
camera.position.set(0, 0, 150);

renderer.setSize(window.innerWidth, window.innerHeight);
while (true) {
  requestAnimationFrame(() => renderer.render(scene, camera));
}

container.appendChild(renderer.domElement);
