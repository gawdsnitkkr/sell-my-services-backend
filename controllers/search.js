const searchService = require('../services/search');
const statusCode = require('../constants/statusCode');
const logger = require('../modules/logger');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const { swapValues } = require('./utility');

module.exports = {

	searchSellers: (params) => {
    return new Promise((resolve, reject) => {
      const { latitude, longitude, searchText } = params;
      if (!latitude || !longitude || !searchText) {
        return reject(['Missing params', statusCode.BAD_REQUEST]);
      }

      /**
       * A threshold = 0.3 gives a distance range ~ 47 KM
       * since latitude and longitude can be negative so check 
       * which one is greater after applying threshold
       */
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

      searchService.searchSellers({ latitudeRange, longitudeRange, searchText })
        .then((sellers) => {
          return resolve([sellers, statusCode.OK]);
        }).catch((err) => {
          logger.error('controllers searchSellers', err);
          return reject([
            'Server side error', statusCode.INTERNAL_SERVER_ERROR
          ]);
        });
    });
  }
}