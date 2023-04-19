"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "Specializations_Skills_id_seq" RESTART WITH 101'
    );

    await queryInterface.bulkInsert("Specializations_Skills", [
      {
        id: 1,
        specialization_id: 1,
        skill_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        specialization_id: 1,
        skill_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        specialization_id: 2,
        skill_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        specialization_id: 2,
        skill_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Specializations_Skills", null, {});
  },
};
