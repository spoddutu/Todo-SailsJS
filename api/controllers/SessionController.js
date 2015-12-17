/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt-nodejs');

module.exports = {
	'login': function(req, res, next){
		var err = {};
		if(!req.param('email') || !req.param('password')){
			err = {'message': 'Invalid email or password'}
			req.session.flash = {err: err};
			return res.redirect('/');
		}

		User.findOneByEmail(req.param('email')).exec(function(err, user){
			if(err){
				return next(err);
			}
			if(!user){
				err = {'message': 'No user with email ' + req.param('email') + 'doesn\'t exists'};
				return res.redirect('/');
			}

			bcrypt.compare(req.param('password'), user.encryptedpassword, function(err, valid){
				req.session.authenticated = valid;
				req.session.user = user;
				if(valid){
					return res.redirect('/checklist/new');
				}
				return res.redirect('/');
			});
		});

	},

	'logout': function(req, res, next){
		req.session.destroy();

		res.redirect("/");
	}
};

