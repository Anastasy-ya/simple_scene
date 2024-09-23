import * as THREE from "three";
import { indices, normals, uvArray } from "../Constants";

interface Parameters {
  width: number;
  height: number;
  depth: number;
}

export function createOrUpdateObject(
  { width, height, depth }: Parameters,
  scene: THREE.Scene,
  theme: string
): THREE.Object3D[] { 
  const environmentTexture = scene.environment;

  const exisitingCube = scene.getObjectByName("Box") as THREE.Mesh | null;
  const сubeGeometry = exisitingCube?.geometry || new THREE.BufferGeometry();

  const objects = [];
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const halfDepth = depth / 2;

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

  сubeGeometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  сubeGeometry.attributes.position.needsUpdate = true;

  if (!exisitingCube) {
    сubeGeometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvArray, 2));
    сubeGeometry.setIndex(indices);
    сubeGeometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
    const parallelepiped = new THREE.Mesh(сubeGeometry, material);
    parallelepiped.name = "Box";
    objects.push(parallelepiped);
  } else {
    // Проверяем, что exisitingCube.material — это массив или один объект
    const cubeMaterial = Array.isArray(exisitingCube.material) 
      ? exisitingCube.material[0] 
      : exisitingCube.material;

    if (cubeMaterial instanceof THREE.MeshPhysicalMaterial) {
      cubeMaterial.color.setHex(theme === "light" ? 0xff7518 : 0x40E0D0);
      cubeMaterial.needsUpdate = true;
    }
  }

  return objects;
}
