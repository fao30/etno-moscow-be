const router = require("express").Router();
const SpecializationsController = require("../controllers/SpecializationsController");
const errorMiddleware = require("../middlewares/errorMiddleware");
const { tryCatch } = require("../utils/tryCatch");

router.get(
	"/:specializationId",
	tryCatch(SpecializationsController.specializationCompare)
);

router.use(errorMiddleware);

module.exports = router;
