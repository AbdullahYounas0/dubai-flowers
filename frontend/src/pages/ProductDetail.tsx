import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import FlowerModelViewer from '../components/3d/FlowerModelViewer';
import { 
  BeautifulRosesBouquet, 
  ColorfulFlowersBouquet, 
  ScottishBouquet, 
  ColombianBouquet,
  BeautifulRosesModel,
  FreshFlowersModel,
  ScottishModel,
  ColombianModel
} from '../assets/images';

// This would normally come from an API or database
const getAllProducts = () => {
  return [
    // Average products
    {
      id: 1,
      name: "Standard Rose Bouquet",
      price: 29.99,
      image: BeautifulRosesBouquet,
      modelPath: BeautifulRosesModel,
      category: "bouquet",
      description: "Beautiful standard roses perfect for everyday occasions. Fresh and vibrant.",
      details: [
        "12 fresh roses in seasonal colors",
        "Hand-tied with premium ribbon",
        "Vase included: Glass (25cm tall)",
        "Longevity: 7-10 days with proper care"
      ],
      type: "average"
    },
    {
      id: 2,
      name: "Simple Daisy Arrangement",
      price: 19.99,
      image: ColorfulFlowersBouquet,
      modelPath: FreshFlowersModel,
      category: "arrangement",
      description: "Colorful mixed flower arrangement bringing joy to any space.",
      details: [
        "Mixed seasonal flowers",
        "Compact arrangement style",
        "Basic care instructions included",
        "Longevity: 5-7 days"
      ],
      type: "average"
    },
    // Premium products
    {
      id: 101,
      name: "Royal Scottish Thistle Collection",
      price: 189.99,
      image: ScottishBouquet,
      modelPath: ScottishModel,
      category: "scottish",
      description: "Authentic Scottish thistles imported within 48 hours of harvest, arranged in a premium crystal vase.",
      details: [
        "Sourced from the highlands of Scotland",
        "Vase included: Crystal (30cm tall)",
        "Longevity: 14-18 days with proper care",
        "Free care instructions and flower food included",
        "Certificate of authenticity"
      ],
      type: "premium"
    },
    {
      id: 102,
      name: "Colombian Rose Elegance",
      price: 249.99,
      image: ColombianBouquet,
      modelPath: ColombianModel,
      category: "colombian",
      description: "Two dozen premium long-stem roses from the highlands of Colombia, arranged by our master florist.",
      details: [
        "Two dozen 60cm long-stem roses",
        "Sourced from the Bogotá highlands",
        "Vase included: Modern glass (35cm tall)",
        "Longevity: 10-14 days with proper care",
        "Master florist arrangement"
      ],
      type: "premium"
    }
  ];
};

const getProductById = (id: string) => {
  const products = getAllProducts();
  return products.find(product => product.id === parseInt(id));
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
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-primary-800 to-primary-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-secondary-300 mx-auto mb-4"></div>
          <p className="text-white">Loading product details...</p>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container-custom py-16 text-center min-h-screen bg-gradient-to-b from-primary-800 to-primary-900">
        <h1 className="text-3xl font-medium mb-4 text-white">Product Not Found</h1>
        <p className="text-gray-300 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/flowers" className="btn-primary">Browse Our Collection</Link>
      </div>
    );
  }
  
  const backgroundGradient = product.type === 'premium' 
    ? 'from-primary-900 to-black' 
    : 'from-primary-800 to-primary-900';
  
  return (
    <>
      <Helmet>
        <title>{product.name} | Daffofils Flowers</title>
        <meta name="description" content={product.description} />
      </Helmet>
      
      <div className={`bg-gradient-to-b ${backgroundGradient} min-h-screen py-20`}>
        <div className="container-custom">
          {/* Back navigation */}
          <Link 
            to={product.type === 'premium' ? '/premium-products' : '/average-products'} 
            className="text-gray-300 hover:text-white mb-8 inline-block"
          >
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to {product.type === 'premium' ? 'Premium' : 'Standard'} Collection
            </span>
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product image/3D model section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden h-[500px] relative">
                {product.modelPath && (
                  <div className="absolute top-4 right-4 z-10">
                    <button 
                      onClick={() => setView3D(!view3D)}
                      className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-white hover:bg-white/30 transition-colors shadow-lg"
                    >
                      {view3D ? '📷 View Photo' : '🌺 View in 3D'}
                    </button>
                  </div>
                )}
                
                {view3D && product.modelPath ? (
                  <FlowerModelViewer
                    modelPath={product.modelPath}
                    height="100%"
                    autoRotate={true}
                    controls={true}
                    showShadows={true}
                    scale={1.5}
                  />
                ) : (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              {/* 3D Interaction hint */}
              {view3D && product.modelPath && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-center text-gray-300 text-sm"
                >
                  <p>🖱️ Drag to rotate • 🔍 Scroll to zoom</p>
                </motion.div>
              )}
            </motion.div>
            
            {/* Product info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  product.type === 'premium' 
                    ? 'bg-secondary-500 text-primary-900' 
                    : 'bg-white/20 text-white'
                }`}>
                  {product.category}
                </div>
                {product.type === 'premium' && (
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-primary-900 px-3 py-1 rounded-full text-sm font-bold">
                    PREMIUM
                  </div>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-heading mb-4">
                {product.name}
              </h1>
              
              <p className="text-2xl text-secondary-300 font-semibold mb-6">
                ${product.price.toFixed(2)}
              </p>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {product.description}
              </p>
              
              <div className="mb-8">
                <h3 className="font-medium text-white mb-3">What's Included:</h3>
                <ul className="space-y-2">
                  {product.details.map((detail: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-secondary-300 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-300">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-4">
                <button className="w-full bg-secondary-500 hover:bg-secondary-400 text-primary-900 py-3 px-6 rounded-lg font-medium transition-colors">
                  Add to Cart
                </button>
                <button className="w-full bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-lg font-medium transition-colors border border-white/20">
                  Request Custom Arrangement
                </button>
              </div>
              
              <div className="mt-8 p-4 bg-secondary-500/20 rounded-lg border border-secondary-500/30">
                <div className="flex items-center text-secondary-300 text-sm">
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
