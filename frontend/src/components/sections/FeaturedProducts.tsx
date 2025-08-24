import { motion } from 'framer-motion';
import { Star, Clock, Truck } from 'lucide-react';
import { AddToCartButton } from '../cart/AddToCartButton';
import { 
  BeautifulRosesBouquet, 
  ColorfulFlowersBouquet, 
  ScottishBouquet, 
  ColombianBouquet 
} from '../../assets/images';

const featuredProducts = [
  {
    id: 'royal-scottish-thistle-collection',
    name: 'Royal Scottish Thistle Collection',
    price: 189.99,
    image: ScottishBouquet,
    category: 'Premium Scottish',
    inStock: true,
    rating: 5,
    deliveryTime: '24-48 hours',
    description: 'Authentic Scottish thistles imported within 48 hours of harvest'
  },
  {
    id: 'colombian-rose-elegance',
    name: 'Colombian Rose Elegance',
    price: 249.99,
    image: ColombianBouquet,
    category: 'Premium Colombian',
    inStock: true,
    rating: 5,
    deliveryTime: '24-48 hours',
    description: 'Two dozen premium long-stem roses from Colombian highlands'
  },
  {
    id: 'luxury-mixed-bouquet',
    name: 'Luxury Mixed Bouquet',
    price: 299.99,
    image: BeautifulRosesBouquet,
    category: 'Luxury Collection',
    inStock: true,
    rating: 5,
    deliveryTime: '24-48 hours',
    description: 'Exquisite combination of rare flowers from around the world'
  },
  {
    id: 'designers-choice-premium',
    name: "Designer's Choice Premium",
    price: 199.99,
    image: ColorfulFlowersBouquet,
    category: 'Designer Special',
    inStock: true,
    rating: 5,
    deliveryTime: '24-48 hours',
    description: 'Premium seasonal arrangement crafted by our head designer'
  }
];

export default function FeaturedProducts() {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-purple-50 to-pink-50">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block text-6xl mb-4"
          >
            🌸
          </motion.div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Featured <span className="text-primary-600">Premium</span> Collection
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our handpicked selection of the finest flowers from Scotland and Colombia, 
            crafted into breathtaking arrangements that speak the language of love and beauty.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              {/* Product Card */}
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:-translate-y-2">
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay with quick actions */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-white text-sm"
                      >
                        <div className="flex items-center mb-2">
                          <Clock size={16} className="mr-2" />
                          <span>{product.deliveryTime}</span>
                        </div>
                        <div className="flex items-center">
                          <Truck size={16} className="mr-2" />
                          <span>Free delivery in Dubai</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-primary-700 px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                      {product.category}
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center shadow-md">
                      <Star size={14} className="text-yellow-500 fill-current mr-1" />
                      <span className="text-sm font-semibold text-gray-800">{product.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-2 leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Price and Rating */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-primary-600">
                        ${product.price}
                      </span>
                      <span className="text-gray-500 text-sm ml-1">USD</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {[...Array(product.rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <AddToCartButton
                    product={product}
                    variant="primary"
                    size="md"
                    showQuantitySelector={false}
                    className="w-full"
                  />
                </div>

                {/* Floating elements animation */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, y: 20 }}
                      whileInView={{ 
                        opacity: [0, 0.6, 0],
                        scale: [0, 1, 0.5],
                        y: [20, -100],
                        x: [0, Math.random() * 50 - 25],
                      }}
                      transition={{ 
                        duration: 3,
                        delay: Math.random() * 2,
                        repeat: Infinity,
                        repeatDelay: 5
                      }}
                      className="absolute top-1/2 left-1/2 w-3 h-3 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.a
            href="/premium-products"
            className="inline-flex items-center bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Premium Flowers
            <motion.span
              className="ml-3 group-hover:translate-x-1 transition-transform duration-300"
            >
              🌺
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
