require('./models/User');
require('./services/passport');
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys.js');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

/*
* Create an application that represents a running express app.
* This listens for incoming requests on the Node side.
* All inbound requests are registered with app.
*/
const app = express();

/* Middlewares */
// Parse the body of POST requests and make it available as 'req.body'
app.use(bodyParser.json());

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

/* Connect to DB */
mongoose.connect(keys.mongoUri);

/* Call function returned by route and pass it the app */
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

/*
* Ensure Express serves up production assets in client/build folder when running in prod.
*/
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  // Make sure Express serves up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'client', 'build', 'index.html')
    );
  });
}

/* Set Ports to Listen to */
// If Heroku assigns an environment variable for the port, use it;
// else, use dev port (running locally).
const DEV_PORT = 5000;
const PORT = process.env.PORT || DEV_PORT;
app.listen(PORT);
