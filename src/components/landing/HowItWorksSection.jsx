import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Sparkles, MessageSquare, TrendingUp } from 'lucide-react';

const Step = ({ step, title, description, icon: Icon, isLast, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    className="relative flex gap-8 pb-12"
  >
    {/* Line connector */}
    {!isLast && (
      <div className="absolute left-10 top-16 w-0.5 h-full bg-gradient-to-b from-[#090744]/20 to-transparent" />
    )}

    {/* Icon */}
    <div className="relative z-10">
      <div className="w-20 h-20 rounded-2xl bg-[#CBDFF4] flex items-center justify-center">
        <Icon className="w-8 h-8 text-[#090744]" />
      </div>
    </div>

    {/* Content */}
    <div className="flex-1 pt-2">
      <span className="inline-block px-3 py-1 bg-[#CBDFF4]/20 text-[#090744] text-sm rounded-full mb-4">
        Paso {step}
      </span>
      <h3 className="text-2xl font-semibold text-[#090744] mb-3">{title}</h3>
      <p className="text-[#090744]/70 leading-relaxed max-w-lg">{description}</p>
    </div>
  </motion.div>
);

const HowItWorksSection = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Crea tu cuenta",
      description: "Regístrate en minutos y accede a todas las herramientas que necesitas para llevar tu día a día de manera profesional.",
      delay: 0.2
    },
    {
      icon: Sparkles,
      title: "Personaliza tu experiencia",
      description: "Configura tus módulos según tus necesidades específicas. Desde asistencia AI hasta gestión legal, todo adaptado a tu perfil.",
      delay: 0.4
    },
    {
      icon: MessageSquare,
      title: "Conecta con expertos",
      description: "Accede a nuestro equipo de asesores especializados en cada área. Contadores, abogados y estrategas de media listos para ayudarte.",
      delay: 0.6
    },
    {
      icon: TrendingUp,
      title: "Escala tu negocio",
      description: "Aprovecha nuestras herramientas y asesoría para llevar tu carrera al siguiente nivel.",
      delay: 0.8
    }
  ];

  return (
    <section className="py-24 px-6 bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#090744] mb-6">
            ¿Cómo funciona Spectrum?
          </h2>
          <p className="text-xl text-[#090744]/70 max-w-2xl mx-auto">
            Un proceso simple para transformar la gestión de tu contenido digital
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <Step
              key={index}
              step={index + 1}
              {...step}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;