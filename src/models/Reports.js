const { Model, DataTypes } = require("sequelize");
const sequelize = require("./index");
const Sightings = require("./Sightings");
class Report extends Model {}
Report.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    animal: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "report",
  }
);
Report.hasMany(Sightings, { foreignKey: "report_id", onDelete: "CASCADE" });
module.exports = Report;
