// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { FAVOURITE_URL } from '../../services/constants';
import { setBaseHeaders } from '../../utils/headers';

type Data = {
  APIresponse?: any;
  favouritesError?: string;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'GET') {
    try {
      const { sub_id } = req.query;
      const requestHeaders = setBaseHeaders(process.env.SECRET_API_KEY);
      const APIresponse = await fetch(`${FAVOURITE_URL}?sub_id=${sub_id}`, {
        headers: requestHeaders,
      });
      const response = await APIresponse.json();
      if(APIresponse.ok){
        return res.status(200).send(response);
      }
      return res.status(500).send({ favouritesError: 'something went wrong'})
    } catch (error) {
      console.error(error);
      const err = 'something went wrong';
      return res.status(500).json({ favouritesError: err });
    }
  } else {
    res.status(405).json({ favouritesError: 'Method not allowed' });
  }
};
