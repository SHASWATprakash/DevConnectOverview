import React, { createContext, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedInUser, setLoginUser, clearLoginUser, selectLoginLoading } from '../redux/loginSlice';
import api from '../services/api'; // Assuming you have an api service configured

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  const loading = useSelector(selectLoginLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Effect to load user from token in sessionStorage on initial load
  useEffect(() => {
    const loadUserFromSession = async () => {
      const token = sessionStorage.getItem('token');
      if (token) {
        try {
          // Assuming you have a profile endpoint that returns user data
          const response = await api.get('/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch(setLoginUser(response.data)); // Set user in Redux store
        } catch (error) {
          console.error('❌ Error loading user from session:', error);
          dispatch(clearLoginUser()); // Clear user and token in Redux and sessionStorage
        }
      }
    };

    loadUserFromSession();
  }, [dispatch]);

  // Effect to handle redirects based on authentication state from Redux
  useEffect(() => {
    console.log('🚦 AuthContext redirect useEffect triggered. User:', user, 'Loading:', loading, 'Path:', window.location.pathname);
    const unauthenticatedRoutes = ['/login', '/register'];

    if (!loading) {
      if (user) {
        // If user is authenticated
        if (unauthenticatedRoutes.includes(window.location.pathname) || window.location.pathname === '/') {
          // And is currently on an unauthenticated route or the root path, redirect to home
          console.log('➡️ Redirecting authenticated user to /home');
          navigate('/home');
        }
      } else {
        // If user is not authenticated
        if (!unauthenticatedRoutes.includes(window.location.pathname) && window.location.pathname !== '/') {
          // And is on an authenticated route (not unauthenticated and not root), redirect to login
          console.log('➡️ Redirecting unauthenticated user to /login');
          navigate('/login');
        }
      }
    }
  }, [user, loading, navigate]);

  // Removed unused login and register functions
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
