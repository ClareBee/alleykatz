import formidable from 'formidable';

const form = formidable({ multiples: false });

export default async function parseMultipartForm(req, res, next) {
  const contentType = req.headers['content-type'];
  if (contentType && contentType.indexOf('multipart/form-data') !== -1) {
    form.parse(req, (err, fields, files) => {
      if (!err) {
        req.body = fields; // sets the body field in the request object
        req.body.file = files; // sets the files field in the request objectx
      }
      next(); // continues to the next middleware or to the route
    });
  } else {
    next();
  }
}
