const { Documents } = require("../models");

class DocumentsService {
	static async createDocument({ name = null, fileUrl }) {
		return Documents.create({ name, fileUrl });
	}

	static async findAllDocuments() {
		return Documents.findAll({
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});
	}

	static async findDocumentById(id) {
		return Documents.findOne({
			where: { id },
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});
	}

	static async deleteDocument(id) {
		return Documents.delete({ where: { id } });
	}
}

module.exports = DocumentsService;
