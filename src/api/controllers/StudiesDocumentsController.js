const StudiesDocumentsService = require("../service/studyDocService");
const AppError = require("../helpers/AppError");
const {
	NO_CONTENT,
	OK,
	NOT_FOUND,
	BAD_REQUEST,
} = require("../constants/statusCode");

class StudiesDocumentsController {
	static async findStudyDocs(req, res) {
		const studyDocs = await StudiesDocumentsService.findStudyDocs();

		if (studyDocs.length === 0) {
			throw new AppError(NO_CONTENT, "studyDocs not found", 400);
		}

		return res.status(OK).json({ studyDocs });
	}

	static async findStudyDocById(req, res) {
		const { id } = req.params;
		const findStudyDoc = await StudiesDocumentsService.findStudyDocById(id);

		if (!findStudyDoc) {
			throw new AppError(NOT_FOUND, "findStudyDoc not found", 400);
		}

		return res.json({ findStudyDoc });
	}

	static async deleteStudyDoc(req, res) {
		const { id } = req.params;

		const deleted = await StudiesDocumentsService.deleteStudyDoc(id);

		if (!deleted) {
			throw new AppError(BAD_REQUEST, "Cannot delete deleteStudyDoc", 400);
		}

		return res.json({ message: "deleteStudyDoc deleted" });
	}
}

module.exports = StudiesDocumentsController;
