const {
  Users,
  Roles,
  Departments,
  Documents,
  Institutes,
  Universities,
  Educations,
  Locations,
  Cities,
  Regions,
  Majors,
  Surveys,
  Skills,
  Specialties,
  Studies,
  PersonalQualities,
} = require("../models");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

class RegisterService {
  static async register(
    firstName,
    middleName,
    lastName,
    email,
    hashPassword,
    position,
    phone,
    dateOfBirth,
    studyYear,
    roleId,
    departmentId,
    majorId,
    instituteId,
    universityId,
    educationId,
    locationId,
    photoId,
    studyId
  ) {
    return Users.create({
      firstName,
      middleName,
      lastName,
      email,
      password: hashPassword,
      position,
      phone,
      dateOfBirth,
      studyYear,
      roleId,
      departmentId,
      majorId,
      instituteId,
      universityId,
      educationId,
      locationId,
      photoId,
      studyId,
    });
  }

  static async findAllUsers() {
    return Users.findAll({
      include: [
        {
          model: Regions,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Surveys,
          through: {
            attributes: [],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });
  }

  static async findUsersByRoleId(roleId) {
    return Users.findAll({
      where: { roleId },
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
          model: Documents,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Specialties,
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

  static async findUserById(id) {
    return Users.findOne({
      where: { id },
      include: [
        {
          model: Regions,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Surveys,
          through: {
            attributes: [],
          },
        },
      ],
      attributes: {
        exclude: ["updatedAt", "password"],
      },
    });
  }

  static async findUserByEmail(email) {
    return await Users.findOne({
      where: { email },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
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
          include: [
            {
              model: Cities,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: Regions,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
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
        {
          model: Specialties,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });
  }

  static async deleteUserFieldByQuery({
    universityId,
    departmentId,
    instituteId,
    majorId,
    educationId,
    specialtyId,
  }) {
    const where = {};
    if (universityId) where.universityId = universityId;
    if (departmentId) where.departmentId = departmentId;
    if (instituteId) where.instituteId = instituteId;
    if (majorId) where.majorId = majorId;
    if (educationId) where.educationId = educationId;
    if (specialtyId) where.specialtyId = specialtyId;
    const users = await Users.findAll({ where });

    users.map((user) => {
      for (let obj in where) {
        user.update({ [obj]: null });
        user[obj] = null;
        user.save();
      }
    });
  }

  static async findUsersForAdmin(fullName, status, university, limit, page) {
    const where = {
      roleId: { [Sequelize.Op.not]: 1 },
    };
    if (fullName) {
      const fullNameArr = fullName.split(" ");
      where[Sequelize.Op.or] = [
        {
          firstName: {
            [Sequelize.Op.iLike]: `%${
              fullNameArr[0] || fullNameArr[1] || fullNameArr[2]
            }%`,
          },
        },
        {
          lastName: {
            [Sequelize.Op.iLike]: `%${
              fullNameArr[0] || fullNameArr[1] || fullNameArr[2]
            }%`,
          },
        },
        {
          middleName: {
            [Sequelize.Op.iLike]: `%${
              fullNameArr[0] || fullNameArr[1] || fullNameArr[2]
            }%`,
          },
        },
      ];
    }
    if (status) where.roleId = status;
    if (university) where.universityId = university;
    return await Users.findAndCountAll({
      where,
      limit,
      offset: limit * page,
      order: [["createdAt", "DESC"]],
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
          model: Departments,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Majors,
          through: {
            attributes: [],
          },
        },
        {
          model: Majors,
          as: "UserMajor",
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
          model: Documents,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Specialties,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Studies,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Studies,
          as: "OpList",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["updatedAt", "password"],
      },
      distinct: true,
    });
  }

  static async findStudiesForAdminCount() {
    return await Studies.findAndCountAll({
      where: {
        isConfirmed: false,
      },
    });
  }

  static async updatePassword({ id, oldPassword, newPassword }) {
    const user = await Users.findOne({
      where: id,
    });

    const verify = await bcrypt.compare(oldPassword, user.password);
    if (!verify) {
      return false;
    }

    await user.update({
      password: newPassword,
    });

    return "User updated";
  }
}

module.exports = RegisterService;
