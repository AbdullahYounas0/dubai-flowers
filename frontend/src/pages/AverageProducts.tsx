import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
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

// Mock data for average flower products with 3D models
const products = [
  {
    id: 1,
    name: "Standard Rose Bouquet",
    price: 29.99,
    image: BeautifulRosesBouquet,
    modelPath: BeautifulRosesModel,
    category: "bouquet",
    description: "Beautiful standard roses perfect for everyday occasions. Fresh and vibrant."
  },
  {
    id: 2,
    name: "Simple Daisy Arrangement",
    price: 19.99,
    image: ColorfulFlowersBouquet,
    modelPath: FreshFlowersModel,
    category: "arrangement",
    description: "Colorful mixed flower arrangement bringing joy to any space."
  },
  {
    id: 3,
    name: "Basic Tulip Bundle",
    price: 24.99,
    image: ScottishBouquet,
    modelPath: ScottishModel,
    category: "bundle",
    description: "Scottish-inspired floral bundle with traditional charm."
  },
  {
    id: 4,
    name: "Mixed Seasonal Flowers",
    price: 27.99,
    image: ColombianBouquet,
    modelPath: ColombianModel,
    category: "seasonal",
    description: "Seasonal selection featuring the best of Colombian flowers."
  },
  {
    id: 5,
    name: "Simple Centerpiece",
    price: 22.99,
    image: HeroFlowers,
    category: "centerpiece",
    description: "Elegant centerpiece perfect for dining tables and special events."
  },
  {
    id: 6,
    name: "Standard Birthday Bouquet",
    price: 29.99,
    image: ColorfulFlowersBouquet,
    modelPath: FreshFlowersModel,
    category: "occasion",
    description: "Cheerful birthday bouquet to celebrate special moments."
  },
];

const categories = ["all", "bouquet", "arrangement", "bundle", "seasonal", "centerpiece", "occasion"];

const AverageProducts = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);
  
  return (
    <div className="bg-gradient-to-b from-primary-800 to-primary-900 min-h-screen py-20">
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
          <h1 className="text-5xl font-heading text-white mb-4">Average Collections</h1>
          <div className="w-24 h-1 bg-secondary-400 mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our standard collection offers beautiful, everyday arrangements at accessible price points.
            Perfect for casual gifting and bringing a touch of nature to your space.
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
              type="average"
            />
          ))}
        </motion.div>

        {/* Compare link */}
        <div className="text-center mt-16">
          <Link 
            to="/premium-products" 
            className="inline-flex items-center text-secondary-300 hover:text-secondary-200 font-medium"
          >
            <span>Looking for something special? View our Premium Collection</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AverageProducts;
