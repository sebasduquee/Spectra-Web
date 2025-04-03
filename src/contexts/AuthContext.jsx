
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulación de autenticación básica
      if (email === 'admin@spectrum.com' && password === 'admin123') {
        const userData = {
          id: '1',
          email,
          name: 'Admin User',
          role: 'admin'
        };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
      throw new Error('Credenciales inválidas');
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const checkAuth = () => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error('Error checking auth:', err);
    } finally {
      setLoading(false);
    }
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    // Implementar lógica de permisos según roles
    if (user.role === 'admin') return true;
    return false;
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider 
      value={{
        user,
        loading,
        error,
        isAuthenticated,
        login,
        logout,
        checkAuth,
        hasPermission
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
