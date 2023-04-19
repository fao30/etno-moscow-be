const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const errorMiddleware = require("../../middlewares/errorMiddleware");
const SkillsController = require("../../controllers/SkillsController");

router.post("/", tryCatch(SkillsController.createSkill));

router.get("/", tryCatch(SkillsController.getAllSkills));

router.get("/:id", tryCatch(SkillsController.getSkillById));

router.put("/:id", tryCatch(SkillsController.updateSkill));

router.delete("/:id", tryCatch(SkillsController.deleteSkill));

router.use(errorMiddleware);

module.exports = router;
