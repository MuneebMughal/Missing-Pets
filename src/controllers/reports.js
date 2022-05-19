exports.getAllReportPage = async (db) => {
  return new Promise(function (resolve, reject) {
    db.all("SELECT * FROM reports", [], function (err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
};
exports.getReport = async (db, id) => {
  return new Promise(function (resolve, reject) {
    db.all("SELECT * FROM reports WHERE id = ?", [id], function (err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows[0]);
    });
  });
};
exports.getSightings = async (db, id) => {
  return new Promise(function (resolve, reject) {
    db.all(
      "SELECT * FROM sightings WHERE report_id = ? ",
      [id],
      function (err, rows) {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      }
    );
  });
};
