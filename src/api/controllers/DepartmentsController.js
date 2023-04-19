const DepartmentsService = require("../service/departmentService");
const AppError = require("../helpers/AppError");
const {
	NO_CONTENT,
	OK,
	NOT_FOUND,
	BAD_REQUEST,
	CREATED,
} = require("../constants/statusCode");
const RegisterService = require("../service/userService");

class DepartmentsController {
	static async createDepartment(req, res) {
		const { name } = req.body;
		const department = await DepartmentsService.createDepartment(name);

		if (!department) {
			throw new AppError(BAD_REQUEST, "Cannot create departments", 400);
		}

		return res.status(CREATED).json({ department });
	}

	static async getAllDepartments(req, res) {
		const departments = await DepartmentsService.findAllDepartments();

		if (departments.length === 0) {
			throw new AppError(NO_CONTENT, "Departments not found", 400);
		}

		return res.status(OK).json({ departments });
	}

	static async getDepartmentById(req, res) {
		const { id } = req.params;
		const department = await DepartmentsService.findDepartmentById(id);

		if (!department) {
			throw new AppError(NOT_FOUND, "Department not found", 400);
		}

		return res.json({ department });
	}

	static async updateDepartment(req, res) {
		const { id } = req.params;
		const { name } = req.body;
		const oldDepartment = await DepartmentsService.findDepartmentById(id);

		if (!oldDepartment) {
			throw new AppError(NOT_FOUND, "Department not found to update", 400);
		}

		oldDepartment.name = name;

		const newDepartment = oldDepartment.save();

		return res.json({ message: "Updated" });
	}

	static async deleteDepartment(req, res) {
		const { id } = req.params;

		const removeFromUsers = await RegisterService.deleteUserFieldByQuery({
			departmentId: id,
		});

		await Promise.all([removeFromUsers]).then(async ([task1]) => {
			if (task1 === undefined) {
				const deleted = await DepartmentsService.deleteDepartment(id);
			}
		});

		return res.json({ message: "Department deleted" });
	}
}

module.exports = DepartmentsController;
