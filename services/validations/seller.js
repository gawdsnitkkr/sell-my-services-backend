const models = require('../../models');

module.exports = {

  doesSuchSellerExist: (email) => {
    return new Promise((resolve, reject) => {
      const where = { email };
			
      models.seller.findOne({ where }).then(seller => {
        if (seller) {
          resolve({
            id: seller.dataValues.id,
            mobile: seller.dataValues.mobile,
            name: seller.dataValues.name,
            email: seller.dataValues.email,
            profilePic: seller.dataValues.profilePic
          });
        } else {
          resolve(false);
        }
      });
    });
  }

};