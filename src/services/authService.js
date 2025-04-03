
import { jwtDecode } from 'jwt-decode';

class AuthService {
  static TOKEN_KEY = 'auth_token';
  static USER_KEY = 'user';

  static async login(email, password) {
    // Simulación de respuesta del servidor
    if (email === 'admin@spectrum.com' && password === 'admin123') {
      const mockToken = 'mock_jwt_token_' + Date.now();
      const mockUser = {
        id: '1',
        email,
        name: 'Admin User',
        role: 'admin'
      };

      // Almacenar en localStorage (temporal, cambiar a cookies después)
      localStorage.setItem(this.TOKEN_KEY, mockToken);
      localStorage.setItem(this.USER_KEY, JSON.stringify(mockUser));

      return {
        token: mockToken,
        user: mockUser
      };
    }
    throw new Error('Credenciales inválidas');
  }

  static async logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  static async verifyToken(token) {
    // Simulación de verificación de token
    try {
      if (!token) return false;
      
      // Simular verificación JWT
      if (token.startsWith('mock_jwt_token_')) {
        const timestamp = parseInt(token.split('_').pop());
        const tokenAge = Date.now() - timestamp;
        // Token expira después de 1 hora
        return tokenAge < 3600000;
      }
      return false;
    } catch (error) {
      console.error('Error verificando token:', error);
      return false;
    }
  }

  static getStoredToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static getStoredUser() {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  static isAuthenticated() {
    const token = this.getStoredToken();
    return token && this.verifyToken(token);
  }
}

export default AuthService;
