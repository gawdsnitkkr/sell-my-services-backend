const express = require('express');
const router = express.Router();

const logger = require('../modules/logger');

const { searchSellers } = require('../services/searchService');

router.get('/sellers', (req, res) => {
  const params = req.query;
  searchSellers(params)
    .then(([sellers, responseCode]) => { 
      res.status(responseCode);
      res.json({
        success: true,
        result: sellers
      });
    }).catch(([err, responseCode]) => {
      if (typeof(err) !== 'string') {
        res.status(responseCode);
        logger.error('Error /search/sellers', err); // todo: err is not getting printed
        err = 'Server side error';
      } 
      res.json({
        success: false,
        message: err
      });
    });
    
});

module.exports = router;