const router = require("express").Router();
const SurveysController = require("../controllers/SurveysController");
const errorMiddleware = require("../middlewares/errorMiddleware");
const { tryCatch } = require("../utils/tryCatch");

//get all survey
router.get("/", tryCatch(SurveysController.getAllSurveys));

//survey by id
router.get("/:id", tryCatch(SurveysController.getSurveyById));

//get all survey
router.post("/", tryCatch(SurveysController.createSurvey));

//delete survey
router.post("/:id", tryCatch(SurveysController.deleteSurvey));

router.use(errorMiddleware);

module.exports = router;
