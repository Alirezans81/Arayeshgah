const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const userSchema = new mongoose.Schema({
  phone: {type: String, required: true, uinque: true},
  name: {type: String, required: true},
  password: {type: String, required: true},
  isAdmin: {type: String, default: false},
})
userSchema.plugin(timestamp);

module.exports = mongoose.model('User', userSchema);