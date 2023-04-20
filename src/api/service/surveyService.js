const { Users, Questions, Surveys } = require("../models");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

class SurveyService {
  static async findAllSurveys() {
    return Surveys.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: Users,
          through: {
            attributes: [],
          },
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: Questions,
          through: {
            attributes: [],
          },
        },
      ],
    });
  }

  static async findSruveyById(id) {
    return Surveys.findOne({
      where: { id },
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
      include: [
        {
          model: Users,
          attributes: {
            exclude: ["password"],
          },
          through: {
            attributes: [],
          },
        },
        {
          model: Questions,
          through: {
            attributes: [],
          },
        },
      ],
    });
  }
}

module.exports = SurveyService;
