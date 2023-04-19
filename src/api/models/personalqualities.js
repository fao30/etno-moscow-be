"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PersonalQualities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PersonalQualities.belongsToMany(models.Users, {
        through: models.User_PersonalQuality,
        as: "personalQuality",
        foreignKey: "personalQuality_id",
        onDelete: "cascade",
      });
    }
  }
  PersonalQualities.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PersonalQualities",
    }
  );
  return PersonalQualities;
};
