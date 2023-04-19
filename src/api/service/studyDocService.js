const { Studies_Skills, Studies, Documents } = require("../models");

class StudyDocumentService {
  static async findStudyDocs() {
    return Studies_Skills.findAll({
      include: [
        {
          model: Studies,
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

  static async findStudyDocById(id) {
    return Studies_Skills.findOne({
      where: { id },
      include: [
        {
          model: Studies,
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

  static async deleteStudyDoc(id) {
    return Specializations_Skills.destroy({ where: { id } });
  }
}

module.exports = StudyDocumentService;
