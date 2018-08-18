'use strict';

module.exports = function(sequelize, DataTypes) {
  var Rating = sequelize.define('rating', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    review: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    timestamp: true
  });

  Rating.associate = function(models) {
    Rating.belongsTo(models.user);
    Rating.belongsTo(models.service);
  };

  return Rating;
};
