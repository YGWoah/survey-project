import {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import keycloakService from '@app/services/keycloak';

type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
  login: () => void;
  logout: () => void;
  token: string | undefined;
  username?: string;
  roles: string[] | undefined;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const authenticated = await keycloakService.init();
        const keycloak = keycloakService.getKeycloakInstance();
        if (authenticated) {
          if (keycloak.token) setToken(keycloak.token);
          setIsAuthenticated(true);
          console.log('just got authenticated');

          keycloak.onTokenExpired = () => {
            keycloak.updateToken(300).then((refreshed) => {
              if (refreshed) {
                if (keycloak.token) setToken(keycloak.token);
              }
            });
          };
        }
      } catch (error) {
        console.error('Auth init error:', error);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = () => keycloakService.getKeycloakInstance().login();
  const logout = () => keycloakService.getKeycloakInstance().logout();

  const value = {
    isAuthenticated,
    loading,
    login: login,
    logout: logout,
    token: token,
    username:
      keycloakService.getKeycloakInstance().tokenParsed
        ?.preferred_username,
    roles: keycloakService.getKeycloakInstance().realmAccess?.roles,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAuth must be used within AuthProvider');
  return context;
};
