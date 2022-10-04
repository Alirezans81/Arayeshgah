const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const barbershopSchema = new mongoose.Schema({
  phone: { type: String, required: true, uinque: true },
  id: { type: String, required: true, uinque: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  mellicardurl: { type: String, required: true },
  businesslicenseurl: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  comments: { type: [String], default: [] },
  favoritecolor: { type: String },
});
barbershopSchema.plugin(timestamp);

module.exports = mongoose.model("Barbershop", barbershopSchema);
