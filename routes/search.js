const express = require('express');
const router = express.Router();
const { requireParameters } = require('../middlewares');

const logger = require('../modules/logger');
const searchController = require('../controllers/search');


const requiredServicesParams = 
    requireParameters(['longitude', 'latitude', 'searchText']);
    
router.get('/services', requiredServicesParams, (req, res) => {
  const params = req.query;
  searchController.searchServices(params)
    .then(([services, responseCode]) => { 
      res.status(responseCode);
      res.json({
        success: true,
        result: services
      });
    }).catch(([err, responseCode]) => {
      if (typeof(err) !== 'string') {
        res.status(responseCode);
        logger.error('routes /search/services', err); 
        err = 'Server side error';
      } 
      res.json({
        success: false,
        message: err
      });
    });
});

module.exports = router;
