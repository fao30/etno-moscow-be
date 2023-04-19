"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Studies_Skills", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			studyId: {
				type: Sequelize.INTEGER,
				field: "study_id",
				references: {
					model: {
						tableName: "Studies",
					},
					key: "id",
				},
			},
			skillId: {
				type: Sequelize.INTEGER,
				field: "skill_id",
				references: {
					model: {
						tableName: "Skills",
					},
					key: "id",
				},
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: new Date(),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: new Date(),
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Studies_Skills");
	},
};
