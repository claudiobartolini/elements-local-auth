'use strict';
const passport = require('passport');
const BoxStrategy = require('passport-box').Strategy;
const config = require('config');
const BoxConfig = config.get('BoxConfig');

// const BOX_CLIENT_ID 		= process.env.BOX_CLIENT_ID;
// const BOX_CLIENT_SECRET 	= process.env.BOX_CLIENT_SECRET;
// const BOX_CALLBACK     = process.env.BOX_CALLBACK;

const strategy = new BoxStrategy({
  clientID: BoxConfig.clientID,
  clientSecret: BoxConfig.clientSecret,
  callbackURL: BoxConfig.callbackURL
},
function(accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function () {
    
    // To keep the example simple, the user's Box profile is returned to
    // represent the logged-in user.  In a typical application, you would want
    // to associate the Box account with a user record in your database,
    // and return that user instead.
    return done(null, profile);
  });
}
)

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = strategy;