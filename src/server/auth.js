
/*!
 * Module dependencies.
 */

import UserModel from '../dataModels/UserModel';

import local from './passport/local';
// var google = require('./passport/google');
// var facebook = require('./passport/facebook');
// var twitter = require('./passport/twitter');
// var linkedin = require('./passport/linkedin');
// var github = require('./passport/github');

const debug = require("debug")("brightAuth");

export default (passport, server, config) => {
  // serialize sessions
  passport.serializeUser(function(user, done) {
    debug('passport serialize ' + JSON.stringify(user));
    done(null, user.id);
  })

  passport.deserializeUser(function(id, done) {
    UserModel.findById(id, function(err, user) {
      done(err, user);
    });
  })

  // use these strategies
  passport.use(local);
  // passport.use(google);
  // passport.use(facebook);
  // passport.use(twitter);
  // passport.use(linkedin);
  // passport.use(github);

  // server.use((req, res, next) => {
  //   console.log('attach ps to req')
  //   req.passport = passport;
  //   next();
  // });

  //setup Auth related route
  server.post('/auth/login',
    // (req, res, next) => {debug('auth callback ' + JSON.stringify(req.body)); next();},
    passport.authenticate('local', {
      // successRedirect : '/',
      failureRedirect: '/login',
      // failureFlash: 'Invalid email or password.'
    }),
    (req, res) => {
      res.cookie('username', req.user.email);
      // res.redirect('/users/' + req.user.username);
      res.redirect('/');
    });
};
