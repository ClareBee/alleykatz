// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getPosts, POSTS_URL } from '../../services/posts';
import { Post } from '../../ts/types/types';
import { setBaseHeaders } from '../../utils/headers';

type Data = {
  APIresponse?: any;
  postsError?: string;
};
// export default async (req, res) => {
//   await new Promise(resolve => {
//     setTimeout(() => {
//       resolve()
//     }, 2000);
//   })

//   res.end('Test')
// }

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
    return res.status(500).json({ error })
  }
  // if (req.method === 'GET') {
  //   try {
  //     const requestHeaders = setBaseHeaders();
  //     const query = `limit=100&include_vote=1&include_favourite=1`;
  //     const APIresponse = await fetch(`${POSTS_URL}?${query}`, {
  //       headers: requestHeaders,
  //     });

  //     let response;
  //     let postsError;
  //     console.log('first', APIresponse)
  //     if (!APIresponse.ok) {
  //       response = [];
  //       postsError = 'Posts error';
  //     } else {
  //       response = APIresponse
  //     }
  //     console.log('here i am ', response)
  //     return res.status(200).json({ response, postsError });
  //   } catch (error) {
  //     console.log(error);
  //     const response: [] = [];
  //     const postsError = 'System error';
  //     return { response, postsError };
  //   }
  // }
}
