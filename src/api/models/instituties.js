"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Institutes extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Institutes.belongsToMany(models.Universities, {
				through: models.Studies,
				foreignKey: "instituteId",
				onDelete: "cascade",
			});
			Institutes.belongsToMany(models.Majors, {
				through: models.Studies,
				foreignKey: "instituteId",
				onDelete: "cascade",
			});
			Institutes.belongsToMany(models.Educations, {
				through: models.Studies,
				foreignKey: "instituteId",
				onDelete: "cascade",
			});
			Institutes.belongsToMany(models.Users, {
				through: models.Studies,
				foreignKey: "instituteId",
				onDelete: "cascade",
			});
			Institutes.belongsToMany(models.Documents, {
				through: models.Studies,
				foreignKey: "instituteId",
				onDelete: "cascade",
			});
		}
	}
	Institutes.init(
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
			modelName: "Institutes",
		}
	);
	return Institutes;
};
