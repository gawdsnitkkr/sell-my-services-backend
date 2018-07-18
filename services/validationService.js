/**
 * Created by: Varun kumar
 * Date: 08 July, 2018
 */
 
const models = require('../models');

module.exports = {

	doesSuchSellerExist: function(params) {
		return new Promise((resolve, reject) => {
			const condition = {
				email: params.email
			};
			
			models.seller.findOne({
				where: condition
			}).then((seller) => {
			    if (seller) {
			    	resolve(seller);
			    } else {
			    	resolve(false);
			    }
			}).catch((err) => {
			    reject(err);
			});
		});
	},

	doesSuchServiceExist: function(params) {
		return new Promise((resolve, reject) => {
			const condition = {
				id: params.serviceId
			};
			
			models.service.findOne({
				where: condition,
				include: [
					{
						model: models.seller,
						attributes: ['email']
					}
				]
			}).then((service) => {
			    if (service) {
			    	if (service.seller.email === params.email) {
			    		resolve(service)
			    	} else {
			    		resolve(false);
			    	}
			    } else {
			    	resolve(false);
			    }
			}).catch((err) => {
			    reject(err);
			});
		});
	}

};