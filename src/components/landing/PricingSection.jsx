import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useScrollTo } from '../../hooks/useScrollTo';

const PlanCard = ({ plan, isPopular, delay, onContactClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    className="relative"
  >
    <div className={`h-full p-8 rounded-xl backdrop-blur-xl border ${
      isPopular 
        ? 'bg-[#CBDFF4]/10 border-[#CBDFF4]/30' 
        : 'bg-white/5 border-white/10'
    }`}>
      {isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#CBDFF4] text-[#090744] text-sm font-medium rounded-full">
          Más popular
        </span>
      )}

      {/* Header */}
      <div className="mb-8">
        <h3 className={`text-2xl font-bold ${
          isPopular ? 'text-[#CBDFF4]' : 'text-white'
        }`}>
          {plan.name}
        </h3>
      </div>

      {/* Price */}
      <div className="mb-8">
        <div className="flex items-baseline">
          <span className="text-white text-sm">COP</span>
          <span className="text-3xl font-bold text-white ml-2">
            {new Intl.NumberFormat('es-CO').format(plan.price)}
          </span>
          <span className="text-white/60 ml-2">/mes</span>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-5 mb-10">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className={`w-5 h-5 mt-0.5 ${
              isPopular ? 'text-[#CBDFF4]' : 'text-white/60'
            }`} />
            <span className="text-white/80">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button 
        onClick={onContactClick} 
        className={`w-full py-4 rounded-xl font-medium transition-colors ${
        isPopular
          ? 'bg-[#CBDFF4] text-[#090744] hover:bg-[#CBDFF4]/90'
          : 'bg-white/10 text-white hover:bg-white/20'
      }`}>
        Empezar ahora
      </button>
    </div>
  </motion.div>
);

const PricingSection = () => {
  const scrollToElement = useScrollTo();
  const plans = [
    {
      name: "Plan Silver",
      price: 1600000,
      features: [
        "Asistente personalizado (Concierge AI 100%)",
        "Módulo contabilidad completo",
        "Contador dedicado",
        "Soporte prioritario",
        "Chatbot 24/7"
      ]
    },
    {
      name: "Plan Gold",
      price: 2600000,
      features: [
        "Todo lo del Plan Silver",
        "Módulo legal con abogado dedicado",
        "Módulo inversiones con gestor personal",
        "Soporte premium",
        "Reuniones mensuales de seguimiento"
      ],
      isPopular: true
    },
    {
      name: "Plan Diamond",
      price: 3700000,
      features: [
        "Todo lo del Plan Gold",
        "Módulo Media con guía personalizada",
        "Estrategia integral de contenido",
        "Gestor de cuenta exclusivo",
        "Reuniones semanales de seguimiento"
      ]
    }
  ];

  return (
    <section className="pt-8 pb-16 px-4" id="pricing">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Elige el plan perfecto para ti
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Escogelo a tu medida.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <PlanCard
              key={index}
              plan={plan}
              isPopular={plan.isPopular}
              delay={0.2 + index * 0.1}
              onContactClick={() => scrollToElement('#contactSection')}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-white/60">
            ¿Necesitas un plan personalizado? {" "}
            <a href="#contact" className="text-[#CBDFF4] hover:underline">
              Contáctanos
            </a>
          </p>
        </motion.div>
        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-8"
        >
          <h3 className="text-3xl font-bold text-white mb-6">
            ¿Listo para comenzar?
          </h3>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Chatea con nuestra asistente virtual aquí.
          </p>
          <button 
            onClick={() => scrollToElement('#contactSection')}
            className="px-8 py-4 bg-[#CBDFF4] text-[#090744] rounded-xl font-medium hover:bg-[#CBDFF4]/90 transition-all"
          >
            Comienza aquí
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default PricingSection;