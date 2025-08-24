import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';

export function CartIcon() {
  const { cart, toggleCart } = useCart();

  return (
    <motion.button
      onClick={toggleCart}
      className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors duration-300 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Cart Icon */}
      <motion.div
        className="relative"
        animate={cart.totalItems > 0 ? { 
          rotate: [0, -10, 10, -10, 0],
          transition: { duration: 0.5 }
        } : {}}
      >
        <ShoppingBag 
          size={24} 
          className="group-hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.5)] transition-all duration-300" 
        />
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-full bg-primary-400/20 scale-150 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300" />
      </motion.div>

      {/* Badge */}
      <AnimatePresence>
        {cart.totalItems > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              y: [0, -2, 0],
              transition: { 
                scale: { type: "spring", stiffness: 500, damping: 25 },
                y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
              }
            }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg border-2 border-white"
          >
            <motion.span
              key={cart.totalItems}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {cart.totalItems > 99 ? '99+' : cart.totalItems}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating petals animation */}
      <AnimatePresence>
        {cart.totalItems > 0 && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, y: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0.5],
                  y: [-20, -40, -60],
                  x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20],
                }}
                transition={{ 
                  duration: 3,
                  delay: i * 0.5,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                className="absolute top-0 left-1/2 w-2 h-2 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full opacity-70"
                style={{
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
