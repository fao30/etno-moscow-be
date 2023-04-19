const router = require("express").Router();
const { tryCatch } = require("../utils/tryCatch");
const errorMiddleware = require("../middlewares/errorMiddleware");
const DashboardController = require("../controllers/DashboardController");

router.get(
	"/:majorId",
	tryCatch(DashboardController.getSpecializationsByMajor)
);

router.use(errorMiddleware);

module.exports = router;
