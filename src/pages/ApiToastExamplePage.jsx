
import React from 'react';
import { useApi } from '../hooks/useApi';
import { useToast } from '../contexts/ToastContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';
import { CheckCircle, Database, RefreshCw, AlertCircle, XCircle } from 'lucide-react';
import apiClient from '../services/apiClient';

const ApiToastExamplePage = () => {
  const { execute, data, isLoading, error } = useApi(apiClient.get);
  const { showSuccess, showError, showInfo, showWarning } = useToast();

  const fetchData = async () => {
    try {
      const endpoint = '/users';
      await execute(endpoint);
      showSuccess(`Datos cargados correctamente desde ${endpoint}`);
    } catch (err) {
      // El error ya se muestra automáticamente por useApi
      console.error('Error controlado en componente:', err);
    }
  };

  const simulateSuccess = () => {
    showSuccess('Operación completada con éxito');
  };

  const simulateError = () => {
    showError('Ha ocurrido un error en la operación');
  };

  const simulateInfo = () => {
    showInfo('Esta es una notificación informativa');
  };

  const simulateWarning = () => {
    showWarning('Advertencia: acción potencialmente peligrosa');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#090744] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Demo de integración API con Toast
        </h1>

        <div className="bg-white dark:bg-white/5 rounded-xl p-6 mb-8 shadow-sm border border-gray-200 dark:border-white/10">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Ejemplo de useApi Hook
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Este ejemplo muestra cómo el hook useApi maneja automáticamente los estados
            de carga, errores y éxito, integrándose con el sistema de notificaciones.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={fetchData}
              disabled={isLoading}
              className="px-4 py-2 bg-[#CBDFF4] text-[#090744] rounded-lg font-medium hover:bg-[#CBDFF4]/90 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Cargando...</span>
                </>
              ) : (
                <>
                  <Database className="w-4 h-4" />
                  <span>Cargar datos</span>
                </>
              )}
            </button>
          </div>

          {/* Contenido basado en estado */}
          <div className="border border-gray-200 dark:border-white/10 rounded-lg overflow-hidden">
            {isLoading ? (
              <div className="p-8 flex justify-center">
                <div className="text-center">
                  <LoadingSpinner size="lg" />
                  <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando datos...</p>
                </div>
              </div>
            ) : error ? (
              <ErrorState 
                message="Error al cargar datos" 
                details={error}
                onRetry={fetchData}
              />
            ) : data ? (
              <div className="p-6">
                <div className="flex items-center text-green-600 dark:text-green-400 mb-4">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>Datos cargados correctamente</span>
                </div>
                <pre className="bg-gray-100 dark:bg-black/20 p-4 rounded-lg overflow-x-auto text-sm">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            ) : (
              <EmptyState 
                title="No hay datos disponibles"
                description="Haz clic en 'Cargar datos' para obtener información"
                icon={Database}
                action={fetchData}
                actionLabel="Cargar ahora"
              />
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-white/5 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-white/10">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Demo de Toast Notifications
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Ejemplos de notificaciones que puedes mostrar en la aplicación.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={simulateSuccess}
              className="px-4 py-3 bg-green-500/10 text-green-500 rounded-lg font-medium hover:bg-green-500/20 transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Mostrar Success</span>
            </button>
            
            <button
              onClick={simulateError}
              className="px-4 py-3 bg-red-500/10 text-red-500 rounded-lg font-medium hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
            >
              <XCircle className="w-5 h-5" />
              <span>Mostrar Error</span>
            </button>
            
            <button
              onClick={simulateInfo}
              className="px-4 py-3 bg-blue-500/10 text-blue-500 rounded-lg font-medium hover:bg-blue-500/20 transition-colors flex items-center justify-center gap-2"
            >
              <Database className="w-5 h-5" />
              <span>Mostrar Info</span>
            </button>
            
            <button
              onClick={simulateWarning}
              className="px-4 py-3 bg-yellow-500/10 text-yellow-500 rounded-lg font-medium hover:bg-yellow-500/20 transition-colors flex items-center justify-center gap-2"
            >
              <AlertCircle className="w-5 h-5" />
              <span>Mostrar Warning</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiToastExamplePage;
