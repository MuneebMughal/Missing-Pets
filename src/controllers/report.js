const Report = require("../models/Reports");
const Sighting = require("../models/Sightings");
exports.addReport = (req, res) => {
  const report = req.body;
  Report.create(report)
    .then(() => {
      res.status(200).json({
        message: "Report added Successfully",
      });
    })
    .catch((err) => {
      res.status(400).json({
        err,
      });
    });
};
exports.getAllReports = (req, res) => {
  Report.findAll()
    .then((data) => {
      res.status(200).json({
        data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        err,
      });
    });
};
exports.getReport = (req, res) => {
  const { id } = req.params;
  Report.findOne({
    where: {
      id: id,
    },
  })
    .then((data) => {
      res.status(200).json({
        data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        err,
      });
    });
};
exports.deleteReport = (req, res) => {
  const { id } = req.params;
  Report.destroy({
    where: {
      id: id,
    },
  })
    .then((deletedRecord) => {
      if (deletedRecord === 1) {
        res.status(200).json({ message: "Deleted successfully" });
      } else {
        res.status(404).json({ message: "record not found" });
      }
    })
    .catch(function (error) {
      res.status(400).json(error);
    });
};
exports.updateReport = (req, res) => {
  const { id } = req.params;
  const { name, animal, description, location } = req.body;
  Report.update(
    {
      name: name,
      animal: animal,
      description: description,
      location: location,
    },
    { where: { id: id } }
  )
    .then(() => {
      res.status(200).json({
        message: "Report updated Successfully.",
      });
    })
    .catch((err) => {
      res.status(400).json({
        err,
      });
    });
};
exports.addSighting = (req, res) => {
  const sighting = req.body;
  const { id } = req.params;
  sighting.report_id = id;
  Sighting.create(sighting)
    .then(() => {
      res.status(200).json({
        message: "Sighting added Successfully",
      });
    })
    .catch((err) => {
      res.status(400).json({
        err,
      });
    });
};
