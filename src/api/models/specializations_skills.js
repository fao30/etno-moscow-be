"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Specializations_Skills extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Specializations_Skills.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      specializationId: {
        type: DataTypes.INTEGER,
        field: "specialization_id",
      },
      skillId: {
        type: DataTypes.INTEGER,
        field: "skill_id",
      },
    },
    {
      sequelize,
      modelName: "Specializations_Skills",
    }
  );
  return Specializations_Skills;
};
