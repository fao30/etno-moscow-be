const router = require("express").Router();
const UsersController = require("../controllers/UsersController");
const errorMiddleware = require("../middlewares/errorMiddleware");
const { tryCatch } = require("../utils/tryCatch");
const passport = require("passport");
const admin = require("../middlewares/adminAuthenticate");

//get all user
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  tryCatch(admin),
  tryCatch(UsersController.getAllUsers)
);

//user by id
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  tryCatch(admin),
  tryCatch(UsersController.getUserById)
);

router.use(errorMiddleware);

module.exports = router;
