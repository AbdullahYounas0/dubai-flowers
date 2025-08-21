import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import FlowerModelViewer from '../components/3d/FlowerModelViewer';

// Mock data for premium flower products
const products = [
  {
    id: "beautiful-roses",
    name: "Luxe Rose Bouquet",
    price: 79.99,
    image: "/src/assets/images/beautiful-roses-bouquet-indoors.jpg",
    modelPath: "/src/assets/images/beautiful-roses-bouquet.glb",
    category: "bouquet",
    features: ["Premium long-stem roses", "Hand-tied arrangement", "Luxury gift box"],
    has3DModel: true
  },
  {
    id: "fresh-flowers",
    name: "Artisan Mixed Arrangement",
    price: 89.99,
    image: "/src/assets/images/beautiful-colorful-fresh-flowers-bouquet-isolated-white-space.jpg",
    modelPath: "/src/assets/images/fresh-flowers.glb",
    category: "arrangement",
    features: ["Rare seasonal blooms", "Custom vase included", "Designer's choice"],
    has3DModel: true
  },
  {
    id: "scottish",
    name: "Scottish Thistle Collection",
    price: 94.99,
    image: "/src/assets/images/scottish-bouquet.jpg",
    modelPath: "/src/assets/images/scottish.glb",
    category: "collection",
    features: ["Rare thistle varieties", "Artisan-crafted design", "Extended freshness guarantee"],
    has3DModel: true
  },
  {
    id: "colombian",
    name: "Premium Colombian Blooms",
    price: 127.99,
    image: "/src/assets/images/colombian-bouquet.jpg",
    modelPath: "/src/assets/images/columbian.glb",
    category: "imported",
    features: ["Sourced from Colombian highlands", "Fair trade certified", "Exclusive varieties"],
    has3DModel: true
  },
  {
    id: 5,
    name: "Luxury Centerpiece",
    price: 112.99,
    image: "/src/assets/images/hero-flowers.jpg",
    category: "centerpiece",
    features: ["Statement centerpiece", "Premium seasonal blooms", "Artistic composition"]
  },
  {
    id: 6,
    name: "Signature Celebration Bouquet",
    price: 149.99,
    image: "/src/assets/images/beautiful-colorful-fresh-flowers-bouquet-isolated-white-space.jpg",
    category: "occasion",
    features: ["Master florist design", "Premium blooms", "Luxury packaging"]
  },
];

const categories = ["all", "bouquet", "arrangement", "collection", "imported", "centerpiece", "occasion"];

const PremiumProducts = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);
  
  return (
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
            Our premium collection features exquisite arrangements created by master florists.
            These signature designs use rare and exotic blooms for truly unforgettable gifts and experiences.
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
            <motion.div
              key={product.id}
              className="bg-gradient-to-br from-black/40 to-primary-900/40 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-secondary-900/30"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="h-64 overflow-hidden relative">
                <div className="absolute top-2 right-2 bg-secondary-500 text-primary-900 text-xs font-bold px-2 py-1 rounded-full">
                  PREMIUM
                </div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl text-white font-medium mb-2">{product.name}</h3>
                <ul className="mb-4">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-300 text-sm flex items-center mb-1">
                      <span className="text-secondary-400 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center">
                  <span className="text-secondary-300 text-lg font-semibold">${product.price}</span>
                  <button className="bg-secondary-500 hover:bg-secondary-400 text-primary-900 px-4 py-2 rounded-md transition-colors font-medium">
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
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
      </div>
    </div>
  );
};

export default PremiumProducts;
