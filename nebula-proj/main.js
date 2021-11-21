import './style.css'

import * as THREE from "three"
import { Color } from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const fov = 60;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 200;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
const canvas= document.querySelector("#bg")

camera.position.z = 30;
 
 
// put the camera on a pole (parent it to an object)
// so we can spin the pole to move the camera around the scene
const cameraPole = new THREE.Object3D();
scene.add(cameraPole);
cameraPole.add(camera);

const color = 0xFFFFFF;
const intensity = 0.3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

// const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

camera.position.set(0,2.5,2.5);
const renderer = new THREE.WebGLRenderer({
  canvas
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight)
 




// const pointLight = new THREE.PointLight("#c9c9c9s");
// pointLight.position.set(20,20,20);

const ambientLight = new THREE.AmbientLight("#eae6ff")
// scene.add(pointLight, ambientLight);
scene.add(ambientLight)


function addStar(){
  const geometry = new THREE.SphereGeometry(0.1, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: "white"})
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map( ()=>THREE.MathUtils.randFloatSpread(200) )
  star.position.set(x, y, z);
  scene.add(star);
}

Array(400).fill().forEach(addStar)

// Sun
const sunTexture = new THREE.TextureLoader().load("./images/sun.jpg")
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(109, 32, 32),
  new THREE.MeshStandardMaterial(
    {map: sunTexture}
  )
)
scene.add(sun)


// Moon
const moonjpg = new URL('./moon.png', import.meta.url).href
const moonTexture = new THREE.TextureLoader().load("./images/moon.jpg")
const normalTexture = new THREE.TextureLoader().load("/images/normal.jpg")
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.MeshStandardMaterial(
    {map: moonTexture,
    normalMap: normalTexture}
  )
)
scene.add(moon)

// Mercury
const mercuryTexture = new THREE.TextureLoader().load("./images/mercury.jpg")
const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(0.33, 32, 32),
  new THREE.MeshStandardMaterial(
    {map: mercuryTexture}
  )
)
scene.add(mercury)

// Venus
const venusTexture = new THREE.TextureLoader().load("./images/venus.jpg")
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial(
    {map: venusTexture}
  )
)
scene.add(venus)


// Earth
const earthTexture = new THREE.TextureLoader().load("./images/earth.jpg")
const earthNormal = new THREE.TextureLoader().load("./images/8k_earth_normal_map.tif")
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(0.8, 32, 32),
  new THREE.MeshStandardMaterial(
    {map: earthTexture,
    normalMap: earthNormal}
  )
)
scene.add(earth)

// Mars
const marsTexture = new THREE.TextureLoader().load("./images/mars.jpg")
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial(
    {map: marsTexture}
  )
)
scene.add(mars)

// Jupiter
const jupiterTexture = new THREE.TextureLoader().load("./images/jupiter.jpg")
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(11, 32, 32),
  new THREE.MeshStandardMaterial(
    {map: jupiterTexture}
  )
)
scene.add(jupiter)

// saturn
const saturnTexture = new THREE.TextureLoader().load("./images/saturn.jpg")
const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(9, 32, 32),
  new THREE.MeshStandardMaterial(
    {map: saturnTexture}
  )
)
scene.add(saturn)

// saturn ring
const ringTexture = new THREE.TextureLoader().load("./images/saturnRings.png")
const ring = new THREE.RingGeometry(2.5, 20, 64);
var pos = ring.attributes.position;
var v3 = new THREE.Vector3();
for (let i = 0; i < pos.count; i++){
    v3.fromBufferAttribute(pos, i);
    ring.attributes.uv.setXY(i, v3.length() < 4 ? 0 : 1, 1);
}
const material = new THREE.MeshBasicMaterial({
  map: ringTexture,
  color: 0xffffff,
  side: THREE.DoubleSide,
  transparent: true
});
const saturnRing = new THREE.Mesh(ring, material);
scene.add(saturnRing)

// uranus
const uranusTexture = new THREE.TextureLoader().load("./images/uranus.jpg")
const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshStandardMaterial(
    {map: uranusTexture}
  )
)
scene.add(uranus)

// neptune
const neptuneTexture = new THREE.TextureLoader().load("./images/nepture.jpg")
const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshStandardMaterial(
    {map: neptuneTexture}
  )
)
scene.add(neptune)







 class PickHelper {
  constructor() {
    this.raycaster = new THREE.Raycaster();
    this.pickedObject = null;
    this.pickedObjectSavedSize = 10;
  }
  pick(normalizedPosition, scene, camera, time) {
    // restore the color if there is a picked object
    if (this.pickedObject) {
      this.pickedObject.material.emissive.setSize(this.pickedObjectSavedSize);
      this.pickedObject = undefined;
    }
 
    // cast a ray through the frustum
    this.raycaster.setFromCamera(normalizedPosition, camera);
    // get the list of objects the ray intersected
    const intersectedObjects = this.raycaster.intersectObjects(scene.children);
    if (intersectedObjects.length) {
      // pick the first object. It's the closest one
      this.pickedObject = intersectedObjects[0].object;
      // save its color
      this.pickedObjectSavedColor = this.pickedObject.material.emissive.getHex();
      // set its emissive color to flashing red/yellow
      this.pickedObject.material.emissive.setHex((time * 8) % 2 > 1 ? 0xFFFF00 : 0xFF0000);
    }
  }
}

const pickPosition = {x: 0, y: 0};
const pickHelper = new PickHelper();
clearPickPosition();
 
 
function render(time) {
  time *= 0.001;

  cubes.forEach((cube, ndx) => {
    const speed = 1 + ndx * .1;
    const rot = time * speed;
    cube.rotation.x = rot;
    cube.rotation.y = rot;
  });

 
  pickHelper.pick(pickPosition, scene, camera, time);
 
  renderer.render(scene, camera);

  requestAnimationFrame(render);
}

function getCanvasRelativePosition(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * canvas.width  / rect.width,
    y: (event.clientY - rect.top ) * canvas.height / rect.height,
  };
}
 
function setPickPosition(event) {
  const pos = getCanvasRelativePosition(event);
  pickPosition.x = (pos.x / canvas.width ) *  2 - 1;
  pickPosition.y = (pos.y / canvas.height) * -2 + 1;  // note we flip Y
}
 
function clearPickPosition() {
  // unlike the mouse which always has a position
  // if the user stops touching the screen we want
  // to stop picking. For now we just pick a value
  // unlikely to pick something
  pickPosition.x = -100000;
  pickPosition.y = -100000;
}
 
window.addEventListener('mousemove', setPickPosition);
window.addEventListener('mouseout', clearPickPosition);
window.addEventListener('mouseleave', clearPickPosition);

// mobile support
window.addEventListener('touchstart', (event) => {
  // prevent the window from scrolling
  event.preventDefault();
  setPickPosition(event.touches[0]);
}, {passive: false});
 
window.addEventListener('touchmove', (event) => {
  setPickPosition(event.touches[0]);
});
 
window.addEventListener('touchend', clearPickPosition);

 





sun.position.z=-270;
sun.position.x=0;
sun.position.y=0;

mercury.position.z = -3;
mercury.position.x = -1;
mercury.position.y = -1;

venus.position.z = 2
venus.position.x = 1;
venus.position.y = 0;

// earth.position.y = 20;
earth.position.z = 5;
earth.position.x = -3;

moon.position.z = 5;
moon.position.x = -2;
moon.position.y = 2;

mars.position.z =8;
mars.position.x =3;
mars.position.y = 0;

jupiter.position.z = 0;
jupiter.position.x = -20;
jupiter.position.y = 0;

saturn.position.z = 30;
saturn.position.x = -30;
saturn.position.y = 5;
saturnRing.position.z= 30;
saturnRing.position.y = 5;
saturnRing.position.x= -30;

uranus.position.z = 45;
uranus.position.x = -10;
uranus.position.y = 5;

neptune.position.z = 40;
neptune.position.x = -2;
neptune.position.y = -4;

saturnRing.rotateX(65)

camera.position.x = -5;
camera.position.y = 0;
camera.position.z = 0;
// camera.position.set(1.5, 1.3, 1.5)
// Scroll Animation


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
 
  mercury.rotation.y-=0.1;
  venus.rotation.y-=0.1;
  earth.rotation.y-=0.1;
  moon.rotation.y -= 0.1;
  mars.rotation.y-=0.01;
  jupiter.rotation.y-=0.1;
  saturn.rotation.y-=0.1;
  uranus.rotation.y-=0.1;
  neptune.rotation.y-=0.1;

  
  // camera.position.z = t * 2;
  // camera.position.x = t * 2;
  // camera.rotation.y = t * 2;
  
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
  // console.log(camera.position)
}
document.body.onscroll = moveCamera;
moveCamera();



function animate(){
  requestAnimationFrame(animate);

  sun.rotation.y += 0.0005;
  mercury.rotation.y += 0.005;
  venus.rotation.y+=0.0045;
  earth.rotation.y+=0.003;
  moon.rotation.x+=0.001;
  mars.rotation.y+=0.0025;
  jupiter.rotation.y+=0.002;
  saturn.rotation.y+=0.0015;
  uranus.rotation.z-=0.01;
  neptune.rotation.y+=0.01;


  renderer.render(scene, camera);
}

animate()
