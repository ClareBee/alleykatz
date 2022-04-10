import type { NextApiRequest, NextApiResponse } from 'next';
import { POSTS_URL } from '../../../services/posts';
import { setBaseHeaders } from '../../../utils/headers';

type Data = {
  APIresponse?: any;
  postDeleteError?: string;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      const requestHeaders = setBaseHeaders(process.env.SECRET_API_KEY);
      const APIresponse = await fetch(`${POSTS_URL}/${id}`, {
        headers: requestHeaders,
        method: 'DELETE',
      });
      if (APIresponse.ok) {
        return res.status(200).end();
      }
      return res.status(500).json({ postDeleteError: 'Something went wrong' });
    } catch (error) {
      console.log(error);
      const postDeleteError = 'System error';
      return { postDeleteError };
    }
  }
};
