const { Regions } = require("../models");

class RegionsService {
	static async createRegion(name) {
		return Regions.create({ name });
	}

	static async findAllRegions() {
		return Regions.findAll({
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});
	}

	static async findRegionById(id) {
		return Regions.findOne({
			where: { id },
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});
	}

	static async deleteRegion(id) {
		return Regions.destroy({ where: { id } });
	}
}

module.exports = RegionsService;
