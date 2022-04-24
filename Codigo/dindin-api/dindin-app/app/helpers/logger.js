require("dotenv").config();
const winston = require('winston');
const winstonRotator = require('winston-daily-rotate-file');

let access_filename = './logs/access.log';
let error_filename = './logs/error.log';
if (process.env.NODE_ENV == 'test') {
  access_filename = './logs/access-test.log';
  error_filename = './logs/error-test.log';
}

var logger = new winston.createLogger({
  transports: [
    new (winston.transports.DailyRotateFile)({
      name: 'access-file',
      level: 'info',
      filename: access_filename,
      json: false,
      datePattern: 'yyyy-MM-DD',
      prepend: true,
      maxFiles: 10,
      dirname: "./logs"
    }),
    new (winston.transports.DailyRotateFile)({
      name: 'error-file',
      level: 'error',
      filename: error_filename,
      json: false,
      datePattern: 'yyyy-MM-DD',
      prepend: true,
      maxFiles: 10,
      dirname: "./logs"
    })
  ]
});


module.exports = {
  logger
};
