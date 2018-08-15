const express = require('express');
const router = express.Router();
const { requireParameters } = require('../../middlewares');

const logger = require('../../modules/logger');
const serviceController = require('../../controllers/service');

router.post('/services', requireParameters(['name']), (req, res) => {
  const params = req.body;
  params.sellerId = req.decoded.id;
  params.sellerEmail = req.decoded.email;

  serviceController.createService(params)
    .then(([service, responseCode]) => { 
      res.status(responseCode)
        .json({
          success: true,
          result: service
        });
    }).catch(([err, responseCode]) => {
      res.status(responseCode);
      if (typeof(err) !== 'string') {
        logger.error('routes /auth/services POST', err);
        err = 'Server side error';
      }
      res.json({
        success: false,
        message: err
      });
    });
});

// get all or one service of seller
router.get('/services', (req, res) => {
  const params = {
    sellerId: req.decoded.id,
    sellerEmail: req.decoded.email
  };
  params.id = req.query.id;
  serviceController.getServices(params)
    .then(([services, responseCode]) => { 
      res.status(responseCode)
        .json({
          success: true,
          result: services // might be object or array depending upon whether params.id is present
        });
    }).catch(([err, responseCode]) => {
      res.status(responseCode);
      if (typeof(err) !== 'string') {
        logger.error('routes /auth/services GET', err);
        err = 'Server side error';
      }
      res.json({
        success: false,
        message: err
      });
    });
});


// Update seller service
router.put('/services', requireParameters(['id']), (req, res) => {
  const params = req.body;
  params.sellerId = req.decoded.id;
  params.sellerEmail = req.decoded.email;
  serviceController.updateService(params)
    .then(([service, responseCode]) => { 
      res.status(responseCode)
        .json({
          success: true,
          result: service
        });
    }).catch(([err, responseCode]) => {
      res.status(responseCode);
      if (typeof(err) !== 'string') {
        logger.error('routes /auth/services PUT', err);
        err = 'Server side error';
      }
      res.json({
        success: false,
        message: err
      });
    });
});

module.exports = router;
