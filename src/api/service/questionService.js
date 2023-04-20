const { Users, Questions, Surveys } = require("../models");
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
}

module.exports = QuestionService;
