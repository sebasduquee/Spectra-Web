
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Users, TrendingUp, Headphones, Zap } from 'lucide-react';

const BenefitCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300"
  >
    <div className="w-16 h-16 bg-[#CBDFF4]/20 rounded-xl flex items-center justify-center mb-6">
      <Icon className="w-8 h-8 text-[#CBDFF4]" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
    <p className="text-white/70 leading-relaxed">{description}</p>
  </motion.div>
);

const WhySpectrumSection = () => {
  const { t } = useTranslation();
  
  const benefits = [
    {
      icon: Users,
      title: t('whySpectrum.benefits.community.title'),
      description: t('whySpectrum.benefits.community.description'),
      delay: 0.2
    },
    {
      icon: TrendingUp,
      title: t('whySpectrum.benefits.growth.title'),
      description: t('whySpectrum.benefits.growth.description'),
      delay: 0.4
    },
    {
      icon: Headphones,
      title: t('whySpectrum.benefits.support.title'),
      description: t('whySpectrum.benefits.support.description'),
      delay: 0.6
    },
    {
      icon: Zap,
      title: t('whySpectrum.benefits.technology.title'),
      description: t('whySpectrum.benefits.technology.description'),
      delay: 0.8
    }
  ];

  return (
    <section className="py-24 px-6" id="why-spectrum">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('whySpectrum.title')}
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            {t('whySpectrum.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              {...benefit}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySpectrumSection;
