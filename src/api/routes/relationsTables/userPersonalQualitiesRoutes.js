const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const UserPersonalQualitiesController = require("../../controllers/UserPersonalQualitiesController");
const errorMiddleware = require("../../middlewares/errorMiddleware");

router.get(
	"/",
	tryCatch(UserPersonalQualitiesController.findAllUserPersonalQuality)
);

router.get(
	"/:id",
	tryCatch(UserPersonalQualitiesController.findUserPersonalQualityById)
);

router.use(errorMiddleware);

module.exports = router;
