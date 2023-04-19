const { NO_CONTENT } = require("../../constants/statusCode");
const AppError = require("../../helpers/AppError");
const {
  findVacancyKeyWords,
  findSkillsKey,
  findSpecialization,
  findRegions,
} = require("../../helpers/externalAPI");

require("dotenv").config();

class ThirdAPIController {
  static async getAllVacanciesKey(req, res) {
    const { text } = req.query;

    const suggestions = await findVacancyKeyWords(text);

    if (!suggestions) {
      throw new AppError(NO_CONTENT, "There is no suggestions", 400);
    }

    return res.json({ suggestions });
  }

  static async getAllRegions(req, res) {
    const { text } = req.query;
    const regions = await findRegions(text);

    if (!regions) {
      throw new AppError(NO_CONTENT, "There is no suggestions", 400);
    }

    return res.json({ regions });
  }

  static async getAllSkillsSet(req, res) {
    const { text } = req.query;
    const skills = await findSkillsKey(text);

    if (!skills) {
      throw new AppError(NO_CONTENT, "There is no suggestions", 400);
    }

    return res.json({ skills });
  }

  static async getAllSpecializations(req, res) {
    const { text } = req.query;
    const specializations = await findSpecialization(text);

    if (!specializations) {
      throw new AppError(NO_CONTENT, "There is no suggestions", 400);
    }

    return res.json({ specializations });
  }
}

module.exports = ThirdAPIController;
