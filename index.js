/* Create an Express application */

/* Import Express Library */
// ES 2015 Module imports isn't supported so we can't use import syntax
const express = require('express');

// Create an application that represents a running express app
// This listens for incoming requests on the Node side
// All inbound requests are registered with app
const app = express();

// Create a route handler associated with the app
app.get('/', (req, res) => {
  res.send({goodbye: 'world'});
});

/* Tell the app which port it must listen to */
// If Heroku assigns an environment variable for the port, use it; else, use 5000.
const PORT = process.env.PORT || 5000;
app.listen(PORT);
