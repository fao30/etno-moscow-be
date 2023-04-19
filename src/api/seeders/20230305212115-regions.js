"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.query(
			'ALTER SEQUENCE "Regions_id_seq" RESTART WITH 101'
		);

		await queryInterface.bulkInsert("Regions", [
			{
				id: 1,
				name: "Татарстан",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Regions", null, {});
	},
};
