import * as THREE from 'three';
import './App.css';
//TODO переделать в TS
import React, { useEffect, useState, useRef } from 'react';
import { Layout, Spin, Input, Button, Space, Switch, ConfigProvider } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import theme from "../Styles/Theme.js";
import { createObject } from '../Objects/Objects.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { handleResize } from '../Scene/HandleResize.js';
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js';
import background from '../Scene/brown_photostudio_04_4k.exr';
import ParametersForm from '../Form/Form.js'

const { Sider } = Layout;

const App = () => {
  // const [form] = Form.useForm();
  const [theme, setTheme] = useState('light');
  const [sceneReady, setSceneReady] = useState(false);
  const sceneParamsRef = useRef(null);
  const [parameters, setParameters] = useState({ width: 10, height: 15, depth: 20 });

  const changeTheme = (checked) => {
    setTheme(checked ? 'dark' : 'light');
  };

  const onSubmit = (e) => {
    console.log('submitted')
    // setHelperAdded(e.target.checked);
  };

  function deleteSceneObjects(scene) {
    for (let i = scene.children.length - 1; i >= 0; i--) {
      const obj = scene.children[i];

      if ((obj instanceof THREE.Mesh || obj instanceof THREE.Line || obj instanceof THREE.Group)) {
        scene.remove(obj);
      }
    }
  }

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
    // deleteSceneObjects(scene)//почему не обновить

    if (!scene) return // Ждём пока сцена инициализируется

    let createdObjects = [];

    createdObjects = createObject(parameters, scene)
    createdObjects.forEach(obj => {
      console.log(obj, 'объект добавлен')
      scene.add(obj)
    });

  }, [parameters, sceneParamsRef]);

  // Если сцена или текстура не загружены, показать спин
  if (!sceneReady || !sceneParamsRef.current) { // || !sceneParamsRef.current.scene.environment
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
        <Sider style={{ position: 'fixed', height: '100%' }}>
          <ParametersForm setParameters={setParameters}></ParametersForm>
          {/* <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onSubmit}
            autoComplete="off"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px',
            }}
          >
            <Space
              style={{ marginBottom: 16 }}>
              <span>Тема:</span>
              <Switch checked={theme === 'dark'} onChange={changeTheme} />
            </Space>
            <Form.Item
              label="Height"
              name="Height"
              rules={[{
                type: 'number',
                message: 'Введите только числа!',
              }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Width"
              name="Width"
              rules={[{
                type: 'number',
                message: 'Введите только числа!',
              }]}
            >
              <Input />
            </Form.Item>


            <Form.Item
              label="Length"
              name="Length"
              rules={[{
                type: 'number',
                message: 'Введите только числа!',
              }]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ width: '100%' }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
                block
              >

                Calculate
              </Button>
            </Form.Item>
          </Form> */}
        </Sider>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
