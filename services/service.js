const models = require('../models');

module.exports = {

  createService: (service) => {
    return new Promise((resolve) => {
      models.service.create(service).then(service => {
        resolve(service.dataValues);
      });
    });
  },

  // get all services of a given user
  getServices: (userId) => {
    return new Promise((resolve) => {
      models.service.findAll({
        where: { userId }
      }).then(services => {
        if (services.length > 0) {
          const records = [];
          for (let i = 0; i < services.length; i++) {
            records[i] = services[i].dataValues;
          }
          resolve(records);
        } else {
          resolve([]);
        }
      });
    });
  }
};
