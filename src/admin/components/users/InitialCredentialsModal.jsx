
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Copy, Key } from 'lucide-react';

const generateTempPassword = () => {
  if (window.crypto && window.crypto.getRandomValues) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    const length = 12;
    let result = '';
    const randomValues = new Uint32Array(length);
    
    window.crypto.getRandomValues(randomValues);
    
    for (let i = 0; i < length; i++) {
      result += charset[randomValues[i] % charset.length];
    }
    
    return result;
  } else {
    return Math.random().toString(36).slice(-10) + 
           Math.random().toString(36).slice(-10);
  }
};

const InitialCredentialsModal = ({ isOpen, onClose, credentials }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  if (!isOpen || !credentials) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#090744] rounded-xl shadow-xl w-full max-w-md p-6"
      >
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Key className="w-6 h-6 text-green-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Credenciales Iniciales</h3>
          <p className="text-white/60 text-sm">
            Guarda estas credenciales de forma segura. El usuario deberá cambiar su contraseña en el primer inicio de sesión.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/60 text-sm">Email</span>
              <button
                onClick={() => copyToClipboard(credentials.email)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Copy className="w-4 h-4 text-white/60" />
              </button>
            </div>
            <p className="text-white font-medium">{credentials.email}</p>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/60 text-sm">Contraseña Temporal</span>
              <button
                onClick={() => copyToClipboard(credentials.password)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Copy className="w-4 h-4 text-white/60" />
              </button>
            </div>
            <p className="text-white font-medium">{credentials.password}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 px-4 py-3 bg-[#CBDFF4] text-[#090744] rounded-xl font-medium hover:bg-[#CBDFF4]/90 transition-colors flex items-center justify-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          Entendido
        </button>
      </motion.div>
    </div>
  );
};

export default InitialCredentialsModal;
