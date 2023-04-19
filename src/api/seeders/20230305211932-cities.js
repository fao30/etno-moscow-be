"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.query(
			'ALTER SEQUENCE "Cities_id_seq" RESTART WITH 101'
		);

		await queryInterface.bulkInsert("Cities", [
			{
				id: 1,
				name: "Казань",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				name: "Набережные Челны",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 3,
				name: "Елабуга",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
