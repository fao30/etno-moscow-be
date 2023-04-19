const { PersonalQualities, User_PersonalQuality } = require("../models");

class PersonalQualitiesService {
  static async createPersonalQuality(name) {
    return PersonalQualities.create({ name });
  }
  static async createPersonalQualityUser(idPersonal, userId) {
    return User_PersonalQuality.create({
      personalQualityId: idPersonal,
      userId,
    });
  }

  static async findAllPersonalQualities() {
    return PersonalQualities.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  static async findPersonalQualityById(id) {
    return PersonalQualities.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  static async deletePersonalQuality(id, idUser) {
    return User_PersonalQuality.destroy({
      where: { personalQuality_id: id, userId: idUser },
    });
  }
}

module.exports = PersonalQualitiesService;
