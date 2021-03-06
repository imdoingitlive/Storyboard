var passport = require('passport');

module.exports = function(req, res, next) {
	passport.authenticate('local-signup', function(err, user, info) {
		if (err) return next(err);
		if (!user) return res.json(info);
		req.logIn(user, function(err) {
			if (err) return next(err);
			return res.json({redirect: '/sketch'});
		});
	}) (req, res, next)
}