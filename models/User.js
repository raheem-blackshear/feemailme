const mongoose = require('mongoose');
// mongoose.Schema
const { Schema } = mongoose;

/*
* Create app user schema and load it into mongoose.
*/
const userSchema = new Schema({
  // Auth Profile Data
  googleId: String,
  firstName: String,
  lastName: String,
  email: String,
  profileImage: String,
  // TODO clean this up and determine which data I really want; grabbing entire profile in the interim.
  authProfile: Object,

  // User Data
  nickname: String, // TODO implement
  credits: {
    type: Number,
    // One free credit for demo purposes
    default: 1
  }
});

// Load schema into mongoose
mongoose.model('users', userSchema);
