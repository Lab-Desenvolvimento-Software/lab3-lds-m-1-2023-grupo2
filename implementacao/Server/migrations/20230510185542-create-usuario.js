'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('usuarios', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      TIPO:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      NOME: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      LOGIN: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      SENHA: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
     });
     
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('usuarios');
   
  }
};
