import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'));
      setCurrentUser(user);
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);

      if (response.data && response.data.status === 'success') {
        const token = response.data.token;
        const user = {
          id: response.data.user.id,
          username: response.data.user.username,
          email: response.data.user.email,
          isAdmin: response.data.user.isAdmin || false
        };

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setToken(token);
        setCurrentUser(user);

        return { success: true, message: 'Login successful!' };
      } else {
        return { success: false, message: response.data?.message || 'Login failed' };
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await authAPI.register(username, email, password);
      if (response.data && response.data.status === 'success') {
        return { success: true, message: 'Registered successfully! Please login.' };
      } else {
        return { success: false, message: response.data?.message || 'Registration failed' };
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      token,
      login,
      register,
      logout,
      isAuthenticated: !!currentUser
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
