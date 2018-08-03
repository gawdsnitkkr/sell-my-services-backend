'use strict';

module.exports = function(sequelize, DataTypes) {
  var RequestLog = sequelize.define('requestLog', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamp: true
  });

  return RequestLog;
};