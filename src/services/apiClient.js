import axios from 'axios';

// URL base configurada (puede ser establecida mediante variables de entorno)
const API_BASE_URL = 'https://jsonplaceholder.typicode.com'; // URL de ejemplo para pruebas

// Configuración base de axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar token de autenticación si existe
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Interceptor para manejo de respuestas
apiClient.interceptors.response.use(
  response => response.data,
  error => {
    // Personaliza el manejo de errores aquí
    let errorMessage = 'Error en la solicitud';

    if (error.response) {
      // La solicitud fue hecha y el servidor respondió con un código de estado
      // que cae fuera del rango de 2xx
      const status = error.response.status;

      if (status === 401) {
        errorMessage = 'No autorizado. Por favor inicie sesión nuevamente.';
        // Aquí puedes redirigir al login o limpiar los tokens
      } else if (status === 403) {
        errorMessage = 'No tiene permiso para realizar esta acción';
      } else if (status === 404) {
        errorMessage = 'Recurso no encontrado';
      } else if (status >= 500) {
        errorMessage = 'Error en el servidor. Intente más tarde';
      }

      // Si el servidor devolvió un mensaje específico, úsalo
      if (error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      errorMessage = 'No se pudo conectar con el servidor';
    }

    return Promise.reject(new Error(errorMessage));
  }
);

// Métodos auxiliares
const api = {
  get: (endpoint, params = {}) => apiClient.get(endpoint, { params }),
  post: (endpoint, data = {}) => apiClient.post(endpoint, data),
  put: (endpoint, data = {}) => apiClient.put(endpoint, data),
  delete: (endpoint) => apiClient.delete(endpoint),
  // Método para archivos con FormData
  uploadFile: (endpoint, formData) => {
    return apiClient.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};

export default api;