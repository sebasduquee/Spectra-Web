
// src/services/userService.js
import api from './apiClient';

const userService = {
  /**
   * Obtiene todos los usuarios
   * @returns {Promise} Lista de usuarios
   */
  async getUsers() {
    return api.get('/users');
  },

  /**
   * Obtiene un usuario por ID
   * @param {string} id - ID del usuario
   * @returns {Promise} Datos del usuario
   */
  async getUserById(id) {
    return api.get(`/users/${id}`);
  },

  /**
   * Crea un nuevo usuario
   * @param {object} userData - Datos del usuario
   * @returns {Promise} Usuario creado
   */
  async createUser(userData) {
    return api.post('/users', userData);
  }
};

export default userService;
