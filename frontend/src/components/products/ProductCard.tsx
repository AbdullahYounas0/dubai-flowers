import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FlowerModelViewer from '../3d/FlowerModelViewer';
import { AddToCartButton } from '../cart/AddToCartButton';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  modelPath?: string;
  category: string;
  description?: string;
  type?: 'premium' | 'average';
}

const ProductCard = ({ 
  id, 
  name, 
  price, 
  image, 
  modelPath,
  category,
  description,
  type = 'average'
}: ProductCardProps) => {
  const [showModel, setShowModel] = useState(false);
  
  // Convert product to the format expected by AddToCartButton
  const product = {
    id: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    name,
    price,
    image,
    category,
    inStock: true,
  };
  
  return (
    <motion.div 
      className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="relative h-64 overflow-hidden">
        {modelPath && showModel ? (
          <FlowerModelViewer 
            modelPath={modelPath}
            height="100%"
            autoRotate={true}
            scale={1.2}
            controls={true}
            showShadows={false}
            className="bg-gradient-to-br from-primary-800 to-primary-900"
          />
        ) : (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        )}
        
        {/* 3D Toggle Button */}
        {modelPath && (
          <button 
            onClick={() => setShowModel(!showModel)}
            className="absolute bottom-2 right-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white hover:bg-white/30 transition-colors"
          >
            {showModel ? '📷 Photo' : '🌺 3D View'}
          </button>
        )}
        
        {/* Category badge */}
        <div className="absolute top-2 left-2 bg-secondary-500/80 backdrop-blur-sm text-primary-900 text-xs px-2 py-1 rounded-full font-medium">
          {category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl text-white font-medium mb-2">{name}</h3>
        {description && (
          <p className="text-gray-300 text-sm mb-3 line-clamp-2">{description}</p>
        )}
        <div className="flex justify-between items-center">
          <span className="text-secondary-300 text-lg font-semibold">${price}</span>
          <div className="flex space-x-2">
            <Link 
              to={`/product/${id}`}
              className="bg-secondary-500/80 hover:bg-secondary-500 text-primary-900 px-3 py-1 rounded-md text-sm font-medium transition-colors"
            >
              View Details
            </Link>
            <AddToCartButton 
              product={product}
              size="sm"
              variant="secondary"
              showQuantitySelector={false}
              className="text-sm"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
