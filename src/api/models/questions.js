"use strict";
const { Model } = require("sequelize");
//USE
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Questions.belongsTo(models.Surveys, { foreignKey: "surveyId" });

      // Questions.belongsToMany(models.Surveys, {
      //   through: models.Questions_Surveys,
      //   foreignKey: "questionId",
      //   onDelete: "cascade",
      // });
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
      mediaUrl: DataTypes.STRING,
      score: DataTypes.INTEGER,
      answersArray: {
        type: DataTypes.ARRAY(DataTypes.STRING),
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
    },
    {
      sequelize,
      modelName: "Questions",
    }
  );
  return Questions;
};
