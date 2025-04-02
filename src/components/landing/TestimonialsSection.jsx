import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialCard = ({ testimonial, isActive }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.95 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.5 }}
    className={`absolute inset-0 ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
  >
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 md:p-8">
      <Quote className="w-10 h-10 text-[#CBDFF4]/30 mb-4" />
      <blockquote className="text-xl md:text-2xl text-white/90 font-light leading-relaxed mb-8">
        "{testimonial.quote}"
      </blockquote>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10">
          <img
            src={`/images/testimonials/${testimonial.image}`}
            alt={testimonial.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.style.backgroundColor = '#CBDFF4';
            }}
          />
        </div>
        <div>
          <div className="text-white font-medium">{testimonial.name}</div>
          <div className="text-white/60 text-sm">{testimonial.role}</div>
        </div>
      </div>
    </div>
  </motion.div>
);

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: "Spectrum ha transformado por completo la forma en que manejo mi contenido. El asistente AI y la gestión contable me ahorran horas cada semana.",
      name: "Ana Martínez",
      role: "Content Creator - 500K seguidores",
      image: "creator1.jpg"
    },
    {
      quote: "La asesoría legal y financiera me ha dado la tranquilidad que necesitaba. Ahora puedo concentrarme en crear mientras Spectrum se encarga del resto.",
      name: "Carlos Rodriguez",
      role: "YouTuber - 1M suscriptores",
      image: "creator2.jpg"
    },
    {
      quote: "La integración de todos los servicios en una sola plataforma es increíble. El equipo de soporte siempre está disponible cuando los necesito.",
      name: "Laura Gómez",
      role: "Influencer - 750K seguidores",
      image: "creator3.jpg"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 px-4" id="testimonials">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            ¿Qué significa hacer parte de Spectrum?
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Únete a miles de creadores que están transformando su contenido digital
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Cards */}
          <div className="relative h-[350px]">
            <AnimatePresence mode="wait">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  testimonial={testimonial}
                  isActive={index === currentIndex}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-0">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:text-[#CBDFF4] transition-colors" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-[#CBDFF4]' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:text-[#CBDFF4] transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;