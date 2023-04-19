const { Skills } = require("../models");

class SkillService {
  static async createSkill(name, isHardSkill, link) {
    return Skills.create({ name, isHardSkill, link });
  }

  static async findAllSkills() {
    return Skills.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  static async findSkillById(id) {
    return Skills.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  static async deleteSkill(id) {
    return Skills.destroy({ where: { id } });
  }

  static async bulkCreateSkills({ key_words }) {
    return Skills.bulkCreate(key_words);
  }
}

module.exports = SkillService;
