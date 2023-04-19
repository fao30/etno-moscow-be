const RolesService = require("../service/roleService");
const AppError = require("../helpers/AppError");
const {
	NO_CONTENT,
	OK,
	NOT_FOUND,
	BAD_REQUEST,
	CREATED,
} = require("../constants/statusCode");

class RolesController {
	static async createRole(req, res) {
		const { name } = req.body;
		const roles = await RolesService.createRole(name);

		if (!roles) {
			throw new AppError(BAD_REQUEST, "Cannot create roles", 400);
		}

		return res.status(CREATED).json({ roles });
	}

	static async getAllRoles(req, res) {
		const roles = await RolesService.findAllRoles();

		if (roles.length === 0) {
			throw new AppError(NO_CONTENT, "roles not found", 400);
		}

		return res.status(OK).json({ roles });
	}

	static async getRoleById(req, res) {
		const { id } = req.params;
		const role = await RolesService.findRoleById(id);

		if (!role) {
			throw new AppError(NOT_FOUND, "role not found", 400);
		}

		return res.json({ role });
	}

	static async updateRole(req, res) {
		const { id } = req.params;
		const { name } = req.body;
		const oldRole = await RolesService.findRoleById(id);

		if (!oldRole) {
			throw new AppError(NOT_FOUND, "City not found to update", 400);
		}

		oldRole.name = name;

		const newRole = oldRole.save();

		return res.json({ message: "Updated" });
	}

	static async deleteRole(req, res) {
		const { id } = req.params;

		const deleted = await RolesService.deleteRole(id);

		if (!deleted) {
			throw new AppError(BAD_REQUEST, "Cannot delete role", 400);
		}

		return res.json({ message: "role deleted" });
	}
}

module.exports = RolesController;
