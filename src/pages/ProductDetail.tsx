import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import FlowerModelViewer from '../components/3d/FlowerModelViewer';

// Import images and models
import scottishBouquetImage from '../assets/images/scottish-bouquet.jpg';
import colombianBouquetImage from '../assets/images/colombian-bouquet.jpg';
import beautifulRosesImage from '../assets/images/beautiful-roses-bouquet-indoors.jpg';
import freshFlowersImage from '../assets/images/beautiful-colorful-fresh-flowers-bouquet-isolated-white-space.jpg';

// This would normally come from an API or database
const getProductById = (id: string) => {
  // Example data - in a real app, you would fetch this from an API
  const products = [
    {
      id: 'scottish',
      name: 'Royal Scottish Thistle',
      price: 189.99,
      category: 'Scottish',
      imagePath: scottishBouquetImage,
      modelPath: '/src/assets/images/scottish.glb',
      description: 'Authentic Scottish thistles imported within 48 hours of harvest, arranged in a premium crystal vase.',
      details: [
        'Sourced from the highlands of Scotland',
        'Vase included: Crystal (30cm tall)',
        'Longevity: 14-18 days with proper care',
        'Free care instructions and flower food included'
      ]
    },
    {
      id: 'colombian',
      name: 'Colombian Rose Elegance',
      price: 249.99,
      category: 'Colombian',
      imagePath: colombianBouquetImage,
      modelPath: '/src/assets/images/columbian.glb',
      description: 'Two dozen premium long-stem roses from the highlands of Colombia, arranged by our master florist.',
      details: [
        'Two dozen 60cm long-stem roses',
        'Sourced from the Bogotá highlands',
        'Vase included: Modern glass (35cm tall)',
        'Longevity: 10-14 days with proper care'
      ]
    },
    {
      id: 'beautiful-roses',
      name: 'Beautiful Roses Bouquet',
      price: 199.99,
      category: 'Premium',
      imagePath: beautifulRosesImage,
      modelPath: '/src/assets/images/beautiful-roses-bouquet.glb',
      description: 'A stunning arrangement of beautiful roses, perfect for any special occasion.',
      details: [
        'Premium selection of roses',
        'Elegant arrangement by professional florists',
        'Available in various color options',
        'Complementary gift message card'
      ]
    },
    {
      id: 'fresh-flowers',
      name: 'Fresh Seasonal Flowers',
      price: 159.99,
      category: 'Seasonal',
      imagePath: freshFlowersImage,
      modelPath: '/src/assets/images/fresh-flowers.glb',
      description: 'A colorful mix of fresh seasonal flowers, guaranteed to brighten any room.',
      details: [
        'Selection of the season\'s best blooms',
        'Bright, vibrant color palette',
        'Wrapped in premium packaging',
        'Perfect for home or office display'
      ]
    }
  ];
  
  return products.find(product => product.id === id);
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [view3D, setView3D] = useState(false);
  
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const foundProduct = getProductById(id || '');
      setProduct(foundProduct);
      setLoading(false);
    }, 500);
  }, [id]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-violet-600"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-medium mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <a href="/flowers" className="btn-primary">Browse Our Collection</a>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{product.name} | Daffofils Flowers</title>
        <meta name="description" content={product.description} />
      </Helmet>
      
      <div className="bg-white">
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product image/3D model section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 rounded-xl overflow-hidden h-[500px] relative"
            >
              {product.modelPath && (
                <div className="absolute top-4 right-4 z-10">
                  <button 
                    onClick={() => setView3D(!view3D)}
                    className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-violet-700 shadow-md hover:bg-white transition-colors"
                  >
                    {view3D ? 'View Photo' : 'View in 3D'}
                  </button>
                </div>
              )}
              
              {view3D && product.modelPath ? (
                <FlowerModelViewer
                  modelPath={product.modelPath}
                  height="100%"
                  autoRotate={true}
                  controls={true}
                  background={false}
                  scale={1.5}
                />
              ) : (
                <img 
                  src={product.imagePath} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>
            
            {/* Product info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="inline-block bg-violet-100 text-violet-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                {product.category}
              </div>
              <h1 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-2xl text-violet-600 font-semibold mb-6">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>
              
              <div className="mb-8">
                <h3 className="font-medium text-gray-900 mb-3">Details:</h3>
                <ul className="space-y-2">
                  {product.details.map((detail: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <svg className="w-5 h-5 text-violet-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-4">
                <button className="w-full btn-primary">
                  Add to Cart
                </button>
                <button className="w-full btn-outline">
                  Request Custom Arrangement
                </button>
              </div>
              
              <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-100">
                <div className="flex items-center text-amber-800 text-sm">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Same-day delivery available for orders placed before 2pm</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
