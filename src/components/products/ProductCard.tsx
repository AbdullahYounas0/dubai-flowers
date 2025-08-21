import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FlowerModelViewer from '../3d/FlowerModelViewer';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  category: string;
  imagePath: string;
  modelPath?: string; // Path to 3D model if available
  description: string;
}

const ProductCard = ({ 
  id, 
  name, 
  price, 
  category, 
  imagePath, 
  modelPath,
  description 
}: ProductCardProps) => {
  const [showModel, setShowModel] = useState(false);
  
  return (
    <motion.div 
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-64 overflow-hidden">
        {modelPath ? (
          <>
            {/* Toggle between image and 3D model */}
            {showModel ? (
              <FlowerModelViewer 
                modelPath={modelPath}
                height="100%"
                autoRotate={true}
                scale={1.2}
              />
            ) : (
              <img 
                src={imagePath} 
                alt={name} 
                className="w-full h-full object-cover"
              />
            )}
            
            {/* Button to toggle 3D view */}
            <button 
              onClick={() => setShowModel(!showModel)}
              className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-violet-700 shadow-sm hover:bg-white"
            >
              {showModel ? 'Show Photo' : 'View in 3D'}
            </button>
          </>
        ) : (
          // Regular image if no 3D model available
          <img 
            src={imagePath} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Category badge */}
        <div className="absolute top-2 left-2 bg-violet-100 text-violet-800 text-xs px-2 py-1 rounded-full">
          {category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{name}</h3>
        <div className="mt-1 flex justify-between items-center">
          <p className="text-violet-600 font-semibold">${price.toFixed(2)}</p>
          <Link 
            to={`/product/${id}`}
            className="text-sm text-violet-600 hover:text-violet-800"
          >
            View Details
          </Link>
        </div>
        <p className="mt-2 text-sm text-gray-500 line-clamp-2">{description}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
