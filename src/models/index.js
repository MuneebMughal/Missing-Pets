const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("missing-pets", "user", "pass", {
  dialect: "sqlite",
  host: "./db.sqlite",
  logging: false,
});
module.exports = sequelize;
