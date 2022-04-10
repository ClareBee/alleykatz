import nextConnect from 'next-connect';
import multipartFormParser from './multi-part-form-parser';

const middleware = nextConnect();

middleware.use(multipartFormParser);

export default middleware;
