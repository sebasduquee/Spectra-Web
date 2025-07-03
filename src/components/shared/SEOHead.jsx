import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SEOHead = ({ 
  title,
  description,
  keywords,
  image = "https://spectrumai.com.co/images/brand/preview-image.jpg",
  url,
  type = "website",
  noIndex = false 
}) => {
  const { t, i18n } = useTranslation();

  // Títulos y descripciones por defecto basados en el idioma
  const defaultTitle = t('seo.defaultTitle', 'Spectrum - Plataforma de asistencia AI para profesionales');
  const defaultDescription = t('seo.defaultDescription', 'Simplifica tu día a día con asistencia AI, gestión contable, legal, inversiones y estrategia de media en una sola plataforma.');
  const defaultKeywords = t('seo.defaultKeywords', 'asistencia AI, gestión contable, servicios legales, inversiones, estrategia digital, automatización, profesionales, Colombia');

  const finalTitle = title ? `${title} | Spectrum` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const currentUrl = url || window.location.href;
  const currentLang = i18n.language || 'es';

  return (
    <Helmet>
      {/* Básico */}
      <html lang={currentLang} />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />

      {/* No index si se requiere */}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="Spectrum" />
      <meta property="og:locale" content={currentLang === 'es' ? 'es_CO' : 'en_US'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={currentUrl} />

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Idiomas alternativos */}
      <link rel="alternate" hrefLang="es" href={currentUrl.replace(/\/en$/, '')} />
      <link rel="alternate" hrefLang="en" href={currentUrl + '/en'} />
      <link rel="alternate" hrefLang="x-default" href={currentUrl.replace(/\/en$/, '')} />
    </Helmet>
  );
};

export default SEOHead;