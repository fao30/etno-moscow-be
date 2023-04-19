const { Locations, Cities, Regions } = require("../models");

class LocationService {
	static async createLocation(cityId, regionId) {
		return Locations.create({ cityId, regionId });
	}

	static async findAllLocations() {
		return Locations.findAll({
			include: [
				{
					model: Cities,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
				{
					model: Regions,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});
	}

	static async findLocationById(id) {
		return Locations.findOne({
			where: { id },
			include: [
				{
					model: Cities,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
				{
					model: Regions,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});
	}

	static async deleteLocation(id) {
		return Locations.destroy({ where: { id } });
	}
}

module.exports = LocationService;
