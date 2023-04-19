const SpecializationsSkillsService = require("../service/specSkillService");
const AppError = require("../helpers/AppError");
const {
  NO_CONTENT,
  OK,
  NOT_FOUND,
  BAD_REQUEST,
  CREATED,
} = require("../constants/statusCode");

class SpecializationsSkillsController {
  static async findSpecializationsSkills(req, res) {
    const specializationsSkills =
      await SpecializationsSkillsService.findSpecializationsSkills();

    if (specializationsSkills.length === 0) {
      throw new AppError(NO_CONTENT, "specializationsSkills not found", 400);
    }

    return res.status(CREATED).json({ specializationsSkills });
  }

  static async findSpecializationSkillById(req, res) {
    const { id } = req.params;
    const specializationsSkill =
      await SpecializationsSkillsService.findSpecializationSkillById(id);

    if (!specializationsSkill) {
      throw new AppError(NOT_FOUND, "specializationsSkill not found", 400);
    }

    return res.json({ specializationsSkill });
  }

  static async deleteSpecialization(req, res) {
    const { id } = req.params;

    const deleted =
      await SpecializationsSkillsService.deleteSpecializationSkill(id);

    if (!deleted) {
      throw new AppError(BAD_REQUEST, "Cannot delete Specialization", 400);
    }

    return res.json({ message: "Specialization deleted" });
  }
  static async deleteSpecializationSkill(req, res) {
    const { specId, skilId } = req.params;

    const deleted =
      await SpecializationsSkillsService.deleteSpecializationSkills(
        specId,
        skilId
      );

    if (!deleted) {
      throw new AppError(BAD_REQUEST, "Cannot delete Specialization", 400);
    }

    return res.json({ message: "Specialization deleted" });
  }
}

module.exports = SpecializationsSkillsController;
