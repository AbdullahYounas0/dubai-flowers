import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { AddToCartButton } from '../components/cart/AddToCartButton';
import { useCart } from '../contexts/CartContext';
import { ShoppingBag, Package, Heart } from 'lucide-react';
import { 
  BeautifulRosesBouquet, 
  ColorfulFlowersBouquet, 
  ScottishBouquet, 
  ColombianBouquet 
} from '../assets/images';

const testProducts = [
  {
    id: 'test-roses',
    name: 'Beautiful Roses Bouquet',
    price: 89.99,
    image: BeautifulRosesBouquet,
    category: 'Roses',
    inStock: true,
  },
  {
    id: 'test-colorful',
    name: 'Colorful Mixed Flowers',
    price: 129.99,
    image: ColorfulFlowersBouquet,
    category: 'Mixed',
    inStock: true,
  },
  {
    id: 'test-scottish',
    name: 'Scottish Highland Bouquet',
    price: 199.99,
    image: ScottishBouquet,
    category: 'Scottish',
    inStock: true,
  },
  {
    id: 'test-colombian',
    name: 'Colombian Premium Roses',
    price: 249.99,
    image: ColombianBouquet,
    category: 'Colombian',
    inStock: true,
  },
];

export default function CartTest() {
  const { cart, clearCart } = useCart();

  return (
    <>
      <Helmet>
        <title>Cart Test - Daffofils Flowers</title>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🛒 Cart Functionality Test
            </h1>
            <p className="text-gray-600 text-lg">
              Test all cart features: Add items, view cart, manage quantities, and proceed to checkout
            </p>
          </motion.div>

          {/* Cart Status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8 max-w-md mx-auto"
          >
            <div className="text-center">
              <ShoppingBag className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Current Cart Status</h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-semibold">Items:</span> {cart.totalItems}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Total:</span> ${cart.totalPrice.toFixed(2)}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Cart Open:</span> {cart.isOpen ? 'Yes' : 'No'}
                </p>
              </div>
              {cart.totalItems > 0 && (
                <button
                  onClick={clearCart}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Clear Cart
                </button>
              )}
            </div>
          </motion.div>

          {/* Test Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 max-w-4xl mx-auto"
          >
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
              <Package className="w-6 h-6 mr-2" />
              Test Instructions
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-blue-800">
              <div>
                <h4 className="font-semibold mb-2">🛍️ Adding Items:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Click "Add to Cart" on any product below</li>
                  <li>• Watch for flower animation and notification</li>
                  <li>• See cart icon update with item count</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">👀 Viewing Cart:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Click the cart icon in the top navigation</li>
                  <li>• View items in the slide-out panel</li>
                  <li>• Adjust quantities with +/- buttons</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">✏️ Managing Items:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Change quantities in the cart dropdown</li>
                  <li>• Remove items with the trash icon</li>
                  <li>• Watch totals update in real-time</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">💳 Checkout:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Click "Proceed to Checkout" in cart</li>
                  <li>• Complete the 3-step checkout process</li>
                  <li>• Cart clears after successful order</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Test Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {testProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-primary-700 px-2 py-1 rounded-full text-xs font-semibold">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-primary-600">
                      ${product.price}
                    </span>
                    <div className="flex items-center text-yellow-500">
                      <Heart className="w-4 h-4 fill-current" />
                      <Heart className="w-4 h-4 fill-current" />
                      <Heart className="w-4 h-4 fill-current" />
                      <Heart className="w-4 h-4 fill-current" />
                      <Heart className="w-4 h-4 fill-current" />
                    </div>
                  </div>

                  {/* Add to Cart with different configurations */}
                  <div className="space-y-2">
                    <AddToCartButton
                      product={product}
                      variant="primary"
                      size="sm"
                      showQuantitySelector={false}
                      className="w-full"
                    />
                    
                    <div className="text-center">
                      <AddToCartButton
                        product={product}
                        variant="secondary"
                        size="sm"
                        showQuantitySelector={true}
                        className="text-xs"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Success Message */}
          {cart.totalItems > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mt-12"
            >
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 max-w-md mx-auto">
                <div className="text-green-600 text-4xl mb-2">🎉</div>
                <h3 className="text-green-900 font-bold text-lg mb-2">
                  Cart is Working!
                </h3>
                <p className="text-green-700 text-sm">
                  You have {cart.totalItems} item(s) in your cart. 
                  Click the cart icon to manage them or proceed to checkout!
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
