"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.query(
			'ALTER SEQUENCE "Institutes_id_seq" RESTART WITH 101'
		);
		await queryInterface.bulkInsert("Institutes", [
			{
				id: 1,
				name: "ИУЭФ",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				name: "ИМО",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 3,
				name: "ИТИС",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 4,
				name: "ИПО",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 5,
				name: "Юридический факультет",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Institutes", null, {});
	},
};
