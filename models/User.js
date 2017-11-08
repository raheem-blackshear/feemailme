const mongoose = require('mongoose');
// mongoose.Schema
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

// Load schema into mongoose
mongoose.model('users', userSchema);
