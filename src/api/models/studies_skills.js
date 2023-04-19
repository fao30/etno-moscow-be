"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Studies_Skills extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Studies_Skills.init(
    {
      studyId: {
        type: DataTypes.INTEGER,
        field: "study_id",
        references: {
          model: "Studies",
          key: "id",
        },
      },
      skillId: {
        type: DataTypes.INTEGER,
        field: "skill_id",
        references: {
          model: "Skills",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Studies_Skills",
    }
  );
  return Studies_Skills;
};
