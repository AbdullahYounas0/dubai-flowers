import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import images
import { ScottishBouquet, ColombianBouquet } from '../../assets/images';

type CountryTab = 'scottish' | 'colombian';

const CountriesGallery = () => {
  const [activeTab, setActiveTab] = useState<CountryTab>('scottish');
  
  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="text-primary-600 text-sm uppercase font-medium tracking-widest">Our Collections</span>
          <h2 className="font-heading text-4xl md:text-5xl mt-3 mb-6 text-gray-900">
            The Beauty of Two Worlds
          </h2>
          <p className="text-gray-600 text-lg">
            Experience the rugged elegance of Scotland and the vibrant passion of Colombia in our curated collections.
          </p>
        </motion.div>
        
        {/* Country Tabs */}
        <div className="flex justify-center space-x-4 md:space-x-10 mb-12">
          <CountryTab 
            isActive={activeTab === 'scottish'}
            onClick={() => setActiveTab('scottish')}
            label="Scottish Collection"
            color="bg-scottish-primary"
          />
          <CountryTab 
            isActive={activeTab === 'colombian'}
            onClick={() => setActiveTab('colombian')}
            label="Colombian Collection"
            color="bg-colombian-primary"
          />
        </div>
        
        {/* Country Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1"
          >
            {activeTab === 'scottish' ? (
              <div>
                <h3 className="font-heading text-3xl mb-6 text-scottish-primary">Scottish Highlands</h3>
                <p className="text-gray-700 mb-4">
                  From the rugged highlands comes a collection of flowers that embody the wild beauty and noble spirit of Scotland. Our thistles, heather, and blue delphiniums bring the essence of Scottish landscapes to Dubai.
                </p>
                <p className="text-gray-700 mb-6">
                  Each arrangement is created with authentic Scottish botanicals, offering an elegant resilience and timeless beauty that cannot be found elsewhere in the region.
                </p>
                
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                  <Link 
                    to="/scottish" 
                    className="btn-primary bg-scottish-primary hover:bg-scottish-secondary"
                  >
                    Explore Collection
                  </Link>
                  <Link 
                    to="/flowers?country=scottish" 
                    className="btn-outline border-scottish-primary text-scottish-primary hover:bg-scottish-accent/10"
                  >
                    View in 3D
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-heading text-3xl mb-6 text-colombian-primary">Colombian Passion</h3>
                <p className="text-gray-700 mb-4">
                  The rich soils of Colombia produce some of the world's most vibrant and long-lasting roses. Our collection celebrates the passionate colors and bold expressions that define Colombian floriculture.
                </p>
                <p className="text-gray-700 mb-6">
                  From classic red roses to exotic tropical varieties, our Colombian collection brings South American warmth and emotion to every arrangement.
                </p>
                
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                  <Link 
                    to="/colombian" 
                    className="btn-primary bg-colombian-primary hover:bg-colombian-secondary"
                  >
                    Explore Collection
                  </Link>
                  <Link 
                    to="/flowers?country=colombian" 
                    className="btn-outline border-colombian-primary text-colombian-primary hover:bg-colombian-accent/10"
                  >
                    View in 3D
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
          
          {/* Image Content */}
          <motion.div 
            key={`image-${activeTab}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-2"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant">
              {activeTab === 'scottish' ? (
                <img 
                  src={ScottishBouquet} 
                  alt="Scottish Bouquet with Thistles and Heather" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src={ColombianBouquet} 
                  alt="Vibrant Colombian Roses Arrangement" 
                  className="w-full h-full object-cover"
                />
              )}
              
              <div className={`absolute inset-0 ${
                activeTab === 'scottish' 
                  ? 'bg-gradient-to-tr from-scottish-primary/40 to-transparent'
                  : 'bg-gradient-to-tr from-colombian-primary/40 to-transparent'
              }`} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

type CountryTabProps = {
  isActive: boolean;
  onClick: () => void;
  label: string;
  color: string;
};

const CountryTab = ({ isActive, onClick, label, color }: CountryTabProps) => {
  return (
    <button
      onClick={onClick}
      className={`relative px-6 py-3 font-medium transition-colors duration-200 ${
        isActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
      }`}
    >
      {label}
      {isActive && (
        <motion.div 
          className={`absolute bottom-0 left-0 h-0.5 w-full ${color} rounded-full`}
          layoutId="countryTabIndicator"
        />
      )}
    </button>
  );
};

export default CountriesGallery;
