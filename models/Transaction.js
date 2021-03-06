const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  shareQty: {
    type: Number,
    required: true
  },
  sharePrice: {
    type: Number,
    required: true
  },
  type: {
    type: String,
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

module.exports = Transaction = mongoose.model("transaction", TransactionSchema);
