const { Questions_Surveys, Questions, Surveys } = require("../models");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

class QuestionService {
  static async findAllQuestions() {
    return Questions.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  static async findQuestionById(id) {
    return Questions.findOne({
      where: { id },
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
    });
  }
  static async create(
    questions,
    questionType,
    correctAnswer,
    score,
    answersArray
  ) {
    return Questions.create({
      questions,
      questionType,
      correctAnswer,
      score,
      answersArray,
    });
  }
  static async addQuestionSurvey(surveyId, questionId) {
    return Questions_Surveys.create({
      surveyId,
      questionId,
    });
  }
}

module.exports = QuestionService;
