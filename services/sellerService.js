/**
 * Created by: Varun kumar
 * Date: 08 July, 2018
 *
 * A seller is the entity who sell his services through SellMyService app
 */

const { doesSuchSellerExist, doesSuchServiceExist } = require('./validationService');
const models = require('../models');

const bcrypt = require('bcrypt');

module.exports = {

  signup: function({ email, latitude, longitude, password }) {
    return new Promise((resolve, reject) => {
      if (!email || !latitude || !longitude || !password) {
        reject('Missing params');
      } else {
        doesSuchSellerExist(email)
          .then(result => {
            if (result) {
              reject('This email has been used. Try Login');
            } else { 
              bcrypt.hash(password, 2).then((hash) => {
                password = hash;
                // insert seller info to db
                models.seller.create({ email, latitude, longitude, password }).then(seller => {
                  resolve(seller.dataValues);
                }).catch((err) => {
                  console.error(
                    'Error signup sellerService:', err
                  );
                  reject('Server side error');
                });
              }).catch((err) => {
                const errorMessage = 'Error signup '
                        + 'sellerService encrypting password';
                console.error(errorMessage, err);
                reject('Server side error');
              });             
            }
          }).catch(err => {
            console.error(
              'Error signup sellerService validation', err
            );
            reject('Server side error');
          });
      }
    });
  },

  login: function({ email, password }) {
    return new Promise((resolve, reject) => {
      if (!email || !password) {
        return reject('Missing params');
      } else {
        doesSuchSellerExist(email)
          .then(result => {
            if (result) {
              const seller = result;
              bcrypt.compare(
                password, 
                seller.dataValues.password
              ).then((res) => {
                if (res === true) {
                  resolve(seller.dataValues);
                } else {
                  reject('Password mismatch');
                }
              }).catch((err) => {
                const errorMessage = 'Error login sellerService decrypting password';
                console.error(errorMessage, err);
                reject('Server side error');
              });
            } else {
              reject('Seller does not exist');
            }
          }).catch(err => {
            console.error(
              'Error login sellerService validation', err
            );
            reject('Server side error');
          });
      }
    });
  },

  getSeller: function({ email }) {
    return new Promise((resolve, reject) => {
      if (!email) {
        return reject('Invalid Request');
      } else {
        doesSuchSellerExist(email)
          .then(result => {
            if (result) {
              const seller = result;
              resolve(seller.dataValues);
            } else {
              reject('Seller does not exist');
            }
          }).catch(err => {
            console.error(
              'Error getSeller sellerService validation', err
            );
            reject('Server side error');
          });
      }
    });
  },

  updateSeller: function({ email }) {
    return new Promise((resolve, reject) => {
      if (!email) {
        reject('Missing Params');
      } else {
        models.seller.findOne({
          where: {
            email: email
          }
        }).then(seller => {
          if (seller) {
            seller.updateAttributes({ email })
              .then(seller => {
                resolve(seller.dataValues);
              }).catch(err => {
                console.error(
                  'Error updateSeller sellerService', err
                );
                reject('Server side error');
              });
          } else {
            reject('No such Seller exist');
          }
        }).catch(err => {
          console.error(
            'Error updateSeller sellerService findOne', err
          );
          reject('Server side error');
        });
      }
    });
  },

  addService: function({ name, sellerId }) {
    return new Promise((resolve, reject) => {
      if (!name || !sellerId) {
        reject('Missing Params');
      } else {
        models.service.create({ name, sellerId }).then(service => {
          resolve(service.dataValues);
        }).catch((err) => {
          console.error(
            'Error addService sellerService:', err
          );
          reject('Server side error');
        });
      }
    });
  },

  updateService: function({ email, serviceId, ...rest }) {
    return new Promise((resolve, reject) => {
      if (!email || !serviceId) {
        reject('Missing Params');
      } else {
        doesSuchServiceExist(email)
          .then(result => {
            if (result) {
              const service = result;
              service.updateAttributes(rest)
                .then(service => {
                  resolve(service.dataValues);
                }).catch(err => {
                  console.error(`Error updateService sellerService ${err}`);
                  reject('Server side error');
                });

            } else { 
              reject('No such service exist');             
            }
          }).catch(err => {
            console.error(`Error updateService sellerService validation ${err}`);
            reject('Server side error');
          });
      }
    });
  }
};