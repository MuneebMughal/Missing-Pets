const express = require("express");
const router = express.Router();
const { getAllReports } = require("../controllers/reports");
router.get("/", async (req, res) => {
  const reports = await getAllReports();
  res.render("reports", { reports: reports });
});
module.exports = router;
