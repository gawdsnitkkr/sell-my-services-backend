/**
 * Created by: Varun kumar
 * Date: 08 July, 2018
 *
 * All the controller methods to support '/search/'' routes
 */

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const models = require('../models');
const { swapValues } = require('./utilityService');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

module.exports = {

  searchSellers: ({ latitude, longitude, searchText }) => {
    /**
		 * A threshold = 0.3 gives a distance range ~ 47 KM
		 * since latitude and longitude can be negative so check 
		 * which one is greater after applying threshold
		 */

    return new Promise((resolve, reject) => {
      if (!latitude || !longitude || !searchText) {
        return reject('Missing params');
      }
			
      const latitudeMax = parseFloat(latitude) + config.latitudeThreshold;
      const latitudeMin = parseFloat(latitude) - config.latitudeThreshold;
      let latitudeRange = [latitudeMin, latitudeMax];
      if (latitudeMin > latitudeMax) {
        // swap values
        latitudeRange = swapValues(latitudeRange);
      }

      const longitudeMax = longitude + config.longitudeThreshold;
      const longitudeMin = longitude - config.longitudeThreshold;
      let longitudeRange = [longitudeMin, longitudeMax];
      if (longitudeMin > longitudeMax) {
        // swap values
        longitudeRange = swapValues(longitudeRange);
      }

      const fullTextSearchQuery = 
          `MATCH (services.name, tags) AGAINST ("'${searchText}'")`;

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
          const result = sellers.map(seller => seller.dataValues);
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