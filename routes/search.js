/**
 * Created by: Varun kumar
 * Date: 08 July, 2018
 * 
 * All routes starting with /search
 */

const express = require('express');
const router = express.Router();

const utilityService = require('../services/utilityService');
const searchService = require('../services/searchService');
const validationService = require('../services/validationService');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];


router.post('/sellers', (req, res) => {
	const params = req.body;
	searchService.searchSellers(params)
		.then(sellers => { 
			res.json({
				success: true,
				result: sellers
			});
		}).catch(err => {
			if (typeof(err) != 'string') {
				console.error('Error /search/sellers', err);
				err = 'Server side error';
			}
			res.json({
				success: false,
				message: err
			});
		});
    
});

module.exports = router;