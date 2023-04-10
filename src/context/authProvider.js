import { useMemo, useState } from 'react';
import { AuthContext, AuthStateContext } from './authContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  const login = (token) => {
    localStorage.setItem('JWT', token);
    setUser(true);
  };
  const logout = () => {
    localStorage.removeItem('JWT');
    setUser(false);
  };
  const dispatch = useMemo(() => ({ login, logout }), []);

  return (
    <AuthStateContext.Provider value={user}>
      <AuthContext.Provider value={dispatch}>{children}</AuthContext.Provider>
    </AuthStateContext.Provider>
  );
};

export default AuthProvider;
