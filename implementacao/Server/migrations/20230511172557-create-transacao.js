'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('transacoes', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      destinatarioId:{
        type: Sequelize.INTEGER,
        references: { model: 'usuarios', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      remetenteId:{
        type: Sequelize.INTEGER,
        references: { model: 'usuarios', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      QUANTIDADE: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ENTRADA: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      SAIDA: {
        type: Sequelize.INTEGER,
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

    await queryInterface.dropTable('transacoes');
   
  }
};
