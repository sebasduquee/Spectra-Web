
import { useEffect } from 'react';

export const usePerformance = (componentName) => {
  useEffect(() => {
    // Medir tiempo de carga del componente
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      
      // Solo en desarrollo
      if (process.env.NODE_ENV === 'development') {
        console.log(`${componentName} cargó en ${loadTime.toFixed(2)}ms`);
      }
      
      // Enviar métricas a analytics (si está disponible)
      if (window.gtag) {
        window.gtag('event', 'page_timing', {
          name: componentName,
          value: Math.round(loadTime)
        });
      }
    };
  }, [componentName]);
};

export const reportWebVitals = () => {
  // Core Web Vitals
  if ('web-vital' in window) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    });
  }
};
