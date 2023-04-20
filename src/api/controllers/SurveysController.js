const SruveyService = require("../service/surveyService");
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

class SurveysController {
  static async getAllSurveys(req, res) {
    const users = await SruveyService.findAllSurveys();

    if (!users.length) {
      throw new AppError(NO_CONTENT, "surveys not found", 400);
    }

    return res.status(OK).json({ users });
  }

  static async getSurveyById(req, res) {
    const user = await SruveyService.findSruveyById(req.params.id);

    if (!user) {
      throw new AppError(NOT_FOUND, "survey not found", 400);
    }

    return res.json({ user });
  }

  static async createSurvey(req, res) {
    const { title, descriptions, maxScore, isPrivate, isOpen, regionId } =
      req.body;
    const user = await SruveyService.register(
      title,
      descriptions,
      maxScore,
      isPrivate,
      isOpen,
      regionId
    );

    if (!user) {
      throw new AppError(BAD_REQUEST, "Cannot create survey", 400);
    }

    return res.status(CREATED).json({ user });
  }

  static async deleteSurvey(req, res) {
    const { id } = req.params;

    const deleted = await SruveyService.delete(id);

    if (!deleted) {
      throw new AppError(BAD_REQUEST, "Cannot delete survey", 400);
    }

    return res.json({ message: "survey deleted" });
  }
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

module.exports = SurveysController;
