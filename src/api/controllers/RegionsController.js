const RegionsService = require("../service/regionService");
const AppError = require("../helpers/AppError");
const {
	NO_CONTENT,
	NOT_FOUND,
	BAD_REQUEST,
	CREATED,
} = require("../constants/statusCode");

class RegionsController {
	static async createRegion(req, res) {
		const { name } = req.body;
		const region = await RegionsService.createRegion(name);

		if (!region) {
			throw new AppError(BAD_REQUEST, "Cannot create region", 400);
		}

		return res.status(CREATED).json(region);
	}

	static async getAllRegions(req, res) {
		const regions = await RegionsService.findAllRegions();

		if (regions.length === 0) {
			throw new AppError(NO_CONTENT, "Regions not found", 400);
		}

		return res.json(regions);
	}

	static async getRegionById(req, res) {
		const { id } = req.params;

		const region = await RegionsService.findRegionById(id);

		if (!region) {
			throw new AppError(NOT_FOUND, "Region not found", 404);
		}

		return res.json(region);
	}

	static async updateRegion(req, res) {
		const { id } = req.params;
		const { name } = req.body;

		const oldRegion = await RegionsService.findRegionById(id);

		if (!oldRegion) {
			throw new AppError(NOT_FOUND, "Region not found", 404);
		}

		oldRegion.name = name;

		const newRegion = oldRegion.save();

		return res.json({ message: "Updated" });
	}

	static async deleteRegion(req, res) {
		const { id } = req.params;

		const deleted = await RegionsService.deleteRegion(id);

		if (!deleted) {
			throw new AppError(BAD_REQUEST, "Cannot delete region", 400);
		}

		return res.json({ message: "Region deleted" });
	}
}

module.exports = RegionsController;
