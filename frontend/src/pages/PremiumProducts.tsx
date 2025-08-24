import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ProductCard from '../components/products/ProductCard';
import { 
  BeautifulRosesBouquet, 
  ColorfulFlowersBouquet, 
  ScottishBouquet, 
  ColombianBouquet, 
  HeroFlowers,
  BeautifulRosesModel,
  FreshFlowersModel,
  ScottishModel,
  ColombianModel
} from '../assets/images';

// Premium products with 3D models
const products = [
  {
    id: 101,
    name: "Royal Scottish Thistle Collection",
    price: 189.99,
    image: ScottishBouquet,
    modelPath: ScottishModel,
    category: "scottish",
    description: "Authentic Scottish thistles imported within 48 hours of harvest, arranged in a premium crystal vase."
  },
  {
    id: 102,
    name: "Colombian Rose Elegance",
    price: 249.99,
    image: ColombianBouquet,
    modelPath: ColombianModel,
    category: "colombian",
    description: "Two dozen premium long-stem roses from the highlands of Colombia, arranged by our master florist."
  },
  {
    id: 103,
    name: "Luxury Mixed Bouquet",
    price: 299.99,
    image: BeautifulRosesBouquet,
    modelPath: BeautifulRosesModel,
    category: "luxury",
    description: "Exquisite combination of rare flowers from around the world, handcrafted for discerning clients."
  },
  {
    id: 104,
    name: "Designer's Choice Premium",
    price: 199.99,
    image: ColorfulFlowersBouquet,
    modelPath: FreshFlowersModel,
    category: "designer",
    description: "Our master florist's selection of the finest seasonal blooms, arranged with artistic flair."
  },
  {
    id: 105,
    name: "Heritage Garden Collection",
    price: 229.99,
    image: HeroFlowers,
    category: "heritage",
    description: "Traditional flowers with a modern twist, celebrating timeless beauty and elegance."
  },
  {
    id: 106,
    name: "Artisan Scottish Heather",
    price: 179.99,
    image: ScottishBouquet,
    modelPath: ScottishModel,
    category: "scottish",
    description: "Rare Scottish heather and wildflowers, capturing the essence of the Highlands."
  },
];

const categories = ["all", "scottish", "colombian", "luxury", "designer", "heritage"];

const PremiumProducts = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);
  
  return (
    <>
      <Helmet>
        <title>Premium Flower Arrangements | Daffofils</title>
        <meta name="description" content="Explore our collection of premium flower arrangements featuring the finest Scottish and Colombian flowers." />
      </Helmet>
      
      <div className="bg-gradient-to-b from-primary-900 to-black min-h-screen py-20">
      <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Link to="/" className="text-gray-300 hover:text-white mb-6 inline-block">
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </span>
            </Link>
            <h1 className="text-5xl font-heading text-white mb-4">Premium Collections</h1>
            <div className="w-24 h-1 bg-secondary-400 mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Experience our exclusive collection of premium arrangements, featuring rare Scottish thistles and 
              the finest Colombian roses, expertly arranged to create unforgettable impressions.
            </p>
          </motion.div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-secondary-500 text-primary-900"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Products grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                modelPath={product.modelPath}
                category={product.category}
                description={product.description}
                type="premium"
              />
            ))}
          </motion.div>

          {/* Compare link */}
          <div className="text-center mt-16">
            <Link 
              to="/average-products" 
              className="inline-flex items-center text-white hover:text-secondary-200 font-medium"
            >
              <span>Looking for more affordable options? View our Standard Collection</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-300">No products found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PremiumProducts;
