
// src/contexts/ToastContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Agregar un nuevo toast
  const addToast = useCallback(({ type = 'info', message, duration = 5000 }) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message, duration }]);

    // Auto-eliminar después del tiempo especificado
    if (duration) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, []);

  // Eliminar un toast específico por ID
  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Renderización de toasts
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <AlertCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      case 'info':
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getToastStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/90 text-white';
      case 'error':
        return 'bg-red-500/90 text-white';
      case 'warning':
        return 'bg-yellow-500/90 text-white';
      case 'info':
      default:
        return 'bg-blue-500/90 text-white';
    }
  };

  // Valor del contexto
  const value = {
    addToast,
    removeToast
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 max-w-md">
        <AnimatePresence mode="sync">
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              className={`px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 ${getToastStyles(toast.type)}`}
            >
              {getIcon(toast.type)}
              <span className="flex-1">{toast.message}</span>
              <button 
                onClick={() => removeToast(toast.id)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast debe ser usado dentro de un ToastProvider');
  }
  return context;
};
