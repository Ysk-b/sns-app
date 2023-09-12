import Link from 'next/link';
import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode;
}

const NavBar = () => {
  return (
    <header className='bg-gray-700 p-4 text-white'>
      <div className='container mx-auto flex justify-between items-center'>
        <h1 className='font-semibold text-xl'>
          <Link href='/'>SNS Clone</Link>
        </h1>
        <nav>
          <ul className='flex space-x-4'>
            <>
              <Link
                href='/pages/login'
                className='bg-white text-gray-900 py-2 px-3 rounded-lg font-medium'
              >
                ログイン
              </Link>
              <Link
                href='/pages//signup'
                className='bg-white text-gray-900 py-2 px-3 rounded-lg font-medium'
              >
                サインアップ
              </Link>
            </>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default NavBar