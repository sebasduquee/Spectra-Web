import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Lazy loading de traducciones
const loadResources = async (lng) => {
  try {
    const module = await import(`./locales/${lng}.json`);
    return module.default;
  } catch (error) {
    console.warn(`No se pudo cargar el idioma: ${lng}`);
    return {};
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {}, // Inicialmente vacío

    lng: 'es', // idioma por defecto (español)
    fallbackLng: 'es',

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false
    },
    // Configuraciones para carga más rápida
    react: {
      useSuspense: false, // Evita suspense para carga más rápida
    },
    initImmediate: true, // Inicializa inmediatamente
  });

// Cargar idiomas de forma asíncrona
const loadLanguage = async (lng) => {
  if (!i18n.hasResourceBundle(lng, 'translation')) {
    const resources = await loadResources(lng);
    i18n.addResourceBundle(lng, 'translation', resources);
  }
};

// Cargar idioma por defecto
loadLanguage('es');
loadLanguage('en');

export default i18n;