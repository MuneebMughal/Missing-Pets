const express = require("express");
const router = express.Router();
const { getReport, getSightings } = require("../controllers/reports");
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const report = await getReport(id);
  const sightings = await getSightings(id);
  res.render("report", { report: report, sightings: sightings });
});
module.exports = router;
