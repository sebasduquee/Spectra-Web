import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';

const DeleteUserModal = ({ isOpen, onClose, onConfirm, userName }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-md bg-[#090744] border border-white/10 rounded-2xl overflow-hidden shadow-xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h2 className="text-xl font-semibold text-white">Confirmar Eliminación</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-white/80 mb-4">
                ¿Estás seguro de que deseas eliminar al usuario <span className="font-medium text-white">{userName}</span>? Esta acción no se puede deshacer.
              </p>

              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-red-400 text-sm">
                  Al eliminar este usuario, se eliminarán también todos sus datos asociados, incluyendo documentos, histórico de chats y configuraciones.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-white/10">
              <button
                onClick={onClose}
                className="px-4 py-2 text-white hover:bg-white/10 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
              >
                Eliminar Usuario
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteUserModal;