const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const errorMiddleware = require("../../middlewares/errorMiddleware");
const VacanciesController = require("../../controllers/third-api/VacanciesController");
const passport = require("passport");

router.get("/", tryCatch(VacanciesController.getAllVacancies));

//FOR VACANCIES STUDENT
router.get(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	tryCatch(VacanciesController.getVacancyById)
);

//FOR VACANCIES MOP
router.get(
	"/mop/:id/:idOp",
	passport.authenticate("jwt", { session: false }),
	tryCatch(VacanciesController.getVacancyMopByIdOp)
);

router.use(errorMiddleware);

module.exports = router;
