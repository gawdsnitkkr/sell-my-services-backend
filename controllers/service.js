const serviceService = require('../services/service');
const statusCode = require('../constants/statusCode');
const logger = require('../modules/logger');

const { doesSuchServiceExist } = require('../services/validations/service');
const { doesSuchUserExist } = require('../services/validations/user');

module.exports = {

  createService: (params) => {
    return new Promise((resolve, reject) => {
      doesSuchUserExist(params.userEmail)
        .then(result => {
          if (result) {
            serviceService.createService(params)
              .then((service) => {
                return resolve([service, statusCode.OK]);
              }).catch((err) => {
                logger.error(
                  'controller createService', err
                );
                return reject([
                  'Server side error', statusCode.INTERNAL_SERVER_ERROR
                ]);
              });
          } else { 
            return reject([
              'No such seller exists', statusCode.BAD_REQUEST
            ]);    
          }
        }).catch(err => {
          logger.error(
            'controller doesSuchUserExist createService:', err
          );
          return reject([
            'Server side error', statusCode.INTERNAL_SERVER_ERROR
          ]);
        });
    });
  },

  /**
   * fetch all services of given seller
   */
  getServices: (params) => {
    return new Promise((resolve, reject) => {
      const { userId, userEmail } = params;

      doesSuchUserExist(userEmail)
        .then(result => {
          if (result) {
            serviceService.getServices(userId)
              .then((services) => {
                return resolve([services, statusCode.OK]);
              }).catch((err) => {
                logger.error(
                  'controller serviceService getServices', err
                );
                return reject([
                  'Server side error', statusCode.INTERNAL_SERVER_ERROR
                ]);
              });
          } else {
            return reject([
              'No such seller exists', statusCode.BAD_REQUEST
            ]);        
          }
        }).catch(err => {
          logger.error(
            'controller doesSuchUserExist getServices:', err
          );
          return reject([
            'Server side error', statusCode.INTERNAL_SERVER_ERROR
          ]);
        });

    });
  },

  // fetch one service
  getService: (params) => {
    return new Promise((resolve, reject) => {
      const { id, userEmail } = params;

      doesSuchServiceExist(id, userEmail)
        .then((service) => {
          if (service) {
            return resolve([service.dataValues, statusCode.OK]);
          } else {
            return reject([
              'No such service exists', statusCode.BAD_REQUEST
            ]);
          }
        }).catch((err) => {
          logger.error(
            'controller doesSuchServiceExist getService', err
          );
          return reject([
            'Server side error', statusCode.INTERNAL_SERVER_ERROR
          ]);
        });
    });
  },

  updateService: (params) => {
    return new Promise((resolve, reject) => {
      const { id, userEmail } = params;
      doesSuchServiceExist(id, userEmail)
        .then((service) => {
          if (service) {
            service.updateAttributes(params)
              .then((service) => {
                return resolve([service.dataValues, statusCode.OK]);
              }).catch((err) => {
                logger.error(
                  'controller updateAttributes updateService', err
                );
                return reject([
                  'Server side error', statusCode.INTERNAL_SERVER_ERROR
                ]);
              });
          } else {
            return reject([
              'No such service exists', statusCode.BAD_REQUEST
            ]);
          }
        }).catch((err) => {
          logger.error(
            'controller doesSuchServiceExist updateService', err
          );
          return reject([
            'Server side error', statusCode.INTERNAL_SERVER_ERROR
          ]);
        });
    });
  }
};
