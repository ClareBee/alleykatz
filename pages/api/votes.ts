// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { VOTES_URL } from '../../services/constants';
import { setBaseHeaders } from '../../utils/headers';

type Data = {
  APIresponse?: any;
  votesError?: string;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'GET') {
    try {
      const requestHeaders = setBaseHeaders(process.env.NEXT_PUBLIC_API_KEY);
      const APIresponse = await fetch(VOTES_URL, {
        headers: requestHeaders,
      });    
      const response = await APIresponse.json();
      if(APIresponse.ok){
        return res.status(200).send(response);
      }
      return res.status(500).send({ votesError: 'something went wrong'})
    } catch (error) {
      console.error(error);
      const err = 'something went wrong';
      return res.status(500).json({ votesError: err });
    }
  } else {
    res.status(405).json({ votesError: 'Method not allowed' });
  }
};