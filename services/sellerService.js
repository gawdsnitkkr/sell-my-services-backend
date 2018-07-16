/**
 * Created by: Varun kumar
 * Date: 08 July, 2018
 *
 * A seller is the entity who sell his services through SellMyService app
 */

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const validationService = require('./validationService');
const models = require('../models');

const bcrypt = require('bcrypt');

module.exports = {

    signup: function(params) {
        return new Promise((resolve, reject) => {
            if (!params.email || !params.latitude
                    || !params.longitude
                    || !params.password) {
                reject('Missing params');
            } else {
                validationService.doesSuchSellerExist(params)
                    .then(result => {
                        if (result) {
                            reject('This email has been used. Try Login');
                        } else { 
                            bcrypt.hash(params.password, 2).then((hash) => {
                                params.password = hash;
                                // insert seller info to db
                                models.seller.create(params).then(seller => {
                                    resolve(seller.dataValues);
                                }).catch((err) => {
                                    console.error(
                                        'Error signup sellerService:', err
                                    );
                                    reject('Server side error');
                                });
                            }).catch((err) => {
                                const errorMessage = 'Error signup '
                                        + 'sellerService encrypting password';
                                console.error(errorMessage, err);
                                reject('Server side error');
                            });             
                        }
                    }).catch(err => {
                        console.error(
                            'Error signup sellerService validation', err
                        );
                        reject('Server side error');
                    });
            }
        });
    },

    login: function(params) {
        return new Promise((resolve, reject) => {
            if (!params.email || !params.password) {
                reject('Missing params');
            } else {
                validationService.doesSuchSellerExist(params)
                    .then(result => {
                        if (result) {
                            models.seller.findOne({
                                where: {
                                    email: params.email
                                }
                            }).then(seller => {
                                if (seller) {
                                    bcrypt.compare(
                                        params.password, 
                                        seller.dataValues.password
                                    ).then((res) => {
                                        if (res == true) {
                                            resolve(seller.dataValues);
                                        } else {
                                            reject('Password mismatch');
                                        }
                                    }).catch((err) => {
                                        const errorMessage = 'Error login '
                                                + 'sellerService decrypting '
                                                + 'password';
                                        console.error(errorMessage, err);
                                        reject('Server side error');
                                    });
                                }
                            }).catch(err => {
                                console.error(
                                    'Error login sellerService:', err
                                );
                                reject('Server side Error');
                            })
                        } else {
                            reject('Seller does not exist');
                        }
                    }).catch(err => {
                        console.error(
                            'Error login sellerService validation', err
                        );
                        reject('Server side error');
                    });
            }
        });
    },

    getSeller: function(params) {
        return new Promise((resolve, reject) => {
            if (!params.email) {
                reject('Invalid Request');
            } else {
                validationService.doesSuchSellerExist(params.email)
                    .then(result => {
                        if (result) {
                            models.seller.findOne({
                                where: {
                                    email: params.email
                                }
                            }).then(seller => {
                                if (seller) {
                                    resolve(seller.dataValues);
                                }
                            }).catch(err => {
                                console.error(
                                    'Error getSeller sellerService:', err
                                );
                                reject('Server side Error');
                            })
                        } else {
                            reject('Seller does not exist');
                        }
                    }).catch(err => {
                        console.error(
                            'Error getSeller sellerService validation', err
                        );
                        reject('Server side error');
                    });
            }
        });
    },

    updateSeller: function(params) {
        return new Promise((resolve, reject) => {
            if (!params.email) {
                reject('Missing Params');
            } else {
                models.seller.findOne({
                    where: {
                        email: params.email
                    }
                }).then(seller => {
                    if (seller) {
                        seller.updateAttributes(params)
                            .then(seller => {
                                resolve(seller.dataValues);
                            }).catch(err => {
                                console.error(
                                    'Error updateSeller sellerService', err
                                );
                                reject('Server side error');
                            });
                    } else {
                        reject('No such Seller exist');
                    }
                }).catch(err => {
                    console.error(
                        'Error updateSeller sellerService findOne', err
                    );
                    reject('Server side error');
                });
            }
        });
    }
};