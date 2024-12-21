import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { unauthenticatedRouter } from './navigation/Navigation';
import adminRouter from './navigation/adminRouter';
import normalUserRouter from './navigation/normalUserRouter';

import {
  AuthProvider as KeyCloakAuthProvider,
  useAuth,
} from './contexts/KeyCloakAuthContext';
import LoadingSpinner from './components/LoadingSpinner';

const MainApp = () => {
  const { isAuthenticated, loading, roles } = useAuth();

  if (loading) return <LoadingSpinner />;

  const isAdmin = () => {
    if (roles) return roles.includes('admin');
    return false;
  };

  return (
    <RouterProvider
      router={
        isAuthenticated
          ? isAdmin()
            ? adminRouter
            : normalUserRouter
          : unauthenticatedRouter
      }
    />
  );
};

const App: React.FC = () => {
  return (
    <KeyCloakAuthProvider>
      <MainApp />
    </KeyCloakAuthProvider>
  );
};

export default App;
