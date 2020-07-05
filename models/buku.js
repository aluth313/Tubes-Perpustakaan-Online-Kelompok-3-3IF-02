'use strict';
module.exports = (sequelize, DataTypes) => {
  const Buku = sequelize.define('Buku', {
    judul: DataTypes.STRING,
    penerbit: DataTypes.STRING,
    pengarang: DataTypes.STRING,
    tahun: DataTypes.STRING,
    isbn: DataTypes.STRING,
    jumlah: DataTypes.INTEGER,
    cover: DataTypes.STRING,
  }, {});
  Buku.associate = function(models) {
    // associations can be defined here
  };
  return Buku;
};