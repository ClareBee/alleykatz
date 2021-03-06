import { BoxProps } from '@chakra-ui/react';
import { Favourite, Post, Vote } from '../types/types';

export interface PostsProps {
  posts: Post[] | [];
  favourites: Favourite[] | [];
  votes: Vote[] | [];
  postsError?: string;
  favouritesError?: string;
  votesError?: string;
  mutateFavourites: () => {};
  mutatePosts: () => {};
  mutateVotes: () => {};
}

export interface CatPostProps {
  post: Post;
  key?: string;
  favourite?: Favourite;
  postVotes: Vote[] | [];
  mutateFavourites: () => {};
  mutatePosts: () => {};
  mutateVotes: () => {};
}

export interface VoteProps {
  imageId: string;
  userVote?: { vote?: 0 | 1 | undefined; id?: number };
  mutateVotes: () => {};
}

export interface VotesResponse {
  response: Vote[] | [];
  votesError: string | null;
}

export interface VoteResponse {
  voteError: string | null;
}
export interface PostResponse {
  response: Post[] | [];
  postsError: string | null;
}

export interface PostDeleteResponse {
  postDeleteError: string | null;
}

export interface ImageModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export interface ImageUploaderProps {
  isModal?: boolean;
  mutatePosts?: () => {};
  onClose?: () => void;
}

export interface LogoProps extends BoxProps {
  disabled?: boolean;
}

export interface ErrorMessageProps {
  errorMessage?: string;
  dismissError?: () => void;
}
