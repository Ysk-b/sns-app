'use client';

import { useAuth } from '@/app/context/auth';
import Link from 'next/link';

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <header className='bg-gray-700 p-4 text-white'>
      <div className='container mx-auto flex justify-between items-center'>
        <h1 className='font-semibold text-xl'>
          <Link href='/'>SNS Clone</Link>
        </h1>
        <nav>
          <ul className='flex space-x-4'>
            {user ? (
              <>
                <Link
                  href={`/pages/profile${user.id}`}
                  className='bg-white text-gray-900 py-2 px-3 rounded-lg font-medium'
                >
                  プロフィール
                </Link>
                <button
                  onClick={logout}
                  className='bg-white text-gray-900 py-2 px-3 rounded-lg font-medium'
                >
                  ログアウト
                </button>
              </>
            ) : (
              <>
                <Link
                  href='/pages/login'
                  className='bg-white text-gray-900 py-2 px-3 rounded-lg font-medium'
                >
                  ログイン
                </Link>
                <Link
                  href='/pages/signup'
                  className='bg-white text-gray-900 py-2 px-3 rounded-lg font-medium'
                >
                  サインアップ
                </Link>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
