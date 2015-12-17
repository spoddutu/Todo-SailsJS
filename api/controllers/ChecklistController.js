/**
 * ChecklistController
 *
 * @description :: Server-side logic for managing checklists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new': function(req, res){
		Checklist.findByEmail(req.session.user.email, function(err, checklists){
			if(err){
				req.session.flash = {
					err: err
				};
			}
			res.view({
				checklists: checklists,
			});
		});
	},

	'create': function(req, res, next){
		var attrbs = req.params.all();
		attrbs['email'] = req.session.user.email;
		Checklist.create(attrbs, function(err, checklist){
			if(err){
				req.session.flash = {
					err: err
				};
			}
			return res.redirect('/checklist/new');
		});
	},

	'add': function(req, res, next){
		Checklist.findOne(req.param('id'), function(err, checklist){
			if(err){
				req.session.flash = {
					err: err
				};
				return res.redirect('/checklist/new');
			}
			return res.view({
				checklist: checklist
			});
		})
	},

	'item': function(req, res, next){
		Checklist.findOne(req.param('id')).exec(function(err, checklist){
			if(err){
				req.session.flash = {
					err: err
				};
				return res.redirect('/checklist/add/' + checklist.id);
			}
			checklist.items.push(req.param("name"));
			checklist.save(function(err){
				return res.redirect('/checklist/add/' + checklist.id);
			});
		});
	},

	'removeItem': function(req, res, next){
		Checklist.findOne(req.param('id')).exec(function(err, checklist){
			if(err){
				req.session.flash = {
					err: err
				};
				return res.redirect('/checklist/add/' + checklist.id);
			}
			var index = checklist.items.indexOf(req.param("name"));
			checklist.items.splice(index, 1);
			checklist.save(function(err){
				return res.redirect('/checklist/add/' + checklist.id);
			});
		});
	},

	'destory': function(req, res, next){
		Checklist.destroy(req.param('id'), function(err, done){
			return res.redirect('/checklist/new');
		});
	}
};

