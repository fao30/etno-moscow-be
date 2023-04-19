const StudiesService = require("../service/studyService");
const AppError = require("../helpers/AppError");
const {
  NO_CONTENT,
  NOT_FOUND,
  BAD_REQUEST,
  CREATED,
} = require("../constants/statusCode");
const ExtractToken = require("../helpers/extractToken");
const RegisterService = require("../service/userService");
const StudyService = require("../service/studyService");

class StudiesController {
  static async createStudy(req, res) {
    const { instituteId, universityId, majorId, userId, isConfirmed } =
      req.body;

    //DISINI TAMBAHKAN SERVICE UNTUK UPLOAD FILE KE TABLE "documents" DAN ID NYA MASUKIN DIBAWAH

    const study = await StudiesService.createStudy(
      instituteId,
      universityId,
      majorId,
      userId,
      isConfirmed
      // documentId
    );

    if (!study) {
      throw new AppError(BAD_REQUEST, "Cannot create study", 400);
    }

    return res.status(CREATED).json(study);
  }

  static async getAllStudies(req, res) {
    const { universityId, majorId, instituteId, educationId } = req.query;

    let showAll;
    if (req.query.showAll) {
      showAll = JSON.parse(req.query.showAll); // parse string to boolean
    }

    const studies = await StudiesService.findAllStudiesByQuery({
      universityId,
      majorId,
      instituteId,
      educationId,
      showAll,
    });

    if (!studies) {
      throw new AppError(NO_CONTENT, "Studies not found", 400);
    }
    res.setHeader("Content-Type", "application/json");

    return res.json({ studies });
  }

  static async getAllStudiesByMop(req, res) {
    const bearer = req.headers["authorization"];
    const token = bearer?.split(" ")[1];
    if (!token) {
      throw new AppError(401, "Unauthorized", 400);
    }

    const body = ExtractToken(token);

    if (!body) {
      throw new AppError(204, "Token is empty", 400);
    }

    const userId = body.user.id;
    const studies = await StudiesService.findAllStudiesByMopId(userId);

    if (studies.length === 0) {
      throw new AppError(NO_CONTENT, "Studies not found", 400);
    }

    return res.json(studies);
  }

  static async getStudyById(req, res) {
    const { id } = req.params;
    const study = await StudiesService.findStudyById(id);

    if (!study) {
      throw new AppError(NOT_FOUND, "Study not found", 400);
    }

    return res.json(study);
  }

  static async getStudyByUnivId(req, res) {
    const { id } = req.params;
    const study = await StudiesService.findStudyByUnivId(id);

    if (!study) {
      throw new AppError(NOT_FOUND, "Study not found", 400);
    }

    return res.json(study);
  }

  static async updateStudy(req, res) {
    const { id } = req.params;
    const { instituteId, universityId, majorId, userId, isConfirmed } =
      req.body;

    const oldStudy = await StudiesService.findStudyById(id);

    if (!oldStudy) {
      throw new AppError(NOT_FOUND, "Study not found to update", 400);
    }

    oldStudy.instituteId = instituteId;
    oldStudy.universityId = universityId;
    oldStudy.majorId = majorId;
    oldStudy.userId = userId;
    oldStudy.isConfirmed = isConfirmed;

    await oldStudy.save();

    return res.json({ message: "Updated" });
  }

  static async deleteStudy(req, res) {
    const { id } = req.params;

    const deleted = await StudiesService.deleteStudy(id);

    if (!deleted) {
      throw new AppError(BAD_REQUEST, "Cannot delete study", 400);
    }

    return res.json({ message: "Study deleted" });
  }

  static async getStatByIdStudent(req, res) {
    const bearer = req.headers["authorization"];
    const token = bearer?.split(" ")[1];
    const body = ExtractToken(token);

    const { roleId, id } = body.user;

    if (roleId !== 3) {
      throw new AppError(BAD_REQUEST, "User is not student", 400);
    }

    const responseStudent = await RegisterService.findUserById(+id);

    const studyid = responseStudent.Study.id;

    const responseStatistic = await StudyService.getStatByIdStudent(studyid);

    return res.json(responseStatistic);
  }
}

module.exports = StudiesController;
