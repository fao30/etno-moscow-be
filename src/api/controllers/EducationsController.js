const EducationsService = require("../service/educationService");
const AppError = require("../helpers/AppError");
const {
	NO_CONTENT,
	OK,
	NOT_FOUND,
	BAD_REQUEST,
	CREATED,
} = require("../constants/statusCode");
const StudyService = require("../service/studyService");
const RegisterService = require("../service/userService");

class EducationsController {
	static async createEducation(req, res) {
		const { name } = req.body;
		const education = await EducationsService.createEducation(name);

		if (!education) {
			throw new AppError(BAD_REQUEST, "Cannot create educations", 400);
		}

		return res.status(CREATED).json({ education });
	}

	static async findAllEducations(req, res) {
		const educations = await EducationsService.findAllEducations();

		if (educations.length === 0) {
			throw new AppError(NO_CONTENT, "educations not found", 400);
		}

		return res.status(OK).json({ educations });
	}

	static async findEducationById(req, res) {
		const { id } = req.params;
		const education = await EducationsService.findEducationById(id);

		if (!education) {
			throw new AppError(NOT_FOUND, "education not found", 400);
		}

		return res.json({ education });
	}

	static async updateDepartment(req, res) {
		const { id } = req.params;
		const { name } = req.body;
		const oldEducation = await EducationsService.findEducationById(id);

		if (!oldEducation) {
			throw new AppError(NOT_FOUND, "Department not found to update", 400);
		}

		oldEducation.name = name;

		const newEducation = oldEducation.save();

		return res.json({ message: "Updated" });
	}

	static async deleteEducation(req, res) {
		const { id } = req.params;

		const removeFromStudies = new Promise((resolve, reject) => {
			StudyService.deleteStudyFieldByQuery({
				educationId: id,
			});
			resolve();
		});
		const removeFromUsers = new Promise((resolve, reject) => {
			RegisterService.deleteUserFieldByQuery({
				educationId: id,
			});
			resolve();
		});

		await Promise.all([removeFromStudies, removeFromUsers]).then(
			async ([task1, task2]) => {
				if (task1 === undefined && task2 === undefined) {
					setInterval(async () => {
						const deleted = await EducationsService.deleteEducation(id);
					}, 1000);
				}
			}
		);

		return res.json({ message: "education deleted" });
	}
}

module.exports = EducationsController;
