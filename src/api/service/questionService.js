const { Questions_Surveys, Questions, Surveys } = require("../models");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

class QuestionService {
  static async findAllQuestions() {
    return Questions.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: Surveys,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });
  }

  static async findQuestionById(id) {
    return Questions.findOne({
      where: { id },
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
      include: [
        {
          model: Surveys,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });
  }
  static async create(
    questions,
    questionType,
    correctAnswer,
    score,
    answersArray,
    surveyId,
    mediaUrl
  ) {
    return Questions.create({
      questions,
      questionType,
      correctAnswer,
      score,
      answersArray,
      surveyId,
      mediaUrl,
    });
  }
}

module.exports = QuestionService;
