"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Locations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Locations.belongsTo(models.Cities, { foreignKey: "cityId" });
      Locations.belongsTo(models.Regions, { foreignKey: "regionId" });
    }
  }
  Locations.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cityId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Cities",
          key: "id",
        },
      },
      regionId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Regions",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Locations",
    }
  );
  return Locations;
};
