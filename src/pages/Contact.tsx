import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageCircle,
  Heart,
  Star,
  Award,
  Globe,
  Truck,
  Shield
} from 'lucide-react';

// Background image
import { HeroFlowers } from '../assets/images';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Our Boutique",
      content: "123 Luxury Lane, Downtown Dubai\nDubai, UAE 00000",
      link: "https://maps.google.com",
      linkText: "Get Directions"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      content: "+971 4 123 4567\n+971 50 123 4567 (WhatsApp)",
      link: "tel:+97141234567",
      linkText: "Call Now"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      content: "hello@daffofils.com\nsupport@daffofils.com",
      link: "mailto:hello@daffofils.com",
      linkText: "Send Email"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      content: "Monday - Saturday: 8:00 AM - 8:00 PM\nSunday: 10:00 AM - 6:00 PM",
      link: "",
      linkText: ""
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'custom', label: 'Custom Arrangement' },
    { value: 'wedding', label: 'Wedding Flowers' },
    { value: 'corporate', label: 'Corporate Events' },
    { value: 'delivery', label: 'Delivery Questions' },
    { value: 'complaint', label: 'Complaint/Feedback' }
  ];

  const companyStats = [
    { icon: <Award className="w-8 h-8" />, number: "15+", label: "Years of Excellence" },
    { icon: <Globe className="w-8 h-8" />, number: "2", label: "Countries Sourcing" },
    { icon: <Truck className="w-8 h-8" />, number: "24/7", label: "Delivery Service" },
    { icon: <Shield className="w-8 h-8" />, number: "100%", label: "Satisfaction Guarantee" }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Daffofils Flowers | Premium Florist in Dubai, UAE</title>
        <meta 
          name="description" 
          content="Contact Daffofils, Dubai's premier luxury florist. Specializing in Scottish thistles and Colombian roses. 15+ years experience, same-day delivery, custom arrangements." 
        />
        <meta 
          name="keywords" 
          content="contact florist Dubai, luxury flowers UAE, Scottish thistles Dubai, Colombian roses, wedding flowers Dubai, corporate events flowers, same day flower delivery Dubai" 
        />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Contact Daffofils Flowers | Premium Florist in Dubai" />
        <meta property="og:description" content="Get in touch with Dubai's luxury florist specializing in premium Scottish and Colombian flowers. Expert arrangements for all occasions." />
        <meta property="og:type" content="business.business" />
        <meta property="og:url" content="https://daffofils.com/contact" />
        <meta property="og:image" content="https://daffofils.com/images/contact-hero.jpg" />
        <meta property="og:locale" content="en_AE" />
        <meta property="og:site_name" content="Daffofils Flowers" />
        
        {/* Business Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Florist",
            "name": "Daffofils Flowers",
            "description": "Dubai's premier luxury florist specializing in Scottish thistles and Colombian roses with over 15 years of experience.",
            "url": "https://daffofils.com",
            "logo": "https://daffofils.com/logo.png",
            "image": "https://daffofils.com/images/shop-front.jpg",
            "telephone": "+971-4-123-4567",
            "email": "hello@daffofils.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Luxury Lane, Downtown Dubai",
              "addressLocality": "Dubai",
              "addressCountry": "AE",
              "postalCode": "00000"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "25.2048",
              "longitude": "55.2708"
            },
            "openingHours": [
              "Mo-Sa 08:00-20:00",
              "Su 10:00-18:00"
            ],
            "priceRange": "$$$$",
            "servesCuisine": [],
            "acceptsReservations": true,
            "currenciesAccepted": "AED, USD",
            "paymentAccepted": "Cash, Credit Card, Online Payment",
            "areaServed": {
              "@type": "City",
              "name": "Dubai"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Flower Arrangements",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Scottish Thistle Arrangements"
                  }
                },
                {
                  "@type": "Offer", 
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Colombian Rose Bouquets"
                  }
                }
              ]
            },
            "foundingDate": "2009",
            "founder": {
              "@type": "Person",
              "name": "Master Florist Team"
            },
            "numberOfEmployees": "25-50",
            "slogan": "Extraordinary Blooms from Scotland to Colombia"
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat scale-105"
            style={{ 
              backgroundImage: `url(${HeroFlowers})`,
              filter: 'brightness(0.4) contrast(1.2)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/80 via-purple-900/60 to-pink-900/80" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="block">Get In</span>
              <span className="block text-yellow-400 font-serif italic">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Experience the art of exceptional floristry. Let us create something extraordinary for your special moments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Overview Section */}
      <section className="py-20 bg-gradient-to-br from-white to-violet-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-violet-900 mb-6">
              About Daffofils Flowers
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-pink-500 mx-auto mb-8"></div>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              For over 15 years, Daffofils has been Dubai's premier destination for luxury floristry. 
              We specialize in importing the finest Scottish thistles and Colombian roses, creating 
              bespoke arrangements that transform moments into memories.
            </p>
          </motion.div>

          {/* Company Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {companyStats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-violet-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-violet-100"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center">
              <Heart className="w-12 h-12 text-pink-500 mx-auto mb-6" />
              <h3 className="text-2xl md:text-3xl font-bold text-violet-900 mb-6">Our Mission</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                "We believe that flowers are more than decorations—they are expressions of love, 
                celebration, and life's most precious moments. Our commitment is to source the world's 
                finest blooms and craft them into arrangements that speak to the heart and elevate every occasion."
              </p>
              <div className="flex items-center justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
                <span className="ml-2 text-gray-600 font-medium">Trusted by 5,000+ customers</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="py-20 bg-gradient-to-br from-violet-50 to-purple-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-violet-900 mb-8">
                Visit Our Luxury Boutique
              </h2>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Step into our elegant showroom where artistry meets nature. Our master florists are ready 
                to help you create the perfect arrangement for any occasion.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                      {info.icon}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-violet-900 mb-2">{info.title}</h3>
                      <p className="text-gray-600 whitespace-pre-line mb-3">{info.content}</p>
                      {info.link && (
                        <a
                          href={info.link}
                          className="inline-flex items-center text-violet-600 hover:text-violet-800 font-medium transition-colors"
                        >
                          {info.linkText}
                          <Send className="w-4 h-4 ml-1" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-violet-100">
                <div className="flex items-center mb-6">
                  <MessageCircle className="w-8 h-8 text-violet-600 mr-3" />
                  <h2 className="text-2xl md:text-3xl font-bold text-violet-900">
                    Send Us a Message
                  </h2>
                </div>

                {submitStatus === 'success' && (
                  <motion.div
                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="flex items-center text-green-800">
                      <Heart className="w-5 h-5 mr-2" />
                      <span className="font-medium">Thank you! We'll get back to you within 24 hours.</span>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
                        placeholder="+971 50 123 4567"
                      />
                    </div>
                    <div>
                      <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                        Inquiry Type
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
                      >
                        {inquiryTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Tell us about your floral needs, special occasion, or any questions you have..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending Message...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </div>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-violet-900 mb-6">
              Our Signature Services
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-pink-500 mx-auto mb-8"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Scottish Thistle Collections",
                description: "Authentic thistles imported directly from the Scottish Highlands, arranged with traditional craftsmanship.",
                features: ["Imported within 48 hours", "Traditional arrangements", "Cultural authenticity"]
              },
              {
                title: "Colombian Rose Elegance", 
                description: "Premium long-stem roses from Colombia's finest farms, known for their exceptional beauty and longevity.",
                features: ["60cm long stems", "14-day freshness guarantee", "Master florist arrangements"]
              },
              {
                title: "Bespoke Event Design",
                description: "Custom floral designs for weddings, corporate events, and special celebrations throughout Dubai.",
                features: ["Consultation included", "Same-day delivery", "Setup service available"]
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-8 border border-violet-100 hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold text-violet-900 mb-4">{service.title}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-violet-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-violet-900 mb-4">
              Find Us in Dubai
            </h2>
            <p className="text-gray-700">Located in the heart of Downtown Dubai</p>
          </div>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="h-96">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7220.343022625677!2d55.27434803348793!3d25.197437910842606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682829c85c07%3A0xa5eda9fb3c93b69d!2sDubai%20Mall!5e0!3m2!1sen!2s!4v1755907770150!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Daffofils Flowers Location - Dubai Mall Area"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
