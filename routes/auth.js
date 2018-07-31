/**
 * Created by: Varun kumar
 * Date: 11 July, 2018
 */

const express = require('express');
const router = express.Router();

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const utilityService = require('../services/utilityService');
const sellerService = require('../services/sellerService');

const middlewares = require('../middlewares');

// middleware to verify a token
router.use(middlewares.verifyToken);

// Get all the sellers
router.get('/sellers', (req, res) => {
	// TODO: Provide pagination and allow to fetch previous
	// and next pages
	const params = req.body;
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
});

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
});

module.exports = router;