const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const MopThirdAPIController = require("../../controllers/third-api/MopThirdAPIController");
const MopAPIController = require("../../controllers/MopController");
const errorMiddleware = require("../../middlewares/errorMiddleware");
const Upload = require("../../utils/storage");
const passport = require("passport");
const MOP = require("../../middlewares/mopAuthenticate");

router.get(
  "/get-me",
  passport.authenticate("jwt", { session: false }),
  tryCatch(MOP),
  tryCatch(MopAPIController.getMeMOP)
);

router.post(
  "/vacancies",
  passport.authenticate("jwt", { session: false }),
  tryCatch(MOP),
  Upload.upload.single("file"),
  tryCatch(MopThirdAPIController.getAllKeySkills)
);

router.get(
  "/statistics/:id",
  passport.authenticate("jwt", { session: false }),
  tryCatch(MOP),
  tryCatch(MopAPIController.getStatByIdMop)
);

router.get("/vacancies-hh", tryCatch(MopThirdAPIController.getAllVacanciesKey));

router.post(
  "/program",
  passport.authenticate("jwt", { session: false }),
  tryCatch(MOP),
  Upload.upload.single("file"),
  tryCatch(MopAPIController.createOp)
);

router.use(errorMiddleware);

module.exports = router;
