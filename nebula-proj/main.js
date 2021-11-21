import './style.css'

import * as THREE from "three"

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.set(0, 2.5, 2.5);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

const pointLight = new THREE.PointLight("#c9c9c9s");
pointLight.position.set(20, 20, 20);

scene.add(pointLight, new THREE.AmbientLight("#eae6ff"));

let i = 0;
for (; i < 400; i++) {
  const geometry = new THREE.SphereGeometry(0.1, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: "white"})
  const star = new THREE.Mesh(geometry, material);

  star.position.set(...Array.from({ length: 3 }, () => THREE.MathUtils.randFloatSpread(200)));
  scene.add(star);
}

// Sun
const sunTexture = new THREE.TextureLoader().load("./images/sun.jpg")
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(109, 32, 32),
  new THREE.MeshStandardMaterial(
    { map: sunTexture }
  )
);

scene.add(sun);

// Moon
const moonTexture = new THREE.TextureLoader().load("./images/moon.jpg")
const normalTexture = new THREE.TextureLoader().load("/images/normal.jpg")
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.MeshStandardMaterial(
    {
      map: moonTexture,
      normalMap: normalTexture
    }
  )
);

scene.add(moon);

// Mercury
const mercuryTexture = new THREE.TextureLoader().load("./images/mercury.jpg")
const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(0.33, 32, 32),
  new THREE.MeshStandardMaterial(
    {
      map: mercuryTexture
    }
  )
);

scene.add(mercury);

// Venus
const venusTexture = new THREE.TextureLoader().load("./images/venus.jpg")
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial(
    {
      map: venusTexture
    }
  )
);

scene.add(venus);

// Earth
const earthTexture = new THREE.TextureLoader().load("./images/earth.jpg")
const earthNormal = new THREE.TextureLoader().load("./images/8k_earth_normal_map.tif")
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(0.8, 32, 32),
  new THREE.MeshStandardMaterial(
    {
      map: earthTexture,
      normalMap: earthNormal
    }
  )
);

scene.add(earth);

// Mars
const marsTexture = new THREE.TextureLoader().load("./images/mars.jpg")
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial(
    {
      map: marsTexture
    }
  )
);

scene.add(mars);

// Jupiter
const jupiterTexture = new THREE.TextureLoader().load("./images/jupiter.jpg")
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(11, 32, 32),
  new THREE.MeshStandardMaterial(
    {
      map: jupiterTexture
    }
  )
);

scene.add(jupiter);

// saturn
const saturnTexture = new THREE.TextureLoader().load("./images/saturn.jpg")
const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(9, 32, 32),
  new THREE.MeshStandardMaterial(
    {
      map: saturnTexture
    }
  )
);

scene.add(saturn);

// saturn ring
const ringTexture = new THREE.TextureLoader().load("./images/saturnRings.png");
const ring = new THREE.RingGeometry(4.5, 15, 64);
const pos = ring.attributes.position;
const v3 = new THREE.Vector3();

for (i = 0; i < pos.count; i++){
  v3.fromBufferAttribute(pos, i);
  ring.attributes.uv.setXY(i, Number(v3.length() > 3), 1);
}

const material = new THREE.MeshBasicMaterial({
  map: ringTexture,
  color: 0xffffff,
  side: THREE.DoubleSide,
  transparent: true
});

const saturnRing = new THREE.Mesh(ring, material);
scene.add(saturnRing);

// uranus
const uranusTexture = new THREE.TextureLoader().load("./images/uranus.jpg")
const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshStandardMaterial(
    {
      map: uranusTexture
    }
  )
);

scene.add(uranus);

// neptune
const neptuneTexture = new THREE.TextureLoader().load("./images/nepture.jpg")
const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshStandardMaterial(
    {
      map: neptuneTexture
    }
  )
);

scene.add(neptune);

// 3d mouse
document.addEventListener('mousedown', event => {
  event.preventDefault();
  const mouse3D = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerheight) * 2 - 1, 0.5);
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse3D, camera);
  const intersects = raycaster.intersectObjects([ mercury, venus, earth, mars, jupiter, saturn, uranus, neptune ]);
  
  if (intersects.length) {
    intersects[0].object.material.setSize(Math.random() * 10);
  }
});

sun.position.z = -270;
sun.position.x = 0;
sun.position.y = 0;

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

mars.position.z = 8;
mars.position.x = 3;
mars.position.y = 0;

jupiter.position.z = 0;
jupiter.position.x = -20;
jupiter.position.y = 0;

saturn.position.z = 30;
saturn.position.x = -30;
saturn.position.y = 5;
saturnRing.position.z = 30;
saturnRing.position.y = 5;
saturnRing.position.x = -30;

uranus.position.z = 45;
uranus.position.x = -10;
uranus.position.y = 5;

neptune.position.z = 40;
neptune.position.x = -2;
neptune.position.y = -4;

saturnRing.rotateX(65);

camera.position.x = -5;
camera.position.y = 0;
camera.position.z = 0;
// camera.position.set(1.5, 1.3, 1.5)
// Scroll Animation

document.body.onscroll = () => {
  const { top } = document.body.getBoundingClientRect();

  mercury.rotation.y -= 0.1;
  venus.rotation.y -= 0.1;
  earth.rotation.y -= 0.1;
  moon.rotation.y -= 0.1;
  mars.rotation.y -= 0.01;
  jupiter.rotation.y -= 0.1;
  saturn.rotation.y -= 0.1;
  uranus.rotation.y -= 0.1;
  neptune.rotation.y -= 0.1;
  
  // camera.position.z = t * 2;
  // camera.position.x = t * 2;
  // camera.rotation.y = t * 2;
  
  camera.position.z = top * -0.01;
  camera.position.x = top * -0.0002;
  camera.rotation.y = top * -0.0002;
  // console.log(camera.position)
};

document.body.onscroll();

function animate() {
  requestAnimationFrame(animate);

  mercury.rotation.y += 0.005;
  venus.rotation.y += 0.0045;
  earth.rotation.y += 0.003;
  moon.rotation.x += 0.001;
  mars.rotation.y += 0.0025;
  jupiter.rotation.y += 0.002;
  saturn.rotation.y += 0.0015;
  uranus.rotation.z -= 0.01;
  neptune.rotation.y += 0.01;


  renderer.render(scene, camera);
}

animate()
