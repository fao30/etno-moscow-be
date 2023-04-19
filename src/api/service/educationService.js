const { Educations } = require("../models");

class EducationService {
	static async createEducation(name) {
		return Educations.create({ name });
	}

	static async findAllEducations() {
		return Educations.findAll({
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});
	}

	static async findEducationById(id) {
		return Educations.findOne({
			where: { id },
		});
	}

	static async deleteEducation(id) {
		return Educations.destroy({ where: { id } });
	}
}

module.exports = EducationService;
