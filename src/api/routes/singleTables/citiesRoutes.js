const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const CitiesController = require("../../controllers/CitiesController");
const errorMiddleware = require("../../middlewares/errorMiddleware");

router.post("/", tryCatch(CitiesController.createCity));

router.get("/", tryCatch(CitiesController.getAllCities));

router.get("/:id", tryCatch(CitiesController.getCityById));

router.put("/:id", tryCatch(CitiesController.updateCity));

router.delete("/:id", tryCatch(CitiesController.deleteCityById));

router.use(errorMiddleware);

module.exports = router;
