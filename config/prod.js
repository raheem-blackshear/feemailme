/* PRODUCTION KEYS */

module.exports = {
  // Application Keys
  mongoUri: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE,
  stripeSecretKey: process.env.STRIPE_SECRET,
  sendGridKey: process.env.SEND_GRID_KEY,
  surveyRedirectDomain: process.env.SURVEY_REDIRECT_DOMAIN,

  // OAuth Keys
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET
};
