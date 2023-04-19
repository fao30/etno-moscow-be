"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Specializations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Specializations.belongsToMany(models.Skills, {
        through: models.Specializations_Skills,
        foreignKey: "specialization_id",
        as: "key_words",
        onDelete: "cascade",
      });
      Specializations.belongsTo(models.Studies, { foreignKey: "studyId" });
    }
  }
  Specializations.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: DataTypes.STRING,
      studyId: {
        type: DataTypes.INTEGER,
        model: "Studies",
        key: "id",
      },
    },
    {
      sequelize,
      modelName: "Specializations",
    }
  );
  return Specializations;
};
