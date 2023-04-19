"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Studies_Subjects", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			subjectId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "Subjects",
					},
					key: "id",
				},
			},
			studyId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "Studies",
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
		await queryInterface.dropTable("Studies_Subjects");
	},
};
