// Importing packages
const express = require("express");
const bodyParser = require("body-parser");
const home = require("./src/routes/home");
const reports = require("./src/routes/reports");
const report = require("./src/routes/report");
const sequelize = require("./src/models/index");
const api = require("./src/routes/api");
// initializing app
const app = express();

// declations
const port = 5001;

// database connection
sequelize
  .sync()
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

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
app.use("/", home);
app.use("/reports", reports);
app.use("/report", report);
app.use("/api", api);

// server
app.listen(port, () => {
  console.log(`Server is running at Port ${port}`);
});
