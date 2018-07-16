/**
 * Created by: Varun kumar
 * Date: 08 July, 2018
 */
 
const models = require('../models');

module.exports = {

	doesSuchSellerExist: function(param) {
		return new Promise((resolve, reject) => {
			const condition = {
				email: param.email
			};
			
			models.seller.findOne({
				where: condition
			}).then((seller) => {
			    if (seller) {
			    	resolve(true);
			    } else {
			    	resolve(false);
			    }
			}).catch((err) => {
			    reject(err);
			});
		});
	}

};