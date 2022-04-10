import { PostResponse, PostDeleteResponse } from './../ts/interfaces/index';
import { setBaseHeaders } from '../utils/headers';

export const POSTS_URL = 'https://api.thecatapi.com/v1/images';

export const getPosts = async (): Promise<PostResponse> => {
  try {
    const requestHeaders = setBaseHeaders(process.env.NEXT_PUBLIC_API_KEY);
    const query = `limit=100&include_vote=1&include_favourite=1`;
    const res = await fetch(`${POSTS_URL}?${query}`, {
      headers: requestHeaders,
    });
    let response;
    let postsError;
    if (!res.ok) {
      response = [];
      postsError = 'Something went wrong fetching posts';
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

export const deletePost = async (
  imageId: string
): Promise<PostDeleteResponse> => {
  try {
    const requestHeaders = setBaseHeaders(process.env.NEXT_PUBLIC_API_KEY);
    const res = await fetch(`${POSTS_URL}/${imageId}`, {
      headers: requestHeaders,
      method: 'DELETE',
    });
    let postDeleteError;
    if (!res.ok) {
      postDeleteError = 'Something went wrong deleting post';
    } else {
      postDeleteError = null;
    }
    return { postDeleteError };
  } catch (error) {
    console.log(error);
    const postDeleteError = 'System error';
    return { postDeleteError };
  }
};
