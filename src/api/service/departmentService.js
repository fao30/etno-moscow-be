const { Departments } = require("../models");

class DepartmentsService {
	static async createDepartment(name) {
		return Departments.create({ name });
	}

	static async findAllDepartments() {
		return Departments.findAll({
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});
	}

	static async findDepartmentById(id) {
		return Departments.findOne({
			where: { id },
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});
	}

	static async deleteDepartment(id) {
		return Departments.destroy({ where: { id } });
	}
}

module.exports = DepartmentsService;
