"use strict";
/** @type {import('sequelize-cli').Migration} */
//USE
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Questions", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      questions: {
        type: Sequelize.STRING,
      },
      mediaUrl: {
        type: Sequelize.STRING,
      },
      questionType: {
        type: Sequelize.STRING,
      },
      correctAnswer: {
        type: Sequelize.STRING,
      },
      answersArray: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      score: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      surveyId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Surveys",
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
    await queryInterface.dropTable("Questions");
  },
};
