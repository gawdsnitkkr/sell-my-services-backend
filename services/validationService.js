/**
 * Created by: Varun kumar
 * Date: 08 July, 2018
 */
 
const models = require('../models');

module.exports = {

  doesSuchSellerExist: function(email) {
    return new Promise((resolve, reject) => {
      const where = { email };
			
      models.seller.findOne({ where }).then(seller => {
        if (seller) {
          resolve(seller);
        } else {
          resolve(false);
        }
      }).catch((err) => {
        reject(err);
      });
    });
  },

  doesSuchServiceExist: function({ serviceId, email  }) {
    return new Promise((resolve, reject) => {
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
      }).catch((err) => {
        reject(err);
      });
    });
  }

};