const MajorsService = require("../service/majorService");
const AppError = require("../helpers/AppError");
const {
	NO_CONTENT,
	NOT_FOUND,
	BAD_REQUEST,
	CREATED,
} = require("../constants/statusCode");
const StudyService = require("../service/studyService");
const RegisterService = require("../service/userService");

class MajorController {
	static async createMajor(req, res) {
		const { name } = req.body;

		const major = await MajorsService.createMajor(name);

		if (!major) {
			throw new AppError(BAD_REQUEST, "Cannot create major", 400);
		}

		return res.status(CREATED).json(major);
	}

	static async getAllMajors(req, res) {
		const { major } = req.query;
		const majors = await MajorsService.findAllMajors(major);

		if (majors.length === 0) {
			throw new AppError(NO_CONTENT, "Majors not found", 400);
		}

		return res.json(majors);
	}

	static async getMajorById(req, res) {
		const { id } = req.params;
		const major = await MajorsService.findMajorById(id);

		if (!major) {
			throw new AppError(NOT_FOUND, "Major not found", 404);
		}

		return res.json(major);
	}

	static async updateMajor(req, res) {
		const { id } = req.params;
		const { name } = req.body;
		const oldMajor = await MajorsService.findMajorById(id);

		if (!oldMajor) {
			throw new AppError(NOT_FOUND, "Major not found", 404);
		}

		oldMajor.name = name;

		const newMajor = oldMajor.save();

		return res.json({ message: "Updated" });
	}

	static async deleteMajor(req, res) {
		const { id } = req.params;

		const removeFromStudies = new Promise((resolve, reject) => {
			StudyService.deleteStudyFieldByQuery({
				majorId: id,
			});
			resolve();
		});
		const removeFromUsers = new Promise((resolve, reject) => {
			RegisterService.deleteUserFieldByQuery({
				majorId: id,
			});
			resolve();
		});

		await Promise.all([removeFromStudies, removeFromUsers]).then(
			async ([task1, task2]) => {
				if (task1 === undefined && task2 === undefined) {
					setInterval(async () => {
						const deleted = await MajorsService.deleteMajor(id);
					}, 1000);
				}
			}
		);

		return res.json({ message: "Major deleted" });
	}
}

module.exports = MajorController;
