import { useAuth } from '@app/contexts/KeyCloakAuthContext';
const KeycloakComponent = () => {
  const { isAuthenticated, loading, login, logout, username } =
    useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      {isAuthenticated ? (
        <div className="space-y-4">
          <p>Welcome {username}</p>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={login}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default KeycloakComponent;
