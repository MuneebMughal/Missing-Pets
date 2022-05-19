// Importing packages
const express = require("express");
const bodyParser = require("body-parser");
const sqlite = require("sqlite3").verbose();
const {
  addReport,
  deleteReport,
  getAllReports,
  renderReports,
  renderReport,
  addSighting,
  updateReport,
  getReport,
} = require("./src/controllers/report");
// initializing app
const app = express();

// declations
const port = 5000;

// database connection

const db = new sqlite.Database(
  "./database.db",
  sqlite.OPEN_READWRITE,
  (err) => {
    if (err) console.error(err.message);
    else console.log("Database Connected");
  }
);

// creating tables
// db.run('CREATE TABLE reports(id INTEGER PRIMARY KEY AUTOINCREMENT, name, animal, description, location)');
// db.run('CREATE TABLE sightings(id INTEGER PRIMARY KEY AUTOINCREMENT, road_name, area, report_id INTEGER, CONSTRAINT fk_reports FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE CASCADE)');

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/images", express.static(__dirname + "public/images"));
app.use("/js", express.static(__dirname + "public/js"));

// templating engine
app.set("views", "src/views");
app.set("view engine", "ejs");

// routes
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/reports", (req, res) => renderReports(db, req, res));
app.get("/report/:id", (req, res) => renderReport(db, req, res));
app.post("/api/report", (req, res) => addReport(db, req, res));
app.delete("/api/report/:id", (req, res) => deleteReport(db, req, res));
app.get("/api/reports", (req, res) => {
  getAllReports(db, req, res);
});
app.put("/api/report/:id", (req, res) => updateReport(db, req, res));
app.get("/api/report/:id", (req, res) => getReport(db, req, res));
app.post("/api/sighting/:id", (req, res) => addSighting(db, req, res));

// server
app.listen(port, () => {
  console.log(`Server is running at Port ${port}`);
});
