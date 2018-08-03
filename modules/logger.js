const winston = require('winston');
const fs = require('fs');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const logDirectory = 'logs';

if (!fs.existsSync(logDirectory)) {
  // Create the directory if it does not exist
  fs.mkdirSync(logDirectory);
}

let logTransport;
if (env === 'development') {
  logTransport = new winston.transports.Console({
    level: config.logLevel,
    handleExceptions: true
  });
} else {
  logTransport = new winston.transports.File({
    level: config.logLevel,
    filename: './logs/all-logs.log',
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5
  });
}

/**
 * Log levels- error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5
 * here winston.format.json() is not working in production but not issue
 */
const logger = winston.createLogger({
  format: winston.format.combine(
    (env === 'development' ? 
      winston.format.colorize({all: true}) : winston.format.json()),
    winston.format.timestamp({
      format: 'DD-MM-YYYY HH:mm:ss'
    }),
    winston.format.align(),
    winston.format.printf((info) => {
      const {
        timestamp, level, message, ...args
      } = info;
      let object = '';
      if (Object.keys(args).length > 0) {
        object = JSON.stringify(args);
      }
      return `${timestamp} [${level}]: ${message} ${object}`;
    })
  ),
  transports: [logTransport],
  exitOnError: false
});

module.exports = logger;