import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { CheckCircle2, Heart, Gift, ArrowRight } from 'lucide-react';

const CheckoutSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect after 10 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Order Confirmed - Daffofils Flowers</title>
        <meta name="description" content="Your flower order has been confirmed!" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </motion.div>
          
          {/* Success Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Order Confirmed! 🌸
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-gray-600 mb-8 leading-relaxed"
          >
            Thank you for your order! Your beautiful flowers are being prepared with love and care. 
            You'll receive an email confirmation shortly.
          </motion.p>
          
          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <Gift className="w-6 h-6 text-purple-600 mr-2" />
              <span className="font-semibold text-purple-900">Order #FL-2025-0823</span>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Estimated Delivery:</span>
                <span className="font-medium text-gray-900">Tomorrow, 2:00 PM - 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Tracking Email:</span>
                <span className="font-medium text-gray-900">Sent to your inbox</span>
              </div>
            </div>
          </motion.div>
          
          {/* Floating Hearts Animation */}
          <div className="relative overflow-hidden h-16 mb-6">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, x: Math.random() * 200 - 100 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: [20, -60],
                  x: Math.random() * 200 - 100
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.5,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                className="absolute bottom-0 left-1/2"
              >
                <Heart className="w-4 h-4 text-pink-400 fill-current" />
              </motion.div>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              onClick={() => navigate('/')}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-full font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
            >
              Continue Shopping
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              onClick={() => navigate('/flowers')}
              className="w-full border-2 border-purple-200 text-purple-600 py-3 px-6 rounded-full font-medium hover:bg-purple-50 transition-all duration-200"
            >
              View 3D Gallery
            </motion.button>
          </div>
          
          {/* Auto redirect notice */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.6 }}
            className="text-xs text-gray-400 mt-6"
          >
            You'll be redirected to home in 10 seconds
          </motion.p>
        </motion.div>
      </div>
    </>
  );
};

export default CheckoutSuccess;
