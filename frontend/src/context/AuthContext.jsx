import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Inicializamos el estado leyendo el localStorage por si el usuario recarga la página
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  // Un booleano para que sea más fácil de usar en los componentes
  const isAuthenticated = !!token;

  // Función global para iniciar sesión
  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  // Función global para cerrar sesión
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};