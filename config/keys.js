// Determine if we're using dev or prod keys

// If Heroku set NODE_ENV to 'production'
if (process.env.NODE_ENV === 'production') {
  // return prod keys
  module.exports = require('./prod');
}
else {
  // Return dev keys
  module.exports = require('./dev');
}
