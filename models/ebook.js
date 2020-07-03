'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ebook = sequelize.define('Ebook', {
    judul: DataTypes.STRING,
    penerbit: DataTypes.STRING,
    pengarang: DataTypes.STRING,
    tahun: DataTypes.STRING,
    file: DataTypes.STRING
  }, {});
  Ebook.associate = function(models) {
    // associations can be defined here
  };
  return Ebook;
};