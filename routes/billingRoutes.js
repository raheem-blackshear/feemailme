/*
* Billing Routes
*
* Verify user login status for access to Billing routes via loginRequired.
*/
const keys = require('../config/keys.js');
const stripe = require('stripe')(keys.stripeSecretKey);
const loginRequired = require('../middlewares/loginRequired');

/* Return Function with Route Handlers */
module.exports = (app) => {

  /*
  * POST Requests from Stripe
  *
  * Check user is logged in.
  * Send a request to Stripe API finalizing the transaction.
  * Update user credits.
  * Send back updated user data.
  */
  app.post('/api/stripe',
    loginRequired,
    async (req, res) => {
      // TODO I don't like this and want react and express to set amount and description from a shared variable.
      const txn = await stripe.charges.create({
        amount: 1000,
        description: '$10 for 10 credits',
        currency: 'usd',
        source: req.body.id
      });

      // TODO Set credit increment via variable in the future.
      req.user.credits += 10;
      const user = await req.user.save();
      res.send(user);
    }
  );
};
