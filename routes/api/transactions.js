const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//Transaction Model

const Transaction = require("../../models/Transaction");

// @route GET api/transactions
// @desc Get all transactions
// @access Public

router.get("/", auth, (req, res) => {
  Transaction.find({ userId: req.user.id })
    .sort({ date: -1 })
    .then(transactions => res.json(transactions));
});

// @route POST api/transactions
// @desc Create transactions
// @access Public

router.post("/", auth, (req, res) => {
  console.log("req user", req.user);
  const newTransaction = new Transaction({
    code: req.body.code,
    shareQty: req.body.shareQty,
    sharePrice: req.body.sharePrice,
    type: req.body.type,
    date: req.body.date,
    userId: req.user.id
  });

  newTransaction.save().then(transaction => res.json(transaction));
});

// @route DELETE api/transactions
// @desc Delete transactions
// @access Public

router.delete("/:id", auth, (req, res) => {
  Transaction.findById(req.params.id)
    .then(transaction =>
      transaction.remove().then(() => res.json({ success: true }))
    )
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
