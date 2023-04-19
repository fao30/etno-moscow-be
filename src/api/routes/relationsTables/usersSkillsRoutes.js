const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const errorMiddleware = require("../../middlewares/errorMiddleware");
const UsersSkills = require("../../controllers/UsersSkillController");

router.post("/", tryCatch(UsersSkills.createUserSkill));

router.get("/", tryCatch(UsersSkills.getAllUsersSkills));

router.get("/:id", tryCatch(UsersSkills.getUserSkillById));

router.put("/:id", tryCatch(UsersSkills.updateUserSkill));

router.delete("/:id", tryCatch(UsersSkills.deleteUserSkill));

router.use(errorMiddleware);

module.exports = router;
