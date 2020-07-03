'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Peminjaman', {
      tgl_peminjaman: Sequelize.DataTypes.DATEONLY,
      tgl_pengembalian: Sequelize.DataTypes.DATEONLY,
      status: Sequelize.DataTypes.STRING,
      anggota_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'anggota',
          key: 'id',
        },
        allowNull: false,
      },
      buku_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'bukus',
          key: 'id',
        },
        allowNull: false,
      },
    });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Peminjaman');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
