
import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const ErrorState = ({ 
  message = 'Ha ocurrido un error', 
  details = null,
  onRetry = null,
  fullPage = false
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex flex-col items-center justify-center text-center p-6 ${fullPage ? 'min-h-[400px]' : ''}`}
    >
      <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{message}</h3>
      
      {details && (
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
          {details}
        </p>
      )}
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center px-4 py-2 bg-[#CBDFF4] text-[#090744] rounded-lg font-medium hover:bg-[#CBDFF4]/90 transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Reintentar
        </button>
      )}
    </motion.div>
  );
};

export default ErrorState;
