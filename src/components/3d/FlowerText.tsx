import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import RealisticFlower from './RealisticFlower';

type FlowerTextProps = {
  text: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  spacing?: number;
  height?: number;
  flowerScale?: number;
  flowerType?: 'rose' | 'daisy' | 'tulip';
  flowerColors?: string[];
};

// Font mapping for letters using coordinate arrays
const letterCoordinates: Record<string, [number, number][]> = {
  'A': [
    [0, 0], [0, 1], [0, 2], [0, 3],
    [1, 3],
    [2, 0], [2, 1], [2, 2], [2, 3],
    [0.5, 1.5], [1.5, 1.5]
  ],
  'V': [
    [0, 3], [0.5, 2], [1, 1], [1.5, 0],
    [2, 1], [2.5, 2], [3, 3]
  ],
  'E': [
    [0, 0], [0, 1], [0, 2], [0, 3],
    [1, 0], [2, 0],
    [1, 1.5], [1.5, 1.5],
    [1, 3], [2, 3]
  ],
  'R': [
    [0, 0], [0, 1], [0, 2], [0, 3],
    [1, 3], [1.75, 2.75],
    [1, 1.5], [1.75, 1.5],
    [0.8, 0.8], [1.6, 0]
  ],
  'G': [
    [1, 3], [0.5, 2.75], [0, 2], [0, 1], [0.5, 0.25], [1, 0],
    [2, 0], [2, 1],
    [1.5, 1], [2, 1]
  ],
  'P': [
    [0, 0], [0, 1], [0, 2], [0, 3],
    [1, 3], [1.75, 2.5],
    [1, 1.5], [1.75, 2],
  ],
  'M': [
    [0, 0], [0, 1], [0, 2], [0, 3],
    [0.75, 2.25], [1.5, 1.5], [2.25, 2.25],
    [3, 0], [3, 1], [3, 2], [3, 3]
  ],
  'I': [
    [0, 0], [1, 0], [2, 0],
    [1, 1], [1, 2],
    [0, 3], [1, 3], [2, 3]
  ],
  'U': [
    [0, 3], [0, 2], [0, 1],
    [0.5, 0], [1.5, 0],
    [2, 1], [2, 2], [2, 3]
  ],
  'N': [
    [0, 0], [0, 1], [0, 2], [0, 3],
    [0.75, 2], [1.5, 1],
    [2, 0], [2, 1], [2, 2], [2, 3]
  ],
};

const FlowerText = ({
  text,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  spacing = 4,
  height = 4,
  flowerScale = 0.15,
  flowerType = 'daisy',
  flowerColors = ['#ff69b4', '#ff5e78', '#ff4d4d', '#ffa07a']
}: FlowerTextProps) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Add subtle group animation
  useFrame(({ clock }) => {
    try {
      if (!groupRef.current) return;
      groupRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
    } catch (error) {
      console.error('Error in FlowerText animation:', error);
    }
  });
  
  // Convert text to uppercase for our map
  const upperText = text.toUpperCase();
  
  return (
    <group
      ref={groupRef}
      position={new THREE.Vector3(...position)}
      rotation={new THREE.Euler(...rotation)}
    >
      {upperText.split('').map((char, charIndex) => {
        // Skip spaces
        if (char === ' ') return null;
        
        // Get coordinates for this letter or use empty array if not in map
        const letterPositions = letterCoordinates[char] || [];
        
        return (
          <group 
            key={`char-${charIndex}`} 
            position={[charIndex * spacing, 0, 0]}
          >
            {letterPositions.map((pos, i) => {
              // Calculate color index to cycle through colors
              const colorIndex = (charIndex + i) % flowerColors.length;
              
              return (
                <RealisticFlower
                  key={`flower-${charIndex}-${i}`}
                  position={[pos[0], pos[1] * height, 0]}
                  flowerType={flowerType}
                  scale={flowerScale}
                  petalColor={flowerColors[colorIndex]}
                  swayFactor={0.3}
                />
              );
            })}
          </group>
        );
      })}
    </group>
  );
};

export default FlowerText;
