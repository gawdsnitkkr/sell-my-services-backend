const bcrypt = require('bcrypt');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const models = require('../models');

module.exports = {

  createSeller: (seller) => {
    bcrypt.hash(seller.password, 2).then((hash) => {
      seller.password = hash;

      // insert seller info to db
      models.seller.create(seller).then(seller => {
        resolve(seller.dataValues);
      });
    });
  }
};