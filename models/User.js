const mongoose = require('mongoose');
// mongoose.Schema
const { Schema } = mongoose;

// TODO: Clean this up and determine which data I really want
// Grabbing entire profile for the time being
const userSchema = new Schema({
  googleId: String,
  firstName: String,
  lastName: String,
  nickname: String,
  email: String,
  profileImage: String,
  authProfile: Object
});

// Load schema into mongoose
mongoose.model('users', userSchema);
