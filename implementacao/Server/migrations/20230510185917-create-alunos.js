'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('alunos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
        type: Sequelize.STRING,
        allowNull: true,
      },
      LOGRADOURO:{
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
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
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      usuarioId:{
        type: Sequelize.INTEGER,
        references: { model: 'usuarios', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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

    await queryInterface.dropTable('alunos');

  }
};
