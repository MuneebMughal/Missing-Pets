const { Model, DataTypes } = require("sequelize");
const sequelize = require("./index");
class Sighting extends Model {}
Sighting.init(
  {
    road_name: {
      type: DataTypes.STRING,
    },
    area: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "sighting",
  }
);
module.exports = Sighting;
