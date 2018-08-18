const { OAuth2Client } = require('google-auth-library');
const bcrypt = require('bcrypt');

const sellerService = require('../services/seller');
const statusCode = require('../constants/statusCode');
const logger = require('../modules/logger');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const googleSigninAuthClient = new OAuth2Client(config.googleSigninClientId);

const { doesSuchSellerExist } = require('../services/validations/seller');
const { getSellerById } = require('../services/seller');
const { generateOTP } = require('./utility');

module.exports = {

  loginUsingGoogle: (params) => {
    return new Promise((resolve, reject) => {
      const { idToken, latitude, longitude } = params;

      googleSigninAuthClient.verifyIdToken({
        idToken: idToken,
        audience: config.googleSigninClientId
      }).then(ticket => {
        const payload = ticket.getPayload();

        doesSuchSellerExist(payload.email)
          .then(result => {
            if (result) {
              result = result.dataValues;
              return resolve([
                {
                  id: result.id,
                  mobile: result.mobile,
                  name: result.name,
                  email: result.email,
                  profilePic: result.profilePic
                },
                statusCode.OK
              ]);
            } else { 
              const seller = {
                email: payload.email,
                name: payload.name,
                profilePic: payload.picture,
                password: `${generateOTP()}`,
                latitude: latitude,
                longitude: longitude
              };

              sellerService.createSeller(seller)
                .then((seller) => {
                  return resolve([
                    {
                      id: seller.id,
                      mobile: seller.mobile,
                      name: seller.name,
                      email: seller.email,
                      profilePic: seller.profilePic
                    },
                    statusCode.CREATED
                  ]);
                }).catch((err) => {
                  logger.error(
                    'controller createSeller loginUsingGoogle:', err
                  );
                  return reject([
                    'Server side error', statusCode.INTERNAL_SERVER_ERROR
                  ]);
                });            
            }
          }).catch(err => {
            logger.error(
              'controller doesSuchSellerExist loginUsingGoogle:', err
            );
            return reject([
              'Server side error', statusCode.INTERNAL_SERVER_ERROR
            ]);
          });
      }).catch(err => {
        logger.error('controller googleSigninAuthClient.verifyIdToken', err);
        return reject(['Server side error', statusCode.INTERNAL_SERVER_ERROR]);
      });
    });
  },

  login: (params) => {
    return new Promise((resolve, reject) => {
      const { email, password } = params;

      doesSuchSellerExist(email)
        .then(result => {
          if (result) {
            result = result.dataValues;
            bcrypt.compare(password, result.password).then((res) => {
              if (res) {
                return resolve([
                  {
                    id: result.id,
                    mobile: result.mobile,
                    name: result.name,
                    email: result.email,
                    profilePic: result.profilePic
                  },
                  statusCode.OK
                ]);
              } else {
                return reject([
                  'Wrong password', statusCode.UNAUTHORIZED
                ]);
              }
            });
          } else { 
            return reject([
              'No such user exists', statusCode.UNAUTHORIZED
            ]);           
          }
        }).catch(err => {
          logger.error(
            'controller doesSuchSellerExist login:', err
          );
          return reject([
            'Server side error', statusCode.INTERNAL_SERVER_ERROR
          ]);
        });
    });
  },

  signup: (params) => {
    return new Promise((resolve, reject) => {
      const { email, password, latitude, longitude } = params;

      doesSuchSellerExist(email)
        .then(result => {
          if (result) {
            return reject([
              'User already exists. Try login', statusCode.BAD_REQUEST
            ]);
          } else { 
            const seller = { email, password, latitude, longitude };

            sellerService.createSeller(seller)
              .then((seller) => {
                return resolve([
                  {
                    id: seller.id,
                    email: seller.email
                  },
                  statusCode.CREATED
                ]);
              }).catch((err) => {
                logger.error('controller createSeller signup:', err);
                return reject([
                  'Server side error', statusCode.INTERNAL_SERVER_ERROR
                ]);
              });            
          }
        }).catch(err => {
          logger.error(
            'controller doesSuchSellerExist signup:', err
          );
          return reject([
            'Server side error', statusCode.INTERNAL_SERVER_ERROR
          ]);
        });
    });
  },

  getSellerById: id => {
    return getSellerById(id).then(seller => {
      if (!seller) {
        return ['Seller does not exist', statusCode.NOT_FOUND];
      }

      return [seller, statusCode.OK];
    }).catch(err => {
      logger.error('controller getSellerById', err);
      throw (['Servier side error', statusCode.INTERNAL_SERVER_ERROR]);
    });
  },

  getSeller: ({ email }) => {
    return new Promise((resolve, reject) => {
      doesSuchSellerExist(email)
        .then(result => {
          if (result) {
            result = result.dataValues;
            delete result.password;
            return resolve([
              result, statusCode.OK
            ]);
          } else { 
            return resolve([
              {}, statusCode.OK
            ]);           
          }
        }).catch(err => {
          logger.error(
            'controller doesSuchSellerExist getSeller:', err
          );
          return reject([
            'Server side error', statusCode.INTERNAL_SERVER_ERROR
          ]);
        });
    });
  },

  updateSeller: (params) => {
    const { id, decodedId } = params;
    return new Promise((resolve, reject) => {
      if (id != decodedId) {
        // You can not update other seller's information
        return reject(['Not authorized', statusCode.FORBIDDEN]);
      }

      doesSuchSellerExist(params.email)
        .then(result => {
          if (result) {
            sellerService.updateSeller(params)
              .then((seller) => {
                delete seller.password;
                return resolve([
                  seller, statusCode.OK
                ]);
              }).catch((err) => {
                logger.error(
                  'controller updateSeller:', err
                );
                return reject([
                  'Server side error', statusCode.INTERNAL_SERVER_ERROR
                ]);
              });
          } else { 
            return reject([
              'No such Seller Exist', statusCode.BAD_REQUEST
            ]);           
          }
        }).catch(err => {
          logger.error(
            'controller doesSuchSellerExist updateSeller:', err
          );
          return reject([
            'Server side error', statusCode.INTERNAL_SERVER_ERROR
          ]);
        });
    });
  }
};
