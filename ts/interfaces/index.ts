import { Favourite, Post, Vote } from "../types/types";

export interface PostsProps {
  posts: Post[] | []
  favourites: Favourite[] | []
  votes: Vote[] | []
  postsError?: string
  favouritesError?: string
  votesError?: string
  mutateFavourites: () => {}
}

export interface CatPostProps {
  post: Post,
  key?: string,
  favourite?: Favourite,
  votes: Vote[] | [],
  mutateFavourites: () => {}
}

export interface VoteProps {
  imageId: string
}