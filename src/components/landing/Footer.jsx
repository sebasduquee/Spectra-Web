// src/components/landing/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useScrollTo } from "../../hooks/useScrollTo";

const Footer = () => {
  const scrollTo = useScrollTo();
  const { t } = useTranslation();
  return (
    <footer className="bg-[#090744]/95 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <img 
              src="/images/brand/logo.svg" 
              alt="SPECTRUM" 
              className="h-12 mb-6" 
            />
            <p className="text-white/70 max-w-sm mb-6">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              {/* Redes sociales */}
              <a 
                href="https://www.instagram.com/spectrumai.co" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <svg className="w-5 h-5 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="text-white font-medium mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollTo('#features')}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {t('nav.features')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#pricing')}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {t('nav.pricing')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('#testimonials')}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Testimonios
                </button>
              </li>
              <li>
                <Link 
                  to="/admin/login"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {t('nav.adminPortal')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-white font-medium mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-[#CBDFF4]" />
                <span className="text-white/70">Medellín, Colombia</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#CBDFF4]" />
                <a href="mailto:clientespr@spectrumai.com.co" className="text-white/70 hover:text-white transition-colors">
                  clientespr@spectrumai.com.co
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#CBDFF4]" />
                <a href="tel:+573225340550" className="text-white/70 hover:text-white transition-colors">
                  +57 322 53 40 550
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © 2024 Spectrum. {t('footer.allRightsReserved')}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/politica-privacidad" className="text-white/60 hover:text-white text-sm">
                {t('footer.privacyPolicy')}
              </Link>
              <Link to="/terminos-y-condiciones" className="text-white/60 hover:text-white text-sm">
                {t('footer.termsOfService')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;