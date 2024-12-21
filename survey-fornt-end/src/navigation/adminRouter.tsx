import { createBrowserRouter } from 'react-router-dom';
import Layout from '@app/components/Layout';
import Dashboard from '@app/pages/admin/DashBoard';
import NotFoundComponent from '@app/components/NotFoundComponent';
import ProtectedRoute from '@app/components/ProtectedRoute';

const adminRouter = createBrowserRouter([
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
      },
      {
        path: 'surveys',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'users',
        element: (
          <ProtectedRoute>
            <div>
              <h1>Users</h1>
              <p>need to be implemented</p>
            </div>
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <NotFoundComponent />,
      },
    ],
  },
]);

export default adminRouter;
