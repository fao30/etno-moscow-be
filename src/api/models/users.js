"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Users.belongsToMany(models.Skills, {
      //   through: models.Users_Skills,
      //   as: "userSkills",
      //   foreignKey: "user_id",
      //   onDelete: "cascade",
      // });
      // Users.belongsToMany(models.Documents, {
      //   through: models.User_Documents,
      //   as: "userDocument",
      //   foreignKey: "user_id",
      //   onDelete: "cascade",
      // });
      // Users.belongsToMany(models.PersonalQualities, {
      //   through: models.User_PersonalQuality,
      //   as: "userQuality",
      //   foreignKey: "user_id",
      //   onDelete: "cascade",
      // });
      // Users.belongsTo(models.Roles, { foreignKey: "roleId" });
      // Users.belongsTo(models.Locations, {
      //   foreignKey: "locationId",
      //   // as: "location",
      // });
      // Users.belongsTo(models.Departments, { foreignKey: "departmentId" });
      // Users.belongsTo(models.Majors, {
      //   as: "UserMajor",
      //   foreignKey: "majorId",
      // });
      // Users.belongsTo(models.Institutes, { foreignKey: "instituteId" });
      // Users.belongsTo(models.Universities, { foreignKey: "universityId" });
      // Users.belongsTo(models.Educations, { foreignKey: "educationId" });
      // Users.belongsTo(models.Studies, { foreignKey: "studyId" });
      Users.hasMany(models.Regions, { foreignKey: "regionId" });
      // Users.belongsTo(models.Documents, { foreignKey: "photoId" });
      // Users.belongsTo(models.Specialties, {
      //   foreignKey: "specialtyId",
      // });
      // Users.belongsToMany(models.Institutes, {
      //   through: models.Studies,
      //   foreignKey: "userId",
      //   onDelete: "cascade",
      // });
      // Users.belongsToMany(models.Universities, {
      //   through: models.Studies,
      //   foreignKey: "userId",
      //   onDelete: "cascade",
      // });
      // Users.belongsToMany(models.Educations, {
      //   through: models.Studies,
      //   foreignKey: "userId",
      //   onDelete: "cascade",
      // });
      // Users.belongsToMany(models.Majors, {
      //   through: models.Studies,
      //   foreignKey: "userId",
      //   onDelete: "cascade",
      // });
      // Users.belongsToMany(models.Documents, {
      //   through: models.Studies,
      //   foreignKey: "userId",
      //   onDelete: "cascade",
      // });
    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
      },
      firstName: {
        type: DataTypes.STRING,
        field: "first_name",
      },
      lastName: {
        type: DataTypes.STRING,
      },
      secondName: {
        type: DataTypes.STRING,
        field: "second_name",
      },
      university: {
        type: DataTypes.STRING,
        field: "university",
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      telegramId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      regionId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Regions", // name of the parent table
          key: "id", // name of the parent table's UUID field
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
