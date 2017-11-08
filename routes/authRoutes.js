// NPM passport module
const passport = require('passport');

/* Return Function with Route Handlers */
module.exports = (app) => {

  // Google OAth Route Handler
  app.get('/auth/google',
    passport.authenticate('google', {
        // The permissions from the user's account we want to access:
        scope: ['profile', 'email']
      }
    )
  );

  // Google OAth Callback Route Handler
  app.get('/auth/google/callback',
    // Exchange code for a user profile
    passport.authenticate('google')
  );

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    // Kill the id stored in the cookie at login so it's no longer logged in
    req.logout();
    
    res.send(req.user);
  });
};
