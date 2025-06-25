import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useScrollTo } from '../hooks/useScrollTo';
import GradientBackground from '../components/shared/GradientBackground';
import FeaturesSection from '../components/landing/FeaturesSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import PricingSection from '../components/landing/PricingSection';
import AppShowcase from '../components/shared/AppShowcase';
import GallerySection from '../components/landing/GallerySection';
import Footer from '../components/landing/Footer';
import ContactSection from '../components/landing/ContactSection';


const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollTo = useScrollTo();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <GradientBackground className="min-h-screen w-full">
      {/* Navbar con fondo dinámico */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-50 ${  
            isScrolled 
              ? 'bg-[#090744]/95 backdrop-blur-md shadow-lg py-4' 
              : 'bg-transparent py-8'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-white text-3xl font-bold">
            <img 
              src="/images/brand/logo.svg" 
              alt="SPECTRUM" 
              className="h-12" 
            />
          </div>
          <div className="hidden md:flex items-center space-x-12">
            <button 
              onClick={() => scrollTo('#features')}
              className="text-white/80 hover:text-white transition-colors"
            >
              Características
            </button>
            <button 
              onClick={() => scrollTo('#pricing')}
              className="text-white/80 hover:text-white transition-colors"
            >
              Planes
            </button>
            <Link to="/admin/login" className="px-8 py-3 bg-[#CBDFF4] text-[#010129] rounded-full font-medium hover:opacity-90 transition-all">
              Admin Portal
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="relative pt-28 pb-32 px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Column - Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 lg:pr-8"
            >
              {/* <span className="inline-block px-6 py-2 bg-white/5 text-white/80 rounded-full text-sm mb-8">
                Plataforma Todo en Uno
              </span> */}
              
              <h1 className="text-6xl md:text-l font-bold text-white mb-8">
                Tu gestión 360° como creador<br/>
              </h1>
              <p className="text-l text-white/70 max-w-xl mb-12">
                Hacemos tu vida más fácil a través de nuestros servicios de asistente virtual, gestión contable y financiera, jurídica, inversiones, estrategia de media y mucho más en una sola plataforma.
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => scrollTo('#contactSection')}
                  className="px-8 py-4 bg-[#CBDFF4] text-[#010129] rounded-xl font-medium hover:bg-[#CBDFF4]/90 transition-all"
                >
                  Empezar Ahora
                </button>
                <button className="px-8 py-4 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-all">
                  Ver Demo
                </button>
              </div>
            </motion.div>

            {/* Right Column - App Showcase */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:flex-1 flex justify-center items-center pt-8 lg:pt-0 -mr-20"
            >
              <AppShowcase />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Rest of sections */}
      <FeaturesSection />
      <GallerySection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </GradientBackground>
  );
};

export default LandingPage;