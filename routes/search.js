const express = require('express');
const router = express.Router();
const { requireParameters } = require('../middlewares');

const logger = require('../modules/logger');
const searchController = require('../controllers/search');


const requiredSellersParams = 
    requireParameters(['longitude', 'latitude', 'searchText']);
    
router.get('/sellers', requiredSellersParams, (req, res) => {
  const params = req.query;
  searchController.searchSellers(params)
    .then(([sellers, responseCode]) => { 
      res.status(responseCode);
      res.json({
        success: true,
        result: sellers
      });
    }).catch(([err, responseCode]) => {
      if (typeof(err) !== 'string') {
        res.status(responseCode);
        logger.error('routes /search/sellers', err); // todo: err is not getting printed
        err = 'Server side error';
      } 
      res.json({
        success: false,
        message: err
      });
    });
});

module.exports = router;
