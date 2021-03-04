'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Anythings', 'somethingId', 'SomethingId');
    await queryInterface.renameColumn('Somethings', 'userId', 'UserId');
    await queryInterface.renameColumn('SomethingsTags', 'somethingId', 'SomethingId');
    await queryInterface.renameColumn('SomethingsTags', 'tagId', 'TagId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Anythings', 'SomethingId', 'somethingId');
    await queryInterface.renameColumn('Somethings', 'UserId', 'userId');
    await queryInterface.renameColumn('SomethingsTags', 'SomethingId', 'somethingId');
    await queryInterface.renameColumn('SomethingsTags', 'TagId', 'tagId');
  }
};
