'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('professores', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
     
      CPF:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      DEPARTAMENTO:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      INSTITUICAO:{
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

    await queryInterface.dropTable('professores');

  }
};
