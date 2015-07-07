var qs = require('querystring');
var _ = require('underscore');


exports.authorize = function(req, res, next) {
	console.log('filter');
	console.log(req.session.user);
	res.locals.user = req.session.user;
    next();
}
