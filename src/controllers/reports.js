const Report = require("../models/Reports");
const Sighting = require("../models/Sightings");
exports.getAllReports = async () => {
  let reports = {};
  await Report.findAll({
    order: [["id", "DESC"]],
  }).then((data) => {
    reports = data;
  });
  return reports;
};
exports.getReport = async (id) => {
  let report = {};
  await Report.findOne({
    where: {
      id: id,
    },
  }).then((data) => {
    report = data;
  });
  return report;
};
exports.getSightings = async (id) => {
  let sightings = {};
  await Sighting.findAll({
    where: {
      report_id: id,
    },
  }).then((data) => {
    sightings = data;
  });
  return sightings;
};
