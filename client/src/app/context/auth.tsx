// https://www.wakuwakubank.com/posts/758-react-context/
// 復習必須_Contextによるグローバルな状態管理

'use client';

import React from 'react';
import { useContext } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextType {
  login: (token: string) => void;
  logout: () => void;
}

// React Contextを表すコンテキスト変数
// 空のlogin ,logout関数を定義するオブジェクトをデフォルト値として指定
// カスタムフックuseAuthを介してアクセス可能
// ➀ 初期値設定(未指定の場合: デフォルトでundefinedを返す)
const AuthContext = React.createContext<AuthContextType>({
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
