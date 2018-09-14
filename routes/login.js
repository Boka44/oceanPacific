const express = require('express');
const app = express();
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

app.get('/', function(req, res, next) {
  res.render('../public/login', { message: req.flash('loginMessage')});
});

app.post('/', passport.authenticate('local-login', {
	successRedirect: '/account',
	failureRedirect: '/login',
	failureFlash: true
}));

module.exports = app;