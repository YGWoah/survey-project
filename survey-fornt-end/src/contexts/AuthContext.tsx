import React, { createContext, useState, useEffect } from 'react';
import { login, register, logout } from '../services/auth';

interface AuthContextType {
  user: any | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string
  ) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Validate token and set user
      // This is a placeholder and should be implemented with your backend
      setUser({ token });
    }
  }, []);

  const authContextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login: async (email, password) => {
      let LoginCredentials = {
        email: email,
        password: password,
      };
      const userData = await login(LoginCredentials);
      setUser(userData);
      localStorage.setItem('token', userData.token);
    },
    register: async (email, password, name) => {
      let registerCredentials = {
        email: email,
        password: password,
        name: name,
      };

      const userData = await register(registerCredentials);
      setUser(userData);
      localStorage.setItem('token', userData.token);
    },
    logout: () => {
      logout();
      setUser(null);
      localStorage.removeItem('token');
    },
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
