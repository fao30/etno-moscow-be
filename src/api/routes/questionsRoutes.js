const router = require("express").Router();
const QuestionsController = require("../controllers/QuestionsController");
const errorMiddleware = require("../middlewares/errorMiddleware");
const { tryCatch } = require("../utils/tryCatch");

//get all user
router.get("/", tryCatch(QuestionsController.getAllQuestions));

//user by id
router.get("/:id", tryCatch(QuestionsController.getQuestionById));

router.use(errorMiddleware);

module.exports = router;
