const { Majors } = require("../models");
const Sequelize = require("sequelize");

class MajorService {
  static async createMajor(name) {
    return Majors.create({ name });
  }

  static async findAllMajors(major) {
    const where = {};
    if (major) {
      where.name = { [Sequelize.Op.iLike]: `%${major}%` };
    }
    return Majors.findAll({
      where,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  static async findMajorById(id) {
    return Majors.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  static async deleteMajor(id) {
    return Majors.destroy({ where: { id } });
  }
}

module.exports = MajorService;
