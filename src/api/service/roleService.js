const { Roles, Sequelize } = require("../models");

class RoleService {
	static async createRole(name) {
		return Roles.create({ name });
	}

	static async findAllRoles() {
		return Roles.findAll({
			where: {
				id: { [Sequelize.Op.not]: 1 },
			},
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});
	}

	static async findRoleById(id) {
		return Roles.findOne({
			where: { id },
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});
	}

	static async deleteRole(id) {
		return Roles.destroy({ where: { id } });
	}
}

module.exports = RoleService;
