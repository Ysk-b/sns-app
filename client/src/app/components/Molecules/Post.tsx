import { PostProps } from '@/app/types/types';
import React from 'react';
import Image from 'next/image';

interface PostTypeProps {
  post: PostProps;
}

const Post = ({ post }: PostTypeProps) => {
  return (
    <div className='bg-white shadow-md rounded p-4 mb-4'>
      <div className='mb-4'>
        <div className='flex items-center mb-2'>
          <Image
            className='w-10 h-10 rounded-full mr-2'
            src=' /next.svg' 
            alt='User Avatar'
            width={12}
            height={12}
          />
          <div>
            <h2 className='font-semibold text-md'>{post.author?.username}</h2>
            <p className='text-gray-500 text-sm'>{post.createdAt}.</p>
          </div>
        </div>
        <p className='text-gray-700'>{post.content}</p>
      </div>
    </div>
  );
};

export default Post;
