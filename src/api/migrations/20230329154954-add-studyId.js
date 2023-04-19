"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("Specializations", "studyId", {
			type: Sequelize.INTEGER,
			references: {
				model: {
					tableName: "Studies",
				},
				key: "id",
			},
		});

		await queryInterface.addColumn("Users", "studyId", {
			type: Sequelize.INTEGER,
			references: {
				model: {
					tableName: "Studies",
				},
				key: "id",
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn("Specializations", "studyId");

		await queryInterface.removeColumn("Users", "studyId");
	},
};
