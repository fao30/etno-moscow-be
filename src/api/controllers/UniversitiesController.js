const UniversitiesService = require("../service/universityService");
const AppError = require("../helpers/AppError");
const {
	NO_CONTENT,
	OK,
	NOT_FOUND,
	CREATED,
} = require("../constants/statusCode");
const StudyService = require("../service/studyService");
const RegisterService = require("../service/userService");

class UniversitiesController {
	static async createUniversity(req, res) {
		const { name } = req.body;
		const universities = await UniversitiesService.createUniversity(name);

		if (!universities) {
			throw new AppError(BAD_REQUEST, "Cannot create universities", 400);
		}

		return res.status(CREATED).json({ universities });
	}

	static async getAllUniversities(req, res) {
		const universities = await UniversitiesService.findAllUniversities();

		if (universities.length === 0) {
			throw new AppError(NO_CONTENT, "universities not found", 400);
		}

		return res.status(OK).json({ universities });
	}

	static async getUniversityById(req, res) {
		const { id } = req.params;
		const university = await UniversitiesService.findUniversityById(id);

		if (!university) {
			throw new AppError(NOT_FOUND, "university not found", 400);
		}

		return res.json({ university });
	}

	static async updateUniversity(req, res) {
		const { id } = req.params;
		const { name } = req.body;
		const oldUniversity = await UniversitiesService.findUniversityById(id);

		if (!oldUniversity) {
			throw new AppError(NOT_FOUND, "Department not found to update", 400);
		}

		oldUniversity.name = name;

		const newUniversity = oldUniversity.save();

		return res.json({ message: "Updated" });
	}

	static async deleteUniversity(req, res) {
		const { id } = req.params;

		const removeFromStudies = new Promise((resolve, reject) => {
			StudyService.deleteStudyFieldByQuery({
				universityId: id,
			});
			resolve();
		});
		const removeFromUsers = new Promise((resolve, reject) => {
			RegisterService.deleteUserFieldByQuery({
				universityId: id,
			});
			resolve();
		});

		await Promise.all([removeFromStudies, removeFromUsers]).then(
			([task1, task2]) => {
				if (task1 === undefined && task2 === undefined) {
					setInterval(async () => {
						const deleted = await UniversitiesService.deleteUniversity(id);
					}, 1000);
				}
			}
		);

		return res.json({ message: "university deleted" });
	}
}

module.exports = UniversitiesController;
