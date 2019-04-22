const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DividendSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
});

module.exports = Dividend = mongoose.model("divindend", DividendSchema);
