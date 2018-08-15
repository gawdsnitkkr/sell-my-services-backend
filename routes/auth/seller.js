const express = require('express');
const router = express.Router();

/*const sellerService = require('../../services/sellerService');

// Get all the sellers
router.get('/sellers', (req, res) => {
  // TODO: Provide pagination and allow to fetch previous
  // and next pages
  const params = req.query;
  sellerService.getSeller(params)
    .then(seller => { 
      res.json({
        success: true,
        result: seller
      });
    }).catch(err => {
      if (typeof(err) != 'string') {
        console.error('Error /auth/seller/get', err);
        err = 'Server side error';
      }
      res.json({
        success: false,
        message: err
      });
    });
});


// Update information of a seller
router.put('/sellers', (req, res) => {
  const params = req.body;
  sellerService.updateSeller(params)
    .then(seller => { 
      res.json({
        success: true,
        result: seller
      });
    }).catch(err => {
      if (typeof(err) != 'string') {
        console.error('Error /auth/seller/update/profile', err);
        err = 'Server side error';
      }
      res.json({
        success: false,
        message: err
      });
    });
});*/

module.exports = router;