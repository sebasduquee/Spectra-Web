
// src/services/mockService.js

// Simula respuestas de API para pruebas sin backend
const mockService = {
  /**
   * Simula una petición GET
   * @param {string} endpoint - Ruta del recurso
   * @param {object} params - Parámetros de consulta
   * @returns {Promise} Datos simulados
   */
  async get(endpoint, params = {}) {
    console.log(`Mock GET ${endpoint}`, params);
    
    // Simular retraso de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Respuestas simuladas según el endpoint
    if (endpoint.includes('/users')) {
      return {
        success: true,
        data: [
          { id: 1, name: 'Usuario Demo', email: 'usuario@demo.com', role: 'admin' },
          { id: 2, name: 'Cliente Test', email: 'cliente@test.com', role: 'client' }
        ]
      };
    }
    
    return { success: true, message: 'Datos simulados para GET' };
  },

  /**
   * Simula una petición POST
   * @param {string} endpoint - Ruta del recurso
   * @param {object} data - Datos enviados
   * @returns {Promise} Respuesta simulada
   */
  async post(endpoint, data = {}) {
    console.log(`Mock POST ${endpoint}`, data);
    
    // Simular retraso de red
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simular errores para pruebas
    if (data.email === 'error@test.com') {
      throw new Error('Error simulado para pruebas');
    }
    
    return { 
      success: true, 
      message: 'Datos recibidos correctamente',
      id: Math.floor(Math.random() * 1000),
      ...data
    };
  },
  
  /**
   * Simula una petición PUT
   * @param {string} endpoint - Ruta del recurso
   * @param {object} data - Datos enviados
   * @returns {Promise} Respuesta simulada
   */
  async put(endpoint, data = {}) {
    console.log(`Mock PUT ${endpoint}`, data);
    await new Promise(resolve => setTimeout(resolve, 600));
    return { success: true, message: 'Actualización simulada', ...data };
  },
  
  /**
   * Simula una petición DELETE
   * @param {string} endpoint - Ruta del recurso
   * @returns {Promise} Respuesta simulada
   */
  async delete(endpoint) {
    console.log(`Mock DELETE ${endpoint}`);
    await new Promise(resolve => setTimeout(resolve, 700));
    return { success: true, message: 'Recurso eliminado correctamente' };
  }
};

export default mockService;
