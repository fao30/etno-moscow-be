"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.query(
			'ALTER SEQUENCE "Specialties_id_seq" RESTART WITH 101'
		);

		await queryInterface.bulkInsert("Specialties", [
			{
				id: 1,
				name: "Бизнес-аналитика в управленческой деятельности",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				name: "Маркетинг",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 3,
				name: "Финансовый менеджмент",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 4,
				name: "Управление бизнесом",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Specialties", null, {});
	},
};
