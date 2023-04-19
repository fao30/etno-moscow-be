"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.query(
			'ALTER SEQUENCE "Documents_id_seq" RESTART WITH 101'
		);

		await queryInterface.bulkInsert("Documents", [
			{
				id: 1,
				name: "test-picture",
				fileUrl: "photos/faotech.png",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				name: "test-file",
				fileUrl: "documents/kima-testing-file.pdf",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Documents", null, {});
	},
};
