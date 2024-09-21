import * as THREE from 'three';
import { indices, normals, uvArray } from '../Constants'

export function createObject({ width, height, depth }, scene) {
  const environmentTexture = scene.environment;

  const exisitingCube = scene.getObjectByName('Box') ? scene.getObjectByName('Box') : null;
  console.log(exisitingCube, 'exisitingCube')
  const сubeGeometry = exisitingCube ? exisitingCube.geometry : new THREE.BufferGeometry();;

  const objects = [];

  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const halfDepth = depth / 2;

  // Массив вершин
  const vertices = new Float32Array([
    halfWidth, halfHeight, halfDepth,
    halfWidth, halfHeight, -halfDepth,
    halfWidth, -halfHeight, halfDepth,
    halfWidth, -halfHeight, -halfDepth,
    -halfWidth, halfHeight, -halfDepth,
    -halfWidth, halfHeight, halfDepth,
    -halfWidth, -halfHeight, -halfDepth,
    -halfWidth, -halfHeight, halfDepth,
    -halfWidth, halfHeight, -halfDepth,
    halfWidth, halfHeight, -halfDepth,
    -halfWidth, halfHeight, halfDepth,
    halfWidth, halfHeight, halfDepth,
    -halfWidth, -halfHeight, halfDepth,
    halfWidth, -halfHeight, halfDepth,
    -halfWidth, -halfHeight, -halfDepth,
    halfWidth, -halfHeight, -halfDepth,
    -halfWidth, halfHeight, halfDepth,
    halfWidth, halfHeight, halfDepth,
    -halfWidth, -halfHeight, halfDepth,
    halfWidth, -halfHeight, halfDepth,
    halfWidth, halfHeight, -halfDepth,
    -halfWidth, halfHeight, -halfDepth,
    halfWidth, -halfHeight, -halfDepth,
    -halfWidth, -halfHeight, -halfDepth,
  ]);

  //vertices обновляется всегда (надо ли обновлять что-то еще?)
  сubeGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  сubeGeometry.attributes.position.needsUpdate = true;

  // if (!exisitingCube) {//если куб создается заново
  //   сubeGeometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvArray, 2));
  //   сubeGeometry.setIndex(indices);
  //   сubeGeometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  // }
  // else {
  //   сubeGeometry.vertices.forEach(vertex => {})
  // }

  const material = new THREE.MeshPhysicalMaterial({
    color: 0xff7518,
    opacity: 0.5,
    transmission: 0.5,
    ior: 1.5,
    roughness: 0.2,
    metalness: 0.0,
    clearcoat: 0.0,
    clearcoatRoughness: 0.2,
    envMap: environmentTexture,
    envMapIntensity: 1.0,
    side: THREE.DoubleSide,
  });

  console.log(exisitingCube, 'exisitingCube')

  if (!exisitingCube) {
    // Если объекта нет, создаем новый
    сubeGeometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvArray, 2));
    сubeGeometry.setIndex(indices);
    сubeGeometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    const parallelepiped = new THREE.Mesh(сubeGeometry, material);
    parallelepiped.name = 'Box';
    objects.push(parallelepiped); // Добавляем новый объект в сцену
  }

  return objects;
}
