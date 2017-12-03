const mongoose = require('mongoose');
const { Schema } = mongoose;

/*
* Create app recipient schema and load it into mongoose.
*/
const recipientSchema = new Schema({
  /* The survey email subject line. */
  email: String,
  /* Whether or not the user responded. */
  responded: {
    type: Boolean,
    default: false
  }
});

// Export: this is imported into Survey Schema as a Subdocument Collection
module.exports = recipientSchema;
