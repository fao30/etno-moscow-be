"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("Studies", "documentId", {
			type: Sequelize.INTEGER,
			references: {
				model: {
					tableName: "Documents",
				},
				key: "id",
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn("Studies", "documentId");
	},
};
