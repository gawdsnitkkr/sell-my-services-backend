const express = require('express');
const router = express.Router();

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const { requireParameters } = require('../middlewares');
const logger = require('../modules/logger');
const { verifyToken } = require('../middlewares');
const { getToken } = require('./utility');
const sellerController = require('../controllers/seller');

router.get('/:id', (req, res) => {
  sellerController.getSellerById(req.params.id)
    .then(([seller, responseCode]) => { 
      res.status(responseCode)
        .json({
          success: true,
          result: seller
        }); 
    }).catch(([err, responseCode]) => {
      res.status(responseCode);
      if (typeof(err) !== 'string') {
        logger.error('routes /auth/sellers GET', err);
        err = 'Server side error';
      }
      res.json({
        success: false,
        message: err
      });
    });
});

// Update seller profile
router.put('/:id', verifyToken, (req, res) => {
  const params = {
    ...req.body,
    id: req.params.id,
    decodedId: req.decoded.id,
    email: req.decoded.email
  };

  sellerController.updateSeller(params)
    .then(([seller, responseCode]) => { 
      res.status(responseCode)
        .json({
          success: true,
          result: seller
        });
    }).catch(([err, responseCode]) => {
      res.status(responseCode);
      if (typeof(err) !== 'string') {
        logger.error('routes /auth/sellers PUT', err);
        err = 'Server side error';
      }
      res.json({
        success: false,
        message: err
      });
    });
});

const requiredGoogleSigninParams = 
    requireParameters(['longitude', 'latitude', 'idToken']);
router.post('/google-token-signin', requiredGoogleSigninParams, (req, res) => {
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

router.post('/login', requireParameters(['email', 'password']), (req, res) => {
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


const requiredSignupParams = requireParameters([
  'latitude', 'longitude', 'email', 'password'
]);
router.post('/signup', requiredSignupParams, (req, res) => {
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
