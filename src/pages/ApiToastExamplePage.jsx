
import React, { useState } from 'react';
import { useApi } from '../hooks/useApi';
import api from '../services/apiClient';
import { useToast } from '../contexts/ToastContext';

const ApiToastExamplePage = () => {
  const [formData, setFormData] = useState({ title: '', body: '' });
  const { showSuccess } = useToast();
  
  // Usar el hook useApi para manejar la petición de crear un post
  const createPostApi = useApi(api.post);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Ejecutar la petición API con el hook
      const result = await createPostApi.execute('/posts', formData);
      
      // Mostrar notificación de éxito
      showSuccess('Post creado exitosamente');
      
      // Limpiar el formulario
      setFormData({ title: '', body: '' });
      
      console.log('Post creado:', result);
    } catch (error) {
      // El hook ya maneja la notificación de error
      console.error('Error al crear post:', error);
    }
  };
  
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Ejemplo de API con Toast
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Título
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="body" className="block text-sm font-medium text-gray-700">
              Contenido
            </label>
            <textarea
              id="body"
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={createPostApi.isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {createPostApi.isLoading ? 'Enviando...' : 'Crear Post'}
            </button>
          </div>
          
          {createPostApi.data && (
            <div className="mt-4 p-4 border rounded-md bg-green-50">
              <h3 className="text-lg font-medium text-green-800">Post creado:</h3>
              <pre className="mt-2 text-sm text-green-700 overflow-x-auto">
                {JSON.stringify(createPostApi.data, null, 2)}
              </pre>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ApiToastExamplePage;
