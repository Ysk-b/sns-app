'use client';

import { useAuth } from '@/app/context/auth';
import { apiClient } from '@/app/lib/apiClient';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

// エラーハンドリング必要
// prisma.user.create()メソッドが呼び出された際に、
// 既にデータベース内に同じemailが存在しており新規ユーザー作成できない

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // ログインを行うAPIを叩く
    // 成功時、ログインページにリダイクレト
    try {
      // req:'/auth/login'エンドポイントへ送信される
      // email, passwordに関する情報をbodyに含む
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      });

      // responst.dataにresデータ格納。中のtokenにアクセスし、tokenを取得
      const token = response.data.token;
      login(token);

      router.push('/');
    } catch (err) {
      alert('入力内容が誤っています');
    }
  };

  return (
    <div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <Head>
        <title>ログイン</title>
      </Head>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          アカウントにログイン
        </h2>
      </div>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                メールアドレス
              </label>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              />
            </div>
            <div className='mt-6'>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                パスワード
              </label>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
            </div>
            <div className='mt-6'>
              <button
                type='submit'
                className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                ログイン
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
