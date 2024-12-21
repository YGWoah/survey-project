import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@app/contexts/KeyCloakAuthContext';

const ProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
