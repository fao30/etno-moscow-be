"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Specializations_Skills", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			specializationId: {
				type: Sequelize.INTEGER,
				field: "specialization_id",
				references: {
					model: {
						tableName: "Specializations",
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
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Specializations_Skills");
	},
};
