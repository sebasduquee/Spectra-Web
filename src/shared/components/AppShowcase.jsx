
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DeviceFrame from './DeviceFrame';

const AppShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const screens = [
    { image: "/images/app/dashboard.png" },
    { image: "/images/app/concierge.png" },
    { image: "/images/app/accounting.png" },
    { image: "/images/app/legal.png" },
    { image: "/images/app/investments.png" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screens.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex justify-start items-center pr-10">
      {/* Left Phone */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative z-0 scale-[0.45] -mr-16"
      >
        <DeviceFrame size="normal">
          <img
            src={screens[(currentIndex + screens.length - 1) % screens.length].image}
            alt="App Screenshot"
            className="w-full h-full object-cover rounded-[38px]"
          />
        </DeviceFrame>
      </motion.div>

      {/* Center Phone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 scale-[1.3]"
      >
        <DeviceFrame size="large">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={screens[currentIndex].image}
              alt="App Screenshot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-cover rounded-[38px]"
            />
          </AnimatePresence>
        </DeviceFrame>
      </motion.div>

      {/* Right Phone */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative z-0 scale-[0.45] -ml-16"
      >
        <DeviceFrame size="normal">
          <img
            src={screens[(currentIndex + 1) % screens.length].image}
            alt="App Screenshot"
            className="w-full h-full object-cover rounded-[38px]"
          />
        </DeviceFrame>
      </motion.div>

      {/* Indicators */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 pr-10">
        {screens.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
              index === currentIndex ? 'bg-[#CBDFF4]' : 'bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AppShowcase;
