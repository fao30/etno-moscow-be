"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "Users_Skills_id_seq" RESTART WITH 101'
    );

    await queryInterface.bulkInsert("Users_Skills", [
      {
        id: 1,
        user_id: 2,
        skill_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        user_id: 2,
        skill_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        user_id: 3,
        skill_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        user_id: 3,
        skill_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users_Skills", null, {});
  },
};
