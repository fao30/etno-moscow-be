const router = require("express").Router();
const { tryCatch } = require("../utils/tryCatch");
const errorMiddleware = require("../middlewares/errorMiddleware");
const AdminController = require("../controllers/AdminController");
const passport = require("passport");
const admin = require("../middlewares/adminAuthenticate");

router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  tryCatch(admin),
  tryCatch(AdminController.getAllUsersAdmin)
);
router.get(
  "/studies-count",
  passport.authenticate("jwt", { session: false }),
  tryCatch(admin),
  tryCatch(AdminController.getAllStudiesAdminCount)
);

router.get(
  "/users/:id",
  passport.authenticate("jwt", { session: false }),
  tryCatch(admin),
  tryCatch(AdminController.getUserById)
);

router.put(
  "/users/:id",
  passport.authenticate("jwt", { session: false }),
  tryCatch(admin),
  tryCatch(AdminController.updateUser)
);

router.put(
  "/confirm-op/:id",
  passport.authenticate("jwt", { session: false }),
  tryCatch(admin),
  tryCatch(AdminController.updateOp)
);

router.post(
  "/new-skill/:vacancyId",
  passport.authenticate("jwt", { session: false }),
  tryCatch(admin),
  tryCatch(AdminController.newSkillOfVacancy)
);

router.post(
  "/skills/:id",
  passport.authenticate("jwt", { session: false }),
  tryCatch(admin),
  tryCatch(AdminController.createSkills)
);

router.post(
  "/bulk-keywords/:id",
  passport.authenticate("jwt", { session: false }),
  tryCatch(admin),
  tryCatch(AdminController.bulkCreateWords)
);

router.get(
  "/op",
  passport.authenticate("jwt", { session: false }),
  tryCatch(admin),
  tryCatch(AdminController.getAllOp)
);

router.use(errorMiddleware);

module.exports = router;
