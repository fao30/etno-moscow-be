const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const errorMiddleware = require("../../middlewares/errorMiddleware");
const StudiesController = require("../../controllers/StudiesController");
const passport = require("passport");

router.post("/", tryCatch(StudiesController.createStudy));

router.get("/", tryCatch(StudiesController.getAllStudies));
//GET ALL OP BY MOP
router.get("/mop", tryCatch(StudiesController.getAllStudiesByMop));

router.get(
  "/student",
  passport.authenticate("jwt", { session: false }),
  tryCatch(StudiesController.getStatByIdStudent)
);

router.get("/:id", tryCatch(StudiesController.getStudyById));

router.get("/university/:id", tryCatch(StudiesController.getStudyByUnivId));

router.put("/:id", tryCatch(StudiesController.updateStudy));

router.delete("/:id", tryCatch(StudiesController.deleteStudy));

router.use(errorMiddleware);

module.exports = router;
