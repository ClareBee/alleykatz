import { Post } from './../ts/types/types.d';
import { setBaseHeaders } from './headers';

export const POSTS_URL = 'https://api.thecatapi.com/v1/images';

interface PostResponse {
  response: Post[] | []
  postsError: string | null
}

export const getPosts = async (): Promise<PostResponse> => {
  try {
    const requestHeaders = setBaseHeaders();
    const query = `limit=100&include_vote=1&include_favourite=1`;
    const res = await fetch(`${POSTS_URL}?${query}`, {
      headers: requestHeaders,
    });
    let response;
    let postsError;
    if (!res.ok) {
      response = [];
      postsError = 'Posts error';
    } else {
      response = await res.json();
      postsError = null;
    }
    return { response, postsError };
  } catch (error) {
    console.log(error);
    const response: [] = [];
    const postsError = 'System error';
    return { response, postsError };
  }
};
