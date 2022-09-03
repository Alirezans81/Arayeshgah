const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const barberSchema = new mongoose.Schema({
  phone: {type: String, required: true, uinque: true},
  name: {type: String, required: true},
  password: {type: String, required: true},
  location: {type: String, required: true},
  rating: {type: Number, min: 0, max: 5, default: 0},
  picUrls: {type: [String], default: []}
})
userSchema.plugin(timestamp);

module.exports = mongoose.model('User', barberSchema);