import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type FloatingParticlesProps = {
  count?: number;
  size?: number;
  color?: string;
  opacity?: number;
  bounds?: [number, number, number];
  speed?: number;
};

const FloatingParticles = ({
  count = 100,
  size = 0.02,
  color = '#ffff99',
  opacity = 0.6,
  bounds = [10, 5, 5],
  speed = 0.2
}: FloatingParticlesProps) => {
  // References to access particle data in animation loop
  const pointsRef = useRef<THREE.Points>(null);
  const particlesRef = useRef<THREE.BufferAttribute | null>(null);
  const velocitiesRef = useRef<{ x: number; y: number; z: number }[]>([]);
  
  // Initialize velocities for each particle
  if (velocitiesRef.current.length === 0) {
    for (let i = 0; i < count; i++) {
      velocitiesRef.current.push({
        x: (Math.random() - 0.5) * speed,
        y: (Math.random() - 0.5) * speed,
        z: (Math.random() - 0.5) * speed
      });
    }
  }
  
  // Create particle positions
  const particlePositions = new Float32Array(count * 3);
  
  // Assign random positions within the bounds
  for (let i = 0; i < count; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * bounds[0];
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * bounds[1];
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * bounds[2];
  }
  
  // Animation loop for floating particles
  useFrame(() => {
    try {
      if (!pointsRef.current || !particlesRef.current) return;
      
      const positions = particlesRef.current.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        // Update particle positions based on velocities
        positions[i * 3] += velocitiesRef.current[i].x;
        positions[i * 3 + 1] += velocitiesRef.current[i].y;
        positions[i * 3 + 2] += velocitiesRef.current[i].z;
        
        // Bounce particles off the boundaries
        const halfBounds = bounds.map(b => b / 2);
        
        // Check x boundary
        if (Math.abs(positions[i * 3]) > halfBounds[0]) {
          velocitiesRef.current[i].x *= -1;
          positions[i * 3] = Math.sign(positions[i * 3]) * halfBounds[0];
        }
        
        // Check y boundary
        if (Math.abs(positions[i * 3 + 1]) > halfBounds[1]) {
          velocitiesRef.current[i].y *= -1;
          positions[i * 3 + 1] = Math.sign(positions[i * 3 + 1]) * halfBounds[1];
        }
        
        // Check z boundary
        if (Math.abs(positions[i * 3 + 2]) > halfBounds[2]) {
          velocitiesRef.current[i].z *= -1;
          positions[i * 3 + 2] = Math.sign(positions[i * 3 + 2]) * halfBounds[2];
        }
      }
      
      particlesRef.current.needsUpdate = true;
    } catch (error) {
      console.error('Error in FloatingParticles animation:', error);
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          ref={(attr) => {
            particlesRef.current = attr;
          }}
          attach="attributes-position"
          array={particlePositions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default FloatingParticles;
