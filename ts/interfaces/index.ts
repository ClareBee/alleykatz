import { Favourite, Post, Vote } from "../types/types";

export interface PostsProps {
  posts: Post[] | []
  favourites: Favourite[] | []
  votes: Vote[] | []
  postsError?: string
  favouritesError?: string
  votesError?: string
  mutateFavourites: () => {}
  mutatePosts: () => {}
}

export interface CatPostProps {
  post: Post,
  key?: string,
  favourite?: Favourite,
  votes: Vote[] | [],
  mutateFavourites: () => {}
  mutatePosts: () => {}
}

export interface VoteProps {
  imageId: string
}

export interface PostResponse {
  response: Post[] | []
  postsError: string | null
}

export interface PostDeleteResponse {
  postDeleteError: string | null
}