const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const { saveRequestLog } = require('../services/utility');
const logger = require('../modules/logger');

const statusCode = require('../constants/statusCode');

module.exports = {

  logRequest: function(req, res, next) {
    const ipAddress =
        (req.headers['x-forwarded-for'] 
            && req.headers['x-forwarded-for'].split(',').pop())
        || req.connection.remoteAddress
        || req.socket.remoteAddress
        || req.connection.socket.remoteAddress;

    const url = req.originalUrl;
    const body = req.body;

    logger.info('IPAddress: ' + ipAddress);
    logger.info('Request Method: ' + req.method);
    logger.info('Request Url: ' + url);
    
    if (env === 'development') {
      logger.info('Request Body: ', body);
    }

    /**
     * Though we are logging all requests, search data is critical to study
     * so saving it into database
     */
    if (url.indexOf('/search/sellers') >= 0) {
      saveRequestLog({
        ipAddress: ipAddress,
        url: url,
        body: JSON.stringify(body)
      });
    }
    next();
  },

  verifyToken: function(req, res, next) {
    const tokenName = config.tokenName;
		
    // get token from custom-header
    const token = req.header(tokenName);
		
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, config.superSecret, (err, decoded) => {      
        if (err) {
          res.status(statusCode.UNAUTHORIZED)
            .json({
              success: false,
              message: 'Failed to authenticate'
            });    
        } else {

          // if everything is good, save to request for use in other routes
          req.decoded = decoded; 

          // so that entity can perform database operations (RUD) 
          // only on his data
          req.body.email = decoded.email;
          req.body.id = decoded.id;
          next();
        }
      });
    } else {
      res.status(statusCode.UNAUTHORIZED);
      res.json({
        success: false,
        message: 'Not Authorized'
      });
    }
  },

  requireParameters: function(paramList) {
    return function(req, res, next) {
      const { body, query } = req;

      for(let i = 0; i < paramList.length; i++) {
        const param = paramList[i];
        if(!body.hasOwnProperty(param) && !query.hasOwnProperty(param)) {
          return res.status(statusCode.BAD_REQUEST).json({
            success: false,
            message: `${param} is required`
          });          
        }
      }
      return next();
    };
  }
};
