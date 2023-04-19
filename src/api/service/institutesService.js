const { Institutes } = require("../models");

class InstitutesService {
	static async createInstitute(name) {
		return Institutes.create({ name });
	}

	static async findAllInstitutes() {
		return Institutes.findAll({
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});
	}

	static async findInstituteById(id) {
		return Institutes.findOne({
			where: { id },
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});
	}

	static async deleteInstitute(id) {
		return Institutes.destroy({ where: { id } });
	}
}

module.exports = InstitutesService;
