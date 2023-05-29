'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.addColumn('empresas','EMAIL', { 
      type: Sequelize.STRING,

      });

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.removeColumn('empresas','EMAIL');
    
  }
};
