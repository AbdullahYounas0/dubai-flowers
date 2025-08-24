import { useEffect, useRef, useState } from 'react';
import { Engine, Scene, FreeCamera, Vector3, HemisphericLight, DirectionalLight, SceneLoader } from '@babylonjs/core';
import '@babylonjs/loaders/glTF';

interface BabylonViewerProps {
  modelPath: string;
  height?: string;
  autoRotate?: boolean;
  className?: string;
}

const BabylonViewer = ({ 
  modelPath, 
  height = "400px", 
  autoRotate = true,
  className = ""
}: BabylonViewerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const sceneRef = useRef<Scene | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    try {
      // Create engine and scene
      const engine = new Engine(canvasRef.current, true, {
        preserveDrawingBuffer: true,
        stencil: true,
        antialias: true
      });
      
      const scene = new Scene(engine);
      scene.createDefaultCameraOrLight(true, true, true);
      
      // Store references
      engineRef.current = engine;
      sceneRef.current = scene;

      // Camera setup
      const camera = new FreeCamera("camera", new Vector3(0, 0, -5), scene);
      camera.attachControl(canvasRef.current, true);
      camera.setTarget(Vector3.Zero());

      // Lighting
      const hemisphericLight = new HemisphericLight("hemisphericLight", new Vector3(0, 1, 0), scene);
      hemisphericLight.intensity = 0.6;
      
      const directionalLight = new DirectionalLight("directionalLight", new Vector3(0, -1, 1), scene);
      directionalLight.intensity = 0.8;

      // Load model
      SceneLoader.ImportMeshAsync("", "", modelPath, scene).then((result) => {
        if (result.meshes.length > 0) {
          // Center and scale the model
          const boundingInfo = result.meshes[0].getBoundingInfo();
          const size = boundingInfo.maximum.subtract(boundingInfo.minimum);
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 2 / maxDim;
          
          result.meshes.forEach(mesh => {
            mesh.scaling = new Vector3(scale, scale, scale);
            mesh.position = Vector3.Zero();
          });
          
          // Auto-rotation
          if (autoRotate) {
            scene.registerBeforeRender(() => {
              result.meshes.forEach(mesh => {
                mesh.rotation.y += 0.01;
              });
            });
          }
          
          setLoading(false);
        } else {
          setError('No meshes found in model');
          setLoading(false);
        }
      }).catch((error) => {
        console.error('Error loading model:', error);
        setError('Failed to load 3D model');
        setLoading(false);
      });

      // Render loop
      engine.runRenderLoop(() => {
        scene.render();
      });

      // Handle resize
      const handleResize = () => {
        engine.resize();
      };
      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        scene.dispose();
        engine.dispose();
      };
    } catch (error) {
      console.error('Error initializing Babylon.js:', error);
      setError('Failed to initialize 3D viewer');
      setLoading(false);
    }
  }, [modelPath, autoRotate]);

  if (error) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-50 rounded-lg ${className}`} 
        style={{ height }}
      >
        <div className="text-center p-4">
          <div className="text-red-500 mb-2">⚠️</div>
          <p className="text-gray-600 mb-2">3D Model Unavailable</p>
          <p className="text-sm text-gray-500">Babylon.js could not load the model</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative overflow-hidden rounded-lg ${className}`} 
      style={{ height }}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        style={{ outline: 'none' }}
      />
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600 mx-auto mb-2"></div>
            <div className="text-white text-sm">Loading 3D Model...</div>
          </div>
        </div>
      )}
      
      {!loading && (
        <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
          Click and drag to explore
        </div>
      )}
    </div>
  );
};

export default BabylonViewer;
