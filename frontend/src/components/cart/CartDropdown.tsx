import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

export function CartDropdown() {
  const { cart, updateQuantity, removeFromCart, closeCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeCart();
    }
  };

  return (
    <AnimatePresence>
      {cart.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b bg-gradient-to-r from-primary-50 to-rose-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="text-primary-600" size={24} />
                  <h2 className="text-xl font-bold text-gray-900">
                    Shopping Cart
                  </h2>
                  {cart.totalItems > 0 && (
                    <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-sm font-semibold">
                      {cart.totalItems}
                    </span>
                  )}
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto">
              {cart.items.length === 0 ? (
                // Empty Cart
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-24 h-24 bg-gradient-to-br from-primary-100 to-rose-100 rounded-full flex items-center justify-center mb-4"
                  >
                    <ShoppingBag size={40} className="text-primary-400" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Discover our beautiful flower arrangements
                  </p>
                  <button
                    onClick={() => {
                      closeCart();
                      navigate('/flowers');
                    }}
                    className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Browse Flowers
                  </button>
                </div>
              ) : (
                // Cart Items
                <div className="p-4 space-y-4">
                  {cart.items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex space-x-3">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-sm text-gray-500 mb-2">
                            ${item.product.price.toFixed(2)} each
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-8 text-center font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-primary-600">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </span>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>

                          {/* Customizations */}
                          {item.customizations && (
                            <div className="mt-2 text-xs text-gray-500">
                              {item.customizations.wrappingStyle && (
                                <p>Wrapping: {item.customizations.wrappingStyle}</p>
                              )}
                              {item.customizations.dedicationCard && (
                                <p>Card: {item.customizations.dedicationCard}</p>
                              )}
                              {item.customizations.deliveryDate && (
                                <p>Delivery: {item.customizations.deliveryDate}</p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.items.length > 0 && (
              <div className="border-t bg-gray-50 p-6">
                {/* Total */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-900">
                    Total ({cart.totalItems} items)
                  </span>
                  <span className="text-2xl font-bold text-primary-600">
                    ${cart.totalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <motion.button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={20} />
                </motion.button>

                {/* Continue Shopping */}
                <button
                  onClick={() => {
                    closeCart();
                    navigate('/flowers');
                  }}
                  className="w-full mt-3 text-primary-600 py-2 text-sm font-medium hover:text-primary-700 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
