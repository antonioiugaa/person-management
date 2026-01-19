import React, { createContext, useState, useCallback, useMemo } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

console.log('AuthContext initialized with API_URL:', API_URL);

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from localStorage on mount
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setUser(JSON.parse(userData));
    }

    setLoading(false);
  }, []);

  const register = useCallback(async (firstName, lastName, email, password, confirmPassword) => {
    console.log('Register called with:', { firstName, lastName, email });
    console.log('Making request to:', `${API_URL}/auth/register`);
    setError(null);
    try {
      const requestBody = { firstName, lastName, email, password, confirmPassword };
      console.log('Request body:', requestBody);
      
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        const errorMsg = data.message || 'Registration failed';
        console.error('Registration error:', errorMsg);
        throw new Error(errorMsg);
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      console.log('Registration successful');

      return data;
    } catch (err) {
      console.error('Catch block error:', err);
      setError(err.message);
      throw err;
    }
  }, []);

  const login = useCallback(async (email, password) => {
    console.log('Login called with:', { email });
    console.log('Making request to:', `${API_URL}/auth/login`);
    setError(null);
    try {
      const requestBody = { email, password };
      console.log('Request body:', requestBody);
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        const errorMsg = data.message || 'Login failed';
        console.error('Login error:', errorMsg);
        throw new Error(errorMsg);
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      console.log('Login successful');

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setError(null);
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    error,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  }), [user, loading, error, register, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
