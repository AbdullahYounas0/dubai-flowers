import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshStandardMaterial } from 'three';
import * as THREE from 'three';

type RealisticFlowerProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  flowerType?: 'rose' | 'daisy' | 'tulip';
  petalCount?: number;
  petalColor?: string;
  centerColor?: string;
  stemColor?: string;
  swayFactor?: number;
};

const RealisticFlower = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  flowerType = 'rose',
  petalCount = 12,
  petalColor = '#ff69b4', // Pink default
  centerColor = '#ffff00', // Yellow default
  stemColor = '#008000', // Green default
  swayFactor = 0.5
}: RealisticFlowerProps) => {
  const flowerGroup = useRef<THREE.Group>(null);
  const petals = useRef<THREE.Mesh[]>([]);
  
  // Create different petal geometries based on flower type
  const petalGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    
    // Different petal shapes for different flower types
    switch (flowerType) {
      case 'rose':
        // Create a more complex rose petal shape
        shape.moveTo(0, 0);
        shape.bezierCurveTo(0.5, 0.5, 1, 1.5, 0, 3);
        shape.bezierCurveTo(-1, 1.5, -0.5, 0.5, 0, 0);
        break;
        
      case 'daisy':
        // Create a simple oval/elliptical daisy petal
        shape.ellipse(0, 1, 0.8, 1.8, 0, Math.PI * 2, false);
        break;
        
      case 'tulip':
        // Create a tulip petal shape
        shape.moveTo(0, 0);
        shape.bezierCurveTo(1, 1, 1, 2, 0, 3);
        shape.bezierCurveTo(-1, 2, -1, 1, 0, 0);
        break;
        
      default:
        // Default simple petal
        shape.moveTo(0, 0);
        shape.bezierCurveTo(0.5, 0.5, 1, 1.5, 0, 3);
        shape.bezierCurveTo(-1, 1.5, -0.5, 0.5, 0, 0);
    }
    
    // Extrude settings
    const extrudeSettings = {
      steps: 1,
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelSegments: 1
    };
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [flowerType]);
  
  // Create petal material with translucency
  const petalMaterial = useMemo(() => {
    return new MeshStandardMaterial({
      color: new THREE.Color(petalColor),
      roughness: 0.3,
      metalness: 0.2,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide
    });
  }, [petalColor]);
  
  // Create center material
  const centerMaterial = useMemo(() => {
    return new MeshStandardMaterial({
      color: new THREE.Color(centerColor),
      roughness: 0.8,
      metalness: 0.1
    });
  }, [centerColor]);
  
  // Create stem material
  const stemMaterial = useMemo(() => {
    return new MeshStandardMaterial({
      color: new THREE.Color(stemColor),
      roughness: 0.7,
      metalness: 0.0
    });
  }, [stemColor]);
  
  // Animation loop for gentle swaying
  useFrame(({ clock }) => {
    try {
      if (!flowerGroup.current) return;
      
      // Subtle overall flower movement
      flowerGroup.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.05 * swayFactor;
      flowerGroup.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.2) * 0.05 * swayFactor;
      
      // Individual petal movements
      petals.current.forEach((petal, i) => {
        if (!petal) return;
        petal.rotation.z = Math.sin(clock.getElapsedTime() * 0.5 + i) * 0.03 * swayFactor;
        petal.rotation.y = Math.sin(clock.getElapsedTime() * 0.3 + i) * 0.03 * swayFactor;
      });
    } catch (error) {
      console.error('Error in RealisticFlower animation:', error);
    }
  });
  
  return (
    <group
      ref={flowerGroup}
      position={new THREE.Vector3(...position)}
      rotation={new THREE.Euler(...rotation)}
      scale={scale}
    >
      {/* Flower stem */}
      <mesh position={[0, -3, 0]} rotation={[0, 0, 0]} material={stemMaterial}>
        <cylinderGeometry args={[0.1, 0.15, 5, 8]} />
      </mesh>
      
      {/* Optional leaf */}
      <mesh position={[0.3, -2, 0]} rotation={[0, 0, Math.PI / 4]} material={stemMaterial}>
        <planeGeometry args={[1, 0.4]} />
      </mesh>
      
      {/* Flower center */}
      <mesh position={[0, 0, 0]} material={centerMaterial}>
        <sphereGeometry args={[0.5, 16, 16]} />
      </mesh>
      
      {/* Petals */}
      {[...Array(petalCount)].map((_, i) => {
        const angle = (i / petalCount) * Math.PI * 2;
        const x = Math.cos(angle) * 0.2;
        const y = Math.sin(angle) * 0.2;
        const rotationZ = angle;
        
        return (
          <mesh
            key={`petal-${i}`}
            ref={(el) => {
              if (el) petals.current[i] = el;
            }}
            position={[x, y, 0]}
            rotation={[flowerType === 'daisy' ? Math.PI / 2 : 0, 0, rotationZ]}
            material={petalMaterial}
            geometry={petalGeometry}
            scale={flowerType === 'daisy' ? 0.3 : 0.4}
          />
        );
      })}
    </group>
  );
};

export default RealisticFlower;
