declare module "three/examples/jsm/controls/OrbitControls" {
  import { EventDispatcher } from "three";
  import { Camera, HTMLCanvasElement } from "three";

  export class OrbitControls extends EventDispatcher {
    constructor(object: Camera, domElement?: HTMLCanvasElement);
      update(): void;
  }
}

declare module "three/examples/jsm/loaders/EXRLoader" {
  import { TextureLoader } from "three";

  export class EXRLoader extends TextureLoader {
    load(url: string, onLoad: (texture: Texture) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): void;
  }
}

declare module "*.exr" {
  const content: any;
  export default content;
}
