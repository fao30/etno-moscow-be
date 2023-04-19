"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Skills extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Skills.belongsToMany(models.Users, {
        through: models.Users_Skills,
        as: "userSkills",
        foreignKey: "skill_id",
        onDelete: "cascade",
      });
      Skills.belongsToMany(models.Specializations, {
        through: models.Specializations_Skills,
        foreignKey: "skill_id",
        as: "specSkills",
        onDelete: "cascade",
      });
      Skills.belongsToMany(models.Studies, {
        through: models.Studies_Skills,
        foreignKey: "skill_id",
        onDelete: "cascade",
      });
    }
  }
  Skills.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: DataTypes.STRING,
      isHardSkill: DataTypes.BOOLEAN,
      link: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Skills",
    }
  );
  return Skills;
};
