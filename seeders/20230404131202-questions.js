"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Questions", [
      {
        id: uuidv4(),
        questions: "Siapa Nama Bapakmu?",
        questionType: "customResponse",
        correctAnswer: "Okta",
        answersArray: ["Okta", "Okti", "Okto"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Questions", null, {});
  },
};
