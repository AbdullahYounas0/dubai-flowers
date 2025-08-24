import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartIcon } from '../cart/CartIcon';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Handle scroll event to add sticky styles
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="font-heading text-2xl font-bold text-primary-700">
            Daffofils
          </span>
          <span className="font-heading text-lg text-secondary-500 ml-1">
            Flowers Shop
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" active={location.pathname === '/'}>Home</NavLink>
          <NavLink to="/flowers" active={location.pathname === '/flowers'}>3D Gallery</NavLink>
          <NavLink to="/scottish" active={location.pathname === '/scottish'}>Scottish</NavLink>
          <NavLink to="/colombian" active={location.pathname === '/colombian'}>Colombian</NavLink>
          <NavLink to="/contact" active={location.pathname === '/contact'}>Contact</NavLink>
          
          <div className="flex items-center space-x-4 ml-4">
            <CartIcon />
            <Link 
              to="/flowers" 
              className="btn-primary"
            >
              Explore 3D Gallery
            </Link>
          </div>
        </nav>
        
        {/* Mobile Navigation - Cart Icon + Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <CartIcon />
          <button 
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white absolute w-full shadow-lg py-5 px-4 top-full left-0 fade-in">
          <nav className="flex flex-col space-y-4">
            <MobileNavLink to="/">Home</MobileNavLink>
            <MobileNavLink to="/flowers">3D Gallery</MobileNavLink>
            <MobileNavLink to="/scottish">Scottish</MobileNavLink>
            <MobileNavLink to="/colombian">Colombian</MobileNavLink>
            <MobileNavLink to="/contact">Contact</MobileNavLink>
            
            <Link 
              to="/flowers" 
              className="btn-primary w-full text-center mt-4"
            >
              Explore 3D Gallery
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

// Desktop navigation link component
const NavLink = ({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) => (
  <Link 
    to={to}
    className={`relative font-medium text-sm transition-colors duration-200 ${
      active 
        ? 'text-primary-700' 
        : 'text-gray-700 hover:text-primary-600'
    }`}
  >
    {children}
    {active && (
      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-600 rounded"></span>
    )}
  </Link>
);

// Mobile navigation link component
const MobileNavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link 
    to={to}
    className="block py-2 px-4 text-gray-700 hover:bg-gray-50 rounded"
  >
    {children}
  </Link>
);

export default Header;
