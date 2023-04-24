const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { NO_CONTENT, BAD_REQUEST } = require("../../constants/statusCode");
const AppError = require("../../helpers/AppError");
const errorMiddleware = require("../../middlewares/errorMiddleware");

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    if (err || !user) {
      throw new AppError(NO_CONTENT, "User is undefined");
    }

    req.login(user, { session: false }, async (err) => {
      if (err) return next(err);

      const payload = {
        id: user.id,
        email: user.email,
      };

      const token = jwt.sign(
        { user: payload },
        process.env.ACCESS_TOKEN_SECRET
      );

      const verify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      if (_.isEmpty(verify.user)) {
        throw new AppError(BAD_REQUEST, "user and password undefined");
      }

      return res.json({ token });
    });
  })(req, res, next);
});

router.use(errorMiddleware);

module.exports = router;
