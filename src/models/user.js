const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const reservationSchema = new mongoose.Schema({
  barbershopname: { type: String, required: true },
  username: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: Date, required: true },
  hour: { type: Number, required: true, min: 0, max: 23 },
  minute: { type: Number, required: true, min: 0, max: 59 },
});

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, uinque: true },
  name: { type: String, required: true },
  isAdmin: { type: String, default: false },
  reservations: [reservationSchema],
});
userSchema.plugin(timestamp);

module.exports = [
  mongoose.model("User", userSchema),
  mongoose.model("Reservation", reservationSchema),
];
