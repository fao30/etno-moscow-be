"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.belongsToMany(models.Skills, {
        through: models.Users_Skills,
        as: "userSkills",
        foreignKey: "user_id",
        onDelete: "cascade",
      });
      Users.belongsToMany(models.Documents, {
        through: models.User_Documents,
        as: "userDocument",
        foreignKey: "user_id",
        onDelete: "cascade",
      });
      Users.belongsToMany(models.PersonalQualities, {
        through: models.User_PersonalQuality,
        as: "userQuality",
        foreignKey: "user_id",
        onDelete: "cascade",
      });
      Users.belongsTo(models.Roles, { foreignKey: "roleId" });
      Users.belongsTo(models.Locations, {
        foreignKey: "locationId",
        // as: "location",
      });
      Users.belongsTo(models.Departments, { foreignKey: "departmentId" });
      Users.belongsTo(models.Majors, {
        as: "UserMajor",
        foreignKey: "majorId",
      });
      Users.belongsTo(models.Institutes, { foreignKey: "instituteId" });
      Users.belongsTo(models.Universities, { foreignKey: "universityId" });
      Users.belongsTo(models.Educations, { foreignKey: "educationId" });
      Users.belongsTo(models.Studies, { foreignKey: "studyId" });
      Users.hasMany(models.Studies, { foreignKey: "userId", as: "OpList" });
      Users.belongsTo(models.Documents, { foreignKey: "photoId" });
      Users.belongsTo(models.Specialties, {
        foreignKey: "specialtyId",
      });
      Users.belongsToMany(models.Institutes, {
        through: models.Studies,
        foreignKey: "userId",
        onDelete: "cascade",
      });
      Users.belongsToMany(models.Universities, {
        through: models.Studies,
        foreignKey: "userId",
        onDelete: "cascade",
      });
      Users.belongsToMany(models.Educations, {
        through: models.Studies,
        foreignKey: "userId",
        onDelete: "cascade",
      });
      Users.belongsToMany(models.Majors, {
        through: models.Studies,
        foreignKey: "userId",
        onDelete: "cascade",
      });
      Users.belongsToMany(models.Documents, {
        through: models.Studies,
        foreignKey: "userId",
        onDelete: "cascade",
      });
    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      firstName: DataTypes.STRING,
      middleName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      position: DataTypes.STRING,
      phone: DataTypes.STRING,
      dateOfBirth: DataTypes.STRING,
      studyYear: DataTypes.INTEGER,
      roleId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Roles",
          key: "id",
        },
      },
      departmentId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Departments",
          key: "id",
        },
        allowNull: true,
      },
      majorId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Majors",
          key: "id",
        },
        allowNull: true,
      },
      instituteId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Institutes",
          key: "id",
        },
      },
      universityId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Universities",
          key: "id",
        },
      },
      educationId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Educations",
          key: "id",
        },
      },
      locationId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Locations",
          key: "id",
        },
        allowNull: true,
      },
      studyId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Studies",
          key: "id",
        },
        allowNull: true,
      },
      photoId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Documents",
          key: "id",
        },
        allowNull: true,
      },
      specialtyId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Specialties",
          key: "id",
        },
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
