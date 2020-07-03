'use strict';
module.exports = (sequelize, DataTypes) => {
  const Peminjaman = sequelize.define('Peminjaman', {
    tgl_peminjaman: DataTypes.DATEONLY,
    tgl_pengembalian: DataTypes.DATEONLY,
    status: DataTypes.STRING,
    anggota_id: DataTypes.INTEGER,
    buku_id: DataTypes.INTEGER
  }, {});
  Peminjaman.associate = function(models) {
    // associations can be defined here
    Peminjaman.belongsTo(models.Anggota, {foreignKey: 'anggota_id', as: 'anggota'}),
    Peminjaman.belongsTo(models.Buku, {foreignKey: 'buku_id', as: 'buku'})
  };
  return Peminjaman;
};