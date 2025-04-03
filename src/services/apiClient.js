
// src/services/apiClient.js
import axios from 'axios';

// Obtener la URL base de la API desde variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Crear instancia de axios con configuración base
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
});

// Métodos para interactuar con la API
const api = {
  /**
   * Realiza una petición GET
   * @param {string} endpoint - Ruta relativa a la base URL o URL completa
   * @param {object} params - Parámetros de consulta
   * @returns {Promise} Promesa con los datos de respuesta
   */
  async get(endpoint, params = {}) {
    try {
      // Verifica si el endpoint es una URL completa
      const isFullUrl = endpoint.startsWith('http://') || endpoint.startsWith('https://');
      
      // Si es URL completa, usar axios directamente
      if (isFullUrl) {
        const response = await axios.get(endpoint, { params });
        return response.data;
      } else {
        // Si no, usar la instancia con baseURL configurada
        const response = await apiClient.get(endpoint, { params });
        return response.data;
      }
    } catch (error) {
      console.error(`Error en GET ${endpoint}:`, error);
      throw error.response?.data?.message || 'Error al obtener datos';
    }
  },

  /**
   * Realiza una petición POST
   * @param {string} endpoint - Ruta relativa a la base URL o URL completa
   * @param {object} data - Datos a enviar
   * @returns {Promise} Promesa con los datos de respuesta
   */
  async post(endpoint, data = {}) {
    try {
      // Verifica si el endpoint es una URL completa
      const isFullUrl = endpoint.startsWith('http://') || endpoint.startsWith('https://');
      
      // Si es URL completa, usar axios directamente
      if (isFullUrl) {
        const response = await axios.post(endpoint, data);
        return response.data;
      } else {
        // Si no, usar la instancia con baseURL configurada
        const response = await apiClient.post(endpoint, data);
        return response.data;
      }
    } catch (error) {
      console.error(`Error en POST ${endpoint}:`, error);
      throw error.response?.data?.message || 'Error al enviar datos';
    }
  }
};

export default api;
