const CitiesService = require("../service/citiesService");
const AppError = require("../helpers/AppError");
const {
	NO_CONTENT,
	NOT_FOUND,
	BAD_REQUEST,
	CREATED,
} = require("../constants/statusCode");

class CitiesController {
	static async createCity(req, res) {
		const { name } = req.body;
		const city = await CitiesService.createCity(name);

		if (!city) {
			throw new AppError(BAD_REQUEST, "Cannot create city", 400);
		}

		return res.status(CREATED).json({ city });
	}

	static async getAllCities(req, res) {
		const cities = await CitiesService.findAllCities();

		if (cities.length === 0) {
			throw new AppError(NO_CONTENT, "Cities not found", 400);
		}

		return res.json({ cities });
	}

	static async getCityById(req, res) {
		const { id } = req.params;
		const city = await CitiesService.findCityById(id);

		if (!city) {
			throw new AppError(NOT_FOUND, "City not found", 400);
		}

		return res.json({ city });
	}

	static async updateCity(req, res) {
		const { id } = req.params;
		const { name } = req.body;
		const oldCity = await CitiesService.findCityById(id);

		if (!oldCity) {
			throw new AppError(NOT_FOUND, "City not found to update", 400);
		}

		oldCity.name = name;

		const newCity = oldCity.save();

		return res.json({ message: "Updated" });
	}

	static async deleteCityById(req, res) {
		const { id } = req.params;

		const deleted = await CitiesService.deleteCityById(id);

		if (!deleted) {
			throw new AppError(BAD_REQUEST, "Cannot delete city", 400);
		}

		return res.json({ message: "City deleted" });
	}
}

module.exports = CitiesController;
