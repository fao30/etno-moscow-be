const {
  Specializations,
  Skills,
  Specializations_Skills,
} = require("../models");

class SpecializationService {
  static async createSpecialization(name) {
    return Specializations.create({ name });
  }

  static async findAllSpecializations() {
    return Specializations.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  static async findSpecializationById(id) {
    return Specializations.findOne({
      where: { id },
      include: [
        {
          model: Skills,
          as: "key_words",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  static async deleteSpecialization(id) {
    return Specializations.destroy({ where: { id } });
  }

  static async bulkCreateSpecialization({ bulkName }) {
    return Specializations.bulkCreate(bulkName);
  }
  static async bulkCreateSpecializationSkills({ keyWords_Specializations }) {
    return Specializations_Skills.bulkCreate(keyWords_Specializations);
  }
}

module.exports = SpecializationService;
