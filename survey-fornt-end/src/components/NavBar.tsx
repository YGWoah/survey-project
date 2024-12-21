import { useAuth } from '@app/contexts/KeyCloakAuthContext';
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

export const navStyles = {
  active:
    'border-indigo-500 text-indigo-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
  inactive:
    'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
  button:
    'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700',
};

interface CustomNavLinkProps {
  to: string;
  children: React.ReactNode;
}

export const CustomNavLink: React.FC<CustomNavLinkProps> = ({
  to,
  children,
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      isActive ? navStyles.active : navStyles.inactive
    }
  >
    {children}
  </NavLink>
);

interface ProfileMenuProps {
  onLogout: () => void;
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({
  onLogout,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="ml-3 relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        aria-expanded={isOpen}
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="h-8 w-8 rounded-full"
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=default`}
          alt="Profile"
        />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Your Profile
          </Link>
          <button
            onClick={() => {
              setIsOpen(false);
              onLogout();
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

const UserNavLinks: React.FC = () => (
  <>
    <CustomNavLink to="/create-survey">Create Survey</CustomNavLink>
    <CustomNavLink to="/profile">Profile</CustomNavLink>
  </>
);

const AdminNavLinks: React.FC = () => (
  <>
    <CustomNavLink to="/dashboard">Dashboard</CustomNavLink>
    <CustomNavLink to="/surveys">Surveys</CustomNavLink>
    <CustomNavLink to="/users">Users</CustomNavLink>
  </>
);

const isAdmin = (roles: string[] | undefined) => {
  if (roles) return roles.includes('admin');
  return false;
};

const Navbar: React.FC = () => {
  const { username, logout, roles } = useAuth();

  let isAdminUser = isAdmin(roles);
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="h-8 w-auto"
                src="/logo.svg"
                alt="Survey Platform"
              />
            </Link>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {isAdminUser ? <AdminNavLinks /> : <UserNavLinks />}
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {username ? (
              <ProfileMenu onLogout={logout} />
            ) : (
              <Link to="/login" className={navStyles.button}>
                Log in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
