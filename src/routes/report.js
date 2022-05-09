const express = require("express");
const router = express.Router();

router.get("/:id", (req, res) => {
  res.render("report");
});
module.exports = router;
