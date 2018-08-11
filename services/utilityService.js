/**
 * Created by: Varun kumar
 * Date: 08 July, 2018
 */
 
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const models = require('../models');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

module.exports = {

  getToken: ({ mobile, name, id, email }) => {
    const expiresIn = config.tokenMaxAge; // 30 days (30 * 24 * 60 * 60)

    // create a token
    const token = jwt.sign({
      mobile,
      name,
      id,
      email
    }, config.superSecret, {
      expiresIn: expiresIn
    });

    return token;
  },

  isInt: (value) => (!isNaN(value) 
      && (parseInt(Number(value)) === value) 
      && (!isNaN(parseInt(value, 10)))
  ),

  swapValues: (arr) => {
    let temp = arr[0];
    arr[0] = arr[1];
    arr[1] = temp;
    return arr;
  },

  saveRequestLog: (params) => {
    models.requestLog.create(params).then(() => {
      console.log('Info Request log added');
    }).catch((err) => {
      console.error('Error saveRequestLog', err);
    });
  },

  generateOTP: () => {
    // 6 digits OTP
    const min = 100000;
    const max = 999999;

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

};