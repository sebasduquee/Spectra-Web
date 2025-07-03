
import { useEffect } from 'react';

const ResourcePreloader = () => {
  useEffect(() => {
    // Precargar imágenes críticas
    const criticalImages = [
      '/images/brand/logo.svg',
      '/images/app/dashboard.png',
      '/images/app/concierge.png'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    // Precargar fuentes críticas
    const criticalFonts = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
    ];

    criticalFonts.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      link.onload = function() { this.rel = 'stylesheet'; };
      document.head.appendChild(link);
    });

  }, []);

  return null;
};

export default ResourcePreloader;
