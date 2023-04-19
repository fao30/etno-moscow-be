"use strict";
const { Model } = require("sequelize");
//USE
module.exports = (sequelize, DataTypes) => {
  class Questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Questions.belongsToMany(models.Surveys, {
        through: models.Questions_Surveys,
        foreignKey: "questionId",
        onDelete: "cascade",
      });
    }
  }
  Questions.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
      },
      questions: DataTypes.STRING,
      questionType: DataTypes.STRING,
      correctAnswer: DataTypes.STRING,
      score: DataTypes.INTEGER,
      answersArray: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
    {
      sequelize,
      modelName: "Questions",
    }
  );
  return Questions;
};
