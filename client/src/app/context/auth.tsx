'use client';

import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { apiClient } from '../lib/apiClient';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextType {
  user: null | {
    id: number;
    email: string;
    username: string;
  };
  login: (token: string) => void;
  logout: () => void;
}

// React Contextを表すコンテキスト変数
// 空のlogin ,logout関数を定義するオブジェクトをデフォルト値として指定
// カスタムフックuseAuthを介してアクセス可能
// ➀ 初期値設定(未指定の場合: デフォルトでundefinedを返す)
const AuthContext = React.createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  // ➂ 他componentsで、useAuthフックを使用することで、AuthContextの値取得が可能
  //  ※ AuthProvider で設定された実際の login および logout 関数を含む
  return useContext(AuthContext);
};

// ➁ AuthContextに実際に値を入力。
// login(), logout()を設定したvalueを介して、ラップした子要素内でuseAuth使用が可能になる
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<null | { id: number; email: string; username: string }>(null);

  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    if (token) {
      apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;

      apiClient
        .get('/users/find')
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  const login = async (token: string) => {
    localStorage.setItem('auth_token', token);

    try {
      apiClient.get('/users/find').then((res) => {
        setUser(res.data.user);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    delete apiClient.defaults.headers['Authorization'];
    setUser(null); 
  };

  const value = {
    user,
    login,
    logout,
  };

  // childrend → layout.tsxに記載の<NavBar>{children}<  /NavBar>となる
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
