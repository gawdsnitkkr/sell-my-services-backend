const models = require('../models');
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