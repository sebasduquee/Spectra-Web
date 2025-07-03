import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n/config';

const StructuredData = ({ type = 'organization', data = {} }) => {
  const { t, i18n } = useTranslation();

  // Get current language and pricing data
  const currentLanguage = i18n.language;
  const getPricingData = (language) => {
    if (language === 'en') {
      return {
        currency: 'USD',
        prices: { silver: 1600, gold: 2600, diamond: 3700 }
      };
    } else {
      return {
        currency: 'COP',
        prices: { silver: 1600000, gold: 2600000, diamond: 3700000 }
      };
    }
  };

  const pricingData = getPricingData(currentLanguage);

  const getOrganizationData = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Spectrum AI",
    "alternateName": "Spectrum",
    "url": "https://spectrumai.com.co",
    "logo": "https://spectrumai.com.co/images/brand/logo.svg",
    "image": "https://spectrumai.com.co/images/brand/preview-image.jpg",
    "description": t('seo.defaultDescription'),
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Cra. 32 #13-49",
      "addressLocality": "El Poblado",
      "addressRegion": "Antioquia",
      "addressSubregion": "Medellín",
      "postalCode": "050021",
      "addressCountry": "CO"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+57-322-534-0550",
      "contactType": "customer service",
      "email": "contacto@spectrumai.com.co",
      "availableLanguage": ["Spanish", "English"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/spectrum-ai",
      "https://www.instagram.com/spectrumai",
      "https://twitter.com/spectrumai"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Colombia"
    }
  });

  const getServiceData = () => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Spectrum AI Platform",
    "description": t('seo.defaultDescription'),
    "provider": {
      "@type": "Organization",
      "name": "Spectrum AI",
      "url": "https://spectrumai.com.co"
    },
    "serviceType": "AI Assistance Platform",
    "category": "Technology",
    "areaServed": {
      "@type": "Country",
      "name": "Colombia"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Spectrum Plans",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": t('pricing.plans.silver.name'),
          "description": "Plan básico con asistencia AI y gestión contable",
          "price": pricingData.prices.silver,
          "priceCurrency": pricingData.currency,
          "priceValidUntil": "2025-12-31",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "Spectrum AI"
          }
        },
        {
          "@type": "Offer",
          "name": t('pricing.plans.gold.name'),
          "description": "Plan completo con todos los servicios incluidos",
          "price": pricingData.prices.gold,
          "priceCurrency": pricingData.currency,
          "priceValidUntil": "2025-12-31",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "Spectrum AI"
          }
        },
        {
          "@type": "Offer",
          "name": t('pricing.plans.diamond.name'),
          "description": "Plan premium con servicios exclusivos",
          "price": pricingData.prices.diamond,
          "priceCurrency": pricingData.currency,
          "priceValidUntil": "2025-12-31",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "Spectrum AI"
          }
        }
      ]
    }
  });

  const getWebPageData = () => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": t('seo.defaultTitle'),
    "description": t('seo.defaultDescription'),
    "url": window.location.href,
    "inLanguage": i18n.language,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Spectrum AI",
      "url": "https://spectrumai.com.co",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://spectrumai.com.co/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    "mainEntity": {
      "@type": "Organization",
      "name": "Spectrum AI"
    }
  });

  const getSoftwareApplicationData = () => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Spectrum AI Platform",
    "description": t('seo.defaultDescription'),
    "url": "https://spectrumai.com.co",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": pricingData.prices.silver,
      "priceCurrency": pricingData.currency,
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Organization",
      "name": "Spectrum AI"
    }
  });

  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return getOrganizationData();
      case 'service':
        return getServiceData();
      case 'webpage':
        return getWebPageData();
      case 'software':
        return getSoftwareApplicationData();
      default:
        return { ...getOrganizationData(), ...data };
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(getStructuredData())}
      </script>
    </Helmet>
  );
};

export default StructuredData;