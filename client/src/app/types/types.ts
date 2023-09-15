export interface UserProps {
  id: number;
  username: string;
  email: string;
  password: string;
  posts: PostProps[];
}

export interface PostProps {
  id: number;
  content: string;
  createdAt: string;
  authorId: number;
  author: UserProps;
}
