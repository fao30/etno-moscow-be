"use strict";
const { Model } = require("sequelize");
//USE
module.exports = (sequelize, DataTypes) => {
  class Surveys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Surveys.belongsToMany(models.Questions, {
        through: models.Questions_Surveys,
        foreignKey: "surveyId",
        onDelete: "cascade",
      });
    }
  }
  Surveys.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
      },
      title: DataTypes.STRING,
      descriptions: DataTypes.STRING,
      maxScore: DataTypes.INTEGER,
      isPrivate: DataTypes.BOOLEAN,
      isOpen: DataTypes.BOOLEAN,
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
    },
    {
      sequelize,
      modelName: "Surveys",
    }
  );
  return Surveys;
};
