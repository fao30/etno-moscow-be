const router = require("express").Router();
const QuestionsController = require("../controllers/QuestionsController");
const errorMiddleware = require("../middlewares/errorMiddleware");
const { uploadPicture, uploadVideo, uploadMedia } = require("../utils/storage");
const { tryCatch } = require("../utils/tryCatch");
//get all user
router.get("/", tryCatch(QuestionsController.getAllQuestions));

//question by id
router.get("/:id", tryCatch(QuestionsController.getQuestionById));

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
