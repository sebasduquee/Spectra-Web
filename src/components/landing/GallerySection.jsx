import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LazyImage from '../shared/LazyImage';

const GallerySection = () => {
  const { t } = useTranslation();
  
  const images = [
    {
      src: "/images/gallery/workspace.jpg",
      title: t('gallery.workspace.title'),
      description: t('gallery.workspace.description')
    },
    {
      src: "/images/gallery/team.jpg",
      title: t('gallery.team.title'),
      description: t('gallery.team.description')
    },
    {
      src: "/images/gallery/analytics.jpg",
      title: t('gallery.analytics.title'),
      description: t('gallery.analytics.description')
    },
    {
      src: "/images/gallery/mobile.jpg",
      title: t('gallery.mobile.title'),
      description: t('gallery.mobile.description')
    }
  ];

  return (
    <section className="py-24 px-6" id="gallery">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('gallery.title')}
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl aspect-video"
            >
              {/* Imagen */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090744] to-transparent opacity-60 z-10" />
              <LazyImage
                src={image.src}
                alt={image.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Contenido */}
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {image.title}
                </h3>
                <p className="text-white/80">
                  {image.description}
                </p>
              </div>

              {/* Overlay hover */}
              <div className="absolute inset-0 bg-[#CBDFF4]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
            </motion.div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default GallerySection;