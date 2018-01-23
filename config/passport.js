// config/passport.js

// load all the things we need
const LocalStrategy = require('passport-local').Strategy;
const loginModel = require('../models/login');
const bcrypt = require('../config/bcrypt');

console.log('./config/passport.js loaded ================================');
// expose this function to our app using module.exports
module.exports = function (passport) {

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    console.log('./config/passport.js - serializeUser =======================');
    console.log('user: ', user);

    done(null, user[0].id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    console.log('./config/passport.js - deserializeUser =====================');
    console.log('id: ', id);

    loginModel.findUserById(id).then(function (user) {
      done(null, user);
    }).catch( function (err) {
      console.log('./config/passport.js - loginModel.findUserById - CATCH =====');
      console.log(err);
    });
  });


  // LOCAL SIGNUP ============================================================
  passport.use('local-signup', new LocalStrategy({
      passReqToCallback: true // allows us to pass back the entire request to the callback
    }, 
    function (req, username, password, done) {

      console.log('./config/passport.js local-signup =======================');

      loginModel.findUserByName(username).then( function (res) {
        if (res.length > 0) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.') );
        }

        const hashword = bcrypt.generateHash(password);

        loginModel.createNewUser(username, hashword).then( function (res) {
          console.log(`./config/passport.js - loginModel.createNewuser ==============`);
          console.log('res: ', res);

          loginModel.findUserById(res.insertId).then(function (user) {
            return done(null, user);
          }).catch( function(err) {
            console.log(err);
          });

        }).catch( function(err) {
          return done(err);
        });

      }).catch( function (err) {
        return done(err);
      });

    })
  );


  // LOCAL LOGIN =============================================================
  passport.use('local-login', new LocalStrategy({
      passReqToCallback: true // enable passing back the entire request to the callback
    },
    function (req, username, password, done) { // callback with username and password from our form

      console.log('./config/passport.js - local-login =========================');
      console.log(`username: ${username}`);
      console.log(`password: ${password}`);

      loginModel.findUserByName(username).then( function (res) {

        console.log('./config/passport.js - loginModel.findUserByName ===========');
        console.log('res: ', res);

        // if no user is found, return the message
        if (res.length < 1) { 
          return done(null, false, req.flash('loginMessage', 'No user found.'));
        }

        // if the user is found but the password is wrong
        if (!bcrypt.validatePassword(password, res[0].password)) {
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
        }

        // all is well, return successful user
        return done(null, res);

      }).catch( function (err) {
        return done(err);
      });
    })
  );

};