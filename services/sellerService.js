const { OAuth2Client } = require('google-auth-library');
const bcrypt = require('bcrypt');

const logger = require('../modules/logger');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const googleSigninAuthClient = new OAuth2Client(config.googleSigninClientId);

const { 
  doesSuchSellerExist, 
  doesSuchServiceExist 
} = require('./validationService');

const { generateOTP } = require('./utilityService');

const models = require('../models');

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
                models.seller.create({ 
                  email, latitude, longitude, password 
                }).then(seller => {
                  resolve({
                    id: seller.dataValues.id,
                    mobile: seller.dataValues.mobile,
                    name: seller.dataValues.name,
                    email: seller.dataValues.email,
                    profileUrl: seller.dataValues.profileUrl
                  });
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
                  resolve({
                    id: seller.dataValues.id,
                    mobile: seller.dataValues.mobile,
                    name: seller.dataValues.name,
                    email: seller.dataValues.email,
                    profileUrl: seller.dataValues.profileUrl
                  });
                } else {
                  reject('Password mismatch');
                }
              }).catch((err) => {
                const errorMessage = 
                    'Error login sellerService decrypting password';
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

  loginUsingGoogle: function({ idToken, latitude, longitude }) {
    return new Promise((resolve, reject) => {
      if (!idToken || !latitude || !longitude) {
        return reject('Missing params');
      }
      googleSigninAuthClient.verifyIdToken({
        idToken: idToken,
        audience: config.googleSigninClientId
      }).then(ticket => {
        const payload = ticket.getPayload();

        doesSuchSellerExist(payload.email)
          .then(result => {
            if (result) {
              resolve(result);
            } else { 
              const seller = {
                email: payload.email,
                name: payload.name,
                profileUrl: payload.picture,
                password: generateOTP() + '', // converting to string
                latitude: latitude,
                longitude: longitude
              };

              bcrypt.hash(seller.password, 2).then((hash) => {
                seller.password = hash;

                // insert seller info to db
                models.seller.create(seller).then(seller => {
                  resolve({
                    id: seller.dataValues.id,
                    mobile: seller.dataValues.mobile,
                    name: seller.dataValues.name,
                    email: seller.dataValues.email,
                    profileUrl: seller.dataValues.profileUrl
                  });
                }).catch((err) => {
                  logger.error('Error signup sellerService:', err);
                  reject('Server side error');
                });
              }).catch((err) => {
                const errorMessage = 'Error signup '
                        + 'sellerService encrypting password';
                logger.error(errorMessage, err); // to-debug: err is not getting printed
                reject('Server side error');
              });             
            }
          }).catch(err => {
            logger.error(
              'Error loginUsingGoogle sellerService validation', err
            );
            reject('Server side error');
          });
      }).catch(err => {
        logger.error(err);
        reject('Server side error');
      });
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
            console.error(
              `Error updateService sellerService validation ${err}`
            );
            reject('Server side error');
          });
      }
    });
  }
};