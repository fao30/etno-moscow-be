const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const ThirdAPIController = require("../../controllers/third-api/ThirdAPIController");
const errorMiddleware = require("../../middlewares/errorMiddleware");

router.get("/vacancies", tryCatch(ThirdAPIController.getAllVacanciesKey));

router.get("/skills", tryCatch(ThirdAPIController.getAllSkillsSet));

router.get("/regions", tryCatch(ThirdAPIController.getAllRegions));

router.get(
  "/specializations",
  tryCatch(ThirdAPIController.getAllSpecializations)
);

router.use(errorMiddleware);

module.exports = router;
