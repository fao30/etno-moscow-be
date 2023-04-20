"use strict";
const { Model } = require("sequelize");
//USE
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Questions_Surveys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Questions_Surveys.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
      },
      surveyId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Surveys", // name of the parent table
          key: "id", // name of the parent table's UUID field
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      questionId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Questions", // name of the parent table
          key: "id", // name of the parent table's UUID field
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "Questions_Surveys",
    }
  );
  return Questions_Surveys;
};
