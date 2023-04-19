"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_PersonalQuality extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_PersonalQuality.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      personalQualityId: {
        type: DataTypes.INTEGER,
        field: "personalQuality_id",
      },
      userId: {
        type: DataTypes.INTEGER,
        field: "user_id",
      },
    },
    {
      sequelize,
      modelName: "User_PersonalQuality",
    }
  );
  return User_PersonalQuality;
};
