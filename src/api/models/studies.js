"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Studies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Studies.belongsTo(models.Documents, { foreignKey: "documentId" });
      // Studies.belongsTo(models.Educations, { foreignKey: "educationId" });
      // Studies.belongsTo(models.Institutes, { foreignKey: "instituteId" });
      // Studies.belongsTo(models.Universities, { foreignKey: "universityId" });
      // Studies.belongsTo(models.Majors, { foreignKey: "majorId" });
      // Studies.belongsToMany(models.Skills, {
      // 	through: models.Studies_Skills,
      // 	foreignKey: "study_id",
      // 	onDelete: "cascade",
      // });
      // Studies.belongsToMany(models.Subjects, {
      // 	through: models.Studies_Subjects,
      // 	foreignKey: "studyId",
      // 	onDelete: "cascade",
      // });
      // Studies.belongsTo(models.Users, { foreignKey: "userId" });
      // Studies.hasMany(models.Specializations, {
      // 	foreignKey: "studyId",
      // 	as: "specializations",
      // });
    }
  }
  Studies.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
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
      majorId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Majors",
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
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: true,
      },
      documentId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Documents",
          key: "id",
        },
      },
      isConfirmed: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Studies",
    }
  );
  return Studies;
};
