"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.query(
			'ALTER SEQUENCE "Users_id_seq" RESTART WITH 101'
		);

		await queryInterface.bulkInsert("Users", [
			{
				id: 1,
				lastName: "admin",
				firstName: "admin",
				middleName: "admin",
				dateOfBirth: "2001-03-28",
				roleId: 1,
				position: "admin",
				email: "admin@example.com",
				password: await bcrypt.hash("admin", 10),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				lastName: "test1",
				firstName: "test1",
				middleName: "test1",
				dateOfBirth: "2001-03-28",
				universityId: 1,
				instituteId: 1,
				majorId: 1,
				specialtyId: 1,
				educationId: 1,
				studyYear: 3,
				roleId: 3,
				phone: "82342938423",
				email: "test1@example.com",
				password: await bcrypt.hash("test1", 10),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 3,
				lastName: "test2",
				firstName: "test2",
				middleName: "test2",
				dateOfBirth: "2001-03-28",
				universityId: 1,
				instituteId: 1,
				departmentId: 1,
				position: "professor",
				roleId: 2,
				phone: "82342938423",
				email: "test@example.com",
				password: await bcrypt.hash("test2", 10),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Users", null, {});
	},
};
