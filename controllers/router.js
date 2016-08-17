/*
Here is where you create all the functions that will do the routing for your app, and the logic of each route.
*/
var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var flash = require('connect-flash');
//var burger = require('../models/burger.js');

// =====================================
// HOME PAGE (with login links) ========
// =====================================
router.get('/', function(req, res) {
	res.render('index'); // load the index.ejs file
});

// =====================================
// LOGIN ===============================
// =====================================
// show the login form
router.get('/login', function(req, res) {
	// render the page and pass in any flash data if it exists
	res.render('login', {
		message: req.flash('loginMessage')
	});
});

// process the login form
router.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile', // redirect to the secure profile section
		failureRedirect: '/login', // redirect back to the signup page if there is an error
		failureFlash: true // allow flash messages
	}),
	function(req, res) {
		console.log("hello");

		if (req.body.remember) {
			req.session.cookie.maxAge = 1000 * 60 * 3;
		} else {
			req.session.cookie.expires = false;
		}
		res.redirect('/');
	});

// =====================================
// SIGNUP ==============================
// =====================================
// show the signup form
router.get('/signup', function(req, res) {
	// render the page and pass in any flash data if it exists
	res.render('signup', {
		message: req.flash('signupMessage')
	});
});

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
	successRedirect: '/profile', // redirect to the secure profile section
	failureRedirect: '/signup', // redirect back to the signup page if there is an error
	failureFlash: true // allow flash messages
}));

// =====================================
// PROFILE SECTION =========================
// =====================================
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
router.get('/profile', isLoggedIn, function(req, res) {
	res.render('profile', {
		user: req.user // get the user out of session and pass to template
	});
});

// =====================================
// LOGOUT ==============================
// =====================================
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

router.get('/sketch', function(req, res) {
	res.sendFile(path.resolve('public/assets/sketch.html'));
});

// Route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}

module.exports = router;