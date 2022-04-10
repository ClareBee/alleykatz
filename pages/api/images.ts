// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
var FormData = require('form-data');
import fs from 'fs';
import axios from 'axios';

import middleware from '../../middleware/middleware';
import { POSTS_URL, UPLOAD_URL } from '../../services/constants';
import { setBaseHeaders } from '../../utils/headers';

const handler = nextConnect();

handler.use(middleware);

type Data = {
  APIresponse?: any;
  postsError?: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.post(async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const requestHeaders = setBaseHeaders(process.env.SECRET_API_KEY);
      requestHeaders.append('Content-Type', 'multipart/form-data');

      console.log('req body', req.body);
      const subId = req.body.sub_id;
      const form = new FormData();
      const file = req.body.file.file;
      const readFile = fs.createReadStream(file.filepath);
      form.append('file', readFile, {
        contentType: 'image/png',
        mimeType: 'image/png',
      });

      form.append('sub_id', subId);
      const APIresponse = await axios({
        method: 'POST',
        url: UPLOAD_URL,
        data: form,
        headers: {
          ...form.getHeaders(),
          'x-api-key': process.env.SECRET_API_KEY || '',
        },
      });
      if (APIresponse) {
        return res.status(200).send({});
      }
      return res.status(500).send({ postsError: 'something went wrong' });
    } catch (error) {
      console.error(error);
      const err = 'something went wrong';
      return res.status(500).json({ postsError: err });
    }
  }
});

// eslint-disable-next-line import/no-anonymous-default-export
handler.get(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'GET') {
    try {
      const requestHeaders = setBaseHeaders(process.env.SECRET_API_KEY);
      const query = `limit=100&include_vote=1&include_favourite=1`;
      const APIresponse = await fetch(`${POSTS_URL}?${query}`, {
        headers: requestHeaders,
      });
      const response = await APIresponse.json();
      if (APIresponse.ok) {
        return res.status(200).send(response);
      }
      return res.status(500).send({ postsError: 'something went wrong' });
    } catch (error) {
      console.error(error);
      const err = 'something went wrong';
      return res.status(500).json({ postsError: err });
    }
  }
});

export default handler;
