const models = require('../../models');

module.exports = {

  doesSuchSellerExist: (email) => {
    return new Promise((resolve, reject) => {
      const where = { email };
			
      models.seller.findOne({ where }).then(seller => {
        if (seller) {
          resolve(seller);
        } else {
          resolve(false);
        }
      });
    });
  }

};