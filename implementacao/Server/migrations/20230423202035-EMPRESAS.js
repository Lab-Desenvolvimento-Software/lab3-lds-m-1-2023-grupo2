'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('empresas', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      NOME: {
        type: Sequelize.STRING,
        allowNull: true,

      },
      CNPJ: {
        type: Sequelize.STRING,
        allowNull: true,

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

    await queryInterface.dropTable('alunos');
    
  }
};
