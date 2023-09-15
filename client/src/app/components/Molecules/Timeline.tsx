'use client';

import React, { useState } from 'react';
import Post from './Post';
import { apiClient } from '@/app/lib/apiClient';
import { PostProps } from '@/app/types/types';

const Timeline = () => {
  const [postText, setPostText] = useState<string>('');
  const [latestPost, setLatestPost] = useState<PostProps[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 新規投稿作成のPOSTリクエストを、サーバーに対して送信
      const newPost = await apiClient.post('/posts/post', {
        // contetプロパティをreqのbodyに追加
        content: postText,
      });
      // 新規投稿を既存の投稿に追加 → latestPost変数で管理可能
      setLatestPost((prevPosts) => [newPost.data, ...prevPosts]);
      setPostText('');
    } catch (err) {
      alert('ログインして下さい');
    }
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <main className='container mx-auto py-4'>
        <div className='bg-white shadow-md rounded p-4 mb-4'>
          <form onSubmit={handleSubmit}>
            <textarea
              className='w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400'
              placeholder="What's on your mind?"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPostText(e.target.value)}
              value={postText}
            ></textarea>
            <button
              type='submit'
              className='mt-2 bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded'
            >
              投稿
            </button>
          </form>
        </div>
        {latestPost.map((post: PostProps) => (
          <Post key={post.id} post={post} />
        ))}
      </main>
    </div>
  );
};

export default Timeline;
