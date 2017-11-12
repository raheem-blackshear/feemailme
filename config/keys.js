/* Determine if we're using dev or prod keys */

// If Heroku set NODE_ENV to 'production', return prod keys.
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
}
// We are working locally, return dev keys.
else {
  module.exports = require('./dev');
}
