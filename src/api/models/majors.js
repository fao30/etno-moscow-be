"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Majors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Majors.belongsToMany(models.Institutes, {
        through: models.Studies,
        foreignKey: "majorId",
        onDelete: "cascade",
      });
      Majors.belongsToMany(models.Universities, {
        through: models.Studies,
        foreignKey: "majorId",
        onDelete: "cascade",
      });
      Majors.belongsToMany(models.Educations, {
        through: models.Studies,
        foreignKey: "majorId",
        onDelete: "cascade",
      });
      // Majors.belongsToMany(models.Users, {
      // 	through: models.Studies,
      // 	foreignKey: "majorId",
      // 	onDelete: "cascade",
      // });
      Majors.belongsToMany(models.Documents, {
        through: models.Studies,
        foreignKey: "majorId",
        onDelete: "cascade",
      });
      Majors.hasMany(models.Studies, {
        foreignKey: "majorId",
        as: "majorsStudies",
      });
    }
  }
  Majors.init(
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
      modelName: "Majors",
    }
  );
  return Majors;
};
