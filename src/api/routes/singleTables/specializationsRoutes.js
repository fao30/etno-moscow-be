const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const errorMiddleware = require("../../middlewares/errorMiddleware");
const SpecializationsController = require("../../controllers/SpecializationsController");

router.post("/", tryCatch(SpecializationsController.createSpecialization));

router.get("/", tryCatch(SpecializationsController.getAllSpecializations));

router.get("/:id", tryCatch(SpecializationsController.getSpecializationById));

router.put("/:id", tryCatch(SpecializationsController.updateSpecialization));

router.delete("/:id", tryCatch(SpecializationsController.deleteSpecialization));

router.use(errorMiddleware);

module.exports = router;
