"use strict";
/** @type {import('sequelize-cli').Migration} */
//USE
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Surveys", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
      },
      descriptions: {
        type: Sequelize.STRING,
      },
      maxScore: {
        type: Sequelize.INTEGER,
      },
      isPrivate: {
        type: Sequelize.BOOLEAN,
      },
      isOpen: {
        type: Sequelize.BOOLEAN,
      },
      regionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Regions",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("Surveys");
  },
};
