const QuestionService = require("../service/questionService");
const AppError = require("../helpers/AppError");
const {
  NO_CONTENT,
  OK,
  NOT_FOUND,
  BAD_REQUEST,
  CREATED,
} = require("../constants/statusCode");
const ExtractToken = require("../helpers/extractToken");
// const MajorService = require("../service/majorService");
const bcrypt = require("bcrypt");

class QuestionsController {
  static async getAllQuestions(req, res) {
    const questions = await QuestionService.findAllQuestions();

    if (!questions.length) {
      throw new AppError(NO_CONTENT, "questions not found", 400);
    }

    return res.status(OK).json({ questions });
  }

  static async getQuestionById(req, res) {
    const question = await QuestionService.findQuestionById(req.params.id);

    if (!question) {
      throw new AppError(NOT_FOUND, "question not found", 400);
    }

    return res.json({ question });
  }
  static async createQuestion(req, res) {
    let mediaUrl;
    if (req.file) {
      let media = req.file.path;
      const urlArr = media.split("/");
      mediaUrl = urlArr.slice(1, urlArr.length).join("/");
    }

    const { surveyId } = req.params;
    const { questions, questionType, correctAnswer, score, answersArray } =
      req.body;

    const question = await QuestionService.create(
      questions,
      questionType,
      correctAnswer,
      score,
      answersArray,
      surveyId,
      mediaUrl
    );

    if (!question) {
      throw new AppError(BAD_REQUEST, "Cannot create question", 400);
    }

    return res.status(CREATED).json({ question });
  }
  static async deleteQuestion(req, res) {
    const { id } = req.params;

    const deleted = await QuestionService.delete(id);

    if (!deleted) {
      throw new AppError(BAD_REQUEST, "Cannot delete question", 400);
    }

    return res.json({ message: "question deleted" });
  }

  static async updateQuestion(req, res) {
    const {
      questions,
      mediaUrl,
      questionType,
      correctAnswer,
      answersArray,
      score,
      surveyId,
    } = req.body;

    const oldData = await QuestionService.findQuestionById(req.params.id);

    if (!oldData) {
      throw new AppError(NOT_FOUND, "Question not found to update", 400);
    }

    oldData.questions = questions;
    oldData.mediaUrl = mediaUrl;
    oldData.questionType = questionType;
    oldData.correctAnswer = correctAnswer;
    oldData.answersArray = answersArray;
    oldData.score = score;
    oldData.surveyId = surveyId;

    await oldData.save();

    return res.json({ message: "Updated" });
  }
}

module.exports = QuestionsController;
