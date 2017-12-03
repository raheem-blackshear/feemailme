/*
* @param {Object} req The request object.
* @param {Object} res The response object.
* @param {Function} next What to call when the middleware is complete.
*/
module.exports = (req, res, next) => {
  // Stop request if user is not logged in.
  if (req.user.credits < 1) {
    // TODO maybe update to 402 in the future
    return res.status(403).send({ error: 'You must have at least 1 credit.'} );
  }

  // User is logged in, continue to request handler
  next();
};
