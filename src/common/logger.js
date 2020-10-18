const winston = require('winston');

winston.addColors({ info: 'bold blue', error: 'bold red' });

const infoLogger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.colorize({ all: true })
    }),
    new winston.transports.File({
      filename: 'info.log',
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.json()
      )
    })
  ]
});

const errorLogger = winston.createLogger({
  level: 'error',
  transports: [
    new winston.transports.Console({
      format: winston.format.colorize({ all: true })
    }),
    new winston.transports.File({
      filename: 'error.log',
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.json()
      )
    })
  ]
});

module.exports = { infoLogger, errorLogger };
