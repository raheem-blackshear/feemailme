// Create a new express application

/* Import Express Library */
// ES 2015 Module import (below) isn't supported:
// import express from 'express';
// support with .mjs file? > node --experimental-modules index.mjs
const express = require('express');

// Create an application that represents a running express app
// This will listen for incoming requests on the Node side
// All inbound requests are registered with app
const app = express();

// Create a route handler associated with the app
app.get('/', (req, res) => {
  res.send({hi: 'there'});
});

// Tell the app to listen on port 5000 (localhost:5000)
// app.listen(5000);
// If heroku assigns an environment variable for the port, use it; else, use 5000.
const PORT = process.env.PORT || 5000;

app.listen(PORT);
// Specify the Node environment we want to use
