const models = require('../models');

module.exports = {

	doesSuchUserExist: function(param) {
		return new Promise((resolve, reject) => {
			let condition = {
				mobile: param
			};

			if (param.indexOf('@') > 0) {
				condition = {
					email: param
				}
			} else if (param.length != 10) {
				condition = {
					id: param
				}
			}
			
			models.user.findOne({
				where: condition
			}).then((user) => {
			    if (user) {
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