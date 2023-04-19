"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Educations extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Educations.belongsToMany(models.Universities, {
				through: models.Studies,
				foreignKey: "educationId",
				onDelete: "cascade",
			});
			Educations.belongsToMany(models.Majors, {
				through: models.Studies,
				foreignKey: "educationId",
				onDelete: "cascade",
			});
			Educations.belongsToMany(models.Institutes, {
				through: models.Studies,
				foreignKey: "educationId",
				onDelete: "cascade",
			});
			Educations.belongsToMany(models.Users, {
				through: models.Studies,
				foreignKey: "educationId",
				onDelete: "cascade",
			});
			Educations.belongsToMany(models.Documents, {
				through: models.Studies,
				foreignKey: "educationId",
				onDelete: "cascade",
			});
		}
	}
	Educations.init(
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
			modelName: "Educations",
		}
	);
	return Educations;
};
