// src/context/AuthContext.tsx
import React, { createContext, useState, useContext } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (user: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const login = (user: string) => {
    setAuthenticated(true);
    // Opcional: almacenar información de sesión en localStorage
  };

  const logout = () => {
    setAuthenticated(false);
    // Opcional: limpiar localStorage o cookies
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};
