import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Daffofils Flowers Shop</title>
        <meta name="description" content="Sorry, the page you are looking for does not exist." />
      </Helmet>
      
      <section className="min-h-screen flex items-center justify-center bg-gray-50 py-24">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-heading text-6xl md:text-8xl text-primary-600 mb-6">404</h1>
            <h2 className="font-heading text-3xl md:text-4xl mb-4 text-gray-900">Page Not Found</h2>
            <p className="text-lg text-gray-600 max-w-lg mx-auto mb-10">
              Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the URL or the page has been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/" className="btn-primary">
                Return Home
              </Link>
              <Link to="/flowers" className="btn-outline border-primary-600 text-primary-600">
                Explore 3D Gallery
              </Link>
            </div>
          </motion.div>
          
          <div className="mt-20 text-gray-500 text-sm">
            <p>Need assistance? <a href="mailto:info@daffofils.ae" className="text-primary-600 hover:underline">Contact us</a></p>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
