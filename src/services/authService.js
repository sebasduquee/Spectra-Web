// src/services/authService.js
import api from './apiClient';

const authService = {
  /**
   * Inicia sesión de usuario
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Promise} Datos de usuario y token
   */
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });

    // Guardar token y datos de usuario
    if (response.token) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }

    return response;
  },

  /**
   * Cierra sesión del usuario
   */
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  /**
   * Verifica si el usuario está autenticado
   * @returns {boolean} Estado de autenticación
   */
  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  },

  /**
   * Obtiene el usuario actual
   * @returns {object|null} Datos del usuario
   */
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

export default authService;