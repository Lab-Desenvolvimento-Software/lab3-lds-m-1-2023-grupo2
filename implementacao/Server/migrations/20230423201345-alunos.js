'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('produtos', { 
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
      EMAIL:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      CPF:{
        type: Sequelize.STRING,
        allowNull: true,
      },

      RG:{
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      LOGRADOURO:{
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      CIDADE:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      BAIRRO:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      NUMERO:{
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      INSTITUICAO:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      CURSO:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      MOEDAS:{
        type: Sequelize.FLOAT,
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
