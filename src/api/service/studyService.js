const {
  Studies,
  Roles,
  Institutes,
  Universities,
  Departments,
  Majors,
  Locations,
  Documents,
  Users,
  Educations,
  Subjects,
  Studies_Subjects,
  Skills,
  Specializations,
} = require("../models");
const {
  similaritiesWords,
  similaritiesStudents,
} = require("../utils/similarities");
const { similarities } = require("../utils/similarities");
// const specializations = require("../models/specializations");
const Sequelize = require("sequelize");

class StudyService {
  static async createStudy({
    name,
    instituteId,
    universityId,
    majorId,
    educationId,
    userId,
    documentId,
    isConfirmed,
  }) {
    return Studies.create({
      name,
      instituteId,
      universityId,
      majorId,
      educationId,
      userId,
      documentId,
      isConfirmed: false,
    });
  }

  static async bulkCreateSubjects({ bulkName }) {
    return Subjects.bulkCreate(bulkName);
  }
  static async bulkCreateStudiesSubjects({ bulkName }) {
    return Studies_Subjects.bulkCreate(bulkName);
  }

  static async findAllStudiesByMopId(id, showAll = false) {
    const where = { userId: id, name: { [Sequelize.Op.not]: null } };
    if (!showAll) {
      where.isConfirmed = true;
    }
    return Studies.findAll({
      where,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: Universities,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Majors,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Institutes,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Educations,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Documents,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });
  }

  static async findAllStudiesByQuery({
    universityId,
    majorId,
    instituteId,
    educationId,
    showAll,
  }) {
    const where = {};
    if (universityId) where.universityId = universityId;
    if (majorId) where.majorId = majorId;
    if (instituteId) where.instituteId = instituteId;
    if (educationId) where.educationId = educationId;
    if (!showAll) {
      where.isConfirmed = true;
    }
    return Studies.findAll({
      where,
      include: [
        {
          model: Universities,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Majors,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Institutes,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Educations,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Users,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Documents,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  static async findAllStudies() {
    return Studies.findAll({
      include: [
        {
          model: Universities,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Majors,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Users,
          include: [
            {
              model: Roles,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: Departments,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: Institutes,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: Universities,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: Educations,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: Locations,
              as: "location",
              through: {
                attributes: [],
              },
            },
          ],
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Documents,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  static async findStudyByIdWOnlyData(id) {
    const studies = await Studies.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    return studies;
  }
  static async findStudyById(id) {
    const studies = await Studies.findOne({
      where: { id },
      include: [
        {
          model: Subjects,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Institutes,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Universities,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Documents,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Educations,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Majors,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Documents,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    //DAPETIN VACANCY
    const specializations = await Specializations.findAll({
      where: { studyId: +id },
      include: [
        {
          model: Skills,
          as: "key_words",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });
    //GET ALL OF SUBJECTS
    const getSubjects = studies.Subjects.map((e) => {
      return {
        id: e.id,
        name: e.name,
        text: e.text,
      };
    });
    //GET ALL OF KEYWORDS
    const getKeyWords = specializations.map((el) => {
      //KEYWORDS OF EACH SPEC
      const keyWordsEachSpecialization = el?.key_words?.map((element) => {
        return {
          id: element.id,
          name: element.name,
          isHardSkill: element.isHardSkill,
          link: element.link,
        };
      });

      const getSimiliarities = similaritiesWords({
        firstWords: getSubjects,
        secondWords: keyWordsEachSpecialization,
      });

      return {
        id: el.id,
        name: el.name,
        studyId: el.studyId,
        createdAt: el.createdAt,
        updatedAt: el.updatedAt,
        percentage: keyWordsEachSpecialization.length
          ? getSimiliarities.percentage
          : 0,
        key_words: keyWordsEachSpecialization,
      };
    });

    return { studies, specializations: getKeyWords };
  }

  static async findStudyByUnivId(id) {
    return Studies.findAll({
      where: {
        universityId: id,
        isConfirmed: true,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  static async findStudyByUserId(userId) {
    return Studies.findOne({
      where: { userId },
      include: [
        {
          model: Universities,
          through: {
            attributes: [],
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Majors,
          through: {
            attributes: [],
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Users,
          through: {
            attributes: [],
            include: [
              {
                model: Roles,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
              {
                model: Institutes,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
              {
                model: Universities,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
              {
                model: Educations,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
              {
                model: Locations,
                as: "location",
                through: {
                  attributes: [],
                },
              },
              {
                model: Documents,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
            ],
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  static async deleteStudyFieldByQuery({
    universityId,
    departmentId,
    instituteId,
    majorId,
    educationId,
  }) {
    const where = {};
    if (universityId) where.universityId = universityId;
    if (departmentId) where.departmentId = departmentId;
    if (instituteId) where.instituteId = instituteId;
    if (majorId) where.majorId = majorId;
    if (educationId) where.educationId = educationId;

    const studies = await Studies.findAll({
      where,
    });

    studies.map((study) => {
      for (let obj in where) {
        study.update({ [obj]: null });
        study[obj] = null;
        study.save();
      }
    });
  }

  static async findOpForAdmin(
    instituteId,
    majorId,
    universityId,
    limit,
    page,
    isConfirmed
  ) {
    const where = {};
    if (instituteId) where.instituteId = instituteId;
    if (universityId) where.universityId = universityId;
    if (majorId) where.majorId = majorId;
    if (isConfirmed) where.isConfirmed = isConfirmed;
    return await Studies.findAndCountAll({
      where,
      limit,
      offset: limit * page,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Institutes,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Universities,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Educations,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["updatedAt"],
      },
    });
  }
  static async getStatByIdStudent(studyId) {
    const respSpecVacancy = await Specializations.findAll({
      where: {
        studyId,
      },
      include: [
        {
          model: Skills,
          as: "key_words",
          attributes: {
            exclude: ["updatedAt", "createdAt"],
          },
          // attributes: ["updatedAt", "createdAt"],
        },
      ],
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
    });

    // //SUBJECT DARI SI OP
    const respOp = await Studies.findOne({
      where: {
        id: studyId,
      },
      include: [
        {
          model: Subjects,
          attributes: {
            exclude: ["instituteId", "createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["updatedAt", "createdAt"],
      },
    });
    const resultStudyOp = [];

    respOp?.Subjects?.map((e) => {
      resultStudyOp.push({ id: e?.id, name: e?.name, text: e?.text });
    });

    let sumPercentage = 0;
    let number = 0;
    const chartConclution = [];
    for (let i = 0; i < respSpecVacancy.length; i++) {
      const isHardSkill = [];
      const isSoftSkill = [];

      const getWordsMatch = similaritiesStudents({
        firstWords: resultStudyOp,
        secondWords: respSpecVacancy[i].key_words,
      });

      for (let j = 0; j < respSpecVacancy[i].key_words.length; j++) {
        //Disini loop untuk KeyWords dari OP nya
        if (respSpecVacancy[i].key_words[j].isHardSkill) {
          isHardSkill.push(respSpecVacancy[i].key_words[j].name);
        } else {
          isSoftSkill.push(respSpecVacancy[i].key_words[j].name);
        }
      }

      sumPercentage += getWordsMatch.percentage || 0;
      number++;

      chartConclution.push({
        id: respSpecVacancy[i].id,
        nameVacancy: respSpecVacancy[i].name,
        isHardSkill: getWordsMatch,
        isSoftSkill,
      });
    }

    return {
      name: respOp.name,
      data: chartConclution,
      overallPercentage: sumPercentage / number,
    };
  }
}

module.exports = StudyService;
