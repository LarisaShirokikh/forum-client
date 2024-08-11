import { User } from "./User";
import {usersComments} from "./Comment"

export interface Post {
  [x: string]: usersComments[];
  id: number;
  title: string;
  desc: string;
  user: User;
  photos: FileType[];
  videos: FileType[];
  files: FileType[];
  createdAt: string;
  likes: number;
  comments: number;
  views: number;
}

export interface PostFooterProps {
  likes: number;
  commentsCount: number;
  usersComments: usersComments[];
  views: number;
  postId: string;
}

export interface PostProps {
  post: Post;
  currentUser: User | null;
}


export interface FileType {
  id: number;
  url: string;
  filename: string;
  width: number;
  height: number; 
}
