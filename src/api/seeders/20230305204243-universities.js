"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.query(
			'ALTER SEQUENCE "Universities_id_seq" RESTART WITH 101'
		);

		await queryInterface.bulkInsert("Universities", [
			{
				id: 1,
				name: "К(П)ФУ",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				name: "КНИТУ",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 3,
				name: "КИУ",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 4,
				name: "КГМУ",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 5,
				name: "КГЭУ",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 6,
				name: "КГАСУ",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 7,
				name: "КГИК",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 8,
				name: "КЮИ МВД",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 9,
				name: "КГАУ",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 10,
				name: "РГУП",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 11,
				name: "КГАВМ",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 12,
				name: "ПГАФКСиТ",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 13,
				name: "ИННОПОЛИС",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 14,
				name: "ИСГЗ",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 15,
				name: "РУК",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 16,
				name: "КГК",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Universities", null, {});
	},
};
