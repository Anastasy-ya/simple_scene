import * as THREE from 'three';

export function createObject({width, height, depth}) {

  const geometry = new THREE.BufferGeometry();
  //можно вернуть один объект, но возвращение 
  //массива упрощает дальнейшую разработку и добавление объектов в сцену
  const objects = [];

  //поскольку фигура располагается в начале координат, то размеры фигуры будут разделены координатами пополам
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const halfDepth = depth / 2;

  //массив координат
  const vertices = new Float32Array([
    -halfWidth, -halfHeight, halfDepth, //Вершина 0
    halfWidth, -halfHeight, halfDepth, //Вершина 1
    halfWidth, halfHeight, halfDepth, //Вершина 2
    -halfWidth, halfHeight, halfDepth, //Вершина 3
    -halfWidth, -halfHeight, -halfDepth, //Вершина 4
    halfWidth, -halfHeight, -halfDepth, //Вершина 5
    halfWidth, halfHeight, -halfDepth, //Вершина 6
    -halfWidth, halfHeight, -halfDepth  //Вершина 7
  ]);

  // задаю индексы вершин для оптимизации ресурсов 
  // чтобы не задавать все точки через vertices
  const indices = [
    // Передняя грань
    0, 1, 2, 2, 3, 0,
    // Задняя грань
    4, 5, 6, 6, 7, 4,
    // Верхняя грань
    3, 2, 6, 6, 7, 3,
    // Нижняя грань
    0, 1, 5, 5, 4, 0,
    // Левая грань
    0, 3, 7, 7, 4, 0,
    // Правая грань
    1, 2, 6, 6, 5, 1
  ];

  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(indices);

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x00ffff,
    metalness: 0,
    roughness: 0,
    transmission: 1.0, // прозрачность
    thickness: 5, // Толщина стекла
    // envMap: environmentTexture, // Текстура окружения для отражений
    envMapIntensity: 1.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  });
  
  const parallelepiped = new THREE.Mesh(geometry, glassMaterial);

  objects.push(parallelepiped);

  return objects;
}