"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Studies_Subjects extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Studies_Subjects.init(
		{
			subjectId: DataTypes.INTEGER,
			studyId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Studies_Subjects",
		}
	);
	return Studies_Subjects;
};
