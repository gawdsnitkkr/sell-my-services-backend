/**
 * @author Varun Kumar<varunon9@gmail.com>
 * https://github.com/varunon9
 * Date: 08 July, 2018
 */

const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const utilityService = require('../services/utilityService');
const logger = require('../modules/logger');

module.exports = {

  logRequest: function(req, res, next) {
    const ipAddress = (
      req.headers['x-forwarded-for'] 
      && req.headers['x-forwarded-for'].split(',').pop())
      || req.connection.remoteAddress
      || req.socket.remoteAddress
      || req.connection.socket.remoteAddress;

    const url = req.originalUrl;
    const body = req.body;

    logger.info('IPAddress: ' + ipAddress);
    logger.info('Request Method: ' + req.method);
    logger.info('Request Url: ' + url);
    logger.info('Request Body: ', body);

    /**
     * Though we are logging all requests, search data is critical to study
     * so saving it into database
     */
    if (url.indexOf('/search/sellers') >= 0) {
      utilityService.saveRequestLog({
        ipAddress: ipAddress,
        url: url,
        body: JSON.stringify(body)
      });
    }
    next();
  },

  verifyToken: function(req, res, next) {
    const tokenName = config.tokenName;
		
    // get token from cookies
    const token = req.cookies[tokenName];
		
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, config.superSecret, function(err, decoded) {      
        if (err) {
          //console.error(err);
          res.json({
            success: false,
            message: 'Failed to authenticate',
            loginRequired: true
          });    
        } else {

          // if everything is good, save to request for use in other routes
          req.decoded = decoded; 

          // so that entity can perform database operations (RUD) 
          // only on his data
          req.body.email = decoded.email;
          next();
        }
      });
    } else {
      res.json({
        success: false,
        message: 'Please login again',
        loginRequired: true
      });
    }
  }
};