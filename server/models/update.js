const mongoose = require("mongoose");
const { getWeekNumber } = require("../helpers/index");

const updateSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true
  },
  achievements: { type: String },
  plans: { type: String },
  mhdPatients: { type: {}, default: null },
  mpaData: { type: {}, default: null },
  weekNumber: { type: Number, default: null },
  recieved: { type: Boolean, default: false },
}, { timestamps: {} });

updateSchema.pre('save', function (next) {
  if (!this.recieved) {
    this.recieved = true;
  }
  this.weekNumber = getWeekNumber(new Date(this.createdAt));


  next();
})


const updateModel = mongoose.model("Update", updateSchema);
module.exports = updateModel;
