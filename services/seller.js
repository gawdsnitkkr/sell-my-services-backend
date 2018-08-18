const bcrypt = require('bcrypt');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const models = require('../models');

module.exports = {

  createSeller: async seller => {
    seller.password = 
        await bcrypt.hash(seller.password, config.bcryptSaltRounds);
    const { dataValues } = await models.seller.create(seller);
    return dataValues;
  },

  updateSeller: async params => {
    const seller = await models.seller.findOne({
      where: {
        id: params.id
      }
    });

    if (!seller) {
      throw ('No such seller Exist');
    }

    // update password
    if (params.password) {
      params.password = 
          await bcrypt.hash(params.password, config.bcryptSaltRounds);
    }

    const { dataValues } =  await seller.updateAttributes(params);
    return dataValues;
  },

  getSellerById: async id => {
    const seller = await models.seller.findOne({
      where: {
        id
      }
    });

    return seller ? seller.dataValues : null;
  }
};
