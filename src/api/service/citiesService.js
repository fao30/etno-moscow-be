const { Cities } = require("../models");

class CitiesService {
	static async createCity(name) {
		return Cities.create({ name });
	}

	static async findAllCities() {
		return Cities.findAll({
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});
	}

	static async findCityById(id) {
		return Cities.findOne({
			where: { id },
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});
	}

	static async deleteCity(id) {
		return Cities.delete({ where: { id } });
	}
}

module.exports = CitiesService;
