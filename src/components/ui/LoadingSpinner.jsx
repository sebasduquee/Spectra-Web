
import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', light = false }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };
  
  const colorClasses = light 
    ? 'border-white/10 border-t-white' 
    : 'border-[#090744]/10 border-t-[#090744]';
  
  return (
    <div className="flex items-center justify-center">
      <motion.div 
        className={`${sizeClasses[size]} ${colorClasses} rounded-full animate-spin`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingSpinner;
