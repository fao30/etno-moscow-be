const UsersPersonalQualityService = require("../service/userPersonalQualityService");
const AppError = require("../helpers/AppError");
const {
	NO_CONTENT,
	OK,
	NOT_FOUND,
	BAD_REQUEST,
} = require("../constants/statusCode");

class UsersPersonalController {
	static async findAllUserPersonalQuality(req, res) {
		const userPers =
			await UsersPersonalQualityService.findAllUserPersonalQuality();

		if (userPers.length === 0) {
			throw new AppError(NO_CONTENT, "userPers not found", 400);
		}

		return res.json({ userPers });
	}

	static async findUserPersonalQualityById(req, res) {
		const { id } = req.params;
		const userPersonal =
			await UsersPersonalQualityService.findUserPersonalQualityById(id);

		if (!userPersonal) {
			throw new AppError(NOT_FOUND, "userPersonal not found", 400);
		}

		return res.json({ userPersonal });
	}
}

module.exports = UsersPersonalController;
