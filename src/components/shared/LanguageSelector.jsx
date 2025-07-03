
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSelector = ({ className = "" }) => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors ${className}`}
      title={i18n.language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium">
        {i18n.language === 'es' ? 'EN' : 'ES'}
      </span>
    </button>
  );
};

export default LanguageSelector;
