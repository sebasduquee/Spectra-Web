
import React from 'react';
import { motion } from 'framer-motion';

const EmptyState = ({ 
  title = 'No hay datos disponibles', 
  description = 'No se encontraron resultados para mostrar.',
  icon: Icon = null,
  action = null,
  actionLabel = 'Crear nuevo',
  imageUrl = null
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center text-center p-8 my-6"
    >
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt="Estado vacío" 
          className="w-48 h-auto mb-6 opacity-80"
        />
      )}
      
      {Icon && !imageUrl && (
        <div className="w-16 h-16 bg-[#CBDFF4]/20 rounded-full flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-[#CBDFF4]" />
        </div>
      )}
      
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        {description}
      </p>
      
      {action && (
        <button
          onClick={action}
          className="flex items-center px-4 py-2 bg-[#CBDFF4] text-[#090744] rounded-lg font-medium hover:bg-[#CBDFF4]/90 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
};

export default EmptyState;
