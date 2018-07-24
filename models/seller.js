'use strict';

module.exports = function(sequelize, DataTypes) {
	var Seller = sequelize.define('seller', {
		id: { 
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
	    mobile: {
	    	type: DataTypes.STRING,
	    	allowNull: true
	    },
	    name: {
	    	type: DataTypes.STRING,
	    	allowNull: true
	    },
	    gender: {
	    	type: DataTypes.STRING,
	    	allowNull: false,
	    	defaultValue: 'male'
	    },
	    email: {
	    	type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		latitude: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		longitude: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
	    deactivated: {
	    	type: DataTypes.BOOLEAN,
	    	allowNull: false,
	    	defaultValue: false
	    },
	    type: {
	    	type: DataTypes.STRING,
	    	allowNull: true
	    },
	    password: {
	    	type: DataTypes.STRING,
	    	allowNull: false
	    },
	    isActive: {
	    	type: DataTypes.BOOLEAN,
	    	allowNull: false,
	    	defaultValue: true
	    }
	}, {
		timestamp: true
	});

	Seller.associate = function(models) {
		Seller.hasMany(models.service);
	}  
	
	return Seller;
};