/*
* Application Setup and Configuration
*
* NPM [Passport]{@link http://www.passportjs.org/docs} module
* [Google Cloud Docu]{@link https://cloud.google.com/nodejs/getting-started/authenticate-users}
*/
const passport = require('passport');
const keys = require('../config/keys.js');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
// Pull model out of mongoose
const User = mongoose.model('users');

// Save user.id (unique identifier for user's mongoose Model Instance in DB) in session
passport.serializeUser(
  (user, done) => {
    // Callback using user.id as identifier now that Strategy-specific identifier is no longer needed
    done(null, user.id);
  }
);

passport.deserializeUser(
  // id is the identifier for the user's mongoose Model Instance in DB
  (id, done) => {
  // Pull user from DB by querying for Model Instance id
  User.findById(id)
    .then(
      (user) => {
        // Send back the user pulled from the DB
        done(null, user);
      }
    );
  }
);

/*
* Declare Authentication Strategies
*/
passport.use(
  new GoogleStrategy (
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      // Prevent redirect from https to http:
      proxy: true
    },
    //The access token for a successfully authenticated login
    async (accessToken, refreshToken, profile, done) => {
      // If we have one record matching profile.id in DB, user is existing
      let user = await User.findOne({ googleId: profile.id });

      // User is new to the site
      if (!user) {
        // Create and save new Model Instance to DB
        user = await new User( {
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          profileImage: profile._json.image.url,
          authProfile: {profile}
        } ).save();
      }

      // Callback with user RETURNED BY THE DB; resume authentication
      done(null, user);
    }
  )
);
