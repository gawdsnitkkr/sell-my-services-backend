const models = require('../models');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const logger = require('../modules/logger');

module.exports = {

  saveRequestLog: (params) => {
    models.requestLog.create(params).then(() => {
      logger.info('Request log added');
    }).catch((err) => {
      logger.error('saveRequestLog', err);
    });
  }

};