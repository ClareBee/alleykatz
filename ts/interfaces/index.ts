import { Post } from "../types/types";

export interface PostsProps {
  posts: [Post]
}

export interface CatPostProps {
  post: Post,
  key: string
}