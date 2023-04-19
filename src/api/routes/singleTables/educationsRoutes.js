const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const EducationsController = require("../../controllers/EducationsController");
const errorMiddleware = require("../../middlewares/errorMiddleware");

router.post("/", tryCatch(EducationsController.createEducation));

router.get("/", tryCatch(EducationsController.findAllEducations));

router.get("/:id", tryCatch(EducationsController.findEducationById));

router.put("/:id", tryCatch(EducationsController.updateDepartment));

router.delete("/:id", tryCatch(EducationsController.deleteEducation));

router.use(errorMiddleware);

module.exports = router;
