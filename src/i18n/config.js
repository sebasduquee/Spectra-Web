
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar traducciones directamente (síncrono)
import esTranslations from './locales/es.json';
import enTranslations from './locales/en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        translation: esTranslations
      },
      en: {
        translation: enTranslations
      }
    },

    lng: 'es', // idioma por defecto (español)
    fallbackLng: 'es',

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false
    },

    // Configuración para inicialización inmediata
    react: {
      useSuspense: false,
    },
    
    // Asegurar que esté listo desde el inicio
    initImmediate: false,
    
    // Debug para verificar carga
    debug: false,
  });

export default i18n;
