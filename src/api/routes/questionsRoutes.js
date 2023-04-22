const router = require("express").Router();
const QuestionsController = require("../controllers/QuestionsController");
const errorMiddleware = require("../middlewares/errorMiddleware");
const { uploadPicture, uploadVideo, uploadMedia } = require("../utils/storage");
const { tryCatch } = require("../utils/tryCatch");
//get all user
router.get("/", tryCatch(QuestionsController.getAllQuestions));

//user by id
router.get("/:id", tryCatch(QuestionsController.getQuestionById));

//create question by id questions

router.post(
  "/:surveyId",
  uploadMedia.single("media"),
  tryCatch(QuestionsController.createQuestion)
);

router.use(errorMiddleware);

module.exports = router;
