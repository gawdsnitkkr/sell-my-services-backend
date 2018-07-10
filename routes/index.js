/**
 * Created by: Varun kumar
 * Date: 08 July, 2018
 */

const express = require('express');
const router = express.Router();

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index');
});

module.exports = router;