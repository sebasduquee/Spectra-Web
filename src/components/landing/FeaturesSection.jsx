import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Shield, BarChart3, Briefcase, BrainCircuit } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    className="text-center px-2"
  >
    <div className="w-20 h-20 rounded-full bg-[#CBDFF4] mx-auto mb-4 flex items-center justify-center">
      <Icon className="w-10 h-10 text-[#090744]" />
    </div>
    <h3 className="text-lg font-bold text-[#090744] mb-2">{title}</h3>
    <p className="text-[#090744]/70 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: BrainCircuit,
      title: "Asistente virtual",
      description: "Asistente personal 24/7 impulsado por AI para resolver todas tus dudas y gestionar tu día a día.",
      delay: 0.2
    },
    {
      icon: Briefcase,
      title: "Gestión Contable",
      description: "Controla tus finanzas con asesoria personalizada, y gestión automática de documentos.",
      delay: 0.4
    },
    {
      icon: Shield,
      title: "Asesoría Legal",
      description: "Te brindamos soporte legal especializado.",
      delay: 0.6
    },
    {
      icon: BarChart3,
      title: "Inversiones",
      description: "Máximiza tus ingresos con estrategias de inversión personalizadas.",
      delay: 0.8
    },
    {
      icon: MessageCircle,
      title: "Estrategia de Media",
      description: "Optimiza tu presencia digital con estrategias de contenido y analisis de datos.",
      delay: 1.0
    }
  ];

  return (
    <section className="py-32 px-6 bg-white" id="features">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"

        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#090744] mb-6">
            Todo lo que necesitas en un solo lugar
          </h2>
          <p className="text-xl text-[#090744]/70 max-w-2xl mx-auto">
            Simplifica tu día a día con nuestras herramientas especializadas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;