"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "Subjects_id_seq" RESTART WITH 101'
    );

    await queryInterface.bulkInsert("Subjects", [
      {
        id: 1,
        name: "Subject SQL and node js",
        text: "this is SQL and Node Js learning",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Subject Informatics",
        text: "this is informatics learning soo if I want to sat",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "Subject Business",
        text: "this is busines learning",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "Subject Buhgalterski ucot",
        text: "bacottt",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Subjects", null, {});
  },
};
