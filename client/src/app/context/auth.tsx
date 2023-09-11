// https://www.wakuwakubank.com/posts/758-react-context/
// 復習必須_Contextによるグローバルな状態管理

'use client';

import React from 'react';
import { useContext } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextType {
  login: (token: string) => void,
  logout: () => void,
}

const AuthContext = React.createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const login = async (token: string) => {
    localStorage.setItem('auth_token', token);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
  };

  const value = {
    login,
    logout,
  };

  // childrend → layout.tsxに記載の<NavBar>{children}<  /NavBar>となる
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
