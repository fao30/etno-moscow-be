const { OK } = require("../../constants/statusCode");
const AppError = require("../../helpers/AppError");
const {
  findAllVacancies,
  findVacancyById,
  getVacancyMopByIdOp,
  findAllVacanciesPublic,
} = require("../../helpers/externalAPI");
const ExtractToken = require("../../helpers/extractToken");

class VacanciesController {
  static async getAllVacancies(req, res) {
    const pageAsNumber = Number.parseInt(req.query.page);
    const limitAsNumber = Number.parseInt(req.query.limit);
    const { isStudent, text, area, idOp } = req.query;

    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }

    let limit = 20;
    if (!Number.isNaN(limitAsNumber) && limitAsNumber > 0) {
      limit = limitAsNumber;
    }

    const bearer = req.headers["authorization"];
    const token = bearer?.split(" ")[1];

    const body = ExtractToken(token);

    let vacancies;
    if (!token) {
      vacancies = await findAllVacancies({
        page,
        limit,
        isStudent,
        text,
        area,
        idOp,
      });
    } else {
      vacancies = await findAllVacancies({
        page,
        limit,
        isStudent,
        text,
        area,
        userId: body.user.id,
        idOp,
      });
    }

    if (!vacancies) {
      throw new AppError(204, "There are no Vacancies", 400);
    }

    return res.status(OK).json({ vacancies });
  }

  static async getVacancyById(req, res) {
    const bearer = req.headers["authorization"];
    const token = bearer?.split(" ")[1];
    if (!token) {
      throw new AppError(401, "Unauthorized", 400);
    }

    const body = ExtractToken(token);
    const { id } = req.params;

    const vacancy = await findVacancyById(body.user.id, id);

    if (!vacancy) {
      throw new AppError(404, "Vacancy not found", 404);
    }

    return res.status(OK).json({ vacancy });
  }

  static async getVacancyMopByIdOp(req, res) {
    const { id, idOp } = req.params;

    const vacancy = await getVacancyMopByIdOp(id, idOp);

    if (!vacancy) {
      throw new AppError(404, "Vacancy not found", 404);
    }

    return res.status(OK).json({ vacancy });
  }
}

module.exports = VacanciesController;
