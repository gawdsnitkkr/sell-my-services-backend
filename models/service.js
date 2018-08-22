'use strict';

module.exports = function(sequelize, DataTypes) {
  var Service = sequelize.define('service', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    lastRatingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    ratingCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    timestamp: true,
    indexes: [
      {
        type: 'FULLTEXT',
        name: 'serviceSearchIndex',
        fields: ['name', 'tags']
      }
    ]
  });

  Service.associate = function(models) {
    Service.belongsTo(models.user);
    Service.belongsTo(models.serviceCategory);
  };

  return Service;
};
