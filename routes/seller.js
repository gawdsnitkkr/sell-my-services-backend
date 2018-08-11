const express = require('express');
const router = express.Router();

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const logger = require('../modules/logger');

const utilityService = require('../services/utilityService');
const sellerService = require('../services/sellerService');

const statusCode = require('../constants/statusCode');

router.post('/signup', (req, res) => {
  const params = req.body;
  sellerService.signup(params)
    .then(seller => {
      const token = utilityService.getToken(seller);
      res.cookie(config.tokenName, token, { 
        maxAge: config.tokenMaxAge, //30 * 24 * 60 * 60 (30 days) 
        httpOnly: true 
      });
      res.json({
        success: true,
        result: seller
      });
    }).catch(err => {
      if (typeof(err) != 'string') {
        console.error('Error /seller/signup', err);
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
  sellerService.login(params)
    .then(seller => { 
      const token = utilityService.getToken(seller);
      res.cookie(config.tokenName, token, { 
        maxAge: config.tokenMaxAge, //30 * 24 * 60 * 60 (30 days) 
        httpOnly: true 
      });
      res.json({
        success: true,
        result: seller
      });
    }).catch(err => {
      if (typeof(err) != 'string') {
        console.error('Error /seller/login', err);
        err = 'Server side error';
      }
      res.json({
        success: false,
        message: err
      });
    });
});

router.post('/google-token-signin', (req, res) => {
  const params = req.body;
  sellerService.loginUsingGoogle(params)
    .then(seller => { 
      res.status(statusCode.CREATED);
      const token = utilityService.getToken(seller);
      const successObject = {
        success: true,
        result: seller
      };
      successObject[config.tokenName] = token;
      successObject.expiresIn = config.tokenMaxAge;
      res.json(successObject);
    }).catch(err => {
      if (typeof(err) !== 'string') {
        res.status(statusCode.INTERNAL_SERVER_ERROR);
        logger.error('Error /seller/google-token-signin', err);
        err = 'Server side error';
      } else {
        res.status(statusCode.BAD_REQUEST);
      }
      res.json({
        success: false,
        message: err
      });
    });
});

module.exports = router;