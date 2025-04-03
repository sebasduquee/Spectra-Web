
import React from 'react';
import { useToast } from '../contexts/ToastContext';

const TestToastPage = () => {
  const { addToast } = useToast();

  const showSuccessToast = () => {
    addToast({
      type: 'success',
      message: 'Operación completada con éxito',
      duration: 5000
    });
  };

  const showErrorToast = () => {
    addToast({
      type: 'error',
      message: 'Ha ocurrido un error al procesar la solicitud',
      duration: 5000
    });
  };

  const showWarningToast = () => {
    addToast({
      type: 'warning',
      message: 'Ten cuidado con esta acción',
      duration: 5000
    });
  };

  const showInfoToast = () => {
    addToast({
      type: 'info',
      message: 'Nueva actualización disponible',
      duration: 5000
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#090744] to-black flex items-center justify-center p-6">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-white mb-6">Test de Toast Notifications</h1>
        
        <div className="space-y-4">
          <button
            onClick={showSuccessToast}
            className="w-full py-3 px-4 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-all"
          >
            Mostrar Toast de Éxito
          </button>
          
          <button
            onClick={showErrorToast}
            className="w-full py-3 px-4 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-all"
          >
            Mostrar Toast de Error
          </button>
          
          <button
            onClick={showWarningToast}
            className="w-full py-3 px-4 bg-yellow-500 text-white rounded-xl font-medium hover:bg-yellow-600 transition-all"
          >
            Mostrar Toast de Advertencia
          </button>
          
          <button
            onClick={showInfoToast}
            className="w-full py-3 px-4 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-all"
          >
            Mostrar Toast de Información
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestToastPage;
