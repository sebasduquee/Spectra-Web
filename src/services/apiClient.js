// src/services/apiClient.js
import axios from 'axios';

// Obtener la URL base de la API desde variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com';

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

// Importar el servicio mock para pruebas
import mockService from './mockService';

// Determinar si debemos usar el mock service
const USE_MOCK = false; // Desactivamos el mock para usar la API real

// Métodos para interactuar con la API
const api = {
  /**
   * Realiza una petición GET
   * @param {string} endpoint - Ruta relativa a la base URL
   * @param {object} params - Parámetros de consulta
   * @returns {Promise} Promesa con los datos de respuesta
   */
  async get(endpoint, params = {}) {
    // Usar mock service si está activado
    if (USE_MOCK) {
      return await mockService.get(endpoint, params);
    }

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
    // Usar mock service si está activado
    if (USE_MOCK) {
      console.log("Usando servicio mock para POST:", endpoint);
      return await mockService.post(endpoint, data);
    }

    try {
      console.log("Enviando POST real a:", API_BASE_URL + endpoint, "con datos:", data);
      const response = await apiClient.post(endpoint, data);
      console.log("Respuesta recibida:", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error en POST ${endpoint}:`, error);
      // Mostrar más detalles del error para depuración
      if (error.response) {
        console.error("Respuesta de error:", error.response.status, error.response.data);
      } else if (error.request) {
        console.error("No se recibió respuesta:", error.request);
      } else {
        console.error("Error en la configuración:", error.message);
      }
      // Mostrar detalles específicos de la validación
      if (error.response?.data?.details) {
        console.error("Detalles de validación:", error.response.data.details);

        // Mostrar cada detalle de validación para facilitar la depuración
        if (error.response.data.details.details && Array.isArray(error.response.data.details.details)) {
          error.response.data.details.details.forEach((detail, index) => {
            console.error(`Error de validación ${index + 1}:`, detail.message, 'Campo:', detail.path?.join('.'));
          });
        }
      }

      const errorMessage = error.response?.data?.details?.message || 
                          error.response?.data?.message || 
                          'Error al enviar datos';
      throw errorMessage;
    }
  },

  /**
   * Realiza una petición PUT
   * @param {string} endpoint - Ruta relativa a la base URL
   * @param {object} data - Datos a enviar
   * @returns {Promise} Promesa con los datos de respuesta
   */
  async put(endpoint, data = {}) {
    // Usar mock service si está activado
    if (USE_MOCK) {
      return await mockService.put(endpoint, data);
    }

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
    // Usar mock service si está activado
    if (USE_MOCK) {
      return await mockService.delete(endpoint);
    }

    try {
      const response = await apiClient.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error en DELETE ${endpoint}:`, error);
      throw error.response?.data?.message || 'Error al eliminar datos';
    }
  },

  /**
   * Realiza una petición PATCH
   * @param {string} endpoint - Ruta relativa a la base URL
   * @param {object} data - Datos a enviar
   * @returns {Promise} Promesa con los datos de respuesta
   */
  async patch(endpoint, data = {}) {
    // Usar mock service si está activado
    if (USE_MOCK) {
      return await mockService.patch(endpoint, data);
    }

    try {
      console.log("Enviando PATCH a:", API_BASE_URL + endpoint, "con datos:", data);
      const response = await apiClient.patch(endpoint, data);
      console.log("Respuesta PATCH recibida:", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error en PATCH ${endpoint}:`, error);
      // Mostrar más detalles del error para depuración
      if (error.response) {
        console.error("Respuesta de error:", error.response.status, error.response.data);
      } else if (error.request) {
        console.error("No se recibió respuesta:", error.request);
      } else {
        console.error("Error en la configuración:", error.message);
      }

      throw error.userMessage || error.response?.data?.message || 'Error al actualizar datos parcialmente';
    }
  },

  /**
   * Convierte un objeto en una string de query params
   * @param {object} params - Objeto con los parámetros
   * @returns {string} String con los query params
   */
  buildQueryParams(params = {}) {
    return Object.keys(params)
      .filter(key => params[key] !== undefined && params[key] !== null)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
  }
};

export default api;