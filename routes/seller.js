/**
 * Created by: Varun kumar
 * Date: 11 July, 2018
 */

const express = require('express');
const router = express.Router();

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const utilityService = require('../services/utilityService');
const sellerService = require('../services/sellerService');

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

module.exports = router;