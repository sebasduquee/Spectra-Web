import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollTo } from '../../hooks/useScrollTo';
import i18n from '../../i18n/config';

const PlanCard = ({ plan, isPopular, delay, onContactClick }) => {
  const { t } = useTranslation();
  return (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    className="relative"
  >
    <div className={`h-full p-8 rounded-xl backdrop-blur-xl border flex flex-col ${
      isPopular 
        ? 'bg-[#CBDFF4]/10 border-[#CBDFF4]/30' 
        : 'bg-white/5 border-white/10'
    }`}>
      {isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#CBDFF4] text-[#090744] text-sm font-medium rounded-full">
          {t('pricing.popular')}
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
      <ul className="space-y-5 mb-auto flex-grow">
        {plan.features && plan.features.length > 0 ? (
          plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className={`w-5 h-5 mt-0.5 ${
                isPopular ? 'text-[#CBDFF4]' : 'text-white/60'
              }`} />
              <span className="text-white/80">{feature}</span>
            </li>
          ))
        ) : (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 bg-white/10 rounded animate-pulse"></div>
            ))}
          </div>
        )}
      </ul>

      {/* CTA Button */}
      <div className="mt-10">
        <button 
          onClick={onContactClick} 
          className={`w-full py-4 rounded-xl font-medium transition-colors ${
          isPopular
            ? 'bg-[#CBDFF4] text-[#090744] hover:bg-[#CBDFF4]/90'
            : 'bg-white/10 text-white hover:bg-white/20'
        }`}>
          {t('pricing.startNow')}
        </button>
      </div>
    </div>
  </motion.div>
  );
};

const PricingSection = () => {
  const scrollToElement = useScrollTo();
  const { t, ready } = useTranslation();
  
  // Loading state component
  const LoadingState = () => (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <div className="h-12 bg-white/10 rounded-lg w-96 mx-auto mb-4 animate-pulse"></div>
        <div className="h-6 bg-white/5 rounded-lg w-128 mx-auto animate-pulse"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-96 bg-white/5 rounded-xl animate-pulse"></div>
        ))}
      </div>
    </div>
  );

  // Show loading while translations aren't ready
  if (!ready || !i18n.isInitialized) {
    return (
      <section className="pt-8 pb-16 px-4" id="pricing">
        <LoadingState />
      </section>
    );
  }

  const plans = [
    {
      name: t('pricing.plans.silver.name'),
      price: 1600000,
      features: Array.isArray(t('pricing.plans.silver.features', { returnObjects: true })) 
        ? t('pricing.plans.silver.features', { returnObjects: true })
        : []
    },
    {
      name: t('pricing.plans.gold.name'),
      price: 2600000,
      features: Array.isArray(t('pricing.plans.gold.features', { returnObjects: true }))
        ? t('pricing.plans.gold.features', { returnObjects: true })
        : [],
      isPopular: true
    },
    {
      name: t('pricing.plans.diamond.name'),
      price: 3700000,
      features: Array.isArray(t('pricing.plans.diamond.features', { returnObjects: true }))
        ? t('pricing.plans.diamond.features', { returnObjects: true })
        : []
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
            {t('pricing.title')}
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            {t('pricing.subtitle')}
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
            {t('pricing.customPlan')} {" "}
            <a href="#contact" className="text-[#CBDFF4] hover:underline">
              {t('pricing.contactUs')}
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
            {t('pricing.ctaTitle')}
          </h3>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            {t('pricing.ctaSubtitle')}
          </p>
          <button 
            onClick={() => scrollToElement('#contactSection')}
            className="px-8 py-4 bg-[#CBDFF4] text-[#090744] rounded-xl font-medium hover:bg-[#CBDFF4]/90 transition-all"
          >
            {t('pricing.ctaButton')}
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default PricingSection;
