const UsersDocumentsService = require("../service/userDocService");
const AppError = require("../helpers/AppError");
const {
	NO_CONTENT,
	NOT_FOUND,
	BAD_REQUEST,
	CREATED,
} = require("../constants/statusCode");

class UsersDocumentsController {
	static async createUserDocument(req, res) {
		const { userId, documentId } = req.body;

		const userDoc = await UsersDocumentsService.createUserDocument(
			userId,
			documentId
		);

		if (!userDoc) {
			throw new AppError(BAD_REQUEST, "Cannot create user document", 400);
		}

		return res.status(CREATED).json(userDoc);
	}

	static async getAllUsersDocuments(req, res) {
		const usersDocuments = await UsersDocumentsService.findAllUsersDocuments();

		if (usersDocuments.length === 0) {
			throw new AppError(NO_CONTENT, "Users documents not found");
		}

		return res.json(usersDocuments);
	}

	static async getUserDocById(req, res) {
		const { id } = req.params;
		const userDoc = await UsersDocumentsService.findUserDocById(id);

		if (!userDoc) {
			throw new AppError(NOT_FOUND, "User documen not found");
		}

		return res.json(userDoc);
	}

	static async updateUserDocument(req, res) {
		const { id } = req.params;
		const { userId, documentId } = req.body;
		const oldUserDoc = await UsersDocumentsService.findUserDocById(id);

		if (!oldUserDoc) {
			throw new AppError(NOT_FOUND, "User document not found to update", 400);
		}

		oldUserDoc.userId = userId;
		oldUserDoc.documentId = documentId;

		const newUserDoc = oldUserDoc.save();

		return res.json({ message: "Updated" });
	}

	static async deleteUserDoc(req, res) {
		const { id } = req.params;

		const deleted = await UsersDocumentsService.deleteUserDocument(id);

		if (!deleted) {
			throw new AppError(BAD_REQUEST, "Cannot delete user document", 400);
		}

		return res.json({ message: "User document deleted" });
	}
}

module.exports = UsersDocumentsController;
