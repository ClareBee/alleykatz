// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getPosts, POSTS_URL } from '../../services/posts';
import { Post } from '../../ts/types/types';
import { setBaseHeaders } from '../../utils/headers';

type Data = {
  APIresponse?: any;
  postsError?: string;
};


// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const requestHeaders = setBaseHeaders();
      const query = `limit=100&include_vote=1&include_favourite=1`;
      const APIresponse = await fetch(`${POSTS_URL}?${query}`, {
        headers: requestHeaders,
      });
      const response = await APIresponse.json()
      console.log('me', response)
    return res.status(200).send(response)
  } catch (error) {
    console.error(error)
    const err = 'something went wrong'
    return res.status(500).json({ postsError: err  })
  }
}
