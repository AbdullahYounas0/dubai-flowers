import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

import RealisticFlower from '../components/3d/RealisticFlower';
import FloatingParticles from '../components/3d/FloatingParticles';
import ErrorBoundary from '../components/ErrorBoundary';

type Country = 'scottish' | 'colombian';

type FlowerGalleryItem = {
  id: string;
  name: string;
  type: 'rose' | 'daisy' | 'tulip';
  petalColor: string;
  centerColor: string;
  stemColor: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  country: Country;
};

const FlowersGallery = () => {
  const [searchParams] = useSearchParams();
  const [activeCountry, setActiveCountry] = useState<Country>('scottish');
  const [activeFlower, setActiveFlower] = useState<string | null>(null);
  
  useEffect(() => {
    const countryParam = searchParams.get('country') as Country | null;
    if (countryParam && (countryParam === 'scottish' || countryParam === 'colombian')) {
      setActiveCountry(countryParam);
    }
  }, [searchParams]);
  
  // Our flower gallery data
  const flowers: FlowerGalleryItem[] = [
    {
      id: 'scottish-thistle',
      name: 'Scottish Thistle',
      type: 'daisy',
      petalColor: '#614b94', // Scottish purple
      centerColor: '#8676b6',
      stemColor: '#4e6055',
      position: [-2, 0, 0],
      rotation: [0, 0, 0],
      scale: 1.2,
      country: 'scottish'
    },
    {
      id: 'scottish-heather',
      name: 'Purple Heather',
      type: 'tulip',
      petalColor: '#9370db',
      centerColor: '#7c5295',
      stemColor: '#3a5683',
      position: [0, 0, 0],
      rotation: [0.1, 0.2, 0],
      scale: 1,
      country: 'scottish'
    },
    {
      id: 'scottish-bluebell',
      name: 'Scottish Bluebell',
      type: 'tulip',
      petalColor: '#4169e1',
      centerColor: '#3a5683',
      stemColor: '#405575',
      position: [2, 0, 0],
      rotation: [0, -0.2, 0],
      scale: 0.9,
      country: 'scottish'
    },
    {
      id: 'colombian-rose',
      name: 'Colombian Rose',
      type: 'rose',
      petalColor: '#dc2626', // Colombian red
      centerColor: '#991b1b',
      stemColor: '#166534',
      position: [-2, 0, 0],
      rotation: [0, 0.2, 0],
      scale: 1.3,
      country: 'colombian'
    },
    {
      id: 'colombian-orchid',
      name: 'Exotic Orchid',
      type: 'tulip',
      petalColor: '#f472b6',
      centerColor: '#be185d',
      stemColor: '#15803d',
      position: [0, 0, 0],
      rotation: [0.1, 0, 0],
      scale: 1,
      country: 'colombian'
    },
    {
      id: 'colombian-sunflower',
      name: 'Colombian Sunflower',
      type: 'daisy',
      petalColor: '#fbbf24',
      centerColor: '#92400e',
      stemColor: '#166534',
      position: [2, 0, 0],
      rotation: [0, -0.1, 0],
      scale: 1.1,
      country: 'colombian'
    }
  ];
  
  const filteredFlowers = flowers.filter(flower => flower.country === activeCountry);
  
  return (
    <>
      <Helmet>
        <title>3D Flower Gallery | Daffofils Flowers Shop</title>
        <meta name="description" content="Explore our interactive 3D flower gallery featuring premium Scottish and Colombian flowers. Experience the beauty of our flowers in stunning detail." />
      </Helmet>
      
      <section className="min-h-screen pt-24 bg-gradient-to-b from-gray-900 to-primary-900 text-white">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-4xl md:text-5xl mb-4">
              Interactive 3D Flower Gallery
            </h1>
            <p className="text-lg text-gray-300">
              Explore our stunning flowers in immersive 3D. Rotate, zoom, and discover the intricate details of our premium blooms.
            </p>
          </motion.div>
          
          {/* Country Selection Tabs */}
          <div className="flex justify-center space-x-6 mb-8">
            <button
              onClick={() => setActiveCountry('scottish')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeCountry === 'scottish' 
                  ? 'bg-scottish-primary text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Scottish Collection
            </button>
            <button
              onClick={() => setActiveCountry('colombian')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeCountry === 'colombian' 
                  ? 'bg-colombian-primary text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Colombian Collection
            </button>
          </div>
          
          {/* 3D Canvas */}
          <div className="relative h-[70vh] rounded-lg overflow-hidden border border-gray-800 shadow-xl">
            <ErrorBoundary fallback={
              <div className="flex items-center justify-center h-full bg-gray-900">
                <div className="text-center text-white p-6">
                  <h3 className="text-xl mb-2">3D Content Error</h3>
                  <p>We're having trouble loading the 3D flowers. Please try refreshing the page.</p>
                </div>
              </div>
            }>
              <Canvas shadows camera={{ position: [0, 2, 8], fov: 50 }}>
                <color attach="background" args={[activeCountry === 'scottish' ? '#1a1a2e' : '#200f0f']} />
                
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
                
                <Suspense fallback={null}>
                {/* Flowers */}
                {filteredFlowers.map((flower) => (
                  <Float key={flower.id} speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                    <RealisticFlower 
                      position={flower.position} 
                      rotation={flower.rotation}
                      scale={flower.scale}
                      flowerType={flower.type}
                      petalColor={flower.petalColor}
                      centerColor={flower.centerColor}
                      stemColor={flower.stemColor}
                      swayFactor={0.3}
                    />
                  </Float>
                ))}
                
                {/* Ambient particles */}
                <FloatingParticles 
                  count={100}
                  color={activeCountry === 'scottish' ? '#8b5cf6' : '#fbbf24'}
                  opacity={0.3}
                  size={0.02}
                  bounds={[15, 10, 10]}
                />
                
                {/* Environment and shadows */}
                <Environment preset="sunset" />
                <ContactShadows 
                  position={[0, -1.8, 0]} 
                  opacity={0.5} 
                  scale={15} 
                  blur={2}
                  far={2}
                />
                
                {/* Controls */}
                <OrbitControls 
                  enablePan={false}
                  minDistance={4}
                  maxDistance={10}
                  minPolarAngle={Math.PI / 6}
                  maxPolarAngle={Math.PI / 2}
                />
              </Suspense>
            </Canvas>
            </ErrorBoundary>
            
            {/* Interaction instructions */}
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-md text-sm">
              <p>Drag to rotate • Scroll to zoom • Pinch to zoom on mobile</p>
            </div>
          </div>
          
          {/* Flowers List */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredFlowers.map((flower) => (
              <motion.div
                key={flower.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`p-4 rounded-md cursor-pointer transition-all ${
                  activeFlower === flower.id
                    ? activeCountry === 'scottish' 
                      ? 'bg-scottish-primary/20 ring-1 ring-scottish-primary' 
                      : 'bg-colombian-primary/20 ring-1 ring-colombian-primary'
                    : 'bg-gray-800/50 hover:bg-gray-800'
                }`}
                onClick={() => setActiveFlower(flower.id)}
              >
                <h3 className="font-heading text-lg">{flower.name}</h3>
                <p className="text-sm text-gray-400 mt-1">Click to highlight</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FlowersGallery;
