const SruveyService = require("../service/surveyService");
const AppError = require("../helpers/AppError");
const {
  NO_CONTENT,
  OK,
  NOT_FOUND,
  BAD_REQUEST,
  CREATED,
} = require("../constants/statusCode");
const ExtractToken = require("../helpers/extractToken");
// const MajorService = require("../service/majorService");
const bcrypt = require("bcrypt");

class SurveysController {
  static async getAllSurveys(req, res) {
    const users = await SruveyService.findAllSurveys();

    if (!users.length) {
      throw new AppError(NO_CONTENT, "surveys not found", 400);
    }

    return res.status(OK).json({ users });
  }

  static async getSurveyById(req, res) {
    const survey = await SruveyService.findSruveyById(req.params.id);

    if (!survey) {
      throw new AppError(NOT_FOUND, "survey not found", 400);
    }

    return res.json({ survey });
  }

  static async createSurvey(req, res) {
    const { title, descriptions, maxScore, isPrivate, isOpen, regionId } =
      req.body;
    const user = await SruveyService.register(
      title,
      descriptions,
      maxScore,
      isPrivate,
      isOpen,
      regionId
    );

    if (!user) {
      throw new AppError(BAD_REQUEST, "Cannot create survey", 400);
    }

    return res.status(CREATED).json({ user });
  }

  static async deleteSurvey(req, res) {
    const { id } = req.params;

    const deleted = await SruveyService.delete(id);

    if (!deleted) {
      throw new AppError(BAD_REQUEST, "Cannot delete survey", 400);
    }

    return res.json({ message: "survey deleted" });
  }

  static async updateSurvey(req, res) {
    const { title, descriptions, maxScore, isPrivate, isOpen, regionId } =
      req.body;

    const oldData = await SruveyService.findSruveyById(req.params.id);

    if (!oldData) {
      throw new AppError(NOT_FOUND, "Survey not found to update", 400);
    }

    oldData.title = title;
    oldData.descriptions = descriptions;
    oldData.maxScore = maxScore;
    oldData.isPrivate = isPrivate;
    oldData.isOpen = isOpen;
    oldData.regionId = regionId;

    await oldData.save();

    return res.json({ message: "Updated" });
  }
}

module.exports = SurveysController;
