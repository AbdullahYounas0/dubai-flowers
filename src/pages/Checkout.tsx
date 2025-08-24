import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, CreditCard, Gift, Truck, Star, Heart, CheckCircle2, ArrowLeft, Plus, Minus } from 'lucide-react';
import { 
  ScottishBouquet, 
  ColombianBouquet, 
  BeautifulRosesBouquet, 
  ColorfulFlowersBouquet 
} from '../assets/images';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  type: 'premium' | 'average';
  description: string;
}

interface DeliverySlot {
  date: string;
  time: string;
  available: boolean;
  price: number;
}

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // State management
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
  const [isGift, setIsGift] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });
  
  // Get product info from URL params
  useEffect(() => {
    const productId = searchParams.get('product');
    const productType = searchParams.get('type') as 'premium' | 'average' | null;
    const quantity = parseInt(searchParams.get('quantity') || '1');
    
    if (productId && productType) {
      // Real product data matching the actual products
      const products = {
        premium: [
          {
            id: 'royal-scottish-thistle-collection',
            name: 'Royal Scottish Thistle Collection',
            price: 189.99,
            image: ScottishBouquet,
            description: 'Authentic Scottish thistles imported within 48 hours of harvest, arranged in a premium crystal vase.'
          },
          {
            id: 'colombian-rose-elegance',
            name: 'Colombian Rose Elegance',
            price: 249.99,
            image: ColombianBouquet,
            description: 'Two dozen premium long-stem roses from the highlands of Colombia, arranged by our master florist.'
          },
          {
            id: 'luxury-mixed-bouquet',
            name: 'Luxury Mixed Bouquet',
            price: 299.99,
            image: BeautifulRosesBouquet,
            description: 'Exquisite combination of rare flowers from around the world, handcrafted for discerning clients.'
          },
          {
            id: 'designers-choice-premium',
            name: "Designer's Choice Premium",
            price: 199.99,
            image: ColorfulFlowersBouquet,
            description: 'Premium seasonal arrangement crafted by our head designer with the finest available flowers.'
          }
        ],
        average: [
          {
            id: 'standard-rose-bouquet',
            name: 'Standard Rose Bouquet',
            price: 29.99,
            image: BeautifulRosesBouquet,
            description: 'Beautiful standard roses perfect for everyday occasions. Fresh and vibrant.'
          },
          {
            id: 'simple-daisy-arrangement',
            name: 'Simple Daisy Arrangement',
            price: 19.99,
            image: ColorfulFlowersBouquet,
            description: 'Colorful mixed flower arrangement bringing joy to any space.'
          },
          {
            id: 'basic-tulip-bundle',
            name: 'Basic Tulip Bundle',
            price: 24.99,
            image: ScottishBouquet,
            description: 'Scottish-inspired floral bundle with traditional charm.'
          },
          {
            id: 'mixed-seasonal-flowers',
            name: 'Mixed Seasonal Flowers',
            price: 27.99,
            image: ColombianBouquet,
            description: 'Fresh seasonal flowers in a beautiful arrangement.'
          }
        ]
      };
      
      const product = products[productType]?.find(p => p.id === productId);
      if (product) {
        setOrderItems([{
          ...product,
          quantity,
          type: productType
        }]);
      }
    }
  }, [searchParams]);
  
  // Generate delivery slots for next 7 days
  const generateDeliverySlots = (): DeliverySlot[] => {
    const slots: DeliverySlot[] = [];
    const today = new Date();
    
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const timeSlots = [
        { time: '9:00 AM - 12:00 PM', price: 0, available: true },
        { time: '12:00 PM - 3:00 PM', price: 5, available: Math.random() > 0.3 },
        { time: '3:00 PM - 6:00 PM', price: 5, available: Math.random() > 0.2 },
        { time: '6:00 PM - 9:00 PM', price: 10, available: Math.random() > 0.4 },
      ];
      
      timeSlots.forEach(slot => {
        slots.push({
          date: date.toISOString().split('T')[0],
          time: slot.time,
          available: slot.available,
          price: slot.price
        });
      });
    }
    
    return slots;
  };
  
  const deliverySlots = generateDeliverySlots();
  
  // Calculate totals
  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = deliverySlots.find(slot => 
    slot.date === selectedDate && slot.time === selectedTime
  )?.price || 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryFee + tax;
  
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setOrderItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const removeItem = (id: string) => {
    setOrderItems(items => items.filter(item => item.id !== id));
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };
  
  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };
  
  return (
    <>
      <Helmet>
        <title>Checkout - Daffofils Flowers</title>
        <meta name="description" content="Complete your flower order with our secure checkout" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50 pt-20 pb-12 relative overflow-hidden">
        {/* Floating Flower Animation Background */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0, 
                y: Math.random() * window.innerHeight,
                x: Math.random() * window.innerWidth 
              }}
              animate={{ 
                opacity: [0, 0.6, 0],
                y: [Math.random() * window.innerHeight, -100],
                x: Math.random() * window.innerWidth,
                rotate: 360
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear"
              }}
              className="absolute text-2xl"
            >
              {['🌸', '🌺', '🌻', '🌷', '🥀', '💐'][Math.floor(Math.random() * 6)]}
            </motion.div>
          ))}
        </div>
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Shopping
            </button>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
            <p className="text-gray-600">Complete your beautiful flower order</p>
          </motion.div>
          
          {/* Progress Steps */}
          <div className="flex justify-center mb-12 relative">
            <div className="flex items-center space-x-8">
              {[
                { step: 1, title: 'Order Review', icon: Gift },
                { step: 2, title: 'Delivery', icon: Truck },
                { step: 3, title: 'Payment', icon: CreditCard }
              ].map(({ step, title, icon: Icon }) => (
                <motion.div 
                  key={step} 
                  className="flex items-center relative"
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Sparkle effect for completed steps */}
                  {currentStep > step && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 0] }}
                      transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                      className="absolute -top-2 -right-2 text-yellow-400 text-xl"
                    >
                      ✨
                    </motion.div>
                  )}
                  
                  <motion.div 
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 relative
                      ${currentStep >= step 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                        : 'bg-gray-200 text-gray-500'
                      }
                    `}
                    whileHover={{ 
                      boxShadow: currentStep >= step ? "0 0 25px rgba(147, 51, 234, 0.4)" : undefined 
                    }}
                  >
                    {currentStep > step ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <CheckCircle2 className="w-6 h-6" />
                      </motion.div>
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </motion.div>
                  <span className={`ml-3 font-medium transition-colors ${
                    currentStep >= step ? 'text-purple-600' : 'text-gray-500'
                  }`}>
                    {title}
                  </span>
                  {step < 3 && (
                    <motion.div 
                      className={`w-16 h-1 mx-8 rounded-full ${
                        currentStep > step ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-200'
                      }`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: currentStep > step ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: currentStep > step ? 0.3 : 0 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <AnimatePresence mode="wait">
                  {/* Step 1: Order Review */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="bg-white rounded-2xl shadow-xl p-8"
                    >
                      <div className="flex items-center mb-6">
                        <Gift className="w-8 h-8 text-purple-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">Order Review</h2>
                      </div>
                      
                      {orderItems.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-500">No items in your order</p>
                          <button
                            onClick={() => navigate('/premium')}
                            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                          >
                            Continue Shopping
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {orderItems.map((item) => (
                            <motion.div
                              key={item.id}
                              layout
                              className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
                            >
                              <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                                <div className="flex items-center space-x-2">
                                  <span className={`px-2 py-1 text-xs rounded-full ${
                                    item.type === 'premium' 
                                      ? 'bg-purple-100 text-purple-800' 
                                      : 'bg-blue-100 text-blue-800'
                                  }`}>
                                    {item.type === 'premium' ? 'Premium' : 'Standard'}
                                  </span>
                                  <div className="flex items-center text-yellow-500">
                                    {[...Array(5)].map((_, i) => (
                                      <Star key={i} className="w-4 h-4 fill-current" />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                  <span className="px-3 py-1 font-medium">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>
                                
                                <div className="text-right">
                                  <p className="font-bold text-lg text-gray-900">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    ${item.price.toFixed(2)} each
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                          
                          {/* Gift Option */}
                          <div className="border-t pt-6">
                            <div className="flex items-center mb-4">
                              <input
                                type="checkbox"
                                id="gift-option"
                                checked={isGift}
                                onChange={(e) => setIsGift(e.target.checked)}
                                className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                              />
                              <label htmlFor="gift-option" className="ml-3 flex items-center text-gray-700 font-medium">
                                <Heart className="w-5 h-5 text-red-500 mr-2" />
                                This is a gift
                              </label>
                            </div>
                            
                            {isGift && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-4"
                              >
                                <textarea
                                  placeholder="Enter your gift message..."
                                  value={giftMessage}
                                  onChange={(e) => setGiftMessage(e.target.value)}
                                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                  rows={3}
                                />
                              </motion.div>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                  
                  {/* Step 2: Delivery Scheduling */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="bg-white rounded-2xl shadow-xl p-8"
                    >
                      <div className="flex items-center mb-6">
                        <Truck className="w-8 h-8 text-purple-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">Delivery Schedule</h2>
                      </div>
                      
                      {/* Delivery Address */}
                      <div className="mb-8">
                        <label className="flex items-center text-lg font-medium text-gray-900 mb-3">
                          <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                          Delivery Address
                        </label>
                        <textarea
                          placeholder="Enter your delivery address..."
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                          rows={3}
                          required
                        />
                      </div>
                      
                      {/* Date Selection */}
                      <div className="mb-8">
                        <label className="flex items-center text-lg font-medium text-gray-900 mb-4">
                          <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                          Select Delivery Date
                        </label>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {Array.from(new Set(deliverySlots.map(slot => slot.date))).map((date, index) => (
                            <motion.button
                              key={date}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.02, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setSelectedDate(date)}
                              className={`p-4 rounded-xl border-2 transition-all duration-300 relative overflow-hidden ${
                                selectedDate === date
                                  ? 'border-purple-600 bg-gradient-to-br from-purple-50 to-pink-50 text-purple-700 shadow-lg'
                                  : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25 hover:shadow-md'
                              }`}
                            >
                              {selectedDate === date && (
                                <motion.div
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  className="absolute top-2 right-2 text-purple-600"
                                >
                                  ✨
                                </motion.div>
                              )}
                              
                              <div className="text-center">
                                <div className="font-semibold text-lg">{formatDate(date).split(',')[0]}</div>
                                <div className="text-sm opacity-75 mt-1">
                                  {formatDate(date).split(',')[1]}
                                </div>
                                <div className="text-xs text-purple-600 font-medium mt-2">
                                  {date === new Date(Date.now() + 86400000).toISOString().split('T')[0] 
                                    ? '🚀 Next Day' 
                                    : '📅 Available'
                                  }
                                </div>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      
                          {/* Time Selection */}
                          {selectedDate && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mb-8"
                            >
                              <label className="flex items-center text-lg font-medium text-gray-900 mb-4">
                                <Clock className="w-5 h-5 mr-2 text-purple-600" />
                                Select Delivery Time
                              </label>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {deliverySlots
                                  .filter(slot => slot.date === selectedDate)
                                  .map((slot, index) => (
                                    <motion.button
                                      key={index}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.1 }}
                                      whileHover={{ scale: slot.available ? 1.02 : 1, y: slot.available ? -2 : 0 }}
                                      whileTap={{ scale: slot.available ? 0.98 : 1 }}
                                      onClick={() => slot.available && setSelectedTime(slot.time)}
                                      disabled={!slot.available}
                                      className={`p-4 rounded-xl border-2 transition-all duration-300 relative ${
                                        !slot.available
                                          ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed opacity-60'
                                          : selectedTime === slot.time
                                            ? 'border-purple-600 bg-gradient-to-br from-purple-50 to-pink-50 text-purple-700 shadow-lg'
                                            : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25 hover:shadow-md'
                                      }`}
                                    >
                                      {selectedTime === slot.time && slot.available && (
                                        <motion.div
                                          initial={{ scale: 0, rotate: -180 }}
                                          animate={{ scale: 1, rotate: 0 }}
                                          className="absolute top-2 right-2 text-purple-600"
                                        >
                                          ⏰
                                        </motion.div>
                                      )}
                                      
                                      <div className="flex justify-between items-center">
                                        <div className="text-left">
                                          <span className="font-medium block">{slot.time}</span>
                                          {!slot.available && (
                                            <span className="text-xs text-red-500 mt-1 block">
                                              ❌ Unavailable
                                            </span>
                                          )}
                                        </div>
                                        <div className="text-right">
                                          {slot.price > 0 ? (
                                            <div className="text-sm">
                                              <span className="text-purple-600 font-bold">+${slot.price}</span>
                                              <div className="text-xs text-gray-500">express</div>
                                            </div>
                                          ) : (
                                            <div className="text-sm">
                                              <span className="text-green-600 font-bold">FREE</span>
                                              <div className="text-xs text-gray-500">standard</div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </motion.button>
                                  ))
                                }
                              </div>
                            </motion.div>
                          )}                      {/* Special Instructions */}
                      <div>
                        <label className="text-lg font-medium text-gray-900 mb-3 block">
                          Special Delivery Instructions (Optional)
                        </label>
                        <textarea
                          placeholder="Any special instructions for delivery..."
                          value={specialInstructions}
                          onChange={(e) => setSpecialInstructions(e.target.value)}
                          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                          rows={3}
                        />
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Step 3: Payment */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="bg-white rounded-2xl shadow-xl p-8"
                    >
                      <div className="flex items-center mb-6">
                        <CreditCard className="w-8 h-8 text-purple-600 mr-3" />
                        <h2 className="text-2xl font-bold text-gray-900">Payment Information</h2>
                      </div>
                      
                      {/* Customer Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={customerInfo.name}
                            onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={customerInfo.email}
                            onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={customerInfo.phone}
                            onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Enter your phone number"
                            required
                          />
                        </div>
                      </div>
                      
                      {/* Payment Form */}
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Card Number
                          </label>
                          <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="MM/YY"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              CVV
                            </label>
                            <input
                              type="text"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`px-6 py-3 rounded-lg transition-colors ${
                      currentStep === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Previous
                  </button>
                  
                  <button
                    onClick={currentStep === 3 ? () => {
                      // Handle order submission
                      navigate('/checkout-success');
                    } : nextStep}
                    disabled={
                      (currentStep === 1 && orderItems.length === 0) ||
                      (currentStep === 2 && (!selectedDate || !selectedTime || !deliveryAddress)) ||
                      (currentStep === 3 && (!customerInfo.name || !customerInfo.email || !customerInfo.phone))
                    }
                    className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                      (currentStep === 1 && orderItems.length === 0) ||
                      (currentStep === 2 && (!selectedDate || !selectedTime || !deliveryAddress)) ||
                      (currentStep === 3 && (!customerInfo.name || !customerInfo.email || !customerInfo.phone))
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg'
                    }`}
                  >
                    {currentStep === 3 ? 'Place Order' : 'Continue'}
                  </button>
                </div>
              </div>
              
              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-xl p-6 sticky top-24"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Delivery Information */}
                  {selectedDate && selectedTime && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-purple-50 p-4 rounded-xl mb-6"
                    >
                      <h4 className="font-medium text-purple-900 mb-2">Delivery Details</h4>
                      <div className="text-sm text-purple-700 space-y-1">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDate(selectedDate)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {selectedTime}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Guarantees */}
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      Fresh flower guarantee
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      On-time delivery
                    </div>
                    <div className="flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      100% satisfaction guarantee
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
