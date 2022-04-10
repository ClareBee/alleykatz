// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
const formidable = require("formidable");
import nextConnect from 'next-connect';
import middleware from '../../middleware/middleware'
import fs from 'fs';

import { POSTS_URL } from '../../services/constants';
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
}

handler.post(async (req: any, res: any) => {
  if (req.method === 'POST') {
    try {
      const requestHeaders = setBaseHeaders(process.env.SECRET_API_KEY);
      // requestHeaders.append('Content-Type', 'application/json')
      requestHeaders.append('Content-Type', 'multipart/form-data' )
     console.log('here we are', req.body)
      // const files = req.files;
      // console.log('files', files)
      // const subId = req.body.sub_id
      // let formToUpload;
      // let subId;
      // const form = new formidable.IncomingForm();
      // console.log('form', form )
      // form
      // .on("file", async (name: string, file: File) => {
      //   console.log('hey there')
      //   const APIresponse = await fetch(POSTS_URL, {
      //     method: 'POST',
      //     body: JSON.stringify({ file: file }),
      //     headers: requestHeaders,
      //   });
      //   console.log('api', APIresponse);
      //   const response = await APIresponse.json();
      //   console.log('response', response )
      //   return res.status(200).send(response);
      // })
      // .on("aborted", () => {
      //   res.status(500).send('Aborted') 
      // })
      // .on("end", () => {
      //   res.status(200).send('done');
      // });

    // await form.parse(req)
      // const result = await form.parse(req, (err, fields, files) => {
      //   // console.log('hey', files);
      //   formToUpload = files[0]
      //   subId = fields.sub_id
        
      // });
      // console.log('result', formToUpload, subId)
      
      // requestHeaders.append('Content-Type', 'application/json')
      // const formData = {
      //   sub_id: subId,
      //   file: files.file
      // }
      // // if(!formToUpload) {
      // //   return  res.status(500).send({ postsError: 'something went wrong' });
      // // }
      // // console.log('form', form)
      // console.log('form', formData)
      // var bodyStream = fs.createReadStream(files.file.filepath);

      // const formData = {
      //   file: bodyStream,
      //   sub_id: subId
      // }

      // console.log(JSON.stringify(formData))
      const APIresponse = await fetch(POSTS_URL, {
         method: 'POST',
         body: req.body,
         headers: requestHeaders,
       });
       console.log('api', APIresponse);
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
})

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// eslint-disable-next-line import/no-anonymous-default-export
// export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
//   if (req.method === 'GET') {
//     try {
//       const requestHeaders = setBaseHeaders(process.env.SECRET_API_KEY);
//       const query = `limit=100&include_vote=1&include_favourite=1`;
//       const APIresponse = await fetch(`${POSTS_URL}?${query}`, {
//         headers: requestHeaders,
//       });
//       const response = await APIresponse.json();
//       if (APIresponse.ok) {
//         return res.status(200).send(response);
//       }
//       return res.status(500).send({ postsError: 'something went wrong' });
//     } catch (error) {
//       console.error(error);
//       const err = 'something went wrong';
//       return res.status(500).json({ postsError: err });
//     }
//   }

//   if (req.method === 'POST') {
//     try {
//       let formToUpload;
//       let subId;
//       const form = new formidable.IncomingForm();
  
//       const result = await form.parse(req, (err, fields, files) => {
//         // console.log('hey', files);
//         formToUpload = files[0]
//         subId = fields.sub_id
        
//       });
//       console.log('result', formToUpload, subId)
//       const requestHeaders = setBaseHeaders(process.env.SECRET_API_KEY);
//       requestHeaders.append('Content-Type', 'multipart/form-data')
//       // const formData = {
//       //   sub_id: result.sub_id,
//       //   file: result.files[0]
//       // }
//       // if(!formToUpload) {
//       //   return  res.status(500).send({ postsError: 'something went wrong' });
//       // }
//       // console.log('form', form)
//       const APIresponse = await fetch(POSTS_URL, {
//         method: 'POST',
//         body: form,
//         headers: requestHeaders,
//       });
//       console.log('api', APIresponse);
//       const response = await APIresponse.json();

//       if (APIresponse.ok) {
//         return res.status(200).send(response);
//       }
//       return res.status(500).send({ postsError: 'something went wrong' });
//     } catch (error) {
//       console.error(error);
//       const err = 'something went wrong';
//       return res.status(500).json({ postsError: err });
//     }
//   }
// };

export default handler