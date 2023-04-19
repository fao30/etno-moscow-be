"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.query(
			'ALTER SEQUENCE "Majors_id_seq" RESTART WITH 101'
		);
		await queryInterface.bulkInsert("Majors", [
			{
				id: 1,
				name: "Менеджмент",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				name: "Экономика",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Majors", null, {});
	},
};
