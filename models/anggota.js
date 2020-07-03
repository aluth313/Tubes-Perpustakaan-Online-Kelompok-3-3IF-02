'use strict';
module.exports = (sequelize, DataTypes) => {
  const Anggota = sequelize.define('Anggota', {
    nik: DataTypes.STRING,
    nama: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    jk: DataTypes.STRING,
    kota_lahir: DataTypes.STRING,
    tgl_lahir: DataTypes.DATEONLY,
    userId: DataTypes.INTEGER
  }, {});
  Anggota.associate = function(models) {
    // associations can be defined here
    Anggota.belongsTo(models.User, {foreignKey: 'userId', as: 'user'})
  };
  return Anggota;
};