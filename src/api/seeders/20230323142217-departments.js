"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.query(
			'ALTER SEQUENCE "Departments_id_seq" RESTART WITH 101'
		);
		await queryInterface.bulkInsert("Departments", [
			{
				id: "001",
				name: "Computer Science",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: "002",
				name: "English",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: "003",
				name: "Mathematics",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Departments", null, {});
	},
};
