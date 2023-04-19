"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.query(
			'ALTER SEQUENCE "Roles_id_seq" RESTART WITH 101'
		);

		await queryInterface.bulkInsert("Roles", [
			{
				id: 1,
				name: "admin",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				name: "МОП",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 3,
				name: "Студент",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Roles", null, {});
	},
};
