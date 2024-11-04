import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
// import Register from './pages/Register';
import Dashboard from './pages/DashBoard';
import SurveyCreation from './pages/SurveyCreation';
import SurveyResponses from './pages/SurveyResponse';
import UserProfile from './pages/UserProfile';
import { useAuth } from './hooks/useAuth';
import './App.css';
import SubmitResponse from './pages/SubmitResponse';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  // DANGER: This is JUST FOR testing
  if (!true) {
    return (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }

  return children;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            {/* <Route path="/register" element={<Register />} /> */}

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-survey"
              element={
                <ProtectedRoute>
                  <SurveyCreation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/survey/:id/submit-response"
              element={
                <ProtectedRoute>
                  <SubmitResponse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/survey/:id/responses"
              element={
                <ProtectedRoute>
                  <SurveyResponses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />

            {/* Default route */}
            <Route
              path="/"
              element={<Navigate to="/dashboard" replace />}
            />

            {/* Catch all route for 404 */}
            <Route
              path="*"
              element={
                <div className="flex items-center justify-center min-h-screen">
                  <h1 className="text-2xl font-bold">
                    404 - Page Not Found
                  </h1>
                </div>
              }
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
