const { CREATED } = require("../constants/statusCode");
const AppError = require("../helpers/AppError");
const SpecialtiesService = require("../service/specialitiesService");
const RegisterService = require("../service/userService");

class SpecialtiesController {
	static async createSpecialty(req, res) {
		const { name } = req.body;

		const specialty = await specialtiesService.createSpecialty(name);

		if (!specialty) {
			throw new AppError(400, "Cannot create specialty", 400);
		}

		return res.status(CREATED).json({ specialty });
	}

	static async getAllSpecialties(req, res) {
		const specialties = await SpecialtiesService.findAllSpecialties();

		if (!specialties) {
			throw new AppError(204, "Cannot find specialties", 400);
		}

		return res.status(200).json({ specialties });
	}

	static async getSpecialtyById(req, res) {
		const { id } = req.params;

		const specialty = await SpecialtiesService.findSpecialtyById(id);

		if (!specialty) {
			throw new AppError(404, "No Specialty found", 404);
		}

		return res.status(200).json({ specialty });
	}

	static async updateSpecialtyById(req, res) {
		const { id } = req.params;
		const { name } = req.body;

		const specialty = await SpecialtiesService.findSpecialtyById(id);

		if (!specialty) {
			throw new AppError(404, "No Specialty found", 404);
		}

		specialty.name = name;
		await specialty.save();

		return res.json({ message: "Specialty updated" });
	}

	static async deleteSpecialty(req, res) {
		const { id } = req.params;

		const removeFromUsers = new Promise((resolve, reject) => {
			RegisterService.deleteUserFieldByQuery({ specialtyId: id });
			resolve();
		});

		await Promise.all([removeFromUsers]).then(([task1]) => {
			async (task1) => {
				if (task1) {
					const deleted = await SpecialtiesService.deleteSpecialtyById(id);
					if (!deleted) {
						throw new AppError(400, "Cannot delete Specialty", 400);
					}
				}
			};
		});

		return res.json({ message: "Specialty deleted" });
	}
}

module.exports = SpecialtiesController;
