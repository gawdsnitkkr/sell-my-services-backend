const express = require('express');
const router = express.Router();

const logger = require('../modules/logger');

const searchController = require('../controllers/search');

router.get('/sellers', (req, res) => {
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