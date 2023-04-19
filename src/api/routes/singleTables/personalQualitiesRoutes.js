const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const PersonalQualitiesController = require("../../controllers/PersonalQualitiesController");
const errorMiddleware = require("../../middlewares/errorMiddleware");
const passport = require("passport");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  tryCatch(PersonalQualitiesController.createPersonalQuality)
);

router.get("/", tryCatch(PersonalQualitiesController.findAllPersonalQualities));

router.get(
  "/:id",
  tryCatch(PersonalQualitiesController.findPersonalQualityById)
);

router.put("/:id", tryCatch(PersonalQualitiesController.updatePeronalQuality));

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  tryCatch(PersonalQualitiesController.deletePersonalQuality)
);

router.use(errorMiddleware);

module.exports = router;
