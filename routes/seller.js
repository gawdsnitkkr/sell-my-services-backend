/**
 * Created by: Varun kumar
 * Date: 11 July, 2018
 */

const express = require('express');
const router = express.Router();

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

router.post('/signup', (req, res, next) => {
    res.render('index');
});

router.post('/login', (req, res, next) => {
    res.render('index');
});

module.exports = router;