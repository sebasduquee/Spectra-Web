import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useScrollTo } from '../hooks/useScrollTo';
import LanguageSelector from '../components/shared/LanguageSelector';
import GradientBackground from '../components/shared/GradientBackground';
import FeaturesSection from '../components/landing/FeaturesSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import WhySpectrumSection from '../components/landing/WhySpectrumSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import PricingSection from '../components/landing/PricingSection';
import AppShowcase from '../components/shared/AppShowcase';
import GallerySection from '../components/landing/GallerySection';
import Footer from '../components/landing/Footer';
import ContactSection from '../components/landing/ContactSection';
import SEOHead from '../components/shared/SEOHead';


const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollTo = useScrollTo();
  const { t, ready } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mostrar skeleton mientras cargan las traducciones
  if (!ready) {
    return (
      <GradientBackground className="min-h-screen w-full">
        <SEOHead />
        
        {/* Navbar skeleton */}
        <div className="fixed w-full z-50 bg-[#090744]/95 backdrop-blur-md py-4">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <img 
              src="/images/brand/logo.svg" 
              alt="SPECTRUM" 
              className="h-12 opacity-50" 
            />
            <div className="hidden md:flex items-center space-x-12">
              <div className="h-4 w-20 bg-white/10 rounded animate-pulse"></div>
              <div className="h-4 w-16 bg-white/10 rounded animate-pulse"></div>
              <div className="h-4 w-8 bg-white/10 rounded animate-pulse"></div>
              <div className="h-10 w-32 bg-white/10 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Hero skeleton */}
        <div className="pt-28 pb-32 px-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 lg:pr-8">
                <div className="h-16 bg-white/10 rounded-lg mb-8 animate-pulse"></div>
                <div className="h-6 bg-white/5 rounded-lg mb-4 animate-pulse"></div>
                <div className="h-6 bg-white/5 rounded-lg w-3/4 mb-12 animate-pulse"></div>
                <div className="flex gap-4">
                  <div className="h-12 w-32 bg-white/10 rounded-xl animate-pulse"></div>
                  <div className="h-12 w-32 bg-white/5 rounded-xl animate-pulse"></div>
                </div>
              </div>
              <div className="lg:flex-1 flex justify-center">
                <div className="w-80 h-96 bg-white/5 rounded-3xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading indicator */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full flex items-center space-x-3">
            <div className="w-4 h-4 bg-[#CBDFF4] rounded-full animate-pulse"></div>
            <span className="text-white/70">Cargando...</span>
          </div>
        </div>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground className="min-h-screen w-full">
      <SEOHead />
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
              {t('nav.features')}
            </button>
            <button 
              onClick={() => scrollTo('#pricing')}
              className="text-white/80 hover:text-white transition-colors"
            >
              {t('nav.pricing')}
            </button>
            <LanguageSelector className="text-white/80 hover:text-white" />
            <Link to="/admin/login" className="px-8 py-3 bg-[#CBDFF4] text-[#010129] rounded-full font-medium hover:opacity-90 transition-all">
              {t('nav.adminPortal')}
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
                {t('hero.title')}<br/>
              </h1>
              <p className="text-l text-white/70 max-w-xl mb-12">
                {t('hero.subtitle')}
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => scrollTo('#contactSection')}
                  className="px-8 py-4 bg-[#CBDFF4] text-[#010129] rounded-xl font-medium hover:bg-[#CBDFF4]/90 transition-all"
                >
                  {t('hero.startNow')}
                </button>
                <button 
                  onClick={() => window.open('https://spectrumai.replit.app/', '_blank')}
                  className="px-8 py-4 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-all"
                >
                  {t('hero.viewDemo')}
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
      <WhySpectrumSection />
      <TestimonialsSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </GradientBackground>
  );
};

export default LandingPage;