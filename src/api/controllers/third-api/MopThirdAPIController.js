const { NO_CONTENT } = require("../../constants/statusCode");
const AppError = require("../../helpers/AppError");
const {
  findKeyWordsVacanciesFromHH,
  findKeyWords,
} = require("../../helpers/externalAPI");
const MopController = require("../MopController");

require("dotenv").config();

class MopThirdAPIController {
  static async getAllKeySkills(req, res) {
    const file = req.file;

    const key_words = await findKeyWords(file);

    if (!key_words) {
      throw new AppError(NO_CONTENT, "There is no key_words", 400);
    }

    return res.json({ key_words });
  }

  static async getAllVacanciesKey(req, res) {
    const { text } = req.query;

    const vacancies = await findKeyWordsVacanciesFromHH(text);
    if (!vacancies) {
      throw new AppError(NO_CONTENT, "There is no vacancies", 400);
    }

    return res.json({ vacancies });
  }
}

module.exports = MopThirdAPIController;
