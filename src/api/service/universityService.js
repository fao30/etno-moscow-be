const { Universities } = require("../models");

class UniversitiesService {
	static async createUniversity(name) {
		return Universities.create({ name });
	}

	static async findAllUniversities() {
		return Universities.findAll({
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});
	}

	static async findUniversityById(id) {
		return Universities.findOne({
			where: { id },
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});
	}

	static async deleteUniversity(id) {
		return Universities.destroy({ where: { id } });
	}
}

module.exports = UniversitiesService;
