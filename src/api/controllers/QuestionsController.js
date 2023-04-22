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
    const users = await QuestionService.findAllQuestions();

    if (!users.length) {
      throw new AppError(NO_CONTENT, "questions not found", 400);
    }

    return res.status(OK).json({ users });
  }

  static async getQuestionById(req, res) {
    const user = await QuestionService.findQuestionById(req.params.id);

    if (!user) {
      throw new AppError(NOT_FOUND, "question not found", 400);
    }

    return res.json({ user });
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

  // static async createMedia(req, res, next) {
  //   try {
  //     console.log(req);
  //     const media = req.file.path;
  //     // const urlArr = media.split("/");
  //     // const mediaUrl = urlArr.slice(1, urlArr.length).join("/");

  //     // const url = await MediaService.createMedia(mediaUrl);

  //     return res.json({
  //       message: "Successfully upload picture",
  //       // url,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     next(err);
  //   }
  // }

  // static async getUserToken(req, res) {
  //   const bearer = req.headers["authorization"];
  //   const token = bearer?.split(" ")[1];
  //   if (!token) {
  //     throw new AppError(403, "Unauthorized", 400);
  //   }

  //   const body = ExtractToken(token);
  //   if (!body) {
  //     throw new AppError(204, "Token is empty", 400);
  //   }

  //   const user = await UserServices.findUserById(body.user.id);

  //   if (!user) {
  //     throw new AppError(NOT_FOUND, "user not found", 400);
  //   }

  //   return res.json({ user });
  // }

  // static async updateUser(req, res) {
  //   const bearer = req.headers["authorization"];
  //   const token = bearer?.split(" ")[1];
  //   if (!token) {
  //     throw new AppError(403, "Unauthorized", 400);
  //   }

  //   const body = ExtractToken(token);
  //   if (!body) {
  //     throw new AppError(204, "Token is empty", 400);
  //   }
  //   const {
  //     firstName,
  //     middleName,
  //     lastName,
  //     email,
  //     position,
  //     phone,
  //     dateOfBirth,
  //     studyYear,
  //     departmentId,
  //     instituteId,
  //     majorId,
  //     universityId,
  //     educationId,
  //     specialtyId,
  //     photoId,
  //   } = req.body;
  //   const oldUser = await UserServices.findUserById(body.user.id);

  //   if (!oldUser) {
  //     throw new AppError(NOT_FOUND, "Department not found to update", 400);
  //   }

  //   if (majorId) {
  //     const majors = await oldUser.getMajors();
  //     //   const newMajor = await MajorService.findMajorById(majorId);
  //     majors.push(newMajor);
  //     majors.shift();
  //     await oldUser.setMajors(majors);
  //   }

  //   oldUser.firstName = firstName;
  //   oldUser.middleName = middleName;
  //   oldUser.lastName = lastName;
  //   oldUser.email = email;
  //   oldUser.position = position;
  //   oldUser.phone = phone;
  //   oldUser.dateOfBirth = dateOfBirth;
  //   oldUser.studyYear = studyYear;
  //   oldUser.majorId = majorId;
  //   oldUser.departmentId = departmentId;
  //   oldUser.instituteId = instituteId;
  //   oldUser.universityId = universityId;
  //   oldUser.educationId = educationId;
  //   oldUser.specialtyId = specialtyId;
  //   oldUser.photoId = photoId;

  //   await oldUser.save();

  //   return res.json({ message: "Updated" });
  // }

  // static async deleteUser(req, res) {
  //   const { id } = req.params;

  //   const deleted = await UserServices.deleteUser(id);

  //   if (!deleted) {
  //     throw new AppError(BAD_REQUEST, "Cannot delete user", 400);
  //   }

  //   return res.json({ message: "user deleted" });
  // }

  // static async changePassword(req, res) {
  //   const bearer = req.headers["authorization"];
  //   const token = bearer?.split(" ")[1];
  //   if (!token) {
  //     throw new AppError(403, "Unauthorized", 400);
  //   }

  //   const body = ExtractToken(token);
  //   if (!body) {
  //     throw new AppError(204, "Token is empty", 400);
  //   }

  //   const user = await UserServices.findUserById(body.user.id);
  //   if (!user) {
  //     throw new AppError(404, "User not found", 404);
  //   }

  //   const { oldPassword, newPassword } = req.body;

  //   const hashPassword = await bcrypt.hash(newPassword, 10);

  //   await UserServices.updatePassword({
  //     id: user.id,
  //     oldPassword,
  //     newPassword: hashPassword,
  //   });

  //   return res.json({ message: "Password changed" });
  // }
}

module.exports = QuestionsController;
