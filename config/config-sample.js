module.exports = {
  'development': {
    'username': process.env.DATABASE_USERNAME || 'root',
    'password': process.env.DATABASE_PASSWORD || '',
    'database': process.env.DATABSE_NAME || 'sellMyServices',
    'host': process.env.DATABASE_HOST || 'localhost',
    'dialect': 'mysql',
    'superSecret': process.env.SECRET_STRING || 'SECRET',
    'latitudeThreshold': 0.3,
    'longitudeThreshold': 0.3,
    'tokenMaxAge': 2592000,
    'tokenName': 'authToken'
  },
  'production': {
    'username': process.env.DATABASE_USERNAME || 'DATABASE_USERNAME',
    'password': process.env.DATABASE_PASSWORD || 'DATABASE_PASSWORD',
    'database': process.env.DATABSE_NAME || 'sellMyServices',
    'host': process.env.DATABASE_HOST || 'localhost',
    'dialect': 'mysql',
    'superSecret': process.env.SECRET_STRING || 'SECRET',
    'latitudeThreshold': 0.3,
    'longitudeThreshold': 0.3,
    'tokenMaxAge': 2592000,
    'tokenName': 'authToken'
  }
};
