const router = require("express").Router();
const passport = require("passport");
const { tryCatch } = require("../../utils/tryCatch");
const { NO_CONTENT } = require("../../constants/statusCode");

router.post(
	"/",
	passport.authenticate("signup", { session: false }),
	tryCatch(async (req, res) => {
		if (!req.user) {
			throw new AppError(NO_CONTENT, "User in not registered yet");
		}

		const { roleId } = req.user;

		if (roleId === 2) {
			return res.json({
				message: "Successfully registered as MOP",
				info: {
					id: req.user.id,
					email: req.user.email,
					role: roleId,
				},
			});
		}

		if (roleId === 3) {
			return res.json({
				message: "Successfully registered as Student",
				info: {
					id: req.user.id,
					email: req.user.email,
					role: roleId,
				},
			});
		}
	})
);

module.exports = router;
