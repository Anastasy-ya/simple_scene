import * as THREE from 'three';
import './App.css';
//TODO переделать в TS
import React, { useEffect, useState, useRef } from 'react';
import { Layout, Spin, Form, Input, Button, Space, Switch, ConfigProvider } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { initScene } from '../Scene/Scene';
import theme from "../Styles/Theme.js";
import {
  createObject,
} from '../Objects/Objects.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { handleResize } from '../Scene/HandleResize.js';

const { Sider } = Layout;

const App = () => {
  const [form] = Form.useForm();
  const [theme, setTheme] = useState('light');
  const [sceneReady, setSceneReady] = useState(false);
  const sceneParamsRef = useRef(null);
  const [parameters, setParameters] = useState({width: 10, height: 10, depth: 10});

  const changeTheme = (checked) => {
    setTheme(checked ? 'dark' : 'light');
  };

  const onSubmit = (e) => {
    console.log('submitted')
    // setHelperAdded(e.target.checked);
  };

  // инициализация сцены
  useEffect(() => {
    const { scene, camera, renderer } = initScene();
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

  // создание и управление мешем
  useEffect(() => {

    const { scene } = sceneParamsRef.current || {};
    if (!scene) return; // Ждём пока сцена инициализируется

    let createdObjects = []

    createdObjects = createObject(parameters);

    createdObjects.forEach(obj => {
      console.log(obj, 'obj')
      scene.add(obj)
    });

  }, [parameters]);

  // Если сцена не загружена, показать спин
  if (!sceneReady) {
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
        <Form
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
              style={{ width: '100%'}}
              block
              >

              Calculate
            </Button>
          </Form.Item>
        </Form>
      </Sider>
    </Layout>
    </ConfigProvider>
  );
};

export default App;
