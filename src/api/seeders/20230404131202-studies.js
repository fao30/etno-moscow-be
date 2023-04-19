"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.query(
			'ALTER SEQUENCE "Studies_id_seq" RESTART WITH 101'
		);

		await queryInterface.bulkInsert("Studies", [
			{
				id: 1,
				name: "Bisnis Informatika",
				instituteId: 1,
				universityId: 1,
				majorId: 1,
				userId: 3,
				educationId: 1,
				isConfirmed: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				name: "Bisnis Management",
				instituteId: 1,
				universityId: 1,
				majorId: 1,
				userId: 3,
				educationId: 2,
				isConfirmed: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Studies", null, {});
	},
};
