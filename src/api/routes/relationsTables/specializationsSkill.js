const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const SpecializationsSkillsController = require("../../controllers/SpecializationsSkillsController");
const errorMiddleware = require("../../middlewares/errorMiddleware");

router.get(
  "/",
  tryCatch(SpecializationsSkillsController.findSpecializationsSkills)
);

router.get(
  "/:id",
  tryCatch(SpecializationsSkillsController.findSpecializationSkillById)
);

router.delete(
  "/:id",
  tryCatch(SpecializationsSkillsController.deleteSpecialization)
);
router.delete(
  "/spec-skill/:specId/:skilId",
  tryCatch(SpecializationsSkillsController.deleteSpecializationSkill)
);

router.use(errorMiddleware);

module.exports = router;
