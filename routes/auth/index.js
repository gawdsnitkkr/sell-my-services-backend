const express = require('express');
const router = express.Router();

const { verifyToken } = require('../../middlewares');

const sellerRoutes = require('./seller');
const serviceRoutes = require('./service');

// middleware to verify a token
router.use(verifyToken);

router.use('/sellers', sellerRoutes);
router.use('/services', serviceRoutes);

module.exports = router;
