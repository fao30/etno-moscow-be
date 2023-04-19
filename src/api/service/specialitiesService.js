const { Specialties } = require("../models");

class SpecialtiesService {
	static async createSpecialty(name) {
		return Specialties.create({ name });
	}

	static async findAllSpecialties() {
		return Specialties.findAll();
	}

	static async findSpecialtyById(id) {
		return Specialties.findOne({
			where: { id },
		});
	}

	static async deleteSpecialtyById(id) {
		return Specialties.destroy({
			where: { id },
		});
	}
}

module.exports = SpecialtiesService;
