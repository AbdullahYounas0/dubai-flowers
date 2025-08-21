import { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  Stage, 
  useGLTF,
  Environment,
  ContactShadows 
} from '@react-three/drei';
import * as THREE from 'three';

// Cache preloaded models to improve performance
const modelCache = new Map();

interface FlowerModelProps {
  modelPath: string;
  scale?: number;
}

const FlowerModel = ({ modelPath, scale = 1 }: FlowerModelProps) => {
  const { scene } = useGLTF(modelPath);
  
  // Clone the model to avoid mutation issues when multiple instances are used
  const clonedScene = useRef<THREE.Group>();
  
  if (!clonedScene.current) {
    clonedScene.current = scene.clone();
  }
  
  return (
    <primitive 
      object={clonedScene.current!} 
      scale={scale}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  );
};

interface FlowerModelViewerProps {
  modelPath: string;
  height?: string;
  autoRotate?: boolean;
  background?: boolean;
  scale?: number;
  controls?: boolean;
  className?: string;
}

const FlowerModelViewer = ({ 
  modelPath,
  height = "400px",
  autoRotate = true,
  background = false,
  scale = 1,
  controls = true,
  className = ""
}: FlowerModelViewerProps) => {
  const [loading, setLoading] = useState(true);
  
  // Preload model
  if (!modelCache.has(modelPath)) {
    modelCache.set(modelPath, true);
    useGLTF.preload(modelPath);
  }
  
  return (
    <div 
      className={`relative overflow-hidden rounded-lg ${className}`} 
      style={{ height }}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
        </div>
      )}
      
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 50 }}
        onCreated={() => setLoading(false)}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        
        {background ? (
          <Stage environment="city" contactShadow shadows adjustCamera>
            <FlowerModel modelPath={modelPath} scale={scale} />
          </Stage>
        ) : (
          <>
            <FlowerModel modelPath={modelPath} scale={scale} />
            <ContactShadows 
              rotation-x={Math.PI / 2}
              position={[0, -1.4, 0]}
              opacity={0.75}
              width={10}
              height={10}
              blur={2.5}
              far={4}
            />
            <Environment preset="sunset" />
          </>
        )}
        
        {controls && (
          <OrbitControls 
            autoRotate={autoRotate}
            autoRotateSpeed={1}
            enableZoom={true}
            enablePan={false}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
          />
        )}
      </Canvas>
    </div>
  );
};

export default FlowerModelViewer;
