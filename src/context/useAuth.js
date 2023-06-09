import { useContext } from 'react';
import { AuthContext } from './authContext';

function useAuth() {
  const { login, logout } = useContext(AuthContext);

  const signIn = (token) => {
    login(token);
  };
  const signOut = () => {
    logout();
  };

  return {
    signIn,
    signOut,
  };
}

export default useAuth;
