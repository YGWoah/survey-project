import axios from 'axios';

// const AUTH_URL =
//   process.env.REACT_APP_AUTH_URL || 'http://localhost:8080/auth';

const AUTH_URL = 'http://localhost:8080/auth';

const authApi = axios.create({
  baseURL: AUTH_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  try {
    const response = await authApi.post('/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (
  credentials: RegisterCredentials
): Promise<AuthResponse> => {
  try {
    const response = await authApi.post('/register', credentials);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await authApi.post('/logout');
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const refreshToken = async (): Promise<AuthResponse> => {
  try {
    const response = await authApi.post('/refresh-token');
    return response.data;
  } catch (error) {
    console.error('Token refresh error:', error);
    throw error;
  }
};

export const resetPassword = async (email: string): Promise<void> => {
  try {
    await authApi.post('/reset-password', { email });
  } catch (error) {
    console.error('Password reset error:', error);
    throw error;
  }
};

export const changePassword = async (
  oldPassword: string,
  newPassword: string
): Promise<void> => {
  try {
    await authApi.post('/change-password', {
      oldPassword,
      newPassword,
    });
  } catch (error) {
    console.error('Password change error:', error);
    throw error;
  }
};
