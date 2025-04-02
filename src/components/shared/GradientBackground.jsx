import React from 'react';
import { motion } from 'framer-motion';

const GradientBackground = ({ children, className }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Gradient Orbs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute top-0 -left-1/4 w-[800px] h-[800px] bg-imperial/30 rounded-full mix-blend-multiply blur-3xl animate-blob"></div>
        <div className="absolute top-0 -right-1/4 w-[800px] h-[800px] bg-cold-blue/30 rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-1/4 left-1/4 w-[600px] h-[600px] bg-cold-blue/20 rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-4000"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GradientBackground;