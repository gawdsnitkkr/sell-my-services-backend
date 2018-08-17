const bcrypt = require('bcrypt');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const models = require('../models');

module.exports = {

  createSeller: (seller) => {
    return bcrypt.hash(seller.password, config.bcryptSaltRounds).then(hash => {
      seller.password = hash;
      return models.seller.create(seller).then(seller => seller.dataValues);
    });
  },

  updateSeller: params => {
    return models.seller.findOne({
      where: {
        id: params.id
      }
    }).then(async seller => {
      if (!seller) {
        throw ('No such seller Exist');
      }

      // update password
      if (params.password) {
        params.password = await bcrypt.hash(params.password, config.bcryptSaltRounds);
      }

      return seller.updateAttributes(params).then(seller => seller.dataValues);
    });
  }
};
