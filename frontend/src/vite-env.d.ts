/// <reference types="vite/client" />

// Declare module types for 3D model files
declare module '*.glb' {
  const src: string;
  export default src;
}

declare module '*.glb?url' {
  const src: string;
  export default src;
}

declare module '*.gltf' {
  const src: string;
  export default src;
}

declare module '*.gltf?url' {
  const src: string;
  export default src;
}

declare module '*.fbx' {
  const src: string;
  export default src;
}
