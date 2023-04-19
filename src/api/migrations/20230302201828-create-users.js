"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			firstName: {
				type: Sequelize.STRING,
			},
			lastName: {
				type: Sequelize.STRING,
			},
			middleName: {
				type: Sequelize.STRING,
			},
			email: {
				type: Sequelize.STRING,
			},
			password: {
				type: Sequelize.STRING,
			},
			position: {
				type: Sequelize.STRING,
			},
			phone: {
				type: Sequelize.STRING,
			},
			dateOfBirth: {
				type: Sequelize.STRING,
			},
			studyYear: {
				type: Sequelize.INTEGER,
			},
			roleId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "Roles",
					},
					key: "id",
				},
			},
			departmentId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "Departments",
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
			educationId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "Educations",
					},
					key: "id",
				},
			},
			locationId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "Locations",
					},
					key: "id",
				},
			},
			photoId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "Documents",
					},
					key: "id",
				},
			},
			specialtyId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "Specialties",
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
		await queryInterface.dropTable("Users");
	},
};
