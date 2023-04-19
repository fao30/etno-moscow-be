const router = require("express").Router();
const SpecialtiesController = require("../../controllers/SpecialtiesController");
const errorMiddleware = require("../../middlewares/errorMiddleware");
const { tryCatch } = require("../../utils/tryCatch");

router.post("/", tryCatch(SpecialtiesController.createSpecialty));

router.get("/", tryCatch(SpecialtiesController.getAllSpecialties));

router.get("/:id", tryCatch(SpecialtiesController.getSpecialtyById));

router.put("/:id", tryCatch(SpecialtiesController.updateSpecialtyById));

router.delete("/:id", tryCatch(SpecialtiesController.deleteSpecialty));

router.use(errorMiddleware);

module.exports = router;
