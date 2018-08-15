const bcrypt = require('bcrypt');

const models = require('../models');

module.exports = {

  createSeller: (seller) => {
    return new Promise((resolve) => {
      bcrypt.hash(seller.password, 2).then((hash) => {
        seller.password = hash;

        // insert seller info to db
        models.seller.create(seller).then(seller => {
          resolve(seller.dataValues);
        });
      });
    });
  },

  updateSeller: (params) => {
    return new Promise((resolve, reject) => {
      models.seller.findOne({
        where: {
          id: params.id
        }
      }).then(seller => {
        if (seller) {
          // update password
          if (params.password) {
            bcrypt.hash(params.password, 2).then((hash) => {
              params.password = hash;
              seller.updateAttributes(params)
                .then(seller => {
                  resolve(seller.dataValues);
                });
            });
          } else {
            seller.updateAttributes(params)
              .then(seller => {
                resolve(seller.dataValues);
              });
          }
        } else {
          reject('No such seller Exist');
        }
      });
    });
  }
};