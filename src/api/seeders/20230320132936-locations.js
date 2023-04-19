"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.query(
			'ALTER SEQUENCE "Locations_id_seq" RESTART WITH 101'
		);
		await queryInterface.bulkInsert("Locations", [
			{
				id: 1,
				cityId: 1,
				regionId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Locations", null, {});
	},
};
