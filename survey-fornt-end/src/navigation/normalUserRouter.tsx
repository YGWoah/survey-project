import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '@app/components/Layout';
import SurveyCreation from '@app/pages/SurveyCreation';
import SurveyResponses from '@app/pages/SurveyResponses';
import SubmitResponse from '@app/pages/SubmitResponse';
import ProtectedRoute from '@app/components/ProtectedRoute';
import NotFoundComponent from '@app/components/NotFoundComponent';
import ProfilePage from '@app/pages/Profile';
import SurveyUpdate from '@app/pages/SurveyUpdate';

const normalUserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Navigate to="/profile" replace /> },
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

export default normalUserRouter;
