'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      // Define attributes
      id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      nombres: {
        type: Sequelize.STRING
      },
      apellidos: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      },
      grado: {
        type: Sequelize.STRING
      },
      materia: {
        type: Sequelize.STRING
      },
      nota: {
        type: Sequelize.STRING
      },
      salon: {
        type: Sequelize.STRING
      },
      createdOn: {
        type: Sequelize.DATE,
        field: 'created_on',
        defaultValue: Sequelize.NOW
      }
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};