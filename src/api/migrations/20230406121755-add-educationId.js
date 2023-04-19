"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("Studies", "educationId", {
			type: Sequelize.INTEGER,
			references: {
				model: {
					tableName: "Educations",
				},
				key: "id",
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn("Studies", "educationId");
	},
};
