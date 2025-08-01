import React, { createContext, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectLoggedInUser,
  setLoginUser,
  clearLoginUser,
  selectLoginLoading,
} from '../redux/loginSlice';
import api from '../services/api'; // Ensure this returns a configured axios instance

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  const loading = useSelector(selectLoginLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Load user on app mount if token exists
  useEffect(() => {
    const loadUserFromSession = async () => {
      const token = sessionStorage.getItem('token');
      if (token) {
        try {
          const response = await api.get('/user/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch(setLoginUser(response.data));
        } catch (error) {
          console.error('❌ Error loading user from session:', error);
          dispatch(clearLoginUser());
        }
      }
    };

    loadUserFromSession();
  }, [dispatch]);

  // Redirect logic
 useEffect(() => {
  const publicRoutes = ['/login', '/signup', '/register', '/forgot-password', '/'];

  console.log('🚦 AuthContext redirect useEffect triggered. User:', user, 'Loading:', loading, 'Path:', location.pathname);

  if (loading) return; // ⛔️ Don't redirect during loading phase

  if (user && publicRoutes.includes(location.pathname)) {
    if (location.pathname !== '/home') {
      console.log('➡️ Redirecting authenticated user to /home');
      navigate('/home');
    }
  } else if (!user && !publicRoutes.includes(location.pathname)) {
    if (location.pathname !== '/login') {
      console.log('➡️ Redirecting unauthenticated user to /login');
      navigate('/login');
    }
  }
}, [user, loading, location.pathname, navigate]);

  const logout = () => {
    dispatch(clearLoginUser());
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
