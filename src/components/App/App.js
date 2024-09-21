import * as THREE from 'three';
import './App.css';
//TODO переделать в TS проверка на отриц
import React, { useEffect, useState, useRef } from 'react';
import { Layout, Spin, ConfigProvider } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { createOrUpdateObject } from '../Objects/Objects.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { handleResize } from '../Scene/HandleResize.js';
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js';
import background from '../Scene/brown_photostudio_04_4k.exr';
import ParametersForm from '../Form/Form.js'


const { Sider } = Layout;

const App = () => {
  const [theme, setTheme] = useState('light');
  const [sceneReady, setSceneReady] = useState(false);
  const sceneParamsRef = useRef(null);
  const [parameters, setParameters] = useState({ width: 10, height: 15, depth: 20 });

  // инициализация сцены
  useEffect(() => {
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);
    camera.lookAt(0, 0, 0);
    camera.position.set(30, 10, 30);

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

    const controls = new OrbitControls(camera, renderer.domElement);

    sceneParamsRef.current = { scene, camera, renderer, controls };

    const animate = () => {
      requestAnimationFrame(animate);

      controls.update();
      renderer.render(scene, camera);
      setSceneReady(true);
    };

    animate();

    window.addEventListener('resize', () => handleResize(sceneParamsRef));
    handleResize(sceneParamsRef);

    return () => {
      document.body.removeChild(renderer.domElement);
      window.removeEventListener('resize', () => handleResize(sceneParamsRef));
    };
  }, []);

  // создание и удаление мешей
  useEffect(() => {
    const { scene } = sceneParamsRef.current || {};

    if (!scene) return // Ждём пока сцена инициализируется

    let createdObjects = [];

    createdObjects = createOrUpdateObject(parameters, scene)
    createdObjects.forEach(obj => {
      scene.add(obj)
    });

  }, [parameters, sceneParamsRef]);

  // Если сцена не загруженa, показать спин
  if (!sceneReady || !sceneParamsRef.current.scene) {
    return <Spin
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed'
      }}
      indicator={
        <LoadingOutlined
          style={{
            fontSize: 48,
          }}
          spin
        />
      }
    />;
  }

  return (
    <ConfigProvider theme={theme}>
      <Layout style={{ height: '100vh', position: 'fixed' }}>
        <Sider 
          theme={theme} 
          style={{ position: 'fixed', height: '100%' }}
        >
          <ParametersForm 
            setParameters={setParameters}
            setTheme={setTheme}
            theme={theme}
            initialValues={parameters}
          >
          </ParametersForm>
        </Sider>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
