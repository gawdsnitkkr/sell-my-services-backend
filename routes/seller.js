const express = require('express');
const router = express.Router();

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const logger = require('../modules/logger');

const { getToken } = require('./utility');
const sellerController = require('../controllers/seller');

router.post('/google-token-signin', (req, res) => {
  const params = req.body;
  sellerController.loginUsingGoogle(params)
    .then(([seller, responseCode]) => { 
      res.status(responseCode);
      const token = getToken(seller);
      const successObject = {
        success: true,
        result: seller
      };
      successObject[config.tokenName] = token;
      successObject.expiresIn = config.tokenMaxAge;
      res.json(successObject);
    }).catch(([err, responseCode]) => {
      res.status(responseCode);
      if (typeof(err) !== 'string') {
        logger.error('routes /sellers/google-token-signin', err);
        err = 'Server side error';
      }
      res.json({
        success: false,
        message: err
      });
    });
});

router.post('/login', (req, res) => {
  const params = req.body;
  sellerController.login(params)
    .then(([seller, responseCode]) => { 
      res.status(responseCode);
      const token = getToken(seller);
      const successObject = {
        success: true,
        result: seller
      };
      successObject[config.tokenName] = token;
      successObject.expiresIn = config.tokenMaxAge;
      res.json(successObject);
    }).catch(([err, responseCode]) => {
      res.status(responseCode);
      if (typeof(err) !== 'string') {
        logger.error('routes /sellers/login', err);
        err = 'Server side error';
      }
      res.json({
        success: false,
        message: err
      });
    });
});

router.post('/signup', (req, res) => {
  const params = req.body;
  sellerController.signup(params)
    .then(([seller, responseCode]) => { 
      res.status(responseCode);
      const token = getToken(seller);
      const successObject = {
        success: true,
        result: seller
      };
      successObject[config.tokenName] = token;
      successObject.expiresIn = config.tokenMaxAge;
      res.json(successObject);
    }).catch(([err, responseCode]) => {
      res.status(responseCode);
      if (typeof(err) !== 'string') {
        logger.error('routes /sellers/signup', err);
        err = 'Server side error';
      }
      res.json({
        success: false,
        message: err
      });
    });
});

module.exports = router;