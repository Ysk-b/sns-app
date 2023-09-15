import apiClient from '@/app/lib/apiClient';
import { PostProps, ProfileProps } from '@/app/types/types';
import { GetServerSideProps } from 'next';
import React from 'react';
import Image from 'next/image';

type Props = {
  profile: ProfileProps;
  posts: PostProps[];
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { userId } = context.query;

  try {
    const profileResponse = await apiClient.get(`/users/profile/${userId}`);
    const postsResponse = await apiClient.get(`/posts/${userId}`);

    return {
      props: {
        profile: profileResponse.data,
        posts: postsResponse.data,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      notFound: true,
    };
  }
};

const UserProfile = ({ profile, posts }: Props) => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='w-full max-w-xl mx-auto'>
        <div className='bg-white shadow-md rounded-lg p-6 mb-4'>
          <div className='flex items-center'>
            <Image
              className='w-20 h-20 rounded-full mr-4'
              alt='User Avatar'
              src={profile.profileImageUrl}
              width={12}
              height={12}
            />
            <div>
              <h2 className='text-2xl font-semibold mb-1'>{profile.user.username}</h2>
              <p className='text-gray-600'>{profile.bio}</p>
            </div>
          </div>
        </div>
        {posts.map((post: PostProps) => (
          <div className='bg-white shadow-md rounded p-4 mb-4' key={post.id}>
            <div className='mb-4'>
              <div className='flex items-center mb-2'>
                <Image
                  className='w-10 h-10 rounded-full mr-2'
                  alt='User Avatar'
                  src={profile.profileImageUrl}
                  width={12}
                  height={12}
                />
                <div>
                  <h2 className='font-semibold text-md'>{post.author.username}</h2>
                  <p className='text-gray-500 text-sm'>
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <p className='text-gray-700'>{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
