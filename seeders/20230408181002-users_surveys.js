"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    const surveys = await queryInterface.sequelize.query(
      'SELECT id FROM "Surveys";'
    );
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM "Users";'
    );

    await queryInterface.bulkInsert("Users_Surveys", [
      {
        id: uuidv4(),
        userId: users[0][0].id,
        surveyId: surveys[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users_Surveys", null, {});
  },
};
