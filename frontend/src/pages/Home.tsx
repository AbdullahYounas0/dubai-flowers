import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

// 3D components
import FlowerSeparator from '../components/sections/FlowerSeparator.tsx';
import CountriesGallery from '../components/sections/CountriesGallery.tsx';
import HighlightsSection from '../components/sections/HighlightsSection.tsx';
import ContactSection from '../components/sections/ContactSection.tsx';
import FeaturedProducts from '../components/sections/FeaturedProducts.tsx';

// Hero background image
import { HeroFlowers as HeroBackground } from '../assets/images';

const Home = () => {
  const highlightsRef = useRef<HTMLDivElement>(null);
  
  const scrollToHighlights = () => {
    highlightsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <>
      <Helmet>
        <title>Daffofils Flowers Shop | Premium Florist in Dubai</title>
        <meta name="description" content="Premium flower arrangements and bespoke bouquets from Scotland and Colombia. Dubai's luxury florist specializing in premium imported flowers." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Background with Enhanced Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat scale-105 transform transition-transform duration-30000 animate-slow-zoom"
            style={{ 
              backgroundImage: `url(${HeroBackground})`,
              backgroundPosition: 'center',
              filter: 'brightness(0.85) contrast(1.1)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 via-black/40 to-primary-800/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          {/* Subtle floating particles effect */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white/30"
                style={{
                  width: `${Math.random() * 8 + 2}px`,
                  height: `${Math.random() * 8 + 2}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 10 + 15}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                  opacity: Math.random() * 0.5 + 0.3
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Enhanced Hero Content */}
        <div className="container-custom relative z-10 text-white text-center py-16">
          <motion.div
            className="backdrop-blur-sm bg-black/10 p-8 md:p-3.5 rounded-lg inline-block shadow-[0_0_15px_rgba(0,0,0,0.3)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl mb-6">
                <span className="block text-shadow-lg">Extraordinary</span>
                <span className="block mt-2 text-secondary-300 text-shadow-glow">Blooms</span>
              </h1>
            </motion.div>
            
            <motion.p 
              className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-gray-100 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Importing the finest Scottish thistles and Colombian roses for Dubai's discerning flower enthusiasts
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link 
                to="/flowers" 
                className="btn-primary px-8 py-4 text-lg shadow-lg hover:shadow-xl transform transition hover:-translate-y-1"
              >
                Explore 3D Gallery
              </Link>
              <button 
                onClick={scrollToHighlights} 
                className="btn-outline border-2 border-white text-white px-8 py-4 text-lg hover:bg-white/20 transition-colors shadow-lg"
              >
                Learn More
              </button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Enhanced Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="flex flex-col items-center backdrop-blur-sm bg-black/10 px-6 py-3 rounded-full">
            <span className="text-white text-sm font-medium mb-2 tracking-wider">Scroll to discover</span>
            <div className="w-6 h-12 border-2 border-white/80 rounded-full flex justify-center p-1 shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              <motion.div 
                className="w-2 h-2 bg-secondary-300 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                animate={{ 
                  y: [0, 14, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* 3D Flower Separator */}
      <FlowerSeparator />
      
      {/* Highlights Section */}
      <HighlightsSection ref={highlightsRef} />
      
      {/* Featured Products Section */}
      <FeaturedProducts />
      
      {/* Countries Gallery Section */}
      <CountriesGallery />
      
      {/* Contact Section */}
      <ContactSection />
    </>
  );
};

export default Home;
