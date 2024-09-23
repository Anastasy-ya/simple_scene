import * as THREE from "three";
import { indices, normals, uvArray } from "../Constants"

export function createOrUpdateObject({ width, height, depth }, scene, theme) {
  const environmentTexture = scene.environment;

  const exisitingCube = scene.getObjectByName("Box") ? scene.getObjectByName("Box") : null;
  const сubeGeometry = exisitingCube ? exisitingCube.geometry : new THREE.BufferGeometry();;

  const objects = [];

  //фигура находится в начале координат, 
  // соответственно значением точек по осям координат будет размер, разделенный на 2
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

  const material = new THREE.MeshPhysicalMaterial({
    color: theme === "light" ? 0xff7518 : 0x40E0D0,
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

  //vertices обновляются всегда независимо от того создается объект или модицицируется
  сubeGeometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  сubeGeometry.attributes.position.needsUpdate = true;


  if (!exisitingCube) {
    // Если объекта нет, создаем новый
    сubeGeometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvArray, 2));
    сubeGeometry.setIndex(indices);
    сubeGeometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
    const parallelepiped = new THREE.Mesh(сubeGeometry, material);
    parallelepiped.name = "Box";
    objects.push(parallelepiped);
  } else {
    exisitingCube.material.color.setHex(theme === "light" ? 0xff7518 : 0x40E0D0);
    exisitingCube.material.needsUpdate = true;
  }

  return objects;
}
