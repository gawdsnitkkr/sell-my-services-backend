const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const models = require('../models');

module.exports = {

  searchSellers: ({ latitudeRange, longitudeRange, searchText }) => {
    return new Promise((resolve) => {
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
      });
    });
  }
};