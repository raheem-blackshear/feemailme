/*
* @param {Object} req The request object.
* @param {Object} res The response object.
* @param {Function} next What to call when the middleware is complete.
*/
module.exports = (req, res, next) => {
  // Stop request if user is not logged in.
  if (!req.user) {
    return res.status(401).send({ error: 'Please log in and try again.'} );
  }

  // User is logged in, continue to request handler
  next();
};
