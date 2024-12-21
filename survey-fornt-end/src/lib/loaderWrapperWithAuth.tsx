import { useAuth } from '@app/contexts/KeyCloakAuthContext';
import { redirect } from 'react-router-dom';

const loaderWrapperWithAuth = <T,>(loader: () => T | Promise<T>) => {
  return async () => {
    try {
      // let { isAuthenticated } = useAuth();
      // console.log('isAuthenticated', isAuthenticated);

      // if (!isAuthenticated) {
      // console.log('is not authenticates');

      // redirect('/login');
      // return;
      // }
      console.log('is authenticated ');

      const data = await Promise.resolve(loader());
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};

export default loaderWrapperWithAuth;
