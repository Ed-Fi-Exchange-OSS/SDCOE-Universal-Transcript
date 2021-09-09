import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [loginMethod, setLoginMethod] = useState({
    loginWithMicrosoft: false,
    localAuthLogin: false,
  });

  const addLoginMethod = method => {
    setLoginMethod({ ...loginMethod, ...method });
  };

  return <AuthContext.Provider value={{ loginMethod, addLoginMethod }}>{children}</AuthContext.Provider>;
}
