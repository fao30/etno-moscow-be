const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const LocationsController = require("../../controllers/LocationsController");
const errorMiddleware = require("../../middlewares/errorMiddleware");

router.post("/", tryCatch(LocationsController.createLocation));

router.get("/", tryCatch(LocationsController.findAllLocations));

router.get("/:id", tryCatch(LocationsController.findLocationById));

router.put("/:id", tryCatch(LocationsController.updateLocation));

router.delete("/:id", tryCatch(LocationsController.deleteLocation));

router.use(errorMiddleware);

module.exports = router;
