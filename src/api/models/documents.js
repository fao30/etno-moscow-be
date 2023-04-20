"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Documents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Documents.belongsToMany(models.Users, {
      // 	through: models.User_Documents,
      // 	as: "userDocument",
      // 	foreignKey: "document_id",
      // 	onDelete: "cascade",
      // });
      // Documents.belongsToMany(models.Studies, {
      // 	through: models.Studies_Skills,
      // 	as: "studyDocument",
      // 	foreignKey: "document_id",
      // 	onDelete: "cascade",
      // });
      // Documents.belongsToMany(models.Institutes, {
      // 	through: models.Studies,
      // 	foreignKey: "documentId",
      // 	onDelete: "cascade",
      // });
      // Documents.belongsToMany(models.Universities, {
      // 	through: models.Studies,
      // 	foreignKey: "documentId",
      // 	onDelete: "cascade",
      // });
      // Documents.belongsToMany(models.Educations, {
      // 	through: models.Studies,
      // 	foreignKey: "documentId",
      // 	onDelete: "cascade",
      // });
      // Documents.belongsToMany(models.Majors, {
      // 	through: models.Studies,
      // 	foreignKey: "documentId",
      // 	onDelete: "cascade",
      // });
      // Documents.belongsToMany(models.Users, {
      // 	through: models.Studies,
      // 	foreignKey: "documentId",
      // 	onDelete: "cascade",
      // });
    }
  }
  Documents.init(
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
      fileUrl: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Documents",
    }
  );
  return Documents;
};
