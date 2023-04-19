const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const errorMiddleware = require("../../middlewares/errorMiddleware");
const UniversitiesController = require("../../controllers/UniversitiesController");

router.post("/", tryCatch(UniversitiesController.createUniversity));

router.get("/", tryCatch(UniversitiesController.getAllUniversities));

router.get("/:id", tryCatch(UniversitiesController.getUniversityById));

router.put("/:id", tryCatch(UniversitiesController.updateUniversity));

router.delete("/:id", tryCatch(UniversitiesController.deleteUniversity));

router.use(errorMiddleware);

module.exports = router;
