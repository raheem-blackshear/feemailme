/*
* Authentication
*
* NPM [Passport]{@link http://www.passportjs.org/docs} module
*/
const passport = require('passport');

/* Return Function with Route Handlers */
module.exports = (app) => {

  /*
  * Google OAth Route Handler
  * Declare permissions scope of the request.
  */
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  /*
  * Google OAth Callback Route Handler
  * Authenticate exchange code for a user profile.
  * Redirects user logged-in user to survey dashboard.
  */
  app.get('/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  /*
  * Display user data for the currently logged-in user.
  */
  app.get('/api/current_user',
    (req, res) => {
      res.send(req.user);
    }
  );

  /*
  * Kill the ID stored in the cookie at login so it's no longer logged in.
  * Redirect user to dashboard.
  */
  app.get('/api/logout',
    (req, res) => {
      req.logout();
      res.redirect('/');
    }
  );
};
