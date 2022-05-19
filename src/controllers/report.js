const { getAllReportPage, getReport,getSightings } = require("./reports.js");
exports.addReport = (db, req, res) => {
  const { name = "", animal = "", description = "", location = "" } = req.body;
  db.run(
    `INSERT INTO reports(name, animal, description, location) values (?, ?, ?, ?)`,
    [name, animal, description, location],
    (err) => {
      if (err) {
        return res.status(400).json({
          message: "Something Went Wrong.",
        });
      } else {
        return res.status(200).json({
          message: "Report inserted successfully.",
        });
      }
    }
  );
};
exports.getAllReports = (db, req, res) => {
  db.all("SELECT * FROM reports", [], (err, data) => {
    if (err) {
      return res.status(400).json({
        message: "Something Went Wrong.",
      });
    } else {
      return res.status(200).json({
        data,
      });
    }
  });
};
exports.getReport = (db, req, res) => {
  const { id } = req.params;
  db.all(`SELECT * FROM reports WHERE id = ?`, [id], (err, data) => {
    if (err) {
      return res.status(400).json({
        message: "Something Went Wrong.",
      });
    } else {
      return res.status(200).json({
        data: data[0],
      });
    }
  });
};
exports.deleteReport = (db, req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM reports WHERE id = ?`, [id], (err) => {
    if (err) {
      return res.status(400).json({
        message: "Something Went Wrong.",
      });
    } else {
      db.run(`DELETE FROM sightings WHERE report_id = ?`, [id], (err) => {
        if (err) {
          return res.status(400).json({
            message: "Something Went Wrong.",
          });
        } else {
          return res.status(200).json({
            message: "Report deleted successfully.",
          });
        }
      });
    }
  });
};
exports.updateReport = (db, req, res) => {
  const { id } = req.params;
  const { name = "", animal = "", description = "", location = "" } = req.body;
  db.run(
    `UPDATE reports SET name = ? , animal = ? , description = ?, location = ? WHERE id = ?`,
    [name, animal, description, location, id],
    (err) => {
      if (err) {
        return res.status(400).json({
          message: "Something Went Wrong.",
        });
      } else {
        return res.status(200).json({
          message: "Report updated successfully.",
        });
      }
    }
  );
};
exports.addSighting = (db, req, res) => {
  const { road_name = "", area = "" } = req.body;
  const { id } = req.params;
  db.run(
    `INSERT INTO sightings(road_name, area, report_id) values (?, ?, ?)`,
    [road_name, area, id],
    (err) => {
      if (err) {
        return res.status(400).json({
          message: "Something Went Wrong.",
        });
      } else {
        return res.status(200).json({
          message: "Sighting inserted successfully.",
        });
      }
    }
  );
};
exports.renderReports = async (db, req, res) => {
  const reports = await getAllReportPage(db);
  res.render("reports", { reports: reports });
};
exports.renderReport = async (db, req, res) => {
  const { id } = req.params;
  const report = await getReport(db, id);
  const sightings = await getSightings(db, id);
  res.render("report", { report: report, sightings: sightings });
};
