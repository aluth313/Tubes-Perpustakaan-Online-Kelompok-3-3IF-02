'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.QueryGenerator.dropForeignKeyQuery("peminjaman", "buku_id"),
        queryInterface.dropTable('bukus'),
        queryInterface.dropTable('details'),
        queryInterface.dropTable('ebooks'),
        queryInterface.dropTable('peminjaman'),
        queryInterface.dropTable('peminjamans')
        ]);
    });
    
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
      */
    },

    down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
      */
    }
  };
