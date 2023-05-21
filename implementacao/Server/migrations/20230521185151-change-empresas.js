'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.addColumn('empresas','usuarioId', { 
      type: Sequelize.INTEGER,
      references: { model: 'usuarios', key: 'id'},
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false,
      });

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.removeColumn('empresas','usuarioId');
    
  }
};
