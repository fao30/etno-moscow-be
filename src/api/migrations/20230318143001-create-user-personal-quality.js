"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("User_PersonalQualities", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			personalQualityId: {
				type: Sequelize.INTEGER,
				field: "personalQuality_id",
				references: {
					model: {
						tableName: "PersonalQualities",
					},
					key: "id",
				},
			},
			userId: {
				type: Sequelize.INTEGER,
				field: "user_id",
				references: {
					model: {
						tableName: "Users",
					},
					key: "id",
				},
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("User_PersonalQualities");
	},
};
