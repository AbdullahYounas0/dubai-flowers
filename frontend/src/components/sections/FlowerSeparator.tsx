import { useState } from 'react';
import { motion } from 'framer-motion';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import { Link } from 'react-router-dom';

// CSS-based 3D flower animation
const CSS3DFlower = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="relative"
        animate={{ 
          rotateY: [0, 360],
          y: [0, -10, 0]
        }}
        transition={{ 
          rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Flower petals */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-16 bg-gradient-to-t from-pink-400 via-pink-300 to-pink-200 rounded-full opacity-70"
            style={{
              transformOrigin: 'bottom center',
              transform: `rotateZ(${i * 45}deg) translateY(-20px) rotateX(45deg)`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 0.9, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Flower center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-yellow-400 rounded-full shadow-lg" />
      </motion.div>
    </div>
  );
};

const FlowerSeparator = () => {  
  const [tabValue, setTabValue] = useState('tab1');
  
  return (
    <Dialog.Root>
      <Tooltip.Provider delayDuration={300}>
        <section className="relative min-h-[70vh] bg-gradient-to-b from-gray-900 to-primary-900 py-20 overflow-hidden">
          {/* Background flowers CSS3D */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-purple-900 to-violet-800">
            <CSS3DFlower />
            
            {/* Floating particles effect with CSS */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-300 rounded-full opacity-60"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.6, 1, 0.6],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="container-custom relative z-10">
            <div className="flex justify-between items-center h-[60vh]">
              {/* Average button */}
              <motion.div 
                className="w-1/3"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <Link 
                      to="/average-products" 
                      className="group"
                    >
                      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl transform transition-all hover:bg-white/10 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                        <h3 className="font-heading text-4xl text-white mb-4">Average</h3>
                        <div className="w-16 h-1 bg-white/50 mb-4 group-hover:bg-white transition-colors"></div>
                        <p className="text-gray-300">
                          Affordable everyday arrangements for any occasion
                        </p>
                      </div>
                    </Link>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content 
                      className="bg-white/90 backdrop-blur-sm text-primary-900 p-3 rounded-lg shadow-lg"
                      sideOffset={5}
                    >
                      <p>View our standard collection of flower arrangements</p>
                      <Tooltip.Arrow className="fill-white/90" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </motion.div>
              
              {/* Center spacer for rose */}
              <div className="w-1/3 flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                    <motion.div
                      className="text-center text-white"
                      animate={{ 
                        y: [0, -8, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    >
                      <div className="w-16 h-16 mx-auto flex items-center justify-center">
                        <svg className="w-8 h-8 text-secondary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                      <p className="text-sm font-light text-gray-300">Explore Categories</p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
              
              {/* Premium button */}
              <motion.div 
                className="w-1/3 flex justify-end"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <Link 
                      to="/premium-products" 
                      className="group"
                    >
                      <div className="bg-gradient-to-br from-secondary-900/20 to-secondary-800/30 backdrop-blur-md border border-secondary-500/20 p-8 rounded-2xl transform transition-all hover:border-secondary-500/40 hover:scale-105 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)]">
                        <h3 className="font-heading text-4xl text-secondary-300 mb-4">Premium</h3>
                        <div className="w-16 h-1 bg-secondary-500/50 mb-4 group-hover:bg-secondary-500 transition-colors"></div>
                        <p className="text-gray-200">
                          Exquisite artisan arrangements for special moments
                        </p>
                      </div>
                    </Link>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content 
                      className="bg-white/90 backdrop-blur-sm text-primary-900 p-3 rounded-lg shadow-lg"
                      sideOffset={5}
                    >
                      <p>Discover our premium collection of luxury bouquets</p>
                      <Tooltip.Arrow className="fill-white/90" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </motion.div>
            </div>
            
            {/* Section title */}
            <div className="text-center mt-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-white text-3xl md:text-5xl font-heading mb-4">Explore Our Collections</h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Choose between our everyday arrangements or premium artisan designs, each crafted with care and expertise.
                </p>
              </motion.div>
            </div>
            
            {/* Features comparison */}
            <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden">
              <Tabs.Root 
                value={tabValue} 
                onValueChange={setTabValue}
                className="w-full"
              >
                <Tabs.List className="flex border-b border-white/20" aria-label="Compare flower arrangement types">
                  <Tabs.Trigger 
                    value="tab1" 
                    className={`px-5 py-3 text-lg font-medium transition-all ${tabValue === 'tab1' ? 'text-secondary-300 border-b-2 border-secondary-300' : 'text-white/70 hover:text-white'}`}
                  >
                    Average Arrangements
                  </Tabs.Trigger>
                  <Tabs.Trigger 
                    value="tab2" 
                    className={`px-5 py-3 text-lg font-medium transition-all ${tabValue === 'tab2' ? 'text-secondary-300 border-b-2 border-secondary-300' : 'text-white/70 hover:text-white'}`}
                  >
                    Premium Arrangements
                  </Tabs.Trigger>
                </Tabs.List>
                
                <Tabs.Content value="tab1" className="focus:outline-none p-6">
                  <div className="rounded-lg bg-white/5 backdrop-blur-sm p-5">
                    <h3 className="text-xl font-medium mb-3 text-gray-200">Standard Market Bouquets</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center">
                        <span className="mr-2 text-red-500">✗</span> 
                        Mass-produced with limited variety
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-red-500">✗</span> 
                        Pre-arranged designs with less customization
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-red-500">✗</span> 
                        Shorter vase life (3-5 days)
                      </li>
                    </ul>
                  </div>
                </Tabs.Content>
                
                <Tabs.Content value="tab2" className="focus:outline-none p-6">
                  <div className="rounded-lg bg-gradient-to-r from-secondary-900/30 to-secondary-800/30 backdrop-blur-sm p-5">
                    <h3 className="text-xl font-medium mb-3 text-secondary-300">Our Artisan Bouquets</h3>
                    <ul className="space-y-2 text-gray-200">
                      <li className="flex items-center">
                        <span className="mr-2 text-secondary-300">✓</span> 
                        Hand-selected premium blooms from local farms
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-secondary-300">✓</span> 
                        Custom designed by award-winning florists
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-secondary-300">✓</span> 
                        Extended freshness guarantee (7-10 days)
                      </li>
                    </ul>
                    
                    <Dialog.Trigger asChild>
                      <button className="mt-4 px-4 py-2 bg-secondary-500 text-primary-900 rounded-md font-medium hover:bg-secondary-400 transition-colors">
                        Learn More
                      </button>
                    </Dialog.Trigger>
                  </div>
                </Tabs.Content>
              </Tabs.Root>
            </div>
          </div>
          
          {/* Premium info dialog */}
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 max-w-md w-full max-h-[85vh] overflow-auto z-50 shadow-xl">
              <Dialog.Title className="text-2xl font-heading text-primary-900 mb-4">
                Premium Flower Arrangements
              </Dialog.Title>
              <Dialog.Description className="text-gray-600 mb-4">
                Discover what makes our premium flower arrangements truly exceptional.
              </Dialog.Description>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-primary-800 mb-2">Exceptional Quality</h4>
                  <p className="text-gray-600">Our blooms are sourced from specialty growers who focus on developing unique varieties with extraordinary colors, fragrances, and vase life.</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-primary-800 mb-2">Artisan Design</h4>
                  <p className="text-gray-600">Every arrangement is thoughtfully composed with attention to color theory, texture contrast, and seasonal elements to create a truly unique expression.</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-primary-800 mb-2">Luxury Experience</h4>
                  <p className="text-gray-600">From elegant packaging to personalized care instructions, we provide a complete luxury experience that elevates the simple act of giving flowers.</p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Dialog.Close asChild>
                  <button className="bg-primary-800 text-white px-4 py-2 rounded hover:bg-primary-700">
                    Close
                  </button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </section>
      </Tooltip.Provider>
    </Dialog.Root>
  );
};

export default FlowerSeparator;
