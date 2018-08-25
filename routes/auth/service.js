const express = require('express');
const router = express.Router();
const { requireParameters } = require('../../middlewares');

const logger = require('../../modules/logger');
const serviceController = require('../../controllers/service');

router.post('/services', requireParameters(['name']), (req, res) => {
  const params = req.body;
  params.userId = req.decoded.id;

  // email is userEmail and sellerEmail because now user is acting as seller
  params.userEmail = req.decoded.email;

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

// get all services of seller
router.get('/services', (req, res) => {
  const params = {
    userId: req.decoded.id,
    userEmail: req.decoded.email
  };
  
  serviceController.getServices(params)
    .then(([services, responseCode]) => { 
      res.status(responseCode)
        .json({
          success: true,
          result: services // array
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

router.get('/services/:id', (req, res) => {
  const params = {
    userId: req.decoded.id,
    userEmail: req.decoded.email,
    id: req.query.id // serviceId
  };
  
  serviceController.getService(params)
    .then(([service, responseCode]) => { 
      res.status(responseCode)
        .json({
          success: true,
          result: service // object
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
  params.userId = req.decoded.id;
  params.userEmail = req.decoded.email;

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
