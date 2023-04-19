const DocumentsService = require("../service/documentsService");
const AppError = require("../helpers/AppError");
const {
	NO_CONTENT,
	NOT_FOUND,
	BAD_REQUEST,
	CREATED,
} = require("../constants/statusCode");

class DocumentsController {
	static async createDocument(req, res) {
		const doc = req.file.path;
		const urlArr = doc.split("/");
		const fileUrl = urlArr.slice(1, urlArr.length).join("/");

		const document = await DocumentsService.createDocument({ fileUrl });

		if (!document) {
			throw new AppError(BAD_REQUEST, "Cannot create document", 400);
		}

		return res.status(CREATED).json(document);
	}

	static async getAllDocuments(req, res) {
		const documents = await DocumentsService.findAllDocuments();

		if (documents.length === 0) {
			throw new AppError(NO_CONTENT, "Documents not found", 400);
		}

		return res.json(documents);
	}

	static async getDocumentById(req, res) {
		const { id } = req.params;
		const document = await DocumentsService.findDocumentById(id);

		if (!document) {
			throw new AppError(NOT_FOUND, "Document not found", 400);
		}

		return res.json(document);
	}

	static async updateDocument(req, res) {
		const doc = req.file.path;
		const urlArr = doc.split("/");
		const fileUrl = urlArr.slice(1, urlArr.length).join("/");

		const { id } = req.params;
		const { name } = req.body;

		const oldDoc = await DocumentsService.findDocumentById(id);

		if (!oldDoc) {
			throw new AppError(NOT_FOUND, "Document not found", 400);
		}

		oldDoc.name = name;
		oldDoc.fileUrl = fileUrl;

		const newDoc = oldDoc.save();

		return res.json({ message: "Updated" });
	}

	static async deleteDocument(req, res) {
		const { id } = req.params;

		const deleted = await DocumentsService.deleteDocument(id);

		if (!deleted) {
			throw new AppError(BAD_REQUEST, "Cannot delete document", 400);
		}

		return res.json({ message: "Document deleted" });
	}
}

module.exports = DocumentsController;
