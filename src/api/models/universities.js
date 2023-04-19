"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Universities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Universities.belongsToMany(models.Institutes, {
        through: models.Studies,
        foreignKey: "universityId",
        onDelete: "cascade",
      });
      Universities.belongsToMany(models.Majors, {
        through: models.Studies,
        foreignKey: "universityId",
        onDelete: "cascade",
      });
      Universities.belongsToMany(models.Educations, {
        through: models.Studies,
        foreignKey: "universityId",
        onDelete: "cascade",
      });
      Universities.belongsToMany(models.Users, {
        through: models.Studies,
        foreignKey: "universityId",
        onDelete: "cascade",
      });
      Universities.belongsToMany(models.Documents, {
        through: models.Studies,
        foreignKey: "universityId",
        onDelete: "cascade",
      });
    }
  }
  Universities.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Universities",
    }
  );
  return Universities;
};
