import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TextureLoader, MeshMatcapMaterial } from 'three';
//Global variables
let currentRef = null;

//Scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, 100 / 100, 0.1, 100);
// Crea una nueva luz punto
const light = new THREE.PointLight(0xffffff, 1, 100);

// Establece la posición de la luz
light.position.set(50, 50, 50);

scene.add(light);
scene.add(camera);
camera.position.set(5, 5, 5);
camera.lookAt(new THREE.Vector3());

const renderer = new THREE.WebGLRenderer();
renderer.setSize(100, 100);

//OrbitControls
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
//target
/* orbitControls.target=new THREE.Vector3(3,3,3)
 *///Resize canvas
const resize = () => {
  renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
  camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
  camera.updateProjectionMatrix();
};
window.addEventListener("resize", resize);

//Animate the scene
const animate = () => {
  orbitControls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
animate();

//cube
const cube = new THREE.Mesh(
  new THREE.BoxBufferGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ 
    color: 0x00ff00,
    transparent: true,
    opacity: 0.3,
    wireframe: true,
     })
);
scene.add(cube);
const textureLoader = new TextureLoader();
const matcapTexture = textureLoader.load('./textures/texture2.png');

const geometry = new THREE.SphereGeometry( .7, 32, 16 );
const material = new MeshMatcapMaterial({ matcap: matcapTexture });
const sphere = new THREE.Mesh(geometry, material);

sphere.position.x = 2;
scene.add(sphere);
const torusknot = new THREE.TorusKnotGeometry( .3, .1, 100, 16 );
const torusknotmaterial = new THREE.MeshNormalMaterial({
  //fake light
  flatShading: true}
 );
const torusKnot = new THREE.Mesh( torusknot, torusknotmaterial );
torusKnot.position.x=-2
scene.add( torusKnot );

//Init and mount the scene
export const initScene = (mountRef) => {
  currentRef = mountRef.current;
  resize();
  currentRef.appendChild(renderer.domElement);
};

//Dismount and clena up the buffer from the scene
export const cleanUpScene = () => {
  scene.dispose();
  currentRef.removeChild(renderer.domElement);
};
