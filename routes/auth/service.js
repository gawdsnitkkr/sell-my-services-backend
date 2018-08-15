const express = require('express');
const router = express.Router();

/*const sellerService = require('../../services/sellerService');

// Create a new Service
router.post('/services', (req, res) => {
  const params = req.body;
  params.sellerId = req.decoded.id;
  sellerService.addService(params)
    .then(service => { 
      res.json({
        success: true,
        result: service
      });
    }).catch(err => {
      if (typeof(err) != 'string') {
        console.error('Error /auth/seller/add/service', err);
        err = 'Server side error';
      }
      res.json({
        success: false,
        message: err
      });
    });
});


// Updates a service
router.put('/services', (req, res) => {
  const params = req.body;
  sellerService.updateService(params)
    .then(service => { 
      res.json({
        success: true,
        result: service
      });
    }).catch(err => {
      if (typeof(err) != 'string') {
        console.error('Error /auth/seller/update/service', err);
        err = 'Server side error';
      }
      res.json({
        success: false,
        message: err
      });
    });
});*/

module.exports = router;