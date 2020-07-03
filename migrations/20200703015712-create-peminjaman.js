'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Peminjamans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tgl_peminjaman: {
        type: Sequelize.DATEONLY
      },
      tgl_pengembalian: {
        type: Sequelize.DATEONLY
      },
      status: {
        type: Sequelize.STRING
      },
      anggota_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Anggota',
          key: 'id'
        }
      },
      buku_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Bukus',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Peminjamans');
  }
};