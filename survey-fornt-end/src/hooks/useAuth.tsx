import { useState, useEffect, useCallback } from 'react';
import {
  login as loginService,
  register as registerService,
  logout as logoutService,
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
} from '../services/auth';

interface AuthState {
  user: AuthResponse['user'] | null;
  token: string | null;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem('token'),
  });

  useEffect(() => {
    if (state.token) {
      // TODO: Implement a function to validate the token and fetch user data
      // For now, we'll assume the token is valid
      setState((prevState) => ({
        ...prevState,
        user: {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
        }, // Placeholder user data
      }));
    }
  }, [state.token]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const response = await loginService(credentials);
      localStorage.setItem('token', response.token);
      setState({ user: response.user, token: response.token });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, []);

  const register = useCallback(
    async (credentials: RegisterCredentials) => {
      try {
        const response = await registerService(credentials);
        localStorage.setItem('token', response.token);
        setState({ user: response.user, token: response.token });
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await logoutService();
      localStorage.removeItem('token');
      setState({ user: null, token: null });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }, []);

  return {
    user: state.user,
    token: state.token,
    isAuthenticated: !!state.token,
    login,
    register,
    logout,
  };
};
