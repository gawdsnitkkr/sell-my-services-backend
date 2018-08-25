const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const models = require('../models');

module.exports = {

  searchServices: ({ latitudeRange, longitudeRange, searchText }) => {
    return new Promise((resolve) => {
      const fullTextSearchQuery = 
          `MATCH (service.name, tags) AGAINST ("'${searchText}'")`;

      models.service.findAll({
        where: {
          latitude: {
            [Op.between]: latitudeRange
          },
          longitude: {
            [Op.between]: longitudeRange
          }
        },
        include: [
          {
            model: models.user,
            attributes: ['id', 'firstName', 'email', 'mobile'],
            where: Sequelize.literal(fullTextSearchQuery)
          }
        ]
      }).then((services) => {
        if (services.length > 0) {
          const result = services.map(user => user.dataValues);
          resolve(result);
        } else {
          resolve([]);
        }
      });
    });
  }
};
