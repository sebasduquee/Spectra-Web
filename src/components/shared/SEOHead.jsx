
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SEOHead = ({ 
  title, 
  description, 
  keywords,
  image = "https://spectrumai.com.co/images/brand/preview-image.jpg",
  url = "https://spectrumai.com.co/",
  type = "website"
}) => {
  const { t, i18n } = useTranslation();
  
  const currentLang = i18n.language || 'es';
  const alternateUrl = currentLang === 'es' ? 'https://spectrumai.com.co/en' : 'https://spectrumai.com.co/';
  
  const siteTitle = title || t('seo.title');
  const siteDescription = description || t('seo.description');
  const siteKeywords = keywords || t('seo.keywords');

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={currentLang} />
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      <meta name="author" content="Spectrum AI Zomac S.A.S" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
      
      {/* Language alternates */}
      <link rel="alternate" hrefLang="es" href="https://spectrumai.com.co/" />
      <link rel="alternate" hrefLang="en" href="https://spectrumai.com.co/en" />
      <link rel="alternate" hrefLang="x-default" href="https://spectrumai.com.co/" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={currentLang === 'es' ? 'es_CO' : 'en_US'} />
      <meta property="og:site_name" content="Spectrum" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={siteDescription} />
      <meta property="twitter:image" content={image} />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Spectrum AI Zomac S.A.S",
          "alternateName": "Spectrum",
          "url": "https://spectrumai.com.co",
          "logo": "https://spectrumai.com.co/images/brand/logo.svg",
          "description": siteDescription,
          "founder": {
            "@type": "Organization",
            "name": "Spectrum AI Zomac S.A.S"
          },
          "foundingDate": "2024",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "CO",
            "addressLocality": "Colombia"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "availableLanguage": ["Spanish", "English"]
          },
          "sameAs": [
            "https://www.instagram.com/spectrumai.co"
          ],
          "serviceType": [
            "AI Assistance",
            "Accounting Services", 
            "Legal Services",
            "Investment Advisory",
            "Media Strategy"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
