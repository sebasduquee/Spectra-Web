
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollTo } from '../../hooks/useScrollTo';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollToElement = useScrollTo();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLinkClick = (id) => {
    closeMobileMenu();
    scrollToElement(id);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#090744]/80 backdrop-blur-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/images/brand/logo.svg" alt="Spectrum" className="h-8" />
          <span className="text-white font-bold text-xl">Spectrum</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <button 
            onClick={() => scrollToElement('#features')} 
            className="text-white/80 hover:text-white transition-colors"
          >
            Características
          </button>
          <button 
            onClick={() => scrollToElement('#howItWorks')} 
            className="text-white/80 hover:text-white transition-colors"
          >
            Cómo funciona
          </button>
          <button 
            onClick={() => scrollToElement('#pricing')} 
            className="text-white/80 hover:text-white transition-colors"
          >
            Precios
          </button>
          <button 
            onClick={() => scrollToElement('#testimonials')} 
            className="text-white/80 hover:text-white transition-colors"
          >
            Testimonios
          </button>
        </nav>
        
        {/* Call to Action Button */}
        <div className="hidden md:block">
          <button 
            onClick={() => scrollToElement('#contactSection')} 
            className="px-5 py-2 bg-[#CBDFF4] text-[#090744] rounded-xl font-medium hover:bg-[#CBDFF4]/90 transition-all"
          >
            Contáctanos
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="p-2 text-white md:hidden"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-[#080639]"
      >
        <div className="px-4 py-5 flex flex-col space-y-4">
          <button 
            onClick={() => handleLinkClick('#features')} 
            className="text-white/80 hover:text-white transition-colors py-2"
          >
            Características
          </button>
          <button 
            onClick={() => handleLinkClick('#howItWorks')} 
            className="text-white/80 hover:text-white transition-colors py-2"
          >
            Cómo funciona
          </button>
          <button 
            onClick={() => handleLinkClick('#pricing')} 
            className="text-white/80 hover:text-white transition-colors py-2"
          >
            Precios
          </button>
          <button 
            onClick={() => handleLinkClick('#testimonials')} 
            className="text-white/80 hover:text-white transition-colors py-2"
          >
            Testimonios
          </button>
          <button 
            onClick={() => handleLinkClick('#contactSection')} 
            className="px-5 py-2 bg-[#CBDFF4] text-[#090744] rounded-xl font-medium hover:bg-[#CBDFF4]/90 transition-all"
          >
            Contáctanos
          </button>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
