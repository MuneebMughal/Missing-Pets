const express = require("express");
const {
  addReport,
  getAllReports,
  getReport,
  deleteReport,
  updateReport,
  addSighting,
} = require("../controllers/report");
const router = express.Router();
router.post("/report", addReport);
router.get("/reports", getAllReports);
router.get("/report/:id", getReport);
router.delete("/report/:id", deleteReport);
router.put("/report/:id", updateReport);
router.post("/sighting/:id", addSighting);
module.exports = router;
