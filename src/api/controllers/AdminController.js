const { OK, CREATED, NOT_FOUND } = require("../constants/statusCode");
const AppError = require("../helpers/AppError");
const SkillService = require("../service/skillService");
const SpecializationsSkillsService = require("../service/specSkillService");
const SpecializationService = require("../service/specializationService");
const StudyService = require("../service/studyService");
const UsersServices = require("../service/userService");
const UserSkillService = require("../service/userSkillService");

class AdminController {
  static async getAllStudiesAdminCount(req, res) {
    const count = await UsersServices.findStudiesForAdminCount();

    if (!count) {
      throw new AppError(204, "Users not found", 400);
    }
    return res.status(OK).json({ Total: count.count });
  }
  static async getAllUsersAdmin(req, res) {
    const { fullName, status, university } = req.query;

    const pageAsNumber = Number.parseInt(req.query.page);
    const limitAsNumber = Number.parseInt(req.query.limit);

    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }

    let limit = 15;
    if (!Number.isNaN(limitAsNumber) && limitAsNumber > 0) {
      limit = limitAsNumber;
    }

    const users = await UsersServices.findUsersForAdmin(
      fullName,
      status,
      university,
      limit,
      page
    );

    if (!users) {
      throw new AppError(204, "Users not found", 400);
    }

    return res
      .status(OK)
      .json({ users: users.rows, totalPage: Math.ceil(users.count / limit) });
  }

  static async getAllOp(req, res) {
    const { instituteId, majorId, universityId, isConfirmed } = req.query;
    const pageAsNumber = Number.parseInt(req.query.page);
    const limitAsNumber = Number.parseInt(req.query.limit);

    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }

    let limit = 15;
    if (!Number.isNaN(limitAsNumber) && limitAsNumber > 0) {
      limit = limitAsNumber;
    }

    const educationalProgram = await StudyService.findOpForAdmin(
      instituteId,
      majorId,
      universityId,
      limit,
      page,
      isConfirmed
    );

    if (!educationalProgram) {
      throw new AppError(204, "Educational Program not found", 400);
    }

    return res.status(OK).json({
      educationalProgram: educationalProgram.rows,
      totalPage: Math.ceil(educationalProgram.count / limit),
    });
  }

  static async getUserById(req, res) {
    const { id } = req.params;

    const user = await UsersServices.findUserById(id);
    if (!user) {
      throw new AppError(404, "User not found", 404);
    }

    return res.status(OK).json({ user });
  }

  static async updateUser(req, res) {
    const { id } = req.params;
    const {
      firstName,
      middleName,
      lastName,
      email,
      position,
      phone,
      dateOfBirth,
      studyYear,
      departmentId,
      instituteId,
      majorId,
      universityId,
      educationId,
      specialtyId,
    } = req.body;

    const oldUser = await UsersServices.findUserById(id);

    if (!oldUser) {
      throw new AppError(NOT_FOUND, "Department not found to update", 400);
    }

    if (majorId) {
      const majors = await oldUser.getMajors();
      const newMajor = await MajorService.findMajorById(majorId);
      majors.push(newMajor);
      majors.shift();
      await oldUser.setMajors(majors);
    }

    oldUser.firstName = firstName;
    oldUser.middleName = middleName;
    oldUser.lastName = lastName;
    oldUser.email = email;
    oldUser.position = position;
    oldUser.phone = phone;
    oldUser.dateOfBirth = dateOfBirth;
    oldUser.studyYear = studyYear;
    oldUser.majorId = majorId;
    oldUser.departmentId = departmentId;
    oldUser.instituteId = instituteId;
    oldUser.universityId = universityId;
    oldUser.educationId = educationId;
    oldUser.specialtyId = specialtyId;
    await oldUser.save();

    return res.json({ message: "Updated" });
  }

  static async updateOp(req, res) {
    const { id } = req.params;

    const oldOp = await StudyService.findStudyByIdWOnlyData(id);

    if (!oldOp) {
      throw new AppError(NOT_FOUND, "OP not found to update", 400);
    }

    oldOp.isConfirmed = true;
    await oldOp.save();

    return res.json({ message: "Updated" });
  }

  static async newSkillOfVacancy(req, res) {
    const { vacancyId } = req.params;
    const { name, link, isHardSkill } = req.body;
    const skill = await SkillService.createSkill(name, isHardSkill, link);
    await SpecializationsSkillsService.createSpecializationsSkills(
      vacancyId,
      skill.id
    );

    return res.json({ message: "Updated" });
  }

  static async createSkills(req, res) {
    const { id } = req.params;
    const { name, isHardSkill, link } = req.body;

    const skill = await SkillService.createSkill(name, isHardSkill, link);

    if (!skill) {
      throw new AppError(BAD_REQUEST, "Cannot create skill", 400);
    }

    await UserSkillService.createUserSkill({
      user_id: id,
      skill_id: skill.id,
    });

    return res.status(CREATED).json({ skill });
  }

  static async bulkCreateWords(req, res) {
    const { id } = req.params;
    const { key_words } = req.body;
    const createNewSpec = await SkillService.bulkCreateSkills({
      key_words,
    });

    if (!createNewSpec) {
      throw new AppError(BAD_REQUEST, "Skills not made", 404);
    }

    const getNewArrayForSpecSkills = createNewSpec?.map((e) => {
      return {
        specialization_id: +id,
        skill_id: e.id,
      };
    });

    const keyWordsSpecializations =
      await SpecializationService.bulkCreateSpecializationSkills({
        keyWords_Specializations: getNewArrayForSpecSkills,
      });

    return res.status(CREATED).json({ keyWordsSpecializations });
  }
}

module.exports = AdminController;
