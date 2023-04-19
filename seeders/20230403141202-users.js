"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    const regions = await queryInterface.sequelize.query(
      'SELECT id FROM "Regions";'
    );

    await queryInterface.bulkInsert("Users", [
      {
        id: uuidv4(),
        first_name: "Fakhrul",
        lastName: "Arifin",
        second_name: "Okta",
        email: "admin@example.com",
        phone: "79869048572",
        telegramId: 1638496369,
        regionId: regions[0][0].id,
        isAdmin: true,
        password: await bcrypt.hash("admin", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
