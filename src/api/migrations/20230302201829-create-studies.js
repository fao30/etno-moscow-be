"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Studies", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			instituteId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "Institutes",
					},
					key: "id",
				},
			},
			universityId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "Universities",
					},
					key: "id",
				},
			},
			majorId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "Majors",
					},
					key: "id",
				},
			},
			userId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "Users",
					},
					key: "id",
				},
			},
			isConfirmed: {
				type: Sequelize.BOOLEAN,
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
		await queryInterface.dropTable("Studies");
	},
};
