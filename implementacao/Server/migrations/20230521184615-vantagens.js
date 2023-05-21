'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('vantagens', { 
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
      DESCRICAO: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      empresaId:{
        type: Sequelize.INTEGER,
        references: { model: 'empresas', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      VALOR: {
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

    await queryInterface.dropTable('vantagens');
   
  }
};
