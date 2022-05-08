// Importing packages
const express = require("express");
const bodyParser = require("body-parser");
const home = require("./src/routes/home");

// initializing app
const app = express();

// declations
const port = 5001;

// database connection

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

// server
app.listen(port, () => {
  console.log(`Server is running at Port ${port}`);
});
