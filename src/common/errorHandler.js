const NotFoundError = require('./NotFoundError');

const errorHandler = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    res.status(err.status).send(err.message);
  } else {
    err.status = 500;
    err.message = 'Sorry. Something went wrong on the server';
    res.status(500).send('Sorry. Something went wrong on the server');
  }
  next(err);
};

module.exports = errorHandler;
