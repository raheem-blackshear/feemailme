/* PRODUCTION KEYS */

module.exports = {
  // Application Keys
  mongoUri: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE,
  stripeSecretKey: process.env.STRIPE_SECRET,

  // OAuth Keys
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET
};
