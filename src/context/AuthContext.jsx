import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Función simulada de inicio de sesión con los 3 roles
  const login = (username, password) => {
    if (username === 'admin' && password === '1234') {
      setUser({ username: 'Administrador', role: 'admin' });
      return true;
    } else if (username === 'cliente' && password === '1234') {
      setUser({ username: 'Cliente Frecuente', role: 'cliente' });
      return true;
    } else if (username === 'vendedor' && password === '1234') {
      setUser({ username: 'Vendedor Autorizado', role: 'vendedor' });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);