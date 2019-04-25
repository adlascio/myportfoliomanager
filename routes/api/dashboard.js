const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const axios = require("axios");

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
        let newShareQty;
        let newTotalPrice;
        let newCapitalGain;
        if (transaction.type === "Buy") {
          newShareQty = transaction.shareQty + stockObj.shareQty;
          newTotalPrice =
            transaction.shareQty * transaction.sharePrice +
            stockObj.shareTotalPrice;
        } else {
          newShareQty = stockObj.shareQty - transaction.shareQty;
          newTotalPrice = newShareQty * stockObj.averagePrice;
          newCapitalGain =
            (transaction.sharePrice - stockObj.averagePrice) *
              transaction.shareQty +
            stockObj.capitalGain;
        }

        dashboard[transaction.code] = {
          code: transaction.code,
          shareQty: newShareQty,
          shareTotalPrice: newTotalPrice,
          averagePrice: newTotalPrice / newShareQty,
          capitalGain: newCapitalGain ? newCapitalGain : 0
        };
      } else {
        dashboard[transaction.code] = {
          code: transaction.code,
          shareQty: transaction.shareQty,
          shareTotalPrice: transaction.shareQty * transaction.sharePrice,
          averagePrice: transaction.sharePrice,
          capitalGain: 0
        };
      }
    });
    Dividend.find({ userId: req.user.id }).then(dividends => {
      dividends.forEach(dividend => {
        if (dashboard[dividend.code]["dividends"]) {
          dashboard[dividend.code]["dividends"] += dividend.value;
        } else {
          dashboard[dividend.code]["dividends"] = dividend.value;
        }
      });

      //get all stock price from alpha vantage
      const promises = Object.keys(dashboard).map(stock => {
        return new Promise((resolve, reject) => {
          axios
            .get(
              `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=${
                require("../../config/keys").alphaVantageKey
              }`
            )
            .then(response => {
              dashboard[stock]["stockPrice"] = Number(
                response.data["Global Quote"]["05. price"]
              );
              resolve();
            })
            .catch(err => {
              return reject(err);
            });
        });
      });
      Promise.all(promises)
        .then(() => {
          res.json(dashboard);
        })
        .catch(console.error);
    });
  });
});

module.exports = router;
