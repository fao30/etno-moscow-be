const router = require("express").Router();
const SurveysController = require("../controllers/SurveysController");
const errorMiddleware = require("../middlewares/errorMiddleware");
const { tryCatch } = require("../utils/tryCatch");

//get all survey
router.get("/", tryCatch(SurveysController.getAllSurveys));

//survey by id
router.get("/:id", tryCatch(SurveysController.getSurveyById));

router.use(errorMiddleware);

module.exports = router;
