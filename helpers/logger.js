const morgan = require('morgan');
const log4js = require('log4js');

const logLevel = 'debug';

const logger = log4js.getLogger();
logger.level = logLevel;
const expressLogger = morgan('dev', {
  stream: {
    write(string) { logger.info(string); },
  },
});

module.exports = {
  expressLogger,
  logger,
  logLevel,
};
