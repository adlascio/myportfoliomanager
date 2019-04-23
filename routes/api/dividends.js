const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//Transaction Model

const Dividend = require("../../models/Dividend");

// @route GET api/dividends
// @desc Get all dividends
// @access Public

router.get("/", auth, (req, res) => {
  Dividend.find({ userId: req.user.id })
    .sort({ date: -1 })
    .then(dividends => res.json(dividends));
});

// @route POST api/dividends
// @desc Create dividends
// @access Public

router.post("/", auth, (req, res) => {
  const newDividend = new Dividend({
    code: req.body.code,
    value: req.body.value,
    date: req.body.date,
    userId: req.user.id
  });

  newDividend.save().then(dividend => res.json(dividend));
});

// @route DELETE api/dividends
// @desc Delete dividends
// @access Public

router.delete("/:id", auth, (req, res) => {
  Dividend.findById(req.params.id)
    .then(dividend => dividend.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
