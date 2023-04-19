"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    const surveys = await queryInterface.sequelize.query(
      'SELECT id FROM "Surveys";'
    );
    const questions = await queryInterface.sequelize.query(
      'SELECT id FROM "Questions";'
    );

    await queryInterface.bulkInsert("Questions_Surveys", [
      {
        id: uuidv4(),
        surveyId: surveys[0][0].id,
        questionId: questions[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Questions_Surveys", null, {});
  },
};
