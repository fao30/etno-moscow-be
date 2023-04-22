const { Users, Questions, Surveys, Regions } = require("../models");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

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
          model: Regions,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Questions,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
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
          model: Regions,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Questions,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });
  }

  static async register(
    title,
    descriptions,
    maxScore,
    isPrivate,
    isOpen,
    regionId
  ) {
    return Surveys.create({
      title,
      descriptions,
      maxScore,
      isPrivate,
      isOpen,
      regionId,
    });
  }
  static async delete(id) {
    return Surveys.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = SurveyService;
