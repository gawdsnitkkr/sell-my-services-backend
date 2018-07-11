/**
 * Created by: Varun kumar
 * Date: 11 July, 2018
 */

const express = require('express');
const router = express.Router();

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

// middleware to verify a token
router.use(middlewares.verifyToken);

router.post('/seller/update', (req, res, next) => {
});

module.exports = router;