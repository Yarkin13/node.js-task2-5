const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const errorHandler = require('./common/errorHandler');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
const { infoLogger, errorLogger } = require('./common/logger');

app.use(express.json());

process.on('uncaughtException', error => {
  console.error(`Captured error: ${error.message}`);
});

process.on('unhandledRejection', reason => {
  console.error(`Unhandled rejection detected: ${reason.message}`);
});

/* setTimeout(() => {
  throw new Error('Ooops, exception');
}, 1500); */

/* setTimeout(() => {
  Promise.reject(new Error('Ooops, promise reject'));
}, 1500); */

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use((req, res, next) => {
  infoLogger.log('info', {
    time: new Date(),
    url: req.url,
    query: req.query,
    method: req.method,
    body: req.body,
    code: res.statusCode
  });
  next();
});

app.use('/users', userRouter);

app.use('/boards', boardRouter);

app.use('/boards', taskRouter);

app.use(errorHandler);

app.use((err, req, res, next) => {
  errorLogger.log('error', `Error, code:${err.status}, message:${err.message}`);
  next();
});

module.exports = app;
