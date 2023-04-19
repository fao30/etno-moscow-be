const AppError = require("../helpers/AppError");
const DashboardService = require("../service/dashboardService");

class DashboardController {
  static async getSpecializationsByMajor(req, res) {
    const { majorId } = req.params;

    const specializations = await DashboardService.findSpecializationsFromMajor(
      { majorId }
    );

    if (!specializations) {
      throw new AppError(204, "No specializations", 400);
    }

    return res.json(specializations);
  }
}

module.exports = DashboardController;
