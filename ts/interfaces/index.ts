import { Favourite, Post } from "../types/types";

export interface PostsProps {
  posts: [Post]
  favourites: [Favourite]
}

export interface CatPostProps {
  post: Post,
  key: string,
  favourite?: Favourite
}