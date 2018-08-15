const { OAuth2Client } = require('google-auth-library');

const sellerService = require('../services/seller');
const statusCode = require('../constants/statusCode');
const logger = require('../modules/logger');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const googleSigninAuthClient = new OAuth2Client(config.googleSigninClientId);

const { doesSuchSellerExist } = require('../services/validations/seller');
const { generateOTP } = require('./utility');

module.exports = {

  loginUsingGoogle: (params) => {
    return new Promise((resolve, reject) => {
      const { idToken, latitude, longitude } = params;
      if (!idToken || !latitude || !longitude) {
        return reject(['Missing params', statusCode.BAD_REQUEST]);
      }

      googleSigninAuthClient.verifyIdToken({
        idToken: idToken,
        audience: config.googleSigninClientId
      }).then(ticket => {
        const payload = ticket.getPayload();

        doesSuchSellerExist(payload.email)
          .then(result => {
            if (result) {
              resolve([result, statusCode.OK]);
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
                  resolve([
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
                  logger.error('controller createSeller:', err);
                  reject([
                    'Server side error', statusCode.INTERNAL_SERVER_ERROR
                  ]);
                });            
            }
          }).catch(err => {
            logger.error(
              'controller doesSuchSellerExist:', err
            );
            reject(['Server side error', statusCode.INTERNAL_SERVER_ERROR]);
          });
      }).catch(err => {
        logger.error('controller googleSigninAuthClient.verifyIdToken', err);
        reject(['Server side error', statusCode.INTERNAL_SERVER_ERROR]);
      });
    });
  }
}