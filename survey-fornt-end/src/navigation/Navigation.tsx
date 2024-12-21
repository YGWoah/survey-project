import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '@app/pages/Login';
import Layout from '@app/components/Layout';
import Dashboard from '@app/pages/admin/DashBoard';
import SurveyCreation from '@app/pages/SurveyCreation';
import SurveyResponses from '@app/pages/SurveyResponses';
import SubmitResponse from '@app/pages/SubmitResponse';
import ProtectedRoute from '@app/components/ProtectedRoute';
import NotFoundComponent from '@app/components/NotFoundComponent';
import { SurveyService } from '@app/services/surveyService';
import KeycloakComponent from '@app/pages/KeyCloack';
import ProfilePage from '@app/pages/Profile';
import SurveyUpdate from '@app/pages/SurveyUpdate';

const authenticatedRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        // loader: loaderWrapperWithAuth(getSurveys),
      },
      {
        path: 'create-survey',
        element: (
          <ProtectedRoute>
            <SurveyCreation />
          </ProtectedRoute>
        ),
      },
      {
        path: 'survey/:id/submit-response',
        element: (
          <ProtectedRoute>
            <SubmitResponse />
          </ProtectedRoute>
        ),
        loader: async ({ params }) => {
          if (!params.id) throw new Error('Survey ID is required');
          return await SurveyService.getSurvey(params.id);
        },
        errorElement: <NotFoundComponent />,
      },
      {
        path: 'survey/:id/update',
        element: (
          <ProtectedRoute>
            <SurveyUpdate />
          </ProtectedRoute>
        ),
      },
      {
        path: 'survey/:id/responses',
        element: (
          <ProtectedRoute>
            <SurveyResponses />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            {/* <UserProfile /> */}
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '',
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: '*',
        element: <NotFoundComponent />,
      },
    ],
  },
]);

const unauthenticatedRouter = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/keycloak',
    element: <KeycloakComponent />,
  },
  // {
  //   path: '*',
  //   element: <Navigate to="/login" replace />,
  // },
]);

export { authenticatedRouter, unauthenticatedRouter };
