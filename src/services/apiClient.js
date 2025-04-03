
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

// Interceptor para añadir token de autenticación
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores de autenticación
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si hay un error 401, redirigir al login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Métodos para interactuar con la API
const api = {
  /**
   * Realiza una petición GET
   * @param {string} endpoint - Ruta relativa a la base URL
   * @param {object} params - Parámetros de consulta
   * @returns {Promise} Promesa con los datos de respuesta
   */
  async get(endpoint, params = {}) {
    try {
      const response = await apiClient.get(endpoint, { params });
      return response.data;
    } catch (error) {
      console.error(`Error en GET ${endpoint}:`, error);
      throw error.response?.data?.message || 'Error al obtener datos';
    }
  },

  /**
   * Realiza una petición POST
   * @param {string} endpoint - Ruta relativa a la base URL
   * @param {object} data - Datos a enviar
   * @returns {Promise} Promesa con los datos de respuesta
   */
  async post(endpoint, data = {}) {
    try {
      const response = await apiClient.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error(`Error en POST ${endpoint}:`, error);
      throw error.response?.data?.message || 'Error al enviar datos';
    }
  },
  
  /**
   * Realiza una petición PUT
   * @param {string} endpoint - Ruta relativa a la base URL
   * @param {object} data - Datos a enviar
   * @returns {Promise} Promesa con los datos de respuesta
   */
  async put(endpoint, data = {}) {
    try {
      const response = await apiClient.put(endpoint, data);
      return response.data;
    } catch (error) {
      console.error(`Error en PUT ${endpoint}:`, error);
      throw error.response?.data?.message || 'Error al actualizar datos';
    }
  },
  
  /**
   * Realiza una petición DELETE
   * @param {string} endpoint - Ruta relativa a la base URL
   * @returns {Promise} Promesa con los datos de respuesta
   */
  async delete(endpoint) {
    try {
      const response = await apiClient.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error en DELETE ${endpoint}:`, error);
      throw error.response?.data?.message || 'Error al eliminar datos';
    }
  }
};

export default api;
