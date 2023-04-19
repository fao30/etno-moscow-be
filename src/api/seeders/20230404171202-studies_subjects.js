"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "Studies_Subjects_id_seq" RESTART WITH 101'
    );

    await queryInterface.bulkInsert("Studies_Subjects", [
      {
        id: 1,
        subjectId: 1,
        studyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        subjectId: 2,
        studyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Studies_Subjects", null, {});
  },
};
