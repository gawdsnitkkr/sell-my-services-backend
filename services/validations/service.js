const models = require('../../models');

module.exports = {

  doesSuchServiceExist: ({ serviceId, email  }) => {
    return new Promise((resolve) => {
      const condition = {
        id: serviceId
      };
      
      models.service.findOne({
        where: condition,
        include: [
          {
            model: models.seller,
            attributes: ['email']
          }
        ]
      }).then((service) => {
        if (service) {
          if (service.seller.email === email) {
            resolve(service);
          } else {
            resolve(false);
          }
        } else {
          resolve(false);
        }
      });
    });
  }

};