import React from 'react';
import Navbar from './NavBar';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@app/contexts/KeyCloakAuthContext';

const Layout: React.FC = () => {
  let { loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <footer className="bg-white shadow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-gray-500">
          © {new Date().getFullYear()} Survey Platform. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
