const config = require('../config');

exports.allowCrossDomain = (req, res, next) => {
  const allowedCors = config.CLIENT_URLS;
  let origin = '';
  if (req.headers.origin) {
    origin = allowedCors.includes(req.headers.origin.toLowerCase())
      ? req.headers.origin
      : '';
  }
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,authorization');

  next();
};

// eslint-disable-next-line no-unused-vars
exports.errorHandler = (err, req, res, next) => {
  if (err.isServer) {
    if (err.name === 'ValidationError') {
      const errorPayload = {
        statusCode: 400,
        error: 'Validation Error',
        messages: err.errors && Object.values(err.errors).map(error => error.message),
        // ...err
      };
      return res.status(400).json(errorPayload);
    }
    console.log(err);
    return res.sendStatus(err.output.statusCode);
  }
  return res.status(err.output.statusCode).json(err.output.payload);
};

