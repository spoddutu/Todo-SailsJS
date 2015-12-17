/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcrypt-nodejs');

module.exports = {

	schema: true,

	attributes: {

		name: {
			type: 'string'
		},

		email: {
			type: 'email',
			required: true,
			unique: true
		},

		encryptedpassword: {
			type: 'string'
		}
	},

	beforeCreate: function(values, next){
		if(!values.password || (values.password !== values.confirmation)){
			return next({err: ["Passwords doesn't match !"]});
		}

		values.encryptedpassword = bcrypt.hashSync(values.password, bcrypt.genSaltSync(8), null);
		next();
	}

};

