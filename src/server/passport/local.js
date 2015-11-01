/**
 * Module dependencies.
 */
import UserModel from '../../dataModels/UserModel';

var LocalStrategy = require('passport-local').Strategy;
// var config = require('config');
const debug = require("debug")("brightAuthLocal");

const local = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function(email, password, done) {
    debug('local auth ' + email + password);
    UserModel.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
);

export default local;
