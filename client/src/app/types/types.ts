export interface UserProps {
  id: number;
  username: string;
  email: string;
  password: string;
  posts: PostProps[];
  profile: ProfileProps;
}

export interface PostProps {
  id: number;
  content: string;
  createdAt: string;
  authorId: number;
  author: UserProps;
}

export interface ProfileProps {
  id: number;
  bio: string;
  profileImageUrl: string;
  userId: number;
  user: UserProps;
}
