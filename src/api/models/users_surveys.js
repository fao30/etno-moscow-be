"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class Users_Surveys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Users_Surveys.belongsToMany(models.Skills, {
      //   through: models.Users_Skills,
      //   as: "userSkills",
      //   foreignKey: "user_id",
      //   onDelete: "cascade",
      // });
      // Users_Surveys.belongsToMany(models.Documents, {
      //   through: models.User_Documents,
      //   as: "userDocument",
      //   foreignKey: "user_id",
      //   onDelete: "cascade",
      // });
      // Users_Surveys.belongsToMany(models.PersonalQualities, {
      //   through: models.User_PersonalQuality,
      //   as: "userQuality",
      //   foreignKey: "user_id",
      //   onDelete: "cascade",
      // });
      // Users_Surveys.belongsTo(models.Roles, { foreignKey: "roleId" });
      // Users_Surveys.belongsTo(models.Locations, {
      //   foreignKey: "locationId",
      //   // as: "location",
      // });
      // Users_Surveys.belongsTo(models.Departments, { foreignKey: "departmentId" });
      // Users_Surveys.belongsTo(models.Majors, {
      //   as: "UserMajor",
      //   foreignKey: "majorId",
      // });
      // Users_Surveys.belongsTo(models.Institutes, { foreignKey: "instituteId" });
      // Users_Surveys.belongsTo(models.Universities, { foreignKey: "universityId" });
      // Users_Surveys.belongsTo(models.Educations, { foreignKey: "educationId" });
      // Users_Surveys.belongsTo(models.Studies, { foreignKey: "studyId" });
      // Users_Surveys.belongsTo(models.Regions, { foreignKey: "regionId" });
      // Users_Surveys.hasMany(models.Regions, { foreignKey: "regionId" });
      // Users_Surveys.belongsTo(models.Documents, { foreignKey: "photoId" });
      // Users_Surveys.belongsTo(models.Specialties, {
      //   foreignKey: "specialtyId",
      // });
      // Users_Surveys.belongsToMany(models.Institutes, {
      //   through: models.Studies,
      //   foreignKey: "userId",
      //   onDelete: "cascade",
      // });
      // Users_Surveys.belongsToMany(models.Universities, {
      //   through: models.Studies,
      //   foreignKey: "userId",
      //   onDelete: "cascade",
      // });
      // Users_Surveys.belongsToMany(models.Educations, {
      //   through: models.Studies,
      //   foreignKey: "userId",
      //   onDelete: "cascade",
      // });
      // Users_Surveys.belongsToMany(models.Majors, {
      //   through: models.Studies,
      //   foreignKey: "userId",
      //   onDelete: "cascade",
      // });
      // Users_Surveys.belongsToMany(models.Documents, {
      //   through: models.Studies,
      //   foreignKey: "userId",
      //   onDelete: "cascade",
      // });
      // Users_Surveys.belongsToMany(models.Surveys, {
      //   through: models.Studies,
      //   foreignKey: "userId",
      //   onDelete: "cascade",
      // });
    }
  }
  Users_Surveys.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users", // name of the parent table
          key: "id", // name of the parent table's UUID field
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      surveyId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Surveys", // name of the parent table
          key: "id", // name of the parent table's UUID field
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
      modelName: "Users_Surveys",
    }
  );
  return Users_Surveys;
};
