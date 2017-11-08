/* Import Libraries */
require('./models/User');
require('./services/passport');
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys.js');
const passport = require('passport');
const cookieSession = require('cookie-session');

// Create an application that represents a running express app
// This listens for incoming requests on the Node side
// All inbound requests are registered with app
const app = express();

/* Middlewares */

// Set cookie session length of 30 days
app.use(
  cookieSession({
    // days * hours * minutes * seconds * milliseconds
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Connect to DB
mongoose.connect(keys.mongoUri);

// Call function returned by authRoutes and pass it the app
require('./routes/authRoutes')(app);

/* Set Ports to Listen to */
// If Heroku assigns an environment variable for the port, use it; else, use dev port (running locally).
const DEV_PORT = 5000;
const PORT = process.env.PORT || DEV_PORT;
app.listen(PORT);
