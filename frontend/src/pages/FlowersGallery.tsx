import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import VanillaThreeViewer from '../components/3d/VanillaThreeViewer';
import { ScottishModel, ColombianModel } from '../assets/images';

type Country = 'scottish' | 'colombian';

type FlowerGalleryItem = {
  id: string;
  name: string;
  type: string;
  petalColor: string;
  centerColor: string;
  stemColor: string;
  modelPath: string;
  description: string;
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
  
  // Our flower gallery data with 3D models
  const flowers: FlowerGalleryItem[] = [
    {
      id: 'scottish-thistle',
      name: 'Scottish Thistle',
      type: 'Premium Scottish Collection',
      petalColor: '#614b94',
      centerColor: '#8676b6',
      stemColor: '#4e6055',
      modelPath: ScottishModel,
      description: 'Traditional Scottish thistle with deep purple petals',
      country: 'scottish'
    },
    {
      id: 'scottish-heather',
      name: 'Purple Heather',
      type: 'Highland Special',
      petalColor: '#9370db',
      centerColor: '#7c5295',
      stemColor: '#3a5683',
      modelPath: ScottishModel,
      description: 'Delicate heather from Scottish highlands',
      country: 'scottish'
    },
    {
      id: 'scottish-bluebell',
      name: 'Scottish Bluebell',
      type: 'Woodland Collection',
      petalColor: '#4169e1',
      centerColor: '#3a5683',
      stemColor: '#405575',
      modelPath: ScottishModel,
      description: 'Enchanting bluebells from Scottish forests',
      country: 'scottish'
    },
    {
      id: 'colombian-rose',
      name: 'Colombian Rose',
      type: 'Premium Colombian Collection',
      petalColor: '#dc143c',
      centerColor: '#8b0000',
      stemColor: '#228b22',
      modelPath: ColombianModel,
      description: 'Vibrant red roses from Colombian highlands',
      country: 'colombian'
    },
    {
      id: 'colombian-carnation',
      name: 'Colombian Carnation',
      type: 'Tropical Collection',
      petalColor: '#ff69b4',
      centerColor: '#ff1493',
      stemColor: '#32cd32',
      modelPath: ColombianModel,
      description: 'Exotic carnations with tropical flair',
      country: 'colombian'
    },
    {
      id: 'colombian-orchid',
      name: 'Colombian Orchid',
      type: 'Luxury Collection',
      petalColor: '#9932cc',
      centerColor: '#800080',
      stemColor: '#228b22',
      modelPath: ColombianModel,
      description: 'Rare orchids from Colombian rainforests',
      country: 'colombian'
    }
  ];
  
  const filteredFlowers = flowers.filter(flower => flower.country === activeCountry);
  
  return (
    <>
      <Helmet>
        <title>Flowers Gallery - Daffofils Flowers</title>
        <meta name="description" content="Explore our beautiful collection of flowers from Scotland and Colombia" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
        {/* Header Section */}
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Flowers Gallery
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our exquisite collection of flowers from around the world
            </p>
          </motion.div>
          
          {/* Country Filter */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-full shadow-lg p-2">
              <button
                onClick={() => setActiveCountry('scottish')}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  activeCountry === 'scottish'
                    ? 'bg-violet-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-violet-600'
                }`}
              >
                Scottish Collection
              </button>
              <button
                onClick={() => setActiveCountry('colombian')}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  activeCountry === 'colombian'
                    ? 'bg-violet-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-violet-600'
                }`}
              >
                Colombian Collection
              </button>
            </div>
          </div>
          
          {/* Flowers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFlowers.map((flower, index) => (
              <motion.div
                key={flower.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="h-64 bg-gradient-to-br from-violet-100 to-purple-100 relative">
                  <VanillaThreeViewer
                    modelPath={flower.modelPath}
                    height="100%"
                    autoRotate={true}
                    className="w-full h-full"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {flower.name}
                  </h3>
                  <p className="text-sm text-violet-600 mb-3">
                    {flower.type}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    {flower.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <div 
                        className="w-4 h-4 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: flower.petalColor }}
                        title="Petal Color"
                      />
                      <div 
                        className="w-4 h-4 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: flower.centerColor }}
                        title="Center Color"
                      />
                      <div 
                        className="w-4 h-4 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: flower.stemColor }}
                        title="Stem Color"
                      />
                    </div>
                    
                    <button
                      onClick={() => setActiveFlower(activeFlower === flower.id ? null : flower.id)}
                      className="text-violet-600 hover:text-violet-800 text-sm font-medium"
                    >
                      {activeFlower === flower.id ? 'Hide Details' : 'View Details'}
                    </button>
                  </div>
                  
                  {activeFlower === flower.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-gray-200"
                    >
                      <div className="text-sm text-gray-600">
                        <p><strong>Collection:</strong> {flower.country === 'scottish' ? 'Scottish' : 'Colombian'}</p>
                        <p><strong>Type:</strong> {flower.type}</p>
                        <p className="mt-2">{flower.description}</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FlowersGallery;
