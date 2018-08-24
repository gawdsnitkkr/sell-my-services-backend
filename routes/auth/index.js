const express = require('express');
const router = express.Router();

const { verifyToken } = require('../../middlewares');

const serviceRoutes = require('./service');

router.use('/auth', verifyToken, serviceRoutes);

module.exports = router;
