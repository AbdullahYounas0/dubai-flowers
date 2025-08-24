import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Plus, Minus, Check } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    inStock?: boolean;
  };
  className?: string;
  showQuantitySelector?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline';
}

export function AddToCartButton({ 
  product, 
  className = '', 
  showQuantitySelector = true,
  size = 'md',
  variant = 'primary'
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = async () => {
    if (!product.inStock) return;
    
    setIsAdding(true);
    
    // Add to cart
    addToCart(product, quantity);
    
    // Show success state
    setTimeout(() => {
      setIsAdding(false);
      setJustAdded(true);
      
      // Reset success state
      setTimeout(() => {
        setJustAdded(false);
      }, 2000);
    }, 500);
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:from-rose-600 hover:to-pink-700 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white',
  };

  if (!product.inStock) {
    return (
      <div className={`${sizeClasses[size]} bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed ${className}`}>
        Out of Stock
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Quantity Selector */}
      {showQuantitySelector && (
        <div className="flex items-center bg-white rounded-lg border shadow-sm">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
            disabled={quantity <= 1}
          >
            <Minus size={16} />
          </button>
          <span className="px-3 py-1 min-w-[3rem] text-center font-semibold">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      )}

      {/* Add to Cart Button */}
      <motion.button
        onClick={handleAddToCart}
        disabled={isAdding || justAdded}
        className={`
          ${sizeClasses[size]} 
          ${variantClasses[variant]}
          rounded-lg font-semibold transition-all duration-300 
          disabled:opacity-70 disabled:cursor-not-allowed
          flex items-center space-x-2 min-w-[140px] justify-center
          ${className}
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        animate={isAdding ? { 
          background: ['linear-gradient(to right, #059669, #047857)', 'linear-gradient(to right, #10b981, #059669)'],
          transition: { duration: 0.5, repeat: Infinity, repeatType: 'reverse' }
        } : {}}
      >
        <motion.div
          animate={isAdding ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.5 }}
        >
          {justAdded ? (
            <Check size={20} className="text-green-100" />
          ) : (
            <ShoppingBag size={20} />
          )}
        </motion.div>
        
        <span>
          {isAdding ? 'Adding...' : justAdded ? 'Added!' : 'Add to Cart'}
        </span>

        {/* Flower petals animation */}
        {justAdded && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, x: '50%', y: '50%' }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0.5],
                  x: [50, 50 + (Math.random() - 0.5) * 200],
                  y: [50, 50 + (Math.random() - 0.5) * 200],
                }}
                transition={{ 
                  duration: 1.5,
                  delay: i * 0.1,
                }}
                className="absolute w-3 h-3 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full"
                style={{
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            ))}
          </div>
        )}
      </motion.button>
    </div>
  );
}
