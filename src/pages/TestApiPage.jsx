
import React, { useState, useEffect } from 'react';
import api from '../services/apiClient';

const TestApiPage = () => {
  const [getResponse, setGetResponse] = useState(null);
  const [postResponse, setPostResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ title: '', body: '' });

  // Probar el método GET
  const testGetRequest = async () => {
    setLoading(true);
    setError(null);
    try {
      // Usando JSONPlaceholder como API de prueba
      const data = await api.get('https://jsonplaceholder.typicode.com/posts/1');
      setGetResponse(data);
    } catch (err) {
      setError(err.message || 'Error en la petición GET');
    } finally {
      setLoading(false);
    }
  };

  // Probar el método POST
  const testPostRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Usando JSONPlaceholder como API de prueba
      const data = await api.post('https://jsonplaceholder.typicode.com/posts', formData);
      setPostResponse(data);
    } catch (err) {
      setError(err.message || 'Error en la petición POST');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Prueba del Cliente API</h1>
        
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}
        
        {/* Sección para probar GET */}
        <div className="mb-8 p-4 border rounded">
          <h2 className="text-xl font-semibold mb-4">Probar GET</h2>
          <button 
            onClick={testGetRequest}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Cargando...' : 'Realizar petición GET'}
          </button>
          
          {getResponse && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Respuesta:</h3>
              <pre className="bg-gray-100 p-3 rounded overflow-x-auto">
                {JSON.stringify(getResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>
        
        {/* Sección para probar POST */}
        <div className="p-4 border rounded">
          <h2 className="text-xl font-semibold mb-4">Probar POST</h2>
          <form onSubmit={testPostRequest} className="space-y-4">
            <div>
              <label className="block mb-1">Título:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Contenido:</label>
              <textarea
                name="body"
                value={formData.body}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                rows="3"
                required
              ></textarea>
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Enviando...' : 'Realizar petición POST'}
            </button>
          </form>
          
          {postResponse && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Respuesta:</h3>
              <pre className="bg-gray-100 p-3 rounded overflow-x-auto">
                {JSON.stringify(postResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestApiPage;
