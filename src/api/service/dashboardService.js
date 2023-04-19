const { Majors, Studies, Specializations } = require("../models");
const Sequelize = require("sequelize");

class DashboardService {
  static async findSpecializationsFromMajor({ majorId }) {
    const majors = await Majors.findAll({
      where: {
        id: majorId,
      },
      include: [
        {
          model: Studies,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          as: "majorsStudies",
          include: [
            {
              model: Specializations,
              attributes: {
                exclude: ["createdAt", "updatedAt", "studyId"],
              },
              as: "specializations",
            },
          ],
        },
      ],
    });
    let specializations = [];
    majors.forEach((study) => {
      study.majorsStudies.map((e) => {
        specializations.push(e.specializations);
      });
    });

    return { data: majors[0], specializations: specializations.flat(1) };
  }
}

module.exports = DashboardService;
