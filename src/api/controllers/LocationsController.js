const LocationsService = require("../service/locationService");
const AppError = require("../helpers/AppError");
const {
	NO_CONTENT,
	OK,
	NOT_FOUND,
	BAD_REQUEST,
	CREATED,
} = require("../constants/statusCode");

class LocationsController {
	static async createLocation(req, res) {
		const { cityId, regionId } = req.body;

		const location = await LocationsService.createLocation(cityId, regionId);

		if (!location) {
			throw new AppError(BAD_REQUEST, "Cannot create location", 400);
		}

		return res.status(CREATED).json(location);
	}

	static async findAllLocations(req, res) {
		const locations = await LocationsService.findAllLocations();

		if (locations.length === 0) {
			throw new AppError(NO_CONTENT, "locations not found", 400);
		}

		return res.status(OK).json({ locations });
	}

	static async findLocationById(req, res) {
		const { id } = req.params;
		const location = await LocationsService.findLocationById(id);

		if (!location) {
			throw new AppError(NOT_FOUND, "location not found", 400);
		}

		return res.json({ location });
	}

	static async updateLocation(req, res) {
		const { id } = req.params;
		const { cityId, regionId } = req.body;

		const oldLocation = await LocationsService.findLocationById(id);

		if (!oldLocation) {
			throw new AppError(NOT_FOUND, "Location not found", 400);
		}

		oldLocation.cityId = cityId;
		oldLocation.regionId = regionId;

		const newLocation = oldLocation.save();

		return res.json({ message: "Updated" });
	}

	static async deleteLocation(req, res) {
		const { id } = req.params;

		const deleted = await LocationsService.deleteLocation(id);

		if (!deleted) {
			throw new AppError(BAD_REQUEST, "Cannot delete location", 400);
		}

		return res.json({ message: "location deleted" });
	}
}

module.exports = LocationsController;
