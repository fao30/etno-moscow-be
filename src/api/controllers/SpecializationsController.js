const SpecializationsService = require("../service/specializationService");
const AppError = require("../helpers/AppError");
const {
  NO_CONTENT,
  NOT_FOUND,
  BAD_REQUEST,
  CREATED,
} = require("../constants/statusCode");
const { getSpecializationComparison } = require("../helpers/externalAPI");

class SpecializationsController {
  static async createSpecialization(req, res) {
    const { name } = req.body;

    const specialization = await SpecializationsService.createSpecialization(
      name
    );

    if (!specialization) {
      throw new AppError(BAD_REQUEST, "Cannot create specialization", 400);
    }

    return res.status(CREATED).json(specialization);
  }

  static async getAllSpecializations(req, res) {
    const specializations =
      await SpecializationsService.findAllSpecializations();

    if (specializations.length === 0) {
      throw new AppError(NO_CONTENT, "Specializations not found", 400);
    }

    return res.json(specializations);
  }

  static async getSpecializationById(req, res) {
    const { id } = req.params;
    const specialization = await SpecializationsService.findSpecializationById(
      id
    );

    if (!specialization) {
      throw new AppError(NOT_FOUND, "Specialization not found", 400);
    }

    return res.json(specialization);
  }

  static async updateSpecialization(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    const oldSpecialization =
      await SpecializationsService.findSpecializationById(id);

    if (!oldSpecialization) {
      throw new AppError(NOT_FOUND, "Specialization not found to update", 400);
    }

    oldSpecialization.name = name;

    await oldSpecialization.save();

    return res.json({ message: "Updated" });
  }

  static async deleteSpecialization(req, res) {
    const { id } = req.params;

    const deleted = await SpecializationsService.deleteSpecialization(id);

    if (!deleted) {
      throw new AppError(BAD_REQUEST, "Cannot delete specialization", 400);
    }

    return res.json({ message: "Specialization deleted" });
  }

  static async specializationCompare(req, res) {
    const { specializationId } = req.params;

    const text = await SpecializationsService.findSpecializationById(
      specializationId
    );

    const specialization = await getSpecializationComparison({
      id: specializationId,
      text: text.name,
    });

    if (!specialization) {
      throw new AppError(204, "No data", 400);
    }

    return res.json(specialization);
  }
}

module.exports = SpecializationsController;
