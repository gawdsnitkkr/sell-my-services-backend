const express = require('express');
const router = express.Router();

const utilityService = require('../services/utilityService');
const userService = require('../services/userService');
const validationService = require('../services/validationService');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/login', (req, res, next) => {
    res.render('login', {});
});

router.get('/signup', (req, res, next) => {
    res.render('signup', {});
});

router.post('/login', (req, res, next) => {
	const params = req.body;
	userService.loginUser(params)
		.then(user => {
			user.keepMeLoggedIn = params.keepMeLoggedIn;
			const token = utilityService.getToken(user);
			let maxAge = 2 * 60 * 60 * 1000; // maxAge: 2 hours
			if (params.keepMeLoggedIn) {
				maxAge = 7 * 24 * 60 * 60 * 1000; // maxAge: 7 days
			}

			res.cookie('jwtToken', token, { maxAge: maxAge, httpOnly: true }); 
			res.json({
				success: true
			});
		}).catch(err => {
			res.json({
				success: false,
				message: err
			});
		});
    
});

router.post('/signup', function(req, res, next) {
	const params = req.body;
	userService.signup(params).then(user => {
		const token = utilityService.getToken(user);
		res.cookie('jwtToken', token, { 
			maxAge: 2 * 60 * 60 * 1000, httpOnly: true 
		}); // maxAge: 2 hours
		res.json({
			success: true
		});
	}).catch(err => {
		res.json({
			success: false,
			message: err
		});
	});
    
});

router.get('/logout', function(req, res, next) {
	res.clearCookie('jwtToken');
	res.redirect('/');
});

module.exports = router;