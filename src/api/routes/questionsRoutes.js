const router = require("express").Router();
const QuestionsController = require("../controllers/QuestionsController");
const errorMiddleware = require("../middlewares/errorMiddleware");
const { uploadPicture, uploadVideo, uploadMedia } = require("../utils/storage");
const { tryCatch } = require("../utils/tryCatch");
const passport = require("passport");
const admin = require("../middlewares/adminAuthenticate");
//get all user
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  tryCatch(admin),
  tryCatch(QuestionsController.getAllQuestions)
);

//question by id
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  tryCatch(admin),
  tryCatch(QuestionsController.getQuestionById)
);

//create question by id Survey
router.post(
  "/:surveyId",
  uploadMedia.single("media"),
  tryCatch(QuestionsController.createQuestion)
);

//deleting question by id
router.delete("/:id", tryCatch(QuestionsController.deleteQuestion));

//editing question
router.put("/:id", tryCatch(QuestionsController.updateQuestion));

router.use(errorMiddleware);

module.exports = router;
