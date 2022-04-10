import type { NextApiRequest, NextApiResponse } from 'next';
import { POSTS_URL, VOTES_URL } from '../../../services/constants';
import { setBaseHeaders } from '../../../utils/headers';

type Data = {
  APIresponse?: any;
  voteDeleteError?: string;
  voteError?: string
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      const requestHeaders = setBaseHeaders(process.env.SECRET_API_KEY);
      const APIresponse = await fetch(`${VOTES_URL}/${id}`, {
        headers: requestHeaders,
        method: 'DELETE',
      });
      console.log("API", APIresponse)
      if (APIresponse.ok) {
        return res.status(200).send({APIresponse});
      }
      return res.status(500).json({ voteDeleteError: 'Something went wrong' });
    } catch (error) {
      console.log(error);
      const voteDeleteError = 'System error';
      return res.status(500).json({ voteDeleteError: 'Something went wrong' });

    }
  }
  if(req.method === 'POST') {
    try {
      const { id } = req.query;
      const { value, userId } = req.body;

      const requestHeaders = setBaseHeaders(process.env.NEXT_PUBLIC_API_KEY);
      requestHeaders.set('Content-Type', 'application/json');
      const data = {
        image_id: id,
        sub_id: userId,
        value,
      };
      const APIresponse = await fetch(VOTES_URL, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: requestHeaders,
        body: JSON.stringify(data),
      });
      if (APIresponse.ok) {
        return res.status(200).send({APIresponse});
      }
      return res.status(500).json({ voteError: 'Something went wrong' });
    } catch (error) {
      console.log(error);
      const postDeleteError = 'System error';
      return res.status(500).json({ voteError: 'Something went wrong' });
    }
  }
};
