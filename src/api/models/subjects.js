"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subjects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Subjects.belongsToMany(models.Studies, {
      // 	through: models.Studies_Subjects,
      // 	foreignKey: "subjectId",
      // 	onDelete: "cascade",
      // });
    }
  }
  Subjects.init(
    {
      name: DataTypes.STRING,
      text: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Subjects",
    }
  );
  return Subjects;
};
