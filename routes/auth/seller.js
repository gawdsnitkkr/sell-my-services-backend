const express = require('express');
const router = express.Router();

const logger = require('../../modules/logger');
const sellerController = require('../../controllers/seller');

/**
 * This route will fetch seller profile and not all sellers because it'll be 
 * used by seller.
 * todo: setup admin routes to fetch all sellers
 */
router.get('/sellers', (req, res) => {
  const params = {
    id: req.decoded.id,
    email: req.decoded.email
  };
  sellerController.getSeller(params)
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
router.put('/sellers', (req, res) => {
  const params = req.body;
  params.id = req.decoded.id;
  params.email = req.decoded.email;
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

module.exports = router;
