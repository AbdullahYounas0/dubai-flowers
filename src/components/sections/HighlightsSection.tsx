import { forwardRef } from 'react';
import { motion } from 'framer-motion';

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
};

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-elegant hover:shadow-hover p-8 border border-gray-100 hover-scale"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="text-secondary-500 mb-5 text-3xl">{icon}</div>
      <h3 className="font-heading text-2xl mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

type HighlightsSectionProps = React.HTMLAttributes<HTMLDivElement>;

const HighlightsSection = forwardRef<HTMLDivElement, HighlightsSectionProps>((props, ref) => {
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: 'Bespoke Bouquets',
      description: 'Each arrangement is meticulously crafted to your specifications, ensuring a unique expression of your sentiment.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      title: 'Imported Fresh',
      description: 'From the highlands of Scotland to the lush fields of Colombia, our flowers are air-shipped within 48 hours of harvest.',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
        </svg>
      ),
      title: 'Sustainable Care',
      description: 'Our eco-friendly practices and premium plant food ensure your flowers maintain their beauty for weeks.',
    },
  ];
  
  const { className, ...otherProps } = props;
  
  return (
    <section 
      ref={ref} 
      className={`py-24 bg-gray-50 ${className || ''}`}
      {...otherProps}
    >
      <div className="container-custom">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="text-primary-600 text-sm uppercase font-medium tracking-widest">Why Choose Us</span>
          <h2 className="font-heading text-4xl md:text-5xl mt-3 mb-6 text-gray-900">
            Floral Excellence in Every Detail
          </h2>
          <p className="text-gray-600 text-lg">
            Discover why Dubai's most discerning clients trust Daffofils for their most important occasions and everyday luxury.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

HighlightsSection.displayName = 'HighlightsSection';

export default HighlightsSection;
