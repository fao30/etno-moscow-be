const PersonalQualitiesService = require("../service/personalQualityService");
const AppError = require("../helpers/AppError");
const {
  NO_CONTENT,
  OK,
  NOT_FOUND,
  BAD_REQUEST,
  CREATED,
} = require("../constants/statusCode");
const ExtractToken = require("../helpers/extractToken");

class PersonalQualitiesController {
  static async createPersonalQuality(req, res) {
    const bearer = req.headers["authorization"];
    const token = bearer?.split(" ")[1];

    const body = ExtractToken(token);

    const { roleId, id } = body.user;

    const { name } = req.body;
    const personalQuality =
      await PersonalQualitiesService.createPersonalQuality(name);

    if (!personalQuality) {
      throw new AppError(BAD_REQUEST, "Cannot create personalQuality", 400);
    }
    const personalQualityUser =
      await PersonalQualitiesService.createPersonalQualityUser(
        personalQuality.id,
        id
      );

    return res.status(CREATED).json({ personalQualityUser });
  }

  static async findAllPersonalQualities(req, res) {
    const personalQualities =
      await PersonalQualitiesService.findAllPersonalQualities();

    if (personalQualities.length === 0) {
      throw new AppError(NO_CONTENT, "personalQualities not found", 400);
    }

    return res.status(OK).json({ personalQualities });
  }

  static async findPersonalQualityById(req, res) {
    const { id } = req.params;
    const personalQuality =
      await PersonalQualitiesService.findPersonalQualityById(id);

    if (!personalQuality) {
      throw new AppError(NOT_FOUND, "personalQuality not found", 400);
    }

    return res.json({ personalQuality });
  }

  static async updatePeronalQuality(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const oldPersonalQuality =
      await PersonalQualitiesService.findPersonalQualityById(id);

    if (!oldPersonalQuality) {
      throw new AppError(NOT_FOUND, "City not found to update", 400);
    }

    oldPersonalQuality.name = name;

    const newPersonalQuality = oldPersonalQuality.save();

    return res.json({ message: "Updated" });
  }

  static async deletePersonalQuality(req, res) {
    const bearer = req.headers["authorization"];
    const token = bearer?.split(" ")[1];

    const body = ExtractToken(token);

    const { roleId, id: idUser } = body.user;
    const { id } = req.params;

    const deleted = await PersonalQualitiesService.deletePersonalQuality(
      id,
      idUser
    );

    if (!deleted) {
      throw new AppError(BAD_REQUEST, "Cannot delete personalQuality", 400);
    }

    return res.json({ message: "personalQuality deleted" });
  }
}

module.exports = PersonalQualitiesController;
