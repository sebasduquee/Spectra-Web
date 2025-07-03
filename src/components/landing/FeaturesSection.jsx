import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Shield, BarChart3, Briefcase, BrainCircuit } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const features = [
    {
      icon: BrainCircuit,
      title: t('features.virtualAssistant.title'),
      description: t('features.virtualAssistant.description'),
      delay: 0.2
    },
    {
      icon: Briefcase,
      title: t('features.accounting.title'),
      description: t('features.accounting.description'),
      delay: 0.4
    },
    {
      icon: Shield,
      title: t('features.legal.title'),
      description: t('features.legal.description'),
      delay: 0.6
    },
    {
      icon: BarChart3,
      title: t('features.investments.title'),
      description: t('features.investments.description'),
      delay: 0.8
    },
    {
      icon: MessageCircle,
      title: t('features.mediaStrategy.title'),
      description: t('features.mediaStrategy.description'),
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
            {t('features.title')}
          </h2>
          <p className="text-xl text-[#090744]/70 max-w-2xl mx-auto">
            {t('features.subtitle')}
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