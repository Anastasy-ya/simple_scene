import * as THREE from 'three';
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js';
import background from '../Scene/crystal_falls_4k.exr';

export function initScene() {
  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 20000);
  camera.lookAt(0, 0, 0);
  camera.position.set(50, 10, 50);

  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xff0000, 1, 100);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  const spotLight = new THREE.SpotLight(0x00ff00, 1);
  spotLight.position.set(0, 10, 0);
  spotLight.angle = Math.PI / 4;
  scene.add(spotLight);

  const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(hemisphereLight);

  // scene.background = scene.background = new THREE.Color(0xD3D3D3);
  const loader = new EXRLoader();
  loader.load(background, (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;

    // Генерация окружения с использованием PMREMGenerator
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const exrCubeRenderTarget = pmremGenerator.fromEquirectangular(texture);
    pmremGenerator.dispose();

    // Применяем окружение и фон
    scene.background = exrCubeRenderTarget.texture;
    scene.environment = exrCubeRenderTarget.texture; // Используется для отражения в объектах
  });

  return { scene, camera, renderer };
}
