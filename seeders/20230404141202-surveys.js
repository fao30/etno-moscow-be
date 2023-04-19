"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    const regions = await queryInterface.sequelize.query(
      'SELECT id FROM "Regions";'
    );

    await queryInterface.bulkInsert("Surveys", [
      {
        id: uuidv4(),
        title: "Quiz guessing father name",
        descriptions: "Pertanyaan tentang nama bapak",
        maxScore: 100,
        isPrivate: false,
        isOpen: true,
        regionId: regions[0][3].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Surveys", null, {});
  },
};
