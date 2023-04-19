const passport = require("passport");
const errorMiddleware = require("../../middlewares/errorMiddleware");
const { tryCatch } = require("../../utils/tryCatch");
const UsersController = require("../../controllers/UsersController");
const router = require("express").Router();

router.get(
	"/get-me",
	passport.authenticate("jwt", { session: false }),
	tryCatch(UsersController.getUserToken)
);

router.put(
	"/get-me",
	passport.authenticate("jwt", { session: false }),
	tryCatch(UsersController.updateUser)
);

router.put(
	"/change-password",
	passport.authenticate("jwt", { session: false }),
	tryCatch(UsersController.changePassword)
);

router.get(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	tryCatch(UsersController.getUserById)
);

router.use(errorMiddleware);

module.exports = router;
