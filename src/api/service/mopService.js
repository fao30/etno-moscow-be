const {
  Users,
  Studies,
  Users_Skills,
  Skills,
  Specialties,
  Specializations,
  Subjects,
} = require("../models");
const stringSimilarity = require("string-similarity");
const Sequelize = require("sequelize");
const { similarities, similaritiesWords } = require("../utils/similarities");

class MopService {
  static async getStatByIdOp(id) {
    //SKILL DARI SPET VAKANSII
    const respSpecVacancy = await Specializations.findAll({
      where: {
        studyId: id,
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

    //SUBJECT DARI SI OP
    const respOp = await Studies.findOne({
      where: {
        id,
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
      const getWordsMatch = similaritiesWords({
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

      sumPercentage += +getWordsMatch.percentage || 0;
      number++;
      chartConclution.push({
        id: respSpecVacancy[i].id,
        nameVacancy: respSpecVacancy[i].name,
        isHardSkill: getWordsMatch,
        isSoftSkill,
      });
    }

    const totalPercentage = sumPercentage / number;

    return {
      name: respOp.name,
      data: chartConclution,
      overallPercentage: totalPercentage ? +totalPercentage.toFixed(2) : 0,
    };
  }
}

module.exports = MopService;
