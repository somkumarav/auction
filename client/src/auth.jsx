import { useState, createContext, useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log('hello');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('auction_user'));
    if (user) {
      setUser(user);
    }
  }, []);

  const logIn = (_user) => {
    console.log(_user);
    localStorage.setItem('auction_user', JSON.stringify(_user));
    setUser(_user);
  };
  const logOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const ProtectedRoute = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export const VoterRoute = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (user && user.role !== 'voter') {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
