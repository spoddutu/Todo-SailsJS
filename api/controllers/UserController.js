/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'signup': function(req, res){
		if(!req.session.authenticated){
			req.session.authenticated = false;
		}
		req.session.flash = {};
		res.view();
	},

	'create': function(req, res, next){
		User.create(req.params.all(), function(err, user){
			if(err){
				req.session.flash = {
					err: err
				};
				return res.redirect('/user/signup');
			}
			return res.redirect('/checklist/new');
		});
	}
};

