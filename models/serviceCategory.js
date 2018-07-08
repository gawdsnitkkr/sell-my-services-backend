'use strict';

module.exports = function(sequelize, DataTypes) {
	var ServiceCategory = sequelize.define('serviceCategory', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
	    description: {
	    	type: DataTypes.TEXT,
	    	allowNull: true
	    }
	}, {
		timestamp: true
	});

	ServiceCategory.associate = function(models) {
	}

	return ServiceCategory;
};