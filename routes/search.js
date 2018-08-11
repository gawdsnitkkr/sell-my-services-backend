const express = require('express');
const router = express.Router();

const logger = require('../modules/logger');

const { searchSellers } = require('../services/searchService');

const statusCode = require('../constants/statusCode');

router.get('/sellers', (req, res) => {
  const params = req.query;
  searchSellers(params)
    .then(sellers => { 
      res.status(statusCode.SC_OK);
      res.json({
        success: true,
        result: sellers
      });
    }).catch(err => {
      if (typeof(err) !== 'string') {
        res.status(statusCode.SC_INTERNAL_SERVER_ERROR);
        logger.error('Error /search/sellers', err); // todo: err is not getting printed
        err = 'Server side error';
      } else {
        res.status(statusCode.SC_BAD_REQUEST);
      }
      res.json({
        success: false,
        message: err
      });
    });
    
});

module.exports = router;