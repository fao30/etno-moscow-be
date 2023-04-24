const RegionsService = require("../service/regionsService");
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

class RegionsController {
  static async getAllRegions(req, res) {
    const regions = await RegionsService.findAllRegions();

    if (regions.length === 0) {
      throw new AppError(NO_CONTENT, "regions not found", 400);
    }

    return res.status(OK).json({ regions });
  }

  static async getRegionById(req, res) {
    const region = await RegionsService.findRegionById(req.params.id);

    if (!region) {
      throw new AppError(NOT_FOUND, "region not found", 400);
    }

    return res.json({ region });
  }
}

module.exports = RegionsController;
