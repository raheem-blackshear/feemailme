const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

/*
* Create app survey schema and load it into mongoose.
*/
const surveySchema = new Schema({
  /* The survey's title within the survey list. */
  title: String,
  /* The survey email subject line. */
  subject: String,
  /* The survey email body. */
  body: String,
  /* A comma-separated list of survey recipients.
  * Embed a sub-documents collection inside recipient
  */
  recipients: [RecipientSchema],

  /* Responses */
  yes: {
    type: Number,
    default: 0
  },
  no: {
    type: Number,
    default: 0
  },
  /* Declare relationship between models */
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  /* Date surveys were sent */
  dateSent: Date,
  /* Last response to a survey */
  lastResponded: Date
});

// Load schema into mongoose
mongoose.model('surveys', surveySchema);
