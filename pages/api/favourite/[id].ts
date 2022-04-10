import type { NextApiRequest, NextApiResponse } from 'next';
import { FAVOURITE_URL } from '../../../services/constants';
import { setBaseHeaders } from '../../../utils/headers';

type Data = {
  APIresponse?: any;
  favouriteDeleteError?: string;
  favouriteError?: string
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'DELETE') {
    try {
      const { id: favouriteId } = req.query;
      const requestHeaders = setBaseHeaders(process.env.SECRET_API_KEY);
      requestHeaders.set('Content-Type', 'application/json');

      const APIresponse = await fetch(`${FAVOURITE_URL}/${favouriteId}`, {
        headers: requestHeaders,
        method: 'DELETE',
        mode: 'cors',
        credentials: 'same-origin',
      });
      if (APIresponse.ok) {
        return res.status(200).send({APIresponse});
      }
      return res.status(500).json({ favouriteDeleteError: 'Something went wrong' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ favouriteDeleteError: 'Something went wrong' });

    }
  }
  if(req.method === 'POST') {
    try {
      const { id: imageId } = req.query;
      const { userId } = req.body;

      const requestHeaders = setBaseHeaders(process.env.NEXT_PUBLIC_API_KEY);
      requestHeaders.set('Content-Type', 'application/json');
   
      const data = {
        image_id: imageId,
        sub_id: userId,
      };
      const APIresponse = await fetch(FAVOURITE_URL, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: requestHeaders,
        body: JSON.stringify(data),
      });
      if (APIresponse.ok) {
        return res.status(200).send({APIresponse});
      }
      return res.status(500).json({ favouriteError: 'Something went wrong' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ favouriteError: 'Something went wrong' });
    }
  }
};
