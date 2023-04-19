const InstitutesService = require("../service/institutesService");
const AppError = require("../helpers/AppError");
const {
	NO_CONTENT,
	NOT_FOUND,
	BAD_REQUEST,
	CREATED,
} = require("../constants/statusCode");
const StudyService = require("../service/studyService");
const RegisterService = require("../service/userService");

class InstitutesController {
	static async createInstitute(req, res) {
		const { name } = req.body;

		const institute = await InstitutesService.createInstitute(name);

		if (!institute) {
			throw new AppError(BAD_REQUEST, "Cannot create institute", 400);
		}

		return res.status(CREATED).json(institute);
	}

	static async getAllInstitutes(req, res) {
		const institutes = await InstitutesService.findAllInstitutes();

		if (institutes.length === 0) {
			throw new AppError(NO_CONTENT, "Institutes not found", 400);
		}

		return res.json(institutes);
	}

	static async getInstituteById(req, res) {
		const { id } = req.params;
		const institute = await InstitutesService.findInstituteById(id);

		if (!institute) {
			throw new AppError(NOT_FOUND, "Institute not found", 404);
		}

		return res.json(institute);
	}

	static async updateInstitute(req, res) {
		const { id } = req.params;
		const { name } = req.body;

		const oldInstitute = await InstitutesService.findInstituteById(id);

		if (!oldInstitute) {
			throw new AppError(NOT_FOUND, "Institute not found", 400);
		}

		oldInstitute.name = name;

		const newInstitute = oldInstitute.save();

		return res.json({ message: "Updated" });
	}

	static async deleteInstitute(req, res) {
		const { id } = req.params;

		const removeFromStudies = new Promise((resolve, reject) => {
			StudyService.deleteStudyFieldByQuery({
				instituteId: id,
			});
			resolve();
		});
		const removeFromUsers = new Promise((resolve, reject) => {
			RegisterService.deleteUserFieldByQuery({
				instituteId: id,
			});
			resolve();
		});

		await Promise.all([removeFromStudies, removeFromUsers]).then(
			async ([task1, task2]) => {
				if (task1 === undefined && task2 === undefined) {
					setInterval(async () => {
						const deleted = await InstitutesService.deleteInstitute(id);
					}, 1000);
				}
			}
		);

		return res.json({ message: "Institute deleted" });
	}
}

module.exports = InstitutesController;
