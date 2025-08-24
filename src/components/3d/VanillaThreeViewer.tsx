import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

interface VanillaThreeViewerProps {
  modelPath: string;
  height?: string;
  autoRotate?: boolean;
  className?: string;
}

const VanillaThreeViewer = ({ 
  modelPath, 
  height = "400px", 
  autoRotate = true,
  className = ""
}: VanillaThreeViewerProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.set(0, 0, 5);
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      preserveDrawingBuffer: true 
    });
    renderer.setSize(400, 400);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);
    
    // Enable proper color space and tone mapping for realistic colors
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced lighting setup for better color visibility
    // Very bright ambient light to illuminate all surfaces
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);
    
    // Main directional light (sun-like) - very bright
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Fill light from the opposite side - bright
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.2);
    fillLight.position.set(-5, 3, -3);
    scene.add(fillLight);
    
    // Top light for even illumination - bright
    const topLight = new THREE.DirectionalLight(0xffffff, 1.0);
    topLight.position.set(0, 10, 0);
    scene.add(topLight);
    
    // Add some colored accent lights for vibrancy
    const pinkLight = new THREE.PointLight(0xff69b4, 0.5);
    pinkLight.position.set(2, 2, 2);
    scene.add(pinkLight);
    
    const blueLight = new THREE.PointLight(0x4169e1, 0.5);
    blueLight.position.set(-2, 2, 2);
    scene.add(blueLight);

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Load GLB model
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf: any) => {
        const model = gltf.scene;
        
        // Center and scale the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        // Scale to fit
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        model.scale.setScalar(scale);
        
        // Center the model
        model.position.copy(center).multiplyScalar(-scale);
        
        // Enable shadows and ensure proper material properties
        model.traverse((child: any) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            
            // Check if material exists and has color, if not, create a colorful fallback
            if (child.material) {
              let material = child.material;
              
              if (Array.isArray(material)) {
                material.forEach((mat: any, index: number) => {
                  // If material is too dark or doesn't have color, replace with colorful material
                  if (!mat.color || (mat.color.r < 0.1 && mat.color.g < 0.1 && mat.color.b < 0.1)) {
                    // Create vibrant colors based on mesh position/index
                    const colors = [
                      0xff6b6b, // Red for roses
                      0x4ecdc4, // Teal for leaves
                      0x45b7d1, // Blue for accent
                      0x96ceb4, // Green for stems
                      0xffeaa7, // Yellow for centers
                      0xdda0dd, // Purple for petals
                    ];
                    const colorIndex = index % colors.length;
                    const newMat = new THREE.MeshStandardMaterial({
                      color: colors[colorIndex],
                      roughness: 0.7,
                      metalness: 0.1,
                    });
                    material[index] = newMat;
                  } else {
                    // Enhance existing material
                    mat.needsUpdate = true;
                    if (mat.roughness !== undefined) mat.roughness = 0.7;
                    if (mat.metalness !== undefined) mat.metalness = 0.1;
                  }
                });
                child.material = material;
              } else {
                // Single material
                if (!material.color || (material.color.r < 0.1 && material.color.g < 0.1 && material.color.b < 0.1)) {
                  // Create a vibrant material based on the mesh name or position
                  const meshColors = {
                    'petal': 0xff6b6b,
                    'flower': 0xff6b6b,
                    'leaf': 0x4ecdc4,
                    'stem': 0x96ceb4,
                    'center': 0xffeaa7,
                    'default': 0xdda0dd
                  };
                  
                  let color = meshColors.default;
                  const name = child.name.toLowerCase();
                  
                  for (const [key, value] of Object.entries(meshColors)) {
                    if (name.includes(key)) {
                      color = value;
                      break;
                    }
                  }
                  
                  child.material = new THREE.MeshStandardMaterial({
                    color: color,
                    roughness: 0.7,
                    metalness: 0.1,
                  });
                } else {
                  // Enhance existing material
                  material.needsUpdate = true;
                  if (material.roughness !== undefined) material.roughness = 0.7;
                  if (material.metalness !== undefined) material.metalness = 0.1;
                }
              }
            } else {
              // No material at all, create a default colorful one
              child.material = new THREE.MeshStandardMaterial({
                color: 0xff6b6b, // Default to rose color
                roughness: 0.7,
                metalness: 0.1,
              });
            }
          }
        });
        
        scene.add(model);
        modelRef.current = model;
        setLoading(false);
      },
      (progress: any) => {
        // Loading progress
        console.log('Loading progress:', (progress.loaded / progress.total) * 100 + '%');
      },
      (error: any) => {
        console.error('Error loading model:', error);
        setError('Failed to load 3D model');
        setLoading(false);
      }
    );

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      if (autoRotate && modelRef.current) {
        modelRef.current.rotation.y = clock.getElapsedTime() * 0.3;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (mountRef.current && renderer) {
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Mouse controls (basic orbit)
    let mouseDown = false;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseDown = (event: MouseEvent) => {
      mouseDown = true;
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const onMouseUp = () => {
      mouseDown = false;
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!mouseDown || !modelRef.current) return;

      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;

      modelRef.current.rotation.y += deltaX * 0.01;
      modelRef.current.rotation.x += deltaY * 0.01;

      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const canvas = renderer.domElement;
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mousemove', onMouseMove);

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mousemove', onMouseMove);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js objects
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      
      renderer.dispose();
    };
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
          <p className="text-sm text-gray-500">The model file could not be loaded</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative overflow-hidden rounded-lg ${className}`} 
      style={{ height }}
    >
      <div 
        ref={mountRef} 
        className="w-full h-full"
        style={{ cursor: 'grab' }}
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
          Drag to rotate
        </div>
      )}
    </div>
  );
};

export default VanillaThreeViewer;
