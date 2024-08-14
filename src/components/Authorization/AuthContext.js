import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    userId: null,
    userData: null // Store user data directly
  });

  const login = (userId, userData) => {
    setAuthState({ isLoggedIn: true, userId, userData });
  };

  const logout = () => {
    setAuthState({ isLoggedIn: false, userId: null, userData: null });
      }; 

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
