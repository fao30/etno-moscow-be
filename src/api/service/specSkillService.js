const {
  Specializations_Skills,
  Specializations,
  Skills,
} = require("../models");

class SpecializationsSkillsService {
  static async createSpecializationsSkills(specialization_id, skill_id) {
    return Specializations_Skills.create({
      specialization_id,
      skill_id,
    });
  }
  static async findSpecializationsSkills() {
    return Specializations_Skills.findAll({
      include: [
        {
          model: Specializations,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Skills,
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

  static async findSpecializationSkillById(id) {
    return Specializations_Skills.findOne({
      where: { id },
      include: [
        {
          model: Specializations,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Skills,
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

  static async deleteSpecializationSkill(id) {
    return Specializations_Skills.destroy({ where: { id } });
  }
  static async deleteSpecializationSkills(specId, skilId) {
    return Specializations_Skills.destroy({
      where: {
        specialization_id: specId,
        skill_id: skilId,
      },
    });
  }
}

module.exports = SpecializationsSkillsService;
