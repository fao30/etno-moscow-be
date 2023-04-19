"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Locations", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			cityId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "Cities",
					},
					key: "id",
				},
			},
			regionId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "Regions",
					},
					key: "id",
				},
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: new Date(),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: new Date(),
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Locations");
	},
};
