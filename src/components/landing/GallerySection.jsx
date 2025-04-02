import React from 'react';
import { motion } from 'framer-motion';

const GallerySection = () => {
  const images = [
    {
      src: "/images/gallery/workspace.jpg",
      title: "Gestionamos tu agenda",
      description: "Para que no tengas que preocuparte por nada."
    },
    {
      src: "/images/gallery/team.jpg",
      title: "Equipo dedicado",
      description: "Expertos en cada área listos para ayudarte."
    },
    {
      src: "/images/gallery/analytics.jpg",
      title: "Control de tus finanzas",
      description: "Te ayudamos a tener claridad en tus finanzas personales."
    },
    {
      src: "/images/gallery/mobile.jpg",
      title: "Siempre contigo",
      description: "Accede a toda tu información siempre que lo necesites."
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
            Una plataforma diseñada para ti
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Explora cómo Spectrum puede hacer más simple tu día a día
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
              <img
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