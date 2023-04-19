"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.query(
			'ALTER SEQUENCE "Educations_id_seq" RESTART WITH 101'
		);

		await queryInterface.bulkInsert("Educations", [
			{
				id: 1,
				name: "Бакалавриат",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				name: "Магистратура",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Educations", null, {});
	},
};
