/**
 * @author Varun Kumar<varunon9@gmail.com>
 * https://github.com/varunon9
 * Date: 08 July, 2018
 */

const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];


module.exports = {

	verifyToken: function(req, res, next) {
		// get token from cookies
		const token = req.cookies.jwtToken;
		
		if (token) {

		    // verifies secret and checks exp
		    jwt.verify(token, config.superSecret, function(err, decoded) {      
		        if (err) {
		            //console.error(err);
		            return res.send(
						'<p>Failed to authenticate token. '
						        + 'Click <a href="logout">Logout</a></p>'
					);    
		        } else {

		            // check if email is present
		            if (!decoded.email) {
		                res.redirect('/login');
		            } else {
		                // if everything is good, save to request for use in other routes
		                req.decoded = decoded; 
		                next();
		            }
		        }
		    });
		} else {
		    res.redirect('/login');
		}
	}
}