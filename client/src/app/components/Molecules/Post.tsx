import { PostProps } from '@/app/types/types';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PostTypeProps {
  post: PostProps;
}

const Post = ({ post }: PostTypeProps) => {
  return (
    <div className='bg-white shadow-md rounded p-4 mb-4'>
      <div className='mb-4'>
        <div className='flex items-center mb-2'>
          <Link href={`/pages/profile/${post.authorId}`}>
            <Image
              className='w-10 h-10 rounded-full mr-2'
              src={post.author.profile?.profileImageUrl}
              alt='User Avatar'
              width={12}
              height={12}
            />
          </Link>
          <div>
            <h2 className='font-semibold text-md'>{post.author?.username}</h2>
            <p className='text-gray-500 text-sm'>{new Date(post.createdAt).toLocaleString()}</p>
          </div>
        </div>
        <p className='text-gray-700'>{post.content}</p>
      </div>
    </div>
  );
};

export default Post;
