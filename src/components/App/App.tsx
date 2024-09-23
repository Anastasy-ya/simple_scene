import "./App.css";
import { LoadingOutlined } from "@ant-design/icons";
import {ConfigProvider, Layout, Spin, theme as antdTheme} from "antd";
import React, {useEffect, useRef, useState} from "react";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {EXRLoader} from "three/examples/jsm/loaders/EXRLoader";
import ParametersForm from "../Form/Form";
import {createOrUpdateObject} from "../Objects/Objects";
import background from "../Scene/brown_photostudio_04_4k.exr";
import {handleResize} from "../Scene/HandleResize";
import {getParameters, getTheme} from "../Services/Api";

const {Sider} = Layout;

interface Parameters {
  width: number;
  height: number;
  depth: number;
}

const App: React.FC = () => {

  const [theme, setTheme] = useState<string>("");
  const [parameters, setParameters] = useState<Parameters>({ width: 10, height: 15, depth: 20 });
  const [dataReceived, setDataReceived] = useState<boolean>(false);
  const [sceneReady, setSceneReady] = useState<boolean>(false);
  const sceneParamsRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
  } | null>(null);

  const themeConfig = theme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm;

  // Получение данных с сервера
  useEffect(() => {
    async function fetchData() {
      try {
        const [parameters, themeData] = await Promise.all([getParameters(), getTheme()]);

        console.log([parameters, themeData], "[parameters, theme]");
        // Сохранение параметров и темы в состояние и локальное хранилище
        setParameters(parameters);
        localStorage.setItem("parameters", JSON.stringify(parameters));
        
        setTheme(themeData.theme);
        localStorage.setItem("theme", JSON.stringify(theme));
        setDataReceived(true);
      } catch (error) {
        console.error("Ошибка при выполнении запросов:", error);
      }
    }
  
    fetchData();
  }, [theme]);

  // инициализация сцены
  useEffect(() => {
    if (dataReceived) {
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

    window.addEventListener("resize", () => handleResize(sceneParamsRef));
    handleResize(sceneParamsRef);

    return () => {
      document.body.removeChild(renderer.domElement);
      window.removeEventListener("resize", () => handleResize(sceneParamsRef));
    };
    }
  }, [dataReceived]);

  // создание и удаление мешей
  useEffect(() => {
    const { scene } = sceneParamsRef.current || {};

    if (!scene) return; // Ждём пока сцена инициализируется

    const createdObjects = createOrUpdateObject(parameters, scene, theme);
    createdObjects.forEach(obj => {
      scene.add(obj);
    });

  }, [parameters, theme]);

  // Если сцена не загруженa, показать спин
  if (!sceneReady || !sceneParamsRef.current?.scene) {
    return (
      <Spin
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "fixed"
        }}
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 48,
            }}
            spin
          />
        }
      />
    );
  }

  const siderTheme: "light" | "dark" = theme === "dark" ? "dark" : "light";

  return (
    <ConfigProvider theme={{ algorithm: themeConfig }}>
      <Layout style={{ height: "100vh", position: "fixed" }}>
        <Sider 
          theme={siderTheme} 
          style={{ position: "fixed", height: "100%" }}
        >
          <ParametersForm 
            setParameters={setParameters}
            setTheme={setTheme}
            theme={theme}
            initialValues={parameters}
            dataReceived={dataReceived}
          />
        </Sider>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
