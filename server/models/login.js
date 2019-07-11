const mongoose = require("mongoose");
const loginSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true
  },
  pin:
  {
    type: Number,
    required: true
  }
}, { timestamps: {} });

const login = mongoose.model("Login", loginSchema);
module.exports = login;
