const { Users, Regions, Majors, Surveys } = require("../models");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

class RegionsService {
  static async findAllRegions() {
    return Regions.findAll({
      include: [
        // {
        //   model: Users,
        //   attributes: {
        //     exclude: ["createdAt", "updatedAt"],
        //   },
        // },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });
  }

  static async findRegionById(id) {
    return Regions.findOne({
      where: { id },
      // include: [
      //   {
      //     model: Users,
      //     attributes: {
      //       exclude: ["createdAt", "updatedAt"],
      //     },
      //   },
      // ],
      attributes: {
        exclude: ["updatedAt", "password"],
      },
    });
  }
}

module.exports = RegionsService;
