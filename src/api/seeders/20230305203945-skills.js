"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.query(
			'ALTER SEQUENCE "Skills_id_seq" RESTART WITH 101'
		);

		await queryInterface.bulkInsert("Skills", [
			{
				id: 1,
				name: "Node js",
				isHardSkill: true,
				link: "https://faotech.dev/",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				name: "React js",
				isHardSkill: true,
				link: "https://faotech.dev/",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 3,
				name: "Postgres",
				isHardSkill: true,
				link: "https://faotech.dev/",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Skills", null, {});
	},
};
