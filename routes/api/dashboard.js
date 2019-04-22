const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//Transaction Model

const Transaction = require("../../models/Transaction");
const Dividend = require("../../models/Dividend");

// @route GET api/dashboard
// @desc Get dashboard
// @access Public

router.get("/", auth, (req, res) => {
  let dashboard = {};
  Transaction.find({ userId: req.user.id }).then(transactions => {
    transactions.forEach(transaction => {
      let stockObj = dashboard[transaction.code];
      if (stockObj) {
        const newShareQty = transaction.shareQty + stockObj.shareQty;
        const newTotalPrice =
          transaction.shareQty * transaction.sharePrice +
          stockObj.shareTotalPrice;
        dashboard[transaction.code] = {
          shareQty: newShareQty,
          shareTotalPrice: newTotalPrice,
          averagePrice: newTotalPrice / newShareQty
        };
      } else {
        dashboard[transaction.code] = {
          shareQty: transaction.shareQty,
          shareTotalPrice: transaction.shareQty * transaction.sharePrice,
          averagePrice: transaction.sharePrice
        };
      }
    });
    res.json(dashboard);
  });
});

module.exports = router;
