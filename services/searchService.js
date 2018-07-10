/**
 * Created by: Varun kumar
 * Date: 08 July, 2018
 *
 * All the controller methods to support '/search/'' routes
 */

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const models = require('../models');
const utilityService = require('./utilityService');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

module.exports = {

	searchSellers: (params) => {
		/**
		 * A threshold = 0.3 gives a distance range ~ 47 KM
		 * since latitude and longitude can be negative so check 
		 * which one is greater after applying threshold
		 */

		return new Promise((resolve, reject) => {
			if (!params.latitude || !params.longitude || !params.searchText) {
				reject('Missing params');
			}

			const latitudeMax = params.latitude + config.latitudeThreshold;
			const latitudeMin = params.latitude - config.latitudeThreshold;
			let latitudeRange = [latitudeMin, latitudeMax];
			if (latitudeMin > latitudeMax) {
				// swap values
				latitudeRange = utilityService.swapValues(latitudeRange);
			}

			const longitudeMax = params.longitude + config.longitudeThreshold;
			const longitudeMin = params.longitude - config.longitudeThreshold;
			let longitudeRange = [longitudeMin, longitudeMax];
			if (longitudeMin > longitudeMax) {
				// swap values
				longitudeRange = utilityService.swapValues(longitudeRange);
			}

			const fullTextSearchQuery = 
			        'MATCH (services.name, tags) AGAINST ("'
			        + params.searchText
			        + '")';

			models.seller.findAll({
				where: {
					latitude: {
					    [Op.between]: latitudeRange
					},
					longitude: {
					    [Op.between]: longitudeRange
					}
				},
				attributes: [
				    'id', 'name', 'latitude', 'longitude'
				],
				include: [
				    {
				    	// using alias to make sure fullTextSearchQuery doesn't break
				    	// as column 'name' is available in both tables (seller, service)
				    	model: models.service,
				    	attributes: ['id', 'name'],
				    	as: 'services', 
				    	where: Sequelize.literal(fullTextSearchQuery)
				    }
				]
			}).then((sellers) => {
				if (sellers.length > 0) {
					const result = [];
					for (let i = 0; i < sellers.length; i++) {
					    result[i] = sellers[i].dataValues;
					}
					resolve(result);
				} else {
					resolve([]);
				}
			}).catch((err) => {
				console.error('Error searchSellers', err);
				reject('Error occured');
			});
		});
	}
};